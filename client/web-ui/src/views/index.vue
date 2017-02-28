<template>
    <div class="clearfix">
        <ul class="actions category">
            <li :class="$route.params.category ? 'action' :  'action a'">
                <router-link :to="'/'">全部</router-link>
            </li>
            <li v-for="item in cats" :key="item.id" :item="item" :class="$route.params.category == item.alias  ? 'action a' :  'action'">
                <span class="subforum_pipe">|</span>
                <router-link :to="'/category/' + item.alias">{{ item.name }}
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        created() {
            this.$store.dispatch('loadMenuId', 1);
        },
        computed: {
            cats() {
                return this.$store.state.cats
            }
        }
    }
</script>