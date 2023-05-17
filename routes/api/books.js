const express = require('express');
const router = express.Router();
const Books = require('../../db/BookModel');
const IncomingBooks = require('../../db/IncomingBookModel');

//routes
//GET /api/book/all?classLevel=''&subject='': get a list of available books by class or subject
router.get('/all', (req, res) => {
    const query = req.query;
    if (query.classLevel) {
        Books.find({ classLevel: query.classLevel })
            .then((books) => {
                res.status(200).json({  message: "Books found", books: books });
            })
            .catch((error) => {
                res.status(500).json({ message: "Error occurred", error: error });
            });
    }
});

// /api/book/available
//send all incomingbooks corresponding to each id in bookIDs
// req : {body: { bookIDs: []}}
// res : {books: {[], []}}
router.get('/available', (req, res) => {
  const query = req.query;
  if (query.classLevel) {
    console.log(query.classLevel)
      IncomingBooks.find({'classLevel': query.classLevel, 'isReceived': true })
          .then((books) => {
              res.status(200).json({  message: "Books found", books: books });
          })
          .catch((error) => {
              res.status(500).json({ message: "Error occurred", error: error });
          });
  }
});



//get books with specific title
router.get('/:title', (req, res) => {
    const query = req.query;
    if (query.title) {
        Books.find({ title: query.title })
            .then((books) => {
                res.status(200).json({ message: "Book found", books: books });
            })
            .catch((error) => {
                res.status(500).json({ message: "Error occurred", error: error });
            });
    } else {
        res.status(400).json({ message: "Invalid query" });
    }
});

//get details of a specific book
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Books.findById(id)
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
    Books.findOne({ title: book.title, author: book.author })
        .then((bookFound) => {
            if (bookFound) {
                // book already exists
                res.status(200).json({ message: "Book already exists", book: bookFound });
            } else {
                // book does not exist
                Books.create(book)
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

//add book to book table if not already present, add user as requester
router.post('/request', (req, res) => {
    const book = req.body;
    Books.findOne({ title: book.title, author: book.author })
        .then((bookFound) => {
            if (bookFound) {
                // book already exists
                res.status(200).json({ message: "Book already exists", book: bookFound });
            } else {
                // book does not exist
                Books.create(book)
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

// Update details of a specific pending request/provision
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;
    const options = { new: true }; // Return updated document
  
    // Find and update the book with the given ID
    Book.findByIdAndUpdate(id, update, options)
      .populate({
        path: 'requests',
        match: { type: 'book requested' }
      })
      .populate({
        path: 'provisions',
        match: { type: 'book provided' }
      })
      .then((book) => {
        // Check if the book exists
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
  
        res.status(200).json({ message: 'Book updated', book: book });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error occurred', error: error });
      });
  });

// Delete a specific pending request/provision from the database
router.delete('/:bookId/:transactionId', (req, res) => {
    const { bookId, transactionId } = req.params;
    
    Book.findById(bookId)
      .then(book => {
        // Check if the book exists
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
  
        // Find the index of the transaction in the requests or provisions array
        let index = -1;
        const requests = book.requests;
        const provisions = book.provisions;
        index = requests.findIndex(r => r._id.toString() === transactionId);
        if (index === -1) {
          index = provisions.findIndex(p => p._id.toString() === transactionId);
          if (index === -1) {
            return res.status(404).json({ message: 'Transaction not found' });
          }
          provisions.splice(index, 1); // Remove the transaction from the provisions array
          book.save().then(() => {
            res.status(200).json({ message: 'Transaction deleted successfully' });
          }).catch(error => {
            res.status(500).json({ message: 'Error deleting transaction', error });
          });
        } else {
          requests.splice(index, 1); // Remove the transaction from the requests array
          book.save().then(() => {
            res.status(200).json({ message: 'Transaction deleted successfully' });
          }).catch(error => {
            res.status(500).json({ message: 'Error deleting transaction', error });
          });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Error deleting transaction', error });
      });
  });
  
// Delete a specific pending request/provision from the database
router.delete('/:bookId/:transactionId', (req, res) => {
    const { bookId, transactionId } = req.params;
    
    Book.findById(bookId)
      .then(book => {
        // Check if the book exists
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
  
        // Find the index of the transaction in the requests or provisions array
        let index = -1;
        const requests = book.requests;
        const provisions = book.provisions;
        index = requests.findIndex(r => r._id.toString() === transactionId);
        if (index === -1) {
          index = provisions.findIndex(p => p._id.toString() === transactionId);
          if (index === -1) {
            return res.status(404).json({ message: 'Transaction not found' });
          }
          provisions.splice(index, 1); // Remove the transaction from the provisions array
          book.save().then(() => {
            res.status(200).json({ message: 'Transaction deleted successfully' });
          }).catch(error => {
            res.status(500).json({ message: 'Error deleting transaction', error });
          });
        } else {
          requests.splice(index, 1); // Remove the transaction from the requests array
          book.save().then(() => {
            res.status(200).json({ message: 'Transaction deleted successfully' });
          }).catch(error => {
            res.status(500).json({ message: 'Error deleting transaction', error });
          });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Error deleting transaction', error });
      });
  });


  //Books Routes for Admin Panel
  //
  router.get('/', (req, res) => {
    Books.find()
      .then((books) => {
        const bookList = books.map((book) => {
          return {
            id: book._id,
            title: book.title,
            author: book.author,
            subject: book.subject,
            classLevel: book.classLevel,
          };
        });
  
        res.status(200).json(bookList);
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Error retrieving books',
          error: error,
        });
      });
  });
  
module.exports = router;