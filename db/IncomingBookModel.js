const mongoose = require('mongoose');

// Define the book schema
const bookSchema = new mongoose.Schema({
  //book id
  bookID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide a book ID!'],
    ref: 'BookModel',
  },
  //user id
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide a user ID!'],
    ref: 'UserModel',
  },
  //condition out of 10
  condition: {
    type: Number,
    required: [true, 'Please provide a condition!'],
    min: 0,
    max: 10,
  },
  //boolen is received
  isReceived: {
    type: Boolean,
    required: [true, 'Please provide a isReceived!'],
  },
  collectionPoint: {
    type: String,
    required: false
  },
  classLevel: {
    type: String,
    enum: ['9', '10', '11', '12', 'O Level', 'A Level'],
    required: [true, "Please provide the book's class level."]
  },
  //image of book
  image: {
    type: String,
    required: [true, "Please provide image"],
  },
});

// This middleware is executed before every 'find' query on the book model. It populates the 'requests' and 'provisions' fields with
// the relevant pending transactions using the 'match' property to filter by type.
// bookSchema.pre('find', function() {
//   this.populate({
//     path: 'requests',
//     match: { type: 'book requested' }
//   }).populate({
//     path: 'provisions',
//     match: { type: 'book provided' }
//   });
// });

//pre to populate bookid field with book
bookSchema.pre('find', function (next) {
  this.populate('bookID');
  next();
});

// Create the Book model using the book schema and export it
const IncomingBookModel = mongoose.model('IncomingBook', bookSchema);
module.exports = IncomingBookModel;
