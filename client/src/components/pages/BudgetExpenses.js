import React, { useContext, Fragment, useEffect } from 'react';
import BudgetForm from '../layout/BudgetForm';
import ExpenseForm from '../layout/ExpenseForm';
import MenuList from '../layout/MenuList';
import AppContext from '../../context/app/appContext';
import AuthContext from '../../context/auth/authContext';
import CloseBtn from '../layout/CloseBtn';
import Expense from '../contents/Expense';
import Budget from '../contents/Budget';
import NoContent from '../layout/NoContent';
import Total from '../contents/Total';
import ToggleBtnMenu from '../layout/ToggleBtnMenu';
import Alert from '../layout/Alert';

const Index = props => {
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);

  const { isAuthenticated } = authContext;

  const { budgetValue, getBudget, expenses } = appContext;

  useEffect(() => {
    if (isAuthenticated) {
      getBudget();
    }

    if (isAuthenticated === false) {
      props.history.push('/login');
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <section style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ zIndex: '10' }}>
        <Alert />
      </div>
      {budgetValue === undefined ||
      budgetValue === null ||
      expenses === null ? (
        <Fragment>
          <NoContent />
        </Fragment>
      ) : (
        ''
      )}

      <ToggleBtnMenu />
      {budgetValue ? <Budget /> : ''}
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
