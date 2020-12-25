<script>
	import AbstractEchartBarComp from '@/compLib/commons/echart/AbstractEchartBarComp'

	export default {
		name:'BothwayLine',
		mixins:[AbstractEchartBarComp],
		methods:{
			option(){
				var getDayTime = function(){
				    var temp = [];
				    for(var i = 0;i < 24;i++){
				        // var hour = i < 10 ? '0' + i + ':00' : i + ':00';
				        var hour = i + ':00';
				        temp.push(hour);
				    }
				    return temp;
				}

				var getRandomData = function(){
				    var temp = [];
				    for(var i = 0;i < 24;i++){
				        var item = Math.random() * 100 - Math.random() * 50;
				        temp.push(Math.abs(item).toFixed(2));
				    }
				    
				    return temp;
				}

				let option = {
					color: this.defaultColors,
					// color: ['#66CCFF', '#CC6666', '#66CCCC', '#FF9999', '#CCFF99'],
					// grid.top需要根据容器高度调整
					grid: [{
						top: '11%',
						bottom: 0,
						left: '5%',
						right: '5%',
						height: '35%'
					}, {
						top: '51.5%',
						bottom: 0,
						left: '5%',
						right: '5%',
						height: '35%'
					}],
					tooltip: {
						trigger: 'axis',
						formatter: function(params){
							if(params instanceof Array){
								var idxMap = [{
									text: 'cpu使用率',
									data: []
								}, {
									text: '内存使用率',
									data: []
								}];
								var time = params[0].axisValue;
								for(var i = 0;i < params.length;i++){
									var seriesIdx = params[i].seriesId.split(params[i].seriesId[0]);
									idxMap[seriesIdx[2]].data.push({
										marker: params[i].marker,
										seriesName: params[i].seriesName,
										data: params[i].data
									});
								};
								
								return '<div>'
									+ '<time>' + time + '</time>'
									+ '<br />'
									+ idxMap.map(function(item){
										return '<span>' + item.text + '</span>' + item.data.map(function(i_item){
											return '<p style="margin: 0;padding: 0;">' + i_item.marker + i_item.seriesName + ': ' + i_item.data + '%' + '</p>';
										}).join('');
									}).join('');
								+ '</div>'
							}
						}
					},
					axisPointer: {
						link: {
							xAxisIndex: 'all'
						}
					},
					legend: {
						data:['192.168.1.1', '192.168.1.5']
					},
					xAxis: [{
						type: 'category',
						gridIndex: 0,
						boundaryGap: false,
						axisLine:{
							lineStyle:{
								color:'#ffffff',
							}
						},
						axisLabel: {
							interval: 0
						},
						data: getDayTime()
					}, {
						type: 'category',
						gridIndex: 1,
						position: 'top',
						boundaryGap: false,
						axisLine:{
							lineStyle:{
								color:'#ffffff',
							}
						},
						axisLabel: {
							show: false,
							interval: 0
						},
						data: getDayTime()
					}],
					yAxis: [{
						name: 'cpu(%)',
						type: 'value',
						nameTextStyle: {
							fontSize: 14
						},
						min: 0,
						max: 100,
						gridIndex: 0,
						axisLine:{
							lineStyle:{
								color:'#ffffff',
							}
						},
						splitLine: {
							lineStyle: {
								type: 'dashed',
							}
						}
					}, {
						name: '内存(%)',
						type: 'value',
						nameTextStyle: {
							fontSize: 14
						},
						min: 0,
						max: 100,
						gridIndex: 1,
						inverse: true,
						axisLine:{
							lineStyle:{
								color:'#ffffff',
							}
						},
						splitLine: {
							lineStyle: {
								type: 'dashed',
							}
						}
					}],
					series: [
						{
							name:'192.168.1.1',
							type:'line',
							data: getRandomData()
						},
						{
							name:'192.168.1.5',
							type:'line',
							data: getRandomData()
						},
						{
							name:'192.168.1.1',
							type:'line',
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: getRandomData()
						},
						{
							name:'192.168.1.5',
							type:'line',
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: getRandomData()
						}
					]
				};

				return option;
			}
		}
	}
</script>
