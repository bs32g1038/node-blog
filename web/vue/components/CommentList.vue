<template>

    <ul class="comment-list-wrap">

        <li class="comment-list-inner" v-for="(item, index) in comments" :key="index">
            <span><i class="fa fa-fw fa-user fc-lb"></i>{{ item.nick_name }}</span>
            <span class="float-right fs-12">
                    <i>#{{ index + 1 }}F</i>
                    <i class="fc-grey-x1 ml05 mr05"> | </i>
                    <i> {{ timeAgo(item.create_at,"m-d h:i") }} </i>
                </span>
            <p>
                {{ item.content }}
                <a href="#" class="fc-lb ml-10" @click.prevent="comment_num == index? (comment_num = -1): (comment_num = index)">回复</a>
            </p>
            <div class="m-quote" v-if="item.reply">
                <span>
                                    <i class="fa fa-fw fa-user fc-lb"></i>
                                        {{ item.reply.nick_name }}
                                    </span>
                <span class="ml-10 fs-12">
                                    <i>{{ item.reply.create_at }}</i>
                                    </span>
                <p>
                    <span class="reply-content"></span>{{ item.reply.content }}
                </p>
            </div>
            <div class="m-replay-write-box" id="m-replay-write-box">
                <CommentBox url="/api/post/comment/add" v-if="comment_num == index" :post_id="post_id" :reply_id="item._id"></CommentBox>
            </div>

        </li>

    </ul>

</template>

<script>

    import CommentBox from '../components/CommentBox.vue'

    export default{
        components: {
            CommentBox,
        },
        name: 'docs-item',
        props: ['comments', 'post_id'],
        data(){
            return {
                comment_num: -1
            }
        }
    }

</script>