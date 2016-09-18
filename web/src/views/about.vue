<template>
    <div>
        <PathNav :paths="[{url:'',name:'关于'}]"></PathNav>
        <div class="about">
            <h2 class="text-center">Just about me</h2>
            <div>say something...</div>
        </div>
    </div>
</template>
<script>

    import PathNav from '../components/PathNav.vue'

    export default{
        components: {
            PathNav
        },
    }
</script>