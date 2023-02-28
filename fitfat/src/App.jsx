import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Login from './component/Login'
import Signup from './component/Signup'
import Navbar from './component/Navbar'
import Home from './component/Home'
import Profile from './component/Profile';
import GymList from './component/GymList';
import Gym from './component/Gym';
import Trainers from './component/Trainers';
import TrainersList from './component/TrainersList';
import SessionList from './component/SessionList';
import Session from './component/Session';
import GymInfo from './component/GymInfo';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import authSlice from './store/authSlice';
import { useDispatch } from 'react-redux';

function App() {
  // const dispatch = useDispatch();

    
  const [cookies, setCookie, removeCookie] = useCookies(['jwt cookie']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(cookies['jwt cookie'],'cokieeeeeeee')
  

  useEffect(() => {
    if (cookies['jwt cookie']) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [cookies]);

  // console.log(isAuthenticated)
  

  return (
    <>
      <Navbar cookies={cookies} isAuthenticated={isAuthenticated}/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Gym/*' element={isAuthenticated?<GymList/>: <Login/>}/>  
      <Route path='/trainers' element={isAuthenticated?<TrainersList/>: <Login/>}/>  
      <Route path='/profile' element={isAuthenticated?<Profile/>: <Login/>}/> 
      <Route path='/gymInfo' element={isAuthenticated?<GymInfo/>: <Login/>}/> 
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/sessions' element={<GymInfo/>}/>
      <Route path='/logout' element={<Home/>}/>

      </Routes>
      




     
    </>
  )
}

export default App
