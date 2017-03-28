<template>
  <div>
    <spinner :show="loading"></spinner>
    <ul class="entries-box" v-if="articles && articles.length > 0" :key="$route.fullPath">
      <item v-for="item in articles" :key="item._id" :item="item"></item>
    </ul>
    <PageNav v-if="articles && articles.length > 0" :current="curPage" :total="totalCount"
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
        this.loading = true;
        let query = store.state.route.query;
        return store.dispatch('LOAD_SEARCHE_LIST', query).then(() => {
          this.loading = false;
          this.curPage = query.page
        });
      },
      changePage(page) {
        let query = this.$route.query;
        this.$router.push({
          name: 'search-list',
          query: {
            key: query.key,
            page: page
          }
        })
      }
    },
    computed: {
      articles() {
        return this.$store.state.items
      },
      totalCount() {
        return this.$store.state.total_count
      }
    },
    preFetch: function (store) {
      return this.methods.fetchData(store);
    },
    created() {
      this.$store.dispatch('LOAD_MENU_ID', 1)
    }
  }

</script>
