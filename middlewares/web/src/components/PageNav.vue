<template>
  <nav>
    <ul class="page-nav">
      <li><a class="action" @click="prev">Prev</a></li>
      <li v-if="pageCount > 1">
        <a class="action" :class="{ active: currentPage === 1 }" @click="changePage(1)">1</a>
      </li>
      <li v-if="showPrevMore">...</li>
      <li v-for="page in pageList">
        <a :class="{ 'action':true,'active':page==currentPage }" @click="changePage(page)">{{ page }}</a>
      </li>
      <li v-if="showNextMore">...</li>
      <li><a :class="{ 'action':true,'active':pageCount==currentPage }" @click="changePage(pageCount)">{{ pageCount
        }}</a>
      </li>
      <li><a class="action" @click="next">Next</a></li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'page-nav',
    props: {
      total: {            // 数据总条数
        type: Number,
        default: 0
      },
      pageSize: {            // 每页显示条数
        type: Number,
        default: 10
      },
      current: {            // 当前页码
        type: Number,
        default: 1
      }
    },
    data: function () {
      return {
        showPrevMore: false,
        showNextMore: false,
        currentPage: this.current
      }
    },
    methods: {
      changePage (page) {
        if (this.currentPage != page) {
          this.currentPage = page;
          this.$emit('on-change', page);
        }
      },
      prev(){
        const current = this.currentPage;
        if (current <= 1) {
          return false;
        }
        this.changePage(current - 1);
      },
      next () {
        const current = this.currentPage;
        if (current >= this.pageCount) {
          return false;
        }
        this.changePage(current + 1);
      },
    },
    computed: {
      pageCount(){
        return Math.ceil(this.total / this.pageSize)
      },
      pageList(){    // 获取分页页码
        const listCount = 5;
        let pageList = [];
        let currentPage = this.currentPage;
        let pageCount = Math.ceil(this.total / this.pageSize);
        let showPrevMore = false;
        let showNextMore = false;
        if (pageCount > listCount) {
          if (currentPage > listCount - 2) {
            showPrevMore = true;
          }
          if (currentPage < pageCount - 2) {
            showNextMore = true;
          }
        }
        if (showPrevMore && !showNextMore) {
          const start = pageCount - listCount + 2
          for (var i = start; i < pageCount; i++) {
            pageList.push(i)
          }
        } else if (!showPrevMore && showNextMore) {
          for (var i = 2; i < listCount; i++) {
            pageList.push(i)
          }
        } else if (showPrevMore && showNextMore) {
          const offset = Math.floor(listCount / 2) - 1;
          for (let i = currentPage - offset; i <= currentPage + offset; i++) {
            pageList.push(i);
          }
        } else {
          for (var i = 2; i < pageCount; i++) {
            pageList.push(i)
          }
        }
        this.showPrevMore = showPrevMore;
        this.showNextMore = showNextMore;
        return pageList;
      }
    }
  }
</script>

<style>

  .page-nav {
    color: #bbb;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin: 10px;
    padding: 0;
    float: right
  }

  .page-nav li {
    display: inline;
    line-height: 25px
  }

  /*.page-nav li a{
      border: 1px solid #ccc
  } */

  .page-nav .text {
    font-size: 12px;
  }

  .page-nav .action {
    display: block;
    float: left;
    margin-left: 4px;
    padding: 0 8px;
    border: 1px solid #EBEBEB;
    background-color: #fbfbfb;
    background-repeat: no-repeat;
    color: #333;
    overflow: hidden;
    text-decoration: none;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer
  }

  .page-nav .active {
    background-color: #39f;
    color: #fff
  }

</style>
