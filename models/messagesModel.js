const mongoose = require('mongoose');

const MongoSchema = mongoose.Schema;
const messagesSchema = new MongoSchema({
  createdAt: {
    type: Date,
    expires: 60 * 60 * 24 * 7,
    required: true,
    default: Date.now,
  },
  author: String,
  sendTime: String,
  message: String,
  userId: String,
  email: String,
});

const Message = mongoose.model('Message', messagesSchema);

module.exports = Message;
