import Vue from 'vue'

const componentName =  'multidimensionpie';

const cn_name = '多维饼图';

const style = {
    box:{
        width:600,
        height:500,
        top:300,
        left:300
    }
};

function install(isDesign){
    // 注册组件
    Vue.component(componentName,() => import('./MultiDimensionPie'));
}

export default {
    componentName,
    cn_name,
    style,
    install
}