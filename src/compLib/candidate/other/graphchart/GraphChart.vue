<script>
	import AbstractEchartBarComp from '@/compLib/commons/echart/AbstractEchartBarComp'

	export default {
		name:'graphChart',
		mixins:[AbstractEchartBarComp],
		methods:{
			convertChartData(data){
				data = this.compConf.data.datasource.type === 'static' ? data : data[0]
				return data
			},
			_formatChartData(data){
				let style = this.styleConf;
            	style = this.convertExpression(style)
				let temp = {
					data : [],
					links : [],
					categories : []
				}
				let categories = new Set()
				data.forEach(item => {
					temp.links.push({
						source : item[style.startNodeKey],
						target : item[style.endNodeKey]
					})
					temp.data.push({
						name : item[style.endNodeKey],
						draggable : true,
						symbolSize : style.symbolSize,
						value : item[style.valueKey],
						category : item[style.nodeTypeKey]
					})
					categories.add(item[style.nodeTypeKey])
				})
				categories = Array.from(categories).map(item => {
					return {
						name : item
					}
				})
				temp.categories = categories
				return temp
			},
			option(){
				let chartData = this._formatChartData(this.chartData)
				var option = {
					backgroundColor: this.styleConf.backgroundColor,
					color : this.styleConf.colors.length ? this.styleConf.colors : this.defaultColors,
				    grid: {
				        x: 0,
				        x2: 0,
				        y: 0,
				        y2: 0
				    },
				    title: {
				        text: "",
				        subtext: "",
				        textStyle: {
				            color: "#fff",
				            fontSize: 18
				        },
				        top: "top",
				        left: "center"
				    },
				    tooltip: {},
				    legend: {
						show : this.styleConf.legend.isShow,
				    	textStyle:{
				    		color:'#ffffff'
				    	}
				    },
				    toolbox: {
				        show: false,
				        feature: {
				            dataView: {
				                show: true,
				                readOnly: true
				            },
				            restore: {
				                show: true
				            },
				            saveAsImage: {
				                show: true
				            }
				        }
				    },
				    animationDuration: 3000,
				    animationEasingUpdate: 'quinticInOut',
				    series: [{
				        name: '',
				        type: 'graph',
				        layout: 'force',
				        force: {
				            // initLayout: 'circular',
				            repulsion: 170,
				            gravity: 0.2,
				            edgeLength: 90
				        },
				        data: chartData.data,
				        links: chartData.links,
				        categories: chartData.categories,
				        focusNodeAdjacency: true,
				        roam: true,
				        label: {
				            normal: {
				                show: true,
				                position: 'top',
				                textStyle: {
				                    fontSize: 14
				                }
				            }
				        },
				        lineStyle: {
				            normal: {
				                color: 'source',
				                curveness: 0
				                //type: "solid"
				            }
				        }
				    }]
				};
				
				return option;
			}
		}
	}
</script>
