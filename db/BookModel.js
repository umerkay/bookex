const mongoose = require('mongoose');

// Define the book schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a book title."]
  },
  author: {
    type: String,
    required: [true, "Please provide the book author's name."]
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
});

const books = [
  { title: '9th Physics', author: 'FBISE', subject: 'Physics', classLevel: '9' },
  { title: '9th Chemistry', author: 'FBISE', subject: 'Chemistry', classLevel: '9' },
  { title: '9th Biology', author: 'FBISE', subject: 'Biology', classLevel: '9' },
  { title: '9th Math', author: 'FBISE', subject: 'Math', classLevel: '9' },
  { title: '10th Physics', author: 'FBISE', subject: 'Physics', classLevel: '10' },
  { title: '10th Chemistry', author: 'FBISE', subject: 'Chemistry', classLevel: '10' },
  { title: '10th Biology', author: 'FBISE', subject: 'Biology', classLevel: '10' },
  { title: '10th Math', author: 'FBISE', subject: 'Math', classLevel: '10' },
  { title: '11th Physics', author: 'FBISE', subject: 'Physics', classLevel: '11' },
  { title: '11th Chemistry', author: 'FBISE', subject: 'Chemistry', classLevel: '11' },
  { title: '11th Biology', author: 'FBISE', subject: 'Biology', classLevel: '11' },
  { title: '11th Math', author: 'FBISE', subject: 'Math', classLevel: '11' },
  { title: '12th Physics', author: 'FBISE', subject: 'Physics', classLevel: '12' },
  { title: '12th Chemistry', author: 'FBISE', subject: 'Chemistry', classLevel: '12' },
  { title: '12th Biology', author: 'FBISE', subject: 'Biology', classLevel: '12' },
  { title: '12th Math', author: 'FBISE', subject: 'Math', classLevel: '12' },
  { title: 'O Level Physics', author: 'Cambridge', subject: 'Physics', classLevel: 'O Level' },
  { title: 'O Level Chemistry', author: 'Cambridge', subject: 'Chemistry', classLevel: 'O Level' },
  { title: 'O Level Biology', author: 'Cambridge', subject: 'Biology', classLevel: 'O Level' },
  { title: 'O Level Math', author: 'Cambridge', subject: 'Math', classLevel: 'O Level' },
  { title: 'AS Level Physics', author: 'Cambridge', subject: 'Physics', classLevel: 'AS Level' },
  { title: 'AS Level Chemistry', author: 'Cambridge', subject: 'Chemistry', classLevel: 'AS Level' },
  { title: 'AS Level Biology', author: 'Cambridge', subject: 'Biology', classLevel: 'AS Level' },
  { title: 'AS Level Math', author: 'Cambridge', subject: 'Math', classLevel: 'AS Level' },
  { title: 'A Level Physics', author: 'Cambridge', subject: 'Physics', classLevel: 'A Level' },
  { title: 'A Level Chemistry', author: 'Cambridge', subject: 'Chemistry', classLevel: 'A Level' },
  { title: 'A Level Math', author: 'Cambridge', subject: 'Math', classLevel: 'A Level' },
  { title: 'A Level Biology', author: 'Cambridge', subject: 'Biology', classLevel: 'A Level' },
  { title: 'A Level Computer Science', author: 'Cambridge', subject: 'Computer Science', classLevel: 'A Level' },
  { title: 'A Level Accounting', author: 'Cambridge', subject: 'Accounting', classLevel: 'A Level' },
];



// // Creating a new book object
// const newBook = new Book({
//   title: 'The Great Gatsby',
//   author: 'F. Scott Fitzgerald',
//   subject: 'Literature',
//   classLevel: 'A Level'
// });

// // Save the new book object to the database
// newBook.save()
//   .then((savedBook) => {
//     console.log('New book created:', savedBook);
//   })
//   .catch((error) => {
//     console.error('Error creating book:', error);
//   });

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

// Create the Book model using the book schema and export it
const BookModel = mongoose.model('BookModel', bookSchema);

// Create a new book object for each book in the array and save it to the database
// books.forEach((book) => {
//   const newBook = new BookModel(book);
//   newBook.save()

//     .then((savedBook) => {
//       console.log('New book created:', savedBook);
//     })
//     .catch((error) => {
//       console.error('Error creating book:', error);
//     });
// });

module.exports = BookModel;
