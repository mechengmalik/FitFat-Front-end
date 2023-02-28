import React from 'react'
import { useLocation } from "react-router-dom";
import { useFetchTrainersQuery } from '../store'
import TrainerForm from './TrainerForm';
import Trainers from './Trainers'
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import authSlice from '../store/authSlice';
import { useSelector } from 'react-redux';

function TrainersList({ gym, token }) {
  // const location = useLocation();
  // const gym = location.state.gym;
  // console.log(location.state.gym)





  const [cookies, setCookie, removeCookie] = useCookies(['jwt cookie']);

  const dispatch = useDispatch();
  token = useSelector(state => state.auth.token);
  dispatch(authSlice.actions.setToken(cookies['jwt cookie']));


  const { data, error } = useFetchTrainersQuery(gym);

  let trainerContent;

  if (data) {
    trainerContent = data.map(trainer => {
      return <Trainers key={trainer.id} trainer={trainer} />
    });
  } else {
    trainerContent = <div>{error}ERROR FETCHING Trainers.......</div>

  }

  return (
    <div>
      <div>
        <h3>{gym.gymName}</h3>
      </div>
      <div>
        <TrainerForm gym={gym} />
      </div>
      <hr></hr>
      <br></br>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gridGap: '20px', justifyContent: 'center' }}>

        {trainerContent}
      </div>
    </div>
  )
}


export default TrainersList