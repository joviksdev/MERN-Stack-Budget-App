import React, { useReducer } from 'react';
import alertReducer from './alertReducer';
import AlertContext from './alertContext';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlartState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);
  // Set Alert

  const setAlert = alerts => {
    const alertArray = alerts.map(alert => ({ ...alert }));

    dispatch({
      type: SET_ALERT,
      payload: alertArray
    });

    setTimeout(() => {
      removeAlert();
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
