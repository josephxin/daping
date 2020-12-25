<template>
    <div class="set-child-data-dialog-wrapper">
        <CommonDialog
            :visible="dialogParams.visible"
            :width="dialogParams.width"
            :closeOnClickModal="false"
            :showClose="false"
            :title="dialogParams.title"
        >
            <div slot="dialog-content" class="set-child-data-content">
                <div class="title-box">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="添加子集"
                        placement="top"
                    >
                        <div class="add-icon" @click="addTableData"></div>
                    </el-tooltip>
                </div>
                <div class="tree-table-box">
                    <el-table
                        :height="280"
                        :data="configChildDataSetTableData"
                        row-key="id"
                        stripe
                        border
                        :indent="10"
                        default-expand-all
                        :tree-props="{ children: 'children' }"
                    >
                        <el-table-column
                            :width="calculateWidth"
                        ></el-table-column>
                        <el-table-column label="子集">
                            <template slot-scope="scope">
                                <el-select
                                    v-if="scope.row.rowType == '1'"
                                    class="form-select"
                                    v-model="scope.row.subDatasetId"
                                    :disabled="scope.row.isDisabled"
                                    clearable
                                    filterable
                                    @change="
                                        (val) => {
                                            subDataSetChange(val, scope.row);
                                        }
                                    "
                                >
                                    <el-option
                                        v-for="item in subSetOptions"
                                        :key="item.dataSetBaseId"
                                        :label="item.name"
                                        :value="item.dataSetBaseId"
                                    >
                                    </el-option>
                                </el-select>
                                <el-input
                                    v-else
                                    class="form-input"
                                    v-model="scope.row.subDataSetName"
                                    disabled
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="主集字段">
                            <template
                                slot-scope="scope"
                                v-if="scope.row.rowType == '2'"
                            >
                                <el-select
                                    class="form-select"
                                    v-model="scope.row.mainSetFieldName"
                                    clearable
                                >
                                    <el-option
                                        v-for="item in mainSetFieldOptions"
                                        :key="item.id"
                                        :label="item.columnName"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="子集字段">
                            <template
                                slot-scope="scope"
                                v-if="scope.row.rowType == '2'"
                            >
                                <el-select
                                    class="form-select"
                                    v-model="scope.row.subSetFieldName"
                                    clearable
                                >
                                    <el-option
                                        v-for="item in scope.row
                                            .subSetFieldOptions"
                                        :key="item.id"
                                        :label="item.columnName"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="80px"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <div class="opt-col">
                                    <el-tooltip
                                        v-if="scope.row.isAllowedAdd"
                                        class="item"
                                        effect="dark"
                                        content="添加关系"
                                        placement="top"
                                    >
                                        <span
                                            class="add-btn"
                                            @click="addChildRow(scope.row)"
                                        ></span>
                                    </el-tooltip>
                                    <span
                                        class="txt-btn"
                                        @click="
                                            delOutputData(
                                                scope.row,
                                                configChildDataSetTableData
                                            )
                                        "
                                    ></span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="dialog-footer" class="dialog-footer">
                <el-button class="primary-button" @click="saveDataSubSet"
                    >确定</el-button
                >
                <el-button class="info-button" @click="cancle">取消</el-button>
            </div>
        </CommonDialog>
    </div>
</template>
<script>
import uuidv1 from "uuid/v1";
import CommonDialog from "@/components/dialog/common-dialog";
import {
    queryAllDataSet,
    queryDataSetDetail,
    editMainAndSubset,
    queryMainAndSubset,
} from "@/api/dataSetManageServe";
import { mapState } from "vuex";

