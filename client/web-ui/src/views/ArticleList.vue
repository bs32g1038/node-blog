<template>
  <div>
    <spinner :show="loading"></spinner>
    <ul class="entries-box clearfix" v-if="articles || articles.length > 0" :key="$route.fullPath">
      <item v-for="item in articles" :key="item._id" :item="item"></item>
    </ul>
    <PageNav v-if="pageSize > 0" :total="totalCount" :pageSize="pageSize" :current="curPage"
      @on-change="changePage"></PageNav>
    <InfoTip v-if="articles && articles.length === 0"></InfoTip>
  </div>
</template>
<script>
  import Item from '../components/ArticleListItem.vue'
  import PageNav from '../components/PageNav.vue'
  import Spinner from '../components/Spinner.vue'
  import InfoTip from '../components/InfoTip.vue'

  export default {

    components: {
      Item,
      PageNav,
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
        this.$router.push({
          name: 'articles',
          query: query
        })
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
      totalCount() {
        return this.$store.state.total_count;
      },
      pageSize() {
        return this.$store.state.items.length
      }
    },
    preFetch: function (store) {
      return this.methods.fetchData(store);
    }
  }

</script>
