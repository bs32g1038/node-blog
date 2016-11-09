<template>
    <div>
        <spinner :show="loading"></spinner>
        <PathNav :paths="paths"></PathNav>
        <transition :name="transition">
            <div class="archive-wrap" v-if="archives.length > 0 " :key="$route.fullPath">
                <section class="archive-inner">
                    <span class="archive-move-on"></span>
                    <span class="archive-page-counter">非常好! 目前共计 {{ postCount }} 篇日志。 继续努力。</span>
                    <Item v-for="item in archives" :key="item.year" :item="item"></Item>
                </section>
            </div>
        </transition>
        <PageNav url='/archives/' :curPage="curPage" :pageCount="pageCount"></PageNav>
    </div>
</template>

<script>
    import PathNav from '../components/PathNav.vue'
    import Item from '../components/ArchivesItem.vue'
    import PageNav from '../components/PageNav.vue'
    import Spinner from '../components/Spinner.vue'

    export default {
        components: {
            PathNav,
            Item,
            PageNav,
            Spinner
        },
        data() {
            return {
                loading: false,
                transition: 'slide-left',
                paths: [{url: '', name: '归档'}]
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
                var page = store.state.route.params.page;
                return store.dispatch('loadArchives', {
                    page: page
                }).then(() => {
                    this.transition = to > from ? 'slide-left' : 'slide-right';
                    this.loading = false;
                })
            }
        },
        computed: {
            archives() {
                return this.$store.state.archives;
            },
            curPage() {
                return this.$store.state.curPage;
            },
            postCount(){
                return this.$store.state.postCount;
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