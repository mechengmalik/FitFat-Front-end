import React from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap';
import SessionList from './SessionList';
import TrainersList from './TrainersList'
import { useLocation } from 'react-router-dom';
import { useFetchTrainersQuery } from '../store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import authSlice from '../store/authSlice';

function GymInfo() {
    const [cookies, setCookie, removeCookie] = useCookies(['jwt cookie']);

    const dispatch = useDispatch();
    // let token = useSelector(state => state.auth.token);



    dispatch(authSlice.actions.setToken(cookies['jwt cookie']));


    const location = useLocation();
    const gym = location.state.gym;
    console.log(location.state.gym)


    const { data, error } = useFetchTrainersQuery(gym);


    let trainers;

    if (data) {
        console.log(data)
        trainers = data.map(trainer => {

            return trainer
        });
    } else {
        trainers = <div>{error}ERROR FETCHING Trainers.......</div>

    }




    const [showTrainer, setShowTrainer] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const renderTrainerList = () => {
        setShowTrainer(true);
        setShowButton(true)
    }

    const renderSessionList = () => {
        setShowTrainer(false);
        setShowButton(false)

    }


    return (
        <div>
            <br></br>

            {showButton ? <Button onClick={renderSessionList} >Sessions</Button> : <Button onClick={renderTrainerList}>Trainers</Button>}


            {showTrainer ? <TrainersList gym={gym} /> : <SessionList gym={gym}  trainer={trainers} />}

        </div>
    )
}

export default GymInfo