import Vue from 'vue'

export default {
    state: {
        compData: {}
    },
    mutations: {
        insertCompData(state, compData) {
            Vue.set(state.compData, compData.compId, compData.data);
        },
        deleteCompData(state, compId) {
            Vue.delete(state.compData, compId);
        },
        updateCompData(state, conf) {
            state.compData[conf.compId] = conf.data
        },
        initCompData(state, compData) {
            state.compData = compData;
        },
        clearCompData(state) {
            state.compData = {}
        }
    },
    getters: {
        getCompData: (state, getters, rootState) => (compId) => {
            return state.compData[compId]
            console.log(compData)
            let compDataConf = rootState.components.compMap[compId].data.conf;
            let items = [];
            let itemsConf = [];
            let result = {};

            for (let item in compDataConf) {
                items.push(item);
                itemsConf.push(compDataConf[item]);

                if ("series" == item) {
                    result[item] = {};
                    continue;
                }

                result[item] = [];
            }

            return result;
        }
    }
}