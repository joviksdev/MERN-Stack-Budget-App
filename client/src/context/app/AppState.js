import React, { useReducer } from 'react';
import AppContext from './appContext';
import appReducer from './appReducer';
import {
  TOGGLE_AUTH,
  TOGGLE_MENU,
  DISPLAY_BUDGET_FORM,
  DISPLAY_EXPENSE_FORM,
  HIDE_FORM,
  DELETE_EXPENSE,
  SET_EDIT,
  ADD_BUDGET,
  UPDATE_BUDGET,
  DELETE_BUDGET,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  CLEAR_ALL,
  HIDE_AUTH_LIST
} from '../types';

const AppState = props => {
  const initialState = {
    budgetValue: null,
    expenses: [
      {
        id: 1,
        name: 'Transport',
        amount: 4000
      },
      {
        id: 2,
        name: 'Food',
        amount: 2000
      },
      {
        id: 3,
        name: 'Recharge card',
        amount: 1000
      }
    ],
    currentEdit: null,
    isDisplayAuthList: false,
    isDisplayMenuList: false,
    isBudgetFormDisplay: false,
    isExpenseFormDisplay: false,
    isSetEdit: false
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  // Toggle Auth List

  const toggleAuthList = () => {
    dispatch({
      type: TOGGLE_AUTH
    });
  };

  // Hide Auth List

  const hideAuthList = () => {
    dispatch({
      type: HIDE_AUTH_LIST
    });
  };

  // Toggle Auth List

  const toggleMenuList = () => {
    dispatch({
      type: TOGGLE_MENU
    });
  };

  // Display Budget Form

  const displayBudgetForm = () => {
    dispatch({
      type: DISPLAY_BUDGET_FORM
    });
  };

  // Display Budget Form

  const displayExpenseForm = () => {
    dispatch({
      type: DISPLAY_EXPENSE_FORM
    });
  };

  // Hide Form

  const hideForm = () => {
    dispatch({
      type: HIDE_FORM
    });
  };

  // Add Budget

  const addBudget = value => {
    dispatch({
      type: ADD_BUDGET,
      payload: value
    });
  };

  // Update Budget

  const updateBudget = value => {
    dispatch({
      type: UPDATE_BUDGET,
      payload: value
    });
  };

  // Delete Budget

  const deleteBudget = id => {
    dispatch({
      type: DELETE_BUDGET
    });
  };

  // Delete Expense

  const deleteExpense = id => {
    dispatch({
      type: DELETE_EXPENSE,
      payload: id
    });
  };

  // Add Expense

  const addExpense = value => {
    dispatch({
      type: ADD_EXPENSE,
      payload: value
    });
  };

  // Set Edit

  const setEdit = value => {
    dispatch({
      type: SET_EDIT,
      payload: value
    });
  };

  // Update Expense

  const updateExpense = value => {
    dispatch({
      type: UPDATE_EXPENSE,
      payload: value
    });
  };

  // Clear All

  const clearAll = () => {
    dispatch({
      type: CLEAR_ALL
    });
  };

  return (
    <AppContext.Provider
      value={{
        budgetValue: state.budgetValue,
        expenses: state.expenses,
        isDisplayAuthList: state.isDisplayAuthList,
        isDisplayMenuList: state.isDisplayMenuList,
        isBudgetFormDisplay: state.isBudgetFormDisplay,
        isExpenseFormDisplay: state.isExpenseFormDisplay,
        isSetEdit: state.isSetEdit,
        currentEdit: state.currentEdit,
        toggleAuthList,
        hideAuthList,
        toggleMenuList,
        displayBudgetForm,
        displayExpenseForm,
        hideForm,
        deleteExpense,
        setEdit,
        addExpense,
        updateExpense,
        addBudget,
        deleteBudget,
        updateBudget,
        clearAll
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
