import React, { useContext, Fragment, useState, useEffect } from 'react';
import AppContext from '../../context/app/appContext';
import AlertContext from '../../context/alert/alertContext';
import Alert from '../layout/Alert';

const ExpenseForm = () => {
  const appContext = useContext(AppContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

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
      setAlert({
        msg: 'Please fill in all fields',
        type: 'all-field',
        color: 'warning'
      });
      return;
    }

    if (!isString.test(name)) {
      setAlert({
        msg: 'Please enter a valid name',
        type: 'invalid-name',
        color: 'warning'
      });
      return;
    }

    if (!isNum.test(amount)) {
      setAlert({
        msg: 'Please enter a valid amount',
        type: 'invalid-amount',
        color: 'warning'
      });
      return;
    }

    if (isSetEdit) {
      updateExpense({ ...currentEdit, ...expenses });
      setAlert({
        msg: 'Update is successfully',
        type: 'success',
        color: 'success'
      });
      setExpenses({
        name: '',
        amount: ''
      });
    } else {
      addExpense(expenses);
      setAlert({
        msg: 'Expense added successfully',
        type: 'success',
        color: 'success'
      });
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
        <Alert />
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
