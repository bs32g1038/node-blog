<template>
    <article class="post">
        <header class="post-header">
            <h2 class="post-title"> <router-link :to='{ name: "article", params: { id : item._id } }' class="post-title-link">{{ item.title }}</router-link> </h2>
            <div class="post-meta">
                <span> <i class="fa fa-calendar-o fa-fw"></i> <span>发表于{{ parseTime(item.create_at,"y年m月d日 h:i:m") }}</span> </span>
                <span v-if="item.category">&nbsp; | &nbsp; <i class="fa fa-folder-o fa-fw"></i> 
                    <span>分类于
                        <router-link :to='{ name : "category-articles",params:{ category: item.category.alias } }'>
                        {{ item.category.name }}
                        </router-link>
                    </span>
                </span>
                <span>&nbsp; | &nbsp; <a href="/">{{ item.comment_count }}&nbsp;条评论</a> </span>
                <span>&nbsp; | &nbsp; <i class="fa fa-eye fa-fw"></i> <span>阅读次数&nbsp;{{ item.visit_count }}</span> </span>
            </div>
        </header>
        <div class="post-body clearfix">
            <div class="left" v-if="item.img_url">
                <img :src="item.img_url" :alt="item.title" class="snap" />
            </div>
            <p class="summary">{{ item.summary }}</p>
        </div>
    </article>
</template>
<script>
export default {
    props: ['item']
}
</script>