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

router.get('/userdocuments', function(req, res){
  Document.find({author: req.user._id})
  .then((docsArray) => {
    res.json({
      success: true,
      docs: docsArray
    });
  })
})

router.post('/createnewdocument', function(req, res){
  var newDocument = new Document({
    author: req.user._id,
    password: "12345",
    title: req.body.title,
    collaborators: [],
    content: {}
  })
  console.log("this is newDocument: ", newDocument);
  newDocument.save(function(err, doc){
    if(err){
      console.log(err)
    } else {
      res.json({success: true, document: newDocument})
    }
  })
});

router.get('/gethistory/:id', function(req, res) {
    Document.findById({req.params.id})
    .then((doc) => {
        res.json({success: true, document: doc})
    })
})


router.post('/newcollaborator', function(req, res){

  Document.findById(req.body._id)
  .then((doc) => {
    doc.collaborators.push(req.user._id)
    doc.save(function(err, doc){
      if(err){
        console.log(err)
      } else {
        // res.json({success: true, document: doc})
        // console.log("here here");
        // console.log("this is doc", doc);
        User.findById(req.user._id)
        .then((ussr) => {
          //  console.log("inside user.findById");
          //  console.log("This is user/ussr", ussr);
          //  console.log("this is doc", doc);
          ussr.documentsSharedWithMe.push(doc._id)
          //  console.log("this is update ussr", ussr);
          ussr.save(function(err){
            if(err){
              //  console.log("inside erroor")
              console.log(err)
            } else {
              //  console.log("this is working");
              //  console.log(ussr);
              res.json({success: true, user: ussr});
            }
          })
        })
      }
    })
  })
});

router.get('/currentdocument/:id', function(req, res){
  // console.log("hit get current document route");
  // console.log("this is req.params.id", req.params.id);
  Document.findById(req.params.id)
  .then((doc) => res.json({success: true, currentDocument: doc}))
})

router.post('/savedocument', function(req, res){
  Document.findById(req.body.documentId)
  .then((doc) => {
      doc.history.push({time: req.body.time, content: req.body.content})
    doc.content = req.body.content
    console.log('HISTROY', doc.history)
    doc.save(function(err){
      if(err){
        console.log(err)
      } else {
        res.json({success:true})
        console.log("document content has been saved")
      }
    })
  })
})

router.get('/usershareddocuments', function(req, res){
  console.log("inside usershareddocuments");

  User.findById(req.user._id)
  .then((user) => {
    arrayPromises = user.documentsSharedWithMe.map((id) => {
      return Document.findById(id)
    })
    Promise.all(arrayPromises).then((results) => {
      console.log("this is results", results);
      res.json({success: true, sharedDocs: results})
    })
  })
  .catch((err) => console.log(err))
})

  module.exports = router;
