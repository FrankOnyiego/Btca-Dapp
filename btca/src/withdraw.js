import React, { useState } from 'react';
import './WithdrawInvestments.css'; // Import your CSS file for styling

const WithdrawInvestments = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawError, setWithdrawError] = useState(null);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const handleWithdraw = () => {
    // Example validation
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      setWithdrawError('Please enter a valid withdrawal amount.');
      return;
    }

    // Simulate withdrawal success
    setWithdrawSuccess(true);
    setWithdrawError(null);
    setWithdrawAmount('');
  };

  return (
    <div className="withdraw-investments">
      <h2>Withdraw Investments</h2>
      <div className="withdraw-form">
        <label htmlFor="withdrawAmount">Withdraw Amount (BTC)</label>
        <input
          type="number"
          id="withdrawAmount"
          placeholder="Bitcoin amount here ..."
          value={withdrawAmount} 
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        {withdrawError && <p className="error-message">{withdrawError}</p>}
        {withdrawSuccess && <p className="error-message">insufficient Bitcoin balance!</p>}
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  );
};

export default WithdrawInvestments;
