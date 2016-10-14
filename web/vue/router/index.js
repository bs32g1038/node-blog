import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
    //if you use history mode, remember to config history-api fallback to index.html on server,nginx or whatever
    //and if you use webpack-dev-server,add a html-loader to parse may be better
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: "/category/:category",
            component: require('../views/index.vue')
        },
        {
            path: "/category/:category/:page",
            component: require('../views/index.vue')
        },
        {
            path: "/tag/:tag",
            component: require('../views/index.vue')
        },
        {
            path: "/tag/:tag/:page",
            component: require('../views/index.vue')
        },
        {
            path: "/search",
            component: require('../views/index.vue')
        },
        {
            path: "/",
            component: require('../views/index.vue')
        },
        {
            path: "/list/:page",
            component: require('../views/index.vue')
        },
        {
            path: "/post/search",
            component: require('../views/index.vue')
        },
        {
            path: "/post/:id",
            component: require('../views/post.vue')
        },
        {
            path: "/guestbook/:page(\\d+)?",
            component: require('../views/guestbook.vue')
        },
        {
            path: "/about",
            component: require('../views/about.vue')
        },
        {
            path: "/*",
            component: require('../views/page_404.vue')
        }

    ]
})
