import Vue from 'vue'
import App from './app.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App // Object spread copying everything from App.vue
})

export { app, router, store }
