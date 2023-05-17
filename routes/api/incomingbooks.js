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

//GET api for Incoming Books details
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the incoming book in the database using the ID
    const incomingBook = await IncomingBook.findById(id);

    // If the incoming book doesn't exist, return an error
    if (!incomingBook) {
      return res.status(404).json({ error: "Incoming book not found" });
    }

    // Return the incoming book details as the API response
    res.status(200).json({
      success: true,
      message: "Incoming book details retrieved successfully",
      incomingBook,
    });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving incoming book details" });
  }
});

//PUT api for updating Incoming book details
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { isReceived, condition } = req.body;

  try {
    // Find the incoming book in the database using the ID and update its details
    const updatedIncomingBook = await IncomingBook.findByIdAndUpdate(
      id,
      { isReceived, condition },
      { new: true }
    );

    // If the incoming book doesn't exist, return an error
    if (!updatedIncomingBook) {
      return res.status(404).json({ error: "Incoming book not found" });
    }

    // Return the updated incoming book as the API response
    res.status(200).json({
      success: true,
      message: "Incoming book details updated successfully",
      incomingBook: updatedIncomingBook,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating incoming book details" });
  }
});

//DELETE api for deleting Book instance
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the IncomingBook in the database using the ID and delete it
    const deletedIncomingBook = await IncomingBook.findByIdAndDelete(id);

    // If the IncomingBook doesn't exist, return an error
    if (!deletedIncomingBook) {
      return res.status(404).json({ error: "IncomingBook not found" });
    }

    // Return a success message as the API response
    res.status(200).json({
      success: true,
      message: "IncomingBook deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting IncomingBook" });
  }
});

module.exports = router;
