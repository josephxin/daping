<script>
import AbstractEchartBarComp from '@/compLib/commons/echart/AbstractEchartBarComp'

export default {
    name: 'normalScatter',
    mixins: [AbstractEchartBarComp],
    data() {
        return {
            nextIndex: 0,
        }
    },
    methods: {
        createMarkConfig(data){
            let markPoint = []
            let markPointType = {max : '最大值','min':'最小值',average:'平均值',median:'中位数'}
            data.forEach(item => {
                markPoint.push({
                    type : item,
                    name : markPointType[item] ? markPointType[item] : ''
                })
            })
            return markPoint
        },
        /**
         * 生成多Y轴配置
         */
        createMultipleY(options,style){
            let yAxisOption = _.cloneDeep(options.yAxis[0])
            let yAxis = []
            if(style.multipleY.configs.length){
                style.multipleY.configs.forEach((item,index) => {
                    let option = _.cloneDeep(yAxisOption)
                    option.name = item.isUnit ? item.unitName : ''
                    option.nameLocation = item.nameLocation
                    option.nameGap = item.nameGap,
                    option.nameTextStyle = {
                        fontFamily: item.unitFontFamily,
                        fontSize: item.unitFontSize,
                        color: item.unitFontColor,
                        padding : _.cloneDeep(item.namePadding).split(",").map(item => {return parseInt(item)})
                    }
                    option.axisLabel.formatter = function(value,index){
                        return value + item.labelFormatUnit
                    }
                    option.axisLabel.rotate = parseInt(item.wordDirection)
                    option.position = item.position
                    option.offset = item.offset
                    if(options.dataset.dimensions.length >2){
                        option.yAxisIndex = index
                    }
                    yAxis.push(option)
                })
                return yAxis
            }
            return [yAxisOption]
        },
        option() {
            let style = this.styleConf;
            style = this.convertExpression(style)
            let data = this.chartData;
            if (!data || !data.dimensions) return {}
            let dimensions = data.dimensions
            let dataSource = data.dataSource
            let series = []
            let stack = 0
            let legendData = []
            for (let i = 0; i < dimensions.length - 1; i++) {
                stack = style.stack == 0 ? i + 1 : 1
                let type = style.type
                let opt = {
                    type: style.series[i] ? style.series[i].type : type,
                    stack: style.series[i] ? (style.series[i].stack ? style.series[i].stack : i + 1) : i + 1,
                    seriesLayoutBy: style.seriesLayoutBy,
                    barWidth: style.barWidth,
                    name: dimensions[i + 1],
                    itemStyle: {}
                }
                legendData.push({
                    name : opt.name,
                    icon : style.legend.icon
                })
                if(style.series[i]){
                    if(style.series[i].barRadius){
                        opt.itemStyle.barBorderRadius = _.cloneDeep(style.series[i].barRadius).split(",").map(item => {return parseInt(item)})
                        opt.yAxisIndex = style.series[i].yAxisIndex
                    }
                    if(style.series[i].lengendIcon){
                        legendData[i].icon = style.series[i].lengendIcon
                    }
                }
                if(opt.type === 'pictorialBar'){
                    opt.symbol = 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z'
                }
                if(style.markPointShow){
                    opt.markPoint = {
                        data : this.createMarkConfig(style.markPointData),
                        symbol : style.markPointSymbol,
                    }
                }
                if(style.markLineShow){
                    opt.markLine = {
                        data : this.createMarkConfig(style.markLineData),
                        symbol : style.markLineSymbol,
                        label : {
                            show : true,
                            position : 'end'
                        }
                    }
                }
                series.push(opt)
            }
            let colors = style.colors.length ? style.colors : this.defaultColors
            let option = {
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
                    show : style.tooltip.show,
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: style.tooltip.axisPointer.type// 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    type: style.categoryX ? 'category' : 'value',
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
                        type: style.categoryX ? 'value' : 'category',
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
                    orient: style.legend.layout,
                    data : legendData
                },
                dataset: {
                    dimensions,
                    source: dataSource
                },
                grid: {
                    x: parseInt(style.leftPadding),
                    y: parseInt(style.topPadding),
                    x2: parseInt(style.rightPadding),
                    y2: parseInt(style.bottomPadding)
                },
                series
            };
            if (style.dataZoomShow) {
                option.dataZoom = [
                    {
                        type: 'slider',
                        show: true,
                        start: 30,
                        end: 50,
                        orient: style.categoryX ? 'horizontal' : 'vertical'
                    },
                    {
                        type: 'inside',
                        start: 30,
                        end: 50,
                        orient: style.categoryX ? 'horizontal' : 'vertical'
                    }
                ]
            }
            // 显示y轴单位
            if(style.y.isUnit){
                option.yAxis.forEach(item => {
                    item.name = style.y.unitName
                    item.nameLocation = style.y.nameLocation
                    item.nameGap = style.y.nameGap
                    item.nameTextStyle = {
                        fontFamily: style.y.unitFontFamily,
                        fontSize: style.y.unitFontSize,
                        color: style.y.unitFontColor,
                        padding : _.cloneDeep(style.y.namePadding).split(",").map(item => {return parseInt(item)})
                    }
                })
            }
            if(style.multipleY.show){
                option.yAxis = this.createMultipleY(option,style)
            }
            return option;
        },
        carouselExe(curDataIndex) {
            let option = this.option()
            option.series.map((v, i) => {
                if (i == curDataIndex) {
                    option.series[i].animation = true
                } else {
                    option.series[i].animation = false
                }
            })
            this.myChart.hideLoading()
            this.myChart.clear()
            this.myChart.setOption(option, true)
        },
        next() {
            if (this.nextIndex >= (this.chartData.dimensions.length - 1)) {
                return -1;
            }
            if (this.compConf.linkage.cycleEvents.refEvt === `${this.compConf.compId}:click`) {
                this.loadLinkage(this.nextIndex)
            }
            this.carouselExe(this.nextIndex);
            this.nextIndex++
            if (this.nextIndex >= (this.chartData.dimensions.length - 1)) {
                return -1;
            }
            return this.nextIndex;
        },
        reset() {
            this.nextIndex = 0;
            this.carouselExe(-1);
            return this.nextIndex;
        },
        _click(params) {
            this.loadLinkage(params.dataIndex)
        },
        loadLinkage(index) {
            if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === 'click' && evtObj.explosive) {
                        let transData = this.chartData.dataSource[index];
                        transData = this._convertEventOutData(transData,this.compConf.data)
                        let eventObj = {
                            data: transData,
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
            if (cycleConf && cycleConf.hasOwnProperty('sid')) {
                let cycleObj = _.cloneDeep(cycleConf);
                cycleObj.next = this.next;
                cycleObj.reset = this.reset;
                this.$evtBus.registerCycle(cycleObj)
            }
        }
    }
}
</script>