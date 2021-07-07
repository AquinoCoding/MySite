var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var timeRouter = require('./routes/time');
var imcRouter = require('./routes/imc');
var cadRouter = require('./routes/cadastro')
var postsRouter = require('./routes/controller');
var logRouter = require('./routes/login');
var sobRouter = require('./routes/about');
var perfRouter = require('./routes/perfil');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

// Leitura de Json com express ao invés de body-parse

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/time', timeRouter);
app.use('/imc', imcRouter);
app.use('/auth', cadRouter);
app.use('/controllers', postsRouter);
app.use('/login', logRouter);
app.use('/about', sobRouter);
app.use('/perfil', perfRouter);

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
