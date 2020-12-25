<template>
    <div :style="style">
        <div :id="id" style="width:100%;height: 100%"></div>
        <component v-for="comp in compConf.style.proLayer" :key="comp.id" :is="comp.componentName"
                   @updateProLayer="updateGisProLayer" @clearProLayer="clearGisProLayer" :gisBase='globalMap'
                   :compConf="getCompConf(comp.id)" :ref="comp.id"></component>
        <component v-for="comp in compConf.style.vecLayer" :key="comp.id" :is="comp.componentName"
                   @updateVecLayer="updateGisVecLayer" @clearVecLayer="clearGisVecLayer"
                   :gisBase='globalMap' :compConf="getCompConf(comp.id)" :ref="comp.id"></component>
        <div :class="['legend',styleConf.legend.style==='ver'?'legend-vertical':'']" :style="legendStyle"
             v-if="styleConf.legend.show||legendShow">
            <h4 v-if="styleConf.legend.title" style="text-align: center">{{ styleConf.legend.titleText }}</h4>
            <el-row style="margin-top: 3px" v-for="lyk in legend.points" :key="lyk.id">
                <h4 class="ly-name">{{ lyk.name }}</h4>
                <div class="p-list" v-if="lyk.list.length>0">
                    <div class="point" v-for="p in lyk.list" :key="p.name">
                        <div v-if="p.name!==''" class="p-label">{{ p.name }}</div>
                        <div v-if="p.style.icon.iconType==='divIcon'" class="p-vec">
                            <div v-html="p.style.icon.options.html"
                                 :style="'width:'+p.style.icon.options.iconSize[0]+'px'+';height:'+p.style.icon.options.iconSize[1]+'px;'"></div>
                        </div>
                        <div v-else-if="p.style.icon.iconType==='pulseIcon'" class="p-vec">
                            <div
                                :style="'border-radius:50%;width:'+p.style.icon.options.iconSize[0]+'px'+';height:'+p.style.icon.options.iconSize[1]+'px;background:'+p.style.icon.options.fillColor"></div>
                        </div>
                        <div v-else class="p-img">
                            <img :src="p.style.icon.options.iconUrl" style="width:16px;height:16px"/>
                        </div>
                    </div>
                </div>
            </el-row>
            <el-row style="margin-top: 3px" v-for="lyk in legend.lines" :key="lyk.id">
                <h4 class="ly-name">{{ lyk.name }}</h4>
                <div class="p-list" v-if="lyk.list.length>0">
                    <div class="line" v-for="p in lyk.list" :key="p.name">
                        <div v-if="p.name!==''" class="line-label">{{ p.name }}</div>
                        <div class="line-shape">
                            <div
                                :style="'width:20px;height:'+p.style.weight+'px;opacity:'+p.style.opacity+';background:'+p.style.color"/>
                        </div>
                    </div>
                </div>
            </el-row>
            <el-row style="margin-top: 3px" v-for="lyk in legend.regions" :key="lyk.id">
                <h4 class="ly-name">{{ lyk.name }}</h4>
                <div class="p-list" v-if="lyk.list.length>0">
                    <div class="region" v-for="p in lyk.list" :key="p.name">
                        <div v-if="p.name!==''" class="region-label">{{ p.name }}</div>
                        <div class="region-shape">
                            <div
                                :style="'width:20px;height:15px;opacity:'+p.style.opacity+';background:'+p.style.fillColor"/>
                        </div>
                    </div>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
import GlobalMap from "./GisGlobal";
import AbstractGisComp from "@/compLib/commons/AbstractGisComp";
import {onlyUpdateAttr, previewUpdateAttr} from "@/components/props/edit/EditCompReg";
import {mapGetters, mapState} from "vuex";

export default {
    name: "BaseMap",
    mixins: [AbstractGisComp],
    data() {
        return {
            globalMap: null,
            map: null, epsg: '', data: [], themeLayer: null, proGisLayers: {}, vectorGisLayers: {},
            legend: {
                points: {},
                lines: {},
                regions: {},
            }
        }
    },
    computed: {
        ...mapGetters({previewStatus: 'getPreviewState'}),
        ...mapState(["components", "preview"]),
        compMap() {
            return this.previewStatus ? this.preview.components.value : this.components.compMap
        },
        id: function () {
            return 'smap' + this.compConf.compId
        },
        style: function () {
            return {
                width: this.compConf.box.width + "px",
                height: this.compConf.box.height + "px",
                background: this.styleConf.bgColor,
            };
        },
        legendStyle: function () {
            switch (this.styleConf.legend.position) {
                default:
                case'bl':
                    return {
                        bottom: 0,
                        left: 0,
                        width: this.styleConf.legend.width + "px",
                        height: this.styleConf.legend.height + "px",
                        backgroundColor : this.styleConf.legend.backgroundColor
                    }
                case'tl':
                    return {
                        top: 0,
                        left: 0,
                        width: this.styleConf.legend.width + "px",
                        height: this.styleConf.legend.height + "px",
                        backgroundColor : this.styleConf.legend.backgroundColor
                    }
                case'br':
                    return {
                        bottom: 0,
                        right: 0,
                        width: this.styleConf.legend.width + "px",
                        height: this.styleConf.legend.height + "px",
                        backgroundColor : this.styleConf.legend.backgroundColor
                    }
                case'tr':
                    return {
                        top: 0,
                        right: 0,
                        width: this.styleConf.legend.width + "px",
                        height: this.styleConf.legend.height + "px",
                        backgroundColor : this.styleConf.legend.backgroundColor
                    }
            }
        },
        legendShow: function () {
            return Object.keys(this.legend.points).length === 0 && Object.keys(this.legend.lines).length === 0 && Object.keys(this.legend.regions).length === 0
        }
    },
    created() {
        this.$nextTick(() => {
            this.createMap();
        })
    },
    methods: {
        getCompConf(compId) {
            return this.compMap[compId]
        },
        createMap() {
            if (this.globalMap) {
                this.globalMap.destroyMap(this.globalMap.map);
                this.globalMap = null;
            }
            this.globalMap = new GlobalMap(this.id, this.styleConf)
            this.map = this.globalMap.map;
            this.epsg = this.styleConf.epsg
            this.globalMap.compConf = this.compConf;
            this.globalMap.$evtBus = this.$evtBus;
            if (this.styleConf.tileLayers.length > 0) {
                this.processTileChange(true);
                this.globalMap.setView(this.styleConf);
                this.reCreateProLayer();
                this.reCreateVecLayer();
            }
            return this.map;
        },
        refreshMap() {
            this.legend = {
                points: {},
                lines: {},
                regions: {},
            }
            if (this.styleConf.epsg !== this.epsg) {
                this.createMap();
            } else {
                this.processTileChange(false);
                this.globalMap.processView(this.styleConf);
                this.reCreateProLayer();
                this.reCreateVecLayer();
            }
        },
        resize() {
            if (this.globalMap) {
                this.globalMap.setView(this.styleConf);
            }
        },
        //瓦片地图配置加载
        processTileChange(reload) {
            let tileConfs = this.styleConf.tileLayers;
            let ids = [];
            for (let i = 0; i < tileConfs.length; i++) {
                let conf = tileConfs[i];
                let layerObj = null;
                if (reload) {
                    layerObj = this.globalMap.addTileLayer(conf, {opacity: conf.opacity})
                } else {
                    if (!this.globalMap.tileLayers.hasOwnProperty(conf.id) && (['tdt', 'google', 'geoqB', 'geoqG', 'geoDe', 'supermapD'].indexOf(conf.source) !== -1)) {
                        layerObj = this.globalMap.addTileLayer(conf, {opacity: conf.opacity})
                    } else if (!this.globalMap.tileLayers.hasOwnProperty(conf.id) && conf.url !== '') {
                        layerObj = this.globalMap.addTileLayer(conf, {opacity: conf.opacity})
                    } else if (this.globalMap.tileLayers.hasOwnProperty(conf.id)) {
                        let oldLayer = this.globalMap.tileLayers[conf.id];
                        if (oldLayer.conf.url !== conf.url || oldLayer.conf.tileType !== conf.tileType || oldLayer.conf.source !== conf.source || oldLayer.conf.opacity !== conf.opacity) {
                            this.map.removeLayer(oldLayer)
                            delete this.globalMap.tileLayers[conf.id];
                            layerObj = this.globalMap.addTileLayer(conf, {opacity: conf.opacity});
                        }
                    }
                }
                //更新瓦片地图至VUEX
                if (layerObj) {
                    if (!this.$store.getters.getPreviewState) {
                        if (!conf.hasOwnProperty('id') || conf.id !== layerObj.id) {
                            onlyUpdateAttr(this.compConf.compId + ' tileLayers ' + i + ' id', layerObj.id)
                        } else if (conf.source !== layerObj.type && layerObj.type !== '') {
                            onlyUpdateAttr(this.compConf.compId + ' tileLayers ' + i + ' source', layerObj.type)
                        }
                    } else {
                        if (!conf.hasOwnProperty('id') || conf.id !== layerObj.id) {
                            previewUpdateAttr(this.compConf.compId + ' tileLayers ' + i + ' id', layerObj.id)
                        } else if (conf.source !== layerObj.type && layerObj.type !== '') {
                            previewUpdateAttr(this.compConf.compId + ' tileLayers ' + i + ' source', layerObj.type)
                        }
                    }
                }
                if (conf.hasOwnProperty('id')) {
                    ids.push(conf.id)
                }
            }
            for (let key in this.globalMap.tileLayers) {
                if (ids.indexOf(parseInt(key)) === -1) {
                    this.map.removeLayer(this.globalMap.tileLayers[key])
                    delete this.globalMap.tileLayers[key];
                }
            }
        },
        //重新创建专题图
        reCreateProLayer() {
            let oldExistLayer = Object.keys(this.proGisLayers);
            for (let i = 0; i < this.compConf.style.proLayer.length; i++) {
                let pro = this.compConf.style.proLayer[i]
                //删除隐藏的专题图层
                if (!pro.show && this.$refs[pro.id]) {
                    if (this.proGisLayers.hasOwnProperty(pro.id)) {
                        this.globalMap.map.removeLayer(this.proGisLayers[pro.id].layerObj)
                    }
                }
                //检查专题图层组件是否存在
                if (oldExistLayer.indexOf(pro.id) !== -1) {
                    oldExistLayer.splice(oldExistLayer.indexOf(pro.id), 1)
                }
            }
            //清理已删除的专题图层
            for (let i = 0; i < oldExistLayer.length; i++) {
                this.clearGisProLayer(this.proGisLayers[oldExistLayer[i]]);
                delete this.proGisLayers[oldExistLayer[i]]
            }
            //重新构建图层
            for (let i = 0; i < this.compConf.style.proLayer.length; i++) {
                let pro = this.compConf.style.proLayer[i]
                if (pro.show && this.$refs[pro.id]) {
                    this.$refs[pro.id][0].notifyBase();
                }
            }
        },
        //重新创建矢量图
        reCreateVecLayer() {
            let oldExistLayer = Object.keys(this.vectorGisLayers);
            for (let i = 0; i < this.compConf.style.vecLayer.length; i++) {
                let vec = this.compConf.style.vecLayer[i]
                //删除隐藏的专题图层
                if (!vec.show && this.$refs[vec.id]) {
                    if (this.vectorGisLayers.hasOwnProperty(vec.id)) {
                        this.globalMap.map.removeLayer(this.vectorGisLayers[vec.id].layerObj)
                    }
                }
                //检查专题图层组件是否存在
                if (oldExistLayer.indexOf(vec.id) !== -1) {
                    oldExistLayer.splice(oldExistLayer.indexOf(vec.id), 1)
                }
            }
            //清理已删除的专题图层
            for (let i = 0; i < oldExistLayer.length; i++) {
                this.clearGisVecLayer(this.vectorGisLayers[oldExistLayer[i]]);
                delete this.vectorGisLayers[oldExistLayer[i]]
            }
            //重新构建图层
            for (let i = 0; i < this.compConf.style.vecLayer.length; i++) {
                let vec = this.compConf.style.vecLayer[i]
                if (vec.show && this.$refs[vec.id]) {
                    this.$refs[vec.id][0].notifyBase();
                }
            }
        },
        //更新专题图层
        updateGisProLayer(proObj) {
            //清理旧图层 重新创建
            if (this.proGisLayers.hasOwnProperty(proObj.id)) {
                this.globalMap.map.removeLayer(this.proGisLayers[proObj.id].layerObj)
            }
            this.proGisLayers[proObj.id] = {
                id: proObj.id,
                layerId: proObj.layerObj.id,
                layerObj: proObj.layerObj
            }
            this.globalMap.map.addLayer(proObj.layerObj);
        },
        //更新矢量图层
        updateGisVecLayer(vecObj) {
            //清理旧图层 重新创建
            if (this.vectorGisLayers.hasOwnProperty(vecObj.id)) {
                this.globalMap.map.removeLayer(this.vectorGisLayers[vecObj.id].layerObj)
            }
            //矢量图层显隐状态同步
            for (let key in this.vectorGisLayers) {
                this.vectorGisLayers[key].show = false;
            }

            for (let key in this.vectorGisLayers) {
                for (let i = 0; i < this.compConf.style.vecLayer.length; i++) {
                    let vec = this.compConf.style.vecLayer[i]
                    //console.log(vec.id+"--->"+this.$refs[vec.id][0].showLayer)
                    if (this.$refs[vec.id] && key === vec.id) {
                        this.vectorGisLayers[key].show = this.$refs[vec.id][0].showLayer;
                    }
                }
            }
            if (this.vectorGisLayers.hasOwnProperty(vecObj.id)) {
                this.vectorGisLayers[vecObj.id].layerObj = vecObj.layerObj
                this.vectorGisLayers[vecObj.id].layerId = vecObj.layerObj.id
            } else {
                this.vectorGisLayers[vecObj.id] = {
                    id: vecObj.id,
                    type: vecObj.type,
                    layerId: vecObj.layerObj.id,
                    layerObj: vecObj.layerObj,
                    show: vecObj.show
                }
            }

            let show = false;
            let vec = this.compConf.style.vecLayer
            for (let i = 0; i < vec.length; i++) {
                if (vec[i].id === vecObj.id) {
                    show = vec[i].show;
                }
            }
            if (show && vecObj.show) {
                this.globalMap.map.addLayer(vecObj.layerObj);
                // if (vecObj.layerObj.getBounds && vecObj.layerObj.getBounds().isValid()) {
                //     this.globalMap.map.fitBounds(vecObj.layerObj.getBounds())
                // }
            }
            this.refreshLegend()
        },
        //图例绘制
        refreshLegend() {
            this.legend = {
                points: {},
                lines: {},
                regions: {},
            }
            for (let key in this.vectorGisLayers) {
                let styleObj = this.$refs[key][0].getStyleObj()
                let show = this.$refs[key][0].showLayer
                if (styleObj && styleObj.list.length > 0 && show) {
                    let type = styleObj.type;
                    if (type === 'Point') {
                        this.$set(this.legend.points, key, styleObj)
                    } else if (type === 'Line') {
                        this.$set(this.legend.lines, key, styleObj)
                    } else if (type === 'Region') {
                        this.$set(this.legend.regions, key, styleObj)
                    }
                }
            }
        },
        //专题图层因配置变化创建失败时 从地图中移除该图层
        clearGisProLayer(proObj) {
            if (this.proGisLayers.hasOwnProperty(proObj.id)) {
                this.globalMap.map.removeLayer(this.proGisLayers[proObj.id].layerObj)
            }
        },
        //矢量图层因配置变化创建失败时 从地图中移除该图层
        clearGisVecLayer(vecObj) {
            if (this.vectorGisLayers.hasOwnProperty(vecObj.id)) {
                this.globalMap.map.removeLayer(this.vectorGisLayers[vecObj.id].layerObj)
                this.vectorGisLayers[vecObj.id].show = false;
                this.refreshLegend()
            }
        },
        updateChildData(chid, param) {
            this.$refs[chid][0].updateCompData(param.changedLoadedData);
        },
        linkageConfChanged() {
            if (this.globalMap) {
                this.globalMap.compConf = this.compConf;
            }
        },
        styleConfChanged() {
            if (!this.$store.getters.getPreviewState) {
                this.refreshMap();
            }
        },
    }
}
</script>
<style lang="scss">
.leaflet-container {
    background: transparent;
}

