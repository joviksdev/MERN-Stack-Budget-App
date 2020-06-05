const express = require('express');
const auth = require('../middlewares/auth');
const Budget = require('../model/Budget');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// @route       GET /api/register
// desc         Get user budget
// access       private

router.get('/', [auth], async (req, res) => {
  try {
    const budget = await Budget.find({ user: req.id });
    res.json({ budget });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route       POST /api/register
// desc         Add a budget
// access       private

router.post(
  '/',
  [
    auth,
    [
      check('budget')
        .not()
        .isEmpty()
        .withMessage('Enter your budget')
        .isNumeric()
        .withMessage('Invalid budget, budget must be a number')
    ]
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ msg: error.array() });
    }

    const { budget } = req.body;

    try {
      const newBudget = new Budget({
        user: req.id,
        budget
      });

      await newBudget.save();
      res.json({ msg: `Budget of ${budget} added successfully` });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route       PUT /api/register/:id
// desc         Update a budget
// access       private

router.put(
  '/:id',
  [
    auth,
    [
      check('budget')
        .not()
        .isEmpty()
        .withMessage('Enter your budget')
        .isNumeric()
        .withMessage('Invalid budget, budget must be a number')
    ]
  ],
  async (req, res) => {
    const { budget } = req.body;

    try {
      await Budget.findOneAndUpdate({ user: req.id }, { $set: { budget } });
      res.json({ msg: 'Budget updated successfully' });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route       DELETE /api/register/:id
// desc         Delete a budget
// access       private

router.delete('/:id', [auth], async (req, res) => {
  try {
    await Budget.findOneAndDelete({ user: req.id });
    res.json({ msg: 'Budget deleted successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
