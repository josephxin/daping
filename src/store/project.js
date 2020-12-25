import Vue from 'vue'
import util from '@/util/util'

export default {
    state: {
        //系统内置导航组件，用于选择导航类型
        navOptions: [],
        //项目列表
        projectList: [],
        //项目id
        projectId: '', 
        //项目所属页面列表
        pageList: [],
    },
    getters: {},
    mutations: {
        changeNavOptions(state, data) {
            state.navOptions = data
        },
        changeProjectList(state, data) {
            state.projectList = data
        },
        changeProjectId(state, data) {
            state.projectId = data;
        },
        changePageList(state, data) {
            state.pageList = data
        },
    },
    actions: {
        aaa({ commit, state, getters }) {

        }
    }
}
