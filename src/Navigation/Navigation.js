import React from 'react';
import { Cookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';

function Navigation() {
  const cookies = new Cookies();
  const userToken = cookies.get('userToken');
  const currentPath = window.location.pathname;

  if (!userToken) {
    return null;
  }

  if (userToken && currentPath === '/welcome') {
    window.location.href = '/';
  }

  if (currentPath === '/welcome') {
    return null;
  }

  const deleteCookie = () => {
    cookies.remove('userToken', { path: '/' });
  };

  return (
    <ul>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <NavLink to="/invest">Invest</NavLink>
      </li>
      <li>
        <NavLink to="/withdraw">Withdraw</NavLink>
      </li>
      <li>
        <NavLink to="/faq">Faqs</NavLink>
      </li>
      <li style={{ float: 'right' }}>
        <button className="active" onClick={deleteCookie}>
          <NavLink to="/login">Logout</NavLink>
        </button>
      </li>
    </ul>
  );
}

export default Navigation;
