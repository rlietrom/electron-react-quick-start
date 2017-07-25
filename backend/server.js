var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var LocalStrategy = require('passport-local').Strategy;

var models = require('../reactApp/models/models');
var User = models.User;

var routes = require('../reactApp/routes/index');
var auth = require('../reactApp/routes/auth');


// var findOrCreate = require('mongoose-find-or-create');
// var routes = require('./routes/index');
// var auth = require('./routes/auth');

var app = express();
var session = require('express-session');

var session = require('express-session');
app.use(session({ secret: 'keyboard cat' }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


// Tell Passport how to set req.user
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Tell passport how to read our user models
passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  User.findOne({ username: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log(err);
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
      console.log(user);
      return done(null, false);
    }
    // if passwords do not match, auth failed
    if (user.password !== password) {
      return done(null, false);
    }
    // auth has has succeeded
    return done(null, user);
  });
}));

//uncomment routes
// app.use('/', auth(passport));
app.use('/', auth(passport));

// Example route
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// app.set('port', 3000);
//
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port:', app.get('port'));
// });


app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!')
})
