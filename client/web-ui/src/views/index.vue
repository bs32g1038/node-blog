<template>
  <div class="clearfix">
    <ul class="actions category">
      <li class="action" :class="!$route.params.category && 'a'">
        <router-link :to="'/'">全部</router-link>
      </li>
      <li class="action" v-for="item in categories" :key="item.id" :item="item" :class="$route.params.category == item.alias && 'a'">
        <span class="subforum_pipe">|</span>
        <router-link :to='{ name: "category-articles", params: { category: item.alias }}'>{{ item.name }}
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
      categories() {
        return this.$store.state.init.categories
      }
    }
  }
</script>
