var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');  // add at the top


var characterRouter = require('./routes/characterSheet');
var classRouter = require('./routes/characterClass');
var inventoryRouter = require('./routes/inventory');
var listRouter = require('./routes/inventoryList');
var raceRouter = require('./routes/race');


var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());  // add after 'app' is created


app.use('/character', characterRouter);
app.use('/class', classRouter);
app.use('/inventory', inventoryRouter);
app.use('/inventoryList', listRouter);
app.use('/race', raceRouter);




module.exports = app;
