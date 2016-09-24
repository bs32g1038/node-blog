<template>
    <div>
        <PathNav :paths="paths"></PathNav>
        <div class="about">
            <h2 class="text-center">{{ about.title }}</h2>
            <div class="markdown" v-html="compileMarkdown(about.content || '')"></div>
        </div>
    </div>
</template>
<script>
    var marked = require('marked');
    import PathNav from '../components/PathNav.vue'

    export default {
        components: {
            PathNav
        },
        data() {
            return {
                paths: [{
                    url: '',
                    name: '关于'
                }]
            }
        },
        beforeMount() {
            this.fetchData(this.$store)
        },
        methods: {
            compileMarkdown: function(input) {
                return marked(input);
            },
            fetchData(store) {
                return store.dispatch('loadAbout');
            }
        },
        computed: {
            about() {
                return this.$store.state.about
            }
        },
        preFetch: function(store) {
            return this.methods.fetchData(store);
        },
    }
</script>