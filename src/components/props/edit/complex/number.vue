<template>
    <div class="styleProp" :style="'width:'+styleObj.width+'px'">
        <div class="text">
            <helpUI :styleObj="styleObj"></helpUI>
            {{ styleObj.name }}
        </div>
        <el-input-number :value="getValue" @change="changeValue" :step="step"
                         :min="min" :max="max" size="mini" :disabled="disabled" class="comp"></el-input-number>
    </div>
</template>
<!--
name:'',//标签
value:'',//值
help:''//帮助
step: '',//步长
min:'',最小值
max:'',最大值
 -->
<script>
import {getVal, updateValue} from '../EditCompReg'

export default {
    name: 'numberUI',

    props: [
        'styleObj'
    ],

    computed: {
        getValue: function () {
            return getVal(this.styleObj.value);
        },

        disabled(){
            if (typeof this.styleObj.disabled != 'undefined') {
                return getVal(this.styleObj.disabled);
            }
            return false;
        },

        step() {
            if (this.styleObj.step) {
                return this.styleObj.step;
            }
            return 1;
        },

        min() {
            if (typeof this.styleObj.min != 'undefined') {
                return this.styleObj.min;
            }
            return Number.MIN_SAFE_INTEGER;
        },

        max() {
            if (typeof this.styleObj.max != 'undefined') {
                return this.styleObj.max;
            }
            return Number.MAX_SAFE_INTEGER;
        },
    },
    methods: {
        changeValue: function (value) {
            updateValue(value, this.styleObj.value);
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
