import React, { useContext } from 'react';
import AppContext from '../../context/app/appContext';

const Total = () => {
  const appContext = useContext(AppContext);
  const { expenses, budgetValue } = appContext;

  let amounts = expenses.map(expense => expense.amount);

  const total = amounts.reduce((total, value) => (total += value), 0);

  return (
    expenses.length > 0 && (
      <div className='total container'>
        <div>
          <p>Total Expenses</p>
          <p className='amount'>{total}</p>
        </div>
        <hr />
        <div>
          <p>Balance</p>
          <p className='amount'>{budgetValue - total}</p>
        </div>
      </div>
    )
  );
};

export default Total;
