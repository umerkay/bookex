import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUserContext } from '../hooks/userContextHook'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../actions/user'


function UserSignin() {
    
  let [formDetails, setFormDetails] = useState({
    email: '',
    password: ''
  })

  const {dispatch} = useUserContext()

  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    login(formDetails, dispatch)

    setFormDetails({
        email: '',
        password: ''
    })

    navigate('/')
  }

  return (
    <Form onSubmit= {handleSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" value = {formDetails.email} placeholder="Enter your email address" onChange={(e) => setFormDetails({...formDetails, email: e.target.value})}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={formDetails.password} onChange={(e) => setFormDetails({...formDetails, password: e.target.value})} />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default UserSignin;