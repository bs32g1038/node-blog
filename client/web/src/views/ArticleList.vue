<template>
  <div>
    <spinner :show="loading"></spinner>
    <ul class="entries-box clearfix" v-if="articles && articles.length > 0" :key="$route.fullPath">
      <item v-for="item in articles" :key="item._id" :item="item"></item>
    </ul>
    <PageNav v-if="articles && articles.length > 0" :total="totalCount" :current="curPage"
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
        let page = store.state.route.query.page;
        let category = store.state.route.params.category;
        this.loading = true;
        return store.dispatch('LOAD_ARTICLE_LIST', {
          category: category,
          page: page
        }).then(() => {
          this.loading = false;
          this.curPage = Number(page) || 1;   
        })
      },
      changePage(page) {
        let category = this.$store.state.route.params.category;
        if (category) {
          this.$router.push({
            name: 'category-articles',
            params: {
              category: category
            },
            query: {
              page: page
            }
          })
        } else {
          this.$router.push({
            name: 'articles',
            query: {
              page: page
            }
          })
        }
      }
    },
    computed: {
      articles() {
        return this.$store.state.items;
      },
      totalCount() {
        return this.$store.state.total_count;
      }
    },
    preFetch: function (store) {
      return this.methods.fetchData(store);
    }
  }

</script>
