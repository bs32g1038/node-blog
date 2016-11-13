<template>
    <div>
        <spinner :show="loading"></spinner>
        <PathNav :paths="paths"></PathNav>
        <transition :name="transition">
            <ul class="entries-box" v-if="postList.length > 0" :key="$route.fullPath">
                <item v-for="item in postList" :key="item._id" :item="item"></item>
            </ul>
        </transition>
        <PageNav :url='pageNavUrl' :curPage="curPage" :pageCount="pageCount"></PageNav>
    </div>
</template>
<script type="text/ecmascript-6">
    import Item from '../components/DocListItem.vue'
    import PageNav from '../components/PageNav.vue'
    import PathNav from '../components/PathNav.vue'
    import Spinner from '../components/Spinner.vue'

    export default {

        components: {
            Item,
            PageNav,
            PathNav,
            Spinner
        },
        data() {
            return {
                loading: false,
                transition: 'slide-left',
                paths: [{url: '', name: '搜索结果'}],
                pageNavUrl : ''
            }
        },
        beforeMount() {
            this.fetchData(this.$store)
        },
        watch: {
            '$route': function (newRoute, oldRoute) {
                this.fetchData(this.$store, newRoute.params.page, oldRoute.params.page)
            }
        },
        methods: {
            fetchData(store, to = 1, from = -1) {
                this.loading = true;
                var key = store.state.route.query.key;
                var page = store.state.route.query.page;                
                return store.dispatch('loadSearchList', {
                    key: key,
                    page: page
                }).then(() => {
                    page = page || 1;
                    this.pageNavUrl = '/search?key=' + key + '&page=';
                    this.transition = to > from ? 'slide-left' : 'slide-right'
                    this.loading = false;
                });
            }
        },
        computed: {
            postList() {
                return this.$store.state.postList;
            },
            curPage() {
                return this.$store.state.curPage;
            },
            pageCount() {
                return this.$store.state.pageCount;
            }
        },
        preFetch: function (store) {
            return this.methods.fetchData(store);
        }
    }
</script>