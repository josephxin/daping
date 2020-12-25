import Vue from 'vue'

const componentName =  'progressBar';

const cn_name = '进度条';

const style = {
    confView:[],

    box:{
        width:800,
        height:100,
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