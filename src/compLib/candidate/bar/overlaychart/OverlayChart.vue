<script>
	import AbstractEchartBarComp from '@/compLib/commons/echart/AbstractEchartBarComp'

	export default {
		name:'PianoBar',
		mixins:[AbstractEchartBarComp],
		methods:{
			option(){
				var rowdata=[-0.81, -0.31, -0.39, -0.7, -0.99, -0.96, -1.04, -1.08, -1.66, -2.59, -3.73, -3.62, -4.19, -4.94, -6.1, -7.14, -7.62, -7.05, -7.09, -3.84, -4.95, -5.49, -5.37, -4.62, -4.9, -5, -5.05]
				var rowdata1=[2.7, 1.22, 2.31, 3.28, 3.36, 2.47, 2.03, 1.57, 1.51, 2.41, 2.8, 2.43, 3.28, 4.19, 4.86, 5.18, 4.02, 4.84, 5.11, 2.94, 3.08, 2.59, 1.37, 1.22, 0.6, 0.99, 1.6]
				var rowdata2=[18.77, 18.84, 17.71, 17.06, 17.85, 18.73, 19.6, 20.79, 21.34, 20.91, 20.77, 19.63, 18.3, 17.47, 17.66, 18.04, 19.31, 17.51, 15.67, 14.57, 15.32, 15.95, 17.98, 18.54, 19.58, 19.44, 18.09]
				var yourdata1=[]
				var yourdata=[]
				for(var i=0;i<rowdata.length;i++){
				    yourdata.push(Math.abs(rowdata[i]))
				    yourdata1.push(rowdata1[i]+rowdata2[i])
				}
				let option = {
					backgroundColor: 'rgba(0,0,0,0)',
				    // toolbox: {
				    //     show: true,
				    //     feature: {
				    //         saveAsImage: {
				    //             pixelRatio: 5
				    //         }
				    //     }
				    // },
				    // tooltip: {
				    //     trigger: 'axis',
				    //     formatter: '{b}<br/>{a0}: {c0}%<br/>{a2}:  {c2}%<br/>{a3}:  {c3} 千亿美元'
				    // },
				    // legend: {
				    //     orient: 'vertical',
				    //     left: 'left',
				    //     data: ['资本形成率(左轴)', '储蓄率（左轴）', '净出口（右轴）']
				    // },
				    xAxis: {
				        type: 'category',
				        // name: 'Year',
				        // axisTick: {
				        //     alignWithLabel: true,
				        //     interval: 0
				        // },
				        // nameLocation:'bottom',
				        splitLine: {
				            show: false
				        },
						axisLine:{
							lineStyle:{
								color:"#ffffff"
							}
						},
				        data: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        top: '15%',
				        bottom: '3%',
				        containLabel: true
				    },
				    yAxis: [{
				            type: 'value',
				            scale: true,
				            min: 12,
				            splitLine: {
				                show: false
				            },
							axisLine:{
								lineStyle:{
									color:"#ffffff"
								}
							},
				            axisLabel: {
				                formatter: '{value}%'
				                // name: 'y'
				            },
				        },
				        {
				            type: 'value',
				            name: '千亿美元',	
							axisLine:{
								lineStyle:{
									color:"#ffffff"
								}
							},
				            splitLine: {
				                show: false
				            }

				        }
				    ],
				    series: [{
				            name: '储蓄率（左轴）',
				            type: 'line',
				            stack: '总量',
				            smooth: true,
				            data: [18.77, 18.84, 17.71, 17.06, 17.85, 18.73, 19.6, 20.79, 21.34, 20.91, 20.77, 19.63, 18.3, 17.47, 17.66, 18.04, 19.31, 17.51, 15.67, 14.57, 15.32, 15.95, 17.98, 18.54, 19.58, 19.44, 18.09],
				        },
				        {
				            name: '资本形成率（左轴）',
				            type: 'line',
				            // markArea: {
				            //     zlevel:3,
				            //     data: [[{
				            //         name: '中层',
				            //         xAxis: 2000,
				            //     }, {
				            //         xAxis: 2016,
				            //     }]]
				            // },
				            smooth: true,
				            stack: '总量',
				            areaStyle: {
				                normal: {
				                    opacity: 0.3
				                }
				            },
				            lineStyle: {
				                normal: {
				                    type: 'dashed'
				                }
				            },
				            data: [2.7, 1.22, 2.31, 3.28, 3.36, 2.47, 2.03, 1.57, 1.51, 2.41, 2.8, 2.43, 3.28, 4.19, 4.86, 5.18, 4.02, 4.84, 5.11, 2.94, 3.08, 2.59, 1.37, 1.22, 0.6, 0.99, 1.6],
				        },
				            {
				            name: '资本形成率（左轴）',
				            type: 'line',
				            // markArea: {
				            //     zlevel:3,
				            //     data: [[{
				            //         name: '中层',
				            //         xAxis: 2000,
				            //     }, {
				            //         xAxis: 2016,
				            //     }]]
				            // },
				            smooth: true,
				            // stack: '总量',
				            // areaStyle: {
				            //     normal: {
				            //         opacity: 0.3
				            //     }
				            // },
				            lineStyle: {
				                normal: {
				                    type: 'dashed'
				                }
				            },
				            data: yourdata1,
				        },

				        {
				            name: '净出口（右轴）',
				            type: 'bar',
				            itemStyle: {
				                opacity: 0.3
				            },
				            yAxisIndex: 1,
				            //         markArea:{
				            //             data:[
				            //     {
				            //         name: '两个屏幕坐标之间的标域',
				            //         x: '100',
				            //         y: '100'
				            //     }, {
				            //         x: '90%',
				            //         y: '10%'
				            //     }
				            // ]z
				            //         },
				            data: yourdata,
				        },
				        // {
				        //     name: '1/2的指数',
				        //     type: 'line',
				        //     data: [1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128, 1/256, 1/512]
				        // }
				    ]
				};

				return option;
			}
		}
	}
</script>
