import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import './Login.css'; // Import your CSS file for styling

const Login = () => {
  const cookies = new Cookies();
  
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const [error, setError] = useState('');

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post(`${process.env.REACT_APP_API}/login`, values)
      .then((response) => {
        // Handle successful login, e.g., redirect to another page
        cookies.set('userToken', values.email);
        const userToken = cookies.get('userToken');
        if(userToken){
          window.location.href = '/';
        }
        console.log('Login successful:', response.data);
      })
      .catch((error) => {
        // Handle login error, e.g., display an error message
        setError('Incorrect email or password. Please try again.'); // Set the error message
        console.error('Login error:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>} {/* Display the error message */}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="form-control"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <div className="login-links">
              <a href="/forgot-password">Forgot Password?</a>
              <span> | </span>
              <a href="/welcome">Create New Account</a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
