<template>
    <div :style="controlStyle" id="controlPanel">
        <span style="width:20px;float:right;">&nbsp;</span>
        <img @click="zoomIn" src="../assets/image/zoomOut.png" title="放大"/>
        <input :max="maxZoom" :min="minZoom" :style="sliderStyle" :value="zoomValue"
               @change="modifyZoom" @input="dragStyle" step="any" type="range"/>
        <!-- <el-slider :max="5" :min=".3" :show-tooltip="false" height="20px" style="width:300px;display:inline-block;float:right;"></el-slider> -->
        <img @click="zoomOut" src="../assets/image/zoomIn.png" title="缩小"/>
        <div style="clear:both;"></div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    name: 'ControlPanel',
    computed: {
        ...mapState(['window']),
        controlStyle: function () {
            return {
                width: this.window.controlZoom.width,
                left: this.window.comList.switchLeft + 'px'
            }
        },

        sliderStyle: function () {
            return {
                float: 'right',
                'background-size': (this.zoomValue / this.maxZoom * 100) + '% 100%'
            }
        },

        minZoom: function () {
            return this.window.controlZoom.min;
        },

        maxZoom: function () {
            return this.window.controlZoom.max;
        },

        zoomValue: function () {
            return this.window.preview.scale;
        }
    },
    methods: {
        ...mapActions(['zoomIn', 'zoomOut', 'zoom']),

        modifyZoom() {
            let value = event.target.value;
            this.zoom(parseFloat(value));
        },

        dragStyle() {
            let value = event.target.value / this.maxZoom * 100;
            let $input = event.target;
            $input.style.backgroundSize = value + '% 100%';
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#controlPanel {
    position: absolute;
    left: 200px;
    top: calc(100vh - 90px);
    height: 30px;
    width: calc(100vw - 400px);
    background-color: white;
    z-index: 2;
}

#controlPanel img {
    float: right;
    margin: 5px;
    height: 20px;
    width: 20px;
    cursor: pointer;
}

input[type=range] {
    -webkit-appearance: none;
    width: 230px;
    border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
    display: block;
    margin: 0 auto;
    margin-top: 12px;
    background: -webkit-linear-gradient(#05CEE8, #05CEE8) no-repeat;
    background-size: 0% 100%;
}

input[type=range]::-webkit-slider-runnable-track { /*轨道样式*/
    height: 6px;
    border-radius: 6px; /*将轨道设为圆角的*/
    box-shadow: 0 1px 1px #0d1112, inset 0 .125em .125em #0d1112; /*轨道内置阴影效果*/
}

input[type=range]:focus {
    outline: none;
}

input[type=range]::-webkit-slider-thumb { /*滑块的样式*/
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    margin-top: -4px; /*使滑块超出轨道部分的偏移量相等*/;
    background-image: url(../assets/image/zoomBtn.png);
    /* border: solid 0.125em gray;
    box-shadow: 0 .125em .125em #3b4547;  */
}
</style>
