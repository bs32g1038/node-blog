<template>
  <div class="article">
    <article class="article__inner">
      <div class="article__header">
        <router-link class="article__title" tag="h2" :to="'/articles/' + item.id">
          <a class="article__title-link">{{ item.title }}</a>
        </router-link>
        <div class="article__meta">
          <span>发表于{{ item.created_at | timeAgo }}前</span>
          <span v-if="item.category">&nbsp; | &nbsp;
                    <span>分类于
                        <router-link :to="'/blog/' + (item.category && item.category.alias)" exact>
                        {{ item.category.name }}
                        </router-link>
                    </span>
          </span>
          <span>&nbsp; | &nbsp;{{ item.comment_count }}条评论</span>
          <span>&nbsp; | &nbsp;阅读次数&nbsp;{{ item.visit_count }}</span>
        </div>
      </div>
      <div class="markdown-body" v-html="item.content || ''"></div>
      <div class="comments">
        <h3 class="comments__tip">既然来了，就说点什么吧~</h3>
        <CommentForm :articleId="item.id"></CommentForm>
        <ul class="comments-list">
          <li class="comments-list__item" v-for="(comment, index) in comments" :key="index">
            <div class="comments-list__info">
              <span class="comments-list__info-author">{{ comment.nick_name }}
                <span style="color: #fff;background-color: #6ba44e;padding: 2px;font-size: 12px;" v-if="comment.identity">博主</span>
              </span>
              <span class="comments-list__info-time">{{ index + 1 }}楼 • {{ comment.created_at | timeAgo }}前</span>
              <a href="javascript:;" class="comments-list__info-reply" @click.prevent="comment_num == index? (comment_num = -1): (comment_num = index)">回复</a>
            </div>
            <div class="comments-list__quote" v-if="comment.reply">
              <span class="comments-list__info-author"><i class="fa fa-fw fa-user"></i>{{ comment.reply.nick_name }}
                <span style="color: #fff;background-color: #6ba44e;padding: 2px;font-size: 12px;" v-if="comment.reply.identity">博主</span>
              </span>
              <span class="comments-list__info-time">{{ comment.reply.created_at | timeAgo }}前</span>
              <div class="comments-list__item-content">{{ comment.reply.content }}</div>
            </div>
            <div class="comments-list__item-content">{{ comment.content }}</div>
            <div class="comments-list__replay-box">
              <CommentForm v-if="comment_num == index" :articleId="item.id" :replyId="comment.id"></CommentForm>
            </div>
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>
<script>
import CommentForm from '../components/CommentForm.vue'
export default {
  components: {
    CommentForm
  },
  data() {
    return {
      item: {},
      id: this.$store.state.route.params.id || '',
      comment_num: -1
    }
  },
  computed: {
    sidebarBrief() {
      return this.$store.getters.sidebarBrief;
    },
    comments() {
      return this.$store.state.comments.items;
    }
  },
  beforeMount() {
    this.loadItem(this.id);
  },
  methods: {
    loadItem(id) {
      this.$bar.start()
      this.$store.dispatch('FETCH_ARTICLE', id).then(() => {
        this.item = this.$store.getters.activeArticleItem;
        this.$bar.finish()
      })
    }
  }
}
</script>