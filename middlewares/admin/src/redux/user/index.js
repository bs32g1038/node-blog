import api from './api';
import initState from '../common/state';

export const types = {
  SET_USER: 'USER/SET_USER',
  CREATE_SESSION: 'USER/CREATE_SESSION'
}

export const fetchUser = function() {
  return dispatch => {
    return api.fetchUser().then(({ data }) => {
      let user = data.user;
      return dispatch({
        type: types.SET_USER,
        user
      })
    })
  }
}

export const updateUser = function(user) {
  return dispatch => {
    return api.updateUser(user).then(res => res);
  }
}

export const login = function(account, password) {
  return dispatch => {
    return api.login(account, password).then(() => {
      dispatch({
        type: types.CREATE_SESSION,
        account
      })
    })
  }
}

export const user = function(state = initState.user, action) {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, ...action.user }
    case types.CREATE_SESSION:
      return { ...state, ...action.account }
    default:
      return state
  }
}