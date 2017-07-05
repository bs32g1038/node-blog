import Vue from 'vue'

export default {
  SET_ARTICLE_LIST: (state, { articles }) => {
    state.articles = articles;
  },
  SET_ARTICLE_ITEM: (state, { article, comments }) => {
    state.article = article;
    state.comments = comments;
  },
  SET_INIT_DATA: (state, { comments, articles }) => {
    state.count.articleCount = articles.totalCount;
    state.count.commentCount = comments.totalCount;
  }
}