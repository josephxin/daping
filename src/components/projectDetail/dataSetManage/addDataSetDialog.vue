<template>
    <div class="add-data-set-dialog-wrapper">
        <CommonDialog
            :visible="dialogParams.visible"
            :width="dialogParams.width"
            :closeOnClickModal="false"
            :showClose="false"
            :title="dialogParams.title"
        >
            <div slot="dialog-content" class="dialog-content">
                <el-form
                    label-width="120px"
                    :model="formData"
                    ref="dataSetForm"
                    :rules="rules"
                    :validate-on-rule-change="false"
                    size="mini"
                    class="data-set-form"
                >
                    <el-form-item
                        class="form-item"
                        label="数据集名称"
                        prop="dataSetName"
                    >
                        <el-input
                            class="form-input"
                            v-model="formData.dataSetName"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        class="form-item"
                        label="数据来源"
                        prop="type"
                    >
                        <el-radio-group
                            v-model="formData.type"
                            @change="sourceTypeChange"
                        >
                            <el-radio
                                v-for="(item, i) in sourceTypeOption"
                                :key="i"
                                :label="item.code"
                                >{{ item.name }}</el-radio
                            >
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        class="form-item"
                        label="数据源"
                        prop="dataSource"
                    >
                        <el-select
                            class="form-select"
                            v-model="formData.dataSource"
                            placeholder="请选择"
                            clearable
                            @change="dataSourceChange"
                        >
                            <el-option
                                v-for="(item, i) in dataSourceOption"
                                :key="i"
                                :label="item.dbname"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        v-if="formData.type == 1"
                        class="form-item"
                        label="选择数据库表"
                        prop="dataTable"
                    >
                        <el-select
                            class="form-select"
                            v-model="formData.dataTable"
                            placeholder="请选择"
                            clearable
                            @change="dataTableChange"
                        >
                            <el-option
                                v-for="(item, i) in dataTableOption"
                                :key="i"
                                :label="item.tableName"
                                :value="item.tableName"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        v-if="formData.type == 2"
                        class="form-item"
                        label="查询SQL"
                        prop="SQLText"
                    >
                        <div class="sql-query">
                            <div class="query-value">
                                <SqlEditor
                                    ref="sqleditor"
                                    :value="formData.SQLText"
                                    @changeTextarea="changeTextarea($event)"
                                />
                            </div>
                            <div class="query-button">
                                <el-button
                                    @click="querySqlTableColumns()"
                                    size="small"
                                    class="query-btn"
                                ></el-button>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
                <div class="table-box">
                    <el-table
                        :height="paramsDataTableHeight"
                        stripe
                        :data="tableColumnsDataList"
                        border
                    >
                        <el-table-column
                            prop="columnName"
                            label="字段名称"
                            width="150"
                        ></el-table-column>
                        <el-table-column label="字段类型">
                            <template slot-scope="scope">
                                <el-select
                                    class="form-input"
                                    v-model="scope.row.columnType"
                                    clearable
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="optionItem in fieldTypeOption"
                                        :key="optionItem.code"
                                        :label="optionItem.name"
                                        :value="optionItem.code"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="维度/指标">
                            <template slot-scope="scope">
                                <el-select
                                    class="form-input"
                                    v-model="scope.row.columnDefDire"
                                    clearable
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="optionItem in columnDefDireOption"
                                        :key="optionItem.code"
                                        :label="optionItem.name"
                                        :value="optionItem.code"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="展示类型">
                            <template slot-scope="scope">
                                <el-select
                                    class="form-input"
                                    v-model="scope.row.columnBusinessType"
                                    clearable
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="optionItem in businessTypeOption"
                                        :key="optionItem.code"
                                        :label="optionItem.name"
                                        :value="optionItem.code"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="字段描述">
                            <template slot-scope="scope">
                                <el-input
                                    class="form-input"
                                    v-model="scope.row.columnDesc"
                                    placeholder="请输入内容"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="80"
                            align="center"
                            label="是否主键"
                        >
                            <template slot-scope="scope">
                                <el-checkbox
                                    v-model="scope.row.pk"
                                ></el-checkbox>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="dialog-footer" class="dialog-footer">
                <el-button class="primary-button" @click="onSaveForm"
                    >保存</el-button
                >
                <el-button class="info-button" @click="onBack">取消</el-button>
            </div>
        </CommonDialog>
    </div>
</template>
<script>
import CommonDialog from "@/components/dialog/common-dialog";
import SqlEditor from "@/components/SQLEditor/frame";
import api from "@/api/project";
import {
    queryDatasetOperationTypes,
    querySourceTypes,
    queryDataSource,
    queryDataSourceTables,
    queryAnalysisSqlTableColumns,
    queryDataFormatList,
    queryDataSetTableColumns,
    editDataSet,
    addDataSet,
    queryBusType,
    queryDefDire,
} from "@/api/dataSetManageServe";
export default {
    name: "projects-create",
    props: {
        dialogParams: {
            type: Object,
            default() {
                return {
                    visible: false,
                    width: "400px",
                    title: "编辑",
                };
            },
        },
    },
    components: {
        CommonDialog,
        SqlEditor,
    },
    inject: ["projectDetail"],
    data() {
        return {
            type: 0, //0:新增；1:编辑
            dataSetMsg: null,
            sourceTypeOption: [], //数据源类型
            dataSourceOption: [], //数据源
            dataTableOption: [], //数据库表
            fieldTypeOption: [], //表格字段类型下拉
            columnDefDireOption: [], //表格维度/指标下拉
            businessTypeOption: [], //表格展示类型下拉
            formData: {
                dataSetName: "", //数据集名称
                type: 1, //数据源类型
                dataSource: "", //数据源id
                dataTable: "", //数据表id
                SQLText: "", //查询SQL富文本
            },
            rules: {
                dataSetName: [
                    {
                        required: true,
                        message: "请填写数据集名称",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 50,
                        message: "长度在 1 到 50 个字符",
                        trigger: "blur",
                    },
                ],
                type: [
                    {
                        required: true,
                        message: "请选择数据源类型",
                        trigger: "change",
                    },
                ],
                dataSource: [
                    {
                        required: true,
                        message: "请选择数据源",
                        trigger: "change",
                    },
                ],
                dataTable: [
                    {
                        required: true,
                        message: "请选择数据库表",
                        trigger: "change",
                    },
                ],
                SQLText: [
                    {
                        required: true,
                        message: "请填写SQL语句",
                        trigger: "blur",
                    },
                ],
            },
            tableColumnsDataList: [],
        };
    },
    computed: {
        paramsDataTableHeight: function () {
            let tableHeight =
                this.tableColumnsDataList.length <= 2 ? "115px" : "255px";
            return tableHeight;
        },
    },
    created() {},
    mounted() {
        this.getSourceTypesOptions(); //获取数据源类型
        this.getDataSourceOptions(); //获取数据源
        this.getDataFormatList(); //获取字段类型下拉
        this.getBusTypeOptions(); //获取表格展示类型下拉
        this.getDefDireOptions(); //获取表格维度/指标下拉
    },
    methods: {
        loadData(type, row) {
            this.type = type;
            if (type == 1) {
                this.dialogParams.title = "编辑";
                this.dataSetMsg = row;
                this.getDataSetDetail();
            } else if (type == 0) {
                this.dialogParams.title = "新增";
            }
            this.dialogParams.visible = true;
        },
        getDataSetDetail() {
            let id = this.dataSetMsg.id;
            api.getDataSetDetail(id).then((res) => {
                console.log("getDataSetDetail -> res", res);
                if (res.code === 200) {
                    let data = res.data;
                    if (data.constructor == Object) {
                        this.tableColumnsDataList = data.datasetDetailList;
                        this.formData.dataSetName = data.name;
                        this.formData.dataSource = data.datasourceId;
                        this.formData.type = data.sourceType;
                        if (data.sourceType == 1) {
                            this.formData.dataTable = data.sourceDesc;
                        } else if (data.sourceType == 2) {
                            this.formData.SQLText = data.sourceDesc;
                        }
                        this.getDataSourceTablesOptions(); //获取数据库表
                    }
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        clearData() {
            this.type = 0;
            this.dataSetMsg = null;
            this.formData = {
                dataSetName: "",
                type: 1,
                dataSource: "",
                dataTable: "",
                SQLText: "",
            };
            this.tableColumnsDataList = [];
        },
        // 获取字段类型下拉
        getDataFormatList() {
            this.fieldTypeOption = [];
            queryDataFormatList().then((res) => {
                if (res.code === 200) {
                    this.fieldTypeOption = res.data;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 获取表格维度/指标下拉
        getDefDireOptions() {
            this.columnDefDireOption = [];
            queryDefDire().then((res) => {
                if (res.code === 200) {
                    this.columnDefDireOption = res.data;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 获取表格展示类型下拉
        getBusTypeOptions() {
            this.businessTypeOption = [];
            queryBusType().then((res) => {
                if (res.code === 200) {
                    this.businessTypeOption = res.data;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 获取数据源类型
        getSourceTypesOptions() {
            this.sourceTypeOption = [];
            querySourceTypes().then((res) => {
                if (res.code === 200) {
                    this.sourceTypeOption = res.data;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 数据来源改变
        sourceTypeChange(val) {
            this.formData.dataTable = "";
            this.formData.SQLText = "";
            this.tableColumnsDataList = [];
        },
        // 获取数据源
        getDataSourceOptions() {
            this.dataSourceOption = [];
            queryDataSource().then((res) => {
                if (res.code === 200) {
                    this.dataSourceOption = res.data;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 数据源改变
        dataSourceChange(val) {
            this.formData.dataTable = "";
            this.tableColumnsDataList = [];
            this.getDataSourceTablesOptions();
        },
        // 获取数据库表
        getDataSourceTablesOptions() {
            let dataSourceId = this.formData.dataSource;
            this.dataTableOption = [];
            queryDataSourceTables(dataSourceId).then((res) => {
                if (res.code === 200) {
                    this.dataTableOption = res.data;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 数据库表改变
        dataTableChange(val) {
            this.queryDataSetTableColumns();
        },
        // 查询表字段
        queryDataSetTableColumns() {
            let dataSourceId = this.formData.dataSource;
            let tableCode = this.formData.dataTable;
            this.tableColumnsDataList = [];
            queryDataSetTableColumns(dataSourceId, tableCode).then((res) => {
                if (res.code === 200) {
                    let result = res.data;
                    if (result && Array.isArray(result)) {
                        result.forEach((item) => {
                            this.$set(item, "columnBusinessType", "1");
                            this.$set(item, "columnDefDire", 1);
                        });
                        this.tableColumnsDataList = result;
                    } else {
                        this.$message.error('暂无数据！');
                    }
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        //查询SQL
        querySqlTableColumns() {
            let dataSourceId = this.formData.dataSource;
            let params = {
                sql: this.formData.SQLText,
            };
            queryAnalysisSqlTableColumns(dataSourceId, params).then((res) => {
                if (res.code === 200) {
                    let result = res.data;
                    result.forEach((item) => {
                        this.$set(item, "columnBusinessType", "1");
                        this.$set(item, "columnDefDire", 1);
                    });
                    this.tableColumnsDataList = result;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        //查询SQL-富文本编辑器内容发生改变
        changeTextarea(val) {
            this.formData.SQLText = val;
        },
        // 点击保存按钮
        onSaveForm() {
            this.$refs["dataSetForm"].validate((valid) => {
                if (valid) {
                    if (this.type == 0) {
                        this.doAddSave();
                    } else if (this.type == 1) {
                        this.doEditSave();
                    }
                }
            });
        },
        doAddSave() {
            let sourceDesc = "";
            if (this.formData.type == 1) {
                sourceDesc = this.formData.dataTable;
            } else if (this.formData.type == 2) {
                sourceDesc = this.formData.SQLText;
            }
            let params = {
                datasetDetailList: this.tableColumnsDataList, //数据集明细列表
                datasourceId: this.formData.dataSource, //数据源ID
                name: this.formData.dataSetName, //数据集名称
                operationType: "1", //操作类型，1：只读 ，2：读写
                sourceDesc: sourceDesc, //数据集内容，可以是单表、sql、excel名、api地址
                sourceType: this.formData.type, //数据来源，1：单表，2：sql，3：excel，4：api
            };
            const loading = this.$loading({
                lock: true,
                text: "进行中，请耐心等候",
                spinner: "el-icon-loading",
                background: "rgba(255, 255, 255, 0.7)",
            });
            //console.log(this.projectDetail.projectId);
            api.saveDataSet(this.projectDetail.projectId, params)
                .then((res) => {
                    //console.log("doAddSave -> res", res);
                    loading.close();
                    if (res.code === 200 && res.data) {
                        this.$message.success(`新增成功`);
                        this.onBack();
                        this.$emit("refreshData", true);
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch((err) => {
                    loading.close();
                    console.error(err);
                });
        },
        doEditSave() {
            let sourceDesc = "";
            let id = this.dataSetMsg.id;
            if (this.formData.type == 1) {
                sourceDesc = this.formData.dataTable;
            } else if (this.formData.type == 2) {
                sourceDesc = this.formData.SQLText;
            }
            let params = {
                datasetDetailList: this.tableColumnsDataList,
                datasourceId: this.formData.dataSource,
                name: this.formData.dataSetName,
                operationType: "1", //操作类型，1：只读 ，2：读写
                sourceDesc: sourceDesc,
                sourceType: this.formData.type,
            };
            const loading = this.$loading({
                lock: true,
                text: "进行中，请耐心等候",
                spinner: "el-icon-loading",
                background: "rgba(255, 255, 255, 0.7)",
            });
            api.updateDataSet(id, params)
                .then((res) => {
                    //console.log("doEditSave -> res", res);
                    loading.close();
                    if (res.code === 200 && res.data) {
                        this.$message.success(`修改成功`);
                        this.onBack();
                        this.$emit("refreshData", false); //修改数据集不刷新数据集列表
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch((err) => {
                    loading.close();
                    console.error(err);
                });
        },
        //点击取消按钮
        onBack() {
            this.clearData();
            this.$refs["dataSetForm"].resetFields();
            this.dialogParams.visible = false;
        },
    },
};
</script>
<style lang="stylus" scoped>
.add-data-set-dialog-wrapper {
    .data-set-form {
        .form-item {
            .form-input, .form-select {
                width: 260px;
            }
        }

        .sql-query {
            display: flex;
            align-items: center;
            flex-direction: row;

            .query-button {
                width: 80px;
                padding-left: 15px;

                .query-btn {
                    background-image: url('../../../assets/image/query-btn.png');
                    width: 73px;
                    height: 69px;
                }
            }

            .query-value {
                width: 455px;
                height: 100%;

                .form-input {
                    width: 97%;
                }
            }
        }
    }

    .dialog-footer {
        .primary-button {
            color: #fff !important;
            background-image: linear-gradient(0deg, #2273c9 0%, #2f7fd7 100%), linear-gradient(#58cdab, #58cdab) !important;
            background-blend-mode: normal, normal !important;
            box-shadow: inset 0px 1px 4px 0px rgba(255, 255, 255, 0.64) !important;
            border-radius: 2px !important;
            border: solid 1px #468cdc !important;
        }

        .primary-button:hover {
            color: #fff !important;
            background-image: linear-gradient(0deg, #2273c9 0%, #468cdc 100%), linear-gradient(#58cdab, #58cdab) !important;
            background-blend-mode: normal, normal !important;
            box-shadow: inset 0px 1px 4px 0px rgba(255, 255, 255, 0.64) !important;
            border-radius: 2px !important;
            border: solid 1px #468cdc !important;
        }

        .info-button {
            color: #fff !important;
            background-image: linear-gradient(0deg, #808ca6 0%, #9ca7bd 100%), linear-gradient(#58cdab, #58cdab) !important;
            background-blend-mode: normal, normal !important;
            box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.64) !important;
            border-radius: 2px !important;
            border: solid 1px #939cae !important;
            font-family: 'Microsoft YaHei';
        }

        .info-button:hover {
            color: #fff !important;
            background-image: linear-gradient(0deg, #808ca6 0%, #939cae 100%), linear-gradient(#58cdab, #58cdab) !important;
            background-blend-mode: normal, normal !important;
            box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.64) !important;
            border-radius: 2px !important;
            border: solid 1px #939cae !important;
        }
    }
}
</style>
