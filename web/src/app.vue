<template>
    <div class="container" id="app">
        <header class="header">
            <div class="site-music">
                <div class="m-music">
                    <img src="/web/src/asset/logo.jpg" id="musicCtrl" title="嗨一下" class="music-wrap"
                         alt="冷夜流星博客,爱酷星,博客"/>
                </div>
            </div>
            <div class="site-meta">
                <div class="site-logo">
                    <div class="brand">
                        <span class="site-title">{{ site.name }}</span>
                    </div>
                </div>
                <p class="site-description">{{ user.motto }}</p>
            </div>
            <nav class="header-nav clearfix">
                <ul class="actions float-left">
                    <li class="action">
                        <router-link :to="'/'"><i class="fa fa-fw fa-home"></i>首页</router-link>
                    </li>
                    <li class="action">
                        <router-link :to="'/guestbook'"><i class="fa fa-fw fa-edit"></i>留言</router-link>
                    </li>
                    <li class="action">
                        <router-link :to="'/about'"><i class="fa fa-fw fa-user"></i>关于</router-link>
                    </li>
                    <li class="action">
                        <router-link :to="'/about'"><i class="fa fa-fw fa-github"></i>GitHub</router-link>
                    </li>
                </ul>
                <div class="actions float-right search">
                    <i class="fa fa-fw fa-search"></i>
                    <input type="text" placeholder="请输入搜索的关键词..." v-model="search_key" @keyup.enter="search">
                </div>
            </nav>
        </header>
        <div class="main">
            <transition name="fade" mode="out-in">
                <router-view class="view"></router-view>
            </transition>
        </div>
        <footer class="footer clearfix">
            <div class="back-top" title="返回顶部">
                <i class="fa fa-long-arrow-up"></i>
            </div>
            <ul class="footer-nav float-left">
                <li>
                    <div class="title"><i class="fa fa-folder-o fa-fw"></i>文章分类</div>
                    <ul class="actions category">
                        <li class="action" v-for="item in cats" :key="item.id" :item="item">
                            <router-link :to="'/category/' + item.alias">{{ item.name }}</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="title"><i class="fa fa-user fa-fw"></i>个人信息</div>
                    <ul class="items">
                        <li class="item">
                            <i class="fa fa-map-marker fa-fw"></i>&nbsp;{{ user.location }}
                        </li>
                        <li class="item">
                            <i class="fa fa-fw fa-qq"></i>&nbsp;{{ user.qq }}
                        </li>
                        <li class="item">
                            <i class="fa fa-envelope fa-fw"></i>&nbsp;{{ user.email }}
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="title"><i class="fa fa-link fa-fw"></i>友情链接</div>
                    <ul class="actions">
                        <li class="action" v-for="item in links" :key="item._id" :item="item">
                            <a v-bind:href="item.url" target="_blank">{{ item.name }}</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="title"><i class="fa fa-html5 fa-fw"></i>网站声明</div>
                    <div class="footer-text">
                        Copyright © <a href="http://www.jikezhi.cn">冷夜流星</a>
                        &nbsp; 文章供学习交流，转载请保留出处,谢谢合作&nbsp;{{ site.icp }}
                    </div>
                </li>
            </ul>
            <div class="footer-side float-right">
                <span> 快速扫描二维码打开网站</span>
                <div class="qr-code">
                    <img src="/web/src/asset/qr-code.png" alt="">
                </div>
            </div>
        </footer>
    </div>

</template>
<script>
    export default{

        data () {

            return {
                search_key: ''
            }
        },
        methods: {
            fetchData(store) {
                return store.dispatch('loadInitData');
            },
            search(){
                this.$store.dispatch('loadSearchList', {key: this.search_key});
            }
        },
        beforeMount () {
            //this.fetchData(this.$store)
        },
        computed: {
            cats () {
                return this.$store.state.cats
            },
            user(){
                return this.$store.state.user
            },
            links(){
                return this.$store.state.links
            },
            site(){
                return this.$store.state.site
            }
        }
    }
</script>