<template>
    <ul class="comment-list-wrap">
        <li class="comment-list-inner" v-for="(item, index) in comments" :key="index">
            <span class="reply-author"><i class="fa fa-fw fa-user"></i>{{ item.nick_name }}</span>
            <span class="reply-time ml-10">{{ index + 1 }}楼 • {{ timeAgo(item.create_at,"m-d h:i") }}</span>
            <span class="float-right fs-12">
                <a href="#" class="fc-lb ml-10 fa fa-reply" @click.prevent="comment_num == index? (comment_num = -1): (comment_num = index)"></a>
            </span>
            <div class="m-quote" v-if="item.reply">
                <span class="reply-author"><i class="fa fa-fw fa-user"></i>{{ item.reply.nick_name }}</span>
                <span class="ml-10 fs-12">{{ timeAgo(item.reply.create_at,"m-d h:i") }}</span>
                <div class="reply-content">{{ item.reply.content }}</div>
            </div>
            <div class="reply-content">{{ item.content }}</div>
            <div class="m-replay-write-box" id="m-replay-write-box">
                <CommentBox url="/comments" v-if="comment_num == index" :article_id="article_id" :reply_id="item._id"></CommentBox>
            </div>
        </li>
    </ul>
</template>

<script>

    import CommentBox from './CommentBox.vue'

    export default{
        components: {
            CommentBox,
        },
        name: 'docs-item',
        props: ['comments', 'article_id'],
        data(){
            return {
                comment_num: -1
            }
        }
    }

</script>