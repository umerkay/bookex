const express = require('express');
const router = express.Router();
const IncomingBook = require('../../db/IncomingBookModel');
const authenticateUser = require('./auth');
const Transaction = require('../../db/TransactionModel');

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

  //PUT api for updating transaction status without a
// router.put('/:id', authenticateUser, async (req, res) => {
//     console.log(req.user._id);
//     if (!req.user._id) {
//         return res.status(401).json({
//             message: 'Unauthorized',
//         });
//     }
//     const transaction = await Transaction.findById(req.params.id);
//     if (!transaction) {
//         return res.status(404).json({
//             message: 'Transaction not found',
//         });
//     }
//     if (transaction.userID.toString() !== req.user._id.toString()) {
//         return res.status(401).json({
//             message: 'Unauthorized',
//         });
//     }
//     transaction.status = req.body.status;
//     await transaction.save();
//     res.send(transaction); 
// });

// Update Transaction API Endpoint
router.put('/:id', (req, res) => {
    const { transactionId } = req.params;
    const { status, type } = req.body;
  
    // Check if the user is authorized to update transactions (e.g., admin check)
    if (!isAdmin(req.user)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Find the transaction in the database using the transactionId
    const transaction = Transaction.findById(transactionId);
  
    // If the transaction doesn't exist, return an error
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
  
    // Update the transaction with the new information
    transaction.status = status;
    transaction.type = type;
  
    // Save the updated transaction to the database
    transaction.save();
  
    // Return the updated transaction as the API response
    res.json({ transaction });
  });

//DELETE api for deleting transaction
// router.delete('/:id', (req, res) => {
//     console.log(req.user._id);
//     const transaction = await Transaction.findById(req.params.id);
//     if (!transaction) {
//         return res.status(404).json({
//             message: 'Transaction not found',
//         });
//     }
//     if (transaction.userID.toString() !== req.user._id.toString()) {
//         return res.status(401).json({
//             message: 'Unauthorized',
//         });
//     }
//     await transaction.remove();
//     res.send(transaction);
// });

 module.exports = router;