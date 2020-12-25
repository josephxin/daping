import Vue from 'vue'

const componentName =  'onewaybar';

const cn_name = '单向对比柱图';

const style = {
    box:{
        width:960,
        height:500,
        top:300,
        left:300
    }
};

function install(isDesign){
    // 注册组件
    Vue.component(componentName,() => import('./OnewayBar'));
}

export default {
    componentName,
    cn_name,
    style,
    install
}