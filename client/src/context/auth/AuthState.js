import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setTokenInHeader from '../../utils/setTokenInHeader';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REMOVE_MSG,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER,
  GET_USER_FAIL,
  LOGOUT_USER
} from '../types';
import Axios from 'axios';

const AuthState = props => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    token: null,
    msg: []
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
      const token = await res.data;
      dispatch({
        type: REGISTER_SUCCESS,
        payload: token
      });

      getUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });

      //Remove msg

      setTimeout(() => {
        dispatch({
          type: REMOVE_MSG
        });
      }, 5000);
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
      const token = await res.data;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: token
      });

      getUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });

      //Remove msg

      setTimeout(() => {
        dispatch({
          type: REMOVE_MSG
        });
      }, 5000);
    }
  };

  //Get User

  const getUser = async () => {
    if (localStorage.token) {
      setTokenInHeader(localStorage.token);
    }

    try {
      const res = await Axios.get('/api/auth');
      const user = await res.data;
      dispatch({
        type: GET_USER,
        payload: user
      });
    } catch (err) {
      dispatch({
        type: GET_USER_FAIL,
        payload: err.response.data
      });
    }
  };

  // Logout User

  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        msg: state.msg,
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
