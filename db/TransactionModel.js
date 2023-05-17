const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IncomingBook = require('./IncomingBookModel');

// Define the schema for the Pending Transaction collection
const TransactionSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide a user ID!'],
        ref: 'UserModel',
    },
    //array of incomingbook ids
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, 'Please provide a book ID!'],
        ref: 'IncomingBook',
    }],
    //array of outgoingbook ids
    booksReq: [{
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, 'Please provide a book ID!'],
        ref: 'IncomingBook',
    }],

    //status between pending approval, pending, complete
    //default pending approval
    status: {
        type: String,
        enum: ['Pending Approval', 'Pending', 'Complete'],
        required: [true, 'Please provide a status'],
    },
    type: {
        type: String,
        enum: ['Incoming', 'Outgoing'],
        required: [true, 'Please provide type of transaction']
    },
    collectionPoint: {
        type: "String",
        required: [true, 'Please provide a collection point!'],
    },
}, { timestamps: true });

//pre to get book details
// TransactionSchema.pre('find', function (next) {
//     this.populate('books');
//     this.populate('userID');
//     this.populate('booksReq');
//     next();
// });

// Create a model for the schema
const TransactionModel = mongoose.model('TransactionModel', TransactionSchema);

module.exports = TransactionModel;
