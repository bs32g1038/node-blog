<template>
    <div>
        <spinner :show="loading"></spinner>
        <PathNav :paths="paths"></PathNav>
        <Post :post="post"></Post>
        <p class="comment-list-tip">华丽分割线</p>
        <CommentBox url="/api/post/comment/add" :post_id="post._id"></CommentBox>
        <CommentList :comments="comments" :post_id="post._id"></CommentList>
    </div>
</template>

<script type="text/ecmascript-6">
    import JSHL from '../lib/code-prettify';
    import Post from '../components/Post.vue'
    import PathNav from '../components/PathNav.vue'
    import CommentBox from '../components/CommentBox.vue'
    import CommentList from '../components/CommentList.vue'
    import Spinner from '../components/Spinner.vue'

    export default {
        components: {
            Post,
            PathNav,
            CommentBox,
            CommentList,
            Spinner
        },
        data() {
            return {
                comment_nums: [],
                loading: false
            }
        },
        watch: {
            '$store.state.post': function () {
                this.$nextTick(function () {
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
            paths() {
                return [{
                    url: '/posts',
                    name: '文章列表'
                }, {
                    url: '',
                    name: this.$store.state.post.title
                }]
            },
            comments() {
                return this.$store.state.comments
            }
        },
        preFetch: function (store) {
            return this.methods.fetchData(store);
        }
    }
</script>