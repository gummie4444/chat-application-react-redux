import bodyparser from 'body-parser';

import Message from '../models/messageModel';
import Channel from '../models/channelModel';
import User from '../models/userModel';

import fs from 'fs';
import path from 'path';

import multer from 'multer';


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname.replace(/\s/g, '')) //REMOVE SPACES
  }
})

var upload = multer({ storage: storage })


const ApiRouter = (router, passport) => {


  router.use(bodyparser.json());

  //AUTHENTICATION
  router.post('/login', passport.authenticate('local-login'), (req, res) => {
    res.json(req.user.name);
  })

  router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    res.json(req.user.name);
  })

  router.post('/logout', (req, res) => {
      req.logout();
      res.end();
    })
    //****


  //IMAGES
  router.post('/newimage', upload.single('file'), (req, res) => {

    if (req.file) {
      const newMessage = new Message();

      newMessage.channelID = req.body.channelID;
      newMessage.user = { name: req.body.user }; //??
      newMessage.imageURL = req.file.filename;

      newMessage.save((err, message) => {
        if (err)
          throw err;
        return res.json(newMessage)
      })
    } else {
      return res.json('failed at saving image') //??
    }
  })

  router.get('/getimage/:imageurl', function(req, res) {

    var TARGET_PATH = path.resolve(__dirname, '../../uploads/');
    var targetPath = path.join(TARGET_PATH, req.params.imageurl);

    res.sendFile(targetPath)
  });
  //****

  //MESSAGES
  router.post('/messages', (req, res) => {

    Message.find({ channelID: req.body.name }, (err, messeges) => {
      if (err)
        return res.json(err);

      return res.json(messeges);
    });
  })

  router.post('/newmessage', (req, res) => {

      var newMessage = new Message();

      newMessage.channelID = req.body.channel;
      newMessage.user = { name: req.body.user };
      newMessage.message = req.body.message;

      newMessage.save((err, message) => {
        if (err)
          throw err;
        return res.json(newMessage)
      });
    })
    //****

  //USERS
  router.get('/users', (req, res) => {

    User.find((err, users) => {

      if (err)
        return res.json(err);

      const userNames = users.map(user => {
        return { name: user.name, _id: user._id }
      });
      return res.json(userNames);
    });
  })

  //CHANNELS
  router.post('/channels', (req, res) => {

    Channel.find({ users: req.body.name }, (err, channels) => {
      if (err)
        return res.json(err);

      return res.json(channels);

    });
  })
  router.post('/ischannelavailable', (req, res) => {

    Channel.findOne({ 'name': req.body.channelName }, (err, channel) => {
      if (err)
        return res.json(err);

      if (channel)
        return res.json({ available: false })

      return res.json({ available: true });

    });
  })

  router.post('/newchannel', (req, res) => {

    Channel.findOne({ 'name': req.body.name }, function(err, channel) {
      if (err)
        return res.json(err);
      if (channel) {
        return res.json(false);
      } else {

        var newChannel = new Channel();

        newChannel.name = req.body.name;
        newChannel.users = req.body.users;

        if (req.body.private)
          newChannel.private = true;

        newChannel.save(function(err) {
          if (err)
            throw err;
          return res.json(newChannel);
        });
      }
    });

  })

  router.get('*', (req, res) => {
    res.json('YOU HAVE ENTERED INTO MORDOR');
  });

}

export default ApiRouter;
