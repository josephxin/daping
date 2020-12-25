<script>
import AbstractEchartPieComp from '@/compLib/commons/echart/AbstractEchartPieComp'
export default {
  name: 'nestpie',
  mixins: [AbstractEchartPieComp],
  methods: {
    option() {
      let style = this.styleConf;
      let data = this.chartData;
      let option = {
        "legend": {
          "show": true,
          "itemGap": 12,
          "data": ["按时修复", "未按时修复", "已修复"],
          "right": "10%",
          "top": "5%",
          "color": "#000"
        },

        "series": [{
          "name": "Line 1",
          "type": "pie",
          "clockWise": true,
          "radius": ["55%", "70%"],
          "hoverAnimation": false,
          "label": {
            "show": false
          },
          "labelLine": {
            "show": false
          },
          "data": [{
            "value": 830,
            "name": "按时修复",
            "label": {
              "show": true,
              formatter: '{c|{c}}  {per|({d}%)}  ',
              borderColor: '#e4696b',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                b: {
                  fontSize: 12,
                  color: '#484c57',
                  padding: [2, 4],
                  verticalAlign: 'bottom'
                },
                c: {
                  fontSize: 26,
                  padding: [0,0,0,4],
                  lineHeight: 36,
                  verticalAlign: 'bottom'
                },
                per: {
                  verticalAlign: 'bottom',
                  padding: [2, 0],
                  borderRadius: 2
                }
              }
            },
            "itemStyle": {
              "color": "rgb(46,199,201)"
            },
            "labelLine": {
              "show": true,
            },
            "emphasis": {
              "itemStyle": {
                "color": "rgb(46,199,201)"
              }, "labelLine": {
                "show": true
              },
            }
          },
          {
            "name": "未按时修复",
            "value": 200,
            "label": {
              "show": true,
              formatter: '{c|{c}}  {per|({d}%)}  ',
              borderColor: '#ffb980',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                b: {
                  fontSize: 12,
                  color: '#484c57',
                  padding: [2, 4],
                  verticalAlign: 'bottom'
                },
                c: {
                  fontSize: 26,
                  lineHeight: 36,
                  padding: [0,0,0,4],
                  verticalAlign: 'bottom'
                },
                per: {
                  verticalAlign: 'bottom',
                  padding: [2, 0],
                  borderRadius: 2
                }
              }
            },
            "itemStyle": {
              "color": "#ffb980"
            },
            "labelLine": {
              "show": true
            },
            "emphasis": {
              "itemStyle": {
                "color": "#ffb980"
              },
              "labelLine": {
                "show": true
              },
            }
          }, {
            "name": "03",
            "value": 1200,
            "itemStyle": {
              "normal": {
                "color": "rgba(244, 244, 244, 1)",
                "label": {
                  "show": false
                },
                "labelLine": {
                  "show": false
                }
              },
              "emphasis": {
                "color": "rgba(244, 244, 244, 1)",
                "label": {
                  "show": false
                },
                "labelLine": {
                  "show": false
                }
              }
            }
          }]
        }, {
          "name": "2",
          "type": "pie",
          "clockWise": true,
          "radius": ["40%", "54%"],
          "hoverAnimation": false,
          "label": {
            "show": false
          },
          z: 22,
          "labelLine": {
            "show": false
          },
          "data": [{
            "value": 1290,
            "name": "已修复",
            "label": {
              "show": true,
              formatter: '{c|{c}}  {per|({d}%)}  ',
              borderColor: '#5ab2ee',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                b: {
                  fontSize: 12,
                  color: '#5ab2ee',
                  padding: [2, 4],
                  verticalAlign: 'bottom'
                },
                c: {
                  fontSize: 26,
                  lineHeight: 36,
                  padding: [0,0,0,4],
                  verticalAlign: 'bottom'
                },
                per: {
                  verticalAlign: 'bottom',
                  padding: [2, 0],
                  borderRadius: 2
                }
              }
            },
            "itemStyle": {
              "color": "#5ab2ee"
            },
            "labelLine": {
              "show": true,
              length: 50,
              length2:  20,
            },
            "emphasis": {
              "itemStyle": {
                "color": "#5ab2ee"
              }, "labelLine": {
                "show": true,
                length: 50,
              },
            }
          }, {
            "name": "02",
            "value": 934.4444444444443,
            "itemStyle": {
              "normal": {
                "color": "rgba(244, 244, 244, 1)",
                "label": {
                  "show": false
                },
                "labelLine": {
                  "show": false
                }
              },
              "emphasis": {
                "color": "rgba(244, 244, 244, 1)",
                "label": {
                  "show": false
                },
                "labelLine": {
                  "show": false
                }
              }
            }
          }]
        }, {
          "name": "3",
          "type": "pie",
          "clockWise": true,
          "radius": ["0", "39%"],
          "hoverAnimation": false,
          "label": {
            "show": false
          },
          "labelLine": {
            "show": false
          },
          "data": [{
            "value": 190,
            "name": "问题总数",
            "label": {
              position: 'center',
              "show": true,
              formatter: '{b|问题总数}\n{c|75693}\n{b|平均修复时长}\n{c|3}{b|小时}',
              borderColor: '#5ab2ee',
              textAlign: 'center',
              borderRadius: 4,
              rich: {
                b: {
                  fontSize: 12,
                  color: '#fff',
                },
                c: {
                  fontSize: 26,
                  lineHeight: 46,
                  color: '#fff',

                },
                per: {
                  verticalAlign: 'bottom',
                  padding: [2, 0],
                  borderRadius: 2
                }
              }
            },
            "itemStyle": {
              "color": "#e56b6e"
            },
            "labelLine": {
              "show": false
            },
            "emphasis": {
              "itemStyle": {
                "color": "#e56b6e"
              }
            }
          }]
        }]
      }
      return option;
    },
    random() {
      return Math.floor(Math.random() * 75) / 100
    }
  }
}
</script>
