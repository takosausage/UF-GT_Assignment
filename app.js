var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var Teacher = require('./routes/Teacher');
var Student = require('./routes/Student');
var Register = require('./routes/register');
var CommonStudent = require('./routes/commonstudents');
var Suspend = require('./routes/Suspend');
var Notification = require('./routes/notifications');

var app = express();

//listen to a specific port
var server = app.listen(8185, function() {
  console.log('Ready on port %d', server.address().port);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  
app.use(cors()); 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//app.use('/users', users);
app.use('/Teacher', Teacher);
app.use('/Student', Student);
app.use('/api/register', Register);
app.use('/api/commonstudents', CommonStudent);
app.use('/api/suspend', Suspend);
app.use('/api/retrievefornotifications', Notification);

app.disable( 'x-powered-by' ) ;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
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

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
