<template>
    <div class="color-custom-area">
        <div class="header">
            <color-list :colorArray = editColor></color-list>
        </div>
        <draggable
            :animation="300"
            :list="editColor"
            ghost-class="ghost-color-item"
            handle = ".data-ex-icon"
        >
            <div class="color-custom-list" v-for="(item,index) in editColor" :key="index">
                <div class="data-ex-icon">
                    <svg viewBox="0 0 64 64" fill="#ffffff" width="20px" height="20px" class="data-ex-icons-vertdot"><rect x="35.01" y="48.31" width="6.44" height="6.44"></rect><rect x="35.01" y="35.43" width="6.44" height="6.44"></rect><rect x="35.01" y="22.55" width="6.44" height="6.44"></rect><rect x="35.01" y="9.67" width="6.44" height="6.44"></rect><rect x="22.13" y="48.31" width="6.44" height="6.44"></rect><rect x="22.13" y="35.43" width="6.44" height="6.44"></rect><rect x="22.13" y="22.55" width="6.44" height="6.44"></rect><rect x="22.13" y="9.67" width="6.44" height="6.44"></rect></svg>
                </div>
                <div class="color-box">
                    <el-color-picker v-model="editColor[index]"></el-color-picker>
                </div>
                <div class="color-input">
                    <el-input v-model="editColor[index]" size="mini"></el-input>
                </div>
                <div class="color-opreate" @click.stop="_onDelColor(index)">
                    <svg viewBox="0 0 64 64" width="16px" height="16px" class="data-ex-icons-trash trashbin" style="fill: currentcolor;">
                        <path d="M51.4,13.9v1.6c0,0.9-0.7,1.6-1.6,1.6H13.6c-0.9,0-1.6-0.7-1.6-1.6v-1.6c0-0.9,0.7-1.6,1.6-1.6h9
 c0.9,0,1.6-0.7,1.6-1.6C24.3,9.7,25.1,9,26,9h11.5c0.9,0,1.6,0.7,1.6,1.6c0,0.9,0.7,1.6,1.6,1.6h9C50.7,12.3,51.4,13,51.4,13.9z"></path>
                <path d="M40.8,50.1l0.8-25.4h-3.3l-0.8,25.4H40.8z M30.1,50.1h3.3V24.7h-3.3V50.1z M26,50.1l-0.8-25.4h-3.3l0.8,25.4H26
 z M44.9,55H18.5c-0.9,0-1.6-0.7-1.6-1.6l-1.5-31.2c0-0.9,0.7-1.7,1.6-1.7h29.4c0.9,0,1.7,0.8,1.6,1.7l-1.5,31.2
 C46.5,54.3,45.8,55,44.9,55z"></path></svg>
                </div>
            </div>
        </draggable>
        <div class="opt">
            <div class="button" @click.stop="_addColor">+ 添加</div>
        </div>
        <div class="split"></div>
        <div class="btn-group">
            <span @click.stop="_onConfirm">确认</span>
            <span @click.stop="_onCancel">取消</span>
        </div>
    </div>
</template>
<script>
import draggable from "vuedraggable"
import colorList from "./colorList"
export default {
    name : 'colorCustom',
    props : {
        colorArray : {
            type : Array,
            default : []
        }
    },
    data(){
        return {
            editColor : []
        }
    },
    created(){
        this.editColor = _.cloneDeep(this.colorArray)
    },
    methods : {
        _onConfirm(){
            this.$emit("onConfirm",this.editColor)
        },
        _onCancel(){
            this.$emit("onBack")
        },
        _addColor(){
            let color = this.editColor.length ? this.editColor[this.editColor.length -1] : '#fff'
            this.editColor.push(color)
        },
        _onDelColor(index){
            this.editColor.splice(index,1)
        }
    },
    components : {draggable,colorList},
    watch : {
        'colorArray': {
            handler: function(newVal, oldVal) {
                this.editColor = _.cloneDeep(newVal)
            },
            deep: true
        },
    }
}
</script>
<style lang="stylus" scoped>
    .color-custom-area
        max-height 260px
        overflow-y auto
        .header
            padding 5px 20px
            height 10px
            &:hover
                background-color #3A4552
        .color-custom-list
            display flex
            padding 6px 10px
            .data-ex-icon
                width 20px
                height 20px
                cursor move
                opacity 0
            .color-box
                width 32px
                height 18px
                margin-right 4px
                cursor pointer
                /deep/ .el-color-picker
                    height 18px
                    .el-color-picker__color
                        border 0
                    .el-color-picker__trigger
                        border 0
                        border-radius 0
                        height 18px
                        width 32px
                        padding 0
                        .el-icon-arrow-down
                            display none
            .color-opreate
                color #A0A7B4
                width 20px
                cursor pointer
                &:hover
                    color #fff
            .color-input
                flex auto
            /deep/ .el-input
                .el-input__inner
                    background-color transparent
                    border-radius 0
                    border-color transparent
                    height 20px
                    line-height 20px
                    padding 2px 5px
                    color #F0F0F0
                    cursor text
                    font-size 12px
                    &:focus,&:hover
                        border-color #6A7485
            &:hover
                background-color #3A4552
                .data-ex-icon
                    opacity 1
        .opt
            .button
                color #A0A7B4
                font-size 12px
                line-height 20px
                padding 6px 20px
                cursor pointer
                &:hover
                    color #fff
        .split
            width calc(100% - 16px)
            height 1px
            background-color #6A7485
            margin-top 8px
            margin-left 8px
        .btn-group
            display flex
            direction rtl
            padding 10px 0
            span
                padding 9px 12px
                line-height 14px
                letter-spacing 0.3px
                color #A0A7B4
                font-size 12px
                cursor pointer
                &:hover
                    color #fff
</style>