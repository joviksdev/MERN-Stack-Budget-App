const express = require('express');
const User = require('../model/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

const router = express.Router();

// @route       GET /api/auth
// desc         Get log in user
// access       private

router.get('/', [auth], async (req, res) => {
  try {
    const user = await User.findById(req.id).select('-password');
    return res.json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route       POST /api/auth
// desc         Log in a user
// access       public

router.post(
  '/',
  [
    check('email')
      .not()
      .isEmpty()
      .withMessage('Please enter your email')
      .isEmail()
      .withMessage('Please enter a valid email'),
    check('password', 'Please enter your password').not().isEmpty()
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ msg: error.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Incorrect email/password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Incorrect email/password' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('secret'),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;