.dark-tip {
    &.leaflet-tooltip-left:before {
        border-left-color: #0b2433;
    }

    &.leaflet-tooltip-right:before {
        border-right-color: #0b2433;
    }

    &.leaflet-tooltip-top:before {
        border-top-color: #0b2433;
    }

    &.leaflet-tooltip-bottom:before {
        border-bottom-color: #0b2433;
    }

    &.leaflet-tooltip {
        background-color: rgba(10, 20, 30, 0.8);
        border: none;
        color: #fff
    }
}
</style>
<style lang="scss" scoped>
.border {
    clip-path: polygon(0 0, calc(100% - 50px) 0, 100% 40px, 100% 100%,
        42px 100%, 0 calc(100% - 42px));
}


.legend {
    position: absolute;
    z-index: 900;
    background: rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    padding: 5px;
    overflow-y: auto;
    color: #fff;

    .ly-name {
        font-size: 12px;
    }

    &::-webkit-scrollbar {
        /* 滚动条整体样式 */
        width: 5px;
        /* 高宽分别对应横竖滚动条的尺寸 */
        height: 5px;
        background-color: rgba(0, 0, 0, 0) !important;
    }

    &::-webkit-scrollbar-thumb {
        /* 滚动条里面小方块 */
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
        background-color: rgba(0, 0, 0, 0) !important;
    }

    &::-webkit-scrollbar-track {
        /* 滚动条里面轨道 */
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
        border-radius: 0;
        background-color: rgba(0, 0, 0, 0) !important;
    }

    .p-list {
        font-size: 12px;
        display: flex;
        flex-wrap: wrap;
        justify-items: auto;
        align-items: center;

        .point {
            min-width: 30px;

            margin: 5px;
            text-align: center;
            color: #fff;
            font-size: 10px;

            .p-label {
                text-align: center;
            }

            .p-img {
                margin-top: 3px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .p-vec {
                min-width: 40px;
                margin-top: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .line {
            min-width: 30px;
            height: 30px;
            margin: 5px;
            text-align: center;
            color: #fff;
            font-size: 10px;

            .line-label {
                text-align: center;
            }

            .line-shape {
                height: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .region {
            min-width: 30px;
            height: 30px;
            margin: 5px;
            text-align: center;
            color: #fff;
            font-size: 10px;

            .region-label {
                text-align: center;
            }

            .region-shape {
                height: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}


.legend-vertical {
    .p-list {
        display: block;

        .point {
            display: flex;
            align-items: center;
            min-width: 30px;

            margin: 5px;
            text-align: center;
            color: #fff;
            font-size: 10px;
            justify-content: space-between;

            .p-label {
                margin-right: 5px;
                text-align: left;
            }

            .p-img {
                margin-top: 3px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .p-vec {
                margin-top: 3px;
                min-width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .line {
            display: flex;
            align-items: center;
            min-width: 30px;
            height: 25px;
            text-align: center;
            color: #fff;
            font-size: 10px;
            justify-content: space-between;

            .line-label {
                margin-right: 5px;
                text-align: left;
            }

            .line-shape {
                height: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .region {
            display: flex;
            align-items: center;
            min-width: 30px;
            height: 25px;
            text-align: center;
            color: #fff;
            font-size: 10px;
            justify-content: space-between;

            .region-label {
                margin-right: 5px;
                text-align: left;
            }

            .region-shape {
                height: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>
