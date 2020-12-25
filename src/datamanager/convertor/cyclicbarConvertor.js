import { _getDimensionsObj, _getMetaDimensionsAndIndi } from '@/datamanager/convertor/CommonConvertorUtil'
// 环状柱图单指标数据集转换
const covertCyclicbarIndi = function(data, selectColumns, datasetMeta, lableKey, valueKey) {
        let dimensionsObj = _getDimensionsObj(datasetMeta)
        let indi = selectColumns[0]
        let value = 0
        data.forEach(item => {
            value += item[indi] || 0
        })
        return {
            [`${lableKey}`]: dimensionsObj[indi]['columnDesc'] ? dimensionsObj[indi]['columnDesc'] : dimensionsObj[indi]['columnName'],
            [`${valueKey}`]: value,
            sourceName: indi
        }
    }
    // 环状柱图单维度单指标数据集转换
const covertCyclicbarDimension = function(data, selectColumns, datasetMeta, lableKey, valueKey) {
    let metaDimensionsAndIndi = _getMetaDimensionsAndIndi(datasetMeta, selectColumns)
    let dimension = metaDimensionsAndIndi['dimensions'][0]
    let indi = metaDimensionsAndIndi['indi'].length ? metaDimensionsAndIndi['indi'][0] : ''
    if (!indi) return {}
    let format = {}
    let value = 0
    data.forEach(item => {
        value += item[indi] || 0
    })
    return {
        [`${lableKey}`]: data[0][dimension],
        [`${valueKey}`]: value,
        sourceName: dimension
    }
    let tempData = []
    for (let k in format) {
        tempData.push({
            [`${lableKey}`]: k,
            value: format[k],
            originName: dimension
        })
    }
    return tempData
}
export {
    covertCyclicbarIndi,
    covertCyclicbarDimension
}