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
      check('amount')
        .not()
        .isEmpty()
        .withMessage('Enter your budget')
        .isNumeric()
        .withMessage('Invalid budget, budget must be a number'),
      check('currency', 'Please a Currency')
    ]
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ msg: error.array() });
    }

    const { amount, currency } = req.body;

    try {
      const newBudget = new Budget({
        user: req.id,
        amount,
        currency
      });

      await newBudget.save();
      res.json({ newBudget });
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
      check('amount')
        .not()
        .isEmpty()
        .withMessage('Enter your budget')
        .isNumeric()
        .withMessage('Invalid budget, budget must be a number'),
      check('currency', 'Please a Currency')
    ]
  ],
  async (req, res) => {
    const { amount, currency, id } = req.body;

    if (req.id !== req.params.id) {
      return res.status(403).json({ msg: 'Failed request, try again' });
    }

    try {
      const update = await Budget.findOneAndUpdate(
        id,
        {
          amount,
          currency
        },
        { new: true }
      );

      res.json({ update });
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
  if (req.id !== req.params.id) {
    return res.status(403).json({ msg: 'Failed request, try again' });
  }

  try {
    await Budget.findOneAndDelete({ user: req.id });
    res.json({ msg: 'Budget deleted successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
