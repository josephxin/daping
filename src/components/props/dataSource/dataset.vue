<template>
    <el-form v-if="datasetOptions.length > 0" size="small" label-width="120">
        <el-form-item
            :label="dataCfg.selectDataSet.name"
            v-if="dataCfg.selectDataSet"
        >
            <el-select
                v-model="datasetSelectedIds"
                style="width: 100%"
                multiple
                :multiple-limit="multiDataset ? 0 : 1"
                filterable
                @change="_onDatasetChanged"
            >
                <!-- multiple-limit:多选时用户最多可以选择的项目数，为 0 则不限制 -->
                <el-option
                    v-for="item in datasetOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <data-binding
            v-for="item in datasetSelectedIds"
            :key="item"
            :dataset-selected-id="item"
            :title="getSelectDataSetName(item)"
            :metaDataList="_getMetaDataList(item)"
        />
        <el-form-item>
            <el-button type="primary" @click="_loadCompData"
                >加载数据</el-button
            >
            <el-button @click="dialogVisible = true">查看数据</el-button>
        </el-form-item>
        <show-data-dialog
            :visible="dialogVisible"
            v-if="dialogVisible"
            @back="_onDiaologClosed"
        ></show-data-dialog>
    </el-form>
</template>
<script>
import * as api from "@/api/dataSetManageServe";
import { mapState, mapGetters } from "vuex";
import { onlyUpdateDataSetAttr } from "./dataSourceReg";
import { dataConfig } from "@/compLib/CompTemplateReg";
import DataBinding from "./dataBinding";
import showDataDialog from "./showDataDialog";
export default {
    name: "datasource-dataset",
    components: { DataBinding, showDataDialog },
    data() {
        return {
            datasetSelectedIds: [], //数据集id
            datasetOptions: [], //数据集列表
            dialogVisible: false,
        };
    },
    computed: {
        ...mapState(["project"]),
        ...mapGetters({
            activeComp: "getFirstActiveComp",
        }),
        projectId() {
            return this.project.projectId;
        },
        dataCfg() {
            return dataConfig(this.activeComp.componentName);
        },
        multiDataset() {
            return this.activeComp.data.conf.multiDataset || false;
        },
    },
    watch: {
        "activeComp.compId": {
            handler: function (newVal, oldVal) {
                this._initData();
            },
        },
    },
    created() {
        this._initData();
    },
    methods: {
        _onDiaologClosed() {
            this.dialogVisible = false;
        },
        // 获取数据集元数据
        _getMetaDataList(datasetId = 0) {
            for (let i = 0; i < this.datasetOptions.length; i++) {
                if (this.datasetOptions[i]["id"] === datasetId)
                    return this.datasetOptions[i]["datasetDetailList"];
            }
            return [];
        },
        _initData() {
            if (!this.datasetOptions.length) {
                api.queryAllDataSet({}, this.projectId).then((res) => {
                    console.log("_initData -> res", res);
                    if (res.code === 200) {
                        this.datasetOptions = res.data;
                    } else if (res.code === 505) {
                        this.datasetOptions = [];
                        this.$message.info("数据集列表为空！");
                    }
                });
            }
            this.datasetSelectedIds = this.activeComp.data.conf.datasetSelectedIds;
        },
        // 获取数据集元数据
        _onDatasetChanged() {
            let dimensionIndicatorRelation = _.cloneDeep(this.activeComp.data.conf.dimensionIndicatorRelation)
            onlyUpdateDataSetAttr("conf",{});
            onlyUpdateDataSetAttr("conf dimensionIndicatorRelation",dimensionIndicatorRelation)
            onlyUpdateDataSetAttr(
                "conf datasetSelectedIds",
                this.datasetSelectedIds
            );
            for (let i = 0; i < this.datasetSelectedIds.length; i++) {
                onlyUpdateDataSetAttr(`conf ${this.datasetSelectedIds[i]}`, {});
            }
            this.$evtBus.destroy(this.activeComp.compId);
        },
        _loadCompData() {
            try {
                this.$dm.clearErrorMsg();
                //console.log(this.updateState);//undefined
                this.$compsBus.$emit("updateCompData", {
                    compId: this.activeComp.compId,
                    changedLoadedData: this.updateState,
                });
                let error = this.$dm.getErrorMsg();
                if (error.length != 0) {
                    this.$alert("加载数据失败。异常信息为" + error, "提示", {
                        confirmButtonText: "确定",
                    });
                } else {
                    this.$alert("加载数据成功", "提示", {
                        confirmButtonText: "确定",
                    });
                }
            } catch (e) {
                console.error("error:", e);
                this.$alert("加载数据失败。异常信息为" + e.message, "提示", {
                    confirmButtonText: "确定",
                });
            }
        },
        getSelectDataSetName(sid) {
            for (let i = 0; i < this.datasetOptions.length; i++) {
                if (sid == this.datasetOptions[i].id) {
                    return this.datasetOptions[i].name;
                }
            }
        },
    },
};
</script>
