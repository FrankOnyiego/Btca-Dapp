const BitcoinCore = require('bitcoin-core');
const express = require('express');
const cors = require('cors');
const mysql=require('mysql');
const cookie = require('cookie');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');


const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());

// Define rate limiting options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Number of requests allowed in the defined window
  message: 'Too many requests from this IP, please try again later.',
});

// Apply the rate limiter to all requests
app.use(limiter);

// Replace with your fixed Bitcoin receiving address
const fixedReceivingAddress = '1NCBvgPsvTBS3xwHzXyd3qBKXeCNBVAvig';

// Replace with your Blockstream Esplora API URL
const esploraBaseUrl = 'https://blockstream.info/api';

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'btca',
};

const dbConnection = mysql.createConnection(dbConfig);
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.post('/fetch-user-data', (req, res) => {
  // Replace this with your logic to fetch user data from your database
  const userEmail = req.body.email;

  // Fetch user email
  const userEmailQuery = 'SELECT email FROM users WHERE email = ?';
  dbConnection.query(userEmailQuery, [userEmail], (err, emailResults) => {
    if (err) {
      console.error('Error fetching user email:', err);
      res.status(500).json({ error: 'An error occurred while fetching user data' });
      return;
    }

    if (emailResults.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const email = emailResults[0].email;


      // Prepare and send the response
      const userData = {
        email
      };
      res.status(200).json(userData);
    });
  });


app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if the email is already registered
  const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;

  dbConnection.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ error: 'An error occurred during registration' });
    }

    if (results.length > 0) {
      // Email is already registered
      return res.status(409).json({ error: 'Email is already registered' });
    }

    try {
      // Hash the user's password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Email is not registered, proceed with registration
      const insertUserQuery = `INSERT INTO users (email, password_hash) VALUES (?, ?)`;

      dbConnection.query(insertUserQuery, [email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({ error: 'An error occurred during registration' });
        }

        console.log('User registered successfully');
        // Assuming the user is registered successfully
        return res.status(200).json({ message: 'User registered successfully' });
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      return res.status(500).json({ error: 'An error occurred during registration' });
    }
  });
});

  

// Route to handle login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Query the database for the user with the provided email
  dbConnection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }

    // Check if a user with the provided email was found
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const user = results[0];
    try {
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (passwordMatch) {
        return res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
  });
});



app.listen(3001, () => {
  console.log('Server is running on port 3001'); 
});
