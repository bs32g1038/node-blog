import { fetchArticleList, fetchArticleItem, fetchInitData, addComment } from './api'

export default {
  FETCH_ARTICLES: ({ commit }, params) => {
    return fetchArticleList(params).then(({ data }) => {
      commit('SET_ARTICLE_LIST', data)
    });
  },
  FETCH_ARTICLE: ({ commit }, _id) => {
    return fetchArticleItem(_id).then(({ data }) => {
      commit('SET_ARTICLE_ITEM', data)
    });
  },
  ADD_COMMENT: ({ commit }, data) => {
    return addComment(data).then(({ data }) => {
      // commit('', data)
    });
  },
  FETCH_INIT_DATA: ({ commit }) => {
    return fetchInitData().then(({ data }) => {
      commit('SET_INIT_DATA', data)
    })
  }
}