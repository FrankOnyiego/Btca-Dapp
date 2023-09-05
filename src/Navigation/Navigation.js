import React from 'react';
import { Cookies } from 'react-cookie';
function Navigation() {
  const cookies = new Cookies();
  const userToken = cookies.get('userToken');
  const currentPath = window.location.pathname;
  if(!userToken){
    return null;
  }
  
  if(userToken && currentPath == '/welcome'){
    window.location.href = '/';
  }

  if(currentPath == '/welcome'){
    return null;
  }

  const deleteCookie = () => {
    cookies.remove('userToken', { path: '/' });
  };
  console.log(currentPath);
  return (
    <ul>
      <li><a href="profile">Profile</a></li>
      <li><a href="invest">Invest</a></li>
      <li><a href="withdraw">Withdraw</a></li>
      <li><a href="faq">Faqs</a></li>
      <li style={{ float: 'right' }}><a className="active" onClick={deleteCookie} href="login">Logout</a></li>
    </ul>
  );
}

export default Navigation;
