import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../hooks/userContextHook'
import { register } from '../actions/user'
import Spinner from '../components/Spinner';
import Error from '../components/Error';

const SignUp = (props) => {

  let [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [validated, setValidated] = useState(true);
  const [loading, setLoading] = useState(false);

  const { dispatch, error } = useUserContext()

  const navigate = useNavigate()

  async function handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setValidated(true);

    e.preventDefault();

    setLoading(true);
    const isOk = await register(formDetails, dispatch);
    setLoading(false);

    if (isOk !== true) {
      setValidated(false);
      return;
    }

    props.handleClose && props.handleClose();
  }

  return (
    <Form onSubmit={handleSubmit} noValidate validated={validated}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter name here"
          value={formDetails.name} onChange={(e) => setFormDetails({ ...formDetails, name: e.target.value })}
        />
        <Form.Control.Feedback type="invalid">
          Invalid Name
        </Form.Control.Feedback>

      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Enter email here"
          value={formDetails.email} onChange={(e) => setFormDetails({ ...formDetails, email: e.target.value })}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          Invalid Email
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Password"
          value={formDetails.password} onChange={(e) => setFormDetails({ ...formDetails, password: e.target.value })}
        />

        <Form.Control.Feedback type="invalid">
          Provide Password
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Confirm Password"
          isInvalid={formDetails.confirmPassword !== formDetails.password}
          value={formDetails.confirmPassword} onChange={(e) => setFormDetails({ ...formDetails, confirmPassword: e.target.value })}
        />
        <Form.Control.Feedback type="invalid">
          Passwords Don't Match
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter city here"
          value={formDetails.city} onChange={(e) => setFormDetails({ ...formDetails, city: e.target.value })}
        />

        <Form.Control.Feedback type="invalid">
          Invalid City
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="phonenumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter phone number here"
          value={formDetails.phonenumber} onChange={(e) => setFormDetails({ ...formDetails, phonenumber: e.target.value })}
        />

        <Form.Control.Feedback type="invalid">
          Invalid Number
        </Form.Control.Feedback>
      </Form.Group>

      {
        error ?
          <Form.Group className="mb-3" controlId="error">
            <Error>{error}</Error>
          </Form.Group> : null
      }

      <Spinner forceChildren loading={loading}>
        <input type='submit' disabled={loading} className='btn btn-main' value='Sign Up' />
      </Spinner>

    </Form>
  );
};

export default SignUp;
