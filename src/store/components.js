import Vue from 'vue'
import util from '@/util/util'
import { getComObj } from '@/compLib/CompTemplateReg'
import TempDataReg from '@/datamanager/template/TempDataReg'
const _tempDataReg = new TempDataReg()
export default {
    state: {
        compIndex: 0,
        SortObj: [],
        customList: [],
        sqlParmas: {
            radio: '1',
            sql: ''
        },
        token: '',
        compMap: {},
    },
    mutations: {
        /**
         * 添加自定义组件
         */
        addCustomComp({ customList }, payload) {
            customList.push(payload.caseInfo)
        },
        /**
         * 更新自定义组件数据源
         */
        updateCustomCompData({ customList }, payload) {
            for (let item of customList) {
                if (item.compId === payload.compId) {
                    item.code.dataSource = payload.newData
                    break
                }
            }
        },
        setComp(state, compConf) {
            Vue.set(state.compMap, compConf.compId, compConf)
                // console.log("setComp -> compMap", state.compMap)
        },
        removeComs(state, compId) {
            this._vm.$evtBus.destroy(compId)
            Vue.delete(state.compMap, compId)
            for (let [index, item] of state.customList.entries()) {
                if (item.compId === compId) {
                    state.customList.splice(index, 1)
                    break;
                }
            }
        },
        // 通过层id删除组件
        removeComsByLayerId(state, layerId) {
            for (let compId in state.compMap) {
                if (state.compMap[compId]['compType'] && state.compMap[compId]['compType'] === 'layerChildren' && layerId === state.compMap[compId]['layerId']) {
                    // Vue.delete(state.compMap, compId)
                    // this._vm.$evtBus.destroy(compId)
                    this.commit('removeComs', compId)
                }
            }
        },
        incrementCompId(state) {
            state.compIndex++
        },
        changeHighlight(state, param) {
            try {
                if (state.compMap[param.compId]) {
                    state.compMap[param.compId].isHighlight = param.value
                }
            } catch (e) {
                console.error(e)
            }
        },
        changeHighlightLayer(state, param) {
            if (state.compMap[param.compId]) {
                state.compMap[param.compId].isHighlightLayer = param.value
            }
        },
        changeActive(state, param) {
            state.compMap[param.compId].isActive = param.value
        },
        cleanAllActiveChild(state) {
            let comps = state.compMap
            for (let compId in comps) {
                let comp = comps[compId]
                if (comp.isActive && ['themeLayer'].indexOf(comp.compType) !== -1) {
                    comp.isActive = false
                }
            }
        },
        cleanAllActive(state) {
            let comps = state.compMap
            for (let compId in comps) {
                let comp = comps[compId]
                if (comp.isActive) {
                    comp.isActive = false
                }
            }
        },
        cleanAllHighLayer(state) {
            let comps = state.compMap
            for (let compId in comps) {
                let comp = comps[compId]
                if (comp.isHighlightLayer) {
                    comp.isHighlightLayer = false
                }
            }
        },
        changeRotate(state, param) {
            state.compMap[param.compId].box.rotate = param.value
        },
        // 设置容器选中的层
        changeCurrentLayer(state, param) {
            state.compMap[param.compId].currentLayerId = param.layerId
        },
        updateCompStyle(state, styleConf) {
            let comp = state.compMap[styleConf.compId]

            if (styleConf.top) {
                comp.box.top = styleConf.top
            }

            if (styleConf.left) {
                comp.box.left = styleConf.left
            }

            if (styleConf.width) {
                comp.box.width = styleConf.width
            }

            if (styleConf.height) {
                comp.box.height = styleConf.height
            }
            if (typeof styleConf.rotate != 'undefined') {
                comp.box.rotate = styleConf.rotate
            }
            if (styleConf.clipPath) {
                comp.box.clipPath = styleConf.clipPath
            }
        },
        // 更新组件名
        updateCompName(state, payload) {
            let comp = state.compMap[payload.compId]
            comp.name = payload.name
        },
        updateCompIndex(state, param) {
            state.compMap[param.compId].compIndex = param.compIndex
        },
        uploadSortObj(state, param) {
            state.SortObj = param.slice()
        },
        uploadRadio(state, param) {
            state.sqlParmas.radio = param
        },
        uploadSql(state, param) {
            state.sqlParmas.sql = param
        },
        modifyValueBySelected(state, param) {
            //TODO : fixed gis地图编辑时切换报compId 为 null的错误！
            let compId
            if (this.getters.getFirstActiveComp) {
                compId = this.getters.getFirstActiveComp.compId
            } else {
                compId = param.attrs[1]
            }
            let comp = state.compMap[compId]
            if (param.attrs.indexOf('tileLayers') !== -1 && param.attrs.length === 5) param.attrs.splice(1, 1)
            if (comp == null || param == null || param.attrs == null || Object.keys(param).indexOf('value') == -1) {
                return
            }
            const attrs = param.attrs,
                value = param.value
            let modifyData = comp,
                attrLen = attrs.length,
                index = 0
            if (attrLen == 0) {
                // console.error('修改选中组件值时，没有子属性')
                return
            }
            while (index != attrLen - 1) {
                modifyData = modifyData[attrs[index++]]
                if (!modifyData) {
                    console.warn(attrs[index - 1], '不存在，无法设置值为', value)
                    return
                }
            }
            modifyData[attrs[index]] = value
        },
        modifyValueByCompId(state, param) {
            let compId = param.attrs[0]
            //console.log(state.compMap);
            let comp = state.compMap[compId]
            if (comp == null || param == null || param.attrs == null || Object.keys(param).indexOf('value') == -1) {
                return
            }
            param.attrs.shift()
            const attrs = param.attrs,
                value = param.value
            let modifyData = comp,
                attrLen = attrs.length,
                index = 0
            if (attrLen == 0) {
                // console.error('修改选中组件值时，没有子属性')
                return
            }
            while (index != attrLen - 1) {
                modifyData = modifyData[attrs[index++]]
                if (!modifyData) {
                    // console.error(attrs[index - 1], '不存在，无法设置值为', value)
                    return
                }
            }
            modifyData[attrs[index]] = value
        },
        // 将组件拖拽到层中时更新组件属性
        updateCompConf(state, param) {
            let compId = param.compId
            let comp = state.compMap[compId]
            comp.compType = param.compType
            comp.layerId = param.layerId
            comp.parentCompId = param.parentCompId
            comp.box.width = param.box.width
            comp.box.height = param.box.height
            comp.box.left = param.box.left
            comp.box.top = param.box.top
        },
        // 移出层组件时更新组件属性
        updateCompConfForRemoveLayer(state, param) {
            let compId = param.compId
            let comp = state.compMap[compId]
            comp.compType = param.compType
            delete(comp.layerId)
            delete(comp.parentCompId)
            comp.box.width = param.box.width
            comp.box.height = param.box.height
            comp.box.left = param.box.left
            comp.box.top = param.box.top
        },
        // 更新容器组件的层数据
        updateLayer(state, param) {
            let compId = param.compId
            let comp = state.compMap[compId]
            comp.layer = param.layer
        },
        //更新GIS专题子组件顺序
        updateGisProLayer(state, param) {
            let compId = param.compId
            let comp = state.compMap[compId]
            comp.style.proLayer = param.pro
        },
        //更新GIS矢量子组件顺序
        updateGisVecLayer(state, param) {
            let compId = param.compId
            let comp = state.compMap[compId]
            comp.style.vecLayer = param.vec
        },
        // 删除层
        delLayer(state, param) {
            let compId = param.compId
            let comp = state.compMap[compId]
            for (let i = 0; i < comp.layer.length; i++) {
                if (comp.layer[i].id === param.layerId) {
                    comp.layer.splice(i, 1)
                        // 删除层下的组件
                    this.commit("removeComsByLayerId", param.layerId)
                    break
                }
            }
        },
        delGisLayer(state, param) {
            let compId = param.compId
            let comp = state.compMap[compId].style
            for (let i = 0; i < comp.proLayer.length; i++) {
                if (comp.proLayer[i].id === param.chid) {
                    comp.proLayer.splice(i, 1)
                        // 删除层下的组件
                    this.commit('removeComs', param.chid)
                    return
                }
            }
            for (let i = 0; i < comp.vecLayer.length; i++) {
                if (comp.vecLayer[i].id === param.chid) {
                    comp.vecLayer.splice(i, 1)
                        // 删除层下的组件
                    this.commit('removeComs', param.chid)
                    return
                }
            }
        },
        updateLinkageMonitors(state, param) {
            if (!param.monitors) {
                return
            }

            state.compMap[param.compId].linkage.monitors = param.monitors
        },
        updateCompDataSource(state, param) {
            if (!param || !param.compId) {
                return
            }
            state.compMap[param.compId].data.datasource = param.datasource
        },
        initComponents(state, obj) {
            // 合并本地最新配置 设计模式处理配置合并
            for (let comp in obj.map) {
                let compType = obj.map[comp]['componentName']
                let compConf = util.getCompLocalConf(compType) //找不到返回null，说明组件不存在或者换名字了，为了防止报错删除此组件
                if (compConf) {
                    obj.map[comp] = _.merge(compConf, obj.map[comp])
                } else {
                    Vue.delete(obj.map, comp)
                }
            }
            state.compMap = obj.map
            state.compIndex = obj.index
        },
        clearCompMap(state) {
            for (let key in state.compMap) {
                this.commit('removeComs', key)
            }
            state.compMap = {}
            state.compIndex = 1
        },
        updateCompState(state, param) {
            if (!param || !param.compId) {
                return
            }

            state.compMap[param.compId].state = param.state
        },
        setToken(state, newVal) {
            localStorage.setItem("customList", newVal)
        },
        // 更新静态数据数据描述配置
        updateCompDataStaticMeta(state, param) {
            state.compMap[param.compId].data.conf.datasetMeta = param.data
        }
    },
    getters: {
        compList(state) {
            let comps = state.compMap
            var result = []
            for (let compId in comps) {
                let comp = comps[compId]
                if (comp.compId) {
                    result.push(comp)
                }
            }
            result.sort(function(a, b) {
                return b.compIndex - a.compIndex
            })

            return result
        },
        getActiveCompCount(state) {
            let comps = state.compMap
            var result = 0
            for (let compId in comps) {
                let comp = comps[compId]
                if (comp.isActive) {
                    result++
                }
            }
            return result
        },
        getFirstActiveComp(state) {
            let comps = state.compMap
            for (let compId in comps) {
                let comp = comps[compId]
                if (comp.isActive) {
                    return comp
                }
            }
            return null
        },
        getCompConf: (state) => (compId) => {
            return state.compMap[compId]
        },
        getToken(state) {
            let customList = localStorage.getItem('customList')
            return !!customList ? JSON.parse(customList) : customList = []
        },

    },
    actions: {
        moveUp({ commit, getters }) {
            let comps = getters.compList

            let preComp = null

            for (let compId in comps) {
                let comp = comps[compId]

                if (!comp.isActive) {
                    preComp = comp
                    continue
                }

                if (!preComp) {
                    continue
                }

                let activeCompIndex = comp.compIndex
                commit('updateCompIndex', {
                    compId: comp.compId,
                    compIndex: preComp.compIndex
                })
                commit('updateCompIndex', {
                    compId: preComp.compId,
                    compIndex: activeCompIndex
                })
            }
        },
        moveDown({ commit, state, getters }) {
            let comps = state.compMap
            var result = []
            for (let compId in comps) {
                let comp = comps[compId]
                if (comp.compId) {
                    result.push(comp)
                }
            }

            let compList = result.sort(function(a, b) {
                return a.compIndex - b.compIndex
            })

            let preComp = null

            for (let i in compList) {
                let comp = compList[i]

                if (!comp.isActive) {
                    preComp = comp
                    continue
                }

                if (!preComp) {
                    continue
                }

                let activeCompIndex = comp.compIndex
                commit('updateCompIndex', {
                    compId: comp.compId,
                    compIndex: preComp.compIndex
                })
                commit('updateCompIndex', {
                    compId: preComp.compId,
                    compIndex: activeCompIndex
                })
            }
        },
        moveTop({ commit, state, getters }) {
            let comps = getters.compList
            let activeCount = getters.getActiveCompCount
            let allCount = comps.length

            let activeIndex = allCount
            let noActiveIndex = allCount - activeCount

            for (let i in comps) {
                let comp = comps[i]

                if (comp.isActive) {
                    commit('updateCompIndex', {
                        compId: comp.compId,
                        compIndex: activeIndex
                    })
                    activeIndex--
                    continue
                }

                commit('updateCompIndex', {
                    compId: comp.compId,
                    compIndex: noActiveIndex
                })
                noActiveIndex--
            }
        },
        moveBottom({ commit, state, getters }) {
            let comps = getters.compList
            let activeCount = getters.getActiveCompCount
            let allCount = comps.length

            let activeIndex = activeCount
            let noActiveIndex = allCount

            for (let i in comps) {
                let comp = comps[i]

                if (comp.isActive) {
                    commit('updateCompIndex', {
                        compId: comp.compId,
                        compIndex: activeIndex
                    })
                    activeIndex--
                    continue
                }

                commit('updateCompIndex', {
                    compId: comp.compId,
                    compIndex: noActiveIndex
                })
                noActiveIndex--
            }
        },
        addComp({ commit, state, getters }, compName) {
            let activeComp = getters.getFirstActiveComp
            let dm = Vue.prototype.$dm,
                customCode = '',
                template;
            // 添加到组件列表；添加到预览容器；激活属性页面

            template = getComObj(compName)
            if (template.type === 'gisProComp' || template.type === 'gisVecComp') {
                if (!activeComp || activeComp.componentName !== 'baseMap') {
                    return;
                }
            } else {
                commit('cleanAllActive')
            }
            if (Array.isArray(compName)) { //判断如果传过来的事数组，
                customCode = compName[1]
                compName = compName[0]
                return;
            }
            commit('incrementCompId')
            let box = util.deepCopy(template.style.box)
            if (box && typeof box.rotate == 'undefined') {
                box.rotate = 0
            }
            let compConf = {
                'name': template.cn_name,
                'componentName': compName,
                'compType': 'component', //组件类型 component 组件, layerChildren 层内组件 ,container 容器组件 ,gis专题子组件 themeLayer
                'compDef': template.type,
                'compId': 'comp_' + state.compIndex,
                'compIndex': Object.getOwnPropertyNames(state.compMap).length,
                'state': null,
                'box': box,
                'style': util.deepCopy(template.style.conf),
                'property': util.deepCopy(template.style.property),
                'isHighlight': false,
                'isActive': ['gisProComp', 'gisVecComp'].indexOf(template.type) === -1,
                'customCode': customCode
            }
            if (['compContainer', 'containerDrill'].includes(compName)) {
                template.style.layer.forEach(item => {
                    let id = "layer_" + util.guid()
                    item.parentId = 'comp_' + state.compIndex
                    item.id = id
                    item.name = `层${id}`
                })
                compConf.compType = 'container'
                compConf.layer = util.deepCopy(template.style.layer)
                compConf.currentLayerId = template.style.layer[0].id
            } else {
                // 添加到容器组件的层中
                if (activeComp && ['compContainer', 'containerDrill'].includes(activeComp.componentName)) {
                    compConf.layerId = activeComp.currentLayerId
                    compConf.parentCompId = activeComp.compId
                    compConf.box.top = 0
                    compConf.box.left = 0
                    compConf.box.width = activeComp.box.width / 2
                    compConf.box.height = activeComp.box.height / 2
                    compConf.compType = 'layerChildren'
                }
                if (compConf.compDef === 'gisProComp') {
                    compConf.baseId = activeComp.compId
                    compConf.compType = 'themeLayer'
                    let proLayer = util.deepCopy(activeComp.style.proLayer)
                    proLayer.push({
                        id: compConf.compId,
                        show: true,
                        type: 'comp',
                        pType: 'pro',
                        parentId: activeComp.compId,
                        componentName: compConf.componentName
                    })
                    commit('modifyValueByCompId', {
                        attrs: [activeComp.compId, 'style', 'proLayer'],
                        value: proLayer
                    })
                }
                if (compConf.compDef === 'gisVecComp') {
                    compConf.baseId = activeComp.compId
                    compConf.compType = 'themeLayer'
                    let vecLayer = util.deepCopy(activeComp.style.vecLayer)
                    vecLayer.push({
                        id: compConf.compId,
                        show: true,
                        type: 'comp',
                        pType: 'vec',
                        parentId: activeComp.compId,
                        componentName: compConf.componentName
                    })
                    commit('modifyValueByCompId', {
                        attrs: [activeComp.compId, 'style', 'vecLayer'],
                        value: vecLayer
                    })
                }
            }
            if (template.data) {
                compConf.data = {
                    conf: util.deepCopy(template.data.conf),
                    datasource: util.deepCopy(template.data.datasource)
                }
                if (template.getStaticTemplateData) {
                    let staticTemplate = template.getStaticTemplateData();
                    compConf.staticTempletData = util.deepCopy(staticTemplate.datasource)
                    compConf.staticTempletDataConf = util.deepCopy(staticTemplate.conf)

                    if (compConf.staticTempletDataConf) {
                        compConf.staticTempletDataConf.datasetMeta = _tempDataReg.getCloneDataSetMeta(compConf.staticTempletData.tempCode)
                    }
                }
                // 设置数据描述
                if (compConf.data.conf && compConf.staticTempletData && compConf.staticTempletData.tempCode) {
                    compConf.data.conf.datasetMeta = _tempDataReg.getCloneDataSetMeta(compConf.staticTempletData.tempCode)
                }
            }
            if (template.linkage) {
                compConf.linkage = util.deepCopy(template.linkage.conf)
            }
            dm.initCompData(compConf) //处理数据
            commit('setComp', compConf) //保存组件
        },
        copyComp({ commit, state, getters }, comsData) {
            let comp = getters.getFirstActiveComp
            if (!comp) return
            if (comp && ['compContainer', 'containerDrill'].includes(comp.componentName)) {
                console.log('容器组件暂不允许复制')
                return
            }
            let dm = Vue.prototype.$dm,
                customCode = ''
            commit('cleanAllActive')
            commit('incrementCompId')
            let compConf = {
                'name': comp.name,
                'componentName': comp.componentName,
                'compId': 'comp_' + state.compIndex,
                'compIndex': Object.getOwnPropertyNames(state.compMap).length,
                'state': comp.state,
                'box': util.deepCopy(comp.box),
                'style': util.deepCopy(comp.style),
                'property': util.deepCopy(comp.property),
                'isHighlight': false,
                'isActive': true,
                'customCode': comp.customCode
            }
            if (comp.data) {
                compConf.data = util.deepCopy(comp.data)
                if (comp.staticTempletData) {
                    compConf.staticTempletData = util.deepCopy(comp.staticTempletData)
                    compConf.staticTempletDataConf = util.deepCopy(comp.staticTempletDataConf)
                        // 设置数据描述
                    compConf.staticTempletDataConf.datasetMeta = _tempDataReg.getCloneDataSetMeta(compConf.staticTempletData.tempCode)
                }
            }
            if (comp.linkage) {
                compConf.linkage = util.deepCopy(comp.linkage)
            }
            dm.initCompData(compConf)
            commit('setComp', compConf)
        },
        // 将组件添加到容器中
        onMoveToContainer({ commit, state, getters }, param) {
            let comp = getters.getCompConf(param.compId)
            let container = getters.getCompConf(param.containerId)
            let compId = comp.compId
            let compType = 'layerChildren'
            let layerId = container.currentLayerId
            let parentCompId = container.compId
            commit('updateCompConf', {
                compId,
                compType,
                layerId,
                parentCompId,
                box: {
                    width: comp.box.width,
                    height: comp.box.height,
                    left: comp.box.left - container.box.left,
                    top: comp.box.top - container.box.top
                }
            })
        },
        // 从容器中移出组件
        onRemoveFromContainer({ commit, state, getters }, param) {
            let comp = getters.getCompConf(param.compId)
            let container = getters.getCompConf(param.containerId)
            let compId = comp.compId
            let compType = 'component'
            commit('updateCompConfForRemoveLayer', {
                compId,
                compType,
                box: {
                    width: comp.box.width,
                    height: comp.box.height,
                    left: comp.box.left - container.box.left,
                    top: comp.box.top - container.box.top
                }
            })
        },
        updateToken(context, value) {
            context.commit('setToken', JSON.stringify(value));
        },
        delToken(context, value) {
            context.commit('removeToken', value);
        }
    }
}