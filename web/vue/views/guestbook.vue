<template>
    <div>
        <Spinner :show="loading"></Spinner>
        <PathNav :paths="paths"></PathNav>
        <transition :name="transition">
            <ul class="guestbook-list" v-if="guestbooks.length > 0" :key="$route.fullPath">
                <item v-for="item in guestbooks" :key="item._id" :item="item"></item>
            </ul>
        </transition>
        <PageNav url='/guestbook/'
                 :curPage="curPage"
                 :pageCount="pageCount"
        ></PageNav>
        <p class="tc state"><i class="fc-lb fa fa-comment-o">共有{{ guestbookCount }}条留言，</i>在这里留下你的足迹</p>
        <CommentBox url="/api/guestbook/add"></CommentBox>
    </div>
</template>
<script>
    "use strict"
    import Item from '../components/GuestbookItem.vue'
    import PageNav from '../components/PageNav.vue'
    import PathNav from '../components/PathNav.vue'
    import CommentBox from '../components/CommentBox.vue'
    import Spinner from '../components/Spinner.vue'


    export default {

        components: {
            Item,
            PageNav,
            PathNav,
            CommentBox,
            Spinner
        },
        data() {
            return {
                loading: false,
                transition: 'slide-left',
                paths: [{url:'',name:'留言板'}]
            }
        },
        watch: {
            '$route': function (newRoute, oldRoute) {
                this.fetchData(this.$store, newRoute.params.page, oldRoute.params.page)
            }
        },
        beforeMount() {
            this.fetchData(this.$store)
        },
        methods: {
            fetchData(store, to = 1, from = -1) {
                this.loading = true;
                store.dispatch('loadGuestbookList', {
                    page: store.state.route.params.page
                }).then(() => {
                    this.transition = to > from ? 'slide-left' : 'slide-right'
                    this.loading = false;
                });
            }
        },
        computed: {
            guestbooks() {
                return this.$store.state.guestbooks
            },
            curPage() {
                return this.$store.state.curPage
            },
            pageCount() {
                return this.$store.state.pageCount
            },
            guestbookCount() {
                return this.$store.state.guestbookCount
            }
        },
        preFetch: function (store) {
            return this.methods.fetchData(store);
        }
    }
</script>