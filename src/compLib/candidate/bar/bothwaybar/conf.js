import Vue from 'vue'

const componentName = 'bothwaybar';

const cn_name = '双向对比柱图';

const style = {
    box: {
        width: 900,
        height: 400,
        top: 300,
        left: 300
    }
};

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./BothwayBar'));
}

export default {
    componentName,
    cn_name,
    style,
    install
}