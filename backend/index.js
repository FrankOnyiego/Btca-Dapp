const express = require('express');
const cors = require('cors');
const mysql=require('mysql');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());

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


  app.post('/register', (req, res) => {
    const { email, password } = req.body; // Assuming your request body contains email and password
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    // Check if the email is already registered
    const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
  
    dbConnection.query(checkEmailQuery, [email], (err, results) => {
      if (err) {
        console.error('Error checking email:', err);
        return res.status(500).json({ error: 'An error occurred during registration' });
      }
  
      if (results.length > 0) {
        // Email is already registered
        return res.status(409).json({ error: 'Email is already registered' });
      }
  
      // Email is not registered, proceed with registration
      const insertUserQuery = `INSERT INTO users (email, password_hash) VALUES (?, ?)`;
  
      dbConnection.query(insertUserQuery, [email, password], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({ error: 'An error occurred during registration' });
        }
  
        console.log('User registered successfully');
        // Assuming the user is registered successfully
        return res.status(200).json({ message: 'User registered successfully' });
      });
    });
  });
  
  /*Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]*/

// Route to handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query the database for the user with the provided email
  dbConnection.query('SELECT * FROM users WHERE email = ? AND password_hash = ?', [email,password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }

    // Check if a user with the provided email was found
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (results.length > 0) {
      return res.status(200).json({ success: true, message: 'operation successful' });
    }

  });
});


app.listen(3001, () => {
  console.log('Server is running on port 3001'); 
});
