var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var LocalStrategy = require('passport-local').Strategy;

var models = require('./models/models');
var User = models.User;

var routes = require('./routes/index');
var auth = require('./routes/auth');

connect = mongoose.connect(process.env.MONGODB_URI);

var app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
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
app.use('/', routes);


// Example route
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!')
})
