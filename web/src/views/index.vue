<template>
    <div>

        <PathNav :paths="paths"></PathNav>

        <div class="entries-box">
            <ul class="entries">
                <item v-for="item in postList" :key="item.id" :item="item">
                </item>
            </ul>
        </div>

        <PageNav url='/index/page/' v-bind:curPage="curPage" v-bind:pageCount="pageCount"></PageNav>

    </div>
</template>
<script>

    import Item from '../components/DocListItem.vue'
    import PageNav from '../components/PageNav.vue'
    import PathNav from '../components/PathNav.vue'

    export default{

        components: {
            Item,
            PageNav,
            PathNav
        },
        data () {
            return {
                //paths: [{url: '', name: '文章列表'}]
            }
        },
        beforeMount () {
            this.fetchData(this.$store)
        },
        watch: {
            '$route': function () {
                this.fetchData(this.$store);
            }
        },
        methods: {
            fetchData (store) {
                var category = store.state.route.params.category;
                var page = store.state.route.params.page;
                return store.dispatch('loadPostList', {
                    category: category,
                    page: page
                })
            }
        },
        computed: {

            postList () {
                return this.$store.state.postList;
            },
            curPage(){
                return this.$store.state.curPage;
            },
            pageCount(){
                return this.$store.state.pageCount;
            },
            cats(){
                return this.$store.state.cats;
            },
        
            paths(){
                var paths = [{url: '', name: '文章列表'}];
                return paths;
             }
        },

        preFetch: function (store) {
            return this.methods.fetchData(store);
        }
    }
</script>