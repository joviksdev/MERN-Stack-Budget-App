const express = require('express');

const router = express.Router();

// @route       GET /api/auth
// desc         Get log in user
// access       private

router.get('/', (req, res) => res.json({ msg: 'Get log in user' }));

// @route       POST /api/auth
// desc         Log in a user
// access       public

router.post('/', (req, res) => res.json({ msg: 'Log in a user' }));

module.exports = router;
