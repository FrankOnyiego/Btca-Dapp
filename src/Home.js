import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Home.css'; // Import your CSS file for styling
import { Link, NavLink } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import axios from 'axios';
import InvestPopup from './popup/Investpopup';
// Import the InvestPopup component from another file


const Home = () => {
  const [cookies] = useCookies(['userToken']); // Assuming you store a cookie named 'userToken'
  const [showInvestPopup, setShowInvestPopup] = useState(false);

  if (!cookies.userToken) {
    // If the 'userToken' cookie doesn't exist, redirect to the login page
    window.location.href = '/login'; // Adjust the path as needed
    console.log("Hello the following are my cookies", cookies.userToken);
  }

  const handleInvest = async (amount) => {
    try {
      // Show the popup when the Invest button is clicked
      setShowInvestPopup(true);
    } catch (error) {
      console.error('Error investing:', error);
    }
  };

  return (
    <div>
      <div className="content">
        <h1>Welcome to the Btca!</h1>
        <div className="tab-content">
          <div className="tab">
            <h2>VIP Plans</h2>
            <table className="vip-table">
              <thead>
                <tr>
                  <th>VIP</th>
                  <th>Invest</th>
                  <th>Limit</th>
                  <th>Annual ROI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 <button className="invest-button" onClick={handleInvest}>Invest</button> </td>
                  <td>฿ 0.005</td>
                  <td>฿ 0.01</td>
                  <td>3%</td>
                </tr>
                <tr>
                  <td>2 <button className="invest-button" onClick={handleInvest}>Invest</button> </td>
                  <td>฿ 0.05</td>
                  <td>฿ 1.00</td>
                  <td>5%</td>
                </tr>
                <tr>
                  <td>3 <button className="invest-button" onClick={handleInvest}>Invest</button> </td>
                  <td>฿ 0.08</td>
                  <td>฿ 2.00</td>
                  <td>6%</td>
                </tr>
                <tr>
                  <td>4 <button className="invest-button" onClick={handleInvest}>Invest</button> </td>
                  <td>฿ 0.10</td>
                  <td>฿ 5.00</td>
                  <td>8%</td>
                </tr>
                <tr>
                  <td>5 <button className="invest-button" onClick={handleInvest}>Invest</button> </td>
                  <td>฿ 0.20</td>
                  <td>฿ 20.00</td>
                  <td>9%</td>
                </tr>
                <tr>
                  <td>6 <button className="invest-button" onClick={handleInvest}>Invest</button> </td>
                  <td>Above ฿ 0.20</td>
                  <td>Unlimited</td>
                  <td>10%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Conditionally render the popup */}
      {showInvestPopup && <InvestPopup onClose={() => setShowInvestPopup(false)} />}
    </div>
  );
};

export default Home;
