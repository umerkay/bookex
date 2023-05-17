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

//PUT api for updating Incoming Books
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { isReceived, condition } = req.body;

  try {
    // Find the IncomingBook in the database using the ID and update it
    const incomingBook = await IncomingBook.findByIdAndUpdate(
      id,
      { isReceived, condition },
      { new: true }
    );

    // If the IncomingBook doesn't exist, return an error
    if (!incomingBook) {
      return res.status(404).json({ error: "IncomingBook not found" });
    }

    // Return the updated IncomingBook as the API response
    res.status(200).json({
      success: true,
      message: "IncomingBook updated successfully",
      incomingBook,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating IncomingBook" });
  }
});
  
module.exports = router;
