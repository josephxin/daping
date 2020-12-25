<template>
    <el-button @click="manageUpDrill" style="position: absolute;top:10px;right:10px;z-index:9999"
               type="primary" icon="el-icon-back" size="mini"
               v-if="drillEnable&&this.layerObj&&this.layerObj.index>topIndex">返回
    </el-button>
</template>

<script>
import AbstractGisComp from "@/compLib/commons/AbstractGisComp";
import * as L from "leaflet";
import util from "@/util/util";

export default {
    name: "regionVector",
    mixins: [AbstractGisComp],
    data() {
        return {
            rStyles: null,
            topIndex: 1000,
            themes: [],
            refType: '',
            clickStyle: {},
            hoverStyle: {},
            gisData: [],
            data: [],
            layerObj: null,
            drillEnable: false,
            drillField: "",
            defaultParams: null,
            showLayer: true
        }
    },
    created() {
        this.showLayer = this.styleConf.defaultShowLayer
        this.processStyle(this.styleConf.refType);
    },
    methods: {
        styleConfChanged() {
            if (this.refType !== this.styleConf.refType) {
                this.rStyles = null
                this.refType = this.styleConf.refType;
            }
            this.processStyle(this.styleConf.refType)
            this.notifyBase();
        },
        async convertChartData(data) {
            this.drillEnable = false;
            if (this.compConf.data.datasource.type === 'dataset') {
                let geoData = this._convertDatasetToGeoJson(data)
                for (let j = 0; j < geoData.length; j++) {
                    let has = false;
                    for (let i = 0; i < this.data.length; i++) {
                        if (this.data[i].name === geoData[j].name) {
                            this.data[i] = geoData[j];
                            has = true;
                        }
                    }
                    if (!has) {
                        this.data.push(geoData[j]);
                    }
                }
            } else if (this.compConf.data.datasource.type === 'gisServer') {
                let dataConf = _.cloneDeep(this.compConf.data.conf.sevLayer);
                this.data = await this.loadGisFeat(dataConf);
            } else if (this.compConf.data.datasource.type === 'gisSet') {
                let dataConf = _.cloneDeep(this.compConf.data.conf.sevLayer);
                if (dataConf && dataConf.layerObj && dataConf.layerObj.length > 0) {
                    this.gisData = await this.loadGisFeat(dataConf);
                }
                if (this.dataConf.datasetSelectedIds.length > 0) {
                    if (this.dataConf[this.dataConf.datasetSelectedIds[0]]) {
                        let propsField = this.dataConf[this.dataConf.datasetSelectedIds[0]].properties;
                        let refGisField = this.dataConf[this.dataConf.datasetSelectedIds[0]].refGisField;
                        let refSetField = this.dataConf[this.dataConf.datasetSelectedIds[0]].refSetField;
                        if (propsField && propsField.length > 0 && refGisField && refSetField) {
                            if (propsField.indexOf(refSetField) === -1) {
                                this.$message({
                                    type: 'error',
                                    message: '数据集中不包含关联字段，请重新选择'
                                })
                            }
                            this.data = this.relDataToSet(data, propsField, refGisField, refSetField)
                        }
                    }
                }
            } else {
                this.data = data;
            }
            this.notifyBase();
            this.bindEvent();
        },
        async loadGisFeat(dataConf) {
            dataConf.layerObj.sort((a, b) => {
                return a.index >= b.index ? 1 : -1;
            })
            this.defaultParams = dataConf.defaultParams;
            let requests = [];
            let hasDrillField = true;
            for (let i = 0; i < dataConf.layerObj.length; i++) {
                let o = dataConf.layerObj[i];
                let url = o.url;
                let selectedFields = _.cloneDeep(o.selectedFields)
                let params = {}
                let gisParams = {
                    datasource: o.datasource,
                    name: o.name
                }
                if (selectedFields.indexOf("*") !== -1) {
                    params.outFields = '*'
                    let originFields = await this.gisBase.fieldsService(url,gisParams)
                    gisParams.fields = originFields
                } else {
                    let fields = selectedFields.join(",")
                    params.outFields = fields
                   gisParams.fields = selectedFields
                }
                if (selectedFields.indexOf(dataConf.serverObj.drillField) === -1) {
                    hasDrillField = false;
                }
                // let fields = selectedFields.join(",")
                if (dataConf.serverObj.type === 'sm') {
                    let request = this.gisBase.queryGisDataSm(url, gisParams)
                    requests.push(request)
                } else {
                    let request = this.gisBase.queryGisData(url, params)
                    requests.push(request)
                }
            }
            if (hasDrillField && dataConf.layerObj.length >= 2 && dataConf.serverObj.enableDrill && !_.isEmpty(dataConf.serverObj.drillField)) {
                this.drillEnable = true;
                this.drillField = dataConf.serverObj.drillField
            }
            //GISserver数据加载
            return await Promise.all(requests).then(([...resp]) => {
                let layers = [];
                this.topIndex = dataConf.layerObj[0].index
                for (let i = 0; i < resp.length; i++) {
                    let layer = {
                        type: 'Region',
                        index: dataConf.layerObj[i].index,
                        datasetMeta: [],
                        name: dataConf.layerObj[i].name,
                        feats: resp[i].features
                    }
                    for (let j = 0; j < dataConf.layerObj[i].fields.length; j++) {
                        if (dataConf.layerObj[i].selectedFields.indexOf(dataConf.layerObj[i].fields[j].name) !== -1 || dataConf.layerObj[i].selectedFields.indexOf('*') !== -1) {
                            layer.datasetMeta.push(dataConf.layerObj[i].fields[j])
                        }
                    }
                    layers.push(layer)
                }
                return layers;
            });
        },
        processStyle(refType) {
            this.clickStyle = this.styleConf.clickStyle;
            this.hoverStyle = this.styleConf.hoverStyle
            let styles = {
                'unique': {index: 0, style: []},
                'clazz': {},
                'range': {}
            }
            switch (refType) {
                case"unique":
                    styles.unique.style = this._styleParser(this.styleConf.refInfo.regionStyles, refType)
                    break;
                case"clazz":
                    styles.clazz = this._styleParser(this.styleConf.refInfo.class, refType)
                    break;
                case"range":
                    styles.range = this._styleParser(this.styleConf.refInfo.seg, refType)
                    break;
            }
            this.rStyles = styles;
        },
        //样式配置转样式对象
        _styleParser(styles, refType) {
            let rStyles;
            if (refType === "unique") {
                rStyles = [];
            } else {
                rStyles = {};
            }
            let i = 0;
            if (refType === 'click' || refType === "hover") {
                rStyles[refType] = {
                    fillColor: styles[0].fillColor,
                    fillOpacity: styles[0].fillOpacity,
                    opacity: styles[0].opacity,
                    weight: styles[0].weight,
                    color: styles[0].color,
                }
                return rStyles;
            }
            let colors = this.getColorsByCount(styles.length)
            if (colors && colors.length > 0) {
                styles.forEach((style) => {
                    let rStyle = {
                        fillColor: colors[i],
                        fillOpacity: style.opacity,
                        opacity: style.opacity,
                        weight: style.weight,
                        color: style.color,
                    }
                    rStyle.bkStyle = rStyle;
                    if (refType === "unique") {
                        rStyles.push(rStyle)
                    } else if (refType === "clazz") {
                        rStyle.clz = style.clz;
                        rStyles[rStyle.clz] = rStyle
                    } else if (refType === "range") {
                        rStyle.f = style.f;
                        rStyle.t = style.t;
                        rStyles[`${rStyle.f}-${rStyle.t}`] = rStyle
                    } else {
                        rStyles[refType] = rStyle;
                    }
                    i++;
                })
            }
            return rStyles;
        },
        //根据属性计算样式
        _calcStyle(refType, ref, properties) {
            if (!ref || ref === '' || !properties.hasOwnProperty(ref)) {
                return null;
            }
            let val = properties[ref];
            if (refType === 'unique') {
                let filters = this.styleConf.refInfo.filters.split(",")
                if (val === '' || filters.indexOf(val) === -1) {
                    let uniqueStyle = this.rStyles.unique;
                    if (uniqueStyle.style.length > 0) {
                        if (uniqueStyle.index < uniqueStyle.style.length) {
                            let style = uniqueStyle.style[uniqueStyle.index]
                            uniqueStyle.index = uniqueStyle.index + 1;
                            return style;
                        } else {
                            uniqueStyle.index = 0;
                            return uniqueStyle.style[uniqueStyle.index]
                        }
                    }
                }
            } else if (refType === "clazz") {
                let clazzStyle = this.rStyles.clazz;
                if (Object.keys(clazzStyle).length > 0) {
                    for (let key in clazzStyle) {
                        if (val === key) {
                            return clazzStyle[key]
                        }
                    }
                }
            } else if (refType === "range") {
                let rangeStyles = this.rStyles.range;
                val = parseFloat(val)
                if (Object.keys(rangeStyles).length > 0) {
                    let st = null;
                    for (let key in rangeStyles) {
                        if (st) {
                            break;
                        }
                        let f = parseFloat(key.split("-")[0]);
                        let t = parseFloat(key.split("-")[1]);
                        if (f <= t) {
                            st = (val >= f && val < t) ? rangeStyles[key] : null
                        } else {
                            st = (val >= t && val < f) ? rangeStyles[key] : null
                        }
                    }
                    return st;
                }
            }
            return null;
        },
        //颜色数组计算
        getColorsByCount(count) {
            if (this.styleConf.themes && this.styleConf.themes.length > 0) {
                if (this.styleConf.themes.length >= count) {
                    return _.cloneDeep(this.styleConf.themes).splice(0, count);
                } else {
                    let originColors = []
                    for (let i = 0; i < this.styleConf.themes.length; i++) {
                        originColors.push(this.styleConf.themes[i])
                    }
                    let fillCount = count - originColors.length;
                    let fills = _.cloneDeep(originColors).splice(0, fillCount)
                    return [...originColors, ...fills]
                }
            }
            return null;
        },
        rgbToArr(rgb) {
            if (typeof rgb === 'string') {
                rgb = rgb.replace(/\s+/g, "");
                rgb = (/rgb?\((.*?)\)/.exec(rgb) || ['', '0,0,0'])[1].split(',')
                return {
                    r: Number(rgb[0]) || 0,
                    g: Number(rgb[1]) || 0,
                    b: Number(rgb[2]) || 0,
                }
            } else {
                return rgb
            }
        },
        //图层构建
        buildRegionVector(ds) {
            let refType = this.styleConf.refType;
            let refKey = this.styleConf.ref;
            //动态属性字段绑定
            if (this.styleConf.dynamicRef) {
                refKey = this.convertExpression(this.styleConf.ref);
                if (refKey.indexOf("${") !== -1) {
                    if (this.defaultParams) {
                        refKey = this.convertExpression(this.defaultParams)
                    }
                }
            }
            let layerName = this.styleConf.name;
            let ts = this;
            let feats = ds.feats;
            let lg = L.geoJSON({type: 'FeatureCollection', features: feats}, {
                onEachFeature: (feat, layer) => {
                    layer.properties = feat.properties
                }
            });
            lg.id = util.guid();
            lg.index = ds.index
            lg.name = layerName && layerName !== '' ? layerName : ("line_" + util.guid());
            let layerNotAdd = [];
            lg.eachLayer((layer) => {
                let style = ts._calcStyle(refType, refKey, layer.properties)
                if (!style) {
                    layerNotAdd.push(layer)
                    return;
                }
                layer.setStyle(style)
                let tooltipContent = ts.generateTipContent(layer.properties);
                if (tooltipContent && tooltipContent !== '') {
                    layer.bindTooltip(tooltipContent, {sticky: true, direction: 'auto', className: 'dark-tip'})
                }
                layer.on('click', (e) => {
                    this.featClick(ts, e)
                });
                layer.on('mouseover', (e) => {
                    this.featHover(ts, e)
                })
                layer.on('mouseout', (e) => {
                    this.featStatusClean(ts, e)
                })
                layer._group = lg;
            })
            for (let i = 0; i < layerNotAdd.length; i++) {
                lg.removeLayer(layerNotAdd[i])
            }
            if (lg._layers.length === 0) {
                return null;
            }
            return lg;
        },
        generateTipContent(properties) {
            if (this.styleConf.tooltip.items.length === 0) {
                return null;
            }
            let tooltipItems = this.styleConf.tooltip.items;
            let tip = '<div style="padding: 10px;width: auto">';
            let items = {}
            for (let i = 0; i < tooltipItems.length; i++) {
                let tooltipItem = tooltipItems[i];
                items[tooltipItem.ref] = tooltipItem.refAlias;
            }
            //构建tooltip内容
            let refKey = this.styleConf.ref;
            if (this.styleConf.dynamicRef) {
                refKey = this.convertExpression(this.styleConf.ref);
            }
            for (let key in properties) {
                let dynamicKey;
                //表达式字段检查
                if (key === refKey) {
                    dynamicKey = this.styleConf.ref;
                }
                if (items.hasOwnProperty(key) || items.hasOwnProperty(dynamicKey)) {
                    let alias = items[key] && items[key] !== '' ? items[key] : key
                    if (items.hasOwnProperty(dynamicKey)) {
                        alias = items[dynamicKey];
                    }
                    tip += `<div style="display: flex">
                               <div style="max-width:140px;text-align: right">${alias.toUpperCase()}：</div>
                               <div style="text-align: left">${properties[key]}</div>
                               </div>`
                }
            }
            tip += '</div>'
            return tip;
        },
        featClick(that, e) {
            that.loadLinkage(e.target.properties)
            if (this.clickStyle && this.clickStyle.enable) {
                let hasSelected = null
                //还原其他要素状态并记录当前要素选中状态
                e.target._group.eachLayer((layer) => {
                    layer.setStyle(layer.options.bkStyle)
                    if (layer.selected) {
                        hasSelected = layer;
                    }
                })
                if (e.target.selected) {
                    e.target.selected = false;
                    return;
                }
                if (hasSelected && hasSelected._leaflet_id !== e.target._leaflet_id) {
                    hasSelected.selected = false;
                }
                //记录点击前样式
                let styleSelect = this._styleParser([this.clickStyle], "click")
                let {weight, color, opacity, dashArray, dashOffset} = e.target.options;
                styleSelect.click.bkClickStyle = {weight, color, opacity, dashArray, dashOffset};
                styleSelect.click.bkStyle = {
                    weight: e.target.options.bkStyle.weight,
                    color: e.target.options.bkStyle.color,
                    opacity: e.target.options.bkStyle.opacity,
                    filOpacity: e.target.options.bkStyle.filOpacity,
                    fillColor: e.target.options.bkStyle.fillColor,
                }
                e.target.setStyle(styleSelect.click);
                e.target.selected = true;
            }
            if (that.drillEnable) {
                let code = e.target.properties[that.drillField];
                let currentIndex = e.target._group.index;
                that.manageDownDrill(code, currentIndex);
            }
        },
        featHover(that, e) {
            if (this.hoverStyle && this.hoverStyle.enable) {
                //还原其他要素状态并记录当前要素选中状态
                e.target._group.eachLayer((layer) => {
                    if (layer.selected) {
                        return;
                    }
                    layer.setStyle(layer.options.bkStyle)
                    layer.closeTooltip();
                })
                if (e.target.selected) {
                    return;
                }
                let styleSelect = this._styleParser([this.hoverStyle], "hover")
                //记录悬浮前样式
                let {weight, color, opacity, dashArray, dashOffset} = e.target.options;
                styleSelect.hover.bkHoverStyle = {weight, color, opacity, dashArray, dashOffset};
                styleSelect.hover.bkStyle = {
                    weight: e.target.options.bkStyle.weight,
                    color: e.target.options.bkStyle.color,
                    opacity: e.target.options.bkStyle.opacity,
                    filOpacity: e.target.options.bkStyle.filOpacity,
                    fillColor: e.target.options.bkStyle.fillColor,
                }
                if (this.styleConf.tooltip && this.styleConf.tooltip.enable) {
                    e.target.openTooltip();
                }
                e.target.setStyle(styleSelect.hover);
            }
        },
        featStatusClean(that, e) {
            e.target._group.eachLayer((layer) => {
                if (layer.selected) {
                    return;
                }
                layer.setStyle(layer.options.bkStyle)
                layer.closeTooltip();
            })
        },
        //下钻
        manageDownDrill(code, index) {
            let nextIndex = index + 1;
            let dataNext = null
            //层级检查
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].index === nextIndex) {
                    dataNext = this.data[i]
                }
            }
            if (!dataNext) {
                return;
            }
            let nextCode = code.substr(0, 2 * (index))
            let filteredData = {
                name: dataNext.name,
                type: 'Region',
                index: dataNext.index,
                feats: [],
            };
            this._updateDataMeta(dataNext.datasetMeta)
            //根据上层code及层级索引查找筛选下层数据
            for (let i = 0; i < dataNext.feats.length; i++) {
                let code = dataNext.feats[i].properties[this.drillField];
                if (code.substr(0, nextCode.length) === nextCode) {
                    filteredData.feats.push(dataNext.feats[i])
                }
            }
            this.layerObj = this.buildRegionVector(filteredData);
            if (this.layerObj) {
                this.$emit("updateVecLayer", {id: this.compConf.compId, type: 'region', layerObj: this.layerObj})
            } else {
                this.$emit('clearVecLayer', {id: this.compConf.compId})
            }
        },
        //上钻
        manageUpDrill() {
            if (!this.layerObj) {
                return;
            }
            //层级检查
            let index = this.layerObj.index;
            if ((index - 1) < 0) {
                return;
            }
            //根据下层code及层级索引查找数据
            let code = this.layerObj.getLayers()[0].properties[this.drillField]
            let dataPre = null;
            let nextIndex = index - 1;
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].index === nextIndex) {
                    dataPre = this.data[i]
                }
            }
            if (!dataPre) {
                return;
            }
            let preCode = code.substr(0, 2 * (index - 2))
            let filteredData = {
                name: dataPre.name,
                type: 'Region',
                index: dataPre.index,
                feats: [],
            };
            //根据CODE 筛选数据 如从省找到国家
            this._updateDataMeta(dataPre.datasetMeta)
            for (let i = 0; i < dataPre.feats.length; i++) {
                if (nextIndex === this.topIndex) {
                    filteredData.feats = dataPre.feats;
                    break;
                }
                let code = dataPre.feats[i].properties[this.drillField];
                if (code.substr(0, preCode.length) === preCode) {
                    filteredData.feats.push(dataPre.feats[i])
                }
            }
            this.layerObj = this.buildRegionVector(filteredData);
            if (this.layerObj) {
                this.$emit("updateVecLayer", {id: this.compConf.compId, type: 'region', layerObj: this.layerObj})
            } else {
                this.$emit('clearVecLayer', {id: this.compConf.compId})
            }
        },
        //更新数据元数据 提供事件数据绑定依据
        _updateDataMeta(meta) {
            //不同的状态下更新到不同的store中
            if (!this.$store.getters.getPreviewState) {
                this.$store.commit("modifyValueByCompId", {
                    attrs: [this.compConf.compId, "data", "conf", "datasetMeta"],
                    value: meta
                })
            } else {
                this.$store.commit('modifyValueByGIS', {
                    attrs: [this.compConf.compId, "data", "conf", "datasetMeta"],
                    value: meta
                })
            }
        },
        notifyBase() {
            if (this.gisBase) {
                if (this.data && this.data.length > 0) {
                    //数据上图
                    let ds = this.data[0]
                    if (this.compConf.data.datasource.type === 'gisServer') {
                        //更新数据元数据 提供事件数据绑定依据
                        this._updateDataMeta(ds.datasetMeta)
                    }
                    this.layerObj = this.buildRegionVector(ds);
                } else {
                    this.layerObj = null;
                }
                if (this.layerObj) {
                    this.$emit("updateVecLayer", {
                        id: this.compConf.compId,
                        type: 'region',
                        layerObj: this.layerObj,
                        show: this.showLayer,
                    })
                } else {
                    this.$emit('clearVecLayer', {id: this.compConf.compId, show: this.showLayer})
                }
            }
        },
        //获取样式列表 提供给地图容器进行图例渲染
        getStyleObj() {
            if (!this.styleConf.legend || !this.layerObj) {
                return null
            }
            let styles = this.rStyles[this.styleConf.refType];
            let styleList = [];
            if (styles.hasOwnProperty('style') && styles.hasOwnProperty('index')) {
                for (let i = 0; i < styles.style.length; i++) {
                    styleList.push({
                        name: "",
                        style: styles.style[i]
                    })
                }
            } else {
                for (let key in styles) {
                    styleList.push({
                        name: key,
                        style: styles[key]
                    })
                }
            }
            return {
                id: this.layerObj.id,
                name: this.compConf.name,
                type: 'Region',
                list: styleList
            }
        },
        bindEvent() {
            if (!this.compConf.linkage) {
                return;
            }
            if (this.compConf.linkage.linkRevEvents) {
                let evtRevList = this.compConf.linkage.linkRevEvents;
                for (let i = 0; i < evtRevList.length; i++) {
                    let evtRevObj = evtRevList[i];
                    let evtType = evtRevObj.evtName.split(":")[1]
                    if (evtType === 'click') {
                        this._clickByLinkAge(evtRevObj)
                    }
                }
            }
        },
        //显隐控制
        toggleShow(ctrl, show) {
            //初始化图层对象
            if (!this.layerObj) {
                if (this.gisBase) {
                    if (this.data && this.data.length > 0) {
                        let ds = this.data[0]
                        this._updateDataMeta(ds.datasetMeta)
                        this.layerObj = this.buildRegionVector(ds);
                    }
                }
            }
            if (this.layerObj) {
                if (ctrl && show) {
                    this.$emit("updateVecLayer", {
                        id: this.compConf.compId,
                        type: 'region',
                        layerObj: this.layerObj,
                        show: true,
                        toggle: true
                    })
                } else if (ctrl && !show) {
                    this.$emit('clearVecLayer', {id: this.compConf.compId, show: false, toggle: true})
                } else {
                    //未被控制显隐 走正常加载逻辑
                    this.notifyBase();
                }
            }
        },
        //点击事件
        _clickByLinkAge(evtRevObj) {
            this.$evtBus.on(evtRevObj, (e) => {
                if (this.styleConf.dynamicRef) {
                    this.updateRefKey(e)
                }
            })
        },
        updateRefKey(e) {
            let data = []
            e.refData.forEach(item => {
                let operationType = item.cond
                let bindMapperColumn = item.to.split('$')[1]
                let value = e.data[item.from.split('$')[1]]
                data.push({
                    operationType, bindMapperColumn, value
                })
            })
            let evt = {
                target: e.target,
                source: e.source,
                name: e.name,
                data,
                sourceData: e.data
            }
            let payload = {}
            payload[this.compConf.compId] = {[`${e.name}`]: evt}
            this.$store.commit('setLinkage', payload)
            let show = e.switchVisible && e.switchVisible[this.compConf.compId] && e.switchVisible.hasOwnProperty(this.compConf.compId)
            if (e.ctrlShow) {
                this.showLayer = show
            }
            this.toggleShow(e.ctrlShow, show)
        },
        linkageConfChanged() {
            if (!this.$store.getters.getPreviewState) {
                this.bindEvent()
            }
        },
        loadLinkage(props) {
            if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === 'click' && evtObj.explosive) {
                        let eventObj = {
                            data: props,
                        };
                        this.$evtBus.emit(evtObj.evtName, eventObj);
                    }
                }
            }
        },
    }
}
</script>

<style scoped>
>>> .el-button {
    background: #00e5ff;
}


</style>
