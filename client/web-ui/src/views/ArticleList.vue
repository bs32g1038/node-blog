<template>
    <div>
        <spinner :show="loading"></spinner>
        <div v-if="success">
            <ul class="entries-box clearfix" v-if="articles.length > 0" :key="$route.fullPath">
                <item v-for="item in articles" :key="item._id" :item="item"></item>
            </ul>
            <PageNav
                :total="pageCount"
                :pageSize="2"
                :current="curPage"
                @on-change="changePage"
                >
            </PageNav>
        </div>
        <ErrorMessage :error="errorMsg" key="error" v-else></ErrorMessage>
    </div>
</template>
<script>
    import Item from '../components/ArticleListItem.vue'
    import PageNav from '../components/PageNav.vue'
    import Spinner from '../components/Spinner.vue'
    import ErrorMessage from '../components/ErrorMessage.vue'

    export default {

        components: {
            Item,
            PageNav,
            Spinner,
            ErrorMessage
        },
        data() {
            return {
                loading: false,
                curPage: 1
            }
        },
        watch: {
            '$route': function() {
                this.fetchData(this.$store)
            }
        },
        beforeMount() {
            this.fetchData(this.$store)
        },
        methods: {
            fetchData(store) {
                let query = store.state.route.query;
                this.loading = true;                
                return store.dispatch('LOAD_ARTICLE_LIST', query || {}).then(() => {
                    this.loading = false;
                })
            },

            changePage(page) {
                let query = this.$store.state.route.query;
                if (query) {
                    query = {
                        category: query.category,
                        page: page
                    }
                }
                this.$router.push({ name: 'articles', query: query })
                return this.$store.dispatch('LOAD_ARTICLE_LIST', query || {}).then(() => {
                    this.loading = false;
                    this.curPage = page;
                })
            }
        },
        computed: {
            articles() {
                return this.$store.state.items;
            },
            pageCount() {
                return this.$store.state.total_count;
            },
            success() {
                // return this.$store.state.success
                return true
            },
            errorMsg() {
                // return this.$store.state.error_msg;
                return ""
            }
        },
        preFetch: function(store) {
            return this.methods.fetchData(store);
        }
    }
</script>