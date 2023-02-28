import React from 'react';
import { useCookies } from 'react-cookie';
import { useLogoutMutation } from '../store/apis/authApi';
import { NavLink } from 'react-router-dom'

function Logout() {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt cookie']);
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    removeCookie('jwt cookie');
  };

  return (
    <>
      <NavLink onClick={handleLogout} to="/logout">Sign Out </NavLink>
    </>
  );
}

export default Logout;
