import React, { useReducer, useContext } from 'react';
import AppContext from './appContext';
import appReducer from './appReducer';
import axios from 'axios';
import AuthContext from '../auth/authContext';
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
  HIDE_AUTH_LIST,
  SHOW_AUTH_LIST,
  GET_BUDGET,
  GET_EXPENSE,
  SET_ERROR
} from '../types';

// Set Request Header

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const AppState = props => {
  const initialState = {
    budgetValue: null,
    expenses: [],
    currentEdit: null,
    isDisplayAuthList: false,
    isDisplayMenuList: false,
    isBudgetFormDisplay: false,
    isExpenseFormDisplay: false,
    isSetEdit: false,
    errors: null
  };

  const authContext = useContext(AuthContext);

  const { user } = authContext;

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

  // Show Auth List

  const showAuthList = () => {
    dispatch({
      type: SHOW_AUTH_LIST
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

  // Get Budget

  const getBudget = async () => {
    try {
      const res = await axios.get('/api/budget');
      const result = res.data;

      dispatch({
        type: GET_BUDGET,
        payload: result.budget
      });
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  // Add Budget

  const addBudget = async value => {
    try {
      await axios.post('/api/budget', value, config);

      dispatch({
        type: ADD_BUDGET
      });

      getBudget();
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  };

  // Update Budget

  const updateBudget = async value => {
    try {
      const res = await axios.put(`/api/budget/${user._id}`, value, config);
      const budget = res.data;

      dispatch({
        type: UPDATE_BUDGET,
        payload: budget.update
      });
    } catch (err) {
      setError(err.response.data);
    }
  };

  // Delete Budget

  const deleteBudget = async () => {
    try {
      await axios.delete(`/api/budget/${user._id}`);
      dispatch({
        type: DELETE_BUDGET
      });
    } catch (err) {
      setError(err.response.data.msg);
    }

    // getBudget();
  };

  // Get Budget

  const getExpense = async () => {
    try {
      const res = await axios.get('/api/expense');
      const result = res.data;

      dispatch({
        type: GET_EXPENSE,
        payload: result.expense
      });
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  // Delete Expense

  const deleteExpense = async id => {
    try {
      await axios.delete(`/api/expense/${id}`);

      dispatch({
        type: DELETE_EXPENSE,
        payload: id
      });
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  // Add Expense

  const addExpense = async value => {
    try {
      const res = await axios.post('/api/expense', value, config);
      const expense = await res.data;

      dispatch({
        type: ADD_EXPENSE,
        payload: expense.newExpense
      });
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  // Set Edit

  const setEdit = value => {
    dispatch({
      type: SET_EDIT,
      payload: value
    });
  };

  // Update Expense

  const updateExpense = async value => {
    try {
      const res = await axios.put(`/api/expense/${value._id}`, value, config);

      const update = await res.data.updatedExpense;
      dispatch({
        type: UPDATE_EXPENSE,
        payload: update
      });
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  // Clear All

  const clearAll = async () => {
    try {
      await axios.delete(`/api/expense/all/${user._id}`);
      dispatch({
        type: CLEAR_ALL
      });
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  const setError = err => {
    dispatch({
      type: SET_ERROR,
      payload: err
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
        errors: state.errors,
        toggleAuthList,
        hideAuthList,
        showAuthList,
        toggleMenuList,
        displayBudgetForm,
        displayExpenseForm,
        hideForm,
        getBudget,
        deleteExpense,
        setEdit,
        getExpense,
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
