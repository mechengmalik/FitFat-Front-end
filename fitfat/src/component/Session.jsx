import React from 'react'
import { Card, Form, Button } from "react-bootstrap/";
import { useNavigate } from "react-router-dom";
import { useRemoveSessionMutation } from '../store';
function Session({ session, trainer}) {

  const [removeSession, removeSessionResult] = useRemoveSessionMutation();

  const removeSessionHandler = () => {
    removeSession(session)
  }
  console.log(trainer)
  console.log(session)

  // let trainerName = trainer.map((trainer,id)=>{
  //   return trainer.trainerName
  // }) ;
  // console.log(trainerContenet)


  return (
    
    <div>
      <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src="src\assets\homepage.jpg" />
        <Card.Body>
          <Card.Title>{session.sessionName}</Card.Title>
          <Card.Text>
           Price : {session.price}$
          </Card.Text>
          <Card.Text>
           Capacity : {session.capacity}
          </Card.Text>
          <Card.Text>
            Trainer : {session.Trainer.trainerName}
          </Card.Text>



          {/* <Button onClick={()=>navigate("/session",{state:{gym}}) } variant="primary">Gym Session</Button> */}
          <Button onClick={removeSessionHandler} variant="danger">Delete</Button>

        </Card.Body>
      </Card>
    </div>
  )
}

export default Session