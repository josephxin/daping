import { merge } from "lodash"
export default {
    state: {
        linkages: {}, //事件传递参数
        eventsRelations: {}, //事件关联关系
        globalParams: [] //全局参数
    },
    mutations: {
        //设置联动数据
        setLinkage(state, payload) {
            merge(state.linkages, payload)
                // Object.assign(state.linkages, payload)
        },
        // 删除联动数据
        delLinkage(state, compId) {
            let linkages = state.linkages
            linkages[compId] && delete(linkages[compId])
            state.linkages = linkages
        },
        setEventsRelations(state, payload) {
            state.eventsRelations = payload
        }
    },

    getters: {
        // 获取所有的联动事件参数
        getLinkages(state) {
            return state.linkages
        },
        // 通过compId获取联动事件参数
        getLinkagesByCompId: (state) => (compId) => {
            if (!compId) return {}
            return state.linkages[compId] || {}
        },
        getEventSRelations(state) {
            return state.eventsRelations
        }
    },

    actions: {

    }
}