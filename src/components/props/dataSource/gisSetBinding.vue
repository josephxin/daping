<template>
    <el-card class="dataset-setting-box">
        <div slot="header">
            <span>数据集（{{ title }}）配置</span>
        </div>
        <el-form-item label="选择服务">
            <el-select v-model="layerEdit.selectedSev" clearable size="mini" style="width: 100%"
                       @change="serviceSelected">
                <el-option v-for="server in services" :key="server.id" :label="server.name" :value="server.id"/>
            </el-select>
        </el-form-item>
        <el-form-item label="选择图层" v-if="layerEdit.serverObj">
            <el-select v-model="layerEdit.selectedLayer" multiple
                       :multiple-limit="layerEdit.serverObj.enableDrill?0:1"
                       clearable size="mini" style="width: 100%" @change="layerSelected">
                <el-option v-for="layer in layerEdit.serverObj.selected" :value="layer.name" :key="layer.name"
                           :label="layer.alias||layer.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="默认参数" v-if="layerEdit.serverObj">
            <el-input v-model="layerEdit.defaultParams" style="width: 100%" size="mini"/>
        </el-form-item>
        <el-collapse accordion v-show="datasetSelectedId">
            <el-collapse-item :title="title">
                <el-form-item label="关联GIS字段" v-show="datasetSelectedId" v-if="layerEdit.layerObj&&layerEdit.layerObj.length>0">
                    <el-select v-model='refGisField' style="width:100%" @change="changeRefGisField">
                        <el-option v-for="item in gisRefFields" :key="item.columnName" :label="item.columnDesc"
                                   :value="item.columnName" :disabled="item.disabled">
                            <span style="float: left">{{ item.columnName }}({{ item.columnDesc }})</span>
                            <span style="float: right;margin-right:30px; color: #8492a6; font-size: 13px">{{
                                    item.columnDefDire == 1 ? '指标' : '维度'
                                }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联数据集字段" v-show="datasetSelectedId">
                    <el-select v-model='refSetField' style="width:100%" @change="changeRefSetField">
                        <el-option v-for="item in metaList" :key="item.columnName" :label="item.columnDesc"
                                   :value="item.columnName" :disabled="item.disabled">
                            <span style="float: left">{{ item.columnName }}({{ item.columnDesc }})</span>
                            <span style="float: right;margin-right:30px; color: #8492a6; font-size: 13px">{{
                                    item.columnDefDire == 1 ? '指标' : '维度'
                                }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 属性字段 -->
                <el-form-item :label="dataCfg.propsBinding.name" v-show="datasetSelectedId"
                              v-if="dataCfg.propsBinding">
                    <el-select v-model='properties' style="width:100%" multiple
                               @change="changePropertiesValue">
                        <el-option v-for="item in metaList" :key="item.columnName" :label="item.columnDesc"
                                   :value="item.columnName" :disabled="item.disabled">
                            <span style="float: left">{{ item.columnName }}({{ item.columnDesc }})</span>
                            <span
                                style="float: right;margin-right:30px; color: #8492a6; font-size: 13px">{{
                                    item.columnDefDire == 1 ? '指标' : '维度'
                                }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="必要参数">
                <el-checkbox-group v-model="requireFields" @change="_requireFieldsChanged">
                    <el-checkbox :label="item.columnName" v-for="item in metaList" :key="item.id"></el-checkbox>
                </el-checkbox-group>
            </el-collapse-item>
            <el-collapse-item title="条件配置">
                <div class="global-params-box">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click.stop="_addElementConfig"
                               style='margin-bottom:2px;'>条件配置
                    </el-button>
                    <el-table :data="searchElementConfigs" border style="width: 100%">
                        <el-table-column prop="columnName" label="条件字段">
                        </el-table-column>
                        <el-table-column prop="paramsFrom" label="取值方式">
                            <template slot-scope="scope">
                                {{ scope.row.paramsFrom === 1 ? '自定义' : '全局参数' }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="value" label="值/全局参数">
                        </el-table-column>
                        <el-table-column prop="operationType" label="条件" width="80">
                            <template slot-scope="scope">
                                {{ _getOperationType(scope.row.operationType) }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-collapse-item>
            <el-collapse-item title="排序配置">
                <div class="global-sort-params">
                    <el-button type="primary" icon="el-icon-edit" size="mini"
                               @click.stop="() => {$refs.orderByConfig.show()}"
                               style='margin-bottom:2px;'>排序配置
                    </el-button>
                    <el-table :data="orderByConfigDTO" border style="width: 100%">
                        <el-table-column prop="bindMapperColumn" label="排序字段">
                        </el-table-column>
                        <el-table-column prop="orderByType" label="排序方式">
                            <template slot-scope="scope">
                                {{ scope.row.orderByType === 'asc' ? '正序' : '倒序' }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-collapse-item>
            <el-collapse-item title="数据集结果配置">
                <el-form-item label="结果集数据条数限制">
                    <el-input v-model="resultNumber" @change="_onResultNumberChange"></el-input>
                </el-form-item>
            </el-collapse-item>
        </el-collapse>
        <!-- 条件筛选 -->
        <search-element-config v-if="elementConfigsEditDialogVisible" :visible="elementConfigsEditDialogVisible"
                               :metaList="metaList" :globalParams="searchElementConfigs"
                               @onBack="_elementConfigsEditClosed" @onSave="_updateElementConfigs"/>
        <order-by-config ref="orderByConfig" :metaList="metaList" :globalParams="orderByConfigDTO"
                         @onSave="_updateOrderByConfigs"></order-by-config>

    </el-card>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {dataConfig} from "@/compLib/CompTemplateReg";
import {onlyUpdateDataSetAttr} from "@/components/props/dataSource/dataSourceReg";
import _ from "lodash";
import operationTypes from "@/config/operationTypes"
import searchElementConfig from "./searchElementConfig"
import orderByConfig from "./orderByConfig"
import axios from "axios";
import {getEsriServerLayer, getSMServerLayer} from "@/components/props/dataSource/getServerResource";

export default {
    name: "gisSet",
    props: ['datasetSelectedId', 'title', 'metaDataList'],
    computed: {
        ...mapGetters({
            activeComp: "getFirstActiveComp", getCompConf: 'getCompConf'
        }),
        ...mapState(["window"]),
        dataCfg() {
            return dataConfig(this.activeComp.componentName);
        },
        globalParamOptions() {
            return this.window.globalParams
        },
        compConfig() {
            if (this.activeComp.compDef === 'baseMap') {
                return "base"
            } else if (this.activeComp.compType === "themeLayer") {
                return "child"
            } else {
                return "not"
            }
        },
        gisRefFields() {
            if (this.layerEdit.layerObj.length === 0) {
                return [];
            }
            if (this.layerEdit.layerObj[0].selectedFields.indexOf('*') !== -1) {
                return this.layerEdit.layerObj[0].fields;
            } else {
                let selectedField = [];
                for (let i = 0; i < this.layerEdit.layerObj[0].selectedFields.length; i++) {
                    for (let j = 0; j < this.layerEdit.layerObj[0].fields.length; j++) {
                        let lf = this.layerEdit.layerObj[0].selectedFields[i];
                        let rf = this.layerEdit.layerObj[0].fields[j].name;
                        if (lf === rf) {
                            selectedField.push(this.layerEdit.layerObj[0].fields[j])
                        }
                    }
                }
                return selectedField;
            }
        }
    },
    components: {searchElementConfig, orderByConfig},
    watch: {
        datasetSelectedId: {
            handler: function (val, oVal) {
                if (val) {
                    this._getDatasetMetadata();
                }
            }
        },
        "activeComp.compId": {
            handler: function (val, oVal) {
                this._getDatasetMetadata();
            }
        }
    },
    data() {
        return {
            service: null,
            services: [{
                id: 'admin',
                baseUrl: "http://10.10.50.15:6080/arcgis/rest/services/AdminArea/MapServer/",
                name: '行政区划',
                layers: [],
                enableDrill: true,
                drillField: 'LCODE',
                selectedLayers: [],
                selected: [],
            }],
            layerEdit: {
                selectedSev: '',
                serverObj: '',
                selectedLayer: [],
                layerObj: [],
                defaultParams: null,
            },
            refGisField: null,
            refSetField: null,
            xAxisMetadataList: [],//x维度元数据列表
            metaList: [],//元数据列表
            properties: [],
            spaceLimit: 0,
            searchElementConfigs: [], //查询条件
            operationTypes, //数据筛选类型集合
            requireFields: [],//必选字段
            globalParams: [],//全局参数
            elementConfigsEditDialogVisible: false,//显示全局参数配置弹窗
            orderByConfigDTO: [],//排序条件集合
            resultNumber: '', //结果集数据
        }
    },
    mounted() {
        this.$nextTick(() => {
            this._getDatasetMetadata()
        })
    },
    methods: {
        _onResultNumberChange() {
            onlyUpdateDataSetAttr(`conf ${this.datasetSelectedId.toString()} resultNumber`, this.resultNumber)
        },
        initGisServer() {
            let compId = this.activeComp.compId;
            if (this.activeComp.compType === 'themeLayer') {
                let sevLayer = this.activeComp.data.conf.sevLayer;
                if (sevLayer) {
                    this.layerEdit = _.cloneDeep(sevLayer);
                }
                let baseId = this.activeComp.baseId;
                compId = baseId || compId;
            }
            let compConf = this.getCompConf(compId);
            let services = _.cloneDeep(compConf.data.conf.services);
            if (services && services.length > 0) {
                this.services = services;
            }
            for (let k = 0; k < this.services.length; k++) {
                if (!_.isEmpty(this.services[k].baseUrl)) {
                    this.getServerLayer(this.services[k]);
                }
            }
        },
        request: function (url, params, data, method) {
            if (method.toUpperCase() === 'GET') {
                return this.service.get(url, {
                    params: params
                });
            } else if (method.toUpperCase() === 'POST') {
                return this.service.post(url, data, {
                    params: params
                })
            }
        },
        getServerLayer(sevObj) {
            if (sevObj.type === "esri") {
                getEsriServerLayer(sevObj)
            } else if (sevObj.type === "sm") {
                getSMServerLayer(sevObj)
            }else{
                getEsriServerLayer(sevObj)
            }
        },
        _initData() {
            if (this.activeComp.data.conf[this.datasetSelectedId.toString()]) {
                let datasetId = this.datasetSelectedId.toString()
                this.refSetField = this.activeComp.data.conf[datasetId].refSetField || null;
                this.refGisField = this.activeComp.data.conf[datasetId].refGisField || null;
                this.properties = this.activeComp.data.conf[datasetId].properties || []
                this.requireFields = this.activeComp.data.conf[datasetId].requireFields || []
                this.globalParams = this.activeComp.data.conf[datasetId].globalParams || []
                this.searchElementConfigs = this.activeComp.data.conf[datasetId].searchElementConfigs || []
                this.orderByConfigDTO = this.activeComp.data.conf[datasetId].orderByConfigDTO || []
                this.resultNumber = this.activeComp.data.conf[datasetId].resultNumber || ''
                if (this.activeComp.data.conf[datasetId].datasetMeta) {
                }
            }
        },
        serviceSelected(val) {
            if (val) {
                for (let i = 0; i < this.services.length; i++) {
                    if (val === this.services[i].id) {
                        this.layerEdit.serverObj = this.services[i];
                    }
                }
            } else {
                this.layerEdit.serverObj = null;
            }
        },
        layerSelected(val) {
            if (val) {
                this.layerEdit.layerObj = []
                for (let i = 0; i < this.layerEdit.serverObj.selected.length; i++) {
                    if (val.indexOf(this.layerEdit.serverObj.selected[i].name) !== -1) {
                        this.layerEdit.layerObj.push(this.layerEdit.serverObj.selected[i]);
                    }
                }
            } else {
                this.layerEdit.layerObj = [];
            }
            this.$store.commit("modifyValueByCompId", {
                attrs: [this.activeComp.compId, "data", "conf", "sevLayer"],
                value: _.cloneDeep(this.layerEdit)
            })
        },
        _getDatasetMetadata() {
            // if(!this.activeComp.data.conf[this.datasetSelectedId.toString()]) {
            let metaDataList = _.cloneDeep(this.metaDataList)
            onlyUpdateDataSetAttr(`conf ${this.datasetSelectedId.toString()} datasetMeta`, metaDataList)
            this.metaList = _.cloneDeep(metaDataList)
            this.spaceMetaList = _.cloneDeep(metaDataList);
            this.initGisServer();
            this._initData();
            // }
        },
        changeRefSetField(val) {
            onlyUpdateDataSetAttr(`conf ${this.datasetSelectedId.toString()} refSetField`, val)
        },
        changeRefGisField(val) {
            onlyUpdateDataSetAttr(`conf ${this.datasetSelectedId.toString()} refGisField`, val)
        },
        changePropertiesValue(val) {
            onlyUpdateDataSetAttr(`conf ${this.datasetSelectedId.toString()} properties`, val)
        },
        // 必选字段修改时触发
        _requireFieldsChanged() {
            onlyUpdateDataSetAttr(`conf ${this.datasetSelectedId.toString()} requireFields`, this.requireFields)
        },
        _elementConfigsEditClosed() {
            this.elementConfigsEditDialogVisible = false
        },
        // 更新筛选条件
        _updateElementConfigs(data) {
            onlyUpdateDataSetAttr(`conf ${this.datasetSelectedId.toString()} searchElementConfigs`, data)
            this.searchElementConfigs = data
            this.elementConfigsEditDialogVisible = false
        },
        //配置条件筛选
        _addElementConfig() {
            this.elementConfigsEditDialogVisible = true
        },
        _getOperationType(type) {
            for (let i = 0; i < this.operationTypes.length; i++) {
                if (this.operationTypes[i].code === type) return this.operationTypes[i].description
            }
            return null
        },
        _updateOrderByConfigs(data) {
            onlyUpdateDataSetAttr(`conf ${this.datasetSelectedId.toString()} orderByConfigDTO`, data)
            this.orderByConfigDTO = data
            this.$refs.orderByConfig.hide()
        }
    }
}
</script>

<style lang="stylus">
.dataset-setting-box
    margin-bottom 10px

    .el-card__header
        font-size 14px
        padding 10px

    .el-form-item--small.el-form-item
        margin-bottom 10px

.el-collapse-item__header
    height 36px
    line-height 36px

.el-collapse-item__content
    padding-bottom 10px

.search-element-configs-component
    .el-row
        vertical-align middle
        padding-bottom 10px

        .el-input__inner
            height 30px
            line-height 30px

        .el-input__icon
            line-height 30px
</style>
