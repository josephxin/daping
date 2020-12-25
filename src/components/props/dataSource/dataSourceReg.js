import Vue from 'vue'

import store from '../../../store/store'

// ui的名字为 数据源类型 + DTUI
const type = {
    static: 'staticDTUI',
    api: 'apiDTUI',
    excel: 'excelDTUI',
    database: 'databaseDTUI',
    showData: 'showDataDTUI',
    dataset: 'datasetDTUI',
    gisServer:'gisServerUI',
    gisSet:'gisSetUI'
}

const identifyName = 'data'

function loadDataSourceComs() {
    Vue.component(type.static, () =>
        import ('./static.vue'))
    Vue.component(type.api, () =>
        import ('./api.vue'))
    Vue.component(type.excel, () =>
        import ('./excel.vue'))
    Vue.component(type.database, () =>
        import ('./database.vue'))
    Vue.component(type.dataset, () =>
        import ('./dataset.vue'))
    Vue.component(type.gisServer, () =>
        import ('./gisServer.vue'))
    Vue.component(type.gisSet, () =>
        import ('./gisSet.vue'))
}

function getVal(param) {
    let selectObj = store.getters['getFirstActiveComp']
    let params = param.split(' '),
        len = params.length,
        index = 0
    if (!selectObj[identifyName]) {
        return
    }
    selectObj = selectObj[identifyName]
    while (index < len) {
        selectObj = selectObj[params[index++]]
    }
    return selectObj
}

// 校验合法后，再更新值
function updateValue(value, data, verify) {
    let isResult = true
    if (verify) {
        if (typeof verify === 'string') {
            isResult = new RegExp(verify).test(value)
        } else if (typeof verify === 'function') {
            isResult = verify(value)
        }
    }
    if (!isResult) {
        // event.target.value = getVal(data);
        return
    }

    onlyUpdateAttr(data, value)
}

// 仅更新属性
function onlyUpdateAttr(key, value) {
    let datas = key.split(' ')
    datas.unshift(identifyName)
    store.commit('modifyValueBySelected', {attrs: datas, value})
}

function onlyUpdateDataSetAttr(key, value) {
    let datas = key.split(' ')
    datas.unshift(identifyName)
    store.commit('modifyValueBySelected', {attrs: datas, value})
}

export {type, loadDataSourceComs, getVal, updateValue, onlyUpdateAttr, onlyUpdateDataSetAttr}
