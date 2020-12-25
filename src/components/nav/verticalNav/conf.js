import Vue from 'vue'

const componentName = 'verticalNav'

const cn_name = '垂直菜单栏'

function install() {
    // 注册组件
    Vue.component(componentName, () =>
        import('./verticalNav'))
}

export default {
    componentName,
    cn_name,
    install
}