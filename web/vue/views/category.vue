<template>
    <div>
        <spinner :show="loading"></spinner>
        <PathNav :paths="paths"></PathNav>
        <div v-if="success">
            <ul class="entries-box" v-if="postList.length > 0">
                <item v-for="item in postList" :key="item._id" :item="item"></item>
            </ul>
            <PageNav :url="pageNavUrl" :curPage="curPage" :pageCount="pageCount"></PageNav>
        </div>
        <ErrorMessage :error="errorMsg" key="error" v-else></ErrorMessage>
    </div>
</template>
<script>

    import Item from '../components/DocListItem.vue'
    import PageNav from '../components/PageNav.vue'
    import PathNav from '../components/PathNav.vue'
    import Spinner from '../components/Spinner.vue'
    import ErrorMessage from '../components/ErrorMessage.vue'

    export default {

        components: {
            Item,
            PageNav,
            PathNav,
            Spinner,
            ErrorMessage
        },
        data() {
            return {
                loading: false,
                transition: 'slide-left'
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
                var category = store.state.route.params.category;
                var page = store.state.route.params.page;
                return store.dispatch('loadPostList', {
                    category: category,
                    page: page
                }).then(() => {
                    this.transition = to > from ? 'slide-left' : 'slide-right'
                    this.loading = false;
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
            paths() {
                var category = this.$route.params.category;
                var cats = this.$store.state.cats;
                for (var i = 0; i < cats.length; i++) {
                    if (cats[i].alias == category) {
                        return [
                            {url: '', name: '分类'},
                            {url: '', name: cats[i].name}
                        ];
                    }
                }
                return [];
            },
            pageNavUrl(){
                var category = this.$route.params.category;
                var baseUrl = '/category/';
                return category ?  baseUrl + category + '/' : baseUrl; 
            },
            success() {
                return this.$store.state.success
            },
            errorMsg() {
                return this.$store.state.error_msg;
            }
        },
        preFetch: function (store) {
            return this.methods.fetchData(store);
        }
    }
</script>