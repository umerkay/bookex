import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Spinner from "../components/Spinner";
import "./Dashboard.scss";
import PlaceholderLoading from 'react-placeholder-loading'
import OneTransaction from "../components/OneTransaction";
import FillerText from "../components/FillerText";
import img from "../components/Asset 7.png";
import { useUserContext } from "../hooks/userContextHook";
import { okMessage } from "../actions/user";

export const Dashboard = () => {

  //fecth all transactions for this user
  //display them in a table
  //add a button to each row to view details of that transaction
  //add a button to each row to cancel that transaction

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);

  const { user, token, dispatch } = useUserContext();

  useEffect(() => {
    setDonations(transactions.filter(t => t.type === "Incoming"));
    setRequests(transactions.filter(t => t.type === "Outgoing"));
  }, [transactions]);

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
      {user && user.message ? (
        <div  className="alert alert-info flex" role="alert" >
          <span style={{flexGrow: 1}}>
          {user.message}
          </span>
          <button style={{alignSelf: "flex-end"}} onClick={() => okMessage(token, dispatch)} type="button" className="btn" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">OK</span>
          </button>

        </div>

      ) : null}
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
              {donations.length > 0 ? (
                <>
                  <h2 style={{ textAlign: "left" }}>Donations</h2>
                  {(donations).map((transaction) => {
                    return (
                      <OneTransaction transaction={transaction} />
                    )
                  })}</>) : null}

              {requests.length > 0 ? (<><h2 style={{ textAlign: "left" }}>Requests</h2>
                {(requests).map((transaction) => {
                  return (
                    <OneTransaction transaction={transaction} />
                  )
                })}</>) : null}

              {donations.length === 0 && requests.length === 0 ? (<>
                <h2>Seems like you haven't made any requests.</h2>
                <Link to={"/donate"}>
                  <button className='btn btn-main'>Proceed with Book Submission</button>
                </Link>
                <Link to={"/request"}>

                  <button className='btn btn-main'>Proceed with Book Request</button>
                </Link>
                <div className="img">
                  <img src={img} width={200}></img>

                </div>
              </>) : null}

            </>
        }
      </div>
    </div>
  );
}


export default Dashboard