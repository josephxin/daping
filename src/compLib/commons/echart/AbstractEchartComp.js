import { converBaseChartData } from '@/datamanager/DataConvertor'
import AbstractComp from '../AbstractComp.js'
import echarts from 'echarts'
export default {
    name: 'AbstractEchartComp',
    mixins: [AbstractComp],
    data: function() {
        return {
            myChart: null
        }
    },
    methods: {
        draw() {
            this.myChart = echarts.init(document.getElementById(this.compConf.compId))
            this.myChart.hideLoading()
            this.myChart.setOption(this.option())
            this.myChart.on('click', this._click)
            this.myChart.on('globalout', this._globalout)
        },
        resize() {
            this.myChart.resize()
        },
        // 【抽象方法】该方法将注册到echart实例的click事件。params为echart的click参数。不同图形的的params结构不同，需要在子类中实现。
        _click(params) {},
        _globalout(params) {},
        _getDataTypeValue(params, type) {
            if (!type) {
                return
            }

            if (type == 'classify') {
                return params.name
            }

            if (type == 'legend') {
                return params.seriesName
            }

            if (type == 'value') {
                return params.value
            }
        },
        styleConfChanged() {
            this.updateMyChart()
        },
        compDataChanged() {
            this.updateMyChart()
        },
        updateMyChart() {
            this.myChart && this.myChart.hideLoading()
            this.myChart && this.myChart.clear()
            this.myChart && this.myChart.setOption(this.option())
        },
        option() { // Abstract computed. It needs to be implemented in a subclass.
            return {}
        }
    }

}