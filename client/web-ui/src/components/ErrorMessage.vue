<template>
    <section class="error">
        <div class="error-message">
            <div class="error-issue alert">{{ error }}</div>
            <router-link :to="'/'" class="error-button"><i class="fa fa-fw fa-home"></i>回首页</router-link>
            <a class="error-button" href="#" onClick="javascript:history.go(-1);"><i class="fa fa-fw fa-reply"></i>上一步</a>
        </div>
    </section>
</template>

<script>
    export default {
        props: ['error']
    }
</script>