import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import "../assets/Login.css"
import { useRef } from 'react';
import { useAddGymMutation } from '../store';

function GymForm() {
  const [addGym, results] = useAddGymMutation();
  const formRef = useRef(null);

  
  const addGymHandler =async (e) => {
    e.preventDefault();

    const { gymName, location, phoneNum } = e.target.elements;

    let formData = {
      gymName: gymName.value,
      location: location.value,
      phoneNum: phoneNum.value
    }
    addGym(formData)
    .unwrap()
    .then(() => {formRef.current.reset();})
    .catch((error) => {
      if (error.status === 400 && error.data && error.data.validation) {
        const validationErrors = error.data.validation.body;
        alert(validationErrors.keys[0] + " " + validationErrors.message);
      } else {
        console.log(error);
      }
    });

  }
  return (
    <div className='form-log'>

      <Form ref={formRef} onSubmit={addGymHandler}>
        <h2>Add Gym </h2>

        <Form.Group as={Col} controlId="gymName">
          <Form.Label>Gym Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Gym name" />
        </Form.Group>

        <Form.Group as={Col} controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter gym location" />
        </Form.Group>

        <Form.Group as={Col} controlId="phoneNum">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="number" placeholder="Enter conaction number" />
        </Form.Group>
        <br></br>



        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default GymForm