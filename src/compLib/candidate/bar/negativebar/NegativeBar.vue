<script>
	import AbstractEchartBarComp from '@/compLib/commons/echart/AbstractEchartBarComp'

	export default {
		name:'NegativeBar',
		mixins:[AbstractEchartBarComp],
		methods:{
			option(){
				let style = this.styleConf;
				let data = this.chartData;
				let series = [],legendArr=[],totalArr=[];
				var itemStyle = {
					normal: {
					},
					emphasis: {
						barBorderWidth: 1,
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						shadowColor: 'rgba(0,0,0,0.5)'
					}
				};
				data.legends.forEach(function(legend) {
						legendArr.push(legend.name)
						totalArr.push(...legend.data);	
						series.push({
						type: "bar",
						name: legend.name,
						data: legend.data,
						barWidth:'50%',
						stack: '1',
						itemStyle: itemStyle
					})
				})

				let option = { 
					color:this.defaultColors,
					legend: {
						data: legendArr,
						textStyle:{
								color:"#Fff"
						}
					},
				
					tooltip: {},
					xAxis: {
						data: data.classify,
						name: 'X Axis',
						silent: false,
						axisLine: {
							onZero: true,
							lineStyle:{
								color:'#fff'
							}
						},
						splitLine: {show: false},
						splitArea: {show: false}
					},
					yAxis: {
						inverse: false,
						splitArea: {show: false},
						axisLine: {
							onZero: true,
							lineStyle:{
								color:'#fff'
							}
						},
					},
					grid: {
						left: 100
					},
					visualMap: {
						type: 'continuous',
						dimension: 1,
						text: ['High', 'Low'],
						inverse: true,
						itemHeight: 200,
						calculable: true,
						textStyle:{
								color:"#Fff"
						},
						min: Math.min(...totalArr),
						max: Math.max(...totalArr),
						top: 60,
						left: 10,
					   inRange: {
							 colorLightness: [0.4, 0.8]
						},
						outOfRange: {
							color: '#bbb'
						},
						controller: {
							inRange: {
								color:this.defaultColors,
							},
							outOfRange: {
							color: '#bbb'
						},
						}
					},
					series: series
				};
 

			    return option;
			}
		}
	}
</script>
