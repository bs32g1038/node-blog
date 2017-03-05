<template>
  <div>
    <Spinner :show="loading"></Spinner>
    <ul class="guestbook-list" v-if="guestbooks && guestbooks.length > 0" :key="$route.fullPath">
      <item v-for="item in guestbooks" :key="item._id" :item="item"></item>
    </ul>
    <PageNav v-if="pageSize > 0" :current="curPage" :total="totalCount" @on-change="changePage"></PageNav>
    <InfoTip v-if="guestbooks && guestbooks.length === 0"></InfoTip>
    <p class="tc state"><i class="fa fa-comment fa-fw"></i>共有<strong class="text-blue">{{ totalCount }}</strong>条留言，在这里留下你的足迹</p>
    <CommentBox url="/guestbooks"></CommentBox>
  </div>
</template>
<script>
  import Item from '../components/GuestbookItem.vue'
  import PageNav from '../components/PageNav.vue'
  import CommentBox from '../components/CommentBox.vue'
  import Spinner from '../components/Spinner.vue'
  import InfoTip from '../components/InfoTip.vue'

  export default {

    components: {
      Item,
      PageNav,
      CommentBox,
      Spinner,
      InfoTip
    },
    data() {
      return {
        loading: false,
        curPage: 1
      }
    },
    watch: {
      '$route': function () {
        this.fetchData(this.$store)
      }
    },
    beforeMount() {
      this.fetchData(this.$store)
    },
    methods: {
      fetchData(store) {
        this.loading = true;
        store.dispatch('LOAD_GUESTBOOK_LIST', {
          page: store.state.route.params.page
        }).then(() => {
          this.loading = false;
        });
      },
      changePage(page) {
        return this.$store.dispatch('LOAD_GUESTBOOK_LIST', {
          page: page
        }).then(() => {
          this.loading = false;
          this.curPage = page;
        });
      }
    },
    computed: {
      guestbooks() {
        return this.$store.state.items
      },
      pageSize() {
        return this.$store.state.items.length
      },
      totalCount() {
        return this.$store.state.total_count
      }
    },
    preFetch: function (store) {
      return this.methods.fetchData(store);
    },
    created() {
      this.$store.dispatch('LOAD_MENU_ID', 2)
    }
  }

</script>
