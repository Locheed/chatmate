const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MongoSchema = mongoose.Schema;
const usersSchema = new MongoSchema({
  username: {
    type: String,
    index: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Client', 'Admin'],
    default: 'Client',
  },
  fontSize: {
    type: String,
    default: '1rem',
  },
  themeSelected: {
    type: String,
    default: 'theme-three',
  },
});

const User = mongoose.model('User', usersSchema);

module.exports = User;

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (error, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
