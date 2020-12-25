<template>
    <div class="color-list">
        <span v-for = "(item,index) in colorArray" :key="index" :style = "createColorStyle(item)"></span>
    </div>
</template>
<script>
export default {
    name : 'colorList',
    props : {
        colorArray : {
            type : Array,
            default : []
        }
    },
    created(){},
    methods : {
        createColorStyle(color){
            return {
                backgroundColor : color
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
    .color-list
        width 100%
        height 100%
        display flex
        span
            flex 1
            height 100%
</style>