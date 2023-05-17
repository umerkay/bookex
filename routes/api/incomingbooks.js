const express = require('express');
const router = express.Router();
const IncomingBook = require('../../db/IncomingBookModel');

// GET /api/incoming-books
// Retrieve a list of all incoming books
router.get('/', (req, res) => {
  IncomingBook.find()
    .populate('bookID')
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error retrieving incoming books',
        error: error,
      });
    });
});

module.exports = router;
