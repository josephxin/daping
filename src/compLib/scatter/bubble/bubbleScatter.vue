<script>
import AbstractEchartBarComp from '@/compLib/commons/echart/AbstractEchartBarComp'
 import { convertBubbleScatterChartData} from '@/datamanager/DataConvertor'
import echarts from "echarts"
export default {
    name: 'bubbleScatter',
    mixins: [AbstractEchartBarComp],
    methods: {
        convertChartData(data){
            data = this.compConf.data.datasource.type === 'static' ? data : data[0]
            if(!data || !data.length) return
            // 元数据
            let datasetMeta
            let selectColumns
            if (this.compConf.data.datasource.type === 'static') {
                datasetMeta = this.compConf.data.conf.datasetMeta
                selectColumns = {
                    x : ['indi1'],
                    y : ['dimension1','indi2','indi3'],
                }
            }else{
                datasetMeta = this.dataConf[this.dataConf.datasetSelectedIds[0]]['datasetMeta']
                // selectColumns = this.dataConf[this.dataConf.datasetSelectedIds[0]]['xAxisIds']
                selectColumns = {
                    x : this.dataConf[this.dataConf.datasetSelectedIds[0]]['xAxisIds'],
                    y : this.dataConf[this.dataConf.datasetSelectedIds[0]]['yAxisIds'],
                }
            }
            return convertBubbleScatterChartData(data,selectColumns,datasetMeta)
		},
        option() {
            let style = this.styleConf;
            style = this.convertExpression(style)
            let chartData = this.chartData
            let _this = this
            let colors = style.colors.length ? style.colors : this.defaultColors
            var option = {
                color: colors,
                title: {
                    show: style.title.isShow,
                    text: style.title.title,
                    textStyle: {
                        color: style.title.textStyleColor,
                        fontStyle: style.title.textStyleFontStyle,
                        fontWeight: style.title.textStyleFontWeight,
                        fontFamily: style.title.textStyleFontFamily,
                        fontSize: style.title.textStyleFontSize
                    },
                    left: style.title.left,
                    top: style.title.top,
                    right: style.title.right,
                    bottom: style.title.bottom
                },
                backgroundColor: style.backgroundColor,
                itemStyle: {
                    barBorderRadius : style.barBorderRadius ? _.cloneDeep(style.barBorderRadius).split(",").map(item => {
                        return parseInt(item)
                    }) : [0]
                },
                tooltip: {
                    // show : style.tooltip.show,
                    show : false,
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: style.tooltip.axisPointer.type// 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    type: typeof chartData.data[0][0][0] == 'number' ? 'value' : 'category',
                    show: style.x.isShow,
                    position : style.x.position,
                    // boundaryGap: style.x.boundaryGap,
                    axisLine: {
                        symbol: ["none", style.x.styleArrow],
                        show: style.x.showLine,
                        lineStyle: {
                            color: style.x.styleColor,
                            width: style.x.styleBold
                        }
                    },
                    name: style.x.isUnit ? style.x.unitName : "",
                    nameTextStyle: {
                        fontFamily: style.x.unitFontFamily,
                        fontSize: style.x.unitFontSize,
                        color: style.x.unitFontColor
                    },
                    axisLabel: {
                        show: style.x.isAxisLabel,
                        color: style.x.labelColor,
                        fontSize: style.x.labelSize,
                        rotate: style.x.wordDirection,
                        margin: style.x.labelMargin,
                        fontFamily: style.x.fontFamily
                    },
                    axisTick: {
                        show: style.x.axisTick,
                        length: style.x.axisTickLehgth,
                        inside: style.x.axisTickInside,
                        alignWithLabel: style.x.alignWithLabel,
                        lineStyle: {
                            color: style.x.tickColor,
                            width: style.x.tickWidth,
                            type: style.x.tickStyle,
                            opacity: style.x.tickOpacity
                        }
                    },
                    splitLine: {
                        show: style.x.isGrid,
                        lineStyle: {
                            color: style.x.gridColor,
                            width: style.x.gridBold,
                            opacity: style.x.gridOpaque,
                            type: style.x.splitLineType
                        }
                    },
                },
                yAxis: [
                    {
                        type: typeof chartData.data[0][0][1] == 'number' ? 'value' : 'category',
                        show: style.y.isShow,
                        position : style.y.position,
                        offset : style.y.offset,
                        // boundaryGap: style.y.boundaryGap,
                        axisLine: {
                            symbol: style.y.styleArrow,
                            show: style.y.showLine,
                            lineStyle: {
                                color: style.y.styleColor,
                                width: style.y.styleBold
                            }
                        },
                        axisLabel: {
                            show: style.y.isAxisLabel,
                            color: style.y.labelColor,
                            fontSize: style.y.labelSize,
                            rotate: style.y.wordDirection,
                            margin: style.y.labelMargin,
                            fontFamily: style.y.fontFamily,
                            formatter : (value,index)=> {
                                if(value == 0) return value
                                return value + style.y.labelFormatUnit
                            }
                        },
                        axisTick: {
                            show: style.y.axisTick,
                            length: style.y.axisTickLehgth,
                            inside: style.y.axisTickInside,
                            lineStyle: {
                                color: style.y.tickColor,
                                width: style.y.tickWidth,
                                type: style.y.tickStyle,
                                opacity: style.y.tickOpacity
                            }
                        },
                        splitLine: {
                            show: style.y.isGrid,
                            lineStyle: {
                                color: style.y.gridColor,
                                width: style.y.gridBold,
                                opacity: style.y.gridOpaque,
                                type: style.y.splitLineType
                            }
                        }
                    }
                ],
                legend: {
                    show: style.legend.isShow,
                    type : style.legend.type,
                    width : style.legend.width,
                    itemWidth: style.legend.iconWidth,
                    icon: style.legend.icon,
                    itemHeight: style.legend.iconHeight,
                    itemGap: style.legend.itemGap,
                    textStyle: {
                        color: style.legend.fontColor,
                        fontSize: style.legend.fontSize,
                        fontWeight: style.legend.fontBold,
                        fontFamily: style.legend.fontFamily,
                        padding : _.cloneDeep(style.legend.padding).split(",").map(item => {return parseInt(item)})
                    },
                    formatter: function (name) {
                        return name;
                    },
                    left: style.legend.position.split("-")[0],
                    top: style.legend.position.split("-")[1],
                    orient: style.legend.layout
                },
                series: []
            };
            let series = []
            chartData.data.forEach((item,index) => {
                let serie = {
                    name : chartData.categoryName[index] ? chartData.categoryName[index] : '',
                    data : item,
                    type : 'scatter',
                    symbolSize(data){
                        let symbolS = 0
                        symbolS = parseInt((data[chartData.symbolIndex] / chartData.max ) * style.symbolSizeMax)
                        if(symbolS < style.symbolSizeMin ) symbolS = style.symbolSizeMin
                        return symbolS
                    },
                    itemStyle : {

                    }
                }
                if(style.series[index]){
                    serie.itemStyle = {
                        shadowBlur: style.series[index]['shadowBlur'],
                        shadowColor: style.series[index]['shadowColor'],
                        shadowOffsetY: style.series[index]['shadowOffsetY'],
                        shadowOffsetX: style.series[index]['shadowOffsetX'],
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: style.series[index]['startColor']
                        }, {
                            offset: 1,
                            color: style.series[index]['stopColor']
                        }])
                    }
                }
                series.push(serie)
            })
            option.series = series
            return option;
        },
        _click(params) {
            this.loadLinkage(params.value)
        },
        loadLinkage(data) {
            if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === 'click' && evtObj.explosive) {
                        let temp = {}
                        this.chartData.keys.forEach((item,index) => temp[item] = data[index])
                        let eventObj = {
                            data: temp,
                        };
                        this.$evtBus.emit(evtObj.evtName, eventObj);
                    }
                }
            }
        },
        //点击事件
        _clickByLinkAge(evtRevObj) {
            this.$evtBus.on(evtRevObj, (e) => {
                this._toggleCompShow(e.ctrlShow, e.switchVisible && e.switchVisible[this.compConf.compId], this.compConf.compId)
                // if (e.ctrlShow && e.switchVisible && !e.switchVisible[this.compConf.compId]) return
                let data = []
                e.refData.forEach(item => {
                    let operationType = item.cond
                    let bindMapperColumn = item.to.split('$')[1]
                    let value = e.data[item.from.split('$')[1]]
                    data.push({
                        operationType, bindMapperColumn, value
                    })
                })
                let evt = {
                    target: e.target,
                    source: e.source,
                    name: e.name,
                    data,
                    sourceData : e.data
                }
                let payload = {}
                payload[this.compConf.compId] = {[`${e.name}`]: evt}
                this.$store.commit('setLinkage', payload)
                this.updateCompData(false)
            })
        },
        linkageConfChanged(newVal) {
            if (!this.compConf.linkage) {
                return;
            }
            if (this.compConf.linkage.linkRevEvents) {
                let evtRevList = this.compConf.linkage.linkRevEvents;
                for (let i = 0; i < evtRevList.length; i++) {
                    let evtRevObj = evtRevList[i];
                    let evtType = evtRevObj.evtName.split(":")[1]
                    if (evtType === 'click') {
                        this._clickByLinkAge(evtRevObj)
                    }
                }
            }
            let cycleConf = this.compConf.linkage.cycleEvents;
            // if (cycleConf && cycleConf.hasOwnProperty('sid')) {
            //     let cycleObj = _.cloneDeep(cycleConf);
            //     cycleObj.next = this.next;
            //     cycleObj.reset = this.reset;
            //     this.$evtBus.registerCycle(cycleObj)
            // }
        }
    }
}
</script>