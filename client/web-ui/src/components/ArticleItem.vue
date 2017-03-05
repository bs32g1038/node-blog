<template>
  <article class="post">
    <header class="post-header text-center">
      <h3 class="post-title">
        <router-link :to="{ name: 'article', params: { id: item._id }}" class="post-title-link">{{ item.title }}</router-link>
      </h3>
      <p class="post-meta">
        <span class="post-time">
          <i class="fa fa-fw fa-calendar-o"></i>发表于&nbsp;{{ parseTime(item.create_at,"y年m月d日 h:i") }}
        </span>
        <span class="post-category">&nbsp; | &nbsp;
          <i class="fa fa-fw fa-folder-o"></i>分类于
          <router-link :to="{ name: 'category-articles', params: { category: item.category && item.category.alias  }}">{{ item.category && item.category.name }}</router-link>
        </span>
        <span class="post-comments-count">
          &nbsp; | &nbsp;{{ item.comment_count }}
        </span>
        <span class="post-visit-count">&nbsp; | &nbsp;
          <i class="fa  fa-fw fa-eye"></i>阅读次数&nbsp;{{ item.visit_count }}
        </span>
      </p>
    </header>
    <div class="markdown" v-html="compileMarkdown(item.content || '')"></div>
  </article>
</template>

<script>
  import marked from '../lib/marked';
  export default {
    name: 'article-item',
    props: ['item'],
    methods: {
      compileMarkdown: marked,
    }
  }

</script>
