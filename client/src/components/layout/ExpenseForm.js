import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../context/app/appContext';
import AlertContext from '../../context/alert/alertContext';

const ExpenseForm = () => {
  const appContext = useContext(AppContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const {
    isExpenseFormDisplay,
    currentEdit,
    addExpense,
    isSetEdit,
    updateExpense,
    errors
  } = appContext;

  const [expenses, setExpenses] = useState({
    name: '',
    amount: ''
  });

  useEffect(
    () => {
      if (currentEdit) {
        setExpenses({
          name: currentEdit.name,
          amount: currentEdit.amount
        });
      }

      if (errors !== null && errors !== 'Server Error') {
        const alert = errors.map(alert => ({ msg: alert, type: 'warning' }));
        setAlert(alert);
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
    [currentEdit, errors]
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
      setAlert([
        {
          msg: 'Please enter all field',
          type: 'warning'
        }
      ]);
      return;
    }

    if (!isString.test(name)) {
      setAlert([
        {
          msg: 'Please enter a valid name',
          type: 'warning'
        }
      ]);
      return;
    }

    if (!isNum.test(amount)) {
      setAlert([
        {
          msg: 'Please enter a valid amount',
          type: 'warning'
        }
      ]);
      return;
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

      <input type='submit' value={isSetEdit ? 'Edit Expense' : 'Add Expense'} />
    </form>
  );
};

export default ExpenseForm;
