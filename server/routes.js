const express = require('express');
const app = express();

const api = require('./api');

 //API location
 app.use('/api', api);

 module.exports = app;