<template>
    <div>
        <spinner :show="loading"></spinner>
        <div v-if="success">
            <ul class="entries-box" v-if="postList.length > 0" :key="$route.fullPath">
                <item v-for="item in postList" :key="item._id" :item="item"></item>
            </ul>
            <PageNav 
                :current="curPage" 
                :total="totalCount"
                @on-change="changePage"
            ></PageNav>
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
        beforeMount() {
            this.fetchData(this.$store)
        },
        methods: {
            fetchData(store) {
                this.loading = true;
                let query = store.state.route.query;
                return store.dispatch('LOAD_SEARCHE_LIST', query).then(() => {
                    this.loading = false;
                });
            },
            changePage(page) {
                this.loading = true;
                let query = this.$store.state.route.query;
                query && (query.page = page)
                return this.$store.dispatch('LOAD_SEARCHE_LIST', query).then(() => {
                    this.loading = false;
                    this.curPage = page
                });
            }
        },
        computed: {
            postList() {
                return this.$store.state.items
            },
            totalCount() {
                return this.$store.state.total_count
            },
            success() {
                return true
            },
            errorMsg() {
                return this.$store.state.error_msg
            }
        },
        preFetch: function(store) {
            return this.methods.fetchData(store);
        },
        created() {
            this.$store.dispatch('LOAD_MENU_ID', 1)
        }
    }
</script>