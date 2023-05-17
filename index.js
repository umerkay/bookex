//Express server
const express = require('express');
const app = express();
const Users = require('./routes/api/users');
const cors = require('cors')
const Books = require('./routes/api/books');
const Transactions = require('./routes/api/transaction');
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

//routes
app.use('/api/users', Users);
app.use('/api/books', Books);
app.use('/api/transaction', Transactions);

app.use('/uploads', express.static('uploads'))
