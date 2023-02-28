import React from 'react'
import { Card, Form, Button } from "react-bootstrap/";
import { useNavigate } from "react-router-dom";
import { useRemoveGymMutation } from '../store';



function Gym({ gym }) {

  const navigate = useNavigate();



  const [removeGym, removeGymResule] = useRemoveGymMutation();

  const removeGymHandler = () => {
    removeGym(gym);
  }


  return (
    <div>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="src\assets\gym.jpg" />

        <Card.Body>
          <Card.Title>{gym.gymName}</Card.Title>
          <Card.Text>
            {gym.location}
          </Card.Text>
          <Card.Text>
            0{gym.phoneNum}
          </Card.Text>


          <Button onClick={() => navigate("/gymInfo", { state: { gym } })} variant="primary">Gym Session</Button>

          <Button onClick={removeGymHandler} variant="danger">Delete</Button>

        </Card.Body>
      </Card>
    </div>
  )
}

export default Gym