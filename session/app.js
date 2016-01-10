var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var routes = require('./routes/index');
var users = require('./routes/users');
var logout = require('./routes/logout');
var login = require('./routes/login');

var app = express();


var session = require('express-session');
var SessionStore = require('express-mysql-session');
var storeOptions = {
    host: '192.168.1.5',
    port: 3306,
    user: 'prabhu',
    password: 'prabhu',
    database: 'sessions_test',
    useConnectionPooling: true,
    createDatabaseTable: false,
    expiration: 5 * 6000,
    checkExpirationInterval: 600000 // 60 seconds just for testing
};

// TODO: change to connection pool later
var connectionProvider = require('./mysqlConnectionStringProvider.js');
// var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();

// to use existing db, just pass in connection
// var sessionStore = new SessionStore({}/* session store options */, connection);
// var sessionStore = new SessionStore(storeOptions, connection);

var sessionStore = new SessionStore(storeOptions);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser("secretSign"));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/logout', logout);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;