require('es6-promise').polyfill()
import App from './app.vue'
import router from './router/index.js'
import store from './store/index.js'
import { sync } from 'vuex-router-sync'

sync(store, router);

const app = new Vue({
    el: '#app',
    router,
    store,
    ...App, //spread from app.vue
})

export { app, router, store }


