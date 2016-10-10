<template>
    <div>
        <PathNav :paths="paths"></PathNav>
        <section class="error">
            <div class="error-message">
                <div class="error-issue alert">{{ error_msg }}</div>
                <router-link :to="'/'" class="error-button"><i class="fa fa-fw fa-home"></i>回首页</router-link>
                <a  class="error-button" href="#" onClick="javascript:history.go(-1);"><i class="fa fa-fw fa-reply"></i>上一步</a>            
            </div>
        </section>
    </div>
</template>

<script>
    import PathNav from '../components/PathNav.vue'

    export default {
        components: {
            PathNav
        },
        data() {
            return {
                paths: [{
                    url: '',
                    name: '通知'
                }]
            }
        },
        computed: {
            error_msg() {
                return this.$store.state.error_msg;
            }
        }
    }
</script>