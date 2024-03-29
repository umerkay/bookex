import './App.css';
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import React from 'react';
import { getUserInfo } from './actions/user'
import { useUserContext } from './hooks/userContextHook'
import { useEffect, useState } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css';

//pages and componenets
import Home from './pages/Home'
import Navbar from './components/Navbar' 
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import MyProfile from './pages/MyProfile'
import MyAddress from './pages/MyAddress'
import Exchanges from './pages/Exchanges'
import BasicModal from './components/BasicModal';
import MultiStepForm from './components/MultiStepForm';
import MultiStepFormRequest from './components/MultiStepFormRequest';
import TransactionPage from './pages/TransactionPage';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';



function App() {

  const {dispatch, token} = useUserContext();
  
  //use params to see if signin is true
  //if it is, show sign in modal

  const [showSignInModal, setShowSignInModal] = useState();

  const handleCloseSM = () => setShowSignInModal(false);
  const handleShowSM = () => setShowSignInModal(true);

  //check if token exists in local storage
  //send login request if it does
  //if it doesn't, do nothing

  useEffect(() => {
    console.log("checking for token", token)
    if(token){
      getUserInfo(token, dispatch);
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar handleShowSM={handleShowSM} />
        <SignIn show={showSignInModal} handleClose={handleCloseSM} />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/donate" element={<MultiStepForm/>} />
            <Route path="/request" element={<MultiStepFormRequest/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            {/* <Route path="/signin" element={<SignIn/>} /> */}
            {/* <Route path="/signup" element={<SignUp/>} /> */}
            <Route path="/Dashboard" element={<Dashboard/>} />
            <Route path="/MyProfile" element={<MyProfile/>} />
            {/* <Route path="/MyAddress" element={<MyAddress/>} /> */}
            {/* <Route path="/Exchanges" element={<Exchanges/>} /> */}
            <Route path="/404" element={<NotFound/>} />
            <Route path="/transaction/:id" element={<TransactionPage/>} />           
          </Routes>
        </div>
      </BrowserRouter> 
     

    </div>
  );
}

export default App;

