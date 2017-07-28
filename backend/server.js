var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var LocalStrategy = require('passport-local').Strategy;
var server = require('http').createServer(app)
var io = require('socket.io')(server)

var models = require('./models/models');
var User = models.User;

var routes = require('./routes/index');
var auth = require('./routes/auth');

connect = mongoose.connect(process.env.MONGODB_URI);

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

io.on('connection', socket => {

  socket.on('join', ({docId}) => {
    console.log('join', docId);

    socket.emit('helloBack');

    //create a room with name of docId
    socket.join(docId);
    //store this room on the socket object so it is available
    //in all socket calls
    socket.theOneRoom = docId;

    socket.broadcast.to(socket.theOneRoom).emit('userJoined')
    // io.sockets.emit(data.name, 'just joined!')
  })

  socket.on('newContent', ({stringifiedContent}) => {
    socket.broadcast.to(socket.theOneRoom).emit('receiveNewContent', {stringifiedContent});
  })

  socket.on('cursorMove', ({selection}) => {
    socket.broadcast.to(socket.theOneRoom).emit('receiveNewCursor', {selection});
  })

  //Json ships data, can destructure it with:
  // socket.on('hello', ({name}) => {
  //   console.log('hello', name);
  // })
  socket.on('disconnect', () => {
    console.log('socket disconnected');
    //leave the joined room
    socket.leave(socket.theOneRoom);
    socket.broadcast.to(socket.theOneRoom).emit('userLeft')
  })

});





// Example route
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

//change app.listen to server.listen form socket.io packeage
server.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!')
})
