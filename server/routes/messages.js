const routes = require('express').Router();
const mongoose = require('mongoose');
const md5 = require('md5');
const SECRETS = require('../config/secrets');


if (process.env.NODE_ENV !== 'production') {
  mongoose.connect('mongodb://localhost/chatmate');
} else mongoose.connect(SECRETS.mongoSecret);

const db = mongoose.connection;
const Message = require('../../models/messagesModel');


db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.log(err);
});

const auth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json('Not loggedin! Please login.');
  } else next();
};

// Fetch messages from MongoDB and serve to client
routes.get('/messages', auth, (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      console.log(err);
    } else {
      res.json(messages);
    }
  });
});

// Save client message to MongoDB
routes.post('/messages/post', auth, (req, res) => {
  const message = new Message();
  message.sendTime = req.body.sendTime;
  message.author = req.user.username;
  message.message = req.body.message;
  message.userId = req.user._id;
  message.email = md5(req.user.email);

  message.save(err => {
    if (err) {
      console.log(err);
    } else {
      res.json(`Message saved to MongoDB: ${req.body.message}`);
    }
  });
});

module.exports = routes;
