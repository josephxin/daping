<script>
import AbstractEchartBarComp from "@/compLib/commons/echart/AbstractEchartBarComp";
import echarts from 'echarts'
export default {
  name: "splashes",
  mixins: [AbstractEchartBarComp],

  methods: {
    option() {
      var queue = "/static/img/data-1516936989273-SJH71mdSM.png"; //

      var retailtable = "/static/img/data-1516360001956-ry9S-L1rM.png"; //

      var table = "/static/img/data-1516338170066-HkGZ3e1rG.png"; //

      var travltable = "/static/img/data-1516338063920-B1d5ixkrG.png"; //

      var householdtable = "/static/img/data-1516338015401-SkDDox1SG.png";

      var unify = "/static/img/data-1516091863551-r1eJqEjEM.png"; //

      var retail = "/static/img/data-1516091809749-SJcoYNs4z.png"; //

      var household = "/static/img/data-1516091686336-BkRXF4oNz.png";

      var finance = "/static/img/data-1516091523271-rJiFdNj4f.png";

      var travl = "/static/img/data-1516091446583-B1ySdVs4G.png"; //

      var allData = {
        citys: [
          {
            name: "零售",
            value: [112.46607, 215.093863, 4],
            /*label:{normal:{show:true}},tooltip:{show:true,alwaysShowContent:true,formatter:'{b}111'},*/ symbol:
              "image://" + retail,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "旅游",
            value: [112.46607, 375.093863, 4],
            symbol: "image://" + travl,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "家居",
            value: [112.46607, 535.093863, 4],
            symbol: "image://" + household,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "零售中间表",
            value: [232.65607, 215.093863, 4],
            symbol: "image://" + retailtable,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "旅游中间表",
            value: [232.65607, 375.093863, 4],
            symbol: "image://" + travltable,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "家居中间表",
            value: [232.65607, 535.093863, 4],
            symbol: "image://" + householdtable,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          //{"name":"MQ","value":[352.8361,375.093863,4],"symbolSize":2,"itemStyle":{"normal":{"color":"#F58158"}}},
          {
            name: "MQ_LVYOU_JFDZ",
            value: [492.0961, 335.843863, 4],
            symbol: "image://" + table,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "MQ_LVYOU_JFZJ",
            value: [492.0961, 415.943863, 4],
            symbol: "image://" + table,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "MQ_INZONE_JFDZ",
            value: [492.0961, 175.043863, 4],
            symbol: "image://" + table,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "MQ_INZONE_JFZJ",
            value: [492.0961, 255.143863, 4],
            symbol: "image://" + table,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "MQ_JIAJU_JFDZ",
            value: [492.0961, 495.243863, 4],
            symbol: "image://" + table,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "MQ_JIAJU_JFZJ",
            value: [492.0961, 575.343863, 4],
            symbol: "image://" + table,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "JF_ZJRZ",
            value: [622.4361, 375.093863, 4],
            symbol: "image://" + unify,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "CYHY_JFXX",
            value: [712.4361, 445.093863, 4],
            symbol: "image://" + unify,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "TYHY_JFXX",
            value: [712.4361, 305.093863, 4],
            symbol: "image://" + unify,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "JF_CYLSB",
            value: [622.4361, 215.093863, 4],
            symbol: "image://" + unify,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "MQ-零售对账消息队列",
            value: [352.8361, 175.093863, 4],
            symbol: "image://" + queue,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "MQ-旅游对账消息队列",
            value: [352.8361, 335.093863, 4],
            symbol: "image://" + queue,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "MQ-家居增减消息队列",
            value: [352.8361, 575.093863, 4],
            symbol: "image://" + queue,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "MQ-零售增减消息队列",
            value: [352.8361, 255.093863, 4],
            symbol: "image://" + queue,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "MQ-旅游增减消息队列",
            value: [352.8361, 415.093863, 4],
            symbol: "image://" + queue,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "MQ-家居对账消息队列",
            value: [352.8361, 495.093863, 4],
            symbol: "image://" + queue,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          },
          {
            name: "MQ-异常消息队列",
            value: [352.8361, 655.093863, 4],
            symbol: "image://" + queue,
            symbolSize: 40,
            itemStyle: { normal: { color: "#F58158" } }
          }
        ],

        newCity: [],

        moveLines: [
          {
            fromName: "零售",
            toName: "零售中间表",
            coords: [[112.46607, 215.093863], [232.65607, 215.093863]]
          },
          {
            fromName: "旅游",
            toName: "旅游中间表",
            coords: [[112.46607, 375.093863], [232.65607, 375.093863]]
          },
          {
            fromName: "家居",
            toName: "家居中间表",
            coords: [[112.46607, 535.093863], [232.65607, 535.093863]]
          },
          {
            fromName: "MQ-零售增减消息队列",
            toName: "MQ_INZONE_JFZJ",
            coords: [[352.8361, 255.093863], [492.0961, 255.143863]]
          },
          {
            fromName: "旅游中间表",
            toName: "MQ-旅游对账消息队列",
            coords: [[232.65607, 375.093863], [352.8361, 335.093863]]
          },
          {
            fromName: "旅游中间表",
            toName: "MQ-旅游增减消息队列",
            coords: [[232.65607, 375.093863], [352.8361, 415.093863]]
          },
          {
            fromName: "家居中间表",
            toName: "MQ-家居对账消息队列",
            coords: [[232.65607, 535.093863], [352.8361, 495.093863]]
          },
          {
            fromName: "家居中间表",
            toName: "MQ-家居增减消息队列",
            coords: [[232.65607, 535.093863], [352.8361, 575.093863]]
          },
          {
            fromName: "MQ-旅游对账消息队列",
            toName: "MQ_LVYOU_JFDZ",
            coords: [[352.8361, 335.093863], [492.0961, 335.843863]]
          },
          {
            fromName: "MQ-旅游增减消息队列",
            toName: "MQ_LVYOU_JFZJ",
            coords: [[352.8361, 415.093863], [492.0961, 415.943863]]
          },
          {
            fromName: "MQ-零售对账消息队列",
            toName: "MQ_INZONE_JFDZ",
            coords: [[352.8361, 175.093863], [492.0961, 175.043863]]
          },
          {
            fromName: "MQ_INZONE_JFDZ",
            toName: "零售表",
            coords: [[492.0961, 175.043863], [622.4361, 215.093863]]
          },
          {
            fromName: "MQ_JIAJU_JFDZ",
            toName: "家居表",
            coords: [[492.0961, 495.243863], [622.4361, 215.093863]]
          },
          {
            fromName: "零售中间表",
            toName: "MQ-零售增减消息队列",
            coords: [[232.65607, 215.093863], [352.8361, 255.093863]]
          },
          {
            fromName: "JF_ZJRZ",
            toName: "CYHY_JFXX",
            coords: [[622.4361, 375.093863], [712.4361, 445.093863]]
          },
          {
            fromName: "JF_ZJRZ",
            toName: "TYHY_JFXX",
            coords: [[622.4361, 375.093863], [712.4361, 305.093863]]
          }
        ],

        newLines: [
          {
            fromName: "零售中间表",
            toName: "MQ-零售对账消息队列",
            coords: [[232.65607, 215.093863], [352.8361, 175.093863]]
          },

          {
            fromName: "MQ-家居对账消息队列",
            toName: "MQ_JIAJU_JFDZ",
            coords: [[352.8361, 495.093863], [492.0961, 495.243863]]
          },
          {
            fromName: "MQ-家居增减消息队列",
            toName: "MQ_JIAJU_JFZJ",
            coords: [[352.8361, 575.093863], [492.0961, 575.343863]]
          },
          {
            fromName: "MQ_LVYOU_JFDZ",
            toName: "旅游表",
            coords: [[492.0961, 335.843863], [622.4361, 215.093863]]
          },
          {
            fromName: "MQ_LVYOU_JFZJ",
            toName: "旅游表",
            coords: [[492.0961, 415.943863], [622.4361, 375.093863]]
          },
          {
            fromName: "MQ_INZONE_JFZJ",
            toName: "零售表",
            coords: [[492.0961, 255.143863], [622.4361, 375.093863]]
          },
          {
            fromName: "MQ_JIAJU_JFZJ",
            toName: "家居表",
            coords: [[492.0961, 575.343863], [622.4361, 375.093863]]
          },
          {
            fromName: "TYHY_JFXX",
            toName: "MQ-异常消息队列",
            coords: [[622.4361, 375.093863], [352.8361, 655.093863]]
          },
          {
            fromName: "MQ-异常消息队列",
            toName: "家居中间表",
            coords: [[352.8361, 655.093863], [232.65607, 535.093863]]
          }
        ]
      };

      let option = {
        // backgroundColor: '#020933',
        title: {
          text: "MQ数据传输图",
          left: "300",
          top: "20",
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          show: true,
          // orient: 'vertical',
          top: "top",
          left: "right",
          data: ["地点", "线路"],
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          show: true,
          alwaysShowContent: true,
          position: [185, 75],
          formatter: "{b}<br>MQ接收数据13278条<br>MQ取出数据13278条"
        },
        geo: {
          map: "北京市",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#404a59"
            },
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        },
        series: [
          {
            name: "地点",
            //type: 'effectScatter',
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
              period: 7,
              scale: 26
            },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{b}",
                color: "white"
              },
              emphasis: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: 2,
            showEffectOn: "render",
            itemStyle: {
              normal: {
                color: "#46bee9"
              }
            },
            data: allData.citys
          },
          {
            name: "地点",
            type: "effectScatter",
            //type: 'scatter',
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
              period: 7,
              scale: 26
            },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{b}",
                color: "white"
              },
              emphasis: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: 2,
            showEffectOn: "render",
            itemStyle: {
              normal: {
                color: "#46bee9"
              }
            },
            data: allData.newCity
          },
          {
            name: "线路",
            type: "lines",
            coordinateSystem: "geo",
            zlevel: 2,
            large: true,
            effect: {
              show: true,
              constantSpeed: 30,
              symbol: "arrow", //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
              symbolSize: 6,
              trailLength: 0
            },

            lineStyle: {
              normal: {
                color: "#0fff17",
                /*
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0, color: '#58B3CC'
                    }, {
                        offset: 1, color: '#F58158'
                    }], false),*/
                width: 2,
                opacity: 0.6,
                curveness: 0.1
              }
            },
            data: allData.moveLines
          },
          {
            name: "线路",
            type: "lines",
            coordinateSystem: "geo",
            zlevel: 2,
            large: true,
            effect: {
              show: true,
              constantSpeed: 30,
              symbol: "arrow", //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
              symbolSize: 6,
              trailLength: 0
            },

            lineStyle: {
              normal: {
                color: "rgb(255, 0, 0)",
                /*
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0, color: '#58B3CC'
                    }, {
                        offset: 1, color: '#F58158'
                    }], false),*/
                width: 2,
                opacity: 1,
                curveness: 0.2
              }
            },
            data: allData.newLines
          }
        ]
      };

      return option;
    }
  }
};
</script>
