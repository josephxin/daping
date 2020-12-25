import { CompState } from './CompContext.js'
import { mapGetters } from "vuex"
import util from "@/util/util"

export default {
    name: 'ComInterface',
    props: ['compConf'],
    data: function () {
        return {
            chartData: null,
            compDataStatus: 'loading', //当前组件数据状态
        }
    },
    computed: {
        compId() { // 组件ID
            return this.compConf.compId
        },
        box() {
            return this.compConf.box;
        },
        styleConf() { // 组件样式配置
            return this.compConf.style
        },
        dataConf() { // 组件数据配置
            if (!this.compConf.data) {
                return
            }

            return this.compConf.data.conf
        },
        dataSourceConf() { // 组件数据源配置
            if (!this.compConf.data) {
                return
            }

            return this.compConf.data.datasource
        },
        compData() {
            return this.$store.state.compData.compData[this.compId]
        },
        linkageConf() { // 组件联动配置
            return this.compConf.linkage
        },
        state() {
            return this.compConf.state
        },
        ...mapGetters({ activeCompData: 'getCompData' }),
    },
    watch: {
        'styleConf': {
            handler: function (newVal, oldVal) {
                this.updateState(CompState.REDRAW)
                this.styleConfChanged(newVal, oldVal)
                this.updateState(CompState.RUNNING)
            },
            deep: true
        },
        'state': {
            handler: function (newVal, oldVal) {
                // console.log('AbstractComp', '[', this.id, ']', 'state:', this.state)
            },
            deep: true
        },
        'compData': {
            handler: function (newVal, oldVal) {
                if (newVal && JSON.stringify(newVal) != JSON.stringify(oldVal)) {
                    this.updateCompData(true)
                }
            },
            deep: true
        },
        'linkageConf': {
            handler: function (newVal, oldVal) {
                this.linkageConfChanged(newVal, oldVal)
            },
            deep: true
        },
        // 数据配置更新时 清空事件配置
        'dataSourceConf.type': {
            handler: function (newVal, oldVal) {
                this.$evtBus.destroy(this.compId)
            }
        },
    },
    methods: {
        // 将数据中的表达式替换为实际值
        /**
         *
         * @param {Object | Array || String} data
         */
        convertExpression(data) {
            if (JSON.stringify(data).indexOf("${") !== -1) {
                let expString = JSON.stringify(data)
                data = this._getExpressionValue(expString)
                data = JSON.parse(data)
            }
            return data
        },
        styleConfChanged() { // 【抽象方法】样式配置发生变化时触发
        },
        compDataChanged() { // 【抽象方法】组件加载后的数据发生变化时触发
        },
        resize() { // 【抽象方法】当组件大小发生变化时触发。由Container触发该方法。
        },
        convertChartData(compData) { // 【抽象方法】将compData转换为chartData
        },
        linkageConfChanged(newVal, oldVal) { // 【抽象方法】组件联动变化事件 需联动组件内部实现
        },
        updateState(state) {
            this.$emit('compState', state)
        },
        updateChartData(data) {
            //console.log(this.convertChartData(data));
            this.chartData = this.convertChartData(data) || data
        },
        // 取出linkage里传递的数据
        _linkageDataKeys(linkageData) {
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
        },
        _getColumnCondition(item, dsId, globalParams = []) {
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
                let globalParamValue = this._getGlobalParamsValue(item.columnName, globalParams)
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
            let value = this._getExpressionValue(item.value)
            if (value && value.indexOf("${") === -1 && value.indexOf("}") === -1) {
                return {
                    bindMapperColumn: item.columnName,
                    dsId: dsId,
                    operationType: item.operationType,
                    value
                }
            }
            return {}
        },
        // 合并当前组件的所有查询条件
        _mergeElementConfig(dsId, compConf, _store) {
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
                    let cloumnCondition = this._getColumnCondition(item, dsId, globalParams)
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
            let linkageDataArr = this._linkageDataKeys(linkageFormStore)
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
        },
        // 检测必要条件是否满足
        _checkRequireFields() {
            let compConf = this.compConf
            if (compConf.data.datasource.type === 'dataset') {
                let datasetSelectedIds = compConf.data.conf.datasetSelectedIds;
                if (datasetSelectedIds && Array.isArray(datasetSelectedIds) && datasetSelectedIds.length) {
                    let datasetselectId = compConf.data.conf.datasetSelectedIds[0]
                    let requireFields = compConf.data.conf[datasetselectId]['requireFields']
                    if (!requireFields || !requireFields.length) return true
                    let searchElementConfigs = this._mergeElementConfig(datasetselectId, compConf, this.$store)
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
            }
            return true
        },
        // 用于联动和外部调用更新组件的数据。
        // changedLoadedData：当修改了从数据源加载后的数据（修改store.compData中的数据）时为true，否则为false
        updateCompData(changedLoadedData) {
            if (!changedLoadedData) {
                if (['dataset'].includes(this.compConf.data.datasource.type)) {
                    let _checkRequireFields = this._checkRequireFields()
                    if (!_checkRequireFields) return
                    // 判断加载条件是否和前一次相同
                    let loadParams = this.$dm._getFormatRequestParams(this.compConf)
                    let storeParams = this.$store.getters.getConditionsByCompId(this.compConf.compId)
                    if (!this.$store.getters.getPreviewState || storeParams.length < 1 || JSON.stringify(storeParams[0].groupByConfig) !== JSON.stringify(loadParams[0].groupByConfig) || JSON.stringify(storeParams[0].orderByConfigDTO) !== JSON.stringify(loadParams[0].orderByConfigDTO) || JSON.stringify(storeParams[0].searchElementConfigs) !== JSON.stringify(loadParams[0].searchElementConfigs)) {
                        this.compDataStatus = 'loading'
                        this.$dm.initCompData(this.compConf) //调接口
                    }
                    // console.log('本次查询条件与上次相同')

                } else {
                    // 静态数据加载
                    this.$dm.initCompData(this.compConf)
                }
                return
            }
            // if (['dataset', 'gisServer'].includes(this.compConf.data.datasource.type) && !changedLoadedData) return
            this.compDataStatus = 'loaded'
            this.updateState(CompState.RELOAD)
            if (this.compData) {
                this.updateChartData(this.compData) //改变图表数据
                this.compDataChanged() //重新渲染图表
                this.updateState(CompState.RUNNING)
            }
        },
        // 合并两个一维数组 结果 以第一个有值为准
        _mergeArr(arr1 = [], arr2 = []) {
            let arr = []
            let len = arr1.length > arr2.length ? arr1.length : arr2.length
            for (let i = 0; i < len; i++) {
                let item = arr1[i] ? arr1[i] : arr2[i]
                arr.push(item)
            }
            return arr
        },
        //组件无数据时显示
        _showNoDataBox(compId) {
            let boxEle = document.getElementById(`${compId}`).querySelector(`${compId}_no_data_box`)
            if (!boxEle) {
                let boxEle = document.createElement("div")
                boxEle.id = `${compId}_no_data_box`
                boxEle.innerHTML = "无数据"
                document.getElementById(`${compId}`).appendChild(boxEle)
            }
        },
        // 处理静态数据中数据值的表达式
        _handleStaticData() {

        },
        // 处理数据集中的条件表达式
        _handleConditionExpression() {

        },
        // 获取组件传出的参数值
        /**
         * 参数为数组 数组第一项为组件名 第二项为参数key
         * @param {array} param
         */
        _getCompLinkageParamsValue(param, compId) {
            let linkageData = this.$store.getters.getLinkagesByCompId(compId)
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
        },
        // 获取全局表达式的值
        _getGlobalParamsValue(key) {
            let globalParams = this.$store.state.window.globalParams
            if (!globalParams || !globalParams.length) return null
            for (let i = 0; i < globalParams.length; i++) {
                if (globalParams[i].name === key) {
                    if (globalParams[i].value) return globalParams[i].value
                    return null
                }
            }
            return null
        },
        // 将表达式转换为值
        _getExpressionValue(value) {
            let expressionParams = util.getCustomExpressionParams(value) //提取表达式
            let values = [] //提取表达式中所有的值
            if (expressionParams && expressionParams.length) {
                expressionParams.forEach(exp => {
                    let expressionParams = util.getCustomExpressionCloumn(exp)
                    let paramArr = expressionParams.exp
                    let noMatchVal = expressionParams.format || '${' + paramArr.join(".") + '}' //无匹配时返回的数据
                    if (paramArr.length >= 2) {
                        if (paramArr[0] === 'global') {
                            //全局参数表达式
                            let globalParamData = this._getGlobalParamsValue(paramArr[1])
                            if (globalParamData) {
                                values.push(globalParamData)
                            } else {
                                values.push(noMatchVal)
                            }
                        } else {
                            //组件参数表达式
                            let linkageParamData = this._getCompLinkageParamsValue(paramArr, this.compConf['compId'])
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
                    value = value.replace(exp, values[i])
                })
            }
            return value
        },
        // 转换传出的数据 由于原始数据可能转换为中文名 故将中文名的key（如果存在）和英文名的key都返回
        _convertEventOutData(data, dataConf) {
            if (!dataConf || !dataConf.datasource || dataConf.datasource.type === 'static') return data
            let metaData = dataConf.conf[dataConf.conf.datasetSelectedIds[0]]['datasetMeta']
            let tempData = _.cloneDeep(data)
            if (_.isObject(data)) {
                for (let k in data) {
                    metaData.forEach(item => {
                        if ([item.columnDesc, item.columnName].includes(k)) {
                            if (item.columnDesc) {
                                tempData[item.columnDesc] = data[k]
                                tempData[item.columnName] = data[k]
                            }
                        }
                    })
                }
                return tempData
            }
            if (_.isArray(data)) {
                data.forEach((d, index) => {
                    for (let k in data[d]) {
                        metaData.forEach(item => {
                            if ([item.columnDesc, item.columnName].includes(k)) {
                                if (item.columnDesc) {
                                    tempData[index][item.columnDesc] = data[d][k]
                                    tempData[index][item.columnName] = data[d][k]
                                }
                            }
                        })
                    }
                })
                return tempData
            }
            return tempData
        },
    }
}