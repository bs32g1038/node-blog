import api from './api';
import initState from '../common/state';
import config from '../../config';

export const types = {
  CREATE_SESSION: 'USER/CREATE_SESSION'
}

export const login = function(account, password) {
  return dispatch => {
    return api.login(account, password).then(() => {
      dispatch({
        type: types.CREATE_SESSION,
        user: { account, password }
      })
    })
  }
}

export const user = function(state = initState.user, action) {
  switch (action.type) {
    case types.CREATE_SESSION:
      window.sessionStorage.setItem(config.tokenKey, JSON.stringify(action.user));
      return { ...state }
    default:
      return state
  }
}