<script>
  import AbstractEchartComp from '@/compLib/commons/echart/AbstractEchartComp'
  import { convertBoxplotChartData} from '@/datamanager/DataConvertor'
	export default {
		name:'boxplot',
		mixins:[AbstractEchartComp],
		methods:{
      convertChartData(data){
        data = this.compConf.data.datasource.type === 'static' ? data : data[0]
        if(!data || !data.length) return
        // 元数据
        let datasetMeta
        let selectColumns
        if (this.compConf.data.datasource.type === 'static') {
            datasetMeta = this.compConf.data.conf.datasetMeta
            selectColumns = datasetMeta.map(item => item.columnName)
        }else{
           datasetMeta = this.dataConf[this.dataConf.datasetSelectedIds[0]]['datasetMeta']
           selectColumns = this.dataConf[this.dataConf.datasetSelectedIds[0]]['xAxisIds']
        }
        return convertBoxplotChartData(data,selectColumns,datasetMeta)
			},
			option(){
        let style = this.styleConf;
        let chartData = this.chartData
        let option = {
          color : style.colors.length ? style.colors : this.defaultColors,
          title: [
              {
                  show : style.title.isShow,
                  text : style.title.title,
                  textStyle : {
                    color : style.title.textStyleColor,
                    fontStyle : style.title.textStyleFontStyle,
                    fontWeight : style.title.textStyleFontWeight,
                    fontFamily : style.title.textStyleFontFamily,

                    fontSize : style.title.textStyleFontSize
                  },
                  left : style.title.left,
                  top : style.title.top,
                  right : style.title.right,
                  bottom : style.title.bottom
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
          tooltip: {
              trigger: 'item',
              axisPointer: {
                  type: 'shadow'
              }
          },
          grid: {
              x : parseInt(style.leftPadding),
              y : parseInt(style.topPadding),
              x2 : parseInt(style.rightPadding),
              y2 : parseInt(style.bottomPadding)
          },
          xAxis: {
              type: 'category',
              data: chartData.axisData,
              show: style.x.isShow,
              position: style.x.position,
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
              splitArea : {
                show : style.x.splitArea.show,
                areaStyle : {
                  color : style.x.splitArea.color
                }
                
              }
          },
          yAxis: {
              type: 'value',
              show: style.y.isShow,
            axisLine: {
              symbol: style.y.styleArrow,
              show: style.y.showLine,
              lineStyle: {
                color: style.y.styleColor,
                width: style.y.styleBold
              }
            },
            name: style.y.isUnit ? style.y.unitName : "",
            nameTextStyle: {
              fontFamily: style.y.unitFontFamily,
              fontSize: style.y.unitFontSize,
              color: style.y.unitFontColor
            },
            axisLabel: {
              show: style.y.isAxisLabel,
              color: style.y.labelColor,
              fontSize: style.y.labelSize,
              rotate: style.y.wordDirection,
              margin: style.y.labelMargin,
              fontFamily: style.y.fontFamily
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
          },
          grid: {
              x: parseInt(style.leftPadding),
              y: parseInt(style.topPadding),
              x2: parseInt(style.rightPadding),
              y2: parseInt(style.bottomPadding)
          },
          series: []
      };
        option.series = chartData.data.map((item,index)=> {
          return {
                name: chartData.categoryName.length ? chartData.categoryName[index] : '',
                type: 'boxplot',
                data: item,
                tooltip: {
                    formatter: function (param) {
                        console.log(param)
                        return [
                            `${param.name}`,`${chartData.indi[4]}: ${param.data[5]}`,`${chartData.indi[3]}: ${param.data[4]}`,`${chartData.indi[2]}: ${param.data[3]}`,`${chartData.indi[1]}: ${param.data[2]}`,`${chartData.indi[0]}: ${param.data[1]}`
                        ].join('<br/>');
                    }
                }
            }
        })
        if (style.dataZoomShow) {
            option.dataZoom = [
                {
                    type: 'slider',
                    show: true,
                    start: 0,
                    end: 30,
                    orient: 'horizontal'
                },
                {
                    type: 'inside',
                    start: 0,
                    end: 30,
                    orient:'horizontal'
                }
            ]
        }
			  return option;
      },
    
    }
	}
</script>