import Vue from 'vue'

const componentName = 'wheelDisc'

const cn_name = '轮盘'

function install() {
    // 注册组件
    Vue.component(componentName, () =>
        import('./wheelDisc'))
}

export default {
    componentName,
    cn_name,
    install
}