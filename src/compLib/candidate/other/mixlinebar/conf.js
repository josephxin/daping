import Vue from 'vue'

const componentName = 'mixlinebar';

const cn_name = '折柱混合图';

const style = {
    box: {
        width: 500,
        height: 300,
        top: 300,
        left: 300
    }
};

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./MixLineBar'));
}

export default {
    componentName,
    cn_name,
    style,
    install
}