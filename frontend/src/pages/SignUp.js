import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../hooks/userContextHook'
import { register } from '../actions/user'

const SignUp = () => {

  let [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const {dispatch} = useUserContext()

  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    register(formDetails, dispatch, () => {
      setFormDetails({
        email: '',
        password: '',
        confirmPassword: ''
      });

      navigate('/signin')
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name here"
          value={formDetails.name} onChange={(e) => setFormDetails({...formDetails, name: e.target.value})}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email here"
          value={formDetails.email} onChange={(e) => setFormDetails({...formDetails, email: e.target.value})} 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={formDetails.password} onChange={(e) => setFormDetails({...formDetails, password: e.target.value})} 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={formDetails.confirmPassword} onChange={(e) => setFormDetails({...formDetails, confirmPassword: e.target.value})} 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter city here"
          value={formDetails.city} onChange={(e) => setFormDetails({...formDetails, city: e.target.value})}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phonenumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone number here"
          value={formDetails.phonenumber} onChange={(e) => setFormDetails({...formDetails, phonenumber: e.target.value})}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUp;
