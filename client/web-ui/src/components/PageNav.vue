<template>
    <nav class="page-nav" v-if="pageCount > 1">
        <i class="fa fa-map-signs"></i><span class="text">Page：1 of {{ pageCount }}</span>
       
        <router-link 
            :to="url + firstPage" 
            :class="{ 'action':true,'active':firstPage==curPage }" 
            v-if="showFirst">{{ firstPage }}
        </router-link>

        <span class="text" v-if="showFirstEllipsis">...</span>

        <router-link :to="url + n " :class="{ 'action':true,'active':n==curPage }" 
        v-for="n in showCount" :key="n" v-if="(curPage - groups) < n ">{{ n }}
        </router-link>

        <span class="text" v-if="showLastEllipsis">...</span>
        
        <router-link 
            :to="url + pageCount" 
            :class="{ 'action':true,'active':pageCount==curPage }"
            v-if="showLast">{{ pageCount }}
        </router-link>
    </nav>
</template>

<script>
    export default {
        name: 'page-nav',
        props: ['url', 'curPage', 'pageCount'],
        data: function () {
            return {
                groups: 3,
                showLastEllipsis: true,
                showLast:false,
                showFirstEllipsis:false,
                showFirst: false,
                firstPage: 1
            }
        },

        computed: {
             showCount: function(){
                return (this.curPage + this.groups) >= this.pageCount ? this.pageCount : (this.curPage + this.groups - 1)
             },
             showLastEllipsis(){
                 return (this.curPage +  this.groups) < this.pageCount
             },
             showFirstEllipsis(){
                 return this.curPage > this.groups + 1;
             },
             showFirst(){
                 return this.curPage >= this.groups + 1;
             },
             showLast(){
                 return (this.curPage +  this.groups) < this.pageCount;
             }
        }

    }
</script>