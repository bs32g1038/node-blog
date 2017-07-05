import api from './api';
import initState from '../common/state';

export const types = {
  SET_ARTICLES: 'ARTICLE/SET_ARTICLES',
}

export const fetchArticle = function (id) {
  return dispatch => {
    return api.fetchArticle(id).then(({data}) => data);
  }
}

export const fetchArticles = function ({page, per_page}) {
  return dispatch => {
    return api.fetchArticleList({page, per_page})
      .then(({data}) => {
        let articles = data.articles;
        return dispatch({
          type: types.SET_ARTICLES,
          articles
        })
      })
  }
}

export const saveArticle = function (id, data) {
  return dispatch => {
    if (id) {
      return api.updateArticle(id, data).then(res => res);
    }
    return api.addArticle(data).then(res => res);
  }
}

export const softDeleteArticle = function (id) {
  return dispatch => {
    return api.softDeleteArticle(id).then(res => res);
  }
}

export const articles = function (state = initState.articles, action) {
  switch (action.type) {
    case types.SET_ARTICLES:
      return {...state, ...action.articles}
    default:
      return state
  }
}

