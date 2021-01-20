const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const parser = bodyParser.urlencoded({extended : true});

const port = process.env.PORT || 4000;

// //Serve any static files
// app.use(express.static(path.join(__dirname, '../react-app/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../react-app/build/index.html'));
//   //res.send('Hello World!')
// });

// //su dung thu muc build trong project nodejs
app.use(express.static(path.join(__dirname, "build")));
//doc file index trong thu muc build
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

let mang = ["Android", "ISO", "PHP", "React"];
app.use(cors()); // su dung cors de connect voi reactjs thong qua link

// Configuring body parser middleware
app.use(parser);
app.use(bodyParser.json());


app.listen( port, () => {
  console.log(`Example app listening on port ${port} !`);
});

app.post('/getNotes', function(req, res){
    res.send(mang);
});

app.get('/mang', (req, res) => {
  res.send(mang);
});

//nodejs nhan data tu reactjs
//Cach 1:
// app.post('/add',parser, function(req, res){
//   var newNote = req.body.user;
//   mang.push(newNote);
//   console.log(mang);
//   res.send(mang);
// });

//Cach 2:
app.post('/add', (req, res) => {
  var newNote = req.body.user;
  mang.push(newNote);
  console.log(mang);
  res.send(mang);
});

app.post('/delete', (req, res) => {
  var id = req.body.idXoa;
  mang.splice(id, 1);
  console.log(mang);
  res.send(mang);
});

app.post('/update', (req, res) => {
  var id = req.body.idSua;
  mang[id] = req.body.noiDung;
  console.log(mang);
  res.send(mang);
});
