import Vue from 'vue'
import util from '@/util/util'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
const componentName = 'multibar'

const cn_name = '多维条形图'

const style = {
  box: {
    width: 800,
    height: 450,
    top: 300,
    left: 300
  }
}
const data = {
  datasource: {
      type: DataSourceContext.STATIC,
      tempCode: 'DataTemp2D'
  },
  conf: {
      classify: 'time', // [必设项]分类
      value: 'value', // [必设项]值
      legend: 'name' // [可选项]图例代码，用以区分不同系列数据
  },

  confView: [{
      name: '分类',
      fieldName: 'classify',
      value: 'time',
      optional: false
  },
  {
      name: '值',
      fieldName: 'value',
      value: 'value',
      optional: false
  },
  {
      name: '图例',
      fieldName: 'legend',
      value: 'name',
      optional: true
  }
  ]
}

const linkage = {
  conf: {
      linkages: [],
      monitors: ['lineLegend']
  },
  confView: [
      { 'classify': '分类' },
      { 'value': '值' },
      { 'legend': '图例' }
  ]
}

const carousel = {
  conf: {
      open: false,
      interval: 1,
      parent: null,
      child: null
  },
  confView: []
}


function getStaticTemplateData() {
  return util.deepCopy(data)
}
function install (isDesign) {
  // 注册组件
  Vue.component(componentName, () =>
        import('./Multibar'))
}


export default {
    componentName,
    cn_name,
    style,
    install,
    linkage,
    carousel,
    data,
    getStaticTemplateData
}
