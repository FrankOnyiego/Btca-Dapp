// InvestPopup.js
import React from 'react';
import './InvestPopup.css'; // Import the CSS file for styling
import qr from '../assets/qr.jpg';
const InvestPopup = ({ onClose }) => {
  return (
    <div className="invest-popup">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <div className="popup-content">
        <h1>Send payment to:</h1>
        <img src={qr} alt="Investment" className="popup-image" />
        <p className="popup-text">1NCBvgPsvTBS3xwHzXyd3qBKXeCNBVAvig</p>
      </div>
    </div>
  );
};

export default InvestPopup;
