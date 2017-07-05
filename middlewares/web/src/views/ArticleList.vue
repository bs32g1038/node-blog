<template>
  <div class="articles">
    <ul class="articles__content">
      <li class="articles__item" v-for="item in displayedItems" :key="item.id">
        <div class="articles__item-content">
          <div class="articles__item-header">
            <div class="articles__brief">
              <div class="articles__item-meta">
                <a href="">
                <strong>{{ user.nick_name }}</strong>
                </a>
                <em>·</em> {{ item.created_at | parseTime }}
              </div>
              <router-link :to="'/articles/' + item.id" class="articles__item-title">{{ item.title }}</router-link>
              <div class="articles__item-meta">
                <a href="#">评论：{{ item.comment_count }}</a> <em>·</em>
                <a href="#">阅读：{{ item.visit_count }}</a>
                <em>·</em>
                <span>分类：{{ ( item.category && item.category.name) || '无' }}</span>
              </div>
            </div>
            <div class="articles__thumb">
              <a :style="{backgroundImage:`url(${item.img_url})`}" alt="">
            </a>
            </div>
          </div>
          <div class="articles__item-summary">{{ item.summary }}</div>
        </div>
      </li>
    </ul>
    <PageNav v-if="displayedItems && displayedItems.length > 0" :total="itemsTotalCount" @on-change="changePage"></PageNav>
  </div>
</template>
<script>
import PageNav from '../components/PageNav.vue'

export default {
  name: 'article-list',
  props: {
    type: String
  },
  components: {
    PageNav,
  },
  data() {
    return {
      displayedItems: [],
      displayedPage: Number(this.$store.state.route.query.page) || 1,
      page: 1
    }
  },
  computed: {

    itemsTotalCount() {
      const {
        itemsPerPage,
        articles
      } = this.$store.state
      return articles.totalCount;
    },
    sidebarBrief() {
      return this.$store.getters.sidebarBrief;
    },
    linkItems() {
      return this.$store.state.links.items;
    },
    user(){
      return this.$store.state.user;
    }
  },
  beforeMount() {
    this.loadItems(this.page)
  },
  methods: {
    loadItems(to = this.page, from = -1) {
      this.$bar.start()
      let opt = {
        page: to,
        per_page: 10
      }
      Object.assign(opt, {
        category_alias: this.type
      })
      this.$store.dispatch('FETCH_ARTICLES', opt).then(() => {
        if (this.page < 0 || this.page > this.maxPage) {
          this.$router.replace(`/1`)
          return
        }
        this.displayedPage = to
        this.displayedItems = this.$store.getters.activeArticleItems
        this.$bar.finish()
      })
    },
    changePage(page) {
      this.loadItems(page)
      this.$router.push({
        query: {
          page: page
        }
      })
    }
  }
}
</script>