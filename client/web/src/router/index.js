import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({
    //if you use history mode, remember to config history-api fallback to index.html on server,nginx or whatever
    //and if you use webpack-dev-server,add a html-loader to parse may be better
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
            path: "/search",
            name: 'search-list',
            component: require('../views/Search.vue')
        },
        {
            path: "/",
            name: 'home',
            component: require('../views/ArticleList.vue')
        },
        {
            path: '/articles',
            name: 'articles',
            component: require('../views/ArticleList.vue')
        },
        {
            path: '/category/:category/articles',
            name: 'category-articles',
            component: require('../views/ArticleList.vue')
        },
        {
            path: "/articles/:id",
            name: 'article',
            component: require('../views/Article.vue')
        },
        {
            path: "/guestbooks",
            name: "guestbooks",
            component: require('../views/Guestbook.vue')
        },
        {
            path: "/about",
            name: "about",
            component: require('../views/About.vue')
        },
        // {
        //     path: "*",
        //     component: require('../views/page_404.vue')
        // }
    ]
})