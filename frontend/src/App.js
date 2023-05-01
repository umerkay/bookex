import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//pages and componenets
import Home from './pages/Home'
import Navbar from './components/Navbar' 
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route 
              path ="/signin"
              element = {<SignIn/>}
            />
            <Route 
              path ="/signup"
              element = {<SignUp/>}
            />
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
