const express = require('express');

const router = express.Router();

// @route       GET /api/expenses
// desc         Get user expenses
// access       private

router.get('/', (req, res) => res.json({ msg: 'Get user expenses' }));

// @route       POST /api/expenses
// desc         Add a expense
// access       private

router.post('/', (req, res) => res.json({ msg: 'Add a expense' }));

// @route       PUT /api/expenses/:id
// desc         Update an expense
// access       private

router.put('/:id', (req, res) => res.json({ msg: 'Update an expense' }));

// @route       DELETE /api/expense/:id
// desc         Delete an expense
// access       private

router.delete('/:id', (req, res) => res.json({ msg: 'Delete an expense' }));

module.exports = router;
