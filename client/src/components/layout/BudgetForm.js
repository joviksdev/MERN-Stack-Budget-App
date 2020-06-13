import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../context/app/appContext';

const BudgetForm = () => {
  const appContext = useContext(AppContext);
  const { isBudgetFormDisplay, budgetValue, addBudget } = appContext;

  const [budget, setBudget] = useState('');

  useEffect(
    () => {
      if (budgetValue) {
        setBudget(budgetValue);
      }
    },
    // eslin-disable-next-line
    [budgetValue]
  );

  const setChange = e => {
    setBudget(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const isNum = new RegExp('[1-9][0-9]?');
    if (budget === '') {
      return console.log('Please fill in the fields');
    }

    if (!isNum.test(budget)) {
      return console.log('Invalid amount');
    }

    addBudget(budget);
    setBudget('');
  };

  return (
    <form
      className='budget-form'
      style={{ display: isBudgetFormDisplay ? 'block' : 'none' }}
      onSubmit={onSubmit}
    >
      <div className='form-group'>
        {budgetValue ? (
          <p>
            Previous Budget: <span>&#8358;</span> {budgetValue}
          </p>
        ) : (
          ''
        )}
        <label htmlFor='budget'>Budget</label>
        <input
          type='text'
          name='budget'
          placeholder='Enter your budget'
          onChange={setChange}
          value={budget}
        />
      </div>
      <input
        type='submit'
        value={budgetValue ? 'Update budget' : 'Add budget'}
      />
    </form>
  );
};

export default BudgetForm;
