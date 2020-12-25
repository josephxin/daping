import Vue from 'vue'

const componentName = 'horizontalNav'

const cn_name = '水平菜单栏'

function install() {
    // 注册组件
    Vue.component(componentName, () =>
        import('./horizontalNav'))
}

export default {
    componentName,
    cn_name,
    install
}