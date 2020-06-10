import { TOGGLE_AUTH } from '../types';

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_AUTH:
      return {
        ...state,
        displayAuthList: !state.displayAuthList
      };

    default:
      return state;
  }
};
