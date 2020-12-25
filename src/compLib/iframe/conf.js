import Vue from 'vue'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import { comType } from '../../components/props/edit/EditCompReg'

const componentName = 'customIframe'

const cn_name = '自定义iframe'

const style = {
    box: {
        width: 800,
        height: 600,
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
    },
    conf: {
        value: "value", //[必设项]值
    },
    confView: [{
        name: '值',
        fieldName: 'value',
        value: 'value',
        optional: false
    }]
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./Iframe'))
}

export default {
    componentName,
    cn_name,
    style,
    data,
    install
}