<template>
<div>
    <PathNav :paths="paths"></PathNav>
	<div class="archive-wrap">
		<section class="archive-inner">
			<span class="archive-move-on"></span>
			<span class="archive-page-counter">非常好! 目前共计 {{ postCount }} 篇日志。 继续努力。</span>
            <Item v-for="item in archives" :key="item._id" :item="item"></Item>
		</section>
	</div>
	<PageNav url='/archives/' :curPage="curPage" :pageCount="pageCount"></PageNav>
</div>
</template>

<script>
    import PathNav from '../components/PathNav.vue'
    import Item from '../components/ArchivesItem.vue'
    import PageNav from '../components/PageNav.vue'

    export default {
        components: {
            PathNav,
            Item,
            PageNav            
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
            fetchData(store) {
                    var page = store.state.route.params.page;
                    return store.dispatch('loadArchives', {
                        page: page
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
            },
            paths() {
                var paths = [{ url: '', name: '归档' }];
                return paths;
            }
        },
        preFetch: function(store) {
            return this.methods.fetchData(store);
        }
    }

</script>