import React, { useContext } from 'react';
import AppContext from '../../context/app/appContext';
import del from '../../images/delete.png';
import Image from '../layout/Image';

const Budget = () => {
  const appContext = useContext(AppContext);
  const { budgetValue, deleteBudget } = appContext;

  return (
    budgetValue !== null && (
      <div className=' container budget mt-1'>
        <p>
          Budget: <span className='amount'>{budgetValue.amount}</span>
        </p>
        <span style={iconStyle} onClick={deleteBudget}>
          <Image src={del} alt='delete' />
        </span>
      </div>
    )
  );
};

const iconStyle = {
  width: '20px',
  height: '20px',
  display: 'inline-block',
  cursor: 'pointer'
};

export default Budget;
