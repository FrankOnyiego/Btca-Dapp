import React from 'react';
import './Footer.css'; // Import your CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p>&copy; {new Date().getFullYear()} Btca. All rights reserved.</p>
        </div>
        <div className="footer-section contact-section">
          <h4>Contact Us</h4>
          <p>Email: support@btca.vip</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
