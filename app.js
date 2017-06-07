var express = require('express');
var routes = require('./routes');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helenus = require('helenus');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var pool= new helenus.ConnectionPool({

  hosts:['localhost:9160'],
  keyspace:'demo',
  cqlVersion:'3.4.0'

});

pool.connect(function(err){

  if(err)
  {
    throw(err);
  }

});



app.get('/', routes.index);
app.post('/',routes.new);
app.delete('/',routes.delete);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