export default {
    name: "set-child-data-dialog",
    props: {
        dialogParams: {
            type: Object,
            default() {
                return {
                    visible: false,
                    width: "700px",
                    title: "编辑",
                };
            },
        },
    },
    components: {
        CommonDialog,
    },
    data() {
        return {
            rowVal: null,
            subSetOptions: [],
            mainSetFieldOptions: [],
            subSetFieldOptions: [],
            configChildDataSetTableData: [],
        };
    },
    computed: {
        ...mapState(["project"]),
        projectId() {
            return this.project.projectId;
        },
        calculateWidth: function () {
            let count = this.searchTreeDataLevel(
                this.configChildDataSetTableData
            );
            let width = count * 10 + 30 + "px";
            return width;
        },
    },
    watch: {},
    created() {},
    mounted() {
        this.getAllDataSet(); //获取某个分组下的数据集集合(不分页)
    },
    methods: {
        // 加载数据
        loadData(row) {
            //this.clearData();
            this.rowVal = row;
            this.queryMainDataSetDetail(); //获取主数据集和明细数据
            this.initData();
            this.dialogParams.visible = true;
            this.dialogParams.title = `配置（${row.name}）的子数据集`;
        },
        clearData() {
            this.rowVal = null;
            this.configChildDataSetTableData = [];
        },
        // 初始化数据 用于回显数据
        initData() {
            let id = this.rowVal.dataSetBaseId;
            this.configChildDataSetTableData = [];
            queryMainAndSubset(id).then((res) => {
                if (res.code === 200) {
                    let data = res.data;
                    if (data && data.length > 0) {
                        this.setTreeData(data);
                    } else {
                        this.configChildDataSetTableData = [];
                    }
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        setTreeData(data) {
            data.forEach((item) => {
                let subId = "";
                this.subSetOptions.forEach((subItem) => {
                    if (subItem.dataSetBaseId == item.id) {
                        subId = subItem.dataSetBaseId;
                    }
                });
                queryDataSetDetail(subId).then((res) => {
                    //console.log("setTreeData -> res", res);
                    if (res.code === 200) {
                        let subSetFieldOptions = res.data.datasetDetailList;
                        let id = uuidv1();
                        let obj = {
                            id: id,
                            rowType: "1",
                            subDatasetId: item.id,
                            subDataSetName: item.name,
                            isAllowedAdd: true,
                            isDisabled: false,
                            children: [],
                        };
                        if (
                            item.masterSubColumnDetailList &&
                            item.masterSubColumnDetailList.length > 0
                        ) {
                            item.masterSubColumnDetailList.forEach(
                                (childItem) => {
                                    let id = uuidv1();
                                    let childObj = {
                                        id: id,
                                        rowType: "2",
                                        subDatasetId: item.id,
                                        subDataSetName: item.name,
                                        isAllowedAdd: false,
                                        mainSetFieldName:
                                            childItem.masterColumn.id,
                                        subSetFieldName: childItem.subColumn.id,
                                        subSetFieldOptions: subSetFieldOptions,
                                    };
                                    obj.children.push(childObj);
                                }
                            );
                        }
                        this.configChildDataSetTableData.push(obj);
                        this.isAllowSubDatasetChange(
                            this.configChildDataSetTableData
                        );
                    } else {
                        this.$message.error(res.message);
                    }
                });
            });
        },
        // 获取某个分组下的数据集集合(不分页)
        getAllDataSet() {
            let params = {};
            //console.log(this.projectId);
            queryAllDataSet(params, this.projectId).then((res) => {
                //console.log("getAllDataSet -> res", res);
                if (res.code === 200) {
                    this.subSetOptions = res.data;
                } else if (res.code === 505) {
                    this.subSetOptions = [];
                }
            });
        },
        // 获取主数据集和明细数据
        queryMainDataSetDetail() {
            let id = this.rowVal.dataSetBaseId;
            queryDataSetDetail(id).then((res) => {
                //console.log("queryMainDataSetDetail -> res", res);
                if (res.code === 200) {
                    this.mainSetFieldOptions = res.data.datasetDetailList;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        subDataSetChange(val, row) {
            this.subSetOptions.forEach((item) => {
                if (item.dataSetBaseId == val) {
                    this.$set(row, "subDataSetName", item.name);
                    if (row.children && row.children.length > 0) {
                        row.children.forEach((childItem) => {
                            this.$set(
                                childItem,
                                "subDatasetId",
                                item.dataSetBaseId
                            );
                            this.$set(childItem, "subDataSetName", item.name);
                        });
                    }
                }
            });
        },
        // 新增子集
        addTableData() {
            // let toggle = this.verifyRowData();
            let toggle = true;
            if (toggle) {
                let id = uuidv1();
                let obj = {
                    id: id,
                    rowType: "1",
                    subDatasetId: "",
                    subDataSetName: "",
                    isAllowedAdd: true,
                    isDisabled: false,
                    children: [],
                };
                this.configChildDataSetTableData.push(obj);
            }
        },
        // 删除
        delOutputData(val, treeData) {
            treeData.forEach((item, i) => {
                if (item.id === val.id) {
                    treeData.splice(i, 1);
                    return false;
                }
                if (item.children && item.children.length > 0) {
                    this.delOutputData(val, item.children);
                }
            });
            this.isAllowSubDatasetChange(this.configChildDataSetTableData);
        },
        // 子集新增
        addChildRow(val) {
            if (val.subDatasetId == "") {
                this.$message.warning("请选择子集！");
                return false;
            }
            let toggle = this.verifyRowData(val);
            if (toggle) {
                let subId = "";
                this.subSetOptions.forEach((item) => {
                    if (item.dataSetBaseId == val.subDatasetId) {
                        subId = item.dataSetBaseId;
                    }
                });
                queryDataSetDetail(subId).then((res) => {
                    //console.log("addChildRow -> res", res);
                    if (res.code === 200) {
                        let subSetFieldOptions = res.data.datasetDetailList;
                        let id = uuidv1();
                        let inputObj = {
                            id: id,
                            rowType: "2",
                            subDatasetId: val.subDataSetName,
                            subDataSetName: val.subDataSetName,
                            isAllowedAdd: false,
                            mainSetFieldName: "",
                            subSetFieldName: "",
                            subSetFieldOptions: subSetFieldOptions,
                        };
                        val.children.push(inputObj);
                        this.isAllowSubDatasetChange(
                            this.configChildDataSetTableData
                        );
                    } else {
                        this.$message.error(res.message);
                    }
                });
            } else {
                this.$message.warning("请先将数据填写完整！");
                return false;
            }
        },
        // 校验
        verifyRowData(val) {
            let toggle = true;
            if (val.children && val.children.length > 0) {
                val.children.forEach((item) => {
                    if (
                        item.mainSetFieldName == "" ||
                        item.subSetFieldName == ""
                    ) {
                        toggle = false;
                    }
                });
            }
            return toggle;
        },
        assemblyTreeData(treeData) {
            treeData.forEach((item) => {
                if (item.rowType == "1") {
                    let obj = {
                        subDatasetId: item.subDatasetId,
                        subSaveVOList: [],
                    };
                    if (item.children && item.children.length > 0) {
                        this.assemblyTreeData(item.children);
                    }
                } else if (item.rowType == "2") {
                    let info = {
                        masterDatasetColId: item.mainSetFieldName,
                        subDatasetColId: item.subSetFieldName,
                    };
                }
            });
        },
        isAllowSubDatasetChange(treeData) {
            treeData.forEach((item) => {
                if (item.children && item.children.length > 0) {
                    this.$set(item, "isDisabled", true);
                } else {
                    this.$set(item, "isDisabled", false);
                }
            });
        },
        // 保存
        saveDataSubSet() {
            //console.log("saveDataSubSet -> this.rowVal", this.rowVal)
            let masterDatasetId = this.rowVal.dataSetBaseId;
            let subSaveVOList = [];
            this.configChildDataSetTableData.forEach((item) => {
                let obj = {
                    subDatasetId: item.subDatasetId,
                    datasetMasterSubColumnIdList: [],
                };
                if (item.children && item.children.length > 0) {
                    item.children.forEach((childItem) => {
                        let childObj = {
                            masterDatasetColId: childItem.mainSetFieldName,
                            subDatasetColId: childItem.subSetFieldName,
                        };
                        obj.datasetMasterSubColumnIdList.push(childObj);
                    });
                }
                subSaveVOList.push(obj);
            });
            let params = {
                masterDatasetId: masterDatasetId,
                subSaveVOList: subSaveVOList,
            };
            editMainAndSubset(params)
                .then((res) => {
                    console.log("saveDataSubSet -> res", res);
                    if (res.code === 200) {
                        this.$message.success("保存成功！");
                        this.cancle();
                        this.$emit("refreshData");
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch((err) => {
                    //.catch可写，可不写，不写控制台有默认的输出报错
                    console.error(err);
                });
        },
        cancle() {
            this.clearData();
            this.dialogParams.visible = false;
        },
        searchTreeDataLevel(treeData) {
            let floor = 0;
            let max = 0;
            function each(data, floor) {
                data.forEach((e) => {
                    e.floor = floor;
                    if (floor > max) {
                        max = floor;
                    }
                    if (e.children && e.children.length > 0) {
                        each(e.children, floor + 1);
                    }
                });
            }
            each(treeData, 1);
            return max;
        },
    },
};
</script>
<style lang="scss" scoped>
.set-child-data-dialog-wrapper {
    .set-child-data-content {
        .title-box {
            display: flex;
            align-items: center;
            padding: 10px 25px 10px 30px;
            height: 32px;
            line-height: 32px;
            .title {
                display: flex;
                align-items: center;
                .line {
                    display: inline-block;
                    height: 12px;
                    border: 1px solid #2172c8;
                    margin-right: 5px;
                }
            }
            .add-icon {
                margin-left: auto;
                width: 32px;
                height: 32px;
                cursor: pointer;
                background: url("../../../assets/image/table_add_btn_big.png")
                    no-repeat;
                background-size: 100% 100%;
            }
            .fold-box {
                margin-left: auto;
                span {
                    cursor: pointer;
                }
            }
        }
        .tree-table-box {
            .opt-col {
                display: flex;
                align-items: center;
                justify-content: center;
                .add-btn {
                    display: inline-block;
                    width: 13px;
                    height: 13px;
                    cursor: pointer;
                    background: url("../../../assets/image/table_add_btn.png")
                        no-repeat;
                    background-size: 100% 100%;
                    margin-right: 5px;
                }
                .txt-btn {
                    display: inline-block;
                    width: 13px;
                    height: 13px;
                    cursor: pointer;
                    background: url("../../../assets/image/table_del_btn.png")
                        no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
    .dialog-footer {
        .primary-button {
            color: #fff !important;
            background-image: linear-gradient(0deg, #2273c9 0%, #2f7fd7 100%),
                linear-gradient(#58cdab, #58cdab) !important;
            background-blend-mode: normal, normal !important;
            box-shadow: inset 0px 1px 4px 0px rgba(255, 255, 255, 0.64) !important;
            border-radius: 2px !important;
            border: solid 1px #468cdc !important;
        }

        .primary-button:hover {
            color: #fff !important;
            background-image: linear-gradient(0deg, #2273c9 0%, #468cdc 100%),
                linear-gradient(#58cdab, #58cdab) !important;
            background-blend-mode: normal, normal !important;
            box-shadow: inset 0px 1px 4px 0px rgba(255, 255, 255, 0.64) !important;
            border-radius: 2px !important;
            border: solid 1px #468cdc !important;
        }

        .info-button {
            color: #fff !important;
            background-image: linear-gradient(0deg, #808ca6 0%, #9ca7bd 100%),
                linear-gradient(#58cdab, #58cdab) !important;
            background-blend-mode: normal, normal !important;
            box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.64) !important;
            border-radius: 2px !important;
            border: solid 1px #939cae !important;
            font-family: "Microsoft YaHei";
        }

        .info-button:hover {
            color: #fff !important;
            background-image: linear-gradient(0deg, #808ca6 0%, #939cae 100%),
                linear-gradient(#58cdab, #58cdab) !important;
            background-blend-mode: normal, normal !important;
            box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.64) !important;
            border-radius: 2px !important;
            border: solid 1px #939cae !important;
        }
    }
}
</style>
<style lang="scss">
.datasource-api-dialog-wrapper {
    .tree-table-box {
        .el-table__body-wrapper {
            height: calc(100% - 40px) !important;
            .el-table__body td,
            .el-table__body th {
                padding: 2px 0;
            }
            .el-input__inner {
                height: 32px;
                line-height: 32px;
            }
        }
    }
}
</style>
