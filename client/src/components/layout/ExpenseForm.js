import React, { useContext, Fragment, useState, useEffect } from 'react';
import AppContext from '../../context/app/appContext';

const ExpenseForm = () => {
  const appContext = useContext(AppContext);
  const {
    isExpenseFormDisplay,
    currentEdit,
    addExpense,
    isSetEdit,
    updateExpense
  } = appContext;

  const [expenses, setExpenses] = useState({
    name: '',
    amount: ''
  });

  useEffect(
    () => {
      if (currentEdit) {
        setExpenses({ name: currentEdit.name, amount: currentEdit.amount });
      }
    },
    // eslint-disable-next-line
    [currentEdit]
  );

  const onChange = e => {
    setExpenses({ ...expenses, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const isNum = new RegExp('[1-9][0-9]?');
    const isString = /[a-zA-Z]+\s?[a-zA-Z]?/;

    const { name, amount } = expenses;
    if (name === '' || amount === '') {
      return console.log('Please fill in all fields');
    }

    if (!isString.test(name)) {
      return console.log('Invalid name');
    }

    if (!isNum.test(amount)) {
      return console.log('Invalid amount');
    }

    if (isSetEdit) {
      updateExpense({ ...currentEdit, ...expenses });
      setExpenses({
        name: '',
        amount: ''
      });
    } else {
      addExpense(expenses);
      setExpenses({
        name: '',
        amount: ''
      });
    }
  };

  return (
    <Fragment>
      <form
        style={{ display: isExpenseFormDisplay ? 'block' : 'none' }}
        className='expense-form'
        onSubmit={onSubmit}
      >
        <p>{isSetEdit ? 'Edit expense' : 'Add new expense'}</p>
        <div className='form-group'>
          <label htmlFor='expense name'>name</label>
          <input
            type='text'
            name='name'
            placeholder='Enter expense name'
            onChange={onChange}
            value={expenses.name}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='expense-value'>amount</label>
          <input
            type='text'
            name='amount'
            placeholder='Enter amount'
            onChange={onChange}
            value={expenses.amount}
          />
        </div>
        <input
          type='submit'
          value={isSetEdit ? 'Edit Expense' : 'Add Expense'}
        />
      </form>
    </Fragment>
  );
};

export default ExpenseForm;
