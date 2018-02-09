const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')

const index = require('./routes/index');
const news = require('./routes/news');
const music = require('./routes/music');
const user = require('./routes/user');


const app = express();

// Mongoose setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nemu');

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', index);
app.use('/user', user);
app.use('/news', news);
app.use('/music', music);


require('dotenv').config();


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
