import { _pushArrayAsSet, _pushLegend, _getMetaDimensionsAndIndiNumber, _getDimensionsObj } from '@/datamanager/convertor/CommonConvertorUtil'
import convertLadarChartData from '@/datamanager/convertor/BasicRadarConvertor'
import convertLiquidFillChartData from '@/datamanager/convertor/LiquidFillConvertor'
import convertCountUpChartData from '@/datamanager/convertor/CountUpConvertor'
import { covertSelectIndi, covertSelectDimension } from "@/datamanager/convertor/selectConvertor" //下拉选择组件数据集转换
import { covertCyclicbarIndi, covertCyclicbarDimension } from "@/datamanager/convertor/cyclicbarConvertor" //环状柱图数据集转换

import _ from "lodash"
var _convertLegendBaseChartData = function(data, conf) {
    let result = {
        classify: [],
        legends: []
    }

    data.forEach(function(val, index, data) {
        _pushArrayAsSet(result.classify, val[conf.classify]);
        _pushLegend(result.legends, val[conf.value], val[conf.legend]);
    });

    return result;
}

var _createEmptyBaseChartData = function() {
        return {
            classify: [],
            data: []
        };
    }
    //饼图数据集格式数据转换
var _convertBasePieChartData = function(data, conf) {
    let selectColumns = conf.xAxisIds //已选元数据字段名（columnName）集合
    let dimensionsObj = _getDimensionsObj(conf.datasetMeta) //将元数据转为以字段名（columnName）为key的对象
    let metaDimensionsAndIndiNumber = _getMetaDimensionsAndIndiNumber(selectColumns, dimensionsObj); // 获取已选字段中指标和维度的数量
    //维度数量为1时的处理
    let tempData = {}
    if (metaDimensionsAndIndiNumber.dimensions >= 1 && metaDimensionsAndIndiNumber.indi >= 1) {
        // 获取已选维度
        let selectDimensions = [],
            selectIndi = []
        selectColumns.forEach(item => dimensionsObj[item]['columnDefDire'] == 1 ? selectIndi.push(item) : selectDimensions.push(item)) //获取已选维度和已选指标
        let dimensionsKey = selectDimensions[0]
        let indiKey = selectIndi[0]
        data.forEach(item => {
            if (!tempData[item[dimensionsKey]]) tempData[item[dimensionsKey]] = 0
            tempData[item[dimensionsKey]] += parseFloat(item[indiKey])
        })
        return [tempData]
    }
    if (metaDimensionsAndIndiNumber.dimensions === 0) {
        data.forEach(item => {
            selectColumns.forEach(d => {
                let key = dimensionsObj[d]['columnDesc'] ? dimensionsObj[d]['columnDesc'] : d
                if (!tempData[key]) tempData[key] = 0
                tempData[key] += item[d] || 0
            })
        })
        return [tempData]
    }
    return []
}

/**
 转换数据为基于图例（可选）、分类、值的的一维、二维数据
 */
var convertBaseChartData = function(data, conf) {
    if (!data || !conf) {
        console.warn("cannot parse data with getColumnData");
        return _createEmptyBaseChartData();
    }

    return _convertLegendBaseChartData(data, conf);

}

var convertBasePieChartData = function(data, conf) {
    if (!data || !conf) {
        console.warn("cannot parse data with getColumnData");
        return {
            dataSource: [],
            dimensions: ''
        }
    }

    return _convertBasePieChartData(data, conf);
}

//柱折静态数据带数据描述转换
const convertDataSetStaticChartData = function(data) {
        data = _.cloneDeep(data)
        let dataSource = data.dataSource
            // 排序后的数据描述为维度在前
        data.dimensions.sort((a, b) => {
            return b.columnDefDire - a.columnDefDire
        })
        let dimensionsObj = _getDimensionsObj(data.dimensions) //将元数据转为以字段名（columnName）为key的对象
        let dimensions = data.dimensions.map(item => {
                if (item.columnDefDire == 1 && item.columnDesc) return item.columnDesc
                return item.columnName
            })
            // 将dataSource里的数据转换为以中文描述为key的数据
        dataSource.forEach(item => {
            for (let k in item) {
                if (dimensionsObj[k] && dimensionsObj[k].columnDefDire == 1 && dimensionsObj[k].columnDesc) {
                    item[dimensionsObj[k].columnDesc] = item[k]
                    delete item[k]
                }
            }
        })
        return {
            dataSource,
            dimensions
        }
    }
    // 1维度
