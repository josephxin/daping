<script>
import AbstractEchartComp from "@/compLib/commons/echart/AbstractEchartComp";
import echarts from 'echarts'

export default {
    name: "basedashboard",
    mixins: [AbstractEchartComp],
    computed: {
        dataVal() {
            return this.chartData == null ? 0 : this.chartData.value;
        }
    },
    mounted() {

    },
    methods: {
        convertChartData() {
            if (!this.compData) {
                return;
            }
            let data
            if (this.dataSourceConf.type === 'static') {
                data = this.compData[0]
            } else {
                let xAxisIds = this.dataConf[this.dataConf.datasetSelectedIds[0]]['xAxisIds']
                let metaData = this.dataConf[this.dataConf.datasetSelectedIds[0]]['datasetMeta']
                data = this.compData[0]
                let indiColumn = xAxisIds[0]
                let value = 0
                for (let i = 0; i < metaData.length; i++) {
                    if (xAxisIds.includes(metaData[i]['columnName']) && metaData[i].columnDefDire == 1) {
                        indiColumn = metaData[i]['columnName']
                        break
                    }
                }
                data.forEach(item => {
                    console.log(item)
                    value += item[indiColumn] || 0
                })
                data = {
                    name: indiColumn,
                    value
                }
            }
            return data
        },
        _getAxisColors() {
            let colors = []
            let axisTickColors = _.cloneDeep(this.styleConf.axisTickColors)
            axisTickColors.sort((a, b) => {
                return a.offset < b.offset ? -1 : 1
            })
            axisTickColors.forEach(item => {
                colors.push([item.offset, item.color])
            })
            return colors
        },
        _getDashboardAlphaColor(val) {
            let style = this.styleConf
            let max = style.maxVal
            if (max < val) return [[1, 'rgba(0,0,0,0)']]
            let percent = (val / max)
            let axisLineColors = []
            axisLineColors.push([percent, 'rgba(0,0,0,0)'])
            axisLineColors.push([1, style.overValueColor])
            return axisLineColors
        },
        option() {
            let style = this.styleConf;
            let data = this.chartData
            let option = {
                series: [
                    {
                        name: '刻度',
                        animation: true,
                        type: 'gauge',
                        radius: '78%',
                        min: style.minVal,
                        max: style.maxVal,
                        splitNumber: style.splitNumber, //刻度数量
                        startAngle: style.startAngle,
                        endAngle: style.endAngle,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 0,
                                color: this._getAxisColors()
                            }
                        },//仪表盘轴线
                        axisLabel: {
                            show: true,
                            distance: -style.axisLabelDistance,
                            formatter: function (v) {
                                return v
                                // return Number(v / 10000).toFixed(1) + 'w'
                            }
                        },//刻度标签。
                        axisTick: {
                            show: true,
                            lineStyle: {
                                color: 'auto',
                                width: 1
                            },
                            length: 11
                        },//刻度样式
                        splitLine: {
                            show: true,
                            length: -8,
                            lineStyle: {

                                color: 'auto'
                            }
                        },//分隔线样式
                        detail: {
                            show: false
                        },
                        pointer: {
                            show: false
                        }
                    },
                    {
                        type: 'gauge',
                        animation: true,
                        radius: '70%',
                        center: ['50%', '50%'],
                        splitNumber: style.splitNumber, //刻度数量
                        startAngle: style.startAngle,
                        endAngle: style.endAngle,
                        min: style.minVal,
                        max: style.maxVal,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: style.axisLineWidth,
                                color: [
                                    [
                                        1, new echarts.graphic.LinearGradient(
                                        0, 0, 1, 0, style.axisLineColors
                                    )
                                    ]
                                ]
                            }
                        },
                        //分隔线样式。
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        pointer: {
                            show : style.showPointer
                        },
                        title: {
                            show: true,
                            offsetCenter: [0, '-25%'], // x, y，单位px
                            textStyle: {
                                color: '#fff',
                                fontSize: 32
                            }
                        },
                        //仪表盘详情，用于显示数据。
                        detail: {
                            show: true,
                            offsetCenter: [0, '10%'],
                            color: '#fff',
                            formatter: function (params) {
                                return params
                            },
                            textStyle: {
                                fontSize: 50,

                            }
                        },
                        data: [{
                            name: data.name,
                            value: data.value
                        }]
                    },
                    {
                        name: '',
                        type: 'gauge',
                        radius: '70%',
                        animation: true,
                        splitNumber: style.splitNumber, //刻度数量
                        startAngle: style.startAngle,
                        endAngle: style.endAngle,
                        center: ['50%', '50%'],
                        min: style.minVal,
                        max: style.maxVal,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: style.axisLineWidth,
                                color: this._getDashboardAlphaColor(data.value)
                            }
                        },
                        splitLine: {
                            show: false
                        },//分隔线样式
                        detail: {
                            show: false
                        },
                        pointer: {
                            show: false
                        },
                        axisLabel: {
                            show: false,

                        },
                        axisTick: {
                            show: true,
                            length: style.axisLineWidth,
                            lineStyle: {
                                width: style.splitWidth,
                                color: style.splitColor
                            }
                        }
                    },
                ]
            };
            return option;
        },

        _clickByLinkAge(evtRevObj) {
            let that = this
            this.$evtBus.on(evtRevObj, (e) => {
                if (e.refType === 'update') {
                    for (let i = 0; i < e.refData.length; i++) {
                        let fromKey = e.refData[i].from.split("$")[1]
                        let to = e.refData[i].to.split("$")[1]
                        Object.assign(that.chartData, {[to]: e.data[fromKey]})
                    }
                    that.updateMyChart()
                }
            })
        },
        linkageConfChanged() {
            if (this.compConf.linkage && this.compConf.linkage.linkRevEvents) {
                let evtRevList = this.compConf.linkage.linkRevEvents;
                for (let i = 0; i < evtRevList.length; i++) {
                    let evtRevObj = evtRevList[i];
                    let evtType = evtRevObj.evtName.split(":")[1]
                    if (evtType === 'click') {
                        this._clickByLinkAge(evtRevObj)
                    }
                }
            }
        }
    }
};
</script>
