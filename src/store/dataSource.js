import io from "../util/io"
import util from '@/util/util'
export default {
    state: {
        dataSourceList: []
    },
    mutations: {
        updateSourceList(state, data) {
            state.dataSourceList = data
        }
    },

    getters: {
        getDataSourceList(state) {
            return state.dataSourceList
        }
    },

    actions: {
        async getSourceList({ commit, state, rootState }, params) {
            // if (state.dataSourceList && state.dataSourceList.length) return state.dataSourceList
            let oldSource = await io.get(util.appServerURL() + 'datasource/sqldata/list')
            commit('updateSourceList', oldSource)
            return oldSource
        },
        async getOtherSourceList({ commit, state, rootState }, params) {
            let newSource = await io.get(util.metadataURL() + 'datasource?isStructure=1')
            newSource = newSource.data.filter(item => item.dbType === 'dm' || item.dbType === 'mysql')
            let temp = []
            newSource.forEach(item => {
                temp.push({
                    date: item.createTime,
                    type: item.dbType,
                    id: item.id,
                    dbName: item.dsConf.database,
                    isDelete: 0,
                    linkStatus: 1,
                    name: item.dbname,
                    domain: item.dsConf.address,
                    password: item.dsConf.password,
                    port: item.dsConf.port,
                    remark: item.remark,
                    username: item.dsConf.username,
                    status: 2,
                    from: 'new'
                })
            })
            return temp
        }
    },

}
