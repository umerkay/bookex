import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUserContext } from '../hooks/userContextHook'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../actions/user'
import BasicModal from '../components/BasicModal';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';



function UserSignin(props) {

  let [formDetails, setFormDetails] = useState({
    email: '',
    password: ''
  });

  const [toggle, setToggle] = useState(false);

  const { dispatch } = useUserContext();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await login(formDetails, dispatch);

    setFormDetails({
      email: '',
      password: ''
    });

    props.handleClose();

    navigate('/');
  }

  //create signup signin toggle in bootstrap modal

  return (
    <BasicModal header={
      <ButtonGroup className="mb-2">
          <ToggleButton
            id={`radio-1`}
            type="radio"
            variant="secondary"
            name="radio"
            checked={toggle}
            onChange={(e) => setToggle(true)}
          >
            Sign Up
          </ToggleButton>
          <ToggleButton
            id={`radio-2`}
            type="radio"
            variant="secondary"
            name="radio"
            checked={!toggle}
            onChange={(e) => setToggle(false)}
          >
            Sign In
          </ToggleButton>
      </ButtonGroup>
    } show={props.show} handleClose={props.handleClose} title={"Sign In"} >
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" value={formDetails.email} placeholder="Enter your email address" onChange={(e) => setFormDetails({ ...formDetails, email: e.target.value })} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={formDetails.password} onChange={(e) => setFormDetails({ ...formDetails, password: e.target.value })} />
        </Form.Group>

        <input type='submit' className='btn btn-main' value='Sign In' />
      </Form>
    </BasicModal>
  );
}

export default UserSignin;