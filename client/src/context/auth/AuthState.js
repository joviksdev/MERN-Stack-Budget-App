import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setTokenInHeader from '../../utils/setTokenInHeader';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REMOVE_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER,
  GET_USER_FAIL,
  LOGOUT_USER
} from '../types';
import Axios from 'axios';

const AuthState = props => {
  const initialState = {
    token: null,
    user: null,
    isAuthenticated: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Register User

  const registerUser = async value => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/register', value, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      getUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });

      // Remove Error

      clearError();
    }
  };

  //Login User

  const loginUser = async value => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', value, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      getUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });

      // Remove Error

      clearError();
    }
  };

  //Get User

  const getUser = async () => {
    if (localStorage.token) {
      setTokenInHeader(localStorage.token);
    }

    try {
      const res = await Axios.get('/api/auth');

      dispatch({
        type: GET_USER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_USER_FAIL,
        payload: err.response.data.msg
      });

      // Remove Error

      clearError();
    }
  };

  // Logout User

  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER
    });
  };

  // Clear Error

  const clearError = () => {
    setTimeout(() => {
      dispatch({
        type: REMOVE_ERROR
      });
    }, 5000);
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        registerUser,
        loginUser,
        getUser,
        logoutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
