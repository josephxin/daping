<template>
    <div class="group-wrapper">
        <div class="styleProp group-title">
            <span :class="fold ? 'text' : 'text close'" @click="openOrClose">{{
                styleObj.name
            }}</span>
            <div class="show-btn" v-if="styleObj.show">
                <el-switch
                    :value="isChecked"
                    @change="changeValue"
                    size="small"
                >
                </el-switch>
                <span class="after-text">{{ showName }}</span>
            </div>
        </div>
        <div
            :key="index"
            class="group-item"
            v-for="(val, index) in styleObj.children"
            v-show="fold"
        >
            <hr class="separate-line" v-show="showFun(val)" />
            <component
                :is="val.type"
                :styleObj="val"
                v-show="showFun(val)"
            ></component>
        </div>
    </div>
</template>
<script>
import { getVal, onlyUpdateAttr } from "./EditCompReg";
import util from "@/util/util";
import { mapGetters } from "vuex";
export default {
    name: "group",
    props: ["styleObj"],
    data() {
        return {
            fold: true,
        };
    },
    computed: {
        ...mapGetters({ activeComp: "getFirstActiveComp" }),
        isChecked: function () {
            let value = getVal(this.styleObj.value);
            return value;
        },
        getStyle() {
            return this.activeComp.style;
        },
        showName() {
            return this.styleObj.showName ? this.styleObj.showName : "显示";
        },
    },
    mounted: function () {
        if (this.styleObj.showName == "title") console.log(this.styleObj);
        // 默认展开
        if (Object.keys(this.styleObj).indexOf("fold") != -1) {
            this.fold = this.styleObj["fold"];
        }
    },
    methods: {
        showFun(val) {
            return util.showFun(val, this.getStyle);
        },
        openOrClose() {
            this.fold = !this.fold;
        },
        changeValue: function (value) {
            onlyUpdateAttr(this.styleObj.value, value);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
