import AbstractEchartComp from './AbstractEchartComp.js'
import { convertBaseChartData, convertDataSetChartData, convertDataSetStaticChartData } from '@/datamanager/DataConvertor'

export default {
    name: 'AbstractEchartBarComp',
    mixins: [AbstractEchartComp],
    methods: {
        convertChartData(data) {
            if (['flexibleBar', 'singleIndiBar', 'pictorialBar', 'timelineBar', 'stackXBar', 'stackYBar', 'multiYBar', 'flexibleLine', 'singleIndiLine', 'areaLine', 'timeLineLine', 'multiYLine', 'stackAreaLine', 'normalLineBar', 'multiYLineBar', 'timeLineMixinLineBar', 'normalScatter', 'singleScatter'].includes(this.compConf.componentName)) {
                if (this.compConf.data.datasource.type === 'static') {
                    let datasetMeta = this.compConf.data.conf.datasetMeta
                    let xAxisIds = [],
                        yAxisIds = []
                    datasetMeta.forEach(item => {
                        item.columnDefDire == 1 ? xAxisIds.push(item.columnName) : yAxisIds.push(item.columnName)
                    })

                    return convertDataSetChartData(data, { datasetMeta, xAxisIds, yAxisIds })
                }
                if (!data || !data[0]) return
                    // 维度指标转换
                return convertDataSetChartData(data[0], this.dataConf[this.dataConf.datasetSelectedIds[0]])
            }
            if (['annularpie', 'liquidFill', 'scaledashboard'].includes(this.compConf.componentName)) {
                return data
            }
            return convertBaseChartData(data, this.dataConf);

        },
    }
}