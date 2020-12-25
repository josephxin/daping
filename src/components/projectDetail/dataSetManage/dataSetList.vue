<template>
    <div class="data-set-list">
        <PaginationTable
            ref="dataTransferTaskLogTable"
            :tableData="dataSetListTableData"
            :changePageSize="changePageSize"
            :changeCurrentPage="changeCurrentPage"
        >
            <span slot="condition-slot" class="condition-filter">
                <el-input
                    v-model.trim="search.name"
                    placeholder="数据集名称"
                    style="width: 260px"
                ></el-input>
                <span class="opt-wrap">
                    <QueryBtn @handleClick="doSearch"></QueryBtn>
                    <ReSetBtn
                        style="margin-left: 10px"
                        @handleClick="resetForm"
                    ></ReSetBtn>
                </span>
            </span>
            <template slot="add-opt-slot">
                <PlusBtn @handleClick="handleAddForm"></PlusBtn>
            </template>
            <template slot="table-opt-slot">
                <BatchDelBtn @handleClick="handleDeleteAll"></BatchDelBtn>
            </template>
            <template slot="table-column-slot" class="data-table">
                <el-table-column
                    prop="name"
                    label="数据集名称"
                ></el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    :formatter="dateFormatter"
                ></el-table-column>
                <el-table-column
                    prop="pageCount"
                    label="页面引用次数"
                ></el-table-column>
                <el-table-column align="center" label="操作" width="200">
                    <template slot-scope="scope">
                        <span
                            class="row-opt"
                            @click="handleEdit(scope.$index, scope.row)"
                            >编辑</span
                        >
                        <span
                            class="row-opt"
                            @click="handleDelete(scope.$index, scope.row)"
                            >删除</span
                        >
                        <span
                            class="row-opt"
                            @click="setChildData(scope.$index, scope.row)"
                            >配置子数据集</span
                        >
                    </template>
                </el-table-column>
            </template>
        </PaginationTable>
        <AddDataSetDialog
            ref="addDataSetDialog"
            :dialogParams="dataSetDialogParams"
            @refreshData="queryTableData()"
        >
        </AddDataSetDialog>
        <SetChildDataDialog
            ref="setChildDataDialog"
            :dialogParams="setChildDataDialogParams"
            @refreshData="queryTableData(false)"
        ></SetChildDataDialog>
    </div>
</template>

<script>
import api from "@/api/project";
import {
    queryDatasetOperationTypes,
    queryDataSetList,
    batchDelDataSetData,
    delDataSetData,
} from "@/api/dataSetManageServe";
import util from "@/util/util";
import { mapState, mapActions } from "vuex";
import router from "@/router/router";
import PaginationTable from "@/components/table/PaginationTable";
import QueryBtn from "@/components/button/QueryBtn";
import ReSetBtn from "@/components/button/ReSetBtn";
import PlusBtn from "@/components/button/PlusBtn";
import BatchDelBtn from "@/components/button/BatchDelBtn";
import AddDataSetDialog from "./addDataSetDialog";
import SetChildDataDialog from "./setChildDataDialog";

