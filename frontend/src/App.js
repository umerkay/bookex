import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';

//pages and componenets
import Home from './pages/Home'
import Navbar from './components/Navbar' 
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MyAccount from './pages/MyAccount'
import MyProfile from './pages/MyProfile'
import MyAddress from './pages/MyAddress'
import Exchanges from './pages/Exchanges'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/MyAccount" element={<MyAccount/>} />
            <Route path="/MyProfile" element={<MyProfile/>} />
            <Route path="/MyAddress" element={<MyAddress/>} />
            <Route path="/Exchanges" element={<Exchanges/>} />          
          </Routes>
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;

