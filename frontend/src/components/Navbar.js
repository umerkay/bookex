import { Link } from 'react-router-dom';
import { useUserContext } from "../hooks/userContextHook";
import { logout } from "../actions/user";

const Navbar = () =>{

    const {isLoggedIn, user, dispatch} = useUserContext()

    return(
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Bookex</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/signup">SignUp</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/signin">SignIn</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search books here" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
          <div className="userInfo">
            {isLoggedIn ? <h2 >Welcome {user?.name}</h2> : null}
            {isLoggedIn ? (
            <button className="btn" onClick={() => logout(dispatch)}>
              Logout
            </button>
          ) : null}
           {isLoggedIn ? (
            <Link className="btn" to="/MyAccount">myAccount</Link>
            ) : null}

        </div>
        </div>
      </nav>
    )
}

export default Navbar;
