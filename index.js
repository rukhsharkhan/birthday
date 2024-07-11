const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
const methodOverride = require('method-override');
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rukh@999',
  database: 'birthday'
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    throw err;
  }
  console.log('Connected to MySQL database.');
});


app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));

const port = 8080;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});


app.get('/', (req, res) => {
  connection.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      console.error('Error fetching messages from database:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.render('index', { messages: results });
  });
});



app.get('/messages', (req, res) => {
  connection.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      console.error('Error fetching messages from database:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
    res.json(results);
  });
});


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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});