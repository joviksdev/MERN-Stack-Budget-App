import React, { useContext, Fragment } from 'react';
import AppContext from '../../context/app/appContext';
import del from '../../images/delete.png';
import Image from '../layout/Image';

const Budget = () => {
  const appContext = useContext(AppContext);
  const { budgetValue, deleteBudget } = appContext;

  const displayBudget = (
    <Fragment>
      <p>
        Budget: <span className='amount'>{budgetValue}</span>
      </p>
      <span style={iconStyle} onClick={deleteBudget}>
        <Image src={del} alt='delete' />
      </span>
    </Fragment>
  );

  return (
    budgetValue && <div className=' container budget mt-1'>{displayBudget}</div>
  );
};

const iconStyle = {
  width: '20px',
  height: '20px',
  display: 'inline-block',
  cursor: 'pointer'
};

export default Budget;
