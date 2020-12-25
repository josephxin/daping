import Vue from 'vue'
import util from '@/util/util'
const componentName = 'baserosepie';

const cn_name = '玫瑰图';

const style = {
    box: {
        width: 600,
        height: 500,
        top: 300,
        left: 300
    }
};

const data = {
    datasource: {
        type: "static",
        tempCode: "DataTemp1D"
    },
    conf: {
        value: "value", //[必设项]值
        legend: "name", //[可选项]图例代码，用以区分不同系列数据
    },
    confView: [{
            name: '值',
            fieldName: 'value',
            value: 'value',
            optional: true
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
        import ('./BaseRosePie'));
}

export default {
    componentName,
    cn_name,
    style,
    install,
    data,
    getStaticTemplateData
}
