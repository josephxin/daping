// import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import components from './components'
import window from './window'
import comListComponent from './comListComponent'
import preview from './preview'
import compData from './compData'
import dataSource from './dataSource'
import linkage from './linkage'
import project from './project'
import conditions from './conditions'
Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    modules: {
        components,
        compData,
        comListComponent,
        preview,
        window,
        dataSource,
        linkage,
        project,
        conditions
    }
})