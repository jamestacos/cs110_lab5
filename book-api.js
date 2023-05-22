const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const port = 3000;

let books = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;

    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;

    for (let i = 0; i < books.length; i++){
        let book = books[i]

        if (book.isbn === isbn){
            books[i] = newBook;
        }
    }

    res.send('Book is edited');
});

// app.delete('/book/:isbn', (req, res) => {
//     const isbn = req.params.isbn;

//     books = books.filter((book) => book.isbn !== isbn);

//     res.send('Book is deleted');
// });

app.delete('')

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));