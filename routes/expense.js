const express = require('express');
const auth = require('../middlewares/auth');
const Expense = require('../model/Expense');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// @route       GET /api/expenses
// desc         Get user expenses
// access       private

router.get('/', [auth], async (req, res) => {
  try {
    const expense = await Expense.find({ user: req.id });
    res.json({ expense });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route       POST /api/expenses
// desc         Add a expense
// access       private

router.post(
  '/',
  [
    auth,
    [
      check('name')
        .not()
        .isEmpty()
        .withMessage('Enter Expense')
        .isString()
        .withMessage('Invalid expense, expense must be word characters'),
      check('amount')
        .not()
        .isEmpty()
        .withMessage('Enter amount')
        .isNumeric()
        .withMessage('Invalid price, price must be a number')
    ]
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ msg: error.array() });
    }

    const { name, amount } = req.body;

    try {
      let newExpense = new Expense({
        user: req.id,
        name,
        amount
      });

      newExpense = await newExpense.save();
      res.json({ msg: 'Expense added successfully', newExpense });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route       PUT /api/expenses/:id
// desc         Update an expense
// access       private

router.put(
  '/:id',
  [
    auth,
    [
      check('name')
        .not()
        .isEmpty()
        .withMessage('Enter Expense')
        .isString()
        .withMessage('Invalid expense, expense must be word characters'),
      check('amount')
        .not()
        .isEmpty()
        .withMessage('Enter price')
        .isNumeric()
        .withMessage('Invalid price, price must be a number')
    ]
  ],
  async (req, res) => {
    const { name, amount } = req.body;

    try {
      const id = req.params.id;

      console.log(id);

      const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        { $set: { name, amount } },
        { new: true }
      );
      res.json({ msg: 'Expense updated successfully', updatedExpense });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: 'Unable to update, try again' });
    }
  }
);

// @route       DELETE /api/expense/:id
// desc         Delete an expense
// access       private

router.delete('/:id', [auth], async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Expense deleted successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Unable to delete, try again' });
  }
});

// @route       DELETE /api/expense/:id
// desc         Delete all expenses
// access       private

router.delete('/all/:id', [auth], async (req, res) => {
  try {
    await Expense.deleteMany({ user: req.id });
    res.json({ msg: 'Expenses deleted successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Unable to delete, try again' });
  }
});

module.exports = router;
