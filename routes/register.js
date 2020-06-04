const express = require('express');

const router = express.Router();

// @route       POST /api/register
// desc         Register a user
// access       public

router.post('/', (req, res) => res.json({ msg: 'Register a user' }));

module.exports = router;
