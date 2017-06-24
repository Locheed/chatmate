
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/usersModel');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
    const query = { email: username };
    User.findOne(query, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) throw error;
        else if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
      return undefined;
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
