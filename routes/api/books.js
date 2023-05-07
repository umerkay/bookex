const express = require('express');
const router = express.Router();
const Users = require('../../db/BookModel');

//routes
//GET /api/book/all?class=''&subject='': get a list of available books by class or subject
router.get('/all', (req, res) => {
    const query = req.query;
    if (query.class) {
        Users.find({ class: query.class })
            .then((books) => {
                res.status(200).json({  message: "Books found", books: books });
            })
            .catch((error) => {
                res.status(500).json({ message: "Error occurred", error: error });
            });
    } else if (query.subject) {
        Users.find({ subject: query.subject })
            .then((books) => {
                res.status(200).json({ message: "Books found", books: books });
            })
            .catch((error) => {
                res.status(500).json({ message: "Error occurred", error: error });
            });
    } else {
        res.status(400).json({ message: "Invalid query" });
    }
});

// GET /api/book/:id: get details of a specific book
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id)
        .then((book) => {
            res.status(200).json({ message: "Book found", book: book });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error occurred", error: error });
        });
});

//POST /api/book/provide: add book to book table if not already present, add user as provider
router.post('/provide', (req, res) => {
    const book = req.body;
    Users.findOne({ title: book.title, author: book.author })
        .then((bookFound) => {
            if (bookFound) {
                // book already exists
                res.status(200).json({ message: "Book already exists", book: bookFound });
            } else {
                // book does not exist
                Users.create(book)
                    .then((newBook) => {
                        res.status(200).json({ message: "Book added", book: newBook });
                    })
                    .catch((error) => {
                        res.status(500).json({ message: "Error occurred", error: error });
                    });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Error occurred", error: error });
        });
});

module.exports = router;