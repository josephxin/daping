import Vue from 'vue'

const componentName = 'arearainfall';

const cn_name = '降雨量关系图';

const style = {
    box: {
        width: 800,
        height: 500,
        top: 300,
        left: 300
    }
};

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./AreaRainFall'));
}

export default {
    componentName,
    cn_name,
    style,
    install
}