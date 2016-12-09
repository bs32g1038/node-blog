<template>
    <div>
        <spinner :show="loading"></spinner>
        <div v-if="success">
            <ul class="entries-box" v-if="postList.length > 0" :key="$route.fullPath">
                <item v-for="item in postList" :key="item._id" :item="item"></item>
            </ul>
            <PageNav :url='pageNavUrl' :curPage="curPage" :pageCount="pageCount"></PageNav>
        </div>
        <ErrorMessage :error="errorMsg" key="error" v-else></ErrorMessage>
    </div>
</template>
<script>
    import Item from '../components/DocListItem.vue'
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
                pageNavUrl: ''
            }
        },
        beforeMount() {
            this.fetchData(this.$store)
        },
        methods: {
            fetchData(store) {
                this.loading = true;
                var key = store.state.route.query.key;
                var page = store.state.route.query.page;
                return store.dispatch('loadSearchList', {
                    key: key,
                    page: page
                }).then(() => {
                    this.pageNavUrl = '/search?key=' + key + '&page=';
                    this.loading = false;
                });
            }
        },
        computed: {
            postList() {
                return this.$store.state.postList
            },
            curPage() {
                return this.$store.state.curPage
            },
            pageCount() {
                return this.$store.state.pageCount
            },
            success() {
                return this.$store.state.success
            },
            errorMsg() {
                return this.$store.state.error_msg
            }
        },
        preFetch: function(store) {
            return this.methods.fetchData(store);
        },
        created() {
            this.$store.dispatch('loadMenuId', 1)
        }
    }
</script>