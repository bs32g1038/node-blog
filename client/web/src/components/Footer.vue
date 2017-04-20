<template>
    <footer id="footer" class="text-center">
        <div class="back-top" title="返回顶部" id="backTop">
            <svg width="16" height="16" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" class="Icon CornerButton-icon Icon--backToTopArrow" aria-hidden="true" style="height: 16px; width: 16px;">
                <title>回到顶部</title>
                <g>
                    <path d="M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z" fill-rule="evenodd"></path>
                </g>
            </svg>
        </div>
        <div class="container main-inner">
            <p>
                Copyright © <a :href="site.site_domain" class="text-white">李志成的个人网站</a> 文章供学习交流，转载请保留出处,谢谢合作
                <span><a href="http://www.miitbeian.gov.cn/" target="_blank">{{site.site_icp}}</a></span>
            </p>
            <p>
                由 <a href="">Nodejs</a> 强力驱动，遵守开源协议MIT
            </p>
            <p>
                本博客已经开源至<a :href="user.github" style="font-size:20px"><i class="fa fa-github fa-fw"></i>Github</a>，请大家多多关注
            </p>
        </div>
    </footer>
</template>
<script>
export default {
    props: ['site', 'user']
}
</script>