<template>
    <div>
        <spinner :show="loading"></spinner>
        <div v-if="success && post">
            <Post :post="post"></Post>
            <p class="comment-list-tip">华丽分割线</p>
            <CommentList :comments="comments" :post_id="post._id"></CommentList>
            <CommentBox url="/api/post/comment/add" :post_id="post._id"></CommentBox>
        </div>
        <ErrorMessage :error="errorMsg" key="error" v-else></ErrorMessage>
    </div>
</template>

<script>
    import JSHL from '../lib/code-prettify';
    import Post from '../components/Post.vue'
    import CommentBox from '../components/CommentBox.vue'
    import CommentList from '../components/CommentList.vue'
    import Spinner from '../components/Spinner.vue'
    import ErrorMessage from '../components/ErrorMessage.vue'

    export default {
        components: {
            Post,
            CommentBox,
            CommentList,
            Spinner,
            ErrorMessage
        },
        data() {
            return {
                comment_nums: [],
                loading: false
            }
        },
        watch: {
            '$store.state.post': function() {
                this.$nextTick(function() {
                    JSHL();
                })
            },
        },
        beforeMount() {
            this.fetchData(this.$store)
        },
        methods: {
            fetchData(store) {
                this.loading = true;
                return store.dispatch('loadPost', store.state.route.params.id)
                    .then(() => {
                        this.loading = false;
                    });
            }
        },
        computed: {
            post() {
                return this.$store.state.post
            },
            comments() {
                return this.$store.state.comments
            },
            success() {
                return this.$store.state.success
            },
            errorMsg() {
                return this.$store.state.error_msg
            }
        },
        preFetch: function(store) {
            return this.methods.fetchData(store)
        },
        created() {
            this.$store.dispatch('loadMenuId', 1)
        }
    }
</script>