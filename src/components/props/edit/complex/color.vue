<template>
    <div class="styleProp">
        <div class="text">
            <helpUI :styleObj="styleObj"></helpUI>
            {{textName}}
        </div>
        <el-color-picker :value="getValue" @change="changeValue" class="comp color" size="mini"/>
        <el-input :value="getValue" class="comp input" disabled="disabled" placeholder="" size="mini"/>
    </div>
</template>

<script>
    import {getVal, updateValue} from '../EditCompReg'
    import * as d3 from 'd3'

    export default {
        name: 'colorUI',

        props: [
            'styleObj'
        ],
        computed: {
            getValue: function () {
                let color = getVal(this.styleObj.value);
                if (color == null || color == '') {
                    return '';
                }
                //console.log(d3.color(color).hex());//rbga或white转16进制；"rgba(0,0,0,0)"——>#000000
                return d3.color(color).hex();
            },

            textName: function () {
                let currentObj = this.styleObj;

                if (!currentObj.name) {
                    return '颜色';
                }
                return currentObj.name;
            }
        },
        methods: {
            changeValue: function (value) {
                //console.log("value", value)//返回16进制
                updateValue(value, this.styleObj.value, this.styleObj.verify, this.styleObj.currentVal);
            }
        }
    }
</script>
<style scoped>

    .styleProp .input {
        width: 158px;
    }

    .styleProp .color {
        width: 28px;
        margin-left: 10px;
    }

</style>
