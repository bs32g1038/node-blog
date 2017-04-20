<template>
    <div class="clearfix">
        <aside id="sidebar" class="sidebar" style="margin-top: 400px; display: block;">
            <div class="sidebar-inner">
                <section class="m-brief">
                    <div class="m-site-author">
                        <img class="u-author-image" src="">
                        <p class="u-author-name">冷夜流星</p>
                        <p class="u-description">一枚玩玩工程师</p>
                    </div>
                    <nav class="m-site-state">
                        <div class="site-state-item u-posts">
                            <a href="/archives">
                                <span class="site-state-item-count">183</span>
                                <span class="site-state-item-name">日志</span>
                            </a>
                        </div>
                        <div class="site-state-item u-categories">
                            <span class="site-state-item-count">6</span>
                            <span class="site-state-item-name">分类</span>
                        </div>
                        <div class="site-state-item u-likes">
                            <a href="/tags">
                                <span class="site-state-item-count">112</span>
                                <span class="site-state-item-name">点赞</span>
                            </a>
                        </div>
                    </nav>
                    <div class="m-rss-link">
                        <a href="/atom.xml" rel="alternate">
                            <i class="fa fa-rss"></i> RSS
                        </a>
                    </div>
                    <div class="m-author-links">
                        <span class="m-author-links-item">
                    <a href="https://github.com/iissnan" target="_blank">
                        <i class="fa fa-github"></i>
                        GitHub
                    </a>
                  </span>
                        <span class="m-author-links-item">
                    <a href="https://twitter.com/iissnan" target="_blank">
                        <i class="fa fa-twitter"></i>
                        Twitter
                    </a>
                  </span>
                        <span class="m-author-links-item">
                    <a href="http://douban.com/people/iissnan" target="_blank">
                        <i class="fa fa-globe"></i>
                        豆瓣
                    </a>
                  </span>
                        <span class="m-author-links-item">
                    <a href="http://www.zhihu.com/people/iissnan" target="_blank">
                        <i class="fa fa-globe"></i>
                        知乎
                    </a>
                  </span>
                    </div>
                </section>
                <div class="cat" id="js-thisArticle">
                    <div class="widget-cat">
                        <div class="title"><i class="fa fa-folder-o"></i>分类目录</div>
                        <div class="m-author-links">
                            <span class="m-author-links-item">
                    <a href="https://github.com/iissnan" target="_blank">
                        <i class="fa fa-angle-double-right"></i>
                        HTML5
                    </a>
                  </span>
                            <span class="m-author-links-item">
                    <a href="https://twitter.com/iissnan" target="_blank">
                        <i class="fa fa-angle-double-right"></i>
                        CSS3
                    </a>
                  </span>
                            <span class="m-author-links-item">
                    <a href="http://douban.com/people/iissnan" target="_blank">
                        <i class="fa fa-angle-double-right"></i>
                        Javascript
                    </a>
                  </span>
                            <span class="m-author-links-item">
                    <a href="http://www.zhihu.com/people/iissnan" target="_blank">
                        <i class="fa fa-angle-double-right"></i>
                        Java
                    </a>
                  </span>
                            <span class="m-author-links-item">
                    <a href="http://www.zhihu.com/people/iissnan" target="_blank">
                        <i class="fa fa-angle-double-right"></i>
                        windows
                    </a>
                  </span>
                            <span class="m-author-links-item">
                    <a href="http://www.zhihu.com/people/iissnan" target="_blank">
                        <i class="fa fa-angle-double-right"></i>
                        android
                    </a>
                  </span>
                            <span class="m-author-links-item">
                    <a href="http://www.zhihu.com/people/iissnan" target="_blank">
                        <i class="fa fa-angle-double-right"></i>
                        随笔
                    </a>
                  </span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
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