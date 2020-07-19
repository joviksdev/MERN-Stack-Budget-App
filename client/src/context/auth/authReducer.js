import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REMOVE_ERROR,
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
        isAuthenticated: true,
        token: localStorage.getItem('token')
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case GET_USER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        error: [action.payload],
        token: null
      };

    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null
      };

    case REMOVE_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};
