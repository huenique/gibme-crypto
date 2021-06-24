import api from './api';

// Action types
const types = {
  FETCH_REQUESTED: 'actions/FETCH_REQUESTED',
  FETCH_SUCCESS: 'actions/FETCH_SUCCESS',
  FETCH_ERROR: 'actions/FETCH_ERROR',
};

export const fetch = {
  fetchAssets: () => {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_REQUESTED });
      try {
        const res = await api.get('/api/asset/assets/');
        dispatch({ type: types.FETCH_SUCCESS, data: res.data });
      } catch (error) {
        dispatch({ type: types.FETCH_ERROR, error });
      }
    };
  },
};

export const assetsReducer = (state = {}, action) => {
  if (action.type === types.FETCH_SUCCESS) return action.data;
  return state;
};
