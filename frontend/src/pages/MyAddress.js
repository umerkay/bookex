import Sidebar from "../components/Sidebar";
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useUserContext } from '../hooks/userContextHook';
import { createAddress } from '../actions/user'; 

function MyAddress() {
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressType, setAddressType] = useState('pickup');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');

  const { user, dispatch } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAddress = {
      addressType,
      fullName,
      mobile,
      pincode,
      addressLine1,
      addressLine2,
      city,
    };
    try {
      await createAddress(user._id, newAddress, dispatch);
      alert("Address created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create address. Please try again later.");
    }
  };
  
  return (
    <div>
      <Sidebar>
        <h1>My Address</h1>
        <p>Pickup Address: {pickupAddress}</p>
        <p>Delivery Address: {deliveryAddress}</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="addressType">
            <Form.Label>Address Type *</Form.Label>
            <Form.Select value={addressType} onChange={(e) => setAddressType(e.target.value)}>
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name *</Form.Label>
            <Form.Control type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Mobile *</Form.Label>
            <Form.Control type="tel" pattern="[0-9]{10}" placeholder="Enter your 10-digit mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="pincode">
            <Form.Label>Pincode *</Form.Label>
            <Form.Control type="text" placeholder="Enter your pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addressLine1">
            <Form.Label>Flat, House no., Building, Company, Apartment* (written as label) *</Form.Label>
            <Form.Control type="text" placeholder="Enter your address line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addressLine2">
            <Form.Label>Area, Colony, Street, Sector, Village * (written as label)</Form.Label>
            <Form.Control type="text" placeholder="Enter your address line 2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City *</Form.Label>
            <Form.Control type="text" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Address
          </Button>
        </Form>
      </Sidebar>
    </div>
  );
}
export default MyAddress;






