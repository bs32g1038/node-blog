<template>
    <div>
        <spinner :show="loading"></spinner>
        <div v-if="success && article">
            <ArticleItem :post="article"></ArticleItem>
            <p class="comment-list-tip">华丽分割线</p>
            <CommentList :comments="article.comments" :article_id="article._id"></CommentList>
            <CommentBox url="/api/comments" :article_id="article._id"></CommentBox>
        </div>
        <ErrorMessage :error="errorMsg" key="error" v-else></ErrorMessage>
    </div>
</template>

<script>

    import JSHL from '../lib/code-prettify';
    import ArticleItem from '../components/ArticleItem.vue'
    import CommentList from '../components/CommentList.vue'    
    import CommentBox from '../components/CommentBox.vue'
    import Spinner from '../components/Spinner.vue'
    import ErrorMessage from '../components/ErrorMessage.vue'

    export default {
        components: {
            ArticleItem,
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
                return store.dispatch('LOAD_ARTICLE', store.state.route.params.id)
                    .then(() => {
                        this.loading = false;
                    });
            }
        },
        computed: {
            article() {
                return this.$store.state.item
            },
            success() {
                return 1
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