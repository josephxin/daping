import Vue from 'vue'
import { comType } from '../../components/props/edit/EditCompReg'
import util from '../../util/util'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import dataTool from 'echarts/extension/dataTool'
const componentName = 'defaultEcharts'

const cn_name = '自定义echarts'

const style = {

    box: {
        width: 600,
        height: 300,
        top: 300,
        left: 300
    },
    conf: {
        code: `var colors = [
          '#04d6ef',
          '#ef58ea',
          '#ff9e87',
          '#0cc2ff',
          '#fad860',
          '#9bca63',
          '#fe8463',
          '#975fe5',
          '#dc81d2',
          '#8d98b3'
      ];
        let option = {
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            grid: {
                right: '20%'
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['蒸发量', '降水量', '平均温度'],

                textStyle : {
                  color : '#fff'
                }
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                      onZero: true,
                      lineStyle:{
                        color:'#fff'
                      }
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '蒸发量',
                    min: 0,
                    max: 250,
                    position: 'right',
                    axisLine: {
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} ml'
                    }
                },
                {
                    type: 'value',
                    name: '降水量',
                    min: 0,
                    max: 250,
                    position: 'right',
                    offset: 80,
                    axisLine: {
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} ml'
                    }
                },
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 25,
                    position: 'left',
                    axisLine: {
                        lineStyle: {
                            color: colors[2]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            series: [
                {
                    name: '蒸发量',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name: '降水量',
                    type: 'bar',
                    yAxisIndex: 1,
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name: '平均温度',
                    type: 'line',
                    yAxisIndex: 2,
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        };
        return option
        `
    },

    confView: [{
        type: comType.CODE,
        name: '代码',
        value: 'code'
    }]
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

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./default.vue'))
}

export default {
    componentName,
    cn_name,
    style,
    data,
    linkage,
    carousel,
    install,
    getStaticTemplateData
}
