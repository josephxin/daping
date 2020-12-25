<template>
    <el-card class="dataset-setting-box">
        <div slot="header">
            <span>数据集（{{ title }}）配置</span>
        </div>
        <el-collapse accordion v-show="datasetSelectedId">
            <el-collapse-item :title="title">
                <el-form-item
                    :label="dataCfg.xBinding.name"
                    v-show="datasetSelectedId"
                    v-if="dataCfg.xBinding"
                >
                    <el-select
                        v-model="xAxisIds"
                        multiple
                        filterable
                        @change="_onXAxisIdChange"
                    >
                        <el-option
                            v-for="item in xAxisMetadataList"
                            :key="item.columnName"
                            :label="item.columnDesc"
                            :value="item.columnName"
                            :disabled="item.disabled"
                        >
                            <span style="float: left"
                                >{{ item.columnName }}({{
                                    item.columnDesc
                                }})</span
                            >
                            <span
                                style="
                                    float: right;
                                    margin-right: 30px;
                                    color: #8492a6;
                                    font-size: 13px;
                                "
                                >{{
                                    item.columnDefDire == 1 ? "指标" : "维度"
                                }}</span
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- y维度数据       -->
                <el-form-item
                    :label="dataCfg.yBinding.name"
                    v-show="datasetSelectedId"
                    v-if="dataCfg.yBinding"
                >
                    <el-select
                        v-model="yAxisIds"
                        multiple
                        filterable
                        @change="_onYAxisIdChange"
                    >
                        <el-option
                            v-for="item in yAxisMetadataList"
                            :key="item.columnName"
                            :label="item.columnDesc"
                            :value="item.columnName"
                            :disabled="item.disabled"
                        >
                            <span style="float: left"
                                >{{ item.columnName }}({{
                                    item.columnDesc
                                }})</span
                            >
                            <span
                                style="
                                    float: right;
                                    margin-right: 30px;
                                    color: #8492a6;
                                    font-size: 13px;
                                "
                                >{{
                                    item.columnDefDire == 1 ? "指标" : "维度"
                                }}</span
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 图层类型 -->
                <el-form-item
                    :label="dataCfg.layerTypeBinding.name"
                    v-show="datasetSelectedId"
                    v-if="dataCfg.layerTypeBinding"
                >
                    <el-select
                        v-model="layer.type"
                        style="width: 100%"
                        @change="_changeLayerType"
                    >
                        <el-option
                            v-for="item in dataCfg.layerTypeBinding.range"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <!-- 空间字段 -->
                <el-form-item
                    :label="dataCfg.spatialBinding.name"
                    v-show="datasetSelectedId && layer.type"
                    v-if="dataCfg.spatialBinding"
                >
                    <el-select
                        v-model="geometry"
                        style="width: 100%"
                        multiple
                        filterable
                        :multiple-limit="spaceLimit"
                        @change="changeGeometryValue"
                    >
                        <el-option
                            v-for="item in spaceMetaList"
                            :key="item.columnName"
                            :label="item.columnDesc"
                            :value="item.columnName"
                            :disabled="item.disabled"
                        >
                            <span style="float: left"
                                >{{ item.columnName }}({{
                                    item.columnDesc
                                }})</span
                            >
                            <span
                                style="
                                    float: right;
                                    margin-right: 30px;
                                    color: #8492a6;
                                    font-size: 13px;
                                "
                                >{{
                                    item.columnDefDire == 1 ? "指标" : "维度"
                                }}</span
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 属性字段 -->
                <el-form-item
                    :label="dataCfg.propsBinding.name"
                    v-show="datasetSelectedId && layer.type"
                    v-if="dataCfg.propsBinding"
                >
                    <el-select
                        v-model="properties"
                        style="width: 100%"
                        multiple
                        filterable
                        @change="changePropertiesValue"
                    >
                        <el-option
                            v-for="item in metaList"
                            :key="item.columnName"
                            :label="item.columnDesc"
                            :value="item.columnName"
                            :disabled="item.disabled"
                        >
                            <span style="float: left"
                                >{{ item.columnName }}({{
                                    item.columnDesc
                                }})</span
                            >
                            <span
                                style="
                                    float: right;
                                    margin-right: 30px;
                                    color: #8492a6;
                                    font-size: 13px;
                                "
                                >{{
                                    item.columnDefDire == 1 ? "指标" : "维度"
                                }}</span
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 图层名称 -->
                <el-form-item
                    :label="dataCfg.layerNameBinding.name"
                    v-show="datasetSelectedId && layer.type"
                    v-if="dataCfg.layerNameBinding"
                >
                    <el-select
                        v-model="layer.name"
                        style="width: 100%"
                        @change="_changeValue"
                    >
                        <el-option
                            v-for="item in metaList.filter(
                                (m) => m.columnDefDire == 2
                            )"
                            :key="item.columnName"
                            :label="item.columnDesc"
                            :value="item.columnName"
                            :disabled="item.disabled"
                        >
                            <span style="float: left"
                                >{{ item.columnName }}({{
                                    item.columnDesc
                                }})</span
                            >
                            <span
                                style="
                                    float: right;
                                    margin-right: 30px;
                                    color: #8492a6;
                                    font-size: 13px;
                                "
                                >{{
                                    item.columnDefDire == 1 ? "指标" : "维度"
                                }}</span
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="必要参数">
                <el-checkbox-group
                    v-model="requireFields"
                    @change="_requireFieldsChanged"
                >
                    <el-checkbox
                        :label="item.columnName"
                        v-for="item in metaList"
                        :key="item.id"
                    ></el-checkbox>
                </el-checkbox-group>
            </el-collapse-item>
            <el-collapse-item title="条件配置">
                <div class="global-params-box">
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click.stop="_addElementConfig"
                        style="margin-bottom: 2px"
                        >条件配置
                    </el-button>
                    <el-table
                        :data="searchElementConfigs"
                        border
                        style="width: 100%"
                    >
                        <el-table-column prop="columnName" label="条件字段">
                        </el-table-column>
                        <el-table-column prop="paramsFrom" label="取值方式">
                            <template slot-scope="scope">
                                {{
                                    scope.row.paramsFrom === 1
                                        ? "自定义"
                                        : "全局参数"
                                }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="value" label="值/全局参数">
                        </el-table-column>
                        <el-table-column
                            prop="operationType"
                            label="条件"
                            width="80"
                        >
                            <template slot-scope="scope">
                                {{ _getOperationType(scope.row.operationType) }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-collapse-item>
            <el-collapse-item title="排序配置">
                <div class="global-sort-params">
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click.stop="
                            () => {
                                $refs.orderByConfig.show();
                            }
                        "
                        style="margin-bottom: 2px"
                        >排序配置
                    </el-button>
                    <el-table
                        :data="orderByConfigDTO"
                        border
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="bindMapperColumn"
                            label="排序字段"
                        >
                        </el-table-column>
                        <el-table-column prop="orderByType" label="排序方式">
                            <template slot-scope="scope">
                                {{
                                    scope.row.orderByType === "asc"
                                        ? "正序"
                                        : "倒序"
                                }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-collapse-item>
            <el-collapse-item title="数据集结果配置">
                <el-form-item label="结果集数据条数限制">
                    <el-input
                        v-model="resultNumber"
                        @change="_onResultNumberChange"
                    ></el-input>
                </el-form-item>
            </el-collapse-item>
        </el-collapse>
        <!-- 条件筛选 -->
        <search-element-config
            v-if="elementConfigsEditDialogVisible"
            :visible="elementConfigsEditDialogVisible"
            :metaList="metaList"
            :globalParams="searchElementConfigs"
            @onBack="_elementConfigsEditClosed"
            @onSave="_updateElementConfigs"
        />
        <order-by-config
            ref="orderByConfig"
            :metaList="metaList"
            :globalParams="orderByConfigDTO"
            @onSave="_updateOrderByConfigs"
        ></order-by-config>
    </el-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { dataConfig } from "@/compLib/CompTemplateReg";
import { onlyUpdateDataSetAttr } from "@/components/props/dataSource/dataSourceReg";
import _ from "lodash";
import operationTypes from "@/config/operationTypes";
import searchElementConfig from "./searchElementConfig";
import orderByConfig from "./orderByConfig";

export default {
    name: "dataBinding",
    props: ["datasetSelectedId", "title", "metaDataList"],
    computed: {
        ...mapGetters({
            activeComp: "getFirstActiveComp",
        }),
        ...mapState(["window"]),
        dataCfg() {
            return dataConfig(this.activeComp.componentName);
        },
        globalParamOptions() {
            return this.window.globalParams;
        },
    },
    components: { searchElementConfig, orderByConfig },
    watch: {
        datasetSelectedId: {
            handler: function (val, oVal) {
                if (val) {
                    this._getDatasetMetadata();
                }
            },
        },
        "activeComp.compId": {
            handler: function (val, oVal) {
                this._getDatasetMetadata();
            },
        },
    },
    data() {
        return {
            xAxisMetadataList: [], //x维度元数据列表
            yAxisMetadataList: [], //y维度元数据列表
            metaList: [], //元数据列表
            layer: {
                name: "",
                type: "",
            },
            spaceMetaList: [], //空间字段元数据
            xAxisIds: [], // 已选x轴字段列表
            yAxisIds: [], //已选y轴字段列表,
            properties: [],
            geometry: [],
            spaceLimit: 0,
            searchElementConfigs: [], //查询条件
            operationTypes, //数据筛选类型集合
            requireFields: [], //必选字段
            globalParams: [], //全局参数
            elementConfigsEditDialogVisible: false, //显示全局参数配置弹窗
            orderByConfigDTO: [], //排序条件集合
            resultNumber: "", //结果集数据
        };
    },
    mounted() {
        this.$nextTick(() => {
            this._getDatasetMetadata();
        });
    },
    methods: {
        _onResultNumberChange() {
            onlyUpdateDataSetAttr(
                `conf ${this.datasetSelectedId.toString()} resultNumber`,
                this.resultNumber
            );
        },
        _initData() {
            if (this.activeComp.data.conf[this.datasetSelectedId.toString()]) {
                let datasetId = this.datasetSelectedId.toString();
                this.xAxisIds =
                    this.activeComp.data.conf[datasetId].xAxisIds || [];
                this.yAxisIds =
                    this.activeComp.data.conf[datasetId].yAxisIds || [];
                this.properties =
                    this.activeComp.data.conf[datasetId].properties || [];
                this.geometry =
                    this.activeComp.data.conf[datasetId].geometry || [];
                this.requireFields =
                    this.activeComp.data.conf[datasetId].requireFields || [];
                this.globalParams =
                    this.activeComp.data.conf[datasetId].globalParams || [];
                this.layer = this.activeComp.data.conf[datasetId].layer || {
                    name: "",
                    type: "",
                };
                this.searchElementConfigs =
                    this.activeComp.data.conf[datasetId].searchElementConfigs ||
                    [];
                this.orderByConfigDTO =
                    this.activeComp.data.conf[datasetId].orderByConfigDTO || [];
                this.resultNumber =
                    this.activeComp.data.conf[datasetId].resultNumber || "";
                if (this.activeComp.data.conf[datasetId].datasetMeta) {
                    this._onXAxisIdChange();
                    this._onYAxisIdChange();
                }
            }
        },
        _getDatasetMetadata() {
            // if(!this.activeComp.data.conf[this.datasetSelectedId.toString()]) {
            let metaDataList = _.cloneDeep(this.metaDataList);
            onlyUpdateDataSetAttr(
                `conf ${this.datasetSelectedId.toString()} datasetMeta`,
                metaDataList
            );
            this.yAxisMetadataList = _.cloneDeep(metaDataList);
            this.xAxisMetadataList = _.cloneDeep(metaDataList);
            this.metaList = _.cloneDeep(metaDataList);
            this.spaceMetaList = _.cloneDeep(metaDataList);
            this._initData();
            // }
        },
        //x轴数据修改
        _onXAxisIdChange() {
            onlyUpdateDataSetAttr(
                `conf ${this.datasetSelectedId.toString()} xAxisIds`,
                this.xAxisIds
            );
            let yAxisMetadataList = this.yAxisMetadataList;
            yAxisMetadataList.forEach((item) => {
                item.disabled = this.xAxisIds.indexOf(item.columnName) !== -1;
            });
            this.yAxisMetadataList = _.cloneDeep(yAxisMetadataList);
            //TODO 配置变更后销毁事件有问题
            //  this.$evtBus.destroy(this.activeComp.compId)
        },
        //y轴数据修改
        _onYAxisIdChange() {
            onlyUpdateDataSetAttr(
                `conf ${this.datasetSelectedId.toString()} yAxisIds`,
                this.yAxisIds
            );
            let xAxisMetadataList = this.xAxisMetadataList;
            xAxisMetadataList.forEach((item) => {
                item.disabled = this.yAxisIds.indexOf(item.columnName) !== -1;
            });
            this.xAxisMetadataList = _.cloneDeep(xAxisMetadataList);
            //TODO 配置变更后销毁事件有问题
            //  this.$evtBus.destroy(this.activeComp.compId)
        },
        _changeLayerType() {
            onlyUpdateDataSetAttr(
                `conf ${this.datasetSelectedId.toString()} ${
                    this.dataCfg.layerTypeBinding.value
                }`,
                this.layer
            );
            onlyUpdateDataSetAttr(
                `conf  ${this.datasetSelectedId.toString()} geometry`,
                []
            );
            onlyUpdateDataSetAttr(
                `conf  ${this.datasetSelectedId.toString()} properties`,
                []
            );
            let metaList = _.cloneDeep(this.metaList);
            this.geometry = [];
            this.properties = [];
            if (this.layer.type === "Point") {
                this.spaceMetaList = metaList.filter(
                    (item) => item.columnDefDire == 1
                );
                this.spaceLimit = 2;
                return;
            }
            this.spaceMetaList = metaList.filter(
                (item) => item.columnDefDire == 2
            );
            this.spaceLimit = 1;
        },
        _changeValue() {
            onlyUpdateDataSetAttr(
                `conf ${this.datasetSelectedId.toString()} ${
                    this.dataCfg.layerTypeBinding.value
                } name`,
                this.layer.name
            );
            onlyUpdateDataSetAttr(
                `conf ${this.datasetSelectedId.toString()} ${
                    this.dataCfg.layerTypeBinding.value
                } type`,
                this.layer.type
            );
        },
        changeGeometryValue(val) {
            onlyUpdateDataSetAttr(
                `conf ${this.datasetSelectedId.toString()} geometry`,
                val
            );
        },
        changePropertiesValue(val) {
            onlyUpdateDataSetAttr(
                `conf ${this.datasetSelectedId.toString()} properties`,
                val
            );
        },
        // 必选字段修改时触发
        _requireFieldsChanged() {
            onlyUpdateDataSetAttr(
                `conf ${this.datasetSelectedId.toString()} requireFields`,
                this.requireFields
            );
        },
        _elementConfigsEditClosed() {
            this.elementConfigsEditDialogVisible = false;
        },
        // 更新筛选条件
        _updateElementConfigs(data) {
            onlyUpdateDataSetAttr(
                `conf ${this.datasetSelectedId.toString()} searchElementConfigs`,
                data
            );
            this.searchElementConfigs = data;
            this.elementConfigsEditDialogVisible = false;
        },
        //配置条件筛选
        _addElementConfig() {
            this.elementConfigsEditDialogVisible = true;
        },
        _getOperationType(type) {
            for (let i = 0; i < this.operationTypes.length; i++) {
                if (this.operationTypes[i].code === type)
                    return this.operationTypes[i].description;
            }
            return null;
        },
        _updateOrderByConfigs(data) {
            onlyUpdateDataSetAttr(
                `conf ${this.datasetSelectedId.toString()} orderByConfigDTO`,
                data
            );
            this.orderByConfigDTO = data;
            this.$refs.orderByConfig.hide();
        },
    },
};
</script>

<style lang="stylus">
.dataset-setting-box {
    margin-bottom: 10px;

    .el-card__header {
        font-size: 14px;
        padding: 10px;
    }

    .el-form-item--small.el-form-item {
        margin-bottom: 10px;
    }
}

.el-collapse-item__header {
    height: 36px;
    line-height: 36px;
}

.el-collapse-item__content {
    padding-bottom: 10px;
}

.search-element-configs-component {
    .el-row {
        vertical-align: middle;
        padding-bottom: 10px;

        .el-input__inner {
            height: 30px;
            line-height: 30px;
        }

        .el-input__icon {
            line-height: 30px;
        }
    }
}
</style>
