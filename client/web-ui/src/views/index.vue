<template>
    <div class="clearfix">
        <ul class="actions category">
            <li :class="$route.query.category ? 'action' :  'action a'">
                <router-link :to="'/'">全部</router-link>
            </li>
            <li class="action" v-for="item in cats" :key="item.id" :item="item" :class="$route.query.category == item.alias  ? 'a' :  ''">
                <span class="subforum_pipe">|</span>
                <router-link :to='{ name: "articles", query: { category: item.alias }}'>{{ item.name }}
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        created() {
            this.$store.dispatch('LOAD_MENU_ID', 1);
        },
        computed: {
            cats() {
                return this.$store.state.init.categories
            }
        }
    }
</script>