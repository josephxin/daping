<script>
import AbstractEchartBarComp from "@/compLib/commons/echart/AbstractEchartBarComp";

export default {
  name: "abacisStat",
  mixins: [AbstractEchartBarComp],


  methods: {
    option() {
      
var hours = ['2001', '2002', '2003', '2004', '2005', '2006', '2007',
        '2008', '2009', '2010','2011','2012',
        '2013', '2014', '2015', '2016','',];
var days = ['团队一', '团队二', '团队三',
        '团队四', '团队五', '团队六', '团队七'];

var data = [
[0,0,0],[0,1,0],[0,2,0],[0,3,0],[0,4,1],[0,5,1],[0,6,1],[0,7,0],[0,8,2],[0,9,3],[0,10,2],[0,11,3],[0,12,5],[0,13,19],[0,14,6],[0,15,11],[0,16,0],
[1,0,0],[1,1,1],[1,2,0],[1,3,0],[1,4,1],[1,5,0],[1,6,0],[1,7,0],[1,8,3],[1,9,1],[1,10,1],[1,11,4],[1,12,2],[1,13,5],[1,14,6],[1,15,6],[1,16,0],
[2,0,0],[2,1,1],[2,2,0],[2,3,2],[2,4,0],[2,5,1],[2,6,1],[2,7,4],[2,8,1],[2,9,3],[2,10,10],[2,11,6],[2,12,1],[2,13,3],[2,14,5],[2,15,1],[2,16,0],
[3,0,0],[3,1,0],[3,2,0],[3,3,3],[3,4,3],[3,5,4],[3,6,3],[3,7,3],[3,8,3],[3,9,0],[3,10,1],[3,11,0],[3,12,2],[3,13,1],[3,14,0],[3,15,0],[3,16,0],
[4,0,0],[4,1,0],[4,2,0],[4,3,4],[4,4,3],[4,5,6],[4,6,2],[4,7,2],[4,8,5],[4,9,0],[4,10,0],[4,11,1],[4,12,1],[4,13,0],[4,14,0],[4,15,0],[4,16,0],
[5,0,0],[5,1,0],[5,2,0],[5,3,2],[5,4,0],[5,5,1],[5,6,2],[5,7,3],[5,8,3],[5,9,1],[5,10,2],[5,11,0],[5,12,0],[5,13,1],[5,14,1],[5,15,0],[5,16,0],
[6,0,0],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,7],[6,8,4],[6,9,4],[6,10,5],[6,11,1],[6,12,1],[6,13,2],[6,14,2],[6,15,3],[6,16,0],
];
data = data.map(function (item) {
    return [item[1], item[0], item[2]];
});

let option = {
    title: {
        text: '',
        link: 'https://github.com/pissang/echarts-next/graphs/punch-card'
    },
    legend: {
        data: ['论文数量'],
        left: 'right'
    },
    tooltip: {
        position: 'top',
        formatter: function (params) {
            return '在' + hours[params.value[0]] + '年期间，' + days[params.value[1]] + '共发表了'+params.value[2] + '份论文';
        }
    },
    grid: {
        left: 2,
        bottom: 10,
        right: 10,
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: hours,
        boundaryGap: false,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#999',
                type: 'dashed'
            }
        },
        axisLine: {
            show: false
        },
        axisLabel:{
            color : '#ffffff'
        }
    },
    yAxis: {
        type: 'category',
        data: days,
        axisLine: {
            show: false
        },
        axisLabel:{
            color : '#ffffff'
        }
    },
    series: [{
        name: '论文数量',
        type: 'scatter',
        symbolSize: function (val) {
            return val[2] * 4.2;
        },
        data: data,
        animationDelay: function (idx) {
            return idx * 5;
        }
    }]
};

      return option;
    }
  }
};
</script>
