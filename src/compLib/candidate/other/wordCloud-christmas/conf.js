import Vue from 'vue'

const componentName =  'wordCloud-ch';

const cn_name = '词云-圣诞礼物';

const style = {
    confView:[],

    box:{
        width:600,
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