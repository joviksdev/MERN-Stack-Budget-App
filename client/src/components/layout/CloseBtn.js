import React, { useContext } from 'react';
import AppContext from '../../context/app/appContext';

import AlertContext from '../../context/alert/alertContext';

const CloseBtn = () => {
  const appContext = useContext(AppContext);
  const alertContext = useContext(AlertContext);

  const { isBudgetFormDisplay, isExpenseFormDisplay, hideForm } = appContext;

  const { removeAlert } = alertContext;

  const setClick = () => {
    hideForm();
    removeAlert();
  };

  return isBudgetFormDisplay || isExpenseFormDisplay ? (
    <div className='close-btn-wrapper'>
      <div onClick={setClick}></div>
    </div>
  ) : (
    ''
  );
};

export default CloseBtn;
