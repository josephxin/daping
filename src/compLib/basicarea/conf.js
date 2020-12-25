import Vue from 'vue'
import {comType} from '../../components/props/edit/EditCompReg'

const componentName =  'basicarea';

const cn_name = '基础区域图';

const style = {
    conf:{
        width:400,
        height:200,
        top:300,
        left:300,
        backgroundColor:"rgba(0,0,0,0)"
    },
    confView:[
        {
            type:comType.TEXT,
            name: '背景色',
            value:"backgroundColor",
            verify:"",
            default: '文本示例数据'
        }
    ]
};

const data = {
    datasource:{
        type:"static",
        tempCode:"DataTemp1D"
    },
    conf:{
        classify:"time",//[必设项]分类
        value:"value"//[必设项]值
    },
    confView:[]
}

const linkage = {
    conf:{
        name:null,
        monitors:[]
    },
    confView:[]
}

function install(isDesign){
    // 注册组件
    Vue.component(componentName,() => import('./BasicArea'));
}


export default {
    componentName,
    cn_name,
    style,
    data,
    linkage,
    install
}