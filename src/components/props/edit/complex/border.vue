<template>
    <div class="borderUI">
        <groupUI :styleObj="getObj"></groupUI>
    </div>
</template>

<script>
import { comType } from "../EditCompReg";

export default {
    name: "borderUI",
    props: ["styleObj"],
    computed: {
        getObj: function () {
            let obj = {};

            obj.name = this.styleObj.name;

            if (typeof this.styleObj.fold != "undefined") {
                obj.fold = this.styleObj.fold;
            }
            
            obj.children = [
                {
                    name: "边框类型",
                    type: comType.SELECT,
                    value: this.getValue("borderType"),
                    range: [
                        { solid: "实线" },
                        { dashed: "虚线" },
                        { dotted: "点状虚线" },
                    ],
                },
                {
                    name: "宽度",
                    type: comType.NUMBER,
                    value: this.getValue("borderWidth"),
                    min: 0,
                },
                {
                    name: "颜色",
                    type: comType.COLOR,
                    value: this.getValue("borderColor"),
                },
                {
                    name: "圆角大小",
                    type: comType.NUMBER,
                    value: this.getValue("borderRadius"),
                    min: 0,
                },
            ];

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