const _convertDataSetChartDataForOneDimension = function(data, conf) {
        let dimensionsObj = _getDimensionsObj(conf.datasetMeta) //将元数据转为以字段名（columnName）为key的对象
        let selectColumns = conf.xAxisIds.concat(conf.yAxisIds) //已选元数据字段名（columnName）集合
        let dimensions = new Set() //维度
        let dataSource = {} //数据集
        let selectIndi = [] //已选指标
        let selectDimensions // 已选维度
        selectColumns.forEach(item => dimensionsObj[item]['columnDefDire'] == 1 ? selectIndi.push(item) : selectDimensions = item) //获取已选维度和已选指标
        dimensions.add(selectDimensions) //添加已选维度
        selectIndi.forEach(item => dimensions.add(item))
        let yDataKeys = new Set() //竖排对应的key
            // 取出所有的维度值
        data.forEach(item => yDataKeys.add(item[selectDimensions]))
        yDataKeys = Array.from(yDataKeys)
        let dimensionsKeys = Array.from(dimensions)
            // 循环data 取出对应图例的值 放入dataSource
        data.forEach(item => {
                let key = 'dimension' + item[selectDimensions] //添加一个dimension为了防止维度是字符串数字时对象自行从小到大排序导致排序不生效
                    // let key = item[selectDimensions]
                if (!dataSource[key]) dataSource[key] = {}
                dimensionsKeys.forEach(d => {
                    let indiName = dimensionsObj[d]['columnDesc'] ? dimensionsObj[d]['columnDesc'] : dimensionsObj[d]['columnName']
                    if (!dataSource[key][indiName]) dataSource[key][indiName] = 0
                    if (d !== selectDimensions) {
                        dataSource[key][indiName] += parseFloat(item[d]) || 0
                    } else {
                        dataSource[key][indiName] = parseFloat(item[d])
                    }
                })
            })
            // 将图例转为中文
        for (let i = 0; i < dimensionsKeys.length; i++) {
            dimensionsKeys[i] = dimensionsObj[dimensionsKeys[i]]['columnDesc'] ? dimensionsObj[dimensionsKeys[i]]['columnDesc'] : dimensionsObj[dimensionsKeys[i]]['columnName']
        }
        return {
            dataSource: Object.values(dataSource),
            dimensions: dimensionsKeys
        }
    }
    /**
     * @description 0维度 + 多指标 或1指标类型处理格式
     * @param {data} 数据
     * @param {conf} 图表配置
     * @return {object} {dimensions,dataSource}
     */
