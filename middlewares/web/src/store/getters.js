export default {
  activeArticleItems(state, getters) {
    let articles = state.articles.items
    let items = articles.map((article) => {
      for (let category of state.categories.items) {
        if (article.category == category.alias) {
          Object.assign(article, { category })
        }
      }
      return article
    })
    return items
  },
  activeArticleItem(state, getters) {
    let article = state.article;
    for (let category of state.categories.items) {
      if (article.category == category.alias) {
        Object.assign(article, { category })
      }
    }
    console.log(article)
    return article
  },
  activeCategoryItems(state, getters) {
    return state.categories.items
  },
  init(state, getters) {
    return {
      setting: state.setting,
      user: state.user
    }
  },
  count(state) {
    return state.count
  }
}