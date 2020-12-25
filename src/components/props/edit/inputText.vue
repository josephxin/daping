<template>
    <div :id="styleObj.key" :ref="styleObj.key" class="styleProp">
        <div class="text">
            <helpUI :styleObj="styleObj"></helpUI>
            {{ styleObj.name }}
        </div>
        <el-input
            :disabled="disabled"
            @change="changeValue"
            class="comp"
            :placeholder="_placeholder"
            size="mini"
            v-model="getValue"
        >
        </el-input>
    </div>
</template>
<!--
name:'',//标签
value:'',//值
help:''//帮助
 -->
<script>
import { getVal, updateValue } from "./EditCompReg";

export default {
    name: "inputText",
    props: ["styleObj"],
    data() {
        return {};
    },
    mounted() {},
    computed: {
        getValue: {
            get() {
                return getVal(this.styleObj.value);
            },
            set(val) {
                //console.log("set -> val", val);
                updateValue(val, this.styleObj.value, this.styleObj.verify);
            },
        },
        disabled() {
            return this.styleObj && this.styleObj.disabled;
        },
        _placeholder() {
            return this.styleObj && this.styleObj.placeholder;
        },
    },
    methods: {
        changeValue: function (val) {
            //updateValue(val, this.styleObj.value, this.styleObj.verify);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
