var express = require('express');
var mongoose = require('mongoose');
// var passport
// var findOrCreate = require('mongoose-find-or-create');
var connect = process.env.MONGODB_URI;
// var findOrCreate = require('mongoose-find-or-create');

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connect(connect);

var Schema = mongoose.Schema;



var userSchema = new Schema({
  username: String,
  password: String,
  documentsOwned: Array,  //array of document ID's
  //TODO: use ref {{}}
  documentsSharedWithMe: Array  //array of document ID's
});

var documentSchema = new Schema({
  author: {
    ref: User,
    type: Schema.Types.ObjectId,
  }, //user ID or user Object
  password: String,
  title: String,
  collaborators: Array, //array of user ID's
  content: Object
});


// userSchema.plugin(findOrCreate);
// documentSchema.plugin(findOrCreate);

var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', documentSchema);


module.exports = {
  User: User,
  Document: Document
};
