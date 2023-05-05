const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Pending Transaction collection
const pendingTransactionSchema = new Schema({
  // pendingTransactionID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: [true, 'Please provide a pending transaction ID!'],
  //   unique: [true,'Pending transaction ID already exists'],
  // },
  bookID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide a book ID!'],
    ref: 'BookModel',
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide a user ID!'],
    ref: 'UserModel',
  },
  condition: {
    type: String,
    required: [true, 'Please provide the condition of the book!'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date for the transaction!'],
    default: Date.now,
  },
  preferredCollectionPoint: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ['book requested', 'book provided'],
    required: [true, 'Please specify the type of transaction (book requested / book provided)!'],
  },
});

// Create a model for the schema
const PendingTransactionModel = mongoose.model('PendingTransactionModel', pendingTransactionSchema);

module.exports = PendingTransactionModel;
