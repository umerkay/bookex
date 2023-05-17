const express = require('express');
const router = express.Router();
const IncomingBook = require('../../db/IncomingBookModel');

//GET api to list all details of IncomingBooks
router.get('/', (req, res) => {
    IncomingBook.find()
      .then((books) => {
        const IncomingbookList = books.map((Incomingbook) => {
          return {
            id: Incomingbook._id,
            userid: Incomingbook.userID,
            condition: Incomingbook.condition,
            isReceived: Incomingbook.isReceived,
          };
        });
  
        res.status(200).json(IncomingbookList);
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Error retrieving books',
          error: error,
        });
      });
  });

module.exports = router;
