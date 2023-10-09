// Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Cookies } from 'react-cookie';

const Admin = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [unconfirmedRequests, setUnconfirmedRequests] = useState([]);

  const cookies = new Cookies();
  const userToken = cookies.get('userToken');

  useEffect(() => {
    // Fetch total number of users
    axios
      .get(`${process.env.REACT_APP_API}/total-users`)
      .then((response) => {
        setTotalUsers(response.data.totalUsers);
      })
      .catch((error) => {
        console.error('Error fetching total users:', error);
      });

    // Fetch total investments
    axios
      .get(`${process.env.REACT_APP_API}/total-investments`)
      .then((response) => {
        setTotalInvestments(response.data.totalInvestments);
      })
      .catch((error) => {
        console.error('Error fetching total investments:', error);
      });

    // Fetch unconfirmed investment requests
    axios
      .get(`${process.env.REACT_APP_API}/unconfirmed-requests`)
      .then((response) => {
        setUnconfirmedRequests(response.data.unconfirmedRequests);
      })
      .catch((error) => {
        console.error('Error fetching unconfirmed requests:', error);
      });
  }, []);

  const handleConfirm = (requestId, amount) => {
    // Send a request to confirm the investment with the given requestId and amount
    axios
      .post(`${process.env.REACT_APP_API}/confirm-investment`, { requestId, amount, userToken })
      .then((response) => {
        // Update the state or handle the confirmation success
        window.location = '/rootadmin';
      })
      .catch((error) => {
        console.error('Error confirming investment:', error);
      });
  };

  // Create a Formik form for validation
  const formik = useFormik({
    initialValues: {
      // Initialize amount values for each request
      ...unconfirmedRequests.reduce((initialValues, request) => {
        initialValues[`amount-${request.investment_id}`] = '';
        return initialValues;
      }, {}),
    },
    validationSchema: Yup.object().shape(
      // Add validation for each amount field
      unconfirmedRequests.reduce((validationSchema, request) => {
        validationSchema[`amount-${request.investment_id}`] = Yup.number()
          .positive('Amount must be positive')
          .typeError('Invalid amount');
        return validationSchema;
      }, {})
    ),
    onSubmit: (values) => {
      // Filter out empty values and submit filled inputs
      const filledValues = {};
      for (const key in values) {
        if (values[key] !== '') {
          const requestId = key.replace('amount-', '');
          filledValues[requestId] = values[key];
        }
      }

      // Iterate through filled values and send confirmations
      for (const requestId in filledValues) {
        handleConfirm(requestId, parseFloat(filledValues[requestId]));
      }

      // Reset the form after submission (optional)
      formik.resetForm();
    },
  });

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <div className="admin-stats">
        <div className="admin-stat">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="admin-stat">
          <h3>Total Investments</h3>
          <p>{totalInvestments}</p>
        </div>
      </div>
      <div className="unconfirmed-requests">
        <h3>Unconfirmed Investment Requests</h3>
        <form onSubmit={formik.handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Amount (BTC)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {unconfirmedRequests.map((request) => (
                <tr key={request.investment_id}>
                  <td>{request.transactionid}</td>
                  <td>
                    <input
                      type="number"
                      name={`amount-${request.investment_id}`}
                      id={`amount-${request.investment_id}`}
                      value={formik.values[`amount-${request.investment_id}`]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched[`amount-${request.investment_id}`] &&
                    formik.errors[`amount-${request.investment_id}`] ? (
                      <div className="error-message">
                        {formik.errors[`amount-${request.investment_id}`]}
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <button type="button" onClick={() => handleConfirm(request.investment_id, formik.values[`amount-${request.investment_id}`])}>Confirm</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit">Confirm all</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
