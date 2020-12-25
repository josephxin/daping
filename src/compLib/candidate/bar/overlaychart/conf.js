import Vue from 'vue'

const componentName = 'overlaychart'

const cn_name = '柱折叠加柱图'

const style = {
  box: {
    width: 600,
    height: 300,
    top: 300,
    left: 300
  }
}

function install (isDesign) {
  // 注册组件
  Vue.component(componentName, () =>
        import('./OverlayChart'))
}

export default {
  componentName,
  cn_name,
  style,
  install
}
