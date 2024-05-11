const myLibrary = [];

class Book{
    constructor(title, author, pages, read, index){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index = index;

    }

    info(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
    }
    get Index(){
        return this.index
    }

    status(){
        if(this.read == true){
            this.read = false
            return 'Read'
        }else if (this.read == false){
            this.read = true
            return 'Not read yet'
        }
    }
}
let bookIndex = 0

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read, bookIndex));
    bookIndex++;
}

const addBook = document.getElementById('formID')

addBook.addEventListener('submit', (e)=> {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);

    document.getElementById('root').innerHTML = '';

    // Crea una tarjeta para cada libro en myLibrary y la añade al div 'root'

    myLibrary.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.id = `book-${book.index}`;
    
        bookDiv.innerHTML = `
            <h2>Tittle:${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not read yet'}</p>
            <button class="read" data-id="${book.Index}" id=#book-${book.Index}" >Read</button>
        `;
    
        document.getElementById('root').appendChild(bookDiv);
    });
    
    myLibrary.forEach((book)=>{
        console.log(book)
    })

    resetForm()
})

const resetForm = ()=>{
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
}

function changeBookStatus(library, index) {
    if (library[index]) {
        library[index].status();
    }
}

function addReadEventListeners() {
    document.querySelectorAll('.read').forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = Number(e.target.getAttribute('data-id'));
            const index = myLibrary.findIndex(book => book.Index == id);
            if (index !== -1) {
                changeBookStatus(myLibrary, index);
                // Actualiza el texto del estado en el DOM
                const statusElement = document.querySelector(`#book-${id} p:nth-child(4)`);
                statusElement.textContent = `Status: ${myLibrary[index].read ? 'Read' : 'Not read yet'}`;
            }
        });
    });
}

// Llama a la función después de que los elementos del libro se hayan añadido al DOM
addReadEventListeners();

























// Supongamos que tienes un botón con el id "addBookButton"
document.getElementById('openForm').addEventListener('click', () => {
    document.querySelector('.addBook').style.display = 'flex';
});

// Supongamos que tienes un botón de cierre en el formulario con el id "closeFormButton"
document.getElementById('addBookButton').addEventListener('click', () => {
    document.querySelector('.addBook').style.display = 'none';
});
