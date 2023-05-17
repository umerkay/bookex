const express = require('express');
const router = express.Router();
const IncomingBook = require('../../db/IncomingBookModel');
const authenticateUser = require('./auth');
const Transaction = require('../../db/TransactionModel');

// // GET all transactions
// router.get('/transactions', async (req, res) => {
//     try {
//       const transactions = await Transaction.find()
//         .populate('userID', 'username') // Populates the user details (assuming 'username' field)
//         .populate('books', 'title author') // Populates the book details (assuming 'title' and 'author' fields)
//         .populate('booksReq', 'title author') // Populates the requested book details (assuming 'title' and 'author' fields)
//         .exec();
  
//       res.json(transactions);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });

// GET /transactions - Fetch all transactions
router.get('/', (req, res) => {
    Transaction.find()
      .then((transactions) => {
        res.status(200).send(transactions.map((admintransaction) => {
          return {
            id: admintransaction._id,
            ...admintransaction._doc
          };
        }));
      })
      .catch((error) => {
        res.status(500).send({
          message: "Error retrieving transactions",
          error,
        });
      });
  });

  //PUT api for updating transaction status
router.put('/:id', authenticateUser, async (req, res) => {
    console.log(req.user._id);
    if (!req.user._id) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
        return res.status(404).json({
            message: 'Transaction not found',
        });
    }
    if (transaction.userID.toString() !== req.user._id.toString()) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    transaction.status = req.body.status;
    await transaction.save();
    res.send(transaction);
});

//DELETE api for deleting transaction
router.delete('/:id', authenticateUser, async (req, res) => {
    console.log(req.user._id);
    if (!req.user._id) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
        return res.status(404).json({
            message: 'Transaction not found',
        });
    }
    if (transaction.userID.toString() !== req.user._id.toString()) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    await transaction.remove();
    res.send(transaction);
});

 module.exports = router;