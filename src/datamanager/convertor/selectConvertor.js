import { _getDimensionsObj, _getMetaDimensionsAndIndi } from '@/datamanager/convertor/CommonConvertorUtil'
// 下拉框组件多指标数据集转换
const covertSelectIndi = function(data, selectColumns, lableKey, datasetMeta) {
        let dimensionsObj = _getDimensionsObj(datasetMeta)
        let tempData = []
        if (data) {
            data.forEach(item => {
                tempData.push({
                    [`${lableKey}`]: item[lableKey],
                    ...item
                })
            })
        }

        return tempData
    }
    // 下拉框单维度数据集转换
const covertSelectDimension = function(data, selectColumns, lableKey, datasetMeta) {
    let metaDimensionsAndIndi = _getMetaDimensionsAndIndi(datasetMeta, selectColumns)
    let dimension = metaDimensionsAndIndi['dimensions'][0]
    let format = {}
    data.forEach(item => {
        format[item[dimension]] = item[dimension]
    })
    let tempData = []
    for (let k in format) {
        tempData.push({
            [`${lableKey}`]: k,
            value: format[k],
            sourceName: dimension
        })
    }
    return tempData
}
export {
    covertSelectIndi,
    covertSelectDimension
}