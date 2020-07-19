import {
  TOGGLE_AUTH,
  TOGGLE_MENU,
  DISPLAY_BUDGET_FORM,
  DISPLAY_EXPENSE_FORM,
  HIDE_FORM,
  DELETE_EXPENSE,
  GET_EXPENSE,
  DELETE_BUDGET,
  ADD_BUDGET,
  GET_BUDGET,
  ADD_EXPENSE,
  SET_EDIT,
  UPDATE_BUDGET,
  UPDATE_EXPENSE,
  CLEAR_ALL,
  HIDE_AUTH_LIST,
  SHOW_AUTH_LIST,
  SET_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_AUTH:
      return {
        ...state,
        isDisplayAuthList: !state.isDisplayAuthList
      };

    case HIDE_AUTH_LIST:
      return {
        ...state,
        isDisplayAuthList: (state.isDisplayAuthList = false)
      };

    case SHOW_AUTH_LIST:
      return {
        ...state,
        isDisplayAuthList: (state.isDisplayAuthList = true)
      };

    case TOGGLE_MENU:
      return {
        ...state,
        isDisplayMenuList: !state.isDisplayMenuList
      };

    case DISPLAY_BUDGET_FORM:
      return {
        ...state,
        isBudgetFormDisplay: (state.isBudgetFormDisplay = true),
        isDisplayMenuList: (state.isDisplayMenuList = false),
        isExpenseFormDisplay: (state.isExpenseFormDisplay = false)
      };

    case DISPLAY_EXPENSE_FORM:
      return {
        ...state,
        isExpenseFormDisplay: (state.isExpenseFormDisplay = true),
        isDisplayMenuList: (state.isDisplayMenuList = false),
        isBudgetFormDisplay: (state.isBudgetFormDisplay = false)
      };

    case HIDE_FORM:
      return {
        ...state,
        isExpenseFormDisplay: (state.isExpenseFormDisplay = false),
        isBudgetFormDisplay: (state.isBudgetFormDisplay = false),
        isDisplayMenuList: (state.isDisplayMenuList = false),
        currentEdit: null
      };

    case DELETE_BUDGET:
      return {
        ...state,
        budgetValue: (state.budgetValue = null)
      };

    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          expense => expense._id !== action.payload
        )
      };

    case ADD_BUDGET:
      return {
        ...state,
        isBudgetFormDisplay: (state.isBudgetFormDisplay = false)
      };

    case UPDATE_BUDGET:
      return {
        ...state,
        budgetValue: action.payload,
        isBudgetFormDisplay: (state.isBudgetFormDisplay = false)
      };

    case GET_BUDGET:
      return {
        ...state,
        budgetValue: action.payload[0]
      };

    case GET_EXPENSE:
      return {
        ...state,
        expenses: action.payload,
        isExpenseFormDisplay: (state.isExpenseFormDisplay = false),
        isBudgetFormDisplay: (state.isBudgetFormDisplay = false)
      };

    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        isExpenseFormDisplay: (state.isExpenseFormDisplay = false),
        isBudgetFormDisplay: (state.isBudgetFormDisplay = false)
      };

    case SET_EDIT:
      return {
        ...state,
        isSetEdit: true,
        currentEdit: action.payload
      };

    case UPDATE_EXPENSE:
      return {
        ...state,
        isSetEdit: false,
        expenses: [
          ...state.expenses.map(expense =>
            expense._id === action.payload._id ? action.payload : expense
          )
        ],
        currentEdit: null,
        isExpenseFormDisplay: (state.isExpenseFormDisplay = false),
        isBudgetFormDisplay: (state.isBudgetFormDisplay = false),
        isDisplayMenuList: (state.isDisplayMenuList = false)
      };

    case CLEAR_ALL:
      return {
        ...state,
        expenses: (state.expenses = [])
      };

    case SET_ERROR:
      return {
        ...state,
        errors: action.payload
      };

    default:
      return state;
  }
};