const _convertDataSetChartDataForZeroDimension = function(data, conf) {
    let dimensionsObj = _getDimensionsObj(conf.datasetMeta) //将元数据转为以字段名（columnName）为key的对象
        //判断x轴上是否存在指标
    let indiX = false
    if (conf.xAxisIds.length) {
        for (let i = 0; i < conf.xAxisIds.length; i++) {
            if (dimensionsObj[conf.xAxisIds[i]]['columnDefDire'] == 1) {
                indiX = true
                break
            }
        }
    }
    let selectColumns = conf.xAxisIds.concat(conf.yAxisIds) //已选元数据字段名（columnName）集合
    let dimensions = _.cloneDeep(selectColumns)
    let datasource = {}
    data.forEach(item => {
            dimensions.forEach(d => {
                let indiName = dimensionsObj[d]['columnDesc']
                if (!datasource[indiName]) datasource[indiName] = 0
                datasource[indiName] += parseFloat(item[d]) || 0
            })
        })
        // 将图例转为中文
    for (let i = 0; i < dimensions.length; i++) {
        dimensions[i] = dimensionsObj[dimensions[i]]['columnDesc']
    }
    if (!indiX) {
        datasource['_product$_'] = ''
        dimensions.unshift('_product$_')
    }
    return {
        dimensions,
        dataSource: [datasource]
    }
}
const convertDataSetChartData = function(data, conf) {
    let selectColumns = conf.xAxisIds.concat(conf.yAxisIds) //已选元数据字段名（columnName）集合
    let dimensionsObj = _getDimensionsObj(conf.datasetMeta) //将元数据转为以字段名（columnName）为key的对象
    let metaDimensionsAndIndiNumber = _getMetaDimensionsAndIndiNumber(selectColumns, dimensionsObj); // 获取已选字段中指标和维度的数量
    //维度数量为1时的处理
    if (metaDimensionsAndIndiNumber.dimensions === 1 && metaDimensionsAndIndiNumber.indi >= 1) {
        return _convertDataSetChartDataForOneDimension(data, conf)
    }
    if (metaDimensionsAndIndiNumber.dimensions === 0) {
        return _convertDataSetChartDataForZeroDimension(data, conf)
    }
    let indicators = [];
    let dimensions = new Set()
    let dataSource = []
    let enumDimensions = {}
    conf.xAxisIds.concat(conf.yAxisIds).forEach(item => {
            if (dimensionsObj[item]['columnDefDire'] == 1) {
                indicators.push(item)
            } else {
                enumDimensions[item] = new Set()
                data.forEach(d => {
                    enumDimensions[item].add(d[item])
                })
            }
        })
        //所有维度字段名
    let dimensionKeys = Object.keys(enumDimensions)
        //获取做为X轴上的标签的维度字段
    let xAxisDimensionKey = ''
    dimensionKeys.forEach(key => {
            if (conf.xAxisIds.concat(conf.yAxisIds).includes(key)) {
                xAxisDimensionKey = key
            }
        })
        //设置echartsOption dimension 第一个值，标识哪个字段做为x轴 与下面数据行第一列值对应
    dimensions.add(xAxisDimensionKey)
        //以x轴标签枚举值循环 -------------->数据的行数
    enumDimensions[xAxisDimensionKey].forEach(item => {
        let dataRow = {}
            //设置数据行第一列 即 {x轴字段名：每行的x轴标签值}
        dataRow[xAxisDimensionKey] = item;
        //循环除x轴标签值之外的维度
        dimensionKeys.forEach(k => {
                if (k === xAxisDimensionKey) {
                    return;
                }
                //循环维度的枚举值
                enumDimensions[k].forEach(legend => {
                    //设置echartsOption dimension 其他值 做为图例项=维度的枚举值
                    dimensions.add(legend)
                    let val = 0;
                    //循环获取指标值
                    indicators.forEach(i => {
                            data.forEach(d => {
                                //根据x轴标签值以及图例项 从数据中心筛选指标值
                                if (d[k] === legend && d[xAxisDimensionKey] === item) {
                                    val += parseFloat(d[i]) || 0
                                }
                            })
                        })
                        //给x轴标签项赋予指标 避免切换时重新判断指标值绑定关系
                    if (!dataRow[item]) {
                        dataRow[item] = 0
                    }
                    dataRow[item] += val;
                    //给图例所有枚举值赋值
                    if (!dataRow[legend]) {
                        dataRow[legend] = 0
                    }
                    dataRow[legend] += val;
                })
            })
            //当维度唯一时，将维度的枚举值即做为x轴标签 也作为图例项
        if (dimensionKeys.length === 1) {
            //设置echartsOption dimension 其他值 做为图例项=维度的枚举值
            dimensions.add(item)
            let val = 0;
            //循环获取指标值
            indicators.forEach(i => {
                    data.forEach(d => {
                        //根据x轴标签值从数据中心筛选指标值
                        if (d[xAxisDimensionKey] === item) {
                            val += parseFloat(d[i]) || 0
                        }
                    })
                })
                //给图例所有枚举值赋值
            if (!dataRow[item]) {
                dataRow[item] = 0
            }
            dataRow[item] += val;
        }
        dataSource.push(dataRow)
    })
    return {
        dataSource,
        dimensions: Array.from(dimensions)
    }
}

/**
 * 下拉组件数据转换
 * @param {Array} data 数据
 * @param {Object} dataConf 动态数据配置
 * @param {String} lableKey 数据key
 */
