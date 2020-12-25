import Vue from 'vue'

const componentName =  'pianobar';

const cn_name = '钢琴柱图';

const style = {
    box:{
        width:600,
        height:300,
        top:300,
        left:300
    }
};

function install(isDesign){
    // 注册组件
    Vue.component(componentName,() => import('./PianoBar'));
}

export default {
    componentName,
    cn_name,
    style,
    install
}