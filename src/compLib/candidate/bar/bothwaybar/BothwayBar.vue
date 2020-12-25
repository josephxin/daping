<script>
	import AbstractEchartBarComp from '@/compLib/commons/echart/AbstractEchartBarComp'

	export default {
		name:'BothwayBar',
		mixins:[AbstractEchartBarComp],
		methods:{
			option(){
			    var myData = ['一审服判息诉率', '撤诉率', '调解率', '实际执行率', '裁判自动履行率', '执行标的到位率', '再审审查率']
			    var lineData = [100, 100, 100, 100, 100, 100, 100]
			    var lastYearData = {
			        1: [3, 20, 62, 34, 55, 65, 33]
			    }
			    var thisYearData = {
			        1: [11, 38, 23, 39, 66, 66, 79]
			    }
			    var timeLineData = [1]
			    var background = "rgba(0,0,0,0)"; //背景 

			    var option = {
			        baseOption: {
			            backgroundColor: background,
			            timeline: {
			                show: false,
			                top: 0,
			                data: []
			            },
			            legend: {
			                top: '5%',
			                left: '25%',
			                itemWidth: 22,
			                itemHeight: 22,
			                itemGap: 343,
			                icon: 'horizontal',
			                textStyle: {
			                    color: '#ffffff',
			                    fontSize: 20,
			                },
			                data: ['2017', '2018']
			            },
			            grid: [{
			                show: false,
			                left: '5%',
			                top: '10%',
			                bottom: '8%',
			                containLabel: true,
			                width: '37%'
			            }, {
			                show: false,
			                left: '51%',
			                top: '10%',
			                bottom: '8%',
			                width: '0%'
			            }, {
			                show: false,
			                right: '2%',
			                top: '10%',
			                bottom: '8%',
			                containLabel: true,
			                width: '37%'
			            }],
			            xAxis: [{
			                type: 'value',
			                inverse: true,
			                axisLine: {
			                    show: false
			                },
			                axisTick: {
			                    show: false
			                },
			                position: 'top',
			                axisLabel: {
			                    show: false
			                },
			                splitLine: {
			                    show: false
			                }
			            }, {
			                gridIndex: 1,
			                show: false
			            }, {
			                gridIndex: 2,
			                axisLine: {
			                    show: false
			                },
			                axisTick: {
			                    show: false
			                },
			                position: 'top',
			                axisLabel: {
			                    show: false
			                },
			                splitLine: {
			                    show: false
			                }
			            }],
			            yAxis: [{
			                type: 'category',
			                inverse: true,
			                position: 'right',
			                axisLine: {
			                    show: false
			                },
			                axisTick: {
			                    show: false
			                },
			                axisLabel: {
			                    show: false
			                },
			                data: myData
			            }, {
			                gridIndex: 1,
			                type: 'category',
			                inverse: true,
			                position: 'left',
			                axisLine: {
			                    show: false
			                },
			                offset:-70,
			                axisTick: {
			                    show: false
			                },
			                axisLabel: {
			                    show: true,
			                    textStyle: {
			                        color: '#ffffff',
			                        fontSize: 16
			                    }

			                },
			                data: myData.map(function(value) {
			                    return {
			                        value: value,
			                        textStyle: {
			                            align: 'right'
			                        }
			                    }
			                })
			            }, {
			                gridIndex: 2,
			                type: 'category',
			                inverse: true,
			                position: 'left',
			                axisLine: {
			                    show: false
			                },
			                axisTick: {
			                    show: false
			                },
			                axisLabel: {
			                    show: false

			                },
			                data: myData
			            }],
			            series: []

			        },
			        options: []
			    }

			    option.baseOption.timeline.data.push(timeLineData[0])
			    option.options.push({
			        series: [{
			                type: 'pictorialBar',
			                xAxisIndex: 0,
			                yAxisIndex: 0,
			                symbol: 'rect',
			                itemStyle: {
			                    normal: {
			                        color: 'rgba(3,147,114,0.27)'
			                    }
			                },
			                barWidth: 10,
			                symbolRepeat: true,
			                symbolSize: 14,
			                data: lineData,
			                barGap: '-100%',
			                barCategoryGap: 0,
			                label: {
			                    normal: {
			                        show: true,
			                        formatter: (series) => {
			                            return lastYearData[timeLineData[0]][series.dataIndex] + '%'
			                        },
			                        position: 'insideTopLeft',
			                        textStyle: {
			                            color: '#ffffff',
			                            fontSize: 20,
			                        },
			                        offset: [0, -35],
			                    }
			                },
			                z: -100,
			                animationEasing: 'elasticOut',
			                animationDelay: function(dataIndex, params) {
			                    return params.index * 30;
			                }
			            }, {
			                name: '2017',
			                type: 'pictorialBar',
			                xAxisIndex: 0,
			                yAxisIndex: 0,
			                symbol: 'rect',
			                barWidth: 10,
			                itemStyle: {
			                    normal: {
			                        barBorderRadius: 5,
			                        color: '#039372'
			                    }
			                },
			                symbolRepeat: true,
			                symbolSize: 14,
			                data: lastYearData[timeLineData[0]],
			                animationEasing: 'elasticOut',
			                animationDelay: function(dataIndex, params) {
			                    return params.index * 30 * 1.1;
			                }
			            },
			            {
			                type: 'pictorialBar',
			                xAxisIndex: 2,
			                yAxisIndex: 2,
			                symbol: 'rect',
			                itemStyle: {
			                    normal: {
			                        color: 'rgba(54,215,182,0.27)'
			                    }
			                },
			                barWidth: 10,
			                symbolRepeat: true,
			                symbolSize: 14,
			                data: lineData,
			                barGap: '-100%',
			                barCategoryGap: 0,
			                label: {
			                    normal: {
			                        show: true,
			                        formatter: (series) => {
			                            return thisYearData[timeLineData[0]][series.dataIndex] + '%'
			                        },
			                        position: 'insideTopRight',
			                        textStyle: {
			                            color: '#ffffff',
			                            fontSize: 20,
			                        },
			                        offset: [0, -35],
			                    }
			                },
			                z: -100,
			                animationEasing: 'elasticOut',
			                animationDelay: function(dataIndex, params) {
			                    return params.index * 30;
			                }
			            }, {
			                name: '2018',
			                type: 'pictorialBar',
			                xAxisIndex: 2,
			                yAxisIndex: 2,
			                symbol: 'rect',
			                barWidth: 10,
			                itemStyle: {
			                    normal: {
			                        barBorderRadius: 5,
			                        color: '#36d7b6'
			                    }
			                },
			                symbolRepeat: true,
			                symbolSize: 14,
			                data: thisYearData[timeLineData[0]],
			                animationEasing: 'elasticOut',
			                animationDelay: function(dataIndex, params) {
			                    return params.index * 30 * 1.1;
			                }
			            }
			        ]
			    });
				console.log(option)
			    return option;
			}
		}
	}
</script>
