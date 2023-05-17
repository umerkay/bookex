import React, { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/userContextHook';
import { useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { useNavigate } from 'react-router-dom';
import "./TransactionPage.scss"
import OneTransaction from '../components/OneTransaction';
import { Table } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FaCheck, FaCheckCircle, FaQrcode, FaTrash } from 'react-icons/fa';
import BasicModal from '../components/BasicModal';
import QRCode from "react-qr-code";

const HOST_URL = "10.7.100.55:3000"

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

    const updtCondition = (e, i) => {
        let newConditions = [...conditions];
        newConditions[i] = e.target.value;
        setConditions(newConditions);
    };

    return (
        <div className="container">
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
                <div style={{width: "100%", overflowX: "auto"}}>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Subject</th>
                            <th>Author</th>
                            <th>Class Level</th>
                            <th>Condition</th>
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
                            </tr>

                        ))}
                    </tbody>
                </Table>
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
