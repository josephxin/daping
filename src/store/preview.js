import Vue from 'vue'
import util from '../util/util'
import api from "@/api/project"
import router from "@/router/router"
import _ from 'lodash'

export default {
    state: {
        screen: {
            idName: 'screen',
            value: null
        },
        components: {
            idName: 'compList',
            indexName: 'compIndex',
            value: null
        },
        compData: {
            idName: 'compData',
            value: null
        },
        customList: [],
        status: false,
        eventLoaded: false
    },

    mutations: {
        setScreen(state, value) {
            state.screen.value = value
        },
        /**
         * 修改事件加载状态
         * @param {*} state 
         * @param {value} (true | false )
         */

        changeEventLoaded(state, value) {
            state.eventLoaded = value
        },
        setComponents(state, comps) {
            // 合并本地最新配置
            for (let comp in comps) {
                let compType = comps[comp]['componentName']
                let compConf = util.getCompLocalConf(compType) //找不到返回null，说明组件不存在或者换名字了，为了防止报错删除此组件
                if (compConf) {
                    comps[comp] = _.merge(compConf, comps[comp])
                } else {
                    Vue.delete(comps, comp)
                }
            }
            state.components.value = comps
        },
        setCompData(state, value) {
            state.compData.value = value
        },
        setStatus(state, value) {
            state.status = value
        },
        setCustomList(state, payload) {
            state.customList = payload
        },
        modifyValueByGIS(state, param) {
            let comp = state.components.value
            if (!comp) {
                comp = this._modules.root.state.components.compMap[param.attrs[1]]
            } else {
                comp = comp[param.attrs[1]]
            }
            if (comp == null || param == null || param.attrs == null || Object.keys(param).indexOf('value') == -1) {
                return
            }
            param.attrs.splice(1, 1)
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
        clearData(state) {
            state.status = false
                //state.screen.value = {}
            state.components.value = []
            state.compData.value = []
            state.customList = []
        }
    },

    getters: {
        getPreviewState(state) {
            return state.status
        }
    },

    actions: {
        async save({ commit, dispatch, state, rootState }, vue) {
            let dialogTitle = vue.dialogTitle;
            let pageId = vue.formObj.pid;
            let sourceProjectId = vue.formObj.sourceProjectId;
            let targetProjectId = vue.formObj.targetProjectId;
            //console.log("save -> pageId", pageId)//第一次保存为''，以后保存有值
            const loading = vue.$loading({ lock: true })
            let res = await dispatch('saveData', {
                pageId: pageId,
                sourceProjectId: sourceProjectId,
                targetProjectId: targetProjectId,
                image: vue.formObj.imgPath,
                name: vue.formObj.name,
                description: vue.formObj.description,
                status: rootState.window.status
            })
            console.log("save -> res", res)
            loading.close()
            if (res.code == 200) {
                let pageId = res.data;
                vue.$alert('保存成功', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        //if (dialogTitle == '保存') {
                        window.history.pushState(null, '', `?projectId=${targetProjectId}&pageId=${pageId}`)
                        let obj = { "pageId": pageId }
                        commit('setPageInfo', obj)
                        commit('pidMsg', vue.formObj)
                            //}
                    }
                })
            } else {
                vue.$alert(res.message, '提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                })
            }
        },

        async saveData({ commit, state, rootState }, obj) {
            let json = {}
            let pageId = obj.pageId;
            let sourceProjectId = obj.sourceProjectId;
            let targetProjectId = obj.targetProjectId;
            json['projectId'] = sourceProjectId
            json['state'] = obj.status
            json['name'] = obj.name
            json['description'] = obj.description
            json['image'] = obj.image
            let data = {}
            data[state.screen.idName] = rootState.window.preview
            data[state.components.idName] = rootState.components.compMap
            data[state.compData.idName] = _.cloneDeep(rootState.compData.compData)
            data[state.components.indexName] = rootState.components.compIndex
            data['globalParams'] = rootState.window.globalParams
            data['isShowLog'] = rootState.window.isShowLog
            data['eventsRelations'] = this._vm.$evtBus.getSaveRels()
                // 当组件数据为数据集时 清空配置里的数据
            for (let comp in data.compList) {
                if (data.compList[comp].data && data.compList[comp].data.datasource && data.compList[comp].data.datasource.type === 'dataset') {
                    data.compData[comp] = []
                }
            }
            json['conf'] = JSON.stringify(data);
            //保存、修改、另存页面时，需要提供页面中引用的数据集code列表，需要去重。
            let dataSetCodeList = util.getDataSetCodeList(rootState.components.compMap);
            json['dataSetIdList'] = dataSetCodeList;
            //console.log(pageId, json);
            //return;
            let ret;
            if (sourceProjectId == targetProjectId) {
                if (pageId) {
                    ret = api.updatePage(pageId, json)
                } else {
                    ret = api.savePage(json)
                }
            } else {
                ret = api.saveAsPage(targetProjectId, json)
            }
            commit('setPageInfo', obj)
            return ret
        },

        async saveDataAndJump({ commit, dispatch, state, rootState }, params) {
            // 保存屏幕信息；保存组件列表信息
            if (util.dataSaveMode() == util.serverMode) {
                let pageStatus = params.status;
                let $vue = params.vue;
                let formObj = $vue.formObj;
                let sourceProjectId = formObj.sourceProjectId;
                let targetProjectId = formObj.targetProjectId;
                let pageId = formObj.pid;
                if (!pageStatus) {
                    pageStatus = rootState.window.status
                }
                const loading = $vue.$loading({ lock: true })
                let res = await dispatch('saveData', {
                    pageId: pageId,
                    sourceProjectId: sourceProjectId,
                    targetProjectId: targetProjectId,
                    image: formObj.imgPath,
                    name: formObj.name,
                    description: formObj.description,
                    status: pageStatus
                })
                console.log("saveDataAndJump -> res", res)
                loading.close()
                if (res.code == 200) {
                    //页面预览要传projectId，用于配合数据集code获取数据集id
                    let routerWidthPage = router.resolve({ path: '/page-preview', query: { projectId: targetProjectId, pageId } })
                    window.open(routerWidthPage.href, '_blank');
                } else {
                    $vue.$alert('保存预览或发布数据失败', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                }
            } else {
                util.setLocalStore(state.screen.idName, JSON.stringify(rootState.window.preview))
                util.setLocalStore(state.components.idName, JSON.stringify(rootState.components.compMap))
                util.setLocalStore(state.compData.idName, JSON.stringify(rootState.compData.compData))
                util.setLocalStore("customList", JSON.stringify(rootState.components.customList))
                util.setLocalStore('eventsRelations', JSON.stringify(this._vm.$evtBus.getSaveRels()))
                if (rootState.window.isShowLog) {
                    localStorage.setItem("isShowLog", "1");
                } else {
                    localStorage.removeItem("isShowLog");
                }
                //页面预览要传projectId，用于配合数据集code获取数据集id
                let routerNoPage = router.resolve({ path: '/page-preview', query: { projectId: rootState.project.projectId } })
                window.open(routerNoPage.href, '_blank')
            }
        },

        publish({ dispatch }, $vue) {
            let params = {}
            params['vue'] = $vue
            params['status'] = 2
            dispatch('saveDataAndJump', params) // 2 为发布状态
        },

        async loadData({ commit, state }, result) {
            commit('setStatus', true)
            if (!_.isEmpty(result)) {
                //result有值则是接口返回
                commit('setScreen', result[state.screen.idName])
                let map = result[state.components.idName]
                let compData = result[state.compData.idName]
                    // 这里处理的是数据集数据的初始化
                for (let m in map) {
                    if (map[m].data && map[m].data.datasource && ['dataset', 'gisSet'].includes(map[m].data.datasource.type) && this._vm.$dm._checkRequireFields(map[m])) {
                        //console.log(map[m])
                        let cd = await this._vm.$dm.parseData(map[m])
                        let resData = []
                        cd.forEach(item => {
                            if (item.data) resData.push(item.data.dataValues)
                        })
                        compData[m] = resData
                    }
                }
                commit('setCompData', compData)
                commit('setComponents', map) //此处放在compData 后是因为有些组件需要有数据后才能进行渲染
                try {
                    commit('setCustomList', result.customList)
                    this._vm.$evtBus.initialize(result.eventsRelations)
                } catch (e) {
                    console.error("setCustomList error", e)
                }
            } else {
                //result为null则是本地模式
                commit('setScreen', JSON.parse(util.getLocalStore(state.screen.idName)))
                commit('setCompData', JSON.parse(util.getLocalStore(state.compData.idName)))
                commit('setComponents', JSON.parse(util.getLocalStore(state.components.idName)))
                commit('setCustomList', JSON.parse(util.getLocalStore("customList")))
                if (util.getLocalStore('eventsRelations')) this._vm.$evtBus.initialize(JSON.parse(util.getLocalStore('eventsRelations')))
            }
            //调用的是compData.js中的initCompData方法
            //不论是设计模式还是预览模式，组件使用的数据都来自于store模块compData.js
            commit('initCompData', state.compData.value)
        },

        initPageSize({ state }) {
            let value = state.screen.value
            let cssText
            if (util.isBigScreen) {
                let scaleWidth = window.innerWidth / value.screenWidth
                    //let scaleHeight = window.innerHeight / value.screenHeight
                cssText = 'overflow: hidden;' +
                    'height:' + value.screenHeight + 'px;' +
                    'width:' + value.screenWidth + 'px;' +
                    'transform-origin: 0 0;' +
                    'transform: scale(' + scaleWidth + ');' +
                    'background: ' + value.background + ';'
            } else {
                let scaleWidth = window.innerWidth / value.baseWidth
                cssText =
                    'height:' + value.baseHeight + 'px;' +
                    'width:' + value.baseWidth + 'px;' +
                    'transform-origin: 0 0;' +
                    'transform: scale(' + scaleWidth + ');' +
                    'background: ' + value.background + ';'
            }
            if (value.backgroundImage) {
                cssText += `background-image:url(${value.backgroundImage}); background-size:100% 100%; background-repeat:no-repeat; background-position:0 0;`
            }
            document.querySelector("#app").style.cssText = cssText
                //document.querySelector("body").style.overflow = 'initial'
        }
    }
}