import React, { useContext, Fragment, useEffect } from 'react';
import BudgetForm from '../layout/BudgetForm';
import ExpenseForm from '../layout/ExpenseForm';
import MenuList from '../layout/MenuList';
import AppContext from '../../context/app/appContext';
import CloseBtn from '../layout/CloseBtn';
import Budget from '../contents/Budget';
import Expense from '../contents/Expense';
import NoContent from '../layout/NoContent';
import Total from '../contents/Total';
import ToggleBtnMenu from '../layout/ToggleBtnMenu';
import AuthContext from '../../context/auth/authContext';

const Index = () => {
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);

  const { budgetValue, expenses } = appContext;

  useEffect(() => {
    authContext.getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <section>
      {budgetValue === null && expenses.length === 0 && (
        <Fragment>
          <NoContent />
        </Fragment>
      )}

      <ToggleBtnMenu />
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
