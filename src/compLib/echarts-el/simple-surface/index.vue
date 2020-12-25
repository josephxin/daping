<script>
import AbstractEchartBarComp from "@/compLib/commons/echart/AbstractEchartBarComp";
import echartsGL from 'echarts-gl'
export default {
  name: "simple-surface",
  mixins: [AbstractEchartBarComp],
  methods: {
    option() {
      let style = this.styleConf;
      let data = this.compData
      let option = {
        backgroundColor : style.backgroundColor,
        "tooltip": {},
        // "color": ["#5bd1f9", "#00dbd9", "#01c8b3", "#ffbc34", "#c181d1", "#fb778e", "#fba377"],
        "visualMap": [{
          show : style.visualMapShow,
          "top": 80,
          "right": 0,
          "calculable": true,
          "max": 2.3975,
          "inRange": {
            "color": ["#5bd1f9", "#00dbd9", "#01c8b3", "#ffbc34", "#c181d1", "#fb778e", "#fba377"]
          },
          "textStyle": {
            "color": "#000"
          }
        }],
        "xAxis3D": {
          "nameTextStyle": {
            "color": "#fff",
            "fontSize": 12,
            "margin": 50
          },
          "name": "",
          "type": "category",
          "axisLabel": {
            "textStyle": {
              "color": "#fff",
              "fontSize": "12px",
              "margin": 18
            }
          }
        },
        "yAxis3D": {
          "name": "",
          "nameTextStyle": {
            "color": "#fff",
            "fontSize": "12px"
          },
          "type": "category",
          "axisLabel": {
            "textStyle": {
              "color": "#fff",
              "fontSize": "12px"
            }
          }
        },
        "zAxis3D": {
          "name": "",
          "nameTextStyle": {
            "color": "#fff",
            "fontSize": "12px"
          },
          "type": "value",
          "axisLabel": {
            "textStyle": {
              "color": "#fff",
              "fontSize": "12px",
              "margin": 12
            }
          }
        },
        "grid3D": {
          show : style.grid3DShow,
          "axisPointer": {
            "show": true,
            "lineStyle": {
              "color": "#5bd1f9"
            }
          },
          "axisTick": {
            "show": false
          },
          "axisLine": {
            "lineStyle": {
              "color": "#D2D2D2",
              "width": 1
            },
            "textStyle": {
              "fontSize": 12,
              "color": "#333333"
            }
          },
          "viewControl": {
            "orthographicSize": style.viewControlDistance,
            "projection": "orthographic",
            "autoRotate": style.viewControlAutoRotate
          }
        },
        "parametric": false,
        "series": [{
          "type": "surface",
          "data": data
        }]
      };
      return option;
    }
  }
};
</script>
