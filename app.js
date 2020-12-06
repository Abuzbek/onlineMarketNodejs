const createError = require('http-errors');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exhbs = require('express-handlebars')
const session = require('express-session')

const indexRouter = require('./routes/index');
const app = express();
// =============================== //
//  ===== mongoDb connection ===== //
// =============================== //
const db = require('./config/db')
db('mongodbga online ulandik')
// =============================== //
//  ===== mongoDb connection ===== //
// =============================== //

//  ============ dotEnv ============

dotenv.config({ path: './config/config.env' });

//  ============ dotEnv ============

// view engine setup
app.engine('.hbs', exhbs({
  defaultLayout: 'layout',
  extname: ".hbs"
}) )
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/', indexRouter);

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
