<template>
    <nav>
        <ul class="page-nav">
            <li><a class="action" @click="prev">Prev</a></li>
            <li v-if="pageCount > 1">
                <a class="action" :class="{ active: current === 1 }" @click="changePage(1)">1</a>
            </li>
            <li v-if="showPrevMore">...</li>            
            <li v-for="page in pageList">
                <a :class="{ 'action':true,'active':page==current }" @click="changePage(page)">{{ page }}</a>
            </li>
            <li v-if="showNextMore">...</li>
            <li><a :class="{ 'action':true,'active':pageCount==current }" @click="changePage(pageCount)">{{ pageCount }}</a></li>
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
                showNextMore: false
            }
        },
        methods:{
            changePage (page) {
                if (this.current != page) {
                    this.current = page;
                    this.$emit('on-change', page);
                }
            },
            prev(){
                const current = this.current;
                if (current <= 1) {
                    return false;
                }
                this.changePage(current - 1);
            },
            next () {
                const current = this.current;
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
                let currentPage = this.current;
                let pageCount =  Math.ceil(this.total / this.pageSize);

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

                if(showPrevMore && !showNextMore){
                    const start = pageCount - listCount + 2
                    for(var i = start; i < pageCount; i++){
                        pageList.push(i)
                    }
                } else if(!showPrevMore && showNextMore){
                    for(var i = 2; i < listCount; i++){
                        pageList.push(i)
                    }
                } else if(showPrevMore && showNextMore){
                    const offset = Math.floor(listCount / 2) - 1;
                    for (let i = currentPage - offset ; i <= currentPage + offset; i++) {
                        pageList.push(i);
                    }
                } else {
                    for(var i = 2; i < pageCount; i++){
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