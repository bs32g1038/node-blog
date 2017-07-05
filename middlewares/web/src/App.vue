<template>
  <div id="app">
    <AppCover></AppCover>
    <div class="app-content">
      <AppHeader></AppHeader>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
      <AppFooter></AppFooter>
    </div>
  </div>
</template>
<script>
import AppHeader from './components/AppHeader.vue';
import AppCover from './components/AppCover.vue';
import AppFooter from './components/AppFooter.vue';

const createListView = (id, name) => () =>
  import ('./views/CreateListView.js').then(m => m.default(id, name))
export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter,
    AppCover
  },
  beforeMount() {
    this.$store.dispatch('FETCH_INIT_DATA').then(() => {
      let categoryItems = this.$store.getters.activeCategoryItems;
      let cusRouter = categoryItems.map(function(item) {
        return {
          path: `/blog/${item.alias}`,
          component: createListView(item.alias, item.name)
        }
      })
      this.$router.addRoutes(cusRouter)
    })
  }
}
</script>