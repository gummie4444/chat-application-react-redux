var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var timestamps = require('mongoose-timestamp');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, unique: true },
  password: String
});

userSchema.plugin(timestamps);

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('User', userSchema);
