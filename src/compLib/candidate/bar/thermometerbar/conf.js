import Vue from 'vue'

const componentName =  'thermometerbar';

const cn_name = '温度计柱图';

const style = {
    box:{
        width:900,
        height:400,
        top:300,
        left:300
    }
};

function install(isDesign){
    // 注册组件
    Vue.component(componentName,() => import('./ThermometerBar'));
}

export default {
    componentName,
    cn_name,
    style,
    install
}