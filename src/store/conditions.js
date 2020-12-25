//存储前一次数据的请求条件和orderby
import { merge } from "lodash"
export default {
    state: {
        conditions: {}
    },
    mutations: {
        //设置联动数据
        setConditions(state, payload) {
            merge(state.conditions, payload)
        }
    },

    getters: {
        // 获取所有的联动事件参数
        getConditions(state) {
            return state.conditions
        },
        // 通过compId获取联动事件参数
        getConditionsByCompId: (state) => (compId) => {
            if (!compId) return {}
            return state.conditions[compId] || []
        }
    },

    actions: {

    }
}