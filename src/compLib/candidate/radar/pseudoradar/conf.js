import Vue from 'vue'

const componentName =  'pseudoRadar';

const cn_name = '伪雷达';

const style = {
    confView:[],

    box:{
        width:500,
        height:500,
        top:100,
        left:100
    }
};

const data = {
    datasource: {
        type: "static",
        tempCode: "text"
    },
    confView: [],
    conf: {}

};

function install(isDesign){
    // 注册组件
    Vue.component(componentName,() => import('./main'));
}

export default {
    componentName,
    cn_name,
    style,
    data,
    install
}