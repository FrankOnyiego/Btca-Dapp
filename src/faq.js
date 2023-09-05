import React from 'react';
import './Faq.css'; // Import your CSS file for styling
import Navigation from './Navigation/Navigation';
const Faq = () => {
  const faqData = [
    {
      question: 'What is Bitcoin?',
      answer: 'Bitcoin is a decentralized digital currency...',
    },
    {
      question: 'How can I buy Bitcoin?',
      answer: 'You can buy Bitcoin from cryptocurrency exchanges...',
    },
    // Add more FAQ items here
  ];

  return (
    <>
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Faq;
