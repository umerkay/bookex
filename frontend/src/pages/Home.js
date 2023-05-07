//import React, {useContext, useEffect } from 'react'
import { useUserContext } from '../hooks/userContextHook'
import brandimg from "./Asset 2.png"
import "./home.scss"

function Home() {

    const { isLoggedIn, user } = useUserContext()

    return (
        <div id='home'>
            <div className="container">
                <div id="info">
                    <h1>Bookex Pakistan</h1>
                    <h2>For all your textbook needs</h2>
                    <button className='btn btn-main'>Proceed with Book Submission</button>
                    <button className='btn btn-main'>Proceed with Book Request</button>
                    <img src={brandimg} id="brandimg" height="300" />
                </div>
                <div className="cards"></div>
            </div>
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