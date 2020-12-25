<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    components: {},
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    border: 0;
    user-select:none;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both;
}

html, body {
    width: 100%;
    height: 100%;
    font-family: 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
}

body {
    overflow: hidden;
}

::-webkit-scrollbar {
    /* 滚动条整体样式 */
    width: 5px;
    /* 高宽分别对应横竖滚动条的尺寸 */
    height: 5px;
}

::-webkit-scrollbar-thumb {
    /* 滚动条里面小方块 */
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: #cecece;
}

::-webkit-scrollbar-track {
    /* 滚动条里面轨道 */
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background-color: #f5f5f5;
}

@import '~@/assets/styles/common.scss';
@import '~@/assets/styles/project-list.scss';
</style>

<style lang="stylus">
@import '~@/assets/stylus/dialog.styl';
</style>