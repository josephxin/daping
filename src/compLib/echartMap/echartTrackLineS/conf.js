import Vue from 'vue'

const componentName =  'eLineMapS';

const cn_name = '飞线图';

const style = {
    confView:[],

    box:{
        width:800,
        height:800,
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
    Vue.component(componentName,() => import('./echartTrackLineS'));
}

export default {
    componentName,
    cn_name,
    style,
    data,
    install
}
