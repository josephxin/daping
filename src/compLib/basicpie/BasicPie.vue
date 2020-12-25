<script>
var debug = false;

import AbstractEchartPieComp from '@/compLib/commons/echart/AbstractEchartPieComp'

export default {
    data: function () {
        return {
            dataCatch: null,
            nextIndex: 0,
        }
    },
    name: 'BasicPie',
    mixins: [AbstractEchartPieComp],
    methods: {
        option() {
            let style = this.styleConf;
            let data = this.chartData;
            var option = {
                color: this.defaultColors,
                backgroundColor: style.backgroundColor,
                legend: {
                    show: style.legend.isShow,
                    itemWidth: style.legend.iconWidth,
                    icon: style.legend.icon,
                    itemHeight: style.legend.iconHeight,
                    textStyle: {
                        color: style.legend.fontColor,
                        fontSize: style.legend.fontSize,
                        fontWeight: style.legend.fontBold,
                        fontFamily: style.legend.fontFamily
                    },

                    left: style.legend.position.split('-')[0],

                    top: style.legend.position.split('-')[1],

                    orient: style.legend.layout
                },

                series: [
                    {
                        type: 'pie',
                        selectedOffset: style.selectOffset,
                        radius: [style.innerRadius, style.outterRadius],
                        avoidLabelOverlap: false,
                        startAngle: style.angle,
                        clockwise: style.isClockwise,
                        label: {
                            show: style.labelShow,
                            fontSize: style.labelFontSize,
                            position: style.labelPosition,
                            formatter: style.labelFormat,
                            fontFamily: style.labelFontFamily
                        },
                        labelLine: {
                            smooth: true,
                            length: style.labelLineLength,
                            length2: style.labelLineLength2,
                            lineStyle: {
                                width: 3
                            }
                        },
                        itemStyle: {
                            borderColor: style.lineColor,
                            borderWidth: style.lineWidth,
                            borderType: style.lineType,
                        },
                        data: data
                    }
                ]
            };
            return option;
        },
        _getDataTypeValue(params, type) {
            if (!type) {
                return;
            }

            if (type == "legend") {
                return params.name;
            }

            if (type == "value") {
                return params.value;
            }
        },
        carouselExe(index) {
            if (index > 0) {
                this.myChart.dispatchAction({
                    type: 'pieUnSelect',
                    dataIndex: index - 1,
                })
            }
            this.myChart.dispatchAction({
                type: 'pieSelect',
                dataIndex: index,
            })
        },
        next() {
            if (this.nextIndex >= this.chartData.length) {
                return -1;
            }
            this.carouselExe(this.nextIndex);
            this.nextIndex++
            if (this.nextIndex >= this.chartData.length) {
                return -1;
            }
            return this.nextIndex;
        },
        reset() {
            this.nextIndex = 0;
            for (let i = 0; i < this.chartData.length; i++) {
                this.myChart.dispatchAction({
                    type: 'pieUnSelect',
                    dataIndex: i,
                })
            }
            return this.nextIndex;
        },
        linkageConfChanged(newVal) {
            if (!this.compConf.linkage) {
                return;
            }
            let cycleConf = this.compConf.linkage.cycleEvents;
            if (cycleConf && cycleConf.hasOwnProperty('sid')) {
                let cycleObj = _.cloneDeep(cycleConf);
                cycleObj.next = this.next;
                cycleObj.reset = this.reset;
                this.$evtBus.registerCycle(cycleObj)
            }
        }
    },
    mounted: function () {

    }
}
</script>
