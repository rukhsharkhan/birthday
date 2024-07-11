const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const methodOverride = require('method-override');
const mysql = require('mysql2');

// Load environment variables from .env file
dotenv.config();

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rukh@999',
  database: 'birthday'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    throw err;
  }
  console.log('Connected to MySQL database.');
});

// Initialize Express app
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Set up view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes

// GET request to fetch all messages and render index.ejs
app.get('/', (req, res) => {
  connection.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      console.error('Error fetching messages from database:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.render('index', { messages: results });
  });
});

// GET request to fetch all messages as JSON
app.get('/messages', (req, res) => {
  connection.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      console.error('Error fetching messages from database:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.json(results);
  });
});

// POST request to insert a new message
app.post('/messages', (req, res) => {
  const message = req.body.message;
  connection.query('INSERT INTO messages (message) VALUES (?)', [message], (err, result) => {
    if (err) {
      console.error('Error inserting message into database:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    console.log('Message inserted:', message);
    res.json({ success: true });
  });
});

// DELETE request to delete a message by ID
app.delete('/messages/:id', (req, res) => {
  const messageId = req.params.id;
  connection.query('DELETE FROM messages WHERE id = ?', [messageId], (err, result) => {
    if (err) {
      console.error('Error deleting message from database:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    console.log('Message deleted with ID:', messageId);
    res.json({ success: true });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});

module.exports = app;
