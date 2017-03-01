<template>
    <div>
        <section class="error">
            <div class="error-message">
                <div class="error-type">404</div>
                <div class="error-issue">抱歉！您访问的页面不存在......</div>
                <router-link :to="'/'" class="error-button"><i class="fa fa-fw fa-home"></i>回首页</router-link>
                <a  class="error-button" href="#" onClick="javascript:history.back(-2);"><i class="fa fa-fw fa-reply"></i>上一步</a>            
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        beforeMount() {
            this.fetchData(this.$store)
        },
        methods: {
            fetchData(store) {
                return store.dispatch('loadInitData');
            }
        },
        preFetch: function(store) {
            return this.methods.fetchData(store);
        }
    }
</script>