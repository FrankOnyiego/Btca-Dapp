import React, { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Signup.css'; // Import your CSS file for styling
import { Cookies } from 'react-cookie';

const Signup = () => {
  const cookies = new Cookies();
  const [error, setError] = useState(null); // State to hold error messages

  const handleSignup = async (values) => {
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match'); // Set the error message
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          username: values.username, // Include username in the request
          password: values.password,
        }),
      });

      if (response.ok) {
        console.log('Sign-up successful');
        cookies.set('userToken', values.email);

        const userToken = cookies.get('userToken');
        if (userToken) {
          window.location.href = '/';
        }
        console.log("hello this are my cookies", `btca${userToken}`);
        // Redirect to the login page or perform any other desired action
      } else {
        const errorData = await response.json(); // Parse the error response data
        setError(errorData.error); // Set the error message from the server
        console.log('Sign-up failed', errorData.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred during signup'); // Set a generic error message
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'), // Add validation for username
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <div className="signup-container">
      <Formik
        initialValues={{ email: '', username: '', password: '', confirmPassword: '' }} // Include "username" field
        validationSchema={validationSchema}
        onSubmit={(values) => handleSignup(values)}
      >
        <Form className="signup-form">
          <h2>Sign Up</h2>
          {error && <div className="error-message">{error}</div>} {/* Display the error message */}
          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component="div" className="error-message" />
          <label htmlFor="username">Username:</label> {/* Add username label */}
          <Field type="text" id="username" name="username" /> {/* Add username field */}
          <ErrorMessage name="username" component="div" className="error-message" /> {/* Display username error */}
          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component="div" className="error-message" />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <Field type="password" id="confirmPassword" name="confirmPassword" />
          <ErrorMessage name="confirmPassword" component="div" className="error-message" />
          <button type="submit">Sign Up</button>
          <div className="signup-links">
            <a href="/login">Login</a>
            <span> | </span>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
