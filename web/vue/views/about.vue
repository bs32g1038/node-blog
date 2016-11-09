<template>
    <div>
        <spinner :show="loading"></spinner>
        <PathNav :paths="paths"></PathNav>
        <div class="about" v-if="about">
            <h2 class="text-center">{{ about.title }}</h2>
            <div class="markdown" v-html="compileMarkdown(about.content || '')"></div>
        </div>
    </div>
</template>
<script>
    import marked from 'marked';
    import PathNav from '../components/PathNav.vue'
    import Spinner from '../components/Spinner.vue'

    export default {
        components: {
            PathNav,
            Spinner
        },
        data() {
            return {
                paths: [{url: '',name: '关于'}],
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
                return store.dispatch('loadAbout').then(() => {
                    this.loading = false;
                });
            }
        },
        computed: {
            about() {
                return this.$store.state.about
            }
        },
        preFetch: function(store) {
            return this.methods.fetchData(store);
        }
    }
</script>