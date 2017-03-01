<template>
    <div>
        <spinner :show="loading"></spinner>
        <div v-if="success">
            <ul class="entries-box clearfix" v-if="articles.length > 0" :key="$route.fullPath">
                <item v-for="item in articles" :key="item._id" :item="item"></item>
            </ul>
            <PageNav url='/articles/' :curPage="curPage" :pageCount="pageCount"></PageNav>
        </div>
        <ErrorMessage :error="errorMsg" key="error" v-else></ErrorMessage>
    </div>
</template>
<script>
    import Item from './ArticleListItem.vue'
    import PageNav from '../common/PageNav.vue'
    import Spinner from '../common/Spinner.vue'
    import ErrorMessage from '../common/ErrorMessage.vue'

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
                this.loading = true;
                var page = store.state.route.params.page;
                return store.dispatch('LOAD_ARTICLE_LIST', {
                    page: page
                }).then(() => {
                    this.loading = false;
                })
            }
        },
        computed: {
            articles() {
                return this.$store.state.items;
            },
            curPage() {
                // return this.$store.state.curPage;
                return 1
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