import React, { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/userContextHook';
import { useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';

export default function TransactionPage(props) {
    //get transaction id from props
    //load transaction details from /api/transaction/get/:id
    //display transaction details
    const {id} = useParams();
    const [transaction, setTransaction] = useState(null);
    const { user, token } = useUserContext();

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:5000/api/transaction/get/' + id);
    
            const data = await response.json();
            let transaction = data[0];
            if(transaction.type === "Outgoing") transaction.books = transaction.booksReq;

            setTransaction(transaction);
        })();
    }, [id]);

    const verify = async () => {
        const response = await fetch('http://localhost:5000/api/transaction/verify/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <div id='transaction'>
            <h1>Transaction</h1>
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Transaction Type</th>
                        <th>Transaction Status</th>
                        <th>Transaction Date</th>
                        <th>Transaction Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={transaction?._id}>
                        <td>{transaction?._id}</td>
                        <td>{transaction?.type === "Incoming" ? "Donation" : "Requested"}</td>
                        <td>{transaction?.status}</td>
                        <td>{<TimeAgo date={transaction?.createdAt}/>}</td>
                        <td>{transaction?.books.map(book => (
                            <span>{book.bookID.title},</span>
                        ))}</td>
                    </tr>
                </tbody>
            </table>
            {user?.isVerifier ? (
                <button className='btn btn-main' onClick={verify}>Verify</button>
            ) : null}
        </div>
    )
}
