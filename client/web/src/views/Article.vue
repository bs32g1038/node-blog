<template>
    <div class="content-wrap">
        <spinner :show="loading"></spinner>
        <ArticleItem v-if="article" :item="article"></ArticleItem>
        <p v-if="article" class="comment-list-tip">华丽分割线</p>
        <CommentList v-if="article" :comments="article.comments" :article_id="article._id"></CommentList>
        <CommentBox v-if="article" url="/comments" :article_id="article._id"></CommentBox>
        <InfoTip v-if="!article"></InfoTip>
    </div>
</template>
<script>
import JSHL from '../lib/code-prettify';
import ArticleItem from '../components/ArticleItem.vue'
import CommentList from '../components/CommentList.vue'
import CommentBox from '../components/CommentBox.vue'
import Spinner from '../components/Spinner.vue'
import InfoTip from '../components/InfoTip.vue'


export default {
    components: {
        ArticleItem,
        CommentBox,
        CommentList,
        Spinner,
        InfoTip
    },
    data() {
        return {
            loading: false
        }
    },
    watch: {
        '$store.state.item': function() {
            this.$nextTick(function() {
              console.log("输出")
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
        }
    },
    preFetch: function(store) {
        return this.methods.fetchData(store)
    },
    created() {
        this.$store.dispatch('LOAD_MENU_ID', 1)
    }
}
</script>