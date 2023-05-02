const mongoose = require('mongoose');

// Define the book schema
const bookSchema = new mongoose.Schema({
  bookID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide a book ID!"],
    unique: [true,'Book ID already exists'],
  },
  title: {
    type: String,
    required: [true, "Please provide a book title."]
  },
  author: {
    type: String,
    required: [true, "Please provide the book author's name."]
  },
  edition: {
    type: String,
    required: [true, "Please provide the book edition."]
  },
  isbn: {
    type: String,
    required: [true, "Please provide the book ISBN number."],
    unique: true
  },
  subject: {
    type: String,
    required: [true, "Please provide the book subject."]
  },
  classLevel: {
    type: String,
    enum: ['9', '10', '11', '12', 'O Level', 'A Level'],
    required: [true, "Please provide the book's class level."]
  },
  // requests: [{
  //   type: mongoose.Schema.Types.ObjectId, // This field is an array of ObjectId's that reference PendingTransaction documents
  //   ref: 'PendingTransactionModel' // The 'ref' field tells Mongoose which model to use during population
  // }],
  // provisions: [{
  //   type: mongoose.Schema.Types.ObjectId, // This field is an array of ObjectId's that reference PendingTransaction documents
  //   ref: 'PendingTransactionModel' // The 'ref' field tells Mongoose which model to use during population
  // }],
});

// This middleware is executed before every 'find' query on the book model. It populates the 'requests' and 'provisions' fields with
// the relevant pending transactions using the 'match' property to filter by type.
bookSchema.pre('find', function() {
  this.populate({
    path: 'requests',
    match: { type: 'book requested' }
  }).populate({
    path: 'provisions',
    match: { type: 'book provided' }
  });
});

// Create the Book model using the book schema and export it
const BookModel = mongoose.model('BookModel', bookSchema);
module.exports = BookModel;
