<template>

    <article class="post">

        <header class="post-header text-center">

            <h3 class="post-title">
                <router-link :to=" '/post/' + post._id" class="post-title-link">{{ post.title }}</router-link>
            </h3>

            <p class="post-meta">
                <span class="post-time">
                        <i class="fa fa-fw fa-calendar-o"></i>发表于&nbsp;{{ parseTime(post.create_at,"y年m月d日 h:i") }}
                    </span>

                <span class="post-category">&nbsp; | &nbsp;
                        <i class="fa fa-fw fa-folder-o"></i>分类于
                        <router-link :to=" '/category/' + post.category">{{ post.category_name }}</router-link>
                    </span>

                <span class="post-comments-count">&nbsp; | &nbsp;
                        <span>{{ post.comment_count }}</span>
                </span>

                <span class="post-visit-count">&nbsp; | &nbsp;
                        <i class="fa  fa-fw fa-eye"></i>阅读次数&nbsp;{{ post.visit_count }}
                    </span>
            </p>
        </header>

        <div class="markdown" v-html="compileMarkdown(post.content || '')"></div>

    </article>

</template>

<script>
    import marked from '../../lib/marked';
    export default {
        name: 'post',
        props: ['post'],
        methods: {
            compileMarkdown: marked,
        }
    }
</script>