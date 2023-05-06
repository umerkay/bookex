import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useUserContext } from '../hooks/userContextHook';
import { transaction } from '../actions/user';
import Sidebar from "../components/Sidebar";

function Exchanges() {
  const { user } = useUserContext();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const transactions = await transaction(user._id);
        setTransactions(transactions);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTransactions();
  }, [user._id]);

  return (
    <div>
        <Sidebar>
      <h1>Transaction History</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
              <td>{transaction._id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.status}</td>
              <td>{transaction.debit}</td>
              <td>{transaction.credit}</td>
              <td>
                {transaction.status === 'pending' && (
                  <Button variant="primary" size="sm" disabled>
                    Cancel
                  </Button>
                )}
                {transaction.status === 'success' && (
                  <Button variant="danger" size="sm" disabled>
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
        </Sidebar>
    </div>
  );
}

export default Exchanges;
