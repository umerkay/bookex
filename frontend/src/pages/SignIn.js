import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUserContext } from '../hooks/userContextHook'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../actions/user'
import BasicModal from '../components/BasicModal';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import SignUp from './SignUp';
import Spinner from '../components/Spinner';
import Error from '../components/Error';


function UserSignin(props) {

  let [formDetails, setFormDetails] = useState({
    email: '',
    password: ''
  });

  const [toggle, setToggle] = useState(false);

  const { dispatch, error } = useUserContext();
  const [validated, setValidated] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (error) {
  //     setValidated(false);
  //   }
  // }, [error]);

  useEffect(() => {
    dispatch({type: 'CLEAR_ERROR'});
  }, [toggle]);

  useEffect(() => {
    dispatch({type: 'CLEAR_ERROR'});
  }, [props.show]);


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
    const isOk = await login(formDetails, dispatch);
    setLoading(false);

    if (isOk !== true) {
      setValidated(false);
      return;
    }

    // setFormDetails({
    //   email: '',
    //   password: ''
    // });

    props.handleClose();

    navigate('/');
  }

  //create signup signin toggle in bootstrap modal

  return (
    <BasicModal show={props.show} handleClose={props.handleClose} title={"Sign In"} >
      <ButtonGroup className="mb-2">
        <ToggleButton
          id={`radio-2`}
          type="radio"
          variant="main"
          name="radio"
          checked={!toggle}
          onChange={(e) => setToggle(false)}
        >
          Sign In
        </ToggleButton>
        <ToggleButton
          id={`radio-1`}
          type="radio"
          variant="main"
          name="radio"
          checked={toggle}
          onChange={(e) => setToggle(true)}
        >
          Sign Up
        </ToggleButton>
      </ButtonGroup>
      {toggle ? <SignUp handleClose={() => setToggle(false)}></SignUp> :
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control required type="email" name="email" value={formDetails.email} placeholder="Enter your email address" onChange={(e) => { setFormDetails({ ...formDetails, email: e.target.value }) }} />

            <Form.Control.Feedback type="invalid">
              Invalid email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Password" name="password" value={formDetails.password} onChange={(e) => setFormDetails({ ...formDetails, password: e.target.value })} />
            <Form.Control.Feedback type="invalid">
              Please enter your password
            </Form.Control.Feedback>
          </Form.Group>

          {
            error ?
              <Form.Group className="mb-3" controlId="error">
                <Error>{error}</Error>
              </Form.Group> : null
          }

          <Spinner forceChildren loading={loading}>
            <input type='submit' disabled={loading} className='btn btn-main' value='Sign In' />
          </Spinner>
        </Form>}
    </BasicModal>
  );
}

export default UserSignin;