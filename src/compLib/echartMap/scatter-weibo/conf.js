import Vue from 'vue'

const componentName =  'scatter';

const cn_name = '点亮中国';

const style = {
    confView:[],

    box:{
        width:800,
        height:600,
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