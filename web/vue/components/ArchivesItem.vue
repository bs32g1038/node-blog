<template>
    <div>
        <div class="collection-title">
            <h2 class="archive-year">{{ item.year }}</h2>
        </div>
        <article class="archive-item" v-for="post in item.posts" :key="post._id">
            <header class="item-header">
                <h1 class="item-title">
                    <router-link :to="'/post/' + post._id ">
                        <span>{{ post.title }}</span>
                    </router-link>
                </h1>
                <div class="post-meta">
                    <span class="post-time">{{ parseTime(post.create_at, 'm-d') }}</span>
                </div>
            </header>
        </article>
    </div>
</template>

<script>
    export default {
        props: ['item']
    }
</script>