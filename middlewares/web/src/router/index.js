import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const SearchList = () =>
  import ('../views/SearchList.vue')
const ArticleList = () =>
  import ('../views/ArticleList.vue')
const ArticleItem = () =>
  import ('../views/ArticleItemView.vue')

export function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/articles/:id', component: ArticleItem },
      { path: '/blog', component: ArticleList },
      { path: '/search', component: SearchList, name: 'search' },
      { path: '*', redirect: '/blog' }
    ]
  })
}