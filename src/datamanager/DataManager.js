import TempDataReg from './template/TempDataReg'
import { DataSourceContext } from './DataManagerContext'
import api from '../api/project'
import util from "@/util/util"

var DataManager = function(store) {
    if (!store) console.error('store is undefined.')

    var _store = store

    var _tempDataReg = new TempDataReg()

    let errorMsg = []
        // 合并已选字段id
    const _merageColumnIds = function() {
            let idx = [];
            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i] && arguments.length > 0) {
                    idx = idx.concat(arguments[i])
                }
            }
            return idx
        }
        // 取出linkage里传递的数据
    const _linkageDataKeys = function(linkageData) {
        let linkage = []
        for (let i in linkageData) {
            linkageData[i].data.forEach(item => {
                linkage.push({
                    bindMapperColumn: item.bindMapperColumn,
                    value: item.value,
                    operationType: item.operationType
                })
            })
        }
        return linkage
    }
    const _getConditionValue = function(val, useType) {

    }

    // 获取组件传出的参数值
    /**
     * 参数为数组 数组第一项为组件名 第二项为参数key
     * @param {array} param
     */
    const _getCompLinkageParamsValue = function(param, compId) {
            let linkageData = _store.getters.getLinkagesByCompId(compId)
            if (!linkageData) return null
            linkageData = linkageData[param[0]]
            if (!linkageData) return null
            linkageData = linkageData['sourceData']
            if (!linkageData) return null
            for (let i = 1; i < param.length; i++) {
                if (!linkageData[param[i]]) return null
                linkageData = linkageData[param[i]]
            }
            return linkageData
        }
        // 获取全局参数的映射值
    const _getGlobalParamsValue = function(param, globalParams) {
            for (let i = 0; i < globalParams.length; i++) {
                if (globalParams[i].name === param) {
                    if (globalParams[i].value) return globalParams[i].value
                    return null
                }
            }
            return null
        }
        // 获取条件的值
    const _getCloumnCondition = function(item, dsId, globalParams = [], compId) {
        // 值
        if (item.useType === 1) {
            return {
                bindMapperColumn: item.columnName,
                dsId: dsId,
                operationType: item.operationType,
                value: item.value
            }
        }
        // 全局参数
        if (item.useType === 2) {
            if (!globalParams.length) return {}
            let globalParamValue = _getGlobalParamsValue(item.columnName, globalParams)
            if (globalParamValue) {
                return {
                    bindMapperColumn: item.columnName,
                    dsId: dsId,
                    operationType: item.operationType,
                    value: globalParamValue
                }
            }
            return {}
        }
        // 表达式
        let expressionStr = item.value
        let expressionParams = util.getCustomExpressionParams(expressionStr)
        let values = []
        if (expressionParams && expressionParams.length) {
            expressionParams.forEach(exp => {
                let expressionParams = util.getCustomExpressionCloumn(exp)
                let paramArr = expressionParams.exp
                let noMatchVal = expressionParams.format || '${' + paramArr.join(".") + '}'
                if (paramArr.length >= 2) {
                    if (paramArr[0] === 'global') {
                        //全局参数表达式
                        let globalParamData = _getGlobalParamsValue(paramArr[1], globalParams)
                        if (globalParamData) {
                            values.push(globalParamData)
                        } else {
                            values.push(noMatchVal)
                        }
                    } else {
                        //组件参数表达式
                        let linkageParamData = _getCompLinkageParamsValue(paramArr, compId)
                        if (linkageParamData) {
                            values.push(linkageParamData)
                        } else {
                            values.push(noMatchVal)
                        }
                    }
                } else {
                    values.push(noMatchVal)
                }
            })
        }
        if (values.length) {
            expressionParams.forEach((exp, i) => {
                expressionStr = expressionStr.replace(exp, values[i])
            })
            if (expressionStr.indexOf("${") !== -1 && expressionStr.indexOf("}") !== -1) {
                return {}
            }
            return {
                bindMapperColumn: item.columnName,
                dsId: dsId,
                operationType: item.operationType,
                value: expressionStr
            }
        }
        return {}
    }

    // 合并筛选条件
    const _mergeElementConfig = function(dsId, compConf) {
            let dataConf = compConf.data.conf[dsId]
            let searchElementConfigs = _.cloneDeep(dataConf.searchElementConfigs) || []
            if (searchElementConfigs.length) {
                let globalParams = _store.state.window.globalParams
                searchElementConfigs.sort((a, b) => {
                    return a.useType - b.useType
                })
                let tempSearchElementConfigs = {}
                    // 循环条件配置 筛选出自定义条件和全局参数条件
                searchElementConfigs.forEach(item => {
                    let cloumnCondition = _getCloumnCondition(item, dsId, globalParams, compConf['compId'])
                    if (!_.isEmpty(cloumnCondition)) {
                        tempSearchElementConfigs[item.columnName] = cloumnCondition
                    }
                })
                if (!_.isEmpty(tempSearchElementConfigs)) {
                    searchElementConfigs = Object.values(tempSearchElementConfigs)
                }
            }
            let linkageFormStore = _store.getters.getLinkagesByCompId(compConf['compId'])
            if (_.isEmpty(linkageFormStore)) return searchElementConfigs
            let searchColumns = searchElementConfigs.map(item => {
                return item.bindMapperColumn
            }) || []
            let linkageDataArr = _linkageDataKeys(linkageFormStore)
            linkageDataArr.forEach((item, i) => {
                let _index = searchColumns.indexOf(item.bindMapperColumn)
                if (_index !== -1) {
                    searchElementConfigs[i]['value'] = item.value
                    searchElementConfigs[i].operationType = item.operationType
                } else {
                    searchElementConfigs.push({
                        dsId,
                        bindMapperColumn: item.bindMapperColumn,
                        value: item.value,
                        operationType: item.operationType
                    })
                }
            })
            return searchElementConfigs
        }
        // 格式化查询条件  排序规则 用于拦截相同条件的请求
    this._getFormatRequestParams = function(compConf) {
        let datasetRequestParams = [] //请求参数集合
        let conf = compConf.data.conf;
        let datasetSelectedIds = conf.datasetSelectedIds ? conf.datasetSelectedIds : [];
        for (let i = 0; i < datasetSelectedIds.length; i++) {
            let dsId = datasetSelectedIds[i]
            let dataConf = conf[dsId]
            let selectColumns = _merageColumnIds(dataConf.xAxisIds, dataConf.yAxisIds, dataConf.geometry, dataConf.properties)
                // 组织筛选条件
            let params = {
                    disDataElements: [],
                    dsId,
                    groupByConfig: {},
                    orderByConfigDTO: [],
                }
                // 分页配置
            if (dataConf.resultNumber) {
                params.pageInfo = {
                    isPage: true,
                    pageNum: 1,
                    pageSize: parseInt(dataConf.resultNumber)
                }
            }
            // 排序
            if (dataConf.orderByConfigDTO && dataConf.orderByConfigDTO.length) {
                dataConf.orderByConfigDTO.forEach(item => {
                    if (item.bindMapperColumn) {
                        params.orderByConfigDTO.push({
                            dsId,
                            bindMapperColumn: item.bindMapperColumn,
                            orderByType: item.orderByType
                        })
                    }
                })
            }
            //筛选条件
            params.searchElementConfigs = _mergeElementConfig(dsId, compConf).filter(item => item.value.indexOf("${") === -1 && item.value.indexOf("}") === -1)
            params.searchElementConfigs.forEach(item => {
                if (['lt', 'gt', 'lte', 'gte'].includes(item.operationType)) {
                    if (_.isNumber(item.value)) {
                        item.value = item.value.indexOf(".") ? parseFloat(item.value) : parseInt(item.value)
                    }
                }
            })
            selectColumns.forEach(item => {
                params.disDataElements.push({
                    bindMapperColumn: item,
                    dsId,
                    elementAttrField: '',
                    function: ''
                })
            })
            datasetRequestParams.push(params)
        }
        return datasetRequestParams
    }
    this._queryDataSet = function(compConf) {
        let datasetRequestParams = this._getFormatRequestParams(compConf)
        _store.commit('setConditions', {
            [`${compConf.compId}`]: datasetRequestParams
        })
        let request = [];
        let projectId = _store.state.project.projectId;
        for (let i = 0; i < datasetRequestParams.length; i++) {
            request.push(api.datasetData(datasetRequestParams[i], projectId))
        }
        return Promise.all(request)
    }
    this.parseData = function(compConf) {
        let compId = compConf.compId
        let dataConf = compConf.data
        let datasource = dataConf.datasource
        let compType = compConf.componentName
        let result = []

        if (!datasource) {
            console.error('The component datasource is undefined.')
            return result
        }

        let type = datasource.type

        if (!type) {
            console.error('The component data type is undefined.')
            return result
        }

        if (DataSourceContext.STATIC === type) {
            if (compType === "custom") {
                result = _tempDataReg.getCustomCloneData(compConf)
            } else {
                result = _tempDataReg.getCloneData(datasource.tempCode)
            }
        } else if (DataSourceContext.DATASET === type || DataSourceContext.GISSET === type) {
            return this._queryDataSet(compConf)
        } else if (DataSourceContext.GISSERVER === type) {
            return new Date()
        }
        return result
    }

    var _createDataSetTemplet = function() {
        return {
            type: DataSourceContext.DATASET,
            datasetId: ''
        }
    }
    var _getDataSourceTemplet = function(compId, type) {
            if (!compId || !type) {
                return
            }
            if (DataSourceContext.STATIC == type) {
                let compConf = _store.getters.getCompConf(compId)
                return compConf.staticTempletData
            }
            if (DataSourceContext.DATASET == type) {
                return _createDataSetTemplet()
            }
            if (DataSourceContext.GISSET == type) {
                return {
                    type: DataSourceContext.GISSET,
                    datasetId: ''
                }
            }
            if (DataSourceContext.GISSERVER == type) {
                return {
                    type: 'gisServer'
                }
            }
        }
        // 检测必要条件是否满足
    this._checkRequireFields = function(compConf) {
        if (compConf.data.datasource.type === 'dataset') {
            let datasetselectId = compConf.data.conf.datasetSelectedIds[0]
            if (!datasetselectId) return false
            let requireFields = compConf.data.conf[datasetselectId]['requireFields']
            if (!requireFields || !requireFields.length) return true
            let searchElementConfigs = _mergeElementConfig(datasetselectId, compConf)
            if (!searchElementConfigs.length) return false
            let searchElementConfigCloumn = searchElementConfigs.map(item => {
                return item.bindMapperColumn
            })

            let matchNumber = 0
            requireFields.forEach(item => {
                if (searchElementConfigCloumn.indexOf(item) !== -1) matchNumber++
            })
            if (matchNumber === requireFields.length) return true
            return false
        }
        return true
    }
    this.initCompData = function(compConf) {
        //console.log("this.initCompData -> compConf", compConf)
        let compId = compConf.compId
        let dataConf = compConf.data
        if (!compId) {
            console.error('compId is undefined.')
            return
        }
        if (!dataConf) {
            console.error('dataConf is undefined.')
            return
        }
        let data = null
        try {
            if (dataConf.datasource.type === 'dataset' || dataConf.datasource.type === 'gisSet') {
                if (!this._checkRequireFields(compConf)) {
                    console.log("this.initCompData -> _checkRequireFields", '必要条件未满足')
                    return
                }
                //console.log("this.initCompData -> compConf，数据源类型不是静态数据：", compConf)
                this.parseData(compConf).then(([...res]) => {
                    //console.log("this.initCompData -> res", res)
                    let resData = []
                    res.forEach(item => {
                        if (item.code == 200) {
                            resData.push(item.data.dataValues)
                        }
                    })
                    if (!this.verifyData(res, compConf)) return
                    _store.commit('insertCompData', {
                        compId: compId,
                        data: resData
                    })
                })
            } else {
                let res = this.parseData(compConf)
                if (!this.verifyData(res, compConf)) return
                _store.commit('insertCompData', {
                    compId: compId,
                    data: res
                })
            }

        } catch (e) {
            this._addErrorMsg(e.message)
            return
        }
    }
    this.verifyData = function(data, compConf) {
        // 校验数据是否合法
        let dataConfValues = compConf.data.conf
        if (!dataConfValues) return true
        if (!data || data.length === 0) {
            console.error('当前加载的数据为空（不刷新数据）')
            this._addErrorMsg('当前加载的数据为空')
            return false
        }
        return true
    }

    this.clearErrorMsg = function() {
        errorMsg = []
    }

    this._addErrorMsg = function(errMsg) {
        errorMsg.push(errMsg)
    }

    this.getErrorMsg = function() {
        return errorMsg
    }

    this.updateCompDataSource = function(compId, type) {
        _store.commit('updateCompDataSource', {
            compId: compId,
            datasource: _getDataSourceTemplet(compId, type)
        })
        if (DataSourceContext.STATIC === type) { // 切换静态数据时，需要还原数据和数据配置
            // 更新数据配置
            let compConf = _store.getters.getCompConf(compId)
            _store.commit('modifyValueBySelected', {
                    attrs: ['data', 'conf'],
                    value: compConf.staticTempletDataConf
                })
                // 更新静态数据
            _store.commit('updateCompData', {
                compId: compId,
                data: _tempDataReg.getCloneData(compConf.staticTempletData.tempCode)
            })
        } else if (DataSourceContext.DATASET === type || DataSourceContext.GISSET === type) {
            // 更新数据配置
            let compConf = _store.getters.getCompConf(compId)
                // _store.commit('modifyValueBySelected', {
                //         attrs: ['data', 'conf'],
                //         value: {}
                //     })
                // 更新数据集数据
            _store.commit('updateCompData', {
                compId: compId,
                data: []
            })
        }
    }

    this.loadCompData = function(comps) {
        console.log("DataManager -> comps", comps)
        if (!comps) return
        for (let compId in comps) {
            let comp = comps[compId]
            if (comp.compId && comp.data && comp.data.datasource && DataSourceContext.STATIC !== comp.data.datasource.type) {
                this.initCompData(comp)
            }
        }
    }
}

export default DataManager