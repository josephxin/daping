import Vue from 'vue'
import util from '@/util/util'
const componentName = 'progresspie';

const cn_name = '进度环形图';

const style = {
    box: {
        width: 1000,
        height: 1000,
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

const linkage = {
    conf:{
        linkages:[],
        monitors:[]
    },
    confView:[{
        "value":"值"
    },{
        "legend":"图例"
    }]
}

const carousel = {
    conf:{
        open:false,
        interval:1,
        parent:null,
        child:null
    },
    confView:[]
}


function getStaticTemplateData() {
    return util.deepCopy(data)
}



function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./main'));
}

export default {
    componentName,
    cn_name,
    style,
    install,
    linkage,
    carousel,
    data,
    getStaticTemplateData
}
