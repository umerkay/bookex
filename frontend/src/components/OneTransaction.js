import React from 'react';
import "./OneTransaction.scss";
import TimeAgo from 'react-timeago';
import { FaArrowCircleRight, FaClock, FaMapMarker, FaPhone, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FillerText from './FillerText';

//if loading, use FillerText component everywhere there is text

export default function OneTransaction({ children, detailed, transaction, loading = false }) {
    const { _id, type, status, books, createdAt, collectionPoint } = transaction;
    return (
        <div className={'transaction' + (detailed ? " detailed" : "")}>
            <div className='tags'>
                <div className='status'>
                    {
                        loading ?
                            <FillerText /> :
                            (status === "Complete" ?
                                <span className='text-success'>{status}</span> :
                                <span className='text-warning'>{status}</span>
                            )
                    }
                </div>
                {detailed ?
                    <div className='details'>
                        {_id}
                    </div> : (
                        <Link to={loading ? "#" : "/transaction/" + _id}>
                            <div className='details'>
                                {loading ? <FillerText /> : "Details"}
                                <FaArrowCircleRight></FaArrowCircleRight>
                            </div>
                        </Link>)}
                <div style={{ flexGrow: 1 }}></div>
                <div className='tr'>
                    <div><FaClock></FaClock>
                        {loading ? <FillerText /> : <TimeAgo date={createdAt} />}
                    </div>
                    <div><FaMapMarker />
                        {loading ? <FillerText /> : <span>{collectionPoint}</span>}</div>
                </div>
            </div>
            {!detailed ?
                <div className='message'>
                    {
                        loading ?
                            <FillerText large /> :
                            (status === "Complete" ?
                                <span >{type == "Incoming" ? "Thankyou for donating" : "We'd love to hear from you"}</span> :
                                <span >{type == "Incoming" ? "Looking forward to your donation soon" : "Your books are waiting for you"}</span>
                            )}
                </div> :
                <div className='user'>
                    <span>
                        <FaUserCircle></FaUserCircle>
                        {loading ? <FillerText /> : transaction?.userID.name}
                    </span>
                    <span>
                        <FaPhone/>
                        {loading ? <FillerText /> : transaction?.userID.phonenumber}
                    </span>
                </div>

            }

        </div>
    )
}
