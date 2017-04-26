<template>
    <header id="header" class="header">
        <div class="m-inner clearfix">
            <div class="site-meta">
                <router-link :to='{ name: "home" }' class="title-link">
                    <img :src="site.site_logo" :alt="site.site_name">
                </router-link>
                <h1 style="display:none">{{ site.site_name }}</h1>
            </div>
            <nav class="site-nav">
                <ul id="menu" class="menu">
                    <li :class="{ 'menu-item' : true, 'menu-item-active': menuId == 1}">
                        <router-link :to='{ name: "home" }'>
                            <i class="fa fa-home fa-fw"></i>博客
                        </router-link>
                    </li>
                    <li :class="{ 'menu-item' : true, 'menu-item-active': menuId == 2}">
                        <router-link :to='{ name: "guestbooks" }'>
                            <i class="fa fa-edit fa-fw"></i>留言
                        </router-link>
                    </li>
                    <li :class="{ 'menu-item' : true, 'menu-item-active': menuId == 3}">
                        <router-link :to='{ name: "about" }'>
                            <i class="fa fa-user fa-fw"></i>关于
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>
<script>
export default {
    props: ['site', 'menuId']
}
</script>