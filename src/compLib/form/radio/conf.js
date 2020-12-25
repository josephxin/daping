import Vue from 'vue'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
const componentName = 'formRadio'
const cn_name = '单选组件'
const style = {
    box: {
        width: 200,
        height: 60,
        top: 300,
        left: 300
    },
    conf: {
        //srcUrl: '',
    },
    confView: []
}
const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: "SingleData"
    }
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./radio'))
}

export default {
    componentName,
    cn_name,
    style,
    data,
    install
}