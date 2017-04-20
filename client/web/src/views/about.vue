<template>
    <div class="content-wrap">
        <spinner :show="loading"></spinner>
        <div v-if="about" class="m-about">
            <h2 class="about-title">{{ about.title }}</h2>
            <div class="markdown" v-html="compileMarkdown(about.content || '')"></div>
        </div>
        <InfoTip v-if="!about"></InfoTip>
    </div>
</template>
<script>
import marked from '../lib/marked';
import Spinner from '../components/Spinner.vue'
import InfoTip from '../components/InfoTip.vue'

export default {
    components: {
        Spinner,
        InfoTip
    },
    data() {
        return {
            loading: false
        }
    },
    beforeMount() {
        this.fetchData(this.$store)
    },
    methods: {
        compileMarkdown: marked,
        fetchData(store) {
            this.loading = true;
            return store.dispatch('LOAD_ABOUT').then(() => {
                this.loading = false;
            });
        }
    },
    computed: {
        about() {
            return this.$store.state.item
        }
    },
    preFetch: function(store) {
        return this.methods.fetchData(store);
    },
    created() {
        this.$store.dispatch('LOAD_MENU_ID', 3)
    }
}
</script>