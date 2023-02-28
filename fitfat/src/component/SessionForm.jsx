import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useFetchTrainersQuery } from '../store';
import { useState } from 'react';
import { useAddSessionMutation } from '../store';
import { useRef } from 'react';
function SessionForm({ gym }) {

    const [selectTrainer,setSelectTrainer]= useState(0);
    

    const selectTrainerValue =(e)=>{
        setSelectTrainer(parseInt(e.target.value))
    }

//       useEffect(() => {
//     dispatch(authSlice.actions.setToken(cookies[token]));
//   }, []);
   

    const { data, error } = useFetchTrainersQuery(gym);

    
    let trainer;

    if (data) {
        trainer = data.map(trainer => {
            // console.log("ffffffffffffffffff")
            return <option type="number" key={trainer.id} value={trainer.id}>{trainer.trainerName} </option>
        });
    } else {
        trainer = <div>{error}ERROR FETCHING Trainers.......</div>

    }


    const [addSession, results] = useAddSessionMutation();
    const formRef = useRef(null);


    const addSessionHandler = (e) => {
        e.preventDefault();

        const { sessionName, price, capacity, type } = e.target.elements;

        let formData = {
            sessionName: sessionName.value,
            price: price.value,
            capacity: capacity.value,
            type: type.value,
            trainerId: selectTrainer,
            gymId: gym.id

        }
        console.log(formData);

        addSession(formData)
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
        <div className='form-sign'>

            <Form ref={formRef} onSubmit={addSessionHandler}>
                <h2>Add Session</h2>
                {data ? <Form.Group className="mb-3">
                    <Form.Label>select trainer</Form.Label>
                    <Form.Select value={selectTrainer} onChange={selectTrainerValue} >
                        {trainer}
                    </Form.Select>
                </Form.Group> : null}
                
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="sessionName">
                        <Form.Label>Session Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Session name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter session price" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="capacity">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control type="text" placeholder="Enter session capacity" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter session type" />
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

export default SessionForm