<template>
    <div class="fontUI">
        <groupUI :styleObj="getObj"></groupUI>
    </div>
</template>

<script>
import { comType } from "../EditCompReg";

export default {
    name: "fontUI",
    props: ["styleObj"],
    computed: {
        getObj() {
            let obj = {};

            obj.name = this.styleObj.name;
            if (typeof this.styleObj.fold != "undefined") {
                obj.fold = this.styleObj.fold;
            }
            let children = this.styleObj.children;
            let arr = [
                {
                    name: "字体",
                    type: comType.FONTFAMILY,
                    value: this.getValue("fontFamily"),
                },
                {
                    name: "粗细",
                    type: comType.FONTWEIGHT,
                    value: this.getValue("fontWeight"),
                },
                {
                    name: "字号",
                    type: comType.NUMBER,
                    value: this.getValue("fontSize"),
                    min: 12,
                },
                {
                    name: "颜色",
                    type: comType.COLOR,
                    value: this.getValue("fontColor"),
                },
            ];
            obj.children =
                children && Array.isArray(children)
                    ? children.concat(arr)
                    : arr;

            return obj;
        },
    },

    methods: {
        getValue(val) {
            if (this.styleObj.value) {
                return this.styleObj.value + " " + val;
            } else {
                return val;
            }
        },
    },
};
</script>

<style scoped>
</style>
