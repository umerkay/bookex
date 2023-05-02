const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Describing the shape of the documents that will be entering the database
const MatchedTransactionSchema = new Schema({
  transactionID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide a transaction ID!"],
    unique: [true,'Transaction ID already exists'],
  },
  donorUserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: [true, "Please provide the donor's user ID!"],
  },
  recipientUserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: [true, "Please provide the recipient's user ID!"],
  },
  bookID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookModel",
    required: [true, "Please provide the book ID!"],
  },
  transactionCode: {
    type: String,
    required: [true, "Please provide the transaction code!"],
    unique: true,
  },
  transactionDate: {
    type: Date,
    required: [true, "Please provide the transaction date!"],
  },
  transactionStatus: {
    type: String,
    enum: ["pending", "complete", "canceled"],
    default: "pending",
    required: [true, "Please provide the transaction status!"],
  },
  collectionPointID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CollectionPointModel",
    required: [true, "Please provide the collection point ID!"],
  },
});

// Creating a model from the schema
const MatchedTransactionModel = mongoose.model(
  "MatchedTransactionModel",
  MatchedTransactionSchema
);

module.exports = MatchedTransaction;
