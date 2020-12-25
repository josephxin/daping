<template>
    <div>
        <div class="styleProp">
            <span class="text">{{ styleObj.name }}</span>
            <el-select
                @change="changeValue"
                class="comp"
                size="mini"
                v-model="curOption"
            >
                <el-option
                    :key="index"
                    :label="optionName(data)"
                    :value="optionValue(data)"
                    v-for="(data, index) in styleObj.range"
                />
            </el-select>
        </div>
        <div v-for="(item, index) in children" :key="index">
            <hr class="separate-line" />
            <component :is="item.type" :styleObj="item"></component>
        </div>
    </div>
</template>

<script>
import { getVal, updateValue, onlyUpdateAttr } from "../EditCompReg";
import { mapGetters } from "vuex";

export default {
    name: "gisCascade",
    props: ["styleObj"],
    data() {
        return {
            curOption: "",
            children: [],
        };
    },
    mounted() {
        this.curOption = getVal(this.styleObj.value);
    },
    computed: {
        ...mapGetters({ activeComp: "getFirstActiveComp" }),
    },
    watch: {
        curOption: {
            handler(val, oldVal) {
                if (val && val !== "") {
                    this.children = this.styleObj.relative[val];
                } else {
                    this.children = [];
                }
            },
        },
    },
    methods: {
        changeValue: function (value) {
            onlyUpdateAttr(this.styleObj.value, value);
            onlyUpdateAttr("value", "");
            this.children.map((item, i) => {
                onlyUpdateAttr(item.value, "");
            });
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

<style scoped>
</style>
