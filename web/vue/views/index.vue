<template>
    <div>

        <PathNav :paths="paths"></PathNav>

        <div class="entries-box">
            <ul class="entries">
                <item v-for="item in postList" :key="item._id" :item="item">
                </item>
            </ul>
        </div>

        <PageNav url='/list/' v-bind:curPage="curPage" v-bind:pageCount="pageCount"></PageNav>

    </div>
</template>
<script>
    // var local = require('../lib/local');
    import Item from '../components/DocListItem.vue'
    import PageNav from '../components/PageNav.vue'
    import PathNav from '../components/PathNav.vue'

    export default {

        components: {
            Item,
            PageNav,
            PathNav
        },
        data() {
            return {}
        },
        beforeMount() {
            this.fetchData(this.$store)
        },
        watch: {
            '$route': function() {
                this.fetchData(this.$store);
            }
        },
        methods: {
            //   formatDate: local.parseTime,
            fetchData(store) {
                var key = store.state.route.query.key;
                if (key) {
                    return store.dispatch('loadSearchList', {
                        key: key
                    });
                }
                var category = store.state.route.params.category;
                var page = store.state.route.params.page;
                return store.dispatch('loadPostList', {
                    category: category,
                    page: page
                })
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
            },
            cats() {
                return this.$store.state.cats;
            },
            paths() {
                var paths = [{
                    url: '',
                    name: '文章列表'
                }];
                var key = this.$route.query.key; //搜索关键词
                var category = this.$route.params.category; //分类目录,非显示名称
                var cats = this.$store.state.cats; //目录列表

                if (key) {
                    paths[0].name = '搜索结果';
                } else if (category) {
                    for (var cat of cats) { //更改路径导航
                        if (cat.alias == category) {
                            paths = [{
                                url: '/',
                                name: '文章列表'
                            }, {
                                url: '',
                                name: cat.name
                            }];
                            break;
                        }
                    }
                }

                return paths;
            }
        },
        preFetch: function(store) {
            return this.methods.fetchData(store);
        }
    }
</script>