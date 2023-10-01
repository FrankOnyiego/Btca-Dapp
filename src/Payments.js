import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import './Payments.css'; // Import your CSS file
import { Cookies } from 'react-cookie';
const Payments = () => {
  const initialValues = {
    transactionId: '',
    type: '',
  };

    const cookies = new Cookies();
  const userToken = cookies.get('userToken');
  console.log(userToken);

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    // Send the transaction ID to the server 
    axios
      .post(`${process.env.REACT_APP_API}/transactionid`, { transactionId: values.transactionId, email: userToken,type:values.type })
      .then((response) => {
        setStatus({ success: response.data.message });
        setSubmitting(false);
      })
      .catch((error) => {
        setStatus({ error: 'An error occurred while submitting the transaction ID.' });
        setSubmitting(false);
      });

   window.location = '/';
  };

  return (
    <div className="payments-container">
      <h2>Submit Transaction ID</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting, status }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="transactionId">Transaction ID:</label>
              <Field
                type="text"
                id="transactionId"
                name="transactionId"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Investment Type:</label>
              <Field
                as="select" // Use select input
                id="type"
                name="type"
                required
              >
                <option value="" disabled>Select a payment method</option>
                <option value="1">VIP 1</option>
                <option value="2">VIP 2</option>
                <option value="3">VIP 3</option>
                <option value="4">VIP 4</option>
                <option value="5">VIP 5</option>
                <option value="6">VIP 6</option>
                {/* Add more payment methods as needed */}
              </Field>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Confirm Payment
            </button>
            {status && status.success && <p className="success">{status.success}</p>}
            {status && status.error && <p className="error">{status.error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Payments;
