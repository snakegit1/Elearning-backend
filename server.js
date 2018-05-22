var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./server/configs/servConfig');

//API file for interacting with MongoDB
//connect to MongoDB
mongoose.connect(config.dbUrl);
var db = mongoose.connection;


//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('server\\migrations\\images'));

// middleware CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
})

//Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//API location
const routes = require('./server/routes');
app.use('/', routes);

//Send all other requests to the Angular app
app.get('*', (req, res) => {
  //Area location
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);


app.use(function (err, req, res, next) {
  if (err)
    res.status(500).end('Invalid request!');
});


const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));