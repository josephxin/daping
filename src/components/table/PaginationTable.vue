<template>
    <div class="pagination-table">
        <div v-if="showFilterConditionBar" class="filter-condition-bar">
            <div class="condition-wrap">
                <slot name="condition-slot"></slot>
            </div>
            <div class="add-opt">
                <slot name="add-opt-slot"></slot>
            </div>
        </div>
        <div v-if="showTableOptToolBar" class="table-opt-tool-bar">
            <div class="table-opt-bar">
                <div class="table-opt">
                    <slot name="table-opt-slot"></slot>
                </div>
            </div>
            <div
                v-if="hasPaging && !tableData.pagingData.noTopPaging"
                class="paging-opt-wrap"
            >
                <template v-if="getPrePageDisableStatus">
                    <div class="paging-opt-disabled pre-btn-disabled">
                        上一页
                    </div>
                </template>
                <template v-else>
                    <div @click="toPrePage" class="paging-opt pre-btn">
                        上一页
                    </div>
                </template>
                <template v-if="getNextPageDisableStatus">
                    <div class="paging-opt-disabled next-btn-disabled">
                        下一页
                    </div>
                </template>
                <template v-else>
                    <div @click="toNextPage" class="paging-opt next-btn">
                        下一页
                    </div>
                </template>
            </div>
        </div>
        <div class="table-box">
            <el-table
                ref="paginationDataTable"
                border
                stripe
                class="data-table"
                :max-height="getTableMaxHeight"
                :data="tableData.data"
                @select="handleSelect"
                @select-all="handleSelectAll"
                @selection-change="handleSelectionChange"
                style="width: 100%"
            >
                <el-table-column
                    v-if="getCanSelection"
                    type="selection"
                    width="55"
                ></el-table-column>
                <slot name="table-column-slot"></slot>
                <el-table-column
                    v-if="noColumn"
                    label=""
                    prop=""
                ></el-table-column>
            </el-table>
        </div>
        <div
            v-if="hasPaging && tableData.pagingData.total > 0"
            class="bottom-tool-bar"
        >
            <div class="tool-bar-container">
                <div v-if="getCanSelection" class="bottom-checked-all">
                    <el-checkbox
                        @change="handleCheckAll"
                        v-model="bottomSelectAll"
                    ></el-checkbox>
                </div>
                <template v-if="hasPaging">
                    <div class="total-info">
                        共计{{ tableData.pagingData.total }}条
                    </div>
                    <div class="change-page">
                        <span
                            @click="toFirstPage"
                            :class="getToFirstPageClassName"
                        ></span>
                        <span
                            @click="toPrePage"
                            :class="getToPrePageClassName"
                        ></span>
                        <span class="page-info"
                            >{{ tableData.pagingData.currentPage }}/{{
                                tableData.pagingData.totalPage
                            }}</span
                        >
                        <span
                            @click="toNextPage"
                            :class="getToNextPageClassName"
                        ></span>
                        <span
                            @click="toEndPage"
                            :class="getToEndPageClassName"
                        ></span>
                    </div>
                    <el-pagination
                        popper-class="pagingtion-popper-select"
                        :background="true"
                        @size-change="handleSizeChange"
                        :current-page.sync="tableData.pagingData.currentPage"
                        :page-size="tableData.pagingData.pageSize"
                        layout="sizes, slot"
                        :total="tableData.pagingData.total"
                    >
                        <span class="jumper-input-wrap">
                            <el-input
                                class="jumper-input"
                                @keyup.native="validateNum($event)"
                                v-model.number="jumpNum"
                                @change="handleJumpPage"
                                placeholder
                            ></el-input
                            >页
                        </span>
                    </el-pagination>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PaginationTable",
    props: {
        tableData: {
            type: Object,
            default() {
                return {
                    noSelection: false,
                    // 表格加载等待
                    loading: {
                        status: false,
                        text: "加载中..",
                    },
                    data: [], // 表格数据
                    selectedRows: [], // 表格选中的数据
                    // 分页数据
                    pagingData: {
                        noPaging: false,
                        noTopPaging: false,
                        currentPage: 1,
                        pageSize: 10,
                        pageList: [10, 20, 30, 50, 100],
                        total: 0,
                        totalPage: 0,
                    },
                    style: {
                        maxTableHeight: 480,
                    },
                };
            },
        },
        changePageSize: {
            type: Function,
            default() {
                this.$message("请绑定 changePageSize 事件");
            },
        },
        changeCurrentPage: {
            type: Function,
            default() {
                this.$message("请绑定 changeCurrentPage 事件");
            },
        },
    },
    components: {},
    data() {
        return {
            jumpNum: 1,
            bottomSelectAll: false,
        };
    },
    computed: {
        noColumn() {
            let tableColumnSlot = this.$slots["table-column-slot"];
            return !tableColumnSlot;
        },
        hasPaging() {
            if (this.tableData.pagingData.noPaging) {
                return false;
            }
            return true;
        },
        getTableMaxHeight() {
            if (this.tableData.style && this.tableData.style.maxTableHeight) {
                return this.tableData.style.maxTableHeight;
            }
            return 480;
        },
        getDataLoadingStatus() {
            if (this.tableData.loading) {
                return this.tableData.loading.status;
            }
            return false;
        },
        getDataLoadingText() {
            if (this.tableData.loading && this.tableData.loading.text) {
                return this.tableData.loading.text;
            }
            return "加载中..";
        },
        getCanSelection() {
            if (this.tableData.noSelection) {
                return false;
            }
            return true;
        },
        showFilterConditionBar() {
            let conditionSlot = this.$slots["condition-slot"];
            let addOptSlot = this.$slots["add-opt-slot"];
            return conditionSlot || addOptSlot ? true : false;
        },
        showTableOptToolBar() {
            let tableOptSlot = this.$slots["table-opt-slot"];
            let show =
                tableOptSlot || !this.tableData.pagingData.noTopPaging
                    ? true
                    : false;
            return show;
        },
        getToFirstPageClassName() {
            if (this.tableData.pagingData.currentPage > 1) {
                return "img to-first-page";
            } else {
                return "img to-first-page-disable";
            }
        },
        getToPrePageClassName() {
            if (this.tableData.pagingData.currentPage > 1) {
                return "img to-pre-page";
            } else {
                return "img to-pre-page-disable";
            }
        },
        getToNextPageClassName() {
            if (
                this.tableData.pagingData.currentPage >=
                this.tableData.pagingData.totalPage
            ) {
                return "img to-next-page-disable";
            } else {
                return "img to-next-page";
            }
        },
        getToEndPageClassName() {
            if (
                this.tableData.pagingData.currentPage >=
                this.tableData.pagingData.totalPage
            ) {
                return "img to-end-page-disable";
            } else {
                return "img to-end-page";
            }
        },
        getPrePageDisableStatus() {
            if (this.tableData.pagingData.total === 0) {
                return true;
            }
            if (this.tableData.pagingData.currentPage === 1) {
                return true;
            }
            return false;
        },
        getNextPageDisableStatus() {
            if (this.tableData.pagingData.total === 0) {
                return true;
            }
            if (
                this.tableData.pagingData.currentPage ===
                this.tableData.pagingData.totalPage
            ) {
                return true;
            }
            return false;
        },
    },
    methods: {
        getSelectedRows() {
            return this.$refs.paginationDataTable.selection;
        },
        handleSelect(selection, row) {},
        handleSelectAll(selection) {},
        handleCheckAll(status) {
            let paginationDataTable = this.$refs.paginationDataTable;
            if (paginationDataTable) {
                paginationDataTable.clearSelection();
                if (this.bottomSelectAll) {
                    this.tableData.data.forEach((row) => {
                        paginationDataTable.toggleRowSelection(row);
                    });
                }
            }
        },
        handleSelectionChange(selection) {
            this.tableData.selectedRows = selection;
        },
        validateNum(e) {
            var keynum = window.event ? e.keyCode : e.which; //获取键盘码
            let isNum = false;
            if ((keynum > 47 && keynum < 58) || (keynum > 95 && keynum < 106)) {
                isNum = true;
            }
            if (!isNum) {
                e.target.value = "";
            }
        },
        getTotalPageNum() {
            if (this.tableData.pagingData.pageSize === 0) {
                this.tableData.pagingData.pageSize = 10;
            }
            this.tableData.pagingData.totalPage = Math.ceil(
                this.tableData.pagingData.total /
                    this.tableData.pagingData.pageSize
            );
            return this.tableData.pagingData.totalPage;
        },
        toFirstPage() {
            this.tableData.pagingData.currentPage = 1;
            this.jumpNum = this.tableData.pagingData.currentPage;
            this.changeCurrentPage(this.jumpNum);
        },
        toPrePage() {
            if (this.tableData.pagingData.currentPage <= 1) {
                this.tableData.pagingData.currentPage = 1;
                return;
            }
            this.tableData.pagingData.currentPage--;
            this.jumpNum = this.tableData.pagingData.currentPage;
            this.changeCurrentPage(this.jumpNum);
        },
        toNextPage() {
            if (
                this.tableData.pagingData.currentPage >=
                this.tableData.pagingData.totalPage
            ) {
                this.tableData.pagingData.currentPage = this.tableData.pagingData.totalPage;
                return;
            }
            this.tableData.pagingData.currentPage++;
            this.jumpNum = this.tableData.pagingData.currentPage;
            this.changeCurrentPage(this.jumpNum);
        },
        toEndPage() {
            this.tableData.pagingData.currentPage = this.tableData.pagingData.totalPage;
            this.jumpNum = this.tableData.pagingData.currentPage;
            this.changeCurrentPage(this.jumpNum);
        },
        handleSizeChange(pageSize) {
            this.changePageSize(pageSize);
        },
        handleJumpPage() {
            this.changeCurrentPage(this.jumpNum);
        },
    },
    created() {
        this.bottomSelectAll = false;
    },
    watch: {
        "tableData.selectedRows": function (selection) {
            if (selection && selection.length === this.tableData.data.length) {
                this.bottomSelectAll = true;
            } else {
                this.bottomSelectAll = false;
            }
        },
        "tableData.pagingData.total": function (val) {
            this.getTotalPageNum();
        },
        jumpNum: function (val) {
            if (!val) {
                return false;
            }
            // 判断输入的字符是否是数值
            let isNum = new RegExp("^[1-9][0-9]*$").test(val);
            if (!isNum) {
                return false;
            }

            if (val < 1 || val > this.tableData.pagingData.totalPage) {
                return false;
            }
        },
        "tableData.pagingData.currentPage": function (val) {
            this.jumpNum = val;
        },
    },
};
</script>

