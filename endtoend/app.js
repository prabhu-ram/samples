var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var mysql = require("mysql");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));

var pool      =    mysql.createPool({
        connectionLimit : 5,
        host     : '192.168.1.5',
        user     : 'prabhu',
        password : 'prabhu',
        database : 'productmanagement',
        debug    :  false
});

// tickling the db connection before launching server

pool.getConnection(function(err,connection){
   if(err) {
        // if there is error, stop right away.
        // This will stop the async code execution and goes to last function.
		console.log("Trouble connecting to db");
		process.exit(1);
   } else {
		connection.release();
		console.log("connected to db");

	app.use('/', routes);
	app.use('/users', users);
	var productCategoryRoute = require('./routes/productCategoryRouteConfig.js');
	// new productCategoryRoute(app);
	new productCategoryRoute(app, pool);

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

	} // else of getConnection
});

module.exports = app;
