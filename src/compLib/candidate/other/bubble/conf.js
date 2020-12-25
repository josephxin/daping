import Vue from 'vue'

const componentName = 'bubble';

const cn_name = '气泡图';

const style = {
    box: {
        width: 600,
        height: 500,
        top: 300,
        left: 300
    }
};

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./Bubble'));
}

export default {
    componentName,
    cn_name,
    style,
    install
}