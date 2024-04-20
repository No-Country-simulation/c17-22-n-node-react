const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { PrismaClient} = require('@prisma/client')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const entrepreneurshipsRouter = require('./routes/entrepreneurships');
const loginRouter = require('./routes/auth');
const registerRouter = require('./routes/register');

require("dotenv").config()

const app = express();

// configure jwt
app.set('jwt-secret',process.env.JWT_SECRET);

const prisma = new PrismaClient();
// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/entrepreneurships/', entrepreneurshipsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ error: 'Not Found', message: 'El recurso solicitado no se encontró' });
  next();
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
