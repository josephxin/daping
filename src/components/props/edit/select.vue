<template>
    <div class="styleProp">
        <span class="text">{{ styleObj.name }}</span>
        <el-select
            class="comp"
            size="mini"
            :placeholder="placeholder"
            :disabled="disabled"
            :value="getValue"
            @change="changeValue"
        >
            <el-option
                v-for="(data, index) in styleObj.range"
                :key="index"
                :label="optionName(data)"
                :value="optionValue(data)"
            >
                <template v-if="slotType == 'img'">
                    <div class="slotbox">
                        <span v-if="optionValue(data) != ''">
                            <img :src="optionValue(data)" width="25" />
                        </span>
                        <span style="font-size: 13px">{{
                            optionName(data)
                        }}</span>
                    </div>
                </template>
                <template v-if="slotType == 'iconfont'">
                    <div class="slotbox">
                        <span v-if="optionValue(data) != ''">
                            <i class="iconfont" :class="optionValue(data)"></i>
                        </span>
                        <span style="font-size: 13px">{{
                            optionName(data)
                        }}</span>
                    </div>
                </template>
            </el-option>
        </el-select>
    </div>
</template>

<script>
import { getVal, updateValue } from "./EditCompReg";
export default {
    name: "selectUI",
    props: ["styleObj"],
    computed: {
        getValue: function () {
            let val = getVal(this.styleObj.value);
            if (!val && !this.styleObj.noselectFirst) {
                // 如果当前选择值为null并且noselectFirst为false时，默认选择第一个选项
                val = this.optionValue(this.styleObj.range[0]);
            }
            return val;
        },
        placeholder() {
            return this.styleObj.placeholder || "请选择";
        },
        disabled() {
            if (typeof this.styleObj.disabled != "undefined") {
                return getVal(this.styleObj.disabled);
            }
            return false;
        },
        slotType() {
            return this.styleObj.slotType;
        },
    },
    methods: {
        changeValue: function (value) {
            updateValue(value, this.styleObj.value, null);
        },
        optionValue(obj) {
            if (this.isOnlyValue(obj)) {
                return obj;
            }
            return Object.keys(obj)[0];
        },

        optionName(obj) {
            if (this.isOnlyValue(obj)) {
                return obj;
            }
            return Object.values(obj)[0];
        },

        isOnlyValue(obj) {
            return typeof obj === "string" || typeof obj === "number";
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.slotbox {
    display: flex;
    span {
        display: inline-block;
        margin-right: 10px;
        img {
            display: inline-block;
            vertical-align: middle;
        }
    }
}
</style>
