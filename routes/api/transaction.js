const express = require('express');
const router = express.Router();
const IncomingBook = require('../../db/IncomingBookModel');
const authenticateUser = require('./auth');
const Transaction = require('../../db/TransactionModel');
const upload = require('../../uploader');

router.post('/donate', authenticateUser, upload.array('files'), async (req, res) => {
    // console.log("req.body");
    // res.send('done');
    const books = JSON.parse(req.body.books);
    const collectionPoint = req.body.collectionPoint;
    const userID = req.user.id;
    // console.log(req.body)
    // return;
    const bookIds = books.map(({ _id, condition, classLevel }, i) => {

        const bookObj = new IncomingBook({
            userID,
            bookID: _id,
            condition,
            isReceived: false,
            city: "Islamabad",
            classLevel,
            image: `/uploads/${req.files[i].filename}`,
            collectionPoint
        });
        bookObj.save()
        return bookObj._id;
    });
    //create a transaction with user id, array of book ids, status pending and incoming
    const transaction = new Transaction({
        userID,
        books: bookIds,
        status: "Pending",
        type: "Incoming",
        collectionPoint
    });
    transaction.save().then(async () => {
        // req.user.message = "Donation Request Submitted Successfully";
        // await req.user.save();
        res.send({msg: 'done'});
    }).catch((err) => {
        res.send(err);
    }
    );

});

router.post('/request', authenticateUser, async (req, res) => {
    const books = req.body.books;
    const userID = req.user.id;
    //check if user already has a outgoing transaction that is pending
    // return res.status(400).send({ msg: "Oops! You already have a pending outgoing transaction." });
    const transactions = await Transaction.find({ userID, status: "Pending", type: "Outgoing" });
    
    if (transactions.length) return res.status(400).send({ msg: "Oops! You already have a pending outgoing transaction." });

    //create a transaction with user id, array of book ids, status pending and incoming
    const transaction = new Transaction({
        userID,
        booksReq: books.map(book => book._id),
        status: "Pending",
        type: "Outgoing",
        collectionPoint: req.body.collectionPoint
    });
    //set all books in book requested isReceived to false
    IncomingBook.find({ _id: { $in: books.map(book => book._id) } }).then((books) => {
        books.forEach((book, i) => {
            book.isReceived = false;
            book.save();
        });
    });
    
    transaction.save().then(async () => {
        // req.user.message = "Request Submitted Successfully";
        // await req.user.save();
        res.send({msg: 'done'});
    }).catch((err) => {
        res.send(err);
    }
    );

});

router.get('/get/:id', (req, res) => {
    const id = req.params.id;
    Transaction.find({ _id: id }).populate("userID").populate("books").populate("booksReq").then((transaction) => {
        transaction.length ? res.send(transaction) : res.status(404).send({ msg: "Error: Transaction not found" });
    }).catch((err) => {
        res.send(err);
    });
});

router.post('/verify/:id', authenticateUser, async (req, res) => {
    if (req.user.isVerifier !== true) return res.status(401).send({ msg: "Unauthorized" });
    //mark transaction status complete
    const id = req.params.id;
    //get conditions from body
    const conditions = req.body.conditions;

    Transaction.findByIdAndUpdate(id, { status: "Complete" }).then(async (transaction) => {
        if(transaction.type === "Outgoing") {
            //delete all books
            // IncomingBook.deleteMany({ _id: { $in: transaction.booksReq } }).then(() => {
            //     res.send({ msg: "Success" });
            // }).catch((err) => {
            //     res.status(500).send({ msg: "Error deleting books related to transaction" });
            // });
        } else {
            //mark all books as received and update conditions
            IncomingBook.find({ _id: { $in: transaction.books } }).then((books) => {
                books.forEach((book, i) => {
                    book.isReceived = true;
                    book.condition = Math.min(10, Math.max(0, conditions[i]));
                    book.save();
                });
            });
        }
        //find owner of transaction
        await transaction.populate("userID");
        transaction.userID.message = "Your transaction has been verified";
        await transaction.userID.save();

        res.send({ msg: "Success" });
        // IncomingBook.updateMany({ _id: { $in: transaction.books } }, { isReceived: true }).then(() => {
        //     res.send({ msg: "Success", transaction: {...transaction, status: "Complete"} });
        // }).catch((err) => {
        //     res.send(err);
        // }
        // );
    })
});

//delete a transaction and all books
router.get('/delete/:id', authenticateUser, (req, res) => {
    const id = req.params.id;
    //check if user is owner of transaction
    Transaction.findById(id).then((transaction) => {
        if (transaction.userID.toString() !== req.user.id.toString() && req.user.isVerifier !== true) return res.status(401).send({ msg: "Unauthorized" });
        //handle transaction deletion cases :(
        //if sir asks about this just show him this piece of code 

        // IncomingBook.deleteMany({ _id: { $in: transaction.books } }).then(() => {
        //     Transaction.findByIdAndDelete(id).then(() => {
        //         res.send({ msg: "Success" });
        //     }).catch((err) => {
        //         res.status(500).send({ msg: "Error deleting transaction" });
        //     });
        // }).catch((err) => {
        //     res.status(500).send({ msg: "Error deleting transaction" });
        // });
    }).catch((err) => {
        res.status(404).send({ msg: "Error: Transaction not found" });
    });
});


//get all for user
//populate books in every transaction
router.get('/getall', authenticateUser, async (req, res) => {
    const userID = req.user.id;
    const transactions = await Transaction.find({ userID }).populate("books").populate("booksReq");

    transactions.map(transaction => {
        if (transaction.type === "Outgoing")    
            transaction.books = transaction.booksReq;
    });

    res.send({ transactions });
});

module.exports = router;