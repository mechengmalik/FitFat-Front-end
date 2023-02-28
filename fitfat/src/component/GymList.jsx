import React from 'react'
import GymForm from './GymForm';
import { useFetchGymsQuery } from '../store'
import Gym from './Gym'
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import authSlice from '../store/authSlice';
import { useSelector } from 'react-redux';

function GymList() {

  const [cookies, setCookie, removeCookie] = useCookies(['jwt cookie']);

  const dispatch = useDispatch();

  dispatch(authSlice.actions.setToken(cookies['jwt cookie']));

  const { data, error } = useFetchGymsQuery();
  console.log(data)
  


  let gymContent;

  if (data) {
    gymContent = data.map(gym => {

      return <Gym key={gym.id} gym={gym}  />
    });
  } else {
    gymContent = <div>ERROR FETCHING GYMS.......</div>

  }
  return (
    <div>
      <GymForm  />
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gridGap: '20px', justifyContent: 'center' }}>
      
      {gymContent}
    </div>
    </div>
  );
}

export default GymList