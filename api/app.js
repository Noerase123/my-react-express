var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv/config')

var indexRouter = require('./routes/index');
const apiRouter = require('./routes/Api');

var app = express();

const url = 'mongodb://127.0.0.1:27017/my-react-app'
mongoose.connect(url,
    {
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
    .then(res => {
        console.log(res)
        console.log("OK!")
    })
    .catch(err => {
        console.log(err)
        console.log("ERROR!")
    })

mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
