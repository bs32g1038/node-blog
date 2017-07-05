<template>
  <div class="app-cover">
    <div class="app-cover__img"></div>
    <div class="app-cover__info">
      <section class="sidebar__widget-box">
        <div class="sidebar__author-info">
          <img src="../../public/avatar.png" class="sidebar__author-pic">
          <p class="sidebar__author-name">{{ init.user.nick_name }}</p>
          <p class="sidebar__author-description">{{ init.user.motto }}</p>
        </div>
        <nav class="sidebar__site-state">
          <div class="site-state-item">
            <span class="site-state-item__count">{{ count.articleCount }}</span>
            <span class="site-state-item__name">日志</span>
          </div>
          <div class="site-state-item">
            <span class="site-state-item__count">{{ count.categoryCount }}</span>
            <span class="site-state-item__name">分类</span>
          </div>
          <div class="site-state-item">
            <span class="site-state-item__count">{{ count.commentCount }}</span>
            <span class="site-state-item__name">评论</span>
          </div>
        </nav>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    articleCount() {
      return this.$store.state.articles.totalCount
    },
    count() {
      return this.$store.getters.count
    },
    init() {
      return this.$store.getters.init
    }
  }
}
</script>