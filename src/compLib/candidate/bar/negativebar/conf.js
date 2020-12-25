import Vue from 'vue'
import util from '@/util/util'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
const componentName = 'negativebar';

const cn_name = '正负柱图';

const style = {
    box: {
        width: 800,
        height: 500,
        top: 300,
        left: 300
    }
};

const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: 'DataTemp2D1'
    },
    conf: {
        classify: 'time', // [必设项]分类
        value: 'value', // [必设项]值
        legend: 'name' // [可选项]图例代码，用以区分不同系列数据
    },

    confView: [{
            name: '分类',
            fieldName: 'classify',
            value: 'time',
            optional: false
        },
        {
            name: '值',
            fieldName: 'value',
            value: 'value',
            optional: false
        },
        {
            name: '图例',
            fieldName: 'legend',
            value: 'name',
            optional: true
        }
    ]
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./NegativeBar'));
}

export default {
    componentName,
    cn_name,
    style,
    install,
    data,
    getStaticTemplateData
}
