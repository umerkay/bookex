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

//retrieve Transaction details
router.get('/:id', (req, response) => {
  Transaction.findById(req.params.id)
    .then((transaction) => {
      response.status(200).send({
        id: transaction._id,
        ...transaction._doc
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error retrieving transaction",
        error,
      });
    });
});


// Update Transaction API Endpoint
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status, type } = req.body;

  // Find the transaction in the database using the ID and update it
  Transaction.findByIdAndUpdate(id, { status, type }, { new: true })
    .then((transaction) => {
      // If the transaction doesn't exist, return an error
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      // Return the updated transaction as the API response
      res.json({ transaction });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error updating transaction' });
    });
});



//DELETE api for deleting transaction
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByIdAndRemove(id);

    if (transaction) {
      res.status(200).json({
        success: true,
        message: "Transaction deleted successfully"
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Transaction not found"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting transaction"
    });
  }
});


 module.exports = router;