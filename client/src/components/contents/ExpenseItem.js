import React, { useContext } from 'react';
import Image from '../layout/Image';
import del from '../../images/delete.png';
import edit from '../../images/edit.png';
import AppContext from '../../context/app/appContext';

const ExpenseItem = ({ id, name, amount }) => {
  const appContext = useContext(AppContext);
  const { deleteExpense, displayExpenseForm, setEdit } = appContext;

  const delExpense = () => {
    deleteExpense(id);
  };

  const setExpense = () => {
    const expense = {
      id,
      name,
      amount
    };

    setEdit(expense);

    displayExpenseForm();
  };

  return (
    <div className='expense-item'>
      <p>{name}</p>
      <p>{amount}</p>
      <div style={iconContainer}>
        <span style={iconStyle} onClick={setExpense}>
          <Image src={edit} alt='edit' />
        </span>
        <span style={iconStyle} onClick={delExpense}>
          <Image src={del} alt='delete' />
        </span>
      </div>
    </div>
  );
};

const iconContainer = {
  display: 'flex',
  justifyContent: 'space-evenly',
  algnItems: 'center',
  zIndex: 5
};

const iconStyle = {
  width: '20px',
  height: '20px',
  display: 'inline-block',
  cursor: 'pointer'
};

export default ExpenseItem;
