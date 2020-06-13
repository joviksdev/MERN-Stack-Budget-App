import React, { useContext, Fragment } from 'react';
import BudgetForm from '../layout/BudgetForm';
import ExpenseForm from '../layout/ExpenseForm';
import MenuList from '../layout/MenuList';
import AppContext from '../../context/app/appContext';
import CloseBtn from '../layout/CloseBtn';
import Budget from '../contents/Budget';
import Expense from '../contents/Expense';
import NoContent from '../layout/NoContent';
import Total from '../contents/Total';

const Index = () => {
  const appContext = useContext(AppContext);

  const { budgetValue, expenses } = appContext;

  return (
    <section>
      {budgetValue === null && expenses.length === 0 && (
        <Fragment>
          <NoContent />
        </Fragment>
      )}

      <Budget />
      <Expense />
      <CloseBtn />
      <MenuList />
      <BudgetForm />
      <ExpenseForm />
      <Total />
    </section>
  );
};

export default Index;
