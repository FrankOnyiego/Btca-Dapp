import React from 'react';
import './Footer.css'; // Import your CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p>&copy; {new Date().getFullYear()} Btcinvest. All rights reserved.</p>
        </div>
        <div className="footer-section contact-section">
          <h4>Contact Us</h4>
          <p><a href="mailto:support@btcinvest.vip">Email: support@btcinvest.vip</a></p>
          <p>Location: Atlanta, USA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
