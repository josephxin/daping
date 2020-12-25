<script>
import AbstractEchartComp from '@/compLib/commons/echart/AbstractEchartComp'
import {convertLiquidFillChartData} from '@/datamanager/DataConvertor'

require('echarts-liquidfill')
export default {
    name: 'LiquidFill',
    mixins: [AbstractEchartComp],
    created() {
        this.linkageConfChanged()
    },
    methods: {
        convertChartData() {
            return convertLiquidFillChartData(this.compData, this.dataConf)
        },
        option() {
            let style = this.styleConf;
            let data = this.chartData;
            let cValue = data.value / style.max;
            //let label = '{b}\n ';
            let label = '';
            if (style.actual) {
                label += data.value + style.unit;
            } else {
                label += (cValue * 100).toFixed(style.floorNum);
            }
            let backLiquidColor = [];
            for (let i = 0; i < style.liquidColor.length; i++) {
                let color = style.liquidColor[i].color;
                let colorPart = color.split(',')
                let alpha = colorPart[3].replace(")", "");
                colorPart[3] = Number(alpha) * 0.6 + ")";
                let temp = {
                    offset: style.liquidColor[i].offset,
                    color: colorPart.join(',')
                }
                backLiquidColor.push(temp)
            }
            let option = {
                title: {
                    text: cValue + '%',
                    textStyle: {
                        fontSize: style.labelFontSize,
                        fontFamily: style.labelFontFamily,
                        fontWeight: style.labelfontBold,
                        color: style.labelColor,
                        rich: {
                            a: {
                                fontSize: 28,
                            }
                        }
                    },
                    x: 'center',
                    y: '35%'
                },
                series: [{
                    type: 'liquidFill',
                    radius: '80%',
                    center: ['50%', '50%'],
                    background: 'rgba(0,0,0,0)',
                    data: [{name: 'a', value: cValue / 100}],
                    backgroundStyle: {
                        color: 'rgba(0,0,0,0)'
                    },
                    direction: style.direction,
                    outline: {
                        borderDistance: style.outlinePadding,
                        itemStyle: {
                            borderWidth: style.outlineWidth,
                            borderColor: style.outlineColor,
                        }
                    },
                    color:
                        [{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: style.liquidColor,
                            globalCoord: false
                        }],
                    label: {
                        normal: {
                            formatter: '',
                        }
                    }
                }, {
                    type: 'liquidFill',
                    radius: '80%',
                    center: ['50%', '50%'],
                    background: 'rgba(0,0,0,0)',
                    data: [cValue / 100 * 1.3],
                    animationDurationUpdate: 500,
                    animationDuration: 100,
                    direction: style.direction,
                    period: 3500,
                    backgroundStyle: {
                        color: 'rgba(0,0,0,0)'
                    },
                    outline: {
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: style.outlineWidth,
                            borderColor: style.outlineColor,
                        }
                    },
                    color: [{
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: backLiquidColor,
                        globalCoord: false
                    }],
                    label: {
                        normal: {
                            formatter: '',
                        }
                    }
                },]
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
}
</script>
