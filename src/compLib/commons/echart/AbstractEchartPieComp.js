import AbstractEchartComp from './AbstractEchartComp.js'
import { convertBasePieChartData } from '@/datamanager/DataConvertor'

export default {
    name: 'AbstractEchartPieComp',
    mixins: [AbstractEchartComp],
    methods: {
        convertChartData(data) {
            if (this.compConf.data.datasource.type === 'static') {
                return data
            }
            return convertBasePieChartData(data[0], this.dataConf[this.dataConf.datasetSelectedIds[0]])
        }
    }
}