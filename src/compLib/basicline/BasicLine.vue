<script>
import AbstractEchartBarComp from "@/compLib/commons/echart/AbstractEchartBarComp";

export default {
  name: "BasicLine",
  mixins: [AbstractEchartBarComp],
  methods: {
    option() {
      let style = this.styleConf;
      let data = this.chartData;

      let series = [];
      data.legends.forEach(function (legend) {
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
          type: "line",
          name: legend.name,
          data: legend.data,
          symbol: "circle",
          symbolSize: 10,
          lineStyle:
            currentSerie == null
              ? {
                  width: 4,
                }
              : {
                  color: currentSerie.color,
                  width: currentSerie.width,
                  type: currentSerie.lineType,
                },

          itemStyle: {
            borderColor: "#ffffff",
            borderWidth: 1,
          },

          label: {
            show: style.dataLabel,
            formatter: "{c}",
            fontSize: style.dataLabelSize,
            color: style.dataLabelColor,
          },

          // areaStyle:{
          // 	normal:{
          // 		opacity:0.3
          // 	}
          // },

          markPoint: {
            data: [
              currentSerie == null || !currentSerie.max
                ? {}
                : { type: "max", name: "最大值" },
              currentSerie == null || !currentSerie.min
                ? {}
                : { type: "min", name: "最小值" },
            ],
          },

          markLine: {
            data:
              currentSerie == null || !currentSerie.average
                ? []
                : [{ type: "average", name: "平均值" }],
          },
        });
      });

      let option = {
        color: this.defaultColors,
        backgroundColor: style.backgroundColor,
        xAxis: {
          type: "category",
          data: data.classify,

          show: style.x.isShow,

          boundaryGap: false,

          axisLine: {
            symbol: ["none", style.x.styleArrow],
            show: style.x.showLine,
            lineStyle: {
              color: style.x.styleColor,
              width: style.x.styleBold,
            },
          },

          name: style.x.isUnit ? style.x.unitName : "",

          nameTextStyle: {
            fontFamily: style.x.unitFontFamily,
            fontSize: style.x.unitFontSize,
            color: style.x.unitFontColor,
          },

          axisLabel: {
            show: style.x.isAxisLabel,
            color: style.x.labelColor,
            fontSize: style.x.labelSize,
            rotate: style.x.wordDirection,
            margin: style.x.labelMargin,
            fontFamily: style.x.fontFamily,
          },

          axisTick: {
            show: style.x.axisTick,
            length: style.x.axisTickLehgth,
            inside: style.x.axisTickInside,
            lineStyle: {
              color: style.x.tickColor,
              width: style.x.tickWidth,
              type: style.x.tickStyle,
              opacity: style.x.tickOpacity,
            },
          },
          splitLine: {
            show: style.x.isGrid,

            lineStyle: {
              color: style.x.gridColor,
              width: style.x.gridBold,
              opacity: style.x.gridOpaque,
              type: style.x.splitLineType,
            },
          },
        },
        yAxis: {
          type: "value",

          show: style.y.isShow,

          axisLine: {
            symbol: style.y.styleArrow,
            show: style.y.showLine,
            lineStyle: {
              color: style.y.styleColor,
              width: style.y.styleBold,
            },
          },

          name: style.y.isUnit ? style.y.unitName : "",

          nameTextStyle: {
            fontFamily: style.y.unitFontFamily,
            fontSize: style.y.unitFontSize,
            color: style.y.unitFontColor,
          },

          axisLabel: {
            show: style.y.isAxisLabel,
            color: style.y.labelColor,
            fontSize: style.y.labelSize,
            rotate: style.y.wordDirection,
            margin: style.y.labelMargin,
            fontFamily: style.y.fontFamily,
          },

          axisTick: {
            show: style.y.axisTick,
            length: style.y.axisTickLehgth,
            inside: style.y.axisTickInside,
            lineStyle: {
              color: style.y.tickColor,
              width: style.y.tickWidth,
              type: style.y.tickStyle,
              opacity: style.y.tickOpacity,
            },
          },

          splitLine: {
            show: style.y.isGrid,

            lineStyle: {
              color: style.y.gridColor,
              width: style.y.gridBold,
              opacity: style.y.gridOpaque,
              type: style.y.splitLineType,
            },
          },
        },

        legend: {
          show: style.legend.isShow,
          itemWidth: style.legend.iconWidth,
          icon: style.legend.icon,
          itemHeight: style.legend.iconHeight,
          itemGap: 10,
          textStyle: {
            color: style.legend.fontColor,
            fontSize: style.legend.fontSize,
            fontWeight: style.legend.fontBold,
            fontFamily: style.legend.fontFamily,
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

          orient: style.legend.layout,
        },

        series: series,

        grid: {
          top: style.topPadding + "%",
          bottom: style.bottomPadding + "%",
          left: style.leftPadding + "%",
          right: style.rightPadding + "%",
        },
      };

      return option;
    },
  },
};
</script>
