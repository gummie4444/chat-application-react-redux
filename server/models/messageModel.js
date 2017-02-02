//SCHEMA for the usern document
//TODO Salt the passwords

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
  channelID: String,
  user: Object,
  message: String,
  imageURL: String
});

messageSchema.plugin(timestamps);

module.exports = mongoose.model('Message', messageSchema);
