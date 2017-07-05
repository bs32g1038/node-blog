import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { categories, admin_role, setting } from 'init-data'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      article: {},
      articles: {
        items: [],
        totalCount: 0
      },
      comments: {
        items: [],
        totalCount: 0
      },
      categories: {
        items: categories,
        totalCount: categories.length
      },
      user: admin_role,
      setting,
      count: {
        articleCount: 0,
        commentCount: 0,
        categoryCount: categories.length
      }
    },
    actions,
    mutations,
    getters
  })
}