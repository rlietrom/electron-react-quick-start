var express = require('express');
var router = express.Router();

var models = require('../models/models.js');

module.exports = function(passport) {
  // Add Passport-related auth routes here, to the router!

  // POST Login page
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/portal',
    failureRedirect: '/login'
  }));

  router.post('/registration', passport.authenticate('local', {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      documentsOwned: [],
      documentsCollaborated: []
    })
  }));

  return router;
}
