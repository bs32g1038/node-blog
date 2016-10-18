<template>
    <div>
        <PathNav :paths="[{url:'',name:'留言板'}]"></PathNav>

        <ul class="guestbook-list" v-if="guestbooks.length > 0">
            <item v-for="item in guestbooks" :key="item._id" :item="item"></item>
        </ul>

        <PageNav url='/guestbook/'
                 :curPage="curPage"
                 :pageCount="pageCount"
        ></PageNav>

        <p class="tc state"><i class="fc-lb fa fa-comment-o">共有{{ guestbookCount }}条留言，</i>在这里留下你的足迹</p>

        <CommentBox url="/api/guestbook/add"></CommentBox>

    </div>
</template>
<script>
    import Item from '../components/GuestbookItem.vue'
    import PageNav from '../components/PageNav.vue'
    import PathNav from '../components/PathNav.vue'
    import CommentBox from '../components/CommentBox.vue'

    export default {

        components: {
            Item,
            PageNav,
            PathNav,
            CommentBox,
        },
        data() {
            return {

            }
        },
        beforeMount() {
            this.fetchData(this.$store)
        },
        methods: {
            fetchData(store) {
                return store.dispatch('loadGuestbookList', {
                    page: store.state.route.params.page
                })
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
        preFetch: function(store) {
            return this.methods.fetchData(store);
        }
    }
</script>