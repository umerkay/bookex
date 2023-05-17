//import React, {useContext, useEffect } from 'react'
// import { useUserContext } from '../hooks/userContextHook'
import { Link } from "react-router-dom"
import brandimg from "./Asset 2.png"
import "./home.scss"
import UserForm from '../components/UserForm';
import React, { useState } from 'react';


function Home() {

    // const { isLoggedIn, user } = useUserContext()

    return (
        <div id='home'>
            <div className="container">
                <div id="info">
                    <h1>Bookex Pakistan</h1>
                    <h2>For all your textbook needs</h2>
                    <Link to={"/donate"}>
                        <button className='btn btn-main'>Proceed with Book Submission</button>
                    </Link>
                    <Link to={"/request"}>

                        <button className='btn btn-main'>Proceed with Book Request</button>
                    </Link>

                    <img src={brandimg} id="brandimg" />
                </div>
                <div className="cards"></div>
            </div>

            {/* <div className="stats">
                <div className="container">
                    <div className="card">
                        <h1>100+</h1>
                        <h2>Books Donated</h2>
                    </div>
                </div>
            </div> */}
        </div>
    )

    /*
    const a =useContext(noteContext)
    useEffect(()=>{
        a.update()
    }, [])
    return(
        <div>
            This is about {a.state.name}
        </div>
    )
*/
}

export default Home