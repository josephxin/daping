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
const _getDimension = function(datasetMeta) {
        for (let i = 0; i < datasetMeta.length; i++) {
            if (datasetMeta[i].columnDefDire === 2) return datasetMeta[i].columnName
        }
        return ''
    }
    /**
     * 
     * @param {数据} data 
     * @param {元数据} metadata 
     * @param {已选维度和指标} selectCloumn
     */
const convertor = function(data, metadata, selectCloumn) {
    let dimensionsObj = _getDimensionsObj(metadata)
    let indicator = []
    selectCloumn.forEach(item => {
        if (dimensionsObj[item]['columnDefDire'] == 1) {
            indicator.push(item)
        }
    })
    let dimension = _getDimension(metadata) //获取维度
    let seriesData = {}
    if (data && data.length) {
        data.forEach(item => {
            if (!seriesData[item[dimension]]) seriesData[item[dimension]] = {}
            indicator.forEach(indi => {
                if (!seriesData[item[dimension]][indi]) seriesData[item[dimension]][indi] = 0
                seriesData[item[dimension]][indi] += item[indi]
            })
        })
    }

    // 中文转换
    indicator.forEach((item, i) => {
        if (dimensionsObj[item]['columnDesc']) indicator[i] = { name: dimensionsObj[item]['columnDesc'] }
    })
    for (let k in seriesData) {
        seriesData[k] = Object.values(seriesData[k])
    }
    return {
        indicator,
        seriesData
    }
}
export default convertor