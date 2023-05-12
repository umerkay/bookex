import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export const Dashboard = () => {

    //fecth all transactions for this user
    //display them in a table
    //add a button to each row to view details of that transaction
    //add a button to each row to cancel that transaction

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await fetch('http://localhost:5000/api/transaction/getall', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            const data = await res.json();

            setTransactions(data.transactions);

        }
        fetchTransactions();
    }, []);

    return (
        <div className="Dashboard">
            <Sidebar>
                <h1> Welcome to Dashboard!</h1>
                <Table striped bordered hover>
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
                        {transactions.map((transaction) => {
                            return (
                                <tr key={transaction._id}>
                                    <td>
                                        <Link to={"/transaction/" + transaction._id}>
                                            {transaction._id}
                                        </Link>
                                    </td>
                                    <td>{transaction.type === "Incoming" ? "Donation" : "Requested"}</td>
                                    <td>{transaction.status}</td>
                                    <td>{transaction.timestamp}</td>
                                    <td>{transaction.books.map(book => (
                                        <span>{book.bookID.title},</span>
                                    ))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

            </Sidebar>
        </div>
    );
}


export default Dashboard