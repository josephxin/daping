<template>
    <el-collapse style="max-height: 85vh;overflow:auto;">
        <data-ref-form ref="refDataForm"/>
        <el-collapse-item title="触发事件">
            <div style="display: flex;align-items: center;justify-content: space-between">
                <h5>添加触发事件</h5>
                <el-button @click="addLinkRow" circle icon="el-icon-plus" size="mini" type="success"/>
            </div>
            <el-card v-for="(item,i) in linkEvents" :key="item.evtName" style="margin: 5px">
                <el-row style="margin-bottom: 5px;">
                    <el-col :span="5" class="evt-header">事件类型</el-col>
                    <el-col :span="15">
                        <el-select style="width: 100%;" size="mini" @change="afterSelectEvt" v-model="item.evtType"
                                   clearable placeholder="事件类型">
                            <el-option :key="i" :label="evt.label" :value="evt.val" :disabled="evt.disable"
                                       v-for="(evt,i) in linkEvtType"/>
                        </el-select>
                    </el-col>
                    <el-col :span="4" style="text-align: center">
                        <el-button @click="deleteLinkRow(item,i)" size="mini" circle icon="el-icon-delete"
                                   type="danger"/>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 5px;">
                    <el-col :span="5" class="evt-header">对外暴露</el-col>
                    <el-col :span="15">
                        <el-switch v-model="item.explosive" style="float: right" active-text="开启" inactive-text="关闭"/>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 5px;">
                    <el-col :span="5" class="evt-header">触发显隐</el-col>
                    <el-col :span="15">
                        <el-switch v-model="item.ctrlShow" size="mini" style="float: right" active-text="开启"
                                   inactive-text="关闭"/>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 5px;">
                    <el-col :span="5" class="evt-header">默认触发</el-col>
                    <el-col :span="15">
                        <el-switch v-model="item.def&&item.def.defTrigger" size="mini" style="float: right"
                                   active-text="开启" inactive-text="关闭"/>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 5px;" :gutter="10" v-if="item.def&&item.def.defTrigger">
                    <el-col :span="5" class="evt-header">触发配置</el-col>
                    <el-col :span="8">
                        <el-select style="width: 100%;" size="mini" v-model="item.def.defType"
                                   clearable placeholder="事件类型">
                            <el-option :key="i" :label="t.l" :value="t.v"
                                       v-for="(t,i) in [{l:'默认值',v:'val'},{l:'默认选项',v:'index'},{l:'默认选中',v:'select'}]"/>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-input v-if="item.def.defType==='val'" size="mini" v-model="item.def.defVal"/>
                        <el-input-number :min="0" v-if="item.def.defType==='index'" size="mini"
                                         v-model="item.def.defVal"/>
                        <el-switch v-if="item.def.defType==='select'" v-model="item.def.defVal" size="mini"
                                   style="margin:auto" active-text="开启" inactive-text="关闭"/>
                    </el-col>
                </el-row>
            </el-card>
        </el-collapse-item>
        <el-collapse-item title="接收事件">
            <div style="display: flex;align-items: center;justify-content: space-between">
                <h5>添加接收事件</h5>
                <el-button @click="addRevLinkRow" circle icon="el-icon-plus" size="mini" type="success"/>
            </div>
            <el-card v-for="(item,i) in linkRevEvents" :key="i" style="margin: 5px">
                <el-row style="margin-bottom: 5px;">
                    <el-col :span="5" class="evt-header">关联事件</el-col>
                    <el-col :span="15">
                        <el-select style="width: 100%;" size="mini" v-model="item.evtName" placeholder="关联事件" clearable>
                            <el-option :key="evt.id" :label="evt.alias" :disabled="evt.disable" :value="evt.name"
                                       v-for="evt in evtCanSelect()"/>
                        </el-select>
                    </el-col>
                    <el-col :span="4" style="text-align: center">
                        <el-button @click="deleteRevLinkRow(item,i)" size="mini" circle icon="el-icon-delete"
                                   type="danger"/>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 5px;">
                    <el-col :span="5" class="evt-header">关联方式</el-col>
                    <el-col :span="15">
                        <el-select style="width: 100%;" size="mini" v-model="item.refType">
                            <el-option v-for="t in [{val:'filter',name:'数据筛选'},{val:'update',name:'数据更新'}]"
                                       :label="t.name" :value="t.val" :key="t.val"/>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 5px;">
                    <el-col :span="5" class="evt-header">关联数据</el-col>
                    <el-col :span="15">
                        <el-button icon="el-icon-plus" size="mini" @click="configDataDialog(item)"
                                   type="primary">数据关联配置
                        </el-button>
                    </el-col>
                </el-row>
            </el-card>
        </el-collapse-item>
        <el-collapse-item v-if="cycleConf.enable" title="轮播配置">
            <el-row style="margin-bottom: 5px;">
                <el-col :span="5" class="evt-header">轮播激活</el-col>
                <el-col :span="15">
                    <el-switch style="float: right;width: 150px" size="mini" v-model="cycleEvents.active"
                               :active-text="'开启'" :inactive-text="'关闭'"/>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 5px;">
                <el-col :span="5" class="evt-header">上级轮播组件</el-col>
                <el-col :span="15">
                    <el-select :disabled="cycleEvents.active" style="float: right;width: 150px" size="mini"
                               v-model="cycleEvents.pid" clearable>
                        <el-option v-for="node in chainNodes" :label="node.sname" :value="node.sid" :key="node.value"/>
                    </el-select>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 5px;">
                <el-col :span="5" class="evt-header">轮播周期(秒)</el-col>
                <el-col :span="15">
                    <el-input-number style="float: right;width: 150px" :min="1" size="mini" :step="1"
                                     :disabled="cycleEvents.active" v-model.number="cycleEvents.interval"/>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 5px;">
                <el-col :span="5" class="evt-header">轮播方式</el-col>
                <el-col :span="15">
                    <el-select :disabled="cycleEvents.active" style="float: right;width: 150px" size="mini"
                               v-model="cycleEvents.type">
                        <el-option v-for="t in cycleConf.cycleType" :label="t.label" :value="t.value" :key="t.value"/>
                    </el-select>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 5px;">
                <el-col :span="5" class="evt-header">关联事件</el-col>
                <el-col :span="15">
                    <el-select :disabled="cycleEvents.active" style="float: right;width: 150px" size="mini"
                               v-model="cycleEvents.refEvt" clearable>
                        <el-option v-for="evt in linkEvents" :label="evt.evtName" :value="evt.evtName"
                                   :key="evt.evtName"/>
                    </el-select>
                </el-col>
            </el-row>
        </el-collapse-item>
        <el-button type="primary" @click="saveEvtConfig" style="text-align: center;margin: 20px" size="mini"
                   icon="el-icon-circle-check">保存配置
        </el-button>
    </el-collapse>
</template>

<script>
import {mapGetters} from "vuex";
import {linkageConfig} from "@/compLib/CompTemplateReg";
import _ from "lodash";
import DataRefForm from "./DataRefForm";
import store from "@/store/store";
import util from "@/util/util";

export default {
    name: "CompEventConfig",
    components: {DataRefForm},
    data() {
        return {
            linkTemp: {
                sourceComp: '', evtType: '', ctrlShow: false, evtData: [], explosive: true,
                def: {
                    defTrigger: false, defType: '', defVal: ''
                }
            },//联动事件配置模板
            linkRevTemp: {targetComp: '', evtName: '', ctrlShow: false, refData: [], refType: 'filter'},//联动事件配置模板
            cycleEvents: null,
            cycleConf: {},
            chainNodes: [],
            linkTransDataCfg: [], //事件数据配置
            linkRevDataCfg: [], //事件关联组件数据字段映射
            linkEvtType: [],//联动事件类型
            linkEvents: [],//联动事件配置记录
            linkRevEvents: []
        }
    },
    props: ['reload'],
    created() {
        this.initCompEventCfg();
    },
    watch: {
        'reload': {
            handler: function (val) {
                if (val === 'compEventConfig') {
                    this.initCompEventCfg();
                }
            },
        },
        'activeComp.compId': {
            handler: function (val) {
                if (val) {
                    this.initCompEventCfg();
                }
            },
        }
    },
    computed: {
        ...mapGetters({compList: 'compList', activeComp: 'getFirstActiveComp', getCompConf: 'getCompConf'}),
        loadComps: function () {
            return this._getComps();
        },
        linkageCfg() {
            return linkageConfig(this.activeComp.componentName);
        },
    },
    methods: {
        //初始化事件配置面板
        initCompEventCfg() {
            this.cycleEvents = null;
            let linkData = this.activeComp.linkage
            let linkCfg = this.linkageCfg;
            if (linkCfg) {
                this.linkEvtType = linkCfg.linkEvtTypes ? _.cloneDeep(linkCfg.linkEvtTypes) : []
                this.cycleConf = linkCfg.cycleConf ? linkCfg.cycleConf : {enable: false}
            }

            this.linkTransDataCfg = [];
            this.linkRevDataCfg = [];
            if (this.activeComp.data) {
                this.loadTransDataCfg(this.activeComp.data)
                this.loadRevDataCfg(this.activeComp.data);
            }
            this.chainNodes = this.$evtBus.getChainsNodes(this.activeComp.compId);
            if (linkData) {
                this.linkEvents = _.isArray(linkData.linkEvents) ? _.cloneDeep(linkData.linkEvents) : [];
                this.linkRevEvents = _.isArray(linkData.linkRevEvents) ? _.cloneDeep(linkData.linkRevEvents) : [];
                if (this.cycleConf.enable) {
                    this.cycleEvents = linkData.cycleEvents && Object.keys(linkData.cycleEvents).length > 0 ?
                        _.cloneDeep(linkData.cycleEvents) : {
                            active: false, pid: '', sid: this.activeComp.compId,
                            sname: this.activeComp.name + `(${this.activeComp.compId})`,
                            type: '', refEvt: '', interval: 1, next: null, reset: null,
                        };
                }
            }
        },
        loadTransDataCfg(dataCfg) {
            if (!dataCfg || !dataCfg.conf) {
                return;
            }
            let dataConf = dataCfg.conf;
            //初始化触发事件元数据配置
            if (dataConf.datasetSelectedIds) {
                for (let i = 0; i < dataConf.datasetSelectedIds.length; i++) {
                    let datasetId = dataConf.datasetSelectedIds[i].toString();
                    let dataset = dataConf[datasetId];
                    let selectedKeys = {};
                    if (dataset.xAxisIds) {
                        selectedKeys['xAxisIds'] = dataset.xAxisIds
                    }
                    if (dataset.yAxisIds) {
                        selectedKeys['yAxisIds'] = dataset.yAxisIds
                    }
                    if (dataset.geometry) {
                        selectedKeys['geometry'] = dataset.geometry
                    }
                    if (dataset.properties) {
                        selectedKeys['properties'] = dataset.properties
                    }
                    for (let key in selectedKeys) {
                        for (let j = 0; j < selectedKeys[key].length; j++) {
                            for (let k = 0; k < dataset.datasetMeta.length; k++) {
                                if (selectedKeys[key][j] === dataset.datasetMeta[k].columnName) {
                                    let trans = _.cloneDeep(dataset.datasetMeta[k])
                                    trans['binding'] = key
                                    trans['uid'] = trans.datasetId + "$" + trans.columnName
                                    this.linkTransDataCfg.push(trans)
                                }
                            }
                        }
                    }
                }
            } else if (dataCfg.datasource.type === 'static') {
                let staticDataConf = dataCfg.conf.datasetMeta;
                if (staticDataConf) {
                    for (let i = 0; i < staticDataConf.length; i++) {
                        let transData = {
                            uid: "static$" + staticDataConf[i].columnName,
                            binding: 'xAxisIds',
                            ...staticDataConf[i]
                        }
                        this.linkTransDataCfg.push(transData)
                    }
                }
            } else if (dataCfg.datasource.type === 'gisServer') {
                let sevDataConf = dataCfg.conf.datasetMeta;
                if (sevDataConf) {
                    for (let i = 0; i < sevDataConf.length; i++) {
                        let transData = {
                            uid: "gisServer$" + sevDataConf[i].columnName,
                            binding: 'xAxisIds',
                            ...sevDataConf[i]
                        }
                        this.linkTransDataCfg.push(transData)
                    }
                }
            }
        },
        //初始化接收事件元数据配置
        loadRevDataCfg(dataCfg) {
            if (!dataCfg || !dataCfg.conf) {
                return;
            }
            let dataConf = dataCfg.conf
            if (dataConf.datasetSelectedIds) {
                for (let i = 0; i < dataConf.datasetSelectedIds.length; i++) {
                    let datasetId = dataConf.datasetSelectedIds[i].toString();
                    let dataset = dataConf[datasetId];
                    for (let k = 0; k < dataset.datasetMeta.length; k++) {
                        let trans = _.cloneDeep(dataset.datasetMeta[k])
                        if (dataset.requireFields) {
                            trans.required = dataset.requireFields.indexOf(trans.columnName) !== -1
                        }
                        trans['uid'] = trans.datasetId + "$" + trans.columnName
                        this.linkRevDataCfg.push(trans)
                    }
                }
            } else if (dataCfg.datasource.type === 'static') {
                let staticDataConf = dataCfg.conf.metaData;
                if (staticDataConf) {
                    for (let i = 0; i < staticDataConf.length; i++) {
                        let transData = {
                            uid: staticDataConf[i].datasetId + "$" + staticDataConf[i].columnName,
                            binding: 'xAxisIds',
                            ...staticDataConf[i]
                        }
                        this.linkRevDataCfg.push(transData)
                    }
                }
            } else if (dataCfg.datasource.type === 'gisServer') {
                let sevDataConf = dataCfg.conf.datasetMeta;
                if (sevDataConf) {
                    for (let i = 0; i < sevDataConf.length; i++) {
                        let transData = {
                            uid: "gisServer$" + sevDataConf[i].columnName,
                            binding: 'xAxisIds',
                            ...sevDataConf[i]
                        }
                        this.linkRevDataCfg.push(transData)
                    }
                }
            }

        },
        //添加触发事件
        addLinkRow() {
            this.linkEvents.push(Object.assign({}, _.cloneDeep(this.linkTemp), {
                sourceComp: this.activeComp.compId,
                evtData: this.linkTransDataCfg
            }))
        },
        //删除触发事件
        deleteLinkRow(item, index) {
            this.$confirm('将删除该事件及关联接收事件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let evtObj = this.$evtBus.getEvtObj(item.sourceComp, item.evtType);
                if (evtObj) {
                    for (let key in evtObj.evtHandler) {
                        let targetComp = key.split(":")[0];
                        let evtName = evtObj.name;
                        //清理关联接收事件
                        this._unReceiveEvt(targetComp, evtName)
                    }
                }
                this.$evtBus.unregister(item.sourceComp, item.evtType)
                this.linkEvents.splice(index, 1)
                this.onlyUpdateLinkageAttr('linkEvents', _.cloneDeep(this.linkEvents))
                //处理事件选项 避免添加多个同名事件
                this.afterSelectEvt();
            }).catch(() => {
                this.$message({type: 'info', message: '已取消删除'});
            })
        },
        //增加接收事件
        addRevLinkRow() {
            this.linkRevEvents.push(Object.assign({}, _.cloneDeep(this.linkRevTemp), {
                targetComp: this.activeComp.compId,
            }))
        },
        //删除接收事件
        deleteRevLinkRow(item, index) {
            this.$confirm('将删除该接收事件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.linkRevEvents.splice(index, 1)
                this.$evtBus.un(item.evtName, item.targetComp)
                this.onlyUpdateLinkageAttr('linkRevEvents', _.cloneDeep(this.linkRevEvents))
            }).catch(() => {
                this.$message({type: 'info', message: '已取消删除'});
            })
        },
        //清理关联接收事件
        _unReceiveEvt(targetComp, evtName) {
            let targetCompConf = this.getCompConf(targetComp)
            if (targetCompConf && targetCompConf.linkage && targetCompConf.linkage.linkRevEvents) {
                let _linkRevEvtList = targetCompConf.linkage.linkRevEvents;
                for (let i = 0; i < _linkRevEvtList.length; i++) {
                    if (evtName === _linkRevEvtList[i].evtName) {
                        _linkRevEvtList.splice(i, 1)
                        break;
                    }
                }
                //同步配置
                this.onlyUpdateLinkedCompLinkageAttr(targetComp + " linkage linkRevEvents", _linkRevEvtList)
            }
        },
        //返回可添加接收事件的列表
        evtCanSelect() {
            let events = _.cloneDeep(this.$evtBus.getEvents());
            events.forEach(e => {
                for (let i = 0; i < this.linkRevEvents.length; i++) {
                    if (e.name === this.linkRevEvents[i].evtName) {
                        e.disable = true
                    }
                }
            })
            for (let i = 0; i < events.length; i++) {
                let compId = events[i].name.split(":")[0]
                events[i].alias = this.getCompConf(compId).name + `(${compId})` + ":" + events[i].evtType
            }
            return events;
        },
        afterSelectEvt() {
            this.linkEvtType.forEach(item => {
                item.disable = false;
                for (let i = 0; i < this.linkEvents.length; i++) {
                    if (item.val === this.linkEvents[i].evtType) {
                        item.disable = true
                    }
                }
            })
        },
        //打开事件数据关联配置面板
        configDataDialog(evt) {
            let events = this.evtCanSelect();
            for (let i = 0; i < events.length; i++) {
                if (events[i].name === evt.evtName) {
                    this.$refs.refDataForm.evtTransData = events[i].evtData
                    this.$refs.refDataForm.evtRevData = this.linkRevDataCfg
                    this.$refs.refDataForm.evtRefData = evt.refData;
                }
            }
            this.$refs.refDataForm.dialog = true;
        },
        saveEvtConfig() {
            for (let i = 0; i < this.linkEvents.length; i++) {
                if (util.isEmpty(this.linkEvents[i].evtType)) {
                    this.$message({
                        type: 'warning',
                        message: '触发事件配置未选择事件类型'
                    })
                    return;
                }
                this.linkEvents[i].evtName = this.$evtBus.register(this.linkEvents[i])
            }
            for (let i = 0; i < this.linkRevEvents.length; i++) {
                if (util.isEmpty(this.linkRevEvents[i].evtName)) {
                    this.$message({
                        type: 'warning',
                        message: '接收事件配置未选择接收事件名'
                    })
                    return;
                }
            }
            //清理遗留旧事件配置
            this._clearOldRevEvent();
            //更新配置
            this.onlyUpdateLinkageAttr('linkEvents', _.cloneDeep(this.linkEvents))
            this.onlyUpdateLinkageAttr('linkRevEvents', _.cloneDeep(this.linkRevEvents))
            this.onlyUpdateLinkageAttr('cycleEvents', _.cloneDeep(this.cycleEvents))
            this.$message({
                type: 'success',
                message: '事件配置保存成功'
            })
        },
        _getComps() {
            let result = []
            for (let i = 0; i < this.compList.length; i++) {
                let comp = this.compList[i]
                if (!comp.linkage || comp.compId === this.activeComp.compId) {
                    continue
                }
                result.push({
                    name: comp.name + '(' + comp.compId + ')',
                    value: comp.compId,
                })
            }
            return result
        },
        _clearOldRevEvent() {
            let linkData = this.activeComp.linkage
            if (linkData && linkData.linkRevEvents) {
                linkData.linkRevEvents.forEach(evt => {
                    this.$evtBus.un(evt.evtName, evt.targetComp)
                })
            }
            this.$store.commit("delLinkage", this.activeComp.compId)
        },
        onlyUpdateLinkageAttr(key, value) {
            let keys = key.split(' ')
            keys.unshift('linkage')
            store.commit('modifyValueBySelected', {attrs: keys, value})
        },
        onlyUpdateLinkedCompLinkageAttr(key, value) {
            let keys = key.split(' ')
            store.commit('modifyValueByCompId', {attrs: keys, value})
        }
    }
}
</script>

<style scoped>
.evt-header {
    font-size: 12px;
    display: inline;
    line-height: 28px
}
</style>
