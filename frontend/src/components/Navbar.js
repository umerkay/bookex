import { Link } from 'react-router-dom';
import { useUserContext } from "../hooks/userContextHook";
import { logout } from "../actions/user";
import "./navbar.scss"
import logo from "./logo.png"
import {
  FaUserCircle,
  FaSignOutAlt,
}from "react-icons/fa";

const Navbar = (props) => {

  const { isLoggedIn, user, dispatch } = useUserContext()

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" height="50" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/contact">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/registerschool">Become a Partner School</Link>
            </li>
          </ul>
          {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search books here" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
        </div>
        {/* <div className="userInfo">
            {isLoggedIn ? <h2 >Welcome {user?.name}</h2> : null}
            {isLoggedIn ? (
            <button className="btn" onClick={() => logout(dispatch)}>
              Logout
            </button>
          ) : null}
           {isLoggedIn ? (
            <Link className="btn" to="/MyAccount">myAccount</Link>
            ) : null}
          </div> */}

        {isLoggedIn ? (
          <>
            <span id='welcome' >Hello,<Link className="btn" to="/MyAccount"> 
              <FaUserCircle />
            {user?.name}</Link></span>
            <button className="btn" onClick={() => window.confirm("Do you want to logout?") ? logout(dispatch) : null}>
              <FaSignOutAlt />
            </button>

            
          </>
        ) : (
          <button className="btn btn-main" onClick={props.handleShowSM}>
            Sign In
          </button>
        )}


        {/* <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/signup">Register</Link>
            </li> */}
      </div>
    </nav>
  )
}

export default Navbar;
