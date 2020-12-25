import Vue from 'vue'

const componentName =  'pyarmidchart';

const cn_name = '金字塔图';

const style = {
    box:{
        width:600,
        height:600,
        top:300,
        left:300
    }
};

function install(isDesign){
    // 注册组件
    Vue.component(componentName,() => import('./PyarmidChart'));
}

export default {
    componentName,
    cn_name,
    style,
    install
}