import React from 'react'
import { useLocation } from "react-router-dom";
import { useFetchSessionsQuery } from '../store';
import Session from './Session';
import SessionForm from './SessionForm';
import { useState } from 'react';

function SessionList({ gym, trainer, token }) {
  // const [listShow,setListShow]=useState(true);

  // const location = useLocation();
  // const gym = location.state.gym;
  // console.log(location.state.gym)

  const { data, error } = useFetchSessionsQuery(gym);
  // console.log(data)
  // const trainer = data.Trainer


  let sessionContent;
  if (data) {
    sessionContent = data.map(session => {
      return <Session key={session.id} session={session} trainer={session.Trainer} />
    });
  } else {
    sessionContent = <div>{error}ERROR FETCHING Sessions.......</div>

  }

  return (
    <div>
      <div>
        <h3>{gym.gymName}</h3>
      </div>
      <div>
        <SessionForm gym={gym} trainer={trainer} />
      </div>
      <hr></hr>
      <br></br>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gridGap: '20px', justifyContent: 'center' }}>

        {sessionContent}
      </div>
    </div>
  )
}



export default SessionList;