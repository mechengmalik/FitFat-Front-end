import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "../assets/Login.css"
import { useCookies } from 'react-cookie';
import { useSignupMutation } from '../store/apis/authApi';
import { useNavigate } from 'react-router-dom';


function Signup() {
  
  const [cookies, setCookie] = useCookies(['jwt cookie']);

  

  

  
  const [signup ] = useSignupMutation();
  const navigate = useNavigate();


 
  async function handleUserSignup(event) {
    event.preventDefault()
    const {firstName,lastName, userEmail, password } = event.target.elements;

    let user = {
      firstName:firstName.value,
      lastName:lastName.value,
      userEmail: userEmail.value,
      password: password.value,
    }
    console.log(user)

    try {
      const response = await signup(user ).unwrap();
      setCookie('jwt cookie', response, { path: '/' })
      console.log(response)
      navigate("/login",{state:{response}}) 
    } catch (error) {
      console.log(error.message)
    }
  }



  return (
    <div className='form-sign'>

      <Form onSubmit={handleUserSignup}>
        <h2>Sign Up </h2>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" placeholder="Enter First name" />
          </Form.Group>

          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
          </Form.Group>
        </Row>

        {/* <Row className="mb-3"> */}
        <Form.Group as={Col} controlId="userEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <br></br>
        <Button type="submit" variant="primary">
          SignUp
        </Button>
      </Form>
    </div>
  );
}



export default Signup