//Express server
const express = require('express');
const app = express();
const Users = require('./routes/api/users');
const cors = require('cors')
const Books = require('./routes/api/books');
const Transactions = require('./routes/api/transaction');
const TransactionsAdmin = require('./routes/api/admintransaction');
const IncomingBooks = require('./routes/api/incomingbooks');
const AdminBooks = require('./routes/api/adminbooks');
const port = process.env.PORT || 5000;

//database connection using env variables and dotenv
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
    //listen for requests
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})

//middleware
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth-token');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Content-Range', 'posts 0-20/20')
    next()
});

//routes
//create route /api/posts and send a simple hello world message
// app.get('/api/posts', (req, res) => {
//     res.send(
//         [
//             {
//               "id": "1",
//               "title": "A good girls guide to murder. By Shalina Riaz",
//               "body": "This is the body of the murderee",
//               "publishedAt": "2020-10-02"
//             },
//             {
//               "id": "2",
//               "title": "Post Two",
//               "body": "This is the post body",
//               "publishedAt": "10-01-2020"
//             },
//             {
//               "id": "3",
//               "title": "Post Three",
//               "body": "This is the post body",
//               "publishedAt": "10-01-2020"
//             },
//             {
//               "id":"4",
//               "title": "Post Four",
//               "body": "This is the body for post 4",
//               "publishedAt": "2020-10-06",
//               "id": "DdCICG7"
//             }
//           ]
//     );
// });

app.use('/api/users', Users);
app.use('/api/books', Books);
app.use('/api/transaction', Transactions);
app.use('/api/admintransaction', TransactionsAdmin);
app.use('/api/incomingbooks', IncomingBooks);
app.use('/api/adminbooks', AdminBooks);
