<template>
    <div class="container" id="app">
        <header class="header">
            <div class="site-meta">
                <div class="site-logo-wrap">
                    <img v-bind:src="site.site_logo" title="嗨一下" class="site-logo"/>
                </div>
                <h1 class="site-title">{{ site.site_name }}</h1>
                <p class="site-description">{{ user.motto }}</p>
            </div>
            <nav class="header-nav clearfix">
                <ul class="actions">
                    <li class="action">
                        <router-link :to="'/'" :class="menuId == 1 && 'item-active'"><i class="fa fa-fw fa-home"></i>首页</router-link>
                    </li>
                    <!--<li class="action">
                        <router-link :to="'/archives'"><i class="fa fa-fw fa-archive"></i>归档</router-link>
                    </li>-->
                    <li class="action">
                        <router-link :to="'/guestbook'" :class="menuId == 2 && 'item-active'"><i class="fa fa-fw fa-edit"></i>留言</router-link>
                    </li>
                    <li class="action">
                        <router-link :to="'/about'" :class="menuId == 3 && 'item-active'"><i class="fa fa-fw fa-user"></i>关于</router-link>
                    </li>
                    <li class="action">
                        <a v-bind:href="user.github" target="_blank"><i class="fa fa-fw fa-github"></i>GitHub</a>
                    </li>
                </ul>
                <div class="actions search">
                    <i class="fa fa-fw fa-search"></i>
                    <input type="text" placeholder="请输入搜索的关键词..." v-model="search_key" @keyup.enter="search">
                </div>
            </nav>
        </header>
        <div class="main">
            <transition name="fade" mode="out-in">
                <router-view class="view" key="router-view"></router-view>
            </transition>
        </div>
        <footer class="footer clearfix">
            <div class="back-top" title="返回顶部" id="backTop">
                <i class="fa fa-long-arrow-up"></i>
            </div>
            <ul class="footer-nav">
                <li>
                    <div class="title"><i class="fa fa-user fa-fw"></i>个人信息</div>
                    <ul class="items">
                        <li class="item">
                            <i class="fa fa-pencil fa-fw"></i>网名：{{ user.nick_name }}
                        </li>
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
                        Copyright © <a v-bind:href="site.site_domain">{{ site.site_name }}</a>
                        &nbsp; 文章供学习交流，转载请保留出处,谢谢合作&nbsp;
                        <a href="http://www.miitbeian.gov.cn/" target="_blank">{{ site.site_icp }}</a>
                    </div>
                </li>
            </ul>
            <div class="footer-side">
                <span> 快速扫描二维码打开网站</span>
                <div class="qr-code">
                    <img src="/public/images/qr-code.png" :alt="site.site_name">
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
    import GoTop from './lib/goTop.js';

    export default {
        data() {
            return {
                search_key: ''
            }
        },
        methods: {
            search() {
                this.$router.push('/search?key=' + this.search_key);
                return this.$store.dispatch('loadSearchList', {
                    key: this.search_key
                });
            }
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
            links() {
               return this.$store.getters.links
            },
            site() {
                return this.$store.state.site
            },
            menuId() {
                return this.$store.state.menuId
            }
        },
        mounted() {
            new GoTop({
                el: 'backTop',
            })
        },
        created() {
            this.search_key = this.$route.query.key || ''
        }
    }
</script>