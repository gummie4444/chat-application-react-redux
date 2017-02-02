'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _messageModel = require('../models/messageModel');

var _messageModel2 = _interopRequireDefault(_messageModel);

var _channelModel = require('../models/channelModel');

var _channelModel2 = _interopRequireDefault(_channelModel);

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + file.originalname.replace(/\s/g, '')); //REMOVE SPACES
  }
});

var upload = (0, _multer2.default)({ storage: storage });

var ApiRouter = function ApiRouter(router, passport) {

  router.use(_bodyParser2.default.json());

  //AUTHENTICATION
  router.post('/login', passport.authenticate('local-login'), function (req, res) {
    res.json(req.user.name);
  });

  router.post('/signup', passport.authenticate('local-signup'), function (req, res) {
    res.json(req.user.name);
  });

  router.post('/logout', function (req, res) {
    req.logout();
    res.end();
  });
  //****


  //IMAGES
  router.post('/newimage', upload.single('file'), function (req, res) {

    if (req.file) {
      (function () {
        var newMessage = new _messageModel2.default();

        newMessage.channelID = req.body.channelID;
        newMessage.user = { name: req.body.user }; //??
        newMessage.imageURL = req.file.filename;

        newMessage.save(function (err, message) {
          if (err) throw err;
          return res.json(newMessage);
        });
      })();
    } else {
      return res.json('failed at saving image'); //??
    }
  });

  router.get('/getimage/:imageurl', function (req, res) {

    var TARGET_PATH = _path2.default.resolve(__dirname, '../../uploads/');
    var targetPath = _path2.default.join(TARGET_PATH, req.params.imageurl);

    res.sendFile(targetPath);
  });
  //****

  //MESSAGES
  router.post('/messages', function (req, res) {

    _messageModel2.default.find({ channelID: req.body.name }, function (err, messeges) {
      if (err) return res.json(err);

      return res.json(messeges);
    });
  });

  router.post('/newmessage', function (req, res) {

    var newMessage = new _messageModel2.default();

    newMessage.channelID = req.body.channel;
    newMessage.user = { name: req.body.user };
    newMessage.message = req.body.message;

    newMessage.save(function (err, message) {
      if (err) throw err;
      return res.json(newMessage);
    });
  });
  //****

  //USERS
  router.get('/users', function (req, res) {

    _userModel2.default.find(function (err, users) {

      if (err) return res.json(err);

      var userNames = users.map(function (user) {
        return { name: user.name, _id: user._id };
      });
      return res.json(userNames);
    });
  });

  //CHANNELS
  router.post('/channels', function (req, res) {

    _channelModel2.default.find({ users: req.body.name }, function (err, channels) {
      if (err) return res.json(err);

      return res.json(channels);
    });
  });
  router.post('/ischannelavailable', function (req, res) {

    _channelModel2.default.findOne({ 'name': req.body.channelName }, function (err, channel) {
      if (err) return res.json(err);

      if (channel) return res.json({ available: false });

      return res.json({ available: true });
    });
  });

  router.post('/newchannel', function (req, res) {

    _channelModel2.default.findOne({ 'name': req.body.name }, function (err, channel) {
      if (err) return res.json(err);
      if (channel) {
        return res.json(false);
      } else {

        var newChannel = new _channelModel2.default();

        newChannel.name = req.body.name;
        newChannel.users = req.body.users;

        if (req.body.private) newChannel.private = true;

        newChannel.save(function (err) {
          if (err) throw err;
          return res.json(newChannel);
        });
      }
    });
  });

  router.get('*', function (req, res) {
    res.json('YOU HAVE ENTERED INTO MORDOR');
  });
};

exports.default = ApiRouter;