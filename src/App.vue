<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        margin: 0 auto;
        color: #000;
        background-color: #e8e8e8 !important;
    }

    input[type=file] {
        display: none !important;
    }

    .el-textarea__inner {
        color: #000;
    }

    img{
        max-width:100%;
    }
</style>
