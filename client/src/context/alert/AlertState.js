import React, { useReducer } from 'react';
import alertReducer from './alertReducer';
import AlertContext from './alertContext';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlartState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert

  const setAlert = alert => {
    const alertExist = state.find(err => alert.type === err.type);

    if (!alertExist) {
      dispatch({
        type: SET_ALERT,
        payload: alert
      });
    }

    setTimeout(() => {
      removeAlert(alert.type);
    }, 5000);
  };

  // Remove Alert

  const removeAlert = () => {
    dispatch({
      type: REMOVE_ALERT
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        removeAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlartState;
