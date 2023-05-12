const express = require('express');
const router = express.Router();
const IncomingBook = require('../../db/IncomingBookModel');
const authenticateUser = require('./auth');
const Transaction = require('../../db/TransactionModel');

router.post('/donate', authenticateUser, async (req, res) => {
    // console.log("req.body");
    // res.send('done');
    const books = req.body.books;
    const userID = req.user.id;
    // console.log("req.body");
    // console.log(req.body);
    const bookIds = books.map(({ _id, image, condition, classLevel, collectionPoint }) => {

        const bookObj = new IncomingBook({
            userID,
            bookID: _id,
            condition,
            isReceived: false,
            city: "Islamabad",
            classLevel
            // collectionPoint
        });
        bookObj.save()
        return bookObj._id;
    });
    console.log(bookIds);
    //create a transaction with user id, array of book ids, status pending and incoming
    const transaction = new Transaction({
        userID,
        books: bookIds,
        status: "Pending",
        type: "Incoming"
    });
    transaction.save().then(() => {
        res.send('done');
    }).catch((err) => {
        res.send(err);
    }
    );

});

router.post('/request', authenticateUser, async (req, res) => {
    const books = req.body.books;
    const userID = req.user.id;
    //create a transaction with user id, array of book ids, status pending and incoming
    const transaction = new Transaction({
        userID,
        booksReq: books.map(book => book._id),
        status: "Pending",
        type: "Outgoing"
    });
    transaction.save().then(() => {
        res.send('done');
    }).catch((err) => {
        res.send(err);
    }
    );

});

router.get('/get/:id', (req, res) => {
    const id = req.params.id;
    Transaction.find({ _id: id }).then((transaction) => {
        res.send(transaction);
    }).catch((err) => {
        res.send(err);
    });
});

router.get('/verify/:id', authenticateUser, (req, res) => {
    if(req.user.isVerifier !== true) return res.status(401).send({msg: "Unauthorized"});
    //mark transaction status complete
    const id = req.params.id;

    Transaction.findByIdAndUpdate(id, { status: "Complete" }).then((transaction) => {
        //mark all books as received
        IncomingBook.updateMany({ _id: { $in: transaction.books } }, { isReceived: true }).then(() => {
            res.send('done');
        }).catch((err) => {
            res.send(err);
        }
        );
    })
});

//get all for user
//populate books in every transaction
router.get('/getall', authenticateUser, async (req, res) => {
    const userID = req.user.id;
    const transactions = await Transaction.find({ userID });

    transactions.map(transaction => {
        if (transaction.type === "Outgoing")
            transaction.books = transaction.booksReq;
    });

    res.send({ transactions });
});

module.exports = router;