export default {
    name: "dataSetList",
    components: {
        PaginationTable,
        QueryBtn,
        ReSetBtn,
        PlusBtn,
        BatchDelBtn,
        AddDataSetDialog,
        SetChildDataDialog,
    },
    inject: ["projectDetail"],
    data() {
        return {
            search: {
                name: "",
            },
            dataSetTypeOption: [],
            dataSetListTableData: {
                noSelection: false, // 不需要选择时设置为true
                // 表格加载等待
                loading: {
                    status: false,
                    text: "加载中..",
                },
                data: [], // 表格数据
                selectedRows: [], // 表格选中的数据
                // 分页数据
                pagingData: {
                    noPaging: false, // 不需要分页时设置为true
                    currentPage: 1,
                    pageSize: 10,
                    pageList: [10, 20, 30, 50, 100],
                    total: 0,
                    totalPage: 0,
                },
                style: {
                    // 表格最大高度
                    maxTableHeight: 480,
                },
            },
            dataSetDialogParams: {
                visible: false,
                width: "700px",
                title: "新增",
            },
            setChildDataDialogParams: {
                visible: false,
                width: "700px",
                title: "配置子数据集",
            },
        };
    },
    computed: {
        ...mapState(["project"]),
    },
    watch: {},
    created() {},
    mounted() {
        this.getOperationTypesOptions();
        this.queryTableData(true);
    },
    updated() {},
    beforeDestroy() {},
    methods: {
        // 日期格式化
        dateFormatter(row, column) {
            let datetime = row.updateTime;
            if (datetime) {
                var dateee = new Date(datetime).toJSON();
                return new Date(+new Date(dateee) + 8 * 3600 * 1000)
                    .toISOString()
                    .replace(/T/g, " ")
                    .replace(/\.[\d]{3}Z/, "");
            }
            return "";
        },
        getOperationTypesOptions() {
            queryDatasetOperationTypes().then((res) => {
                if (res.code === 200) {
                    this.dataSetTypeOption = res.data;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        queryTableData(init) {
            if (init) {
                this.dataSetListTableData.pagingData.currentPage = 1;
            }
            let params = {
                projectId: this.projectDetail.projectId,
                name: this.search.name,
                pageNum: this.dataSetListTableData.pagingData.currentPage,
                pageSize: this.dataSetListTableData.pagingData.pageSize,
            };
            let loading = this.$loading({
                lock: true,
                text: "加载中...",
                background: "rgba(0, 0, 0, 0.5)",
            });
            api.getDataSetList(params).then((res) => {
                console.log("queryTableData -> res", res);
                loading.close();
                if (res.code === 200) {
                    let data = res.data;
                    if (data && data.constructor == Object) {
                        this.dataSetListTableData.data = data.records;
                        this.dataSetListTableData.pagingData.total = data.total;
                        this.dataSetListTableData.pagingData.totalPage = data.pages;
                    }
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        changePageSize(pageSize) {
            this.dataSetListTableData.pagingData.pageSize = pageSize;
            this.queryTableData(true);
        },
        changeCurrentPage(page) {
            this.dataSetListTableData.pagingData.currentPage = page;
            this.queryTableData();
        },
        // 搜索
        doSearch() {
            this.queryTableData(true);
        },
        // 重置表单
        resetForm() {
            this.search.name = "";
            this.queryTableData(true);
        },
        // 新增
        handleAddForm() {
            this.$refs.addDataSetDialog.loadData(0);
        },
        // 编辑
        handleEdit(index, row) {
            this.$refs.addDataSetDialog.loadData(1, row);
        },
        // 删除
        handleDelete(index, row) {
            console.log(row);
            this.$confirm("您确定要将此数据删除吗？", "温馨提示", {
                confirmButtonText: "继续删除",
                cancelButtonText: "取消删除",
                type: "warning",
                center: true,
            })
                .then((res) => {
                    const loading = this.$loading({
                        lock: true,
                        text: "文件删除中，请耐心等候",
                        spinner: "el-icon-loading",
                        background: "rgba(255, 255, 255, 0.7)",
                    });
                    api.deleteDataSet(row.id).then((res) => {
                        console.log("handleDelete -> res", res);
                        loading.close();
                        if (res.code === 200 && res.data) {
                            this.$message.success(`删除成功`);
                            this.queryTableData(true);
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                })
                .catch(() => {});
        },
        // 批量删除
        handleDeleteAll() {
            let selectRows = this.dataSetListTableData.selectedRows;
            //console.log(selectRows);
            let ids = selectRows.map((item) => {
                return item.id;
            });
            //console.log("handleDeleteAll -> ids", ids);
            this.onDelete(ids);
        },
        onDelete(ids) {
            if (ids.length === 0) {
                this.$alert(
                    "您需要先选择至少一个文件后才可以执行删除操作！",
                    "温馨提示",
                    { confirmButtonText: "确定" }
                );
                return;
            }
            this.$confirm(
                "文件将被删除，不会影响数据库中的文件及其数据。",
                "温馨提示",
                {
                    confirmButtonText: "继续删除",
                    cancelButtonText: "取消删除",
                    type: "warning",
                    center: true,
                }
            )
                .then((res) => {
                    const loading = this.$loading({
                        lock: true,
                        text: "文件删除中，请耐心等候",
                        spinner: "el-icon-loading",
                        background: "rgba(255, 255, 255, 0.7)",
                    });
                    api.batchDeleteDataSet(ids).then((res) => {
                        console.log("onDelete -> res", res);
                        loading.close();
                        if (res.code === 200 && res.data) {
                            this.$message.success(`删除成功`);
                            this.queryTableData(true);
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                })
                .catch(() => {});
        },
        // 配置子数据集
        setChildData(index, row) {
            this.$refs.setChildDataDialog.loadData(row);
        },
    },
};
</script>

<style lang="scss">
.data-set-list {
    .condition-filter {
        display: flex;
        .opt-wrap {
            margin-left: 40px;
            display: flex;
        }
    }

    .data-table {
        .row-opt {
            cursor: pointer;
            margin: 0 5px;
            color: #049afd;
        }
    }
    .table-box table tr th:nth-child(1),
    .table-box table tr td:nth-child(1) {
        text-align: left;
    }
}
</style>
