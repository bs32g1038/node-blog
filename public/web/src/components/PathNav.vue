<template>

    <nav class="box-nav clearfix">
        <div class="actions float-left">
            当前位置：
            <router-link :to="'/'" class="action">首页</router-link>

            <span v-for="item in paths">
                <i class="fa fa-angle-right"></i>
                <router-link :to="item.url" class="action" v-if="item.url">{{ item.name }}</router-link>
                {{ item.url ? '' : item.name}}
            </span>
        </div>
        <div class="box-tip float-right">
            <span class="box-text">主人欢迎你回来！</span>
        </div>
    </nav>

</template>

<script>
    export default{
        name: 'path-nav',
        props: ['paths']
    }
</script>