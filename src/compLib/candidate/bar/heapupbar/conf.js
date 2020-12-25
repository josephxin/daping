import Vue from 'vue'

const componentName =  'heapupbar';

const cn_name = '堆叠柱图';

const style = {
    box:{
        width:800,
        height:400,
        top:300,
        left:300
    }
};

function install(isDesign){
    // 注册组件
    Vue.component(componentName,() => import('./HeapupBar'));
}

export default {
    componentName,
    cn_name,
    style,
    install
}