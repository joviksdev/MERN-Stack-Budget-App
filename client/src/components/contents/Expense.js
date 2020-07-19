import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/app/appContext';
import ExpenseItem from './ExpenseItem';

const Expense = () => {
  const appContext = useContext(AppContext);
  const { expenses, clearAll, getExpense } = appContext;

  useEffect(() => {
    getExpense();

    // eslint-disable-next-line
  }, []);

  const lists = expenses.map(expense => (
    <div key={expense._id}>
      <ExpenseItem {...expense} />
    </div>
  ));

  return (
    expenses.length > 0 && (
      <div className='expense container'>
        <h4>Expenses List</h4>
        {lists}
        <button className='btn expense-btn' onClick={clearAll}>
          Clear All
        </button>
      </div>
    )
  );
};

export default Expense;