const convertSelectCompData = function(data, dataConf, lableKey) {
        let selectColumns = dataConf.xAxisIds //已选元数据字段名（columnName）集合
        let dimensionsObj = _getDimensionsObj(dataConf.datasetMeta) //将元数据转为以字段名（columnName）为key的对象
        let metaDimensionsAndIndiNumber = _getMetaDimensionsAndIndiNumber(selectColumns, dimensionsObj); // 获取已选字段中指标和维度的数量
        if (metaDimensionsAndIndiNumber.dimensions) {
            return covertSelectDimension(data, selectColumns, lableKey, dataConf.datasetMeta)
        }
        return covertSelectIndi(data, selectColumns, lableKey, dataConf.datasetMeta)
    }
    // 环状柱图数据转换
    /**
     * 
     * @param {Array} data 数据
     * @param {Object} dataConf 动态数据配置
     * @param {String} lableKey 数据key
     * @param {String} valueKey 数据值的key
     */
const convertCyclicbarBarData = function(data, dataConf, lableKey, valueKey) {
    let selectColumns = dataConf.xAxisIds //已选元数据字段名（columnName）集合
    let dimensionsObj = _getDimensionsObj(dataConf.datasetMeta) //将元数据转为以字段名（columnName）为key的对象
    let metaDimensionsAndIndiNumber = _getMetaDimensionsAndIndiNumber(selectColumns, dimensionsObj); // 获取已选字段中指标和维度的数量
    if (metaDimensionsAndIndiNumber.dimensions) {
        return covertCyclicbarDimension(data, selectColumns, dataConf.datasetMeta, lableKey, valueKey)
    }
    return covertCyclicbarIndi(data, selectColumns, dataConf.datasetMeta, lableKey, valueKey)
}
const convertBoxplotOneDimensionChartData = function(data, indi, dimensionKey) {
    let temp = {
        data: [
            []
        ],
        axisData: [],
        indi,
        categoryName: []
    }
    data.forEach(item => {
        temp.axisData.push(item[dimensionKey])
        temp.data[0].push([item[indi[0]], item[indi[1]], item[indi[2]], item[indi[3]], item[indi[4]]])
    })
    return temp
}
const convertBoxplotTwoDimensionChartData = function(data, indi, dimension) {
        let temp = {
            data: [],
            axisData: [],
            indi,
            categoryName: []
        }
        let dimensionKey = dimension[0]
        let categoryKey = dimension[1]
        let categoryObj = {}
        let axisData = new Set()
        data.forEach(item => {
            axisData.add(item[dimensionKey])
            if (!categoryObj[item[categoryKey]]) categoryObj[item[categoryKey]] = []
            categoryObj[item[categoryKey]].push(item)
        })
        axisData = Array.from(axisData)
        temp.axisData = axisData
        let i = 0
        for (let k in categoryObj) {
            temp.categoryName.push(k)
            if (!temp.data[i]) temp.data[i] = []
            temp.data[i] = []
            temp.data[i] = categoryObj[k].map(item => {
                return [item[indi[0]], item[indi[1]], item[indi[2]], item[indi[3]], item[indi[4]]]
            })
            i++
        }
        return temp
    }
    // 盒须图
const convertBoxplotChartData = function(data, selectColumns, datasetMeta) {
        let dimensionsObj = _getDimensionsObj(datasetMeta) //将元数据转为以字段名（columnName）为key的对象
        let indi = selectColumns.filter(item => dimensionsObj[item]['columnDefDire'] == 1)
        if (indi.length !== 5) return { axisData: [], data: [], category: false }
        let dimension = selectColumns.filter(item => dimensionsObj[item]['columnDefDire'] == 2)

        //维度数量为1时的处理
        if (dimension.length === 1) {
            return convertBoxplotOneDimensionChartData(data, indi, dimension[0])
        }
        if (dimension.length >= 2) {
            return convertBoxplotTwoDimensionChartData(data, indi, dimension)
        }
        if (dimension.length === 0) {
            return {
                axisData: [],
                data: data.map(item => {
                    return [item[indi[0]], item[indi[1]], item[indi[2]], item[indi[3]], item[indi[4]]]
                }),
                indi,
                categoryName: []
            }
        }
    }
    // 气泡图
    // 全部为指标
