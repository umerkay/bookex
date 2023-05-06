import Sidebar from "../components/Sidebar";
import React, { useState } from 'react';
import { useUserContext } from '../hooks/userContextHook';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updateUser } from '../actions/user';

function MyProfile() {
    const { user, dispatch } = useUserContext();
    const [name, setName] = useState(user.name);
    const [mobile, setMobile] = useState(user.mobile);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
        if (Object.keys(userUpdates).length > 0) {
          try {
            await updateUser(user._id, userUpdates, dispatch);
            alert('Changes saved successfully!');
          } catch (error) {
            console.error(error);
            setErrorMessage('Failed to save changes. Please try again later.');
          }
        }
        if (currentPassword && newPassword && confirmNewPassword) {
          if (newPassword !== confirmNewPassword) {
            setErrorMessage('New password and confirmation do not match.');
          } else {
            try {
              await updateUser(user._id, {
                currentPassword,
                newPassword,
              }, dispatch);
              alert('Password changed successfully!');
            } catch (error) {
              console.error(error);
              setErrorMessage('Failed to change password. Please make sure you entered the current password correctly and try again later.');
            }
          }
        }
      };
        
      const handleChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };
    
  return (
    <div>
      <Sidebar>
        <h1>My Profile</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder={user.email} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="text" placeholder="Enter your mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="currentPassword">
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
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  </Sidebar>
</div>
);
};

export default MyProfile;






