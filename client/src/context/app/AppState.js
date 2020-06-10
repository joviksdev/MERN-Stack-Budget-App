import React, { useReducer } from 'react';
import AppContext from './appContext';
import appReducer from './appReducer';
import { TOGGLE_AUTH } from '../types';

const AppState = props => {
  const initialState = {
    displayAuthList: false
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  // Toggle Auth List

  const toggleAuthList = () => {
    dispatch({
      type: TOGGLE_AUTH
    });
  };

  return (
    <AppContext.Provider
      value={{
        displayAuthList: state.displayAuthList,
        toggleAuthList
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
