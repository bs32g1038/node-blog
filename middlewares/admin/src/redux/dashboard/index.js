import api from './api';
import initState from '../common/state';

export const types = {
  SET_DASHBOARD: 'DASHBOARD/SET_DASHBOARD',
}

export const fetchDashboard = function() {
  return dispatch => {
    return api.fetchDashboard().then(({ data }) => {
      let dashboard = data;
      return dispatch({
        type: types.SET_DASHBOARD,
        dashboard
      })
    });
  }
}

export const dashboard = function(state = initState, action) {
  switch (action.type) {
    case types.SET_DASHBOARD:
      return { ...state, ...action.dashboard }
    default:
      return state
  }
}