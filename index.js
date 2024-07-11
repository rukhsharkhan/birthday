const express=require("express");
const app= express();
const cors = require('cors');
const port=8080;
const bodyParser = require('body-parser');
const path=require("path");
let methodOverride = require('method-override');
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));

app.use(cors());
app.use(bodyParser.json());

let messages = [];

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.listen(port,()=>{
  console.log("app is listening to port " + port);
})

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