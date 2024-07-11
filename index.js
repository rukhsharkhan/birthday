const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

let messages = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { messages });
});

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/messages', (req, res) => {
    const message = req.body.message;
    messages.push(message);
    res.json({ success: true });
});

app.delete('/messages/:index', (req, res) => {
    const index = parseInt(req.params.index);
    messages.splice(index, 1);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});