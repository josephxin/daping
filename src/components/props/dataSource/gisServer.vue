<template>
    <div>
        <div style="height: 40px;" v-if="compConfig==='base'">
            <el-button style="float: right;margin-right:30px" @click="addServer" icon="el-icon-plus" size="mini"
                       type="primary">新增
            </el-button>
        </div>
        <el-collapse v-if="compConfig==='base'">
            <el-collapse-item v-for="(server,i) in services" :key="server.id">
                <template slot="title">
                    <div class="h-title">
                        <div style="margin: 5px 10px">{{ server.name }}</div>
                        <el-button v-if="i!==0" style="margin-right: 20px" size="mini" circle icon="el-icon-delete"
                                   @click="delServer(i)" type="danger"/>
                    </div>
                </template>
                <el-form label-width="80px" size="mini">
                    <el-form-item label="服务类型">
                        <el-select v-model="server.type" size="mini" style="width: 80%">
                            <el-option v-for="l in [{l:'sm',n:'超图'},{l:'esri',n:'ArcGIS'}]" :key="l.l"
                                       :label="l.n" :value="l.l">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="server.baseUrl" :readonly="i===0||server.selectedLayers.length>0"
                                  style="width: 80%"/>
                    </el-form-item>
                    <el-form-item label="数据源">
                        <el-input v-model="server.datasource" v-if="server.type==='sm'"
                                  :readonly="i===0||server.selectedLayers.length>0" style="width: 80%"/>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input v-model="server.name" :readonly="i===0||server.selectedLayers.length>0"
                                  style="width: 80%"/>
                    </el-form-item>
                    <el-form-item label="支持下钻">
                        <el-switch v-model="server.enableDrill" style="width: 80%"/>
                    </el-form-item>
                    <el-form-item label="下钻字段">
                        <el-input v-model="server.drillField" :readonly="i===0||server.selectedLayers.length>0"
                                  style="width: 80%"/>
                    </el-form-item>
                    <el-form-item label="图层">
                        <el-select v-model="server.selectedLayers" size="mini" multiple clearable style="width: 80%"
                                   @change="processSelected(server)">
                            <el-option v-for="(l,i) in server.layers" :key="i" :label="l.name" :value="l.name">
                                <span style="float: left;font-size: 11px;">{{ l.name }}</span>
                                <span style="color: #8492a6; font-size: 11px;">({{ l.type }})</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-table :data="server.selected" size="mini">
                    <el-table-column prop="name" label="图层名" width="90px" align="center"/>
                    <el-table-column prop="type" label="类型" width="50px" align="center"/>
                    <el-table-column prop="fields" label="可用字段" align="center" width="140">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.selectedFields" size="mini" multiple clearable>
                                <el-option v-for="(f,i) in [{name:'*',alias:'全部',_type:'all'}].concat(scope.row.fields)"
                                           :key="i" :value="f.name"
                                           :label="f.alias||f.name">
                                    <span style="float: left;font-size: 11px;">{{ f.alias || f.name }}</span>
                                    <span style="color: #8492a6; font-size: 11px;">({{ f.name + ':' + f._type }})</span>
                                    <span style="color: #f22; font-size: 11px;"
                                          v-if="f.name===server.drillField">(必选)</span>
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="server.enableDrill" prop="index" label="层级" align="center" width="120">
                        <template slot-scope="scope">
                            <el-input-number style="width:100%" size="mini" v-model.number="scope.row.index"
                                             controls-position="right" :min="0" :step="1"/>
                        </template>
                    </el-table-column>
                </el-table>
            </el-collapse-item>
        </el-collapse>
        <el-form v-if="compConfig==='child'" size="mini" label-width="90px" label-position="left">
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
                    <el-option v-for="(layer,i) in layerEdit.serverObj.selected" :value="layer.name" :key="i"
                               :label="layer.alias||layer.name"/>
                </el-select>
            </el-form-item>
            <el-form-item label="默认参数" v-if="layerEdit.serverObj">
                <el-input v-model="layerEdit.defaultParams" style="width: 100%" size="mini"/>
            </el-form-item>
        </el-form>
        <div style="height: 40px;margin-top: 10px" v-if="compConfig==='base'">
            <el-button style="float: right;margin-right:30px" @click="saveDataConf" icon="el-icon-folder" size="mini"
                       type="primary">保存
            </el-button>
        </div>
        <div style="height: 40px;margin-top: 10px" v-if="compConfig==='child'">
            <el-button style="float: right;margin-right:30px" @click="saveDataSelect" icon="el-icon-folder" size="mini"
                       type="primary">保存
            </el-button>
        </div>
    </div>
</template>

<script>
import util from "@/util/util";
import {mapGetters} from "vuex";
import {getEsriServerLayer, getSMServerLayer} from "@/components/props/dataSource/getServerResource";

export default {
    name: "gisServer",
    data() {
        return {
            service: null,
            services: [{
                id: 'admin',
                type: 'esri',
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
            }
        }
    },
    created() {
        this.init();
    },
    computed: {
        ...mapGetters({activeComp: 'getFirstActiveComp', getCompConf: 'getCompConf'}),
        compConfig() {
            if (this.activeComp.compDef === 'baseMap') {
                return "base"
            } else if (this.activeComp.compType === "themeLayer") {
                return "child"
            } else {
                return "not"
            }
        }
    },
    watch: {
        "activeComp.compId": {
            handler: function () {
                this.init();
            }
        }
    },
    methods: {
        init() {
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
        //加载地图服务配置
        getServerLayer(sevObj) {
            if (sevObj.type === "esri") {
                getEsriServerLayer(sevObj)
            } else if (sevObj.type === "sm") {
                getSMServerLayer(sevObj)
            }else{
                getEsriServerLayer(sevObj)
            }
        },

        processSelected(server) {
            server.selected = [];
            if (server && server.selectedLayers.length > 0) {
                for (let i = 0; i < server.selectedLayers.length; i++) {
                    for (let j = 0; j < server.layers.length; j++) {
                        if (server.layers[j].name === server.selectedLayers[i]) {
                            let vecUrl = (server.baseUrl.endsWith("/") ? server.baseUrl : server.baseUrl + "/") + server.layers[j].id + "/"
                            let layer = Object.assign({
                                baseUrl: server.baseUrl,
                                url: vecUrl,
                                serverName: server.name,
                                selectedFields: [],
                                index: 0,
                            }, server.layers[j])
                            server.selected.push(layer)
                        }
                    }
                }
            }
        },
        addServer() {
            this.services.push({
                id: util.guid(),
                baseUrl: "",
                name: '新建GisServer',
                layers: [],
                enableDrill: false,
                drillField: '',
                selectedLayers: [],
                selected: [],
            })
        },
        delServer(index) {
            this.services.splice(index, 1)
        },
        //选择服务
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
        //选择图层
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
        },
        //保存服务配置
        saveDataConf() {
            for (let k = 0; k < this.services.length; k++) {
                if (_.isEmpty(this.services[k].baseUrl)
                    || _.isEmpty(this.services[k].name)
                    || this.services[k].selectedLayers.length === 0
                    || this.services[k].selected.length === 0) {
                    this.services.splice(k, 1)
                }
            }
            this.$store.commit("modifyValueByCompId", {
                attrs: [this.activeComp.compId, "data", "conf"],
                value: {
                    services: _.cloneDeep(this.services),
                }
            })
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },
        //保存图层选择配置
        saveDataSelect() {
            this.$store.commit("modifyValueByCompId", {
                attrs: [this.activeComp.compId, "data", "conf"],
                value: {
                    sevLayer: _.cloneDeep(this.layerEdit),
                }
            })
            try {
                this.$dm.clearErrorMsg()
                this.$compsBus.$emit('updateCompData',
                    {
                        compId: this.activeComp.compId,
                        changedLoadedData: false
                    }
                );
                let error = this.$dm.getErrorMsg();
                if (error.length != 0) {
                    this.$alert('加载数据失败。异常信息为' + error, '提示', {confirmButtonText: '确定',});
                } else {
                    this.$alert('加载数据成功', '提示', {confirmButtonText: '确定',});
                }
            } catch (e) {
                console.error('error:', e);
                this.$alert('加载数据失败。异常信息为' + e.message, '提示', {confirmButtonText: '确定',});
            }
        }
    }
}
</script>

<style scoped>
>>> .el-collapse-item {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    border-left: 5px solid #2bf;
}

.el-collapse-item__header > .h-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%
}
</style>
