<template>
    <div class="fieldMapUI group-wrapper">
        <div class="styleProp group-title">
            <span :class="fold ? 'text' : 'text close'" @click="openOrClose">{{
                styleObj.name
            }}</span>
        </div>
        <div class="box" v-show="fold">
            <el-form ref="form" :model="form" label-width="120px" size="mini">
                <el-form-item label="id：">
                    <el-select
                        v-model="form.id"
                        clearable
                        placeholder="请选择关联字段"
                    >
                        <el-option
                            v-for="(item, index) in dataField"
                            :key="index"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="指标名：">
                    <el-select
                        v-model="form.name"
                        clearable
                        placeholder="请选择关联字段"
                    >
                        <el-option
                            v-for="(item, index) in dataField"
                            :key="index"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="指标值：">
                    <el-select
                        v-model="form.value"
                        clearable
                        placeholder="请选择关联字段"
                    >
                        <el-option
                            v-for="(item, index) in dataField"
                            :key="index"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位：">
                    <el-select
                        v-model="form.unit"
                        clearable
                        placeholder="请选择关联字段"
                    >
                        <el-option
                            v-for="(item, index) in dataField"
                            :key="index"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="指标趋势：" v-if="styleObj.classify == 2">
                    <el-select
                        v-model="form.rate"
                        clearable
                        placeholder="请选择关联字段"
                    >
                        <el-option
                            v-for="(item, index) in dataField"
                            :key="index"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="指标趋势单位：" v-if="styleObj.classify == 2">
                    <el-select
                        v-model="form.rateUnit"
                        clearable
                        placeholder="请选择关联字段"
                    >
                        <el-option
                            v-for="(item, index) in dataField"
                            :key="index"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { getVal, onlyUpdateAttr } from "@/components/props/edit/EditCompReg";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
    name: "fieldMapUI",
    props: ["styleObj"],
    data() {
        return {
            fold: true,
            form: {
                id: "",
                name: "",
                value: "",
                rate: "",
                unit: "",
                rateUnit: "",
            },
        };
    },
    computed: {
        ...mapState(["components"]),
        ...mapGetters({
            activeComp: "getFirstActiveComp",
        }),
        compData() {
            return this.$store.getters.getCompData(this.activeComp.compId);
        },
        dataField() {
            //compData可能是静态数据（一维数组[{}]）或者数据集（二维数组[[{}]]）;
            let data = {};
            if (this.activeComp.data.datasource.type != "static") {
                if (this.compData[0]) {
                    data = this.compData[0][0] || {};
                }
            } else {
                data = this.compData[0] || {};
            }
            let dataField = Object.keys(data);
            //console.log("dataField -> dataField", dataField)
            return dataField;
        },
    },
    watch: {
        /* compData: {
            handler(newVal, oldVal) {
                //console.log("handler -> newVal, oldVal", newVal, oldVal);
                if (
                    JSON.stringify(newVal) !=
                    JSON.stringify(oldVal)
                ) {
                    this.form = {
                        id: "",
                        name: "",
                        value: "",
                        rate: "",
                        unit: "",
                        rateUnit: "",
                    };
                }
            },
            deep: true,
        }, */
        form: {
            handler(newVal, oldVal) {
                //console.log("handler -> newVal, oldVal", newVal, oldVal)
                if (
                    JSON.stringify(newVal) !=
                    JSON.stringify(this.activeComp.style[this.styleObj.value])
                ) {
                    onlyUpdateAttr(this.styleObj.value, _.cloneDeep(newVal));
                }
            },
            deep: true,
        },
    },
    created() {},
    mounted() {
        // 默认展开
        if (Object.keys(this.styleObj).indexOf("fold") != -1) {
            this.fold = this.styleObj["fold"];
        }
        this.form = _.cloneDeep(getVal(this.styleObj.value));
    },
    methods: {
        openOrClose() {
            this.fold = !this.fold;
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
