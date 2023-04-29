const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//database connection using env variables and dotenv
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use((req, res, next) => {
    res.send('Welcome to Express');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});