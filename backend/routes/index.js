// var Login = require('../../reactApp/components/login')
var express = require('express');
var router = express.Router();
var models = require('../models/models.js');
var User = models.User;
var Document = models.Document;

router.use(function(req, res, next){
  if (!req.user) {
    res.json({success: false})
  } else {
    return next();
  }
});

router.post('/createnewdocument', function(req, res){
  console.log(req.user);
  var newDocument = new Document({
    author: req.user.username,
    password: "12345",
    title: req.body.title,
    collaborators: [],
    content: ""
  })
  console.log("this is Document: ", newDocument);
  newDocument.save(function(err, doc){
    if(err){
      console.log(err)
    } else {
      res.send("document has been created");
    }
  })
});

module.exports = router;
