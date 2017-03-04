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
            path: "/search",
            component: require('../views/Search.vue')
        },
        {
            path: "/",
            component: require('../views/index.vue'),
            children: [
                {
                    path: '',
                    component: require('../views/ArticleList.vue')
                },
                {
                    path: '/articles',
                    name: 'articles',
                    component: require('../views/ArticleList.vue')
                },
            ]
        },
        {
            path: "/articles/:id",
            name: 'article',
            component: require('../views/Article.vue')
        },
        {
            path: "/guestbooks",
            component: require('../views/Guestbook.vue')
        },
        {
            path: "/about",
            component: require('../views/About.vue')
        },
        // {
        //     path: "*",
        //     component: require('../views/page_404.vue')
        // }
    ]
})