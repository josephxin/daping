import store from '@/store/store'
import util from '@/util/util'
import Simple2D from './Simple2D'
import cloud from './cloud'
import Simple2D1 from './Simple2D1'
import Simple1D from './Simple1D'
import text from './text'
import date from './date'
import timeAxis from './timeAxis'
import SingleData from './SingleData'
import worldMap from './worldMap'
import heatJson from "./heatJson";
import trackPointJson from "./trackPointJson";
import pointJson from "./pointJson";
import lineJson from "./lineJson";
import regionJson from "./regionJson";
import strengthJson from "./strengthJson";
import simpleSurface from "./simpleSurface";
import DataSet from "./DataSet"
import DataSetOnlyIndicator from "./DataSetOnlyIndicator"
import DataObjectArray from "./DataObjectArray"
import tab from "./tab"
import indicatorOne from './indicatorOne'
import indicatorTwo from './indicatorTwo'
import dataSetSimpleOneDimensions from "./dataSetSimpleOneDimensions"
import dataSetOneDimensionRecordOne from "./DataSetOneDimensionRecordOne"
import url from "./url"
import graph from "./graph"
import tree from "./tree"
import boxplot from "./boxplot"
import bubble from "./bubble"
import towDimensionAndIndis from "./towDimensionAndIndis"
var TempDataReg = function() {
    var _tempDataReg = {};
    var _tempdatasetMetaReg = {};
    var _parseTemp = function(temp) {
        _tempDataReg[temp.code] = temp.data
        _tempdatasetMetaReg[temp.code] = temp.datasetMeta ? temp.datasetMeta : null
    }
    _parseTemp(Simple2D1);
    _parseTemp(Simple2D);
    _parseTemp(Simple1D);
    _parseTemp(cloud);
    _parseTemp(text);
    _parseTemp(date);
    _parseTemp(timeAxis);
    _parseTemp(SingleData);
    _parseTemp(worldMap);
    _parseTemp(heatJson);
    _parseTemp(trackPointJson)
    _parseTemp(strengthJson);
    _parseTemp(pointJson)
    _parseTemp(lineJson)
    _parseTemp(regionJson)
    _parseTemp(simpleSurface)
    _parseTemp(DataSet)
    _parseTemp(DataSetOnlyIndicator)
    _parseTemp(DataObjectArray)
    _parseTemp(tab)
    _parseTemp(indicatorOne)
    _parseTemp(indicatorTwo)
    _parseTemp(dataSetSimpleOneDimensions)
    _parseTemp(dataSetOneDimensionRecordOne)
    _parseTemp(url)
    _parseTemp(graph)
    _parseTemp(tree)
    _parseTemp(towDimensionAndIndis)
    _parseTemp(boxplot)
    _parseTemp(bubble)
    this.getCloneData = function(code) {
        if (!code) return [];
        let tempData = _tempDataReg[code];
        if (!tempData) return [];
        return util.deepCopy(tempData);
    }
    this.getCloneDataSetMeta = function(code) {
            if (!code) return null
            return _tempdatasetMetaReg[code]
        }
        /**
         * 克隆自定义组件模板信息
         * @param {String} compId 组件ID
         * @param {String} customCode 自定义组件的模板ID
         */
    this.getCustomCloneData = function({ compId, customCode }) {
        try {
            let temp = localStorage.getItem("caseList");
            let caseList = temp ? JSON.parse(temp) : [];
            let caseInfo = caseList.filter(item => item.caseId === customCode);
            let tempData
            if (caseInfo.length > 0) {
                tempData = caseInfo[0].code.dataSource
                caseInfo[0].compId = compId
                tempData = tempData ? JSON.parse(tempData) : ''
                store.commit("addCustomComp", { caseInfo: caseInfo[0] })
            }
            return util.deepCopy(tempData);
        } catch (e) {
            console.error(e)
        }
    }
}

export default TempDataReg;