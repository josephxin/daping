<template>
    <div class="styleProp">
        <span class="text" v-if="!styleObj.isSuffix">{{ styleObj.name }}</span>
        <div class="comp">
            <el-switch
                :value="isChecked"
                :active-value="getRange[1]"
                :inactive-value="getRange[0]"
                @change="changeValue"
                size="small"
            >
            </el-switch>
            <span v-if="styleObj.isSuffix" class="after-text">{{
                styleObj.name
            }}</span>
        </div>
    </div>
</template>

<script>
import { getVal, onlyUpdateAttr } from "./EditCompReg";
export default {
    name: "booleanUI",

    props: ["styleObj"],

    computed: {
        isChecked: function () {
            let value = getVal(this.styleObj.value);
            let range = this.getRange;
            if (value == range[1]) {
                return true;
            }
            return false;
        },

        getRange: function () {
            let range = this.styleObj.range;
            if (range == null || range.length != 2) {
                return [false, true];
            }
            return range;
        },
    },

    methods: {
        changeValue: function (value) {
            // let checked = event.target.checked,range = this.getRange;
            // let value = checked?range[1] : range[0];

            onlyUpdateAttr(this.styleObj.value, value);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.styleProp .comp {
    padding: 4px 0;
    display: flex;
    align-items: center;
    .after-text {
        line-height: 1;
        margin-left: 5px;
    }
}
</style>
