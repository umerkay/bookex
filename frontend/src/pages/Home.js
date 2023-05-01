//import React, {useContext, useEffect } from 'react'
import { useUserContext } from '../hooks/userContextHook'

function Home() {

    const { isLoggedIn , user} = useUserContext()

    return (
        <div className="container">
            <div className="info">
                <h1>Bookex Pakistan</h1>
                <h2>For all your textbook needs</h2>
            </div>
        <div className="cards"></div>
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