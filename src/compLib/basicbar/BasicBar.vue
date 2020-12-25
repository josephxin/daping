<script>
import AbstractEchartBarComp from "@/compLib/commons/echart/AbstractEchartBarComp";
import { mapGetters, mapActions } from 'vuex'
let debug = false;
export default {
  name: "BasicBar",
  mixins: [AbstractEchartBarComp],

  methods: {
    option() {
      let style = this.styleConf;
      let data = this.chartData;
      //console.log(style, data);
      let series = [];
      data.legends.forEach((legend) => {
        let styleSeries = style.series,
          currentSerie = null;

        for (let serie of styleSeries) {
          if (legend.name == serie.value && serie.color != "") {
            currentSerie = serie;
            break;
          }
          currentSerie = null;
        }

        series.push({
          type: "bar",
          name: legend.name,
          data: legend.data,
          // animation:false,
          itemStyle:
            currentSerie == null
              ? null
              : {
                color: currentSerie.color,
                opacity: currentSerie.opacity,

                borderColor: currentSerie.borderColor,
                borderWidth: currentSerie.lineWidth,
                borderType: currentSerie.lineType,
                barBorderRadius: parseInt(currentSerie.barRadius),

                shadowBlur: currentSerie.shadowBlur,
                shadowColor: currentSerie.shadowColor,
                shadowOffsetX: currentSerie.offsetX,
                shadowOffsetY: currentSerie.offsetY
              },
          label: {
            show: style.dataLabel,
            formatter: "{c}",
            fontSize: style.dataLabelSize,
            color: style.dataLabelColor,
            position: style.dataPosition
          },

          barGap: style.barGap,
          barCategoryGap: style.barCategoryGap,
          barWidth: style.barWidth
        });
      });

      let option = {
        color: this.defaultColors,
        backgroundColor: style.backgroundColor,

        itemStyle: {
          barBorderRadius: style.barBorderRadius
        },
        tooltip : {
          
        },
        markLine: {
          data: {
            0: {
              type: "max",
              valueIndex: 1
            }
          }
        },

        xAxis: {
          type: "category",
          data: data.classify,

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
            inside: style.x.axisTickInside,//坐标轴刻度是否朝内，默认false朝外。
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
          type: "value",

          show: style.y.isShow,

          position: style.y.position,

          axisLine: {
            symbol: ["none", style.y.styleArrow],
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

        legend: {
          show: style.legend.isShow,
          icon:style.legend.icon,
          itemWidth: style.legend.iconWidth,
          itemHeight: style.legend.iconHeight,
          itemGap: 10,
          textStyle: {
            color: style.legend.fontColor,
            fontSize: style.legend.fontSize,
            fontWeight: style.legend.fontBold,
            fontFamily: style.legend.fontFamily
          },

          formatter: function (name) {
            let series = style.series;

            if (series == null || series.length == 0) {
              return name;
            }
            for (let serie of series) {
              if (name == serie.value) {
                return serie.name;
              }
            }

            return name;
          },

          left: style.legend.position.split("-")[0],

          top: style.legend.position.split("-")[1],

          orient: style.legend.layout
        },

        series: series,

        grid: {
          top: style.topPadding +'%',
          bottom: style.bottomPadding +'%',
          left: style.leftPadding +'%',
          right: style.rightPadding +'%'
        }
      };
      // console.log(JSON.stringify(option))
      return option;
    },

    carouselConfChanged(v, o) {
      if (v && !v.open) {
        this.compDataChanged()
      }

    },
    carouselExe: function (curDataIndex, preDataIndex) {
      let option = this.option()
      if (debug) {
        console.log(
          "BasicBar",
          "[",
          this.compConf.compId,
          "]",
          "carouselExe",
          curDataIndex,
          preDataIndex
        );
      }
      let barWidth = option.series[0].barWidth
      option.series.map((v, i) => {
        if (v.name == curDataIndex) {
          option.series[i].barWidth = (parseInt(barWidth) + 5) + '%'
          option.series[i].animation = true
        } else {
          option.series[i].animation = false
          option.series[i].barWidth = barWidth
        }
      })
      this.myChart.hideLoading()
      this.myChart.clear()
      this.myChart.setOption(option, true)
      this.myChart.on('click',(params => {
        console.log(params)
      }))
      let _this = this;
      if (!curDataIndex) {
        this.myChart.dispatchAction({
          type: "restore"
        });
        return;
      }

      let linkageData = this.buildLinkageData(curDataIndex);

      this.triggerLinkage(linkageData);
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
    _getDataItemByCarouse(dataIndex) {
      let result = null;
      let data = this.chartData;
      data.legends.forEach(function (item) {
        if (item.name == dataIndex) {
          result = item;
        }
      });

      if (result == null) {
        console.log(
          "xxxxxxxxxxxxxxx>[",
          this.compConf.compId,
          "]",
          data,
          dataIndex
        );
      }
      return result;
    },
    getCarouselDataIndexes() {
      let arrs = [];
      this.chartData.legends.map((v, i) => {
        arrs.push(v.name);
      });
      return arrs;
    },
    buildLinkageData(curDataIndex) {
      let linkages = this.compConf.linkage.linkages;

      if (!linkages || linkages.length == 0) {
        return;
      }

      let dataItem = this._getDataItemByCarouse(curDataIndex);

      let compObj = this;

      let linkageData = {};

      linkages.forEach(function (item) {
        linkageData[item.name] = compObj._getDataTypeValue(dataItem, item.type);
      });

      return linkageData;
    }
  },
  mounted: function () {
    if (!this.isOpenCarouse) {
      return;
    }
    this.startCarousel(this.getCarouselDataIndexes());
  }
};
</script>