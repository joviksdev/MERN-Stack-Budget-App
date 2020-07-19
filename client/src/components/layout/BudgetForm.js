import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../context/app/appContext';
import AlertContext from '../../context/alert/alertContext';

const BudgetForm = () => {
  const appContext = useContext(AppContext);
  const alertContext = useContext(AlertContext);

  const {
    isBudgetFormDisplay,
    budgetValue,
    addBudget,
    errors,
    updateBudget
  } = appContext;
  const { setAlert } = alertContext;

  const [budget, setBudget] = useState({
    amount: '',
    currency: 'Select currency'
  });

  useEffect(
    () => {
      if (budgetValue !== undefined) {
        setBudget({
          ...budget,
          amount: budgetValue !== null ? budgetValue.amount : '',
          currency: budgetValue !== null ? budgetValue.currency : ''
        });
      }

      if (errors !== null && errors !== 'Server Error') {
        setAlert(errors.map(err => ({ ...err, type: 'warning' })));
      }

      if (errors === 'Server Error') {
        setAlert([
          {
            msg: errors,
            type: 'warning'
          }
        ]);
      }
    },
    // eslint-disable-next-line
    [budgetValue, errors]
  );

  const setChange = e => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    const { amount, currency } = budget;

    const isNum = new RegExp('[1-9][0-9]?');
    if (amount === '' || !isNum.test(amount)) {
      setAlert([
        {
          msg: 'Invalid amount, please entter amount',
          type: 'warning'
        }
      ]);
      return;
    }

    if (currency === 'Select currency') {
      setAlert([
        {
          msg: 'Please select a currency',
          type: 'warning'
        }
      ]);
      return;
    }

    if (budgetValue === undefined || budgetValue === null) {
      addBudget(budget);
      setBudget({
        amount: '',
        currency: 'Select currency'
      });
    } else {
      updateBudget({
        ...budget,
        id: budgetValue !== undefined && budgetValue._id
      });
      setBudget({
        amount: '',
        currency: 'Select currency'
      });
    }
  };

  return (
    <form
      className='budget-form'
      style={{ display: isBudgetFormDisplay ? 'block' : 'none' }}
      onSubmit={onSubmit}
    >
      <h3 className='form-header'>Budget</h3>
      {budgetValue ? (
        <p>
          Previous Budget: <span>&#8358;</span>{' '}
          {budgetValue ? budgetValue.amount : ''}
        </p>
      ) : (
        ''
      )}
      <div className='form-group'>
        <label htmlFor='budget'>Budget</label>
        <input
          type='text'
          name='amount'
          placeholder='Enter your budget'
          onChange={setChange}
          value={budget.amount}
        />
      </div>
      <div className='form-group'>
        <label className='currency-label' htmlFor='currency'>
          Currency
        </label>
        <select name='currency' onChange={setChange}>
          <option value=''>Select currency</option>
          <option value='naira'>Naira</option>
          <option value='euro'>Euro</option>
          <option value='usd'>Dollar</option>
        </select>
      </div>
      <input
        type='submit'
        value={budgetValue ? 'Update budget' : 'Add budget'}
      />
    </form>
  );
};

export default BudgetForm;
