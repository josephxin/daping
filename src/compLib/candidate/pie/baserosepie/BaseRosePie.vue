<script>
	import AbstractEchartPieComp from '@/compLib/commons/echart/AbstractEchartPieComp'
	export default {
		name:'BaseRosePie',
		mixins:[AbstractEchartPieComp],
		methods:{
			option(){
				let style = this.styleConf;
				let data = this.chartData;
				let option = {
					title: {
						text: 'this is title',
						left: 'center',
						top: 20,
						textStyle: {
							color: '#ccc'
						}
					},

					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},

					visualMap: {
						show: false,
						min: 80,
						max: 600,
						inRange: {
							colorLightness: [0, 1]
						}
					},
					series : [
						{
							name:'访问来源',
							type:'pie',
							radius : '55%',
							center: ['50%', '50%'],
							data:data.data.sort(function (a, b) { return a.value - b.value; }),
							roseType: 'radius',
							label: {
								normal: {
									textStyle: {
										color: 'rgba(255, 255, 255, 0.3)'
									}
								}
							},
							labelLine: {
								normal: {
									lineStyle: {
										color: 'rgba(255, 255, 255, 0.3)'
									},
									smooth: 0.2,
									length: 10,
									length2: 20
								}
							},
							itemStyle: {
								normal: {
									color: '#c23531',
									shadowBlur: 200,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							},

							animationType: 'scale',
							animationEasing: 'elasticOut',
							animationDelay: function (idx) {
								return Math.random() * 200;
							}
						}
					]
				};

				return option;
			}
		}
	}
</script>
