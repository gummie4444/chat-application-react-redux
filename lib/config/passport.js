'use strict';

var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var User = require('../models/userModel');
var config = require('../config/config');

module.exports = function (passport) {
  // persistent login sessions  

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.name);
  });

  // used to deserialize the user
  passport.deserializeUser(function (name, done) {
    User.findById(name, function (err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with name
    usernameField: 'name',
    passwordField: 'password',
    session: true,
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function (req, name, password, done) {
    process.nextTick(function () {
      User.findOne({ 'name': name }, function (err, user) {
        // if there are any errors, return the error
        if (err) return done(err);
        // check to see if theres already a user with that name
        if (user) {
          return done(null, false);
        } else {

          // if there is no user with that name
          // create the user
          var newUser = new User();

          // set the user's local credentials
          newUser.name = name;
          newUser.password = newUser.generateHash(password);

          // save the user
          newUser.save(function (err) {
            if (err) return done(err);
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with name
    usernameField: 'name',
    passwordField: 'password',
    session: true,
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function (req, name, password, done) {
    // callback with name and password from our form

    // find a user whose name is the same as the forms name
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'name': name }, function (err, user) {
      // if there are any errors, return the error before anything else
      if (err) return done(err);

      // if no user is found, return the message
      if (!user) return done(null, false);

      // if the user is found but the password is wrong
      if (!user.comparePassword(password)) return done(null, false);

      // all is well, return successful user
      return done(null, user);
    });
  }));
};