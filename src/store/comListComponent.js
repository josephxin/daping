import { MessageBox } from 'element-ui';

export default {
    state: {
        islogin: false,
        hasLogin: false
    },
    mutations: {
        enableLogin(state) {
            state.islogin = true
        }
    },
    actions: {
        delComs({ commit, rootGetters, rootState }) {
            let dataList = rootGetters.compList,
                isDelData = false;

            // 遍历组件，看看是否存在已选中的组件
            for (let dataId in dataList) {
                let data = dataList[dataId];
                if (data && data.isActive) {
                    isDelData = true;
                    break;
                }
            }
            if (isDelData) { // 没有需要删除的数据
                MessageBox.confirm('确定删除选中的组件吗？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (let dataId in dataList) {
                        let data = dataList[dataId];
                        if (data && data.isActive) {
                            if (data.componentName === 'compContainer') {
                                data.layer.forEach(item => {
                                    commit('removeComsByLayerId', item.id)
                                })
                            }
                            if (data.componentName === 'baseMap') {
                                data.style.proLayer.forEach(item => {
                                    commit('removeComs', item.id)
                                })
                                data.style.vecLayer.forEach(item => {
                                    commit('removeComs', item.id)
                                })
                            }
                            commit('removeComs', data.compId);//删除组件
                            commit('deleteCompData', data.compId);//删除组件数据
                        }
                    }
                    //console.log('del coms', rootState.components.compMap);
                }).catch(() => {})
            }
        },
        selectComs({ commit }, obj) {
            commit('changeActive', { compId: obj.compId, value: !obj.value });
        },
        selectOnlyOne({ commit }, compId) {
            commit('cleanAllActive');
            commit('changeActive', { compId: compId, value: true });
        },
        highLightCom({ commit }, compId) {
            commit('changeHighlight', { compId: compId, value: true });
        },
        cancelHighLightCom({ commit }, compId) {
            commit('changeHighlight', { compId: compId, value: false });
        },
        highLightLayerCom({ commit }, compId) {
            commit('changeHighlightLayer', { compId: compId, value: true });
        },
        cancelHighLightLayerCom({ commit }, compId) {
            commit('changeHighlightLayer', { compId: compId, value: false });
        }
    }
}
