import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'
function Navbar({isAuthenticated}) {
  return (
    <div>
      <nav>
      <NavLink to = "/">Home</NavLink>
      <NavLink to = "/gym">Gym</NavLink>
      <NavLink to = "/profile">Profile</NavLink>
      {isAuthenticated ?null :<NavLink  to="/login">login</NavLink>}
      {isAuthenticated ?null :<NavLink  to="/signup">signup</NavLink>}
      {!isAuthenticated ?null : <Logout/>}

      
      </nav>

    </div>
  )
}

export default Navbar