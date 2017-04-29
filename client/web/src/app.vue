<template>
    <div id="app" class="container">
        <BlogHeader :site="site" :menuId="menuId"></BlogHeader>
        <BlogMain :init="init"></BlogMain>
        <BlogFooter :site="site" :user="user"></BlogFooter>
    </div>
</template>
<script>
import BlogHeader from './components/Header.vue';
import BlogMain from './views/Main.vue';
import BlogFooter from './components/Footer.vue';

import GoTop from './lib/goTop.js';

export default {
    components: {
        BlogHeader,
        BlogMain,
        BlogFooter
    },
    computed: {
        init() {
            return this.$store.state.init
        },
        user() {
            return this.$store.state.init.user
        },
        site() {
            return this.$store.state.init.site
        },
        menuId() {
            return this.$store.state.menuId
        }
    },
    mounted() {
        new GoTop({
            el: 'backTop',
        })
    }
}
</script>