<script>
import AbstractEchartPieComp from '@/compLib/commons/echart/AbstractEchartPieComp'
export default {
  name: 'progresspie',
  mixins: [AbstractEchartPieComp],
  methods: {
    option() {
      let style = this.styleConf;
      let data = this.chartData;
      let option = {
        legend: {
          show: true,
          itemGap: 20,
					data: data.legend,
					orient: 'vertical',
					right: '10%',
					top: '20%',
					color: '#000'
        },
        series: [{
          name: 'Line 1',
          type: 'pie',
          clockWise: true,
          radius: ['85%', '90%'],
          center: ['32%', '50%'],
          hoverAnimation: false,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: [{
            value: data[0].value,
            name: data[0].name,
            label: {
              show: true,
              position: 'center',
              fontSize: 20,
              height: 100,
              formatter: [
                '{title|{@value}}',
              ].join('\n'),
              rich: {
                title: {
                  color: "#e4696b",
                  fontSize: 40
                }
              }
            },
            itemStyle: {
              color: '#e4696b',
            },
            labelLine: {
              show: false
            },
            emphasis: {
              itemStyle: {
                color: '#e4696b',
              }
            }
          }, {
            name: '02',
            value: data[0].value / this.random() * (1-this.random()),
            itemStyle: {
              normal: {
                color: 'rgba(244, 244, 244, 1)',
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                color: 'rgba(244, 244, 244, 1)',
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
            },
          }]
        }, {
          name: '2',
          type: 'pie',
          clockWise: true,
          radius: ['75%', '80%'],
          center: ['32%', '50%'],
          hoverAnimation: false,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: [{
            value: data[1].value,
            name: data[1].name,
            label: {
              show: true,
              position: 'center',
              height: 20,
              formatter: [
                '{title|{@value}}',
              ].join('\n'),
              rich: {
                title: {
                  color: "#5ab2ee",
                  fontSize: 40
                }
              }
            },
            itemStyle: {
              color: '#5ab2ee',
            },
            labelLine: {
              show: false
            },
            emphasis: {
              itemStyle: {
                color: '#5ab2ee',
              }
            }

          }, {
            name: '02',
            value: data[1].value / this.random() * (1-this.random()),
            itemStyle: {
              normal: {
                color: 'rgba(244, 244, 244, 1)',
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                color: 'rgba(244, 244, 244, 1)',
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
            },
          }]
        }, {
          name: '3',
          type: 'pie',
          clockWise: true,
          radius: ['65%', '70%'],
          center: ['32%', '50%'],
          hoverAnimation: false,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: [{
            value: data[2].value,
            name: data[2].name,
            label: {
              show: true,
              position: 'center',
              height: -60,
              formatter: [
                '{title|{@value}}',
              ].join('\n'),
              rich: {
                title: {
                  color: "#28c8c8",
                  fontSize: 40
                }
              }
            },
            itemStyle: {
              color: '#28c8c8',
            },
            labelLine: {
              show: false
            },
            emphasis: {
              itemStyle: {
                color: '#28c8c8',
              }
            }
          }, {
            name: '02',
            value: data[2].value / this.random() * (1-this.random()),
            itemStyle: {
              normal: {
                color: 'rgba(244, 244, 244, 1)',
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                color: 'rgba(244, 244, 244, 1)',
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
            },
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
