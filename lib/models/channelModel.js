'use strict';

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Schema = mongoose.Schema;

var channelSchema = new Schema({
  name: { type: String, unique: true },
  users: Array,
  private: { type: Boolean, default: false }
});

channelSchema.plugin(timestamps);

module.exports = mongoose.model('Channel', channelSchema);