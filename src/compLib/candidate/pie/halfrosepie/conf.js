import Vue from 'vue'

const componentName =  'halfrosepie';

const cn_name = '南丁格尔玫瑰图';

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
    Vue.component(componentName,() => import('./HalfRosePie'));
}

export default {
    componentName,
    cn_name,
    style,
    install
}