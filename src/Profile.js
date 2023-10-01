import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Import your CSS file for styling
import { Cookies } from 'react-cookie';
const Profile = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [investments, setInvestments] = useState([]);

  const cookies = new Cookies();
  const userToken = cookies.get('userToken');

  useEffect(() => {
    // Fetch user's email and investments from the backend
    axios.post(`${process.env.REACT_APP_API}/fetch-user-data`,{ email: userToken })
      .then((response) => {
        setEmail(response.data.email);
        setInvestments(response.data.investments);
        setIsLoading(false);
      }) 
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="profile-container">
      <h1>Welcome to Your Profile</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="profile-content">
          <div className="profile-info">
            <h2>My Username:</h2>
            <p>{email}</p>
          </div>
          <div className="investments">
            <h2>My Investments:</h2>
            <table className="investments-table">
              <thead>
                <tr>
                  <th>Package Name</th>
                  <th>Bitcoins</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>VIP 1</td>
                    <td>0 Bitcoins</td>
                </tr>
                <tr>
                    <td>VIP 2</td>
                    <td>0 Bitcoins</td>
                </tr>
                <tr>
                    <td>VIP 3</td>
                    <td>0 Bitcoins</td>
                </tr>
                <tr>
                    <td>VIP 4</td>
                    <td>0 Bitcoins</td>
                </tr>
                <tr>
                    <td>VIP 5</td>
                    <td>0 Bitcoins</td>
                </tr>
                <tr>
                    <td>VIP 6</td>
                    <td>0 Bitcoins</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
