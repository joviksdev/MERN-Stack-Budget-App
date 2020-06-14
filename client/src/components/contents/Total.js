import React, { useContext, Fragment } from 'react';
import AppContext from '../../context/app/appContext';

const Total = () => {
  const appContext = useContext(AppContext);
  const { expenses, budgetValue } = appContext;

  let amounts = expenses.map(expense => expense.amount);
  const totalExpenses = amounts.reduce(
    (total, value) => (total += parseInt(value)),
    0
  );

  return (
    expenses.length > 0 && (
      <div className='total container'>
        <div>
          <p>Total Expenses</p>
          <p className='amount'>{totalExpenses}</p>
        </div>
        {budgetValue && (
          <Fragment>
            <hr />
            <div>
              <p>Balance</p>
              <p className='amount'>{budgetValue.amount - totalExpenses}</p>
            </div>
          </Fragment>
        )}
      </div>
    )
  );
};

export default Total;
