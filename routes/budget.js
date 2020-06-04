const express = require('express');

const router = express.Router();

// @route       GET /api/register
// desc         Get user budget
// access       private

router.get('/', (req, res) => res.json({ msg: 'Get user budget' }));

// @route       POST /api/register
// desc         Add a budget
// access       private

router.post('/', (req, res) => res.json({ msg: 'Add a budget' }));

// @route       PUT /api/register/:id
// desc         Update a budget
// access       private

router.put('/:id', (req, res) => res.json({ msg: 'Update a budget' }));

// @route       DELETE /api/register/:id
// desc         Delete a budget
// access       private

router.delete('/:id', (req, res) => res.json({ msg: 'Delete a budget' }));

module.exports = router;
