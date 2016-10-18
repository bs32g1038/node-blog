<template>
    <nav class="page-nav" v-if="pageCount > 1">
        <i class="fa fa-map-signs"></i>Page
        <router-link :to="url + n " v-bind:class="{ 'action':true,'active':n==curPage }"
                     v-for="n in pageCount" :key="n">{{ n }}
        </router-link>
    </nav>
</template>

<script>
    export default {
        name: 'page-nav',
        props: ['url', 'curPage', 'pageCount']
    }
</script>