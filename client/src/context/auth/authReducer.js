import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REMOVE_MSG,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  GET_USER,
  GET_USER_FAIL,
  LOGOUT_USER
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        token: localStorage.getItem('token')
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case GET_USER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        msg: [...state.msg, action.payload]
      };

    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false
      };

    case REMOVE_MSG:
      return {
        ...state,
        msg: []
      };

    default:
      return state;
  }
};