<style lang="stylus" scoped>
.pagination-table {
    width: 100%;
    background: #fff;

    .filter-condition-bar {
        background-color: #f8f8f8;
        display: flex;
        padding: 20px 40px 20px 20px;

        .condition-wrap {
            flex: 1;
            display: flex;
        }
    }

    .table-opt-tool-bar {
        padding: 13px 0 11px 24px;
        display: flex;

        .table-opt-bar {
            flex: 1;

            .table-opt {
                margin-top: 5px;
                display: flex;
            }
        }

        .paging-opt-wrap {
            display: flex;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;

            .paging-opt-disabled {
                width: 70px;
                height: 36px;
                text-align: center;
                line-height: 36px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                background-image: linear-gradient(180deg, #ececec 0%, #fafafa 100%), linear-gradient(#58cdab, #58cdab);
                background-blend-mode: normal, normal;
                box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.64);
                border-radius: 2px;
                border: solid 1px #cacaca;
                color: rgba(#747474, 0.3);
            }

            .paging-opt {
                cursor: pointer;
                width: 70px;
                height: 36px;
                text-align: center;
                line-height: 36px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #747474;
                background-image: linear-gradient(0deg, #ececec 0%, #fafafa 100%), linear-gradient(#58cdab, #58cdab);
                background-blend-mode: normal, normal;
                box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.64);
                border-radius: 2px;
                border: solid 1px #cacaca;
            }
        }
    }

    .bottom-tool-bar {
        margin-top: 0;
        padding: 8px 0;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        border-bottom: 2px solid #b5cce6 !important;
        border-top: 2px solid #a0d6ff !important;

        .tool-bar-container {
            height: 28px;
            display: flex;
            line-height: 28px;

            .bottom-checked-all {
                margin-left: 15px;
            }

            .total-info {
                flex: 1;
                font-family: MicrosoftYaHei;
                font-size: 13px;
                line-height: 28px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #747474;
                text-align: right;
            }

            .change-page {
                margin-left: 20px;
                font-family: MicrosoftYaHei;
                font-size: 13px;
                line-height: 28px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #747474;
                display: flex;

                .img {
                    width: 11px;
                    height: 11px;
                    margin-top: 9px;
                    cursor: pointer;
                }

                .to-first-page-disable {
                    cursor: auto;
                    background: url('../../assets/image/pagnation/to_first_1.png') center center no-repeat;
                }

                .to-first-page {
                    background: url('../../assets/image/pagnation/to_first.png') center center no-repeat;
                }

                .to-pre-page-disable {
                    margin-left: 10px;
                    margin-right: 10px;
                    cursor: auto;
                    background: url('../../assets/image/pagnation/pre_1.png') center center no-repeat;
                }

                .to-pre-page {
                    margin-left: 10px;
                    margin-right: 10px;
                    background: url('../../assets/image/pagnation/pre.png') center center no-repeat;
                }

                .to-next-page-disable {
                    margin-left: 10px;
                    margin-right: 10px;
                    cursor: auto;
                    background: url('../../assets/image/pagnation/next_1.png') center center no-repeat;
                }

                .to-next-page {
                    margin-left: 10px;
                    margin-right: 10px;
                    background: url('../../assets/image/pagnation/next.png') center center no-repeat;
                }

                .to-end-page-disable {
                    cursor: auto;
                    background: url('../../assets/image/pagnation/to_end_1.png') center center no-repeat;
                }

                .to-end-page {
                    background: url('../../assets/image/pagnation/to_end.png') center center no-repeat;
                }
            }

            .jumper-input-wrap {
                height: 28px;
                margin: 0;
                padding-right: 10px;
            }
        }
    }
}
</style>
<style lang="stylus">
:focus {
    outline: none;
}

.pagingtion-popper-select {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;

    .el-select-dropdown__item.selected {
        color: #747474;
    }
}

.pagination-table {
    el-input-border-color = #cacaca !important;

    .el-input__inner:focus {
        border-color: el-input-border-color;
    }

    .el-select .el-input__inner:focus {
        border-color: el-input-border-color;
    }

    .el-select .el-input.is-focus .el-input__inner {
        border-color: el-input-border-color;
    }

    .el-pagination__sizes .el-input .el-input__inner:hover {
        border-color: el-input-border-color;
    }

    .filter-condition-bar {
        .condition-wrap {
            .el-input__inner {
                height: 36px;
                line-height: 36px;
                font-family: 'Microsoft YaHei';
            }
        }
    }

    el-checkbox-border-color = #2273c8 !important;

    .el-checkbox__inner {
        line-height: 0;
        border: solid 1px #c4c4c4;
    }

    .bottom-checked-all {
        .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: el-checkbox-border-color;
        }

        .el-checkbox__input.is-checked .el-checkbox__inner {
            border-color: el-checkbox-border-color;
            background-color: #fff !important;
        }

        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: el-checkbox-border-color;
        }

        .el-checkbox__inner:hover {
            border-color: el-checkbox-border-color;
        }

        .el-checkbox__inner::after {
            border-bottom: 1px solid el-checkbox-border-color;
            border-right: 1px solid el-checkbox-border-color;
        }
    }

    .table-box table tr th:nth-child(1), .table-box table tr td:nth-child(1) {
        text-align: left;
    }

    .table-box {
        .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: #fff !important;
        }

        .el-checkbox {
            font-size: 12px;
        }

        .el-table--border th:first-child .cell, .el-table--border td:first-child .cell {
            padding-top: 5px;
        }

        td {
            .el-checkbox__inner {
                line-height: 0;
                width: 12px;
                height: 12px;
                border: solid 1px #c4c4c4;
            }

            .el-checkbox__inner::after {
                height: 6px;
                left: 3px;
                top: 0px;
            }

            .el-checkbox {
                margin-left: 5px;
            }
        }

        .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: el-checkbox-border-color;
        }

        .el-checkbox__input.is-checked .el-checkbox__inner {
            border-color: el-checkbox-border-color;
        }

        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: el-checkbox-border-color;
        }

        .el-checkbox__inner:hover {
            border-color: el-checkbox-border-color;
        }

        .el-checkbox__inner::after {
            border-bottom: 1px solid el-checkbox-border-color;
            border-right: 1px solid el-checkbox-border-color;
        }

        .el-table th {
            padding: 0px;
            background-color: #ffffff;
        }

        .el-table__header {
            border-bottom: 2px solid #b5cce6 !important;
            border-top: 2px solid #a0d6ff !important;
        }

        .el-table th.is-leaf {
            height: 44px;

            .cell {
                .el-checkbox {
                    margin-left: 5px;
                }
            }
        }

        .el-table .cell {
            color: #747474;
            font-family: MicrosoftYaHei;
            font-size: 14px;
        }

        .el-select, .el-select--mini {
            padding: 0;
        }

        .el-select .el-input.is-focus .el-input__inner {
            border-color: #cacaca !important;
        }

        .el-pagination__sizes .el-input .el-input__inner:hover {
            border-color: #cacaca;
        }

        .el-table__header-wrapper .el-table__header .has-gutter tr th .cell {
            font-family: MicrosoftYaHei;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            color: #37414c;
            letter-spacing: 0px;
        }

        .el-table td {
            padding: 0px;
            height: 40px;
        }

        .el-table--striped .el-table__body tr.el-table__row--striped td {
            background: #fafafa;
        }

        .el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
            background: #fafafa;
        }
    }

    .el-pagination {
        margin-right: 0;
        text-align: right;
        color: #747474;
        font-family: MicrosoftYaHei;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        height: 30px;
        padding: 0;

        .btn-prev {
            margin-left: 20px;
        }
    }

    .el-pager .more::before {
        line-height: 22px;
    }

    .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next, .el-pager li {
        width: 22px;
        height: 22px;
        line-height: 28px;
        background-image: linear-gradient(0deg, #ececec 0%, #fafafa 100%), linear-gradient(#ffffff, #ffffff);
        background-blend-mode: normal, normal;
        box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.64);
        border-radius: 3px;
        border: solid 1px #cacaca;
    }

    .el-pager li:hover {
        background-image: linear-gradient(0deg, #63adfc 0%, #7ab9fc 100%), linear-gradient(#ffffff, #ffffff);
        background-blend-mode: normal, normal;
        box-shadow: inset 0px 1px 4px 0px rgba(255, 255, 255, 0.64);
        border-radius: 3px;
        border: solid 1px #7db3f1;
        color: #fff;
    }

    .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next, .el-pagination.is-background .el-pager li {
        min-width: 22px;
    }

    .el-pager li {
        font-family: MicrosoftYaHei;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #747474;
        line-height: 20px;
        padding: 0;
    }

    .el-pager li.active + li {
        border: solid 1px #cacaca;
    }

    .el-pager li.active+li {
        border: solid 1px #cacaca;
    }

    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-image: linear-gradient(0deg, #63adfc 0%, #7ab9fc 100%), linear-gradient(#ffffff, #ffffff);
        background-blend-mode: normal, normal;
        box-shadow: inset 0px 1px 4px 0px rgba(255, 255, 255, 0.64);
        border-radius: 3px;
        border: solid 1px #7db3f1;
    }

    .el-pagination__jump {
        margin-left: 15px;
        margin-top: -3px;
    }

    .el-pagination span:not([class*=suffix]), .el-pagination button {
        height: 22px;
        line-height: 28px;
    }

    .el-pagination__editor.el-input .el-input__inner {
        font-size: 13px;
        // margin: 0 10px;
    }

    .jumper-input {
        width: 38px;
        height: 28px;
        margin: 0 10px;

        .el-input__inner {
            font-size: 13px;
            height: 28px;
            padding: 0 2px;
            border-radius: 3px;
            background-color: #ffffff;
        }
    }

    .el-pagination__editor {
        margin: 0 10px;
    }

    .el-pagination__sizes {
        margin: 0 -2px 0 5px;
        padding: 0;
    }
}
</style>
