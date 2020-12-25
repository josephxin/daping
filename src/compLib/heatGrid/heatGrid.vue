<script>
	import AbstractEchartComp from '@/compLib/commons/echart/AbstractEchartComp'
	export default {
		name:'heatmap',
		mixins:[AbstractEchartComp],
		methods:{
      convertChartData(data){
				data = this.compConf.data.datasource.type === 'static' ? data : data[0]
				return data
			},
			_formatChartData(data){
				let style = this.styleConf;
        style = this.convertExpression(style)
				let temp = {
					data : [],
					xAxis : [],
          yAxis : [],
          min : 0,
          max : 0
        }
        let xAxis = new Set()
        let yAxis = new Set()
        data.forEach(item => {
          xAxis.add(item[style.data.xk])
          yAxis.add(item[style.data.yk])
        })
        temp.xAxis = Array.from(xAxis)
        temp.yAxis = Array.from(yAxis)
        let xAxisIndex = {}
        let yAxisIndex = {}
        temp.xAxis.forEach((item,index) => {
          xAxisIndex[item] = index
        })
        temp.yAxis.forEach((item,index) => {
          yAxisIndex[item] = index
        })
        data.forEach(item => {
          temp.min = Math.min(temp.min,item[style.data.valueKey])
          temp.max = Math.max(temp.max,item[style.data.valueKey])
          temp.data.push([xAxisIndex[item[style.data.xk]],yAxisIndex[item[style.data.yk]],item[style.data.valueKey]])
        })
				return temp
			},
			option(){
        let style = this.styleConf;
        let chartData = this._formatChartData(this.chartData)
				let option = {
          backgroundColor: style.backgroundColor,
          colors : this.defaultColors,
          tooltip: {
              position: 'top'
          },
          title : {
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
          },
          animation: true,
          xAxis: {
              type: 'category',
              data: chartData.xAxis,
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
              }
          },
          yAxis: {
              type: 'category',
              data: chartData.yAxis,
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
          visualMap: {
              show : style.visualMap.show,
              min: chartData.min,
              max: chartData.max,
              calculable: true,
              orient: style.visualMap.orient,
              left: style.visualMap.left,
              top : style.visualMap.top,
              right :style.visualMap.right,
              align : style.visualMap.align,
              itemWidth : style.visualMap.itemWidth,
              itemHeight : style.visualMap.itemHeight,
              bottom: 0,
              inRange: {
                symbol: 'rect',
                color: style.colors.length ? style.colors : this.defaultColors
              },
              textGap : style.visualMap.textGap,
              text : _.cloneDeep(style.visualMap.text).split(","),
              padding : _.cloneDeep(style.visualMap.padding).split(",").map(item => parseInt(item)),
              textStyle: {
                fontSize: style.visualMap.textStyle.fontSize,
                color: style.visualMap.textStyle.color,
              }
          },
          grid : {
            x : parseInt(style.leftPadding),
            y : parseInt(style.topPadding),
            x2 : parseInt(style.rightPadding),
            y2 : parseInt(style.bottomPadding)
          },
          series: [{
              name: '热力图',
              type: 'heatmap',
              data: chartData.data,
              label: {
                  show: true
              },
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }]
        };
			  return option;
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
                      let transData = this.chartData[index];
                      let eventObj = {
                          data: transData
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
      }
    }
	}
</script>
