<template>
    <el-dialog
        :close-on-click-modal="false"
        :visible.sync="visible"
        :append-to-body="true"
        class="savedialog common-dialog edit-element-config"
        title="数据排序配置"
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
                @click.stop="addOrderByData"
                size="mini"
            ></el-button>
        </div>
        <el-table :data="orderByData" border style="width: 100%">
            <el-table-column prop="name" label="排序字段">
                <template slot-scope="scope">
                    <el-select
                        v-model="scope.row.bindMapperColumn"
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
            <el-table-column prop="orderByType" label="排序方式">
                <template slot-scope="scope">
                    <el-select
                        v-model="scope.row.orderByType"
                        placeholder="请选择排序方式"
                        style="width: 100%"
                        size="mini"
                    >
                        <el-option
                            v-for="o in orderByTypes"
                            :key="o.code"
                            :label="o.description"
                            :value="o.code"
                        >
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作"
                width="120px"
                align="center"
            >
                <template slot-scope="scope">
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click.stop="delOrderByData(scope.$index)"
                        size="mini"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="dialog-footer" slot="footer">
            <el-button type="primary" class="primary-button" @click="_confirm"
                >确 定</el-button
            >
            <el-button @click="hide" class="info-button">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: "dataset-orderby-params-edit",
    props: {
        globalParams: {
            type: Array,
            default: [],
        },
        metaList: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            visible: false,
            orderByData: [],
            orderByTypes: [
                {
                    code: "asc",
                    description: "正序",
                },
                {
                    code: "desc",
                    description: "倒序",
                },
            ],
        };
    },
    created() {
        this.orderByData = _.cloneDeep(this.globalParams);
    },
    methods: {
        _confirm() {
            let data = this.orderByData.filter(
                (item) => item.bindMapperColumn !== ""
            );
            this.$emit("onSave", data);
        },
        hide() {
            this.visible = false;
        },
        addOrderByData() {
            this.orderByData.push({
                orderByType: "asc",
                bindMapperColumn: "",
            });
        },
        delOrderByData(index) {
            this.orderByData.splice(index, 1);
        },
        show() {
            this.visible = true;
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