<template>
    <div>
        <spinner :show="loading"></spinner>
        <div v-if="success && about">
            <div class="about">
                <h2 class="about-title">{{ about.title }}</h2>
                <div class="markdown" v-html="compileMarkdown(about.content || '')"></div>
            </div>
        </div>
        <ErrorMessage :error="errorMsg" key="error" v-else></ErrorMessage>
    </div>
</template>
<script>
    import marked from '../lib/marked';
    import Spinner from '../components/Spinner.vue'
    import ErrorMessage from '../components/ErrorMessage.vue'

    export default {
        components: {
            Spinner,
            ErrorMessage
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
            },
            success() {
                // return this.$store.state.success
                return true
            },
            errorMsg() {
                return this.$store.state.error_msg;
            }
        },
        preFetch: function(store) {
            return this.methods.fetchData(store);
        },
        created() {
            this.$store.dispatch('loadMenuId', 3)
        }
    }
</script>