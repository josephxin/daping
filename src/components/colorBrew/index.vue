<template>
    <div class="color-brew-area" v-clickoutside="hideOpreate">
        <div class="header" @click="_toggleShowOpreate">
            <color-list :colorArray = "currentColor"></color-list>
        </div>
        <div class="opreate-area" v-show = "showOpreate">
            <el-form label-position="left" label-width="54px" size="mini" class="color-types-form">
                <template v-if = "!customPalette">
                    <el-form-item label="类型">
                        <el-select :popper-append-to-body = "false" v-model="type" placeholder="请选择类型" style='width:100%' size="mini">
                            <el-option
                                v-for="o in colorTypes"
                                :key="o"
                                :label="o"
                                :value="o">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="个数">
                        <el-select :popper-append-to-body = "false" v-model="steps" placeholder="" style='width:100%' size="mini">
                            <el-option
                                v-for="o in [3,4,5,6,7,8,9,10,11,12,13,15,20]"
                                :key="o"
                                :label="o"
                                :value="o">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="反转">
                        <div class='fr'>
                            <el-switch v-model="reversedColor" @change="reversedColors"></el-switch>
                        </div>
                    </el-form-item>
                </template>
                <el-form-item label="自定义">
                    <div class="fr">
                        <el-switch v-model="customPalette"></el-switch>
                    </div>
                </el-form-item>
            </el-form>
            <color-custom v-if="customPalette" :colorArray = "currentColor" @onConfirm = "_onsaveColor" @onBack = "_onBackColor"></color-custom>
            <ul class='color-item-box' v-if = "!customPalette">
                <li v-for="(item,index) in colorItems" :key="index" @click="selectColor(item.colors)">
                    <color-list :colorArray = item.colors></color-list>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {schemeNames,colorScheme} from "@/config/colorSchemas"
import colorList from "./colorList"
import colorCustom from "./colorCustom"
import Clickoutside from 'element-ui/src/utils/clickoutside'
export default {
    name : 'colorBrew',
    data(){
        return {
            showOpreate : false,
            type : 'diverging',
            currentColor : [],
            reversedColor : false,
            customPalette : false,
            steps : 3,
        }
    },
    props : {
        step : {
            type : Number,
            default : 3
        }
    },
    directives: {Clickoutside},
    created(){
        if(this.step) this.steps = this.step
        // this.currentColor = this.getSelectColor()
    },
    methods : {
        reversedColors(){
            this.currentColor = _.cloneDeep(this.currentColor).reverse()
        },
        hideOpreate(){
            if(this.customPalette) return
           this.showOpreate = false
        },
        _toggleShowOpreate(){
            this.showOpreate = !this.showOpreate
        },
        selectColor(colors){
            if(this.reversedColor){
                this.currentColor = colors.reverse()
            }else{
                this.currentColor = colors
            }
        },
        getSelectColor(){
            for(let i =0;i < colorScheme.length;i++){
                if(colorScheme[i].colors.length === this.steps && this.type === colorScheme[i].type){
                    return colorScheme[i].colors
                }
            }
            return []
        },
        _onsaveColor(colors){
            this.currentColor = colors
            this.customPalette = false
        },
        _onBackColor(){
            this.customPalette = false
        }
    },
    computed : {
        colorItems(){
            let colors = []
            for(let i =0;i < colorScheme.length;i++){
                if(this.type === colorScheme[i].type && this.steps === colorScheme[i].colors.length){
                    colors.push({
                        category : colorScheme[i].category,
                        type : colorScheme[i].type,
                        colors : colorScheme[i].colors
                    })
                }
            }
            if(colors.length) this.currentColor = colors[0].colors
            return colors
        },
        colorTypes(){
            let types = {}
            colorScheme.forEach(item => {
                types[item.type] = item.type
            })
            return types
        }
    },
    components : {colorList,colorCustom}

}
</script>
<style lang="stylus" scoped>
    .color-brew-area
        width 100%
        height 100%
        box-sizing border-box
        position relative
        .fr
            text-align right
        .header
            height 10px
            cursor pointer
            background-color #29323C
            padding 10px 20px
            border 1px solid #29323C
            transition all .4s ease
            &:hover
                background-color #3A414C
                border-color #D3D8E0
        .opreate-area
            width 100%
            position absolute
            left 0
            top 32px
            z-index 2
            box-sizing border-box
            background-color #29323C
            .color-item-box
                max-height 200px
                overflow-y auto
                li
                    padding 4px 10px
                    margin-bottom 2px
                    height 10px
                    cursor pointer
                    border-radius 2px
                    background-color #29323C
                    border 1px solid #29323C
                    transition all .4s ease
                    &:hover
                        background-color #3A414C
</style>
<style lang="stylus">
    .color-types-form
        padding 5px 10px
        .el-switch
            .el-switch__core
                border-radius 0
                width 40px
                height 12px
                border 0
                background-color #242730
                &:after
                    border-radius 0
                    background-color #3A414C
                    width 20px
                    height 12px
                    left 0
                    top 0
            &.is-checked
                .el-switch__core
                    background-color #1FB9D5
                    &:after
                        margin-left -20px
                        height 12px
                        left 100%
                        background-color #D3D8E0
        .el-select
            .el-input
                &.is-focus
                    .el-input__inner
                        border-color #D3D8E0
                        background-color #3A414C
        .el-input__inner
            background-color #242730
            height 32px
            line-height 32px
            color #A0A7B4
            border-radius 0
            border 1px solid #242730
            transition all .4s ease
            &:focus,&:hover
                color #A0A7B4
                border-color #D3D8E0
                background-color #3A414C
        .el-select-dropdown
            transform translate(-4px,-2px)
            margin-top 2px
            background-color #29323C
            border 0
            .el-select-dropdown__item
                padding 3px 9px
                color #A0A7B4
                line-height 20px
                font-weight normal
                transition all .4s ease
                &.selected,&.hover
                    background-color #6A7485
                    color #F0F0F0
        .popper__arrow
            display none
    .el-form-item--mini.el-form-item
        margin-bottom 5px
    .el-form-item__content
        padding-right 10px
    ::-webkit-scrollbar {
        /* 滚动条整体样式 */
        width: 0;
        /* 高宽分别对应横竖滚动条的尺寸 */
        height: 5px;
    }
    ::-webkit-scrollbar-thumb {
        /* 滚动条里面小方块 */
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background-color: #A0A7B4;
    }

    ::-webkit-scrollbar-track {
        /* 滚动条里面轨道 */
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background-color: #A0A7B4;
    }
</style>