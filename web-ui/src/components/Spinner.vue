<template>
    <svg class="spinner" :class="{ show: show }" width="44px" height="44px" viewBox="0 0 44 44">
        <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
    </svg>
</template>

<script>
    export default {
        props: ['show']
    }
</script>
