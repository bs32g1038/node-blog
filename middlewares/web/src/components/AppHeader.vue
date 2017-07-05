<template>
  <header class="header">
    <div class="header__inner">
      <router-link to="/" class="site-title" exact>
        <LogoSvg></LogoSvg>
        <strong> {{ init.setting.name }} </strong>
      </router-link>
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-item">
            <router-link to="/blog" exact>博客</router-link>
          </li>
          <div class="header__nav-list-main">
            <router-link :to="'/blog/' + item.alias" v-for="item in categoryItems" :key="item._id">{{item.name}}</router-link>
          </div>
          <template>
            <li class="header__nav-item">
              <form class="search-form" :class="{'search-form--active': active}" @submit.prevent="search">
                <input v-model="searchText" @blur="active=false" @focus="active=true" type="text" class="search-form__input" placeholder="搜索文章" autocomplete="off">
                <SearchSvg class="search-form__icon" @click.native="search"></SearchSvg>
              </form>
            </li>
          </template>
        </ul>
        <a :href="init.user.github" class="github-corner" aria-label="View source on Github" target="_blank">
          <GithubSvg></GithubSvg>
        </a>
      </nav>
    </div>
  </header>
</template>
<script>
import LogoSvg from '../svgs/Logo.vue';
import GithubSvg from '../svgs/Github.vue';
import SearchSvg from '../svgs/Search.vue';

export default { 
  components: {
    LogoSvg,
    GithubSvg,
    SearchSvg
  },
  data() {
    return {
      active: false,
      searchText: ''
    }
  },
  computed: {
    categoryItems() {
      return this.$store.getters.activeCategoryItems;
    },
    init() {
      return this.$store.getters.init
    }
  },
  methods: {
    search() {
      if (!this.searchText) {
        return
      }
      this.$router.push({
        name: 'search',
        query: {
          q: this.searchText
        }
      });
    }
  }
}
</script>