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
                paths: [{url: '', name: '文章列表'}]
            }
        },
        beforeMount () {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {

                var alias = this.$route.params.category_alias;

//                this.categories.map(function (category) {
//
//                    if (alias && alias == category.alias) {
//                        this.paths = [{url: '/', name: '文章列表'}, {url: '', name: category.name}]
//                    }
//                })

                return this.$store.dispatch('loadPostList', {
                    category: alias,
                    page: 1
                })
            }
        },
        computed: {
            postList () {
                return this.$store.state.postList
            },
            curPage(){
                return this.$store.state.curPage
            },
            pageCount(){
                return this.$store.state.pageCount
            }
        }
    }
</script>