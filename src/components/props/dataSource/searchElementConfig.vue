<template>
    <el-dialog
        :close-on-click-modal="false"
        :visible.sync="visible"
        :append-to-body="true"
        class="savedialog common-dialog edit-element-config"
        title="组件数据筛选条件配置"
        width="800px"
        :show-close="false"
        size="mini"
    >
        <div
            class="header"
            style="margin-bottom: 5px; text-align: right; padding-right: 16px"
        >
            <el-button
                type="primary"
                icon="el-icon-plus"
                circle
                @click.stop="addGlobalData"
                size="mini"
            ></el-button>
        </div>
        <el-table :data="globalData" border style="width: 100%">
            <el-table-column prop="name" label="条件字段">
                <template slot-scope="scope">
                    <el-select
                        v-model="scope.row.columnName"
                        style="width: 100%"
                        size="mini"
                    >
                        <el-option
                            v-for="item in metaList"
                            :key="item.id"
                            :label="item.columnName"
                            :value="item.columnName"
                        >
                            <span
                                >{{ item.columnName }}({{
                                    item.columnDesc
                                }})</span
                            >
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="operationType" label="操作条件" width="150">
                <template slot-scope="scope">
                    <el-select
                        v-model="scope.row.operationType"
                        placeholder="请选择条件"
                        style="width: 100%"
                        size="mini"
                    >
                        <el-option
                            v-for="o in operationTypes"
                            :key="o.code"
                            :label="o.description"
                            :value="o.code"
                        >
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="paramsFrom" label="取值方式" width="120px">
                <template slot-scope="scope">
                    <el-select
                        v-model="scope.row.paramsFrom"
                        style="width: 100%"
                        size="mini"
                        @change="_onParamsFromChange(scope.row, scope.$index)"
                    >
                        <el-option
                            v-for="item in paramsFrom"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="值/全局参数">
                <template slot-scope="scope">
                    <el-input
                        v-if="scope.row.paramsFrom === 1"
                        v-model="scope.row.value"
                        size="mini"
                    ></el-input>
                    <el-select
                        v-else
                        v-model="scope.row.value"
                        style="width: 100%"
                        size="mini"
                    >
                        <el-option
                            v-for="item in globalParamOptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name"
                        >
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>

            <el-table-column
                prop="operation"
                label="操作"
                width="80px"
                align="center"
            >
                <template slot-scope="scope">
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click.stop="delGlobalData(scope.$index)"
                        size="mini"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="dialog-footer" slot="footer">
            <el-button type="primary" class="primary-button" @click="_confirm"
                >确 定</el-button
            >
            <el-button @click="_onBack" class="info-button">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import operationTypes from "@/config/operationTypes";
import paramsFrom from "@/config/paramsFrom";
import { mapState } from "vuex";
export default {
    name: "dataset-global-params-edit",
    props: {
        globalParams: {
            type: Array,
            default: [],
        },
        visible: {
            type: Boolean,
            default: false,
        },
        metaList: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            globalData: [],
            operationTypes,
            paramsFrom,
        };
    },
    created() {
        this.globalData = _.cloneDeep(this.globalParams);
    },
    methods: {
        _getValueType(val, paramsFrom) {
            if (paramsFrom === 1) {
                if (val.indexOf("${") !== -1) return 3; //表达式
                return 1; //值
            } else {
                return 2; //全局参数
            }
        },
        _confirm() {
            let requireData = [];
            this.globalData.forEach((item) => {
                if (item.value && item.columnName) {
                    item.useType = this._getValueType(
                        item.value,
                        item.paramsFrom
                    );
                    requireData.push(item);
                }
            });
            this.$emit("onSave", requireData);
        },
        _onBack() {
            this.$emit("onBack");
        },
        addGlobalData() {
            this.globalData.push({
                operationType: "eq",
                paramsFrom: 1,
                value: "",
            });
        },
        delGlobalData(index) {
            this.globalData.splice(index, 1);
        },
        getGlobalVal(name) {
            for (let i = 0; i < this.globalParamOptions.length; i++) {
                if (this.globalParamOptions[i]["name"] === name) {
                    return this.globalParamOptions[i]["value"];
                }
            }
            return "";
        },
        _onParamsFromChange(row, index) {
            row.value = "";
        },
    },
    computed: {
        ...mapState(["window"]),
        globalParamOptions() {
            return this.window.globalParams;
        },
    },
};
</script>
<style lang="stylus" scoped>
.edit-element-config {
    .el-form-item {
        margin-bottom: 0;
    }
}
</style>