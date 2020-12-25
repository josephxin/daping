<script>
import AbstractEchartBarComp from "@/compLib/commons/echart/AbstractEchartBarComp";

export default {
  name: "wordCloud",
  mixins: [AbstractEchartBarComp],

  mounted() {
    this.$el.className='radar';
    this.myChart.dispatchAction({
      type: "highlight", // 'highlight';  downplay
      seriesIndex: 0
    });
  },

  methods: {
    resize() {
      this.myChart.resize();
      this.myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0
      });
    },
    option() {
      var mockData = [
        {
          text: "指标一",
          value: 2
        },
        {
          text: "指标二",
          value: 3.2
        },
        {
          text: "指标三",
          value: 5
        },
        {
          text: "指标四",
          value: 4.1
        },
        {
          text: "指标五",
          value: 2.8
        }
      ];

      var minAngle = 10; // 最小角度
      var indicator = [];
      var data = [];
      var idx = 0;
      var randomArr = this.getRandom(360 / minAngle, mockData.length);
      for (var i = 0; i < 360 / minAngle; i++) {
        if (randomArr.indexOf(i) > -1) {
          indicator.push({
            text: mockData[idx].text
          });
          data.push(mockData[idx].value);
          idx++;
        } else {
          indicator.push({
            text: i * 10 + "`"
          });
          data.push("-");
        }
      }

      var option = {
        // backgroundColor: "#333",
        radar: [
          {
            indicator: indicator,
            center: ["50%", "50%"],
            radius: "80%",
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            name: {
              show: false
              // formatter:'【{value}】',
              // textStyle: {
              //     color:'rgba(0, 255, 51, 1)'
              // }
            },
            splitArea: {
              areaStyle: {
                color: "rgba(255, 255, 255, 0)"
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(0, 255, 51, 0)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(0, 255, 51, 1)"
              }
            }
          }
        ],
        series: [
          {
            name: "雷达图",
            type: "radar",
            symbol: "circle",
            symbolSize: 24,
            silent: true,
            animationEasing: "quarticOut",
            animationEasingUpdate: "quarticOut",
            animationDuration: 2000,
            animationDurationUpdate: 2000,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "rgba(0, 255, 51, 1)"
                }
              }
            },
            itemStyle: {
              normal: {
                opacity: 0
              },
              emphasis: {
                color: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.3,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0, 255, 51, 1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(255, 255, 255, .1)"
                    }
                  ]
                },
                borderWidth: 0,
                opacity: 1
              }
            },
            data: [
              {
                value: data,
                label: {
                  normal: {
                    textStyle: {
                      color: "rgba(0, 255, 51, 1)"
                    }
                  }
                },
                lineStyle: {
                  normal: {
                    opacity: 0
                  }
                }
              }
            ]
          }
        ]
      };

      // 点动画
      // (function(){
      // 	var highlight = false;
      // 	var type;
      // 	setInterval(function(){
      // 	    initRadar(mockData);
      // 		type = highlight ? 'downplay' : 'highlight';
      // 		radar.dispatchAction({
      // 			type: type,
      // 			seriesIndex: 0
      // 		});
      // 		highlight = !highlight;
      // 	}, 2000);
      // })();
      return option;
    },

    getRandom(range, count) {
      var randomArr = [];
      for (var i = 0; i < count; i++) {
        var r = Math.round(Math.random() * (range - 1));
        randomArr.push(r);
      }
      return randomArr;
    }
  }
};
</script>
<style scoped>
.radar:after {
  content: " ";
  display: block;
  background-image: linear-gradient(
    44deg,
    rgba(0, 255, 51, 0) 50%,
    #00ff33 100%
  );
  width: 40%;
  height: 40%;
  position: absolute;
  bottom: 50%;
  right: 50%;
  animation: radar-beam 4s infinite;
  animation-timing-function: linear;
  transform-origin: bottom right;
  border-radius: 100% 0 0 0;
}
@keyframes radar-beam {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
