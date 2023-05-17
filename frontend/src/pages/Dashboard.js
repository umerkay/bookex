import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Spinner from "../components/Spinner";
import "./Dashboard.scss";
import PlaceholderLoading from 'react-placeholder-loading'
import OneTransaction from "../components/OneTransaction";
import FillerText from "../components/FillerText";

export const Dashboard = () => {

  //fecth all transactions for this user
  //display them in a table
  //add a button to each row to view details of that transaction
  //add a button to each row to cancel that transaction

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchTransactions = async () => {
      const res = await fetch('/api/transaction/getall', {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      const data = await res.json();

      setTransactions(data.transactions);
      setLoading(false);

    }
    fetchTransactions();

  }, []);

  return (
    <div className="container">
      <div id="dashboard">
        {
          loading ?
            <>
              <Spinner forceChildren loading>
                <div className="header">
                  <h1> Dashboard</h1>
                </div>
              </Spinner>
              <h2><FillerText large /></h2>
              <OneTransaction transaction={{}} loading={true} />
              <OneTransaction transaction={{}} loading={true} />
              <h2><FillerText large /></h2>
              <OneTransaction transaction={{}} loading={true} />
              <OneTransaction transaction={{}} loading={true} />
            </>
            :
            <>
              <div className="header">
                <h1> Dashboard</h1>
              </div>
              <h2 style={{ textAlign: "left" }}>Donations</h2>
              {(transactions.filter(t => t.type === "Incoming")).map((transaction) => {
                return (
                  <OneTransaction transaction={transaction} />
                )
              })}
              <h2 style={{ textAlign: "left" }}>Requests</h2>
              {(transactions.filter(t => t.type === "Outgoing")).map((transaction) => {
                return (
                  <OneTransaction transaction={transaction} />
                )
              })}
            </>
        }
      </div>
    </div>
  );
}


export default Dashboard