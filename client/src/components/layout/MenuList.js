import React, { useContext } from 'react';
import AppContext from '../../context/app/appContext';

const MenuList = () => {
  const appContext = useContext(AppContext);

  const {
    isDisplayMenuList,
    displayBudgetForm,
    displayExpenseForm,
    budgetValue
  } = appContext;

  return (
    <ul style={{ zIndex: isDisplayMenuList ? '8' : '1' }} className='menu-list'>
      <li
        style={{
          transform: isDisplayMenuList ? 'translateX(0)' : 'translateX(50vw)',
          transitionDelay: '0.2s'
        }}
      >
        <button className='btn btn-block' onClick={displayBudgetForm}>
          {budgetValue ? 'Update Budget' : 'Add Budget'}
        </button>
      </li>
      <li
        style={{
          transform: isDisplayMenuList ? 'translateX(0)' : 'translateX(50vw)'
        }}
      >
        <button className='btn' onClick={displayExpenseForm}>
          Add Expense
        </button>
      </li>
    </ul>
  );
};

export default MenuList;
