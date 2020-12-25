import Vue from 'vue'

const componentName = 'bothwayline'

const cn_name = '双向对比折线图'

const style = {
  box: {
    width: 800,
    height: 400,
    top: 300,
    left: 300
  }
}

function install (isDesign) {
  // 注册组件
  Vue.component(componentName, () =>
        import('./BothwayLine'))
}

export default {
  componentName,
  cn_name,
  style,
  install
}
