<template>
    <div class="main">
        <div class="main-inner">
            <aside class="sidebar">
                <div class="sidebar-inner">
                    <div class="sidebar-widget-box">
                        <div class="title">
                            <i class="fa fa-search fa-fw"></i>快速搜索
                        </div>
                        <form class="search-wrap">
                            <input type="text" name="key" class="search-input" placeholder="搜索文章" autocomplete="off">
                            <i class="fa fa-search fa-fw search-icon"></i>
                        </form>
                    </div>
                    <section class="m-brief sidebar-widget-box">
                        <div class="title"><i class="fa fa-flag-o fa-fw"></i>站点信息</div>
                        <div class="m-site-author">
                            <img src="/web/images/avatar.png" class="u-author-image">
                            <p class="u-author-name">{{ init.user.nick_name }}</p>
                            <p class="u-description">{{ init.user.motto }}</p>
                        </div>
                        <nav class="m-site-state">
                            <div class="site-state-item u-posts">
                                <span class="site-state-item-count">{{ init.brief.article_count }}</span>
                                <span class="site-state-item-name">日志</span>
                            </div>
                            <div class="site-state-item u-categories">
                                <span class="site-state-item-count">{{ init.brief.category_count }}</span>
                                <span class="site-state-item-name">分类</span>
                            </div>
                            <div class="site-state-item u-likes">
                                <span class="site-state-item-count">{{ init.brief.guestbook_count }}</span>
                                <span class="site-state-item-name">留言</span>
                            </div>
                            <div class="site-state-item u-likes">
                                <span class="site-state-item-count">{{ init.brief.comment_count }}</span>
                                <span class="site-state-item-name">评论</span>
                            </div>
                        </nav>
                    </section>
                    <div class="sidebar-widget-box" v-if="init.categories && init.categories.length > 0">
                        <div class="title">
                            <i class="fa fa-folder-o fa-fw"></i>分类目录
                        </div>
                        <ul class="category-links clearfix">
                            <li class="category-links-item" v-for="item in init.categories" :key="item._id" :item="item">
                                <router-link :to='{ name : "category-articles",params:{ category: item.alias } }'>
                                    <i class="fa fa-hand-o-right fa-fw"></i>{{item.name}}
                                </router-link>
                                <span class="number">（{{item.article_count}}）</span>
                            </li>
                        </ul>
                    </div>
                    <div class="sidebar-widget-box">
                        <div class="title">
                            <i class="fa fa-link fa-fw"></i>友情链接
                        </div>
                        <ul class="friendship-links clearfix">
                            <li class="friendship-links-item" v-for="item in init.links" :key="item._id" :item="item">
                                <a :href="item.url" target="_blank">
                                    <i class="fa fa-angle-right fa-fw"></i>{{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    props: ['init']
}
</script>