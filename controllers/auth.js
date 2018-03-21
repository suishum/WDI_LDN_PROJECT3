const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  if (!req.body.photo) req.body.photo = 'https://bulma.io/images/placeholders/128x128.png';

  User.create(req.body)
    .then(user => {
      // Send a token, create a token, put the user ID in it.  We never store a token in our database, this gets sent to the client.
      // 1. Create a token, .sign(payload, secret, expiry), store the user._id in the token (we use sub: cos thats what the jwt documentation says we should do)
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      // Send a message saying successfully registered
      res.json({
        message: 'We\'ve made an account for you! Log in to make a date.',
        token
      });
    })
    .catch(next);
}

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      // if we don't find a user in the database or password validation fails, send a message back saying unauthorised
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Sorry! Your email or password was unrecognised, try again.' }); // to pass messages to the front end
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      // Send a message saying successfully registered
      res.json({
        message: `Hiya ${user.username}!`,
        // the token we get here will differ slightly from the token created during registering because the creation time and expiry time is different.
        token
      });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
