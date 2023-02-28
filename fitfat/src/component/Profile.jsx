import React from 'react'
import '../assets/profile.css'
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import authSlice from '../store/authSlice';
import { useSelector } from 'react-redux';
import { useFetchUserQuery } from '../store';
import { useEffect } from 'react';

function Profile() {
  const { data, error } = useFetchUserQuery();
  console.log(data)

  const [cookies, setCookie, removeCookie] = useCookies(['jwt cookie']);

  const dispatch = useDispatch();
  // let token = useSelector(state => state.auth.token);

  
    dispatch(authSlice.actions.setToken(cookies['jwt cookie']));
  
  return (
    <>
      <div className="profile-page">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-12">
            <div className="card profile-header">
              <div className="body">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-12">
                    <div className="profile-image float-md-right"> <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" /> </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-12">
                    <h4 className="m-t-0 m-b-0"><strong>Name : </strong>{data?.firstName}  {data?.lastName} </h4>
                    <span className="job_post">E-mail : {data?.userEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