const convertBubbleScatterAllIndiChartData = function(data, xk, yColumns) {
        let indiKey = yColumns.length
        let temp = {
                keys: [xk, ...yColumns],
                data: [
                    []
                ],
                min: 0,
                max: 0,
                categoryName: [],
                symbolIndex: indiKey
            }
            // let [xk, yk] = dimension
        data.forEach(item => {
            temp.min = Math.min(temp.min, item[yColumns[indiKey]])
            temp.max = Math.max(temp.max, item[yColumns[indiKey]])
            let indiData = yColumns.map(i => item[i])
            temp.data[0].push([item[xk], ...indiData])
        })
        return temp
    }
    // y轴1维度多指标
const convertBubbleScatterOneDimensionOneIndiChartData = function(data, xSelect, yIndi, yDimension) {
        let temp = {
            keys: [xSelect, ...yIndi, yDimension[0]],
            data: [],
            min: 0,
            max: 0,
            categoryName: [],
            symbolIndex: yIndi.length > 1 ? 2 : 1 //1维度1指标时 y轴第一个指标既为y也为值
        }
        let categoryKey = yDimension[0]
        let xk = xSelect
        let yk = yIndi[0]
        let categoryObj = {}
        let indiKey = yIndi[temp.symbolIndex - 1]
        console.log(indiKey)
        data.forEach(item => {
            let indiVal = parseFloat(item[indiKey])
            temp.min = Math.min(temp.min, indiVal)
            temp.max = Math.max(temp.max, indiVal)
            if (!categoryObj[item[categoryKey]]) categoryObj[item[categoryKey]] = []
            categoryObj[item[categoryKey]].push(item)
        })
        let i = 0
        for (let k in categoryObj) {
            temp.categoryName.push(k)
            if (!temp.data[i]) temp.data[i] = []
            temp.data[i] = []
            temp.data[i] = categoryObj[k].map(item => {
                let indiData = yIndi.map(i => item[i])
                return [item[xk], ...indiData, item[categoryKey]] //将维度放在最后
            })
            i++
        }
        return temp
    }
    //气泡散点图
    // x轴1维度或1指标 y轴1维度1指标或多指标 最后一个指标代表气泡大小
const convertBubbleScatterChartData = function(data, selectColumns, datasetMeta) {
    let xColumns = selectColumns.x
    let yColumns = selectColumns.y
    if (!xColumns.length) return { data: [] }
    let dimensionsObj = _getDimensionsObj(datasetMeta) //将元数据转为以字段名（columnName）为key的对象

    let yDimension = yColumns.filter(item => dimensionsObj[item]['columnDefDire'] == 2)
    let yIndi = yColumns.filter(item => dimensionsObj[item]['columnDefDire'] == 1)
        // 如果y轴维度大于1 则只取第一个维度
    if (yDimension.length >= 1) {
        return convertBubbleScatterOneDimensionOneIndiChartData(data, xColumns[0], yIndi, yDimension)
    } else {
        // 全部为指标
        return convertBubbleScatterAllIndiChartData(data, xColumns[0], yColumns)
    }
    if (dimension.length < 2) return { data: [] }
    let indi = selectColumns.filter(item => dimensionsObj[item]['columnDefDire'] == 1)
        //维度数量为2时的处理
    if (dimension.length === 2) {
        return convertBubbleScatterTwoDimensionChartData(data, indi, dimension)
    }
    if (dimension.length >= 2) {
        return convertBubbleScatterMoreThenTwoDimensionChartData(data, indi, dimension)
    }
    // 
    if (dimension.length === 0) {
        return { data: [] }
    }
    return { data: [] }
}
export {
    convertBaseChartData,
    convertBasePieChartData,
    convertLadarChartData,
    convertLiquidFillChartData,
    convertCountUpChartData,
    convertDataSetChartData,
    convertDataSetStaticChartData,
    convertSelectCompData,
    convertCyclicbarBarData,
    convertBoxplotChartData,
    convertBubbleScatterChartData
}