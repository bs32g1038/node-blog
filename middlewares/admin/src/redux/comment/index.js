import api from './api';
import initState from '../common/state';

export const types = {
  SET_COMMENTS: 'COMMENT/SET_COMMENTS',
}

export const fetchComments = function({ page, per_page }) {
  return dispatch => {
    return api.fetchCommentList({ page, per_page }).then(({ data }) => {
      let comments = data.comments;
      return dispatch({
        type: types.SET_COMMENTS,
        comments
      })
    })
  }
}

export const addComment = function(comment) {
  return dispatch => {
    return api.addComment(comment).then(res => res);
  }
}

export const deleteComment = function(id) {
  return dispatch => {
    return api.deleteComment(id).then(res => res);
  }
}

export const comments = function(state = initState.comments, action) {
  switch (action.type) {
    case types.SET_COMMENTS:
      return { ...state, ...action.comments }
    default:
      return state
  }
}