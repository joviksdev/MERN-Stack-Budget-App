import React, { useContext } from 'react';
import AppContext from '../../context/app/appContext';

const Overlay = () => {
  const appContext = useContext(AppContext);

  const {
    isBudgetFormDisplay,
    isExpenseFormDisplay,
    isDisplayMenuList
  } = appContext;
  return (
    <div
      style={{
        display:
          isExpenseFormDisplay || isBudgetFormDisplay || isDisplayMenuList
            ? 'block'
            : 'none'
      }}
      className='over-lay'
    ></div>
  );
};

export default Overlay;
