<script>
import AbstractEchartBarComp from "@/compLib/commons/echart/AbstractEchartBarComp";

export default {
  name: "wordCloud",
  mixins: [AbstractEchartBarComp],

  methods: {
    option() {
      var myColor = ["#0096f3"];
      let option = {
        backgroundColor: "rgba(0,0,0,0)",
        grid: {
          left: "11%",
          top: "12%",
          right: "0%",
          bottom: "8%",
          containLabel: true
        },
        xAxis: [
          {
            show: false
          }
        ],
        yAxis: [
          {
            axisTick: "none",
            axisLine: "none",
            offset: "27",
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "16"
              }
            },
            data: ["8"]
          },
          {
            axisTick: "none",
            axisLine: "none",
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "16"
              }
            },
            data: ["12567"]
          },
          {
            axisLine: {
              lineStyle: {
                color: "rgba(0,0,0,0)"
              }
            },
            data: []
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            stack: "圆",
            yAxisIndex: 0,
            data: [50],
            label: {
              normal: {
                show: true,
                position: "right",
                distance: 10,
                formatter: function(param) {
                  return param.value + "%";
                },
                textStyle: {
                  color: "#ffffff",
                  fontSize: "16"
                }
              }
            },
            barWidth: 10,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                }
              }
            },
            z: 2
          },
          {
            name: "内圆",
            type: "scatter",
            stack: "圆",
            yAxisIndex: 0,
            data: [0],
            label: {
              normal: {
                show: false,
                position: "right",
                formatter: function(param) {
                  return param.value + "%";
                },

                textStyle: {
                  color: "#ffffff",
                  fontSize: "16"
                }
              }
            },

            yAxisIndex: 2,
            symbolSize: 14,
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 3,
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                },
                opacity: 1
              }
            },
            z: 2
          },
          {
            name: "白框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [99.5],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: "#0e2147",
                barBorderRadius: 5
              }
            },
            z: 1
          },
          {
            name: "外框",
            type: "bar",
            yAxisIndex: 2,
            barGap: "-100%",
            data: [100],
            barWidth: 24,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                },
                barBorderRadius: 5
              }
            },
            z: 0
          },
          {
            name: "外圆",
            type: "scatter",
            hoverAnimation: false,
            data: [0],
            yAxisIndex: 2,
            symbolSize: 30,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                },
                opacity: 1
              }
            },
            z: 2
          }
        ]
      };
      return option;
    }
  }
};
</script>
