import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  // const history = useHistory()
  // const {pathname} = useLocation()

  const onLogout = async (e) => {
    await dispatch(logout());

    // if (pathname === '/') {
      return window.location.reload()
    // } else {
    //   return history.push('/')
    // }
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
