/**
 * @description 元数据转换 (方便通过columnName获取元数据的各类信息)
 * @param {元数据} datasetMeta
 * @return {object} 得到以columnName为key的对象
 */
const _getDimensionsObj = function(datasetMeta) {
        let dimensionsObj = {}
        datasetMeta.forEach(item => dimensionsObj[item.columnName] = item)
        return dimensionsObj
    }
    /**
     * @description 获取元数据中指标和维度的数量
     * @param {array} meta
     * @return {object} 指标和维度的数量
     */
const _getMetaDimensionsAndIndiNumber = function(meta, dimensionsObj) {
        let obj = { dimensions: 0, indi: 0 }
        if (!meta) return obj
        meta.forEach(item => dimensionsObj[item]['columnDefDire'] == 1 ? obj.indi++ : obj.dimensions++)
        return obj
    }
    /**
     * @description 获取元数据中指标和维度
     * @param {元数据} meta 
     * @param {*} dimensionsObj 
     */
const _getMetaDimensionsAndIndi = function(meta, selectColumn) {
    let dimensionsObj = _getDimensionsObj(meta)
    let obj = {
        dimensions: [],
        indi: []
    }
    selectColumn.forEach(item => dimensionsObj[item]['columnDefDire'] == 1 ? obj.indi.push(dimensionsObj[item]['columnName']) : obj.dimensions.push(dimensionsObj[item]['columnName']))
    return obj
}
const _pushLegend = function(array, val, legendName) {
    let legend = null;

    if (!legendName) {
        legendName = 'legend'
    }

    array.forEach(function(legendObj) {
        if (legendName == legendObj.name) {
            legend = legendObj;
        }
    });

    if (legend) {
        legend.data.push(val);
        return;
    }

    legend = {
        name: legendName ? legendName : 'legend',
        data: [val]
    }

    array.push(legend);
}

/**
[]
*/
const _pushArrayAsSet = function(array, val) { //类似于JAVA的SET对象，添加不重复的数据
    if (array.indexOf(val) != -1) {
        return;
    }

    array.push(val);
}

export {
    _pushLegend,
    _pushArrayAsSet,
    _getDimensionsObj,
    _getMetaDimensionsAndIndiNumber,
    _getMetaDimensionsAndIndi
}