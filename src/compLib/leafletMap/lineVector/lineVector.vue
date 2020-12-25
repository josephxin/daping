<template>

</template>

<script>
import AbstractGisComp from "@/compLib/commons/AbstractGisComp";
import * as L from "leaflet";
import util from "@/util/util";

export default {
    name: "lineVector",
    mixins: [AbstractGisComp],
    data() {
        return {
            lStyles: null,
            refType: '',
            clickStyle: {},
            hoverStyle: {},
            data: [],
            gisData: [],
            layerObj: null,
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
                this.lStyles = null;
                this.refType = this.styleConf.refType;
            }
            this.processStyle(this.styleConf.refType)
            this.notifyBase();
        },
        //数据转换逻辑
        async convertChartData(data) {
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
                this.data = await this.loadGisServer('Line');
            } else if (this.compConf.data.datasource.type === 'gisSet') {
                let dataConf = _.cloneDeep(this.compConf.data.conf.sevLayer);
                if (dataConf && dataConf.layerObj && dataConf.layerObj.length > 0) {
                    this.gisData = await this.loadGisServer('Line');
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
                    styles.unique.style = this._styleParser(this.styleConf.refInfo.lineStyles, refType)
                    break;
                case"clazz":
                    styles.clazz = this._styleParser(this.styleConf.refInfo.class, refType)
                    break;
                case"range":
                    styles.range = this._styleParser(this.styleConf.refInfo.seg, refType)
                    break;
            }
            this.lStyles = styles;
        },
        //图层要素构建
        buildLineVector(ds) {
            let refType = this.styleConf.refType;
            let refKey = this.styleConf.ref;
            //动态字段绑定检查
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
        //根据属性计算样式
        _calcStyle(refType, ref, properties) {
            if (!ref || ref === '' || !properties.hasOwnProperty(ref)) {
                return null;
            }
            let val = properties[ref];
            if (refType === 'unique') {
                let filters = this.styleConf.refInfo.filters.split(",")
                if (val === '' || filters.indexOf(val) === -1) {
                    let uniqueStyle = this.lStyles.unique;
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
                let clazzStyle = this.lStyles.clazz;
                if (Object.keys(clazzStyle).length > 0) {
                    for (let key in clazzStyle) {
                        if (val === key) {
                            return clazzStyle[key]
                        }
                    }
                }
            } else if (refType === "range") {
                let rangeStyles = this.lStyles.range;
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
        //样式配置转样式对象
        _styleParser(styles, refType) {
            let lStyles;
            if (refType === "unique") {
                lStyles = [];
            } else {
                lStyles = {};
            }
            styles.forEach((style) => {
                let lStyle = {
                    opacity: style.opacity,
                    weight: style.weight,
                    color: style.color,
                }
                if (style.dashArray) {
                    lStyle.dashArray = style.dashArray;
                }
                if (style.dashOffset) {
                    lStyle.dashOffset = style.dashOffset;
                }
                lStyle.bkStyle = lStyle;
                if (refType === "unique") {
                    lStyles.push(lStyle)
                } else if (refType === "clazz") {
                    lStyle.clz = style.clz;
                    lStyles[lStyle.clz] = lStyle
                } else if (refType === "range") {
                    lStyle.f = style.f;
                    lStyle.t = style.t;
                    lStyles[`${lStyle.f}-${lStyle.t}`] = lStyle
                } else {
                    lStyles[refType] = lStyle;
                }
            })
            return lStyles;
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
                let styleSelect = this._styleParser([this.clickStyle], "click")
                //原始样式备份
                let {weight, color, opacity, dashArray, dashOffset} = e.target.options;
                styleSelect.click.bkClickStyle = {weight, color, opacity, dashArray, dashOffset};
                styleSelect.click.bkStyle = {
                    weight: e.target.options.bkStyle.weight,
                    color: e.target.options.bkStyle.color,
                    opacity: e.target.options.bkStyle.opacity,
                    dashArray: e.target.options.bkStyle.dashArray,
                    dashOffset: e.target.options.bkStyle.dashOffset
                }
                e.target.setStyle(styleSelect.click);
                e.target.selected = true;
            }
        },
        featHover(that, e) {
            if (this.hoverStyle && this.hoverStyle.enable) {
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
                //原始样式备份
                let {weight, color, opacity, dashArray, dashOffset} = e.target.options;
                styleSelect.hover.bkHoverStyle = {weight, color, opacity, dashArray, dashOffset};
                styleSelect.hover.bkStyle = {
                    weight: e.target.options.bkStyle.weight,
                    color: e.target.options.bkStyle.color,
                    opacity: e.target.options.bkStyle.opacity,
                    dashArray: e.target.options.bkStyle.dashArray,
                    dashOffset: e.target.options.bkStyle.dashOffset
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
                    let ds = this.data[0]
                    if (this.compConf.data.datasource.type === 'gisServer') {
                        //更新数据元数据 提供事件数据绑定依据
                        this._updateDataMeta(ds.datasetMeta)
                    }
                    this.layerObj = this.buildLineVector(ds);
                } else {
                    this.layerObj = null;
                }
                if (this.layerObj) {
                    this.$emit("updateVecLayer", {
                        id: this.compConf.compId,
                        show: this.showLayer,
                        type: 'line',
                        layerObj: this.layerObj
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
            let styles = this.lStyles[this.styleConf.refType];
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
                type: 'Line',
                list: styleList
            }
        },
        linkageConfChanged() {
            if (!this.$store.getters.getPreviewState) {
                this.bindEvent()
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
            if (!this.layerObj) {
                if (this.gisBase) {
                    if (this.data && this.data.length > 0) {
                        let ds = this.data[0]
                        this.layerObj = this.buildPointVector(ds);
                    }
                }
            }
            if (this.layerObj) {
                if (ctrl && show) {
                    this.$emit("updateVecLayer", {
                        id: this.compConf.compId,
                        type: 'line',
                        layerObj: this.layerObj,
                        show: true,
                        toggle: true
                    })
                } else if (ctrl && !show) {
                    this.$emit('clearVecLayer', {id: this.compConf.compId, show: false, toggle: true})
                } else {
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

</style>
