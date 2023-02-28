import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useRef } from 'react';
import { useAddTrainerMutation } from '../store/apis/trainerApi';

function TrainerForm({gym}) {
    const [addTrainer, results] = useAddTrainerMutation();
    const formRef = useRef(null);

    const addTrainerHandler = (e) => {
        e.preventDefault();

        const { trainerName, experiance, bio, phoneNum } = e.target.elements;

        let formData = {
            trainerName: trainerName.value,
            experiance: experiance.value,
            bio: bio.value,
            phoneNum: phoneNum.value,
            gymId: gym.id
           
        }
        console.log(formData);

        addTrainer(formData)
        .unwrap()
        .then(() => { formRef.current.reset();})
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
        <div className='form-sign'>

            <Form ref={formRef} onSubmit={addTrainerHandler}>
                <h2>Add Trainer</h2>


                <Row className="mb-3">
                    <Form.Group as={Col} controlId="trainerName">
                        <Form.Label>trainer Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Trainer name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="experiance">
                        <Form.Label>Experiance</Form.Label>
                        <Form.Control type="number" placeholder="Enter  experiance" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="bio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="phoneNum">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="contact number" />
                    </Form.Group>
                    <br></br>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default TrainerForm