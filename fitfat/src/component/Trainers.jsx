import React from 'react'
import { Card, Form, Button } from "react-bootstrap/";
import { useRemoveTrainerMutation } from '../store';

function Trainers({ trainer }) {
  const [removeTrainer, removeTrainerResult] = useRemoveTrainerMutation();

  const removeTrainerHandler = () => {
    removeTrainer(trainer)
  }


  return (
    <div>
      <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src="src\assets\trainer.jpg" />
        <Card.Body>
          <Card.Title>{trainer.trainerName}</Card.Title>
          <Card.Text>
           Info :  {trainer.bio}
          </Card.Text>
          <Card.Text>
           experiance : {trainer.experiance}
          </Card.Text>
          <Card.Text>
           contact Num# : 0{trainer.phoneNum}
          </Card.Text>



          {/* <Button onClick={()=>navigate("/session",{state:{gym}}) } variant="primary">Gym Session</Button> */}
          <Button onClick={removeTrainerHandler} variant="danger">Delete</Button>

        </Card.Body>
      </Card>
    </div>
  )
}

export default Trainers;