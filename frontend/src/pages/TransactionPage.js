import React, { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/userContextHook';
import { useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { useNavigate } from 'react-router-dom';
import "./TransactionPage.scss"
import OneTransaction from '../components/OneTransaction';
import { Table } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FaBook, FaCheck, FaCheckCircle, FaInfo, FaMapMarker, FaQrcode, FaStar, FaTrash, FaUserAlt } from 'react-icons/fa';
import BasicModal from '../components/BasicModal';
import QRCode from "react-qr-code";
import "../components/bookforms/BookSelect.scss"

const HOST_URL = "10.7.100.55:3000"

//add a review button to open review modal if transaction is complete and outgoing and user is the owner

export default function TransactionPage(props) {
    //get transaction id from props
    //load transaction details from /api/transaction/get/:id
    //display transaction details
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);
    const { user, token } = useUserContext();
    const navigate = useNavigate()
    const [conditions, setConditions] = useState([]);
    const [showQR, setShowQR] = useState(false);

    const [showImageModal, setShowImageModal] = useState(false);
    const [image, setImage] = useState(null);

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [review, setReview] = useState(null);
    const [rating, setRating] = useState(0);
    const [bookForReview, setBookForReview] = useState(null);

    const showImage = (image) => {
        setImage(image);
        setShowImageModal(true);
    };

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/transaction/get/' + id);

            const data = await response.json();
            if (response.status === 404) return navigate('/404');
            let transaction = data[0];
            if (transaction.type === "Outgoing") transaction.books = transaction.booksReq;

            setConditions(transaction.books.map(b => b.condition));
            setTransaction(transaction);
        })();
    }, []);

    // useEffect(() => {
    //     console.log(transaction)
    // }, [transaction]);

    const verify = async () => {
        setTransaction({ ...transaction, status: "Complete" });
        // setConditions(transaction.books.map(b => b.condition));

        const response = await fetch('/api/transaction/verify/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({ conditions })
        });

        // if (response.status === 200) {
        //     // const data = await response.json();
        //     // let _transaction = data.transaction;
        //     // setTransaction({ ..._transaction });
        // }
    };

    const deleteTransaction = async () => {
        if (window.confirm("Are you sure you want to delete this transaction?") === false) return;
        const response = await fetch('/api/transaction/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        });

        if (user?.isVerifier && response.status === 200) {
            navigate('/404');
        } else if (response.status === 200) {
            navigate('/dashboard');
        } else {
            alert("Error deleting transaction");
        }
    };

    //send request to /api/user/reviewincomingbook/:id

    const submitReview = async (book) => {
        const response = await fetch('/api/users/reviewincomingbook/' + book._id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({ review, rating })
        });

        if (response.status === 200) {
            setShowReviewModal(false);
            setTransaction({ ...transaction, books: transaction.books.map(b => b._id === book._id ? { ...b, hasBeenReviewed: true } : b) });
        }
    };


    const updtCondition = (e, i) => {
        let newConditions = [...conditions];
        newConditions[i] = e.target.value;
        setConditions(newConditions);
    };

    return (
        <div className="container">
            {showImageModal ?
                <BasicModal show={showImageModal} handleClose={() => setShowImageModal(false)} title={"Book Image"} >
                    <div className='qrcode flex'>
                        <img src={image} alt="Book Image" style={{ height: "auto", maxWidth: "100%", width: "max-content" }} />
                    </div>
                </BasicModal> : null}

            {
                showReviewModal ?
                    <BasicModal show={showReviewModal} handleClose={() => setShowReviewModal(false)} title={"Review"} >
                        <div className='qrcode flex'>
                            <Form className="flex" style={{ flexDirection: "column" }}>
                                <div className='flex'>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Review</Form.Label>
                                        <Form.Control required as="textarea" rows={3} onChange={(e) => setReview(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as="select" required onChange={(e) => setRating(e.target.value)}>
                                            <option value={0}>Select Rating</option>
                                            <option value={1}>⭐</option>
                                            <option value={2}>⭐⭐</option>
                                            <option value={3}>⭐⭐⭐</option>
                                            <option value={4}>⭐⭐⭐⭐</option>
                                            <option value={5}>⭐⭐⭐⭐⭐</option>

                                        </Form.Control>
                                    </Form.Group>
                                </div>

                                <button className="btn btn-main" onClick={(e) => {
                                    e.preventDefault();

                                    submitReview(bookForReview);
                                }
                                }>Submit</button>
                            </Form>
                        </div>
                    </BasicModal> : null
            }

            {user && user._id === transaction?.userID._id ?
                <BasicModal show={showQR} handleClose={() => setShowQR(false)} title={"Scan QR Code"} >
                    <div className='qrcode flex'>
                        <QRCode
                            size={200}
                            style={{ height: "auto", maxWidth: "100%", width: "200px" }}
                            value={HOST_URL + "/transaction/" + transaction?._id}
                            viewBox={`0 0 200 200`} />
                    </div>
                </BasicModal> : null}
            <div id='transaction'>
                <div className='flex'>
                    <h1 className='header'>{transaction?.type === "Incoming" ? "Donation" : "Request"} Details</h1>
                    {user && user._id === transaction?.userID._id ? (
                        <button onClick={() => setShowQR(true)} className='btn btn-main flex'>
                            <FaQrcode></FaQrcode>
                            Scan
                        </button>
                    ) : null}
                </div>
                <OneTransaction detailed={true} transaction={transaction || {}} loading={!transaction} />
                <div className="flex" style={{ flexDirection: "column" }}>
                    {/* <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Subject</th>
                            <th>Author</th>
                            <th>Class Level</th>
                            <th>Condition</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaction?.books.map((book, i) => (
                            <tr key={book.bookID._id}>

                                <td>{book.bookID._id}</td>
                                <td>{book.bookID.title}</td>
                                <td>{book.bookID.subject}</td>
                                <td>{book.bookID.author}</td>
                                <td>{book.bookID.classLevel}</td>
                                {user?.isVerifier && transaction?.status !== "Complete" ?
                                    <input type='number' min={1} max={10} value={conditions[i]} onChange={e => updtCondition(e, i)} /> :
                                    <td>{conditions[i]}</td>
                                }
                                <td><img src={book.bookID.image} width={200} alt={book.bookID.title} /></td>
                            </tr>

                        ))}
                    </tbody>
                </Table> */}
                    {transaction?.books.map((book, i) => {
                        return (<>
                            <div className='book-details'>
                                <div className='img' onClick={() => showImage(book.image)} style={{ background: "url(" + book.image + ")" }}></div>
                                {/* <img src={book.image}></img> */}
                                <div className='details'>
                                    <div className='flex' style={{ justifyContent: "flex-start" }}>
                                        <span> <FaBook /> {book.bookID.title}</span>
                                        <span> <FaUserAlt /> {book.bookID.author}</span>
                                        <span> <FaInfo /> {book.bookID.subject}</span>
                                        {/* <span> <FaInfo/> {book.bookID.classLevel}</span> */}

                                    </div>
                                    <span> <FaStar></FaStar>
                                        {user?.isVerifier && transaction?.status !== "Complete" ?
                                            <input type='number' min={1} max={10} value={conditions[i]} onChange={e => updtCondition(e, i)} /> :
                                            <td>{conditions[i]}</td>
                                        }
                                    </span>
                                    <span> <FaMapMarker></FaMapMarker> {book.collectionPoint}</span>
                                    {
                                        (book.hasBeenReviewed !== true && transaction?.status === "Complete" && user?._id === transaction?.userID?._id && transaction.type === "Outgoing") ?
                                            <button style={{ marginTop: "1rem", width: "max-content" }} className='btn btn-main' onClick={() => { setShowReviewModal(true); setBookForReview(book) }}>Review Donor</button> : null

                                    }
                                    {
                                        book.hasBeenReviewed ? (<span><FaCheck /> Reviewed</span>) : null
                                    }
                                </div>
                            </div></>
                        )
                    })}
                </div>
                <div className='controls'>
                    {user && user.isVerifier ? (
                        <>
                            <button disabled={transaction?.status === "Complete"} className='btn btn-main' onClick={verify}>
                                <FaCheckCircle />
                                {transaction?.status === "Complete" ? "Verified" : "Verify"}
                            </button>
                        </>) : null}
                    {user && (user.isVerifier || user._id === transaction?.userID._id) ? (
                        <button className='btn btn-danger' onClick={deleteTransaction}>
                            <FaTrash />
                            Delete
                        </button>
                    ) : null}
                </div>
            </div>
        </div>

    )
}
