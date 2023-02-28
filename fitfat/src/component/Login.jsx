import React from 'react'
import { useCookies } from 'react-cookie'
import { Form, Button } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Login.css"
import { useLoginMutation } from '../store'
import { useNavigate } from 'react-router-dom';
import authSlice from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';



function Login() {



  const [cookies, setCookie] = useCookies(['jwt cookie']);
  const navigate = useNavigate();
  const dispatch = useDispatch();




  // const [login ,result] = useLoginMutation()

  const [login, { isSuccess }] = useLoginMutation();
  let token = useSelector(state => state.auth.token);





  async function handleUserLogin(event) {
    event.preventDefault()
    const { userEmail, password } = event.target.elements;

    let formData = {
      userEmail: userEmail.value,
      password: password.value,

    }

    try {
      const response = await login(formData).unwrap();
      // console.log(response)
      token = response.token.toString();
      console.log(token, 'ttttttttttttttttttttt')
      dispatch(authSlice.actions.setToken(token));
      setCookie('jwt cookie', token, { path: '/' })

      navigate("/", { state: { token } })
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='form-log'>
      <Form onSubmit={handleUserLogin}>
        <h2>Login</h2>
        <Form.Group className="mb-2" controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button type="submit" variant="primary" >
          login
        </Button>
      </Form>


    </div>

  )
}

export default Login