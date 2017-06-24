const routes = require('express').Router();
const User = require('../../models/usersModel');
const passport = require('passport');

/* Function to auth. Not needed for now.
const authAll = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else res.redirect('/');
};*/


// Signup user
routes.post('/signup', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  // Validate signup
  req.checkBody('username', 'Only letters and numbers allowed').isAlphanumeric();
  req.checkBody('username', 'Maximum 12 characters').isLength({ min: undefined, max: 12 });
  req.checkBody('username', 'Minimum 4 characters').isLength({ min: 4, max: undefined });
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('password', 'Must contain numbers').matches(/(?=.*\d)/);
  req.checkBody('password', 'Uppercase and lowercase required ').matches(/(?=.*[a-z])(?=.*[A-Z])/);
  req.checkBody('password', 'At least 6 characters required').isLength({ min: 6, max: undefined });
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors(true);
  if (errors) {
    res.status(400).json({ errors });
  } else {
    User.findOne({ email }, (err, user) => {
      if (!user) {
        const newUser = new User({
          username,
          email,
          password,
        });
        User.createUser(newUser, (error) => {
          if (error) throw error;
        });
        res.status(200).json('Success to register your account');
      } else {
        res.status(400).json({ errors: { email: { msg: 'This email is already registered' } } });
      }
    });
  }
});

routes.get('/loggedin', (req, res) => {
  res.json({
    message: req.isAuthenticated() ? 'Session found. Already logged in' : 'Session not found. Please login',
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
  });
});

routes.post('/login', passport.authenticate('local', { session: true, failureFlash: false, passReqToCallback: true }), (req, res) => {
  res.json({
    success: true,
    message: 'Successfully logged in',
    user: req.user,
    isAuthenticated: req.isAuthenticated(),
  });
});

routes.post('/logout', (req, res) => {
  req.logOut();
  req.session.destroy();
  res.send(200);
});

// Set profile changes
routes.post('/setprofile', (req, res) => {
  const query = req.user._id;
  User.findById(query, (err, user) => {
    if (err) res.send(err);
    user.themeSelected = req.body.theme || user.themeSelected;
    user.fontSize = req.body.fontSize || user.fontSize;
    user.username = req.body.username || user.username;

    user.save((error) => {
      if (error) {
        res.send(error);
      }
    });
  });
  res.status(200).json('Profile updated');
});


module.exports = routes;
