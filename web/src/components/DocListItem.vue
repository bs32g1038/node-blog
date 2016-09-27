<template>

    <li class="entry">
        <div class="entry-container">
            <div class="entry-screenshot">
                <span class="span-mark" v-if="item.is_recommend">荐</span>
                <img class="entry-screenshot-img" v-bind:src="item.img_url"/>
            </div>
            <div class="entry-info">

                <div class="entry-title">
                    <router-link :to="'/post/' + item._id " class="entry-link">
                        {{ item.title}}
                    </router-link>
                </div>
                <div class="entry-tags tags">
                    <div class="tag no-pointer">{{ item.from == 1 ? '原创' : '转载' }}</div>
                    <div class="tag clean no-pointer">{{ parseTime(item.create_at,"y年m月d日") }}</div>
                    <router-link :to="'/tag/' + tag" v-for="tag in item.tags" :key="tag" class="tag action">
                        {{ tag }}
                    </router-link>
                </div>
            </div>
            <div class="entry-meta">
                <div class="actions">
                    <div class="action">
                        <i class="fa fa-fire"></i><span>{{ item.visit_count }}</span>
                    </div>
                    <div class="action">
                        <i class="fa fa-comment-o"></i><span>{{ item.comment_count }}</span>
                    </div>
                </div>
            </div>
        </div>
    </li>

</template>

<script>
    export default {
        name: 'docs-item',
        props: ['item']
    }

</script>