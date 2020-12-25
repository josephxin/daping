import Vue from 'vue'
import {comType} from '../../../components/props/edit/EditCompReg'
const componentName =  'eLineMapF';

const cn_name = '飞线图2';

const style = {
    box:{
        width:900,
        height:600,
        top:300,
        left:300
    },
    conf:{
        backgroundColor:"rgba(0,0,0,0)"
    },
    confView:[]
};

const data = {
    datasource:{
        type:"static",
        tempCode:"DataTemp2D"
    },
    conf:{
        classify:"time",//[必设项]分类
        value:"value",//[必设项]值
        legend:"name",//[可选项]图例代码，用以区分不同系列数据
    },

    confView:[
    ]
}

const linkage = {
    conf:{
        linkages:[{
            testlinkage:name
        }],
        monitors:[]
    },
    confView:[]
}

const carousel = {
    conf:{
        open:false,
        interval:7
    },
    confView:[]
}

function install(isDesign){
    // 注册组件
    Vue.component(componentName,() => import('./echartTrackLineF'));
}


export default {
    componentName,
    cn_name,
    style,
    data,
    linkage,
    carousel,
    install
}
