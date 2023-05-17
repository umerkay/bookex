import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../hooks/userContextHook';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updateDetails } from '../actions/user';
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function MyProfile() {
    const { user, dispatch, isLoading, token } = useUserContext();

    const [name, setName] = useState(user?.name);
    const [mobile, setMobile] = useState(user?.phonenumber);
    const [city, setCity] = useState(user?.city);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
      setName(user?.name);
      setMobile(user?.phonenumber);
      setCity(user?.city);
    }, [user]);
    
    // if(isLoading || user == null) {
    //   return (<div>Loading</div>)
    // }

    if(token == null) {
      navigate('/login');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const userUpdates = {};
        if (name !== user.name) {
          userUpdates.name = name;
        }
        if (mobile !== user.mobile) {
          userUpdates.mobile = mobile;
        }
        
        if (city !== user.city) {
          userUpdates.city = city;
        }
        if (Object.keys(userUpdates).length > 0) {
          userUpdates.name = userUpdates.name || user.name;
          userUpdates.phonenumber = userUpdates.mobile || user.mobile;
          userUpdates.city = userUpdates.city || user.city;

          try {
            await updateDetails(userUpdates, token, dispatch)
            // alert('Changes saved successfully!');
          } catch (error) {
            console.error(error);
            setErrorMessage('Failed to save changes. Please try again later.');
          }
        }
        // if (currentPassword && newPassword && confirmNewPassword) {
        //   if (newPassword !== confirmNewPassword) {
        //     setErrorMessage('New password and confirmation do not match.');
        //   } else {
        //     try {
        //       await updateUser(user._id, {
        //         currentPassword,
        //         newPassword,
        //       }, dispatch);
        //       alert('Password changed successfully!');
        //     } catch (error) {
        //       console.error(error);
        //       setErrorMessage('Failed to change password. Please make sure you entered the current password correctly and try again later.');
        //     }
        //   }
        // }
      };
        
      const handleChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };
    
  return (
    <div className="container">
      <div className="flex" style={{flexDirection: "column", paddingBottom: "100px", marginTop: "100px", width: "100%", maxWidth: "500px"}}>
        <h1>My Profile</h1>
        {(isLoading || !user) ? <Spinner loading={isLoading || !user} forceChildren></Spinner> : (
        <Form onSubmit={handleSubmit} style={{width: "100%"}}>
          {errorMessage && <p className="text-danger">{errorMessage}</p>
          }
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder={user.email} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" required value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="text" placeholder="Enter your mobile number" required value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter your city" required value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm New Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          placeholder="Confirm your new password"
          onChange={handleChange}
        /> */}
      {/* </Form.Group> */}

      <Button variant="main" type="submit">
        Save Changes
      </Button>
    </Form>)}
    </div>
</div>
);
};

export default MyProfile;






