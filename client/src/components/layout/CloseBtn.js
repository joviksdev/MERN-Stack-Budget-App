import React, { useContext } from 'react';
import AppContext from '../../context/app/appContext';

const CloseBtn = () => {
  const appContext = useContext(AppContext);
  const { isBudgetFormDisplay, isExpenseFormDisplay, hideForm } = appContext;

  return isBudgetFormDisplay || isExpenseFormDisplay ? (
    <div className='close-btn-wrapper'>
      <div onClick={hideForm}></div>
    </div>
  ) : (
    ''
  );
};

export default CloseBtn;
