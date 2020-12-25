<script>
import AbstractEchartBarComp from '@/compLib/commons/echart/AbstractEchartBarComp'

export default {
  name: 'MultibarBar',
  mixins: [AbstractEchartBarComp],
  methods: {
    option() {
           let style = this.styleConf;
      let data = this.chartData;     
      var placeHoledStyle = {
        normal: {
          barBorderColor: 'rgba(0,0,0,0)',
          color: 'rgba(0,0,0,0)'
        },
        emphasis: {
          barBorderColor: 'rgba(0,0,0,0)',
          color: 'rgba(0,0,0,0)'
        }
      };
      var dataStyle = {
        normal: {
          label: {
            show: true,
            position: 'insideLeft',
            formatter: '{c}%'
          }
        }
      };
      let option = {
        color:['#5ab1ef','#86cbfc','#2ec7c9','#65e5e7','#b6a2de'],
        // title: {
        //   text: '多维条形图',
        //   textStyle:{
        // 			color:"#fff",
        //   },
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
            axis: 'y'
          },
          formatter: '{b}<br/>{a0}:{c0}%<br/>{a2}:{c2}%<br/>{a4}:{c4}%<br/>{a6}:{c6}小时'
        },
        legend: {
          show: false,
          textStyle: {
            color: "#000",
          },
          data: ['GML', 'PYP', 'WTC', 'ZTW']
        },
        grid: {
        },
        xAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#d6d6d6',
                width: 1
              }
            },
            splitLine: { show: true },
            axisLabel: { show: false }
          },
          {
            "type": "category",
            "data": ["GML", "PYP", "WTC", "ZTW", "ZTW1"],
            "axisLine": {
              "lineStyle": {
                "color": "#d6d6d6",
                "width": 1
              }
            },
            "splitLine": {
              "show": false
            },
            "axisLabel": {
              "show": true,
              color: '#484c57'
            },
            splitArea: {
              "show": false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLine: {
              lineStyle: {
                color: '#d6d6d6',
                width: 1
              }
            },
            axisLabel: {
              "color": "#484c57",
            },
            splitLine: { show: false },
            data: data.classify
          }
        ],
        series: [
          {
            name: 'GML',
            type: 'bar',
            stack: '总量',
            itemStyle: dataStyle,
            data: [38, 50, 33, 72]
          },
          {
            name: 'GML',
            type: 'bar',
            stack: '总量',
            itemStyle: placeHoledStyle,
            data: [62, 50, 67, 28]
          },
          {
            name: 'PYP',
            type: 'bar',
            stack: '总量',
            itemStyle: dataStyle,
            data: [61, 41, 42, 30]
          },
          {
            name: 'PYP',
            type: 'bar',
            stack: '总量',
            itemStyle: placeHoledStyle,
            data: [39, 59, 58, 70]
          },
          {
            name: 'WTC',
            type: 'bar',
            stack: '总量',
            itemStyle: dataStyle,
            data: [37, 35, 44, 60]
          },
          {
            name: 'WTC',
            type: 'bar',
            stack: '总量',
            itemStyle: placeHoledStyle,
            data: [63, 65, 56, 40]
          },
          {
            name: 'ZTW',
            type: 'bar',
            stack: '总量',
            itemStyle: dataStyle,
            data: [71, 50, 31, 39]
          },
          {
            name: 'ZTW',
            type: 'bar',
            stack: '总量',
            itemStyle: placeHoledStyle,
            data: [29, 50, 69, 61]
          },
          {
            name: 'ZTW1',
            type: 'bar',
            stack: '总量',
            itemStyle: dataStyle,
            data: [71, 50, 31, 39]
          },
          {
            name: 'ZTW1',
            type: 'bar',
            stack: '总量',
            itemStyle: placeHoledStyle,
            data: [29, 50, 69, 61]
          }
        ]
      };
     // console.log(JSON.stringify(option))
      return option;
    }
  }
}
</script>
