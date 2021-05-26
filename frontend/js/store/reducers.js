import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { assetsReducer as assets } from './rest_check';

export const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    assets,
  });
};
