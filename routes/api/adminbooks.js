const express = require('express');
const router = express.Router();
const Books = require('../../db/BookModel');

//Books Routes for Admin Panel
//GET API to list all books in database
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

//GET API to retrieve Book Details
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    //Find the book in the database using the ID
    const book = await Books.findById(id);

    // If the book doesn't exist, return an error
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Return the book details as the API response
    res.status(200).json({
      success: true,
      message: "Book details retrieved successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving book details" });
  }
});

//API to update Book Details
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, subject, classLevel } = req.body;

  try {
    // Find the book in the database using the ID and update its details
    const updatedBook = await Books.findByIdAndUpdate(
      id,
      { title, author, subject, classLevel },
      { new: true }
    );

    // If the book doesn't exist, return an error
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Return the updated book as the API response
    res.status(200).json({
      success: true,
      message: "Book details updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating book details" });
  }
});

//DELETE API for deleting Books
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the book in the database using the ID and delete it
      const deletedBook = await Books.findByIdAndDelete(id);
  
      // If the book doesn't exist, return an error
      if (!deletedBook) {
        return res.status(404).json({ error: "Book not found" });
      }
  
      // Return a success message as the API response
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ error: "Error deleting book" });
    }
  });
  
module.exports = router;