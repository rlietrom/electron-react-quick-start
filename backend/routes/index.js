//TODO: Not sure if this is correct


var express = require('express');
var router = express.Router();
var moment = require('moment');
var models = require('../models/models');
var User = models.User;
var Document = models.Document;

//middleware that means someone not logged in cannot get below this route
router.use(function(req, res, next){
  if (!req.user) {
    res.redirect('/login');
  } else {
    return next();
  }
});

router.get('/', function(req, res, next) {
  res.redirect('/portal');
});

router.get('/contacts', function(req, res, next) {
  // Load all contacts (that this user has permission to view).
  User.findById(req.user, function(err, user) {
    Contact.find({owner: req.user.id}, function(err, contacts) {
      if (err) return next(err);
      res.render('contacts', {
        contacts: contacts,
        user: user
      });
    });
  })
});

router.get('/contacts/new', function(req, res, next) {
  res.render('editContact');
});

router.post('/contacts/new', function(req, res, next) {
  var contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
    owner: req.user.id
  });
  contact.save(function(err) {
    if (err) return next(err);
    res.redirect('/contacts');
  })
});

module.exports = router;
