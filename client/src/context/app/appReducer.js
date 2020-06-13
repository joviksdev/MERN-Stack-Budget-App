import {
  TOGGLE_AUTH,
  TOGGLE_MENU,
  DISPLAY_BUDGET_FORM,
  DISPLAY_EXPENSE_FORM,
  HIDE_FORM,
  DELETE_EXPENSE,
  DELETE_BUDGET,
  ADD_BUDGET,
  ADD_EXPENSE,
  SET_EDIT,
  UPDATE_EXPENSE,
  CLEAR_ALL,
  HIDE_AUTH_LIST
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
          expense => expense.id !== action.payload
        )
      };

    case ADD_BUDGET:
      return {
        ...state,
        budgetValue: action.payload,
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
            expense.id === action.payload.id ? action.payload : expense
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

    default:
      return state;
  }
};
