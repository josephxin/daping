<script>
	import AbstractEchartBarComp from '@/compLib/commons/echart/AbstractEchartBarComp'
	import echarts from 'echarts'
	export default {
		name:'AnnularPie',
		mixins:[AbstractEchartBarComp],
		data(){
			return {
				dataTotal : 0
			}
		},
		methods:{
			//格式化静态数据
			_convertStaticPieData(){
				let total = 0
				let temp = {}
				let chartData = this.chartData
				let header = Object.keys(chartData[0])
				chartData.forEach(item => {
					header.forEach(h => {
						if(!temp[h]) temp[h] = 0
						temp[h] += item[h] || 0
						total += item[h] || 0
					})
				})
				let data = []
				for(let d in temp){
					data.push({
						name : d,
						value : temp[d]
					})
				}
				this.total = total
				return data
			},
			// 格式化dataset数据
			_convertDataSetPieData(){
				let total = 0
				let dataConf = this.dataConf[this.dataConf.datasetSelectedIds[0]]
				let temp = {}
				let chartData = this.chartData[0]
				let header = dataConf.xAxisIds
				chartData.forEach(item => {
					header.forEach(h => {
						if(!temp[h]) temp[h] = 0
						temp[h] += item[h] || 0
						total += item[h] || 0
					})
				})
				let data = []
				for(let d in temp){
					data.push({
						name : d,
						value : temp[d]
					})
				}
				this.total = total
				return data
			},
			// 饼图数据处理
			_createPieData(){
				let style = this.styleConf
				let placeHolderStyle = {
				    normal: {
				        label: {
				            show: false
				        },
				        labelLine: {
				            show: false
				        },
				        color: 'rgba(0, 0, 0, 0)',
				        borderColor: 'rgba(0, 0, 0, 0)',
				        borderWidth: 0
				    }
				};
				let data = []
				let pieData = []
				if(this.dataSourceConf.type === 'static'){
					pieData = this._convertStaticPieData()
				}else{
					pieData = this._convertDataSetPieData()
				}
				let series = style.series
				let color1 = []
				if(series){
					series.forEach(item => color1.push(item.color))
				}
				let color2 = this.defaultColors
				let colors = this._mergeArr(color1,color2)
				let spaceVal = (style.spaceWidth/100 + 1) * this.total * (style.spaceWidth/100) //动态计算系列间距
				pieData.forEach((item,i) => {
					data.push({
				        value: pieData[i].value,
				        name: pieData[i].name,
				        itemStyle: {
				            normal: {
								borderWidth: 5,
								color : colors[i % colors.length]
				            }
						}
				    }, {
				        value: spaceVal,
				        name: '',
						itemStyle: placeHolderStyle
				    });
				})
				return data
			},
			_getInnerData(){
				let style = this.styleConf
				let placeHolderStyle = {
				    normal: {
				        label: {
				            show: false
				        },
				        labelLine: {
				            show: false
				        },
				        color: 'rgba(0, 0, 0, 0)',
				        borderColor: 'rgba(0, 0, 0, 0)',
				        borderWidth: 0
				    }
				};
				let data = []
				let pieData = []
				if(this.dataSourceConf.type === 'static'){
					pieData = this._convertStaticPieData()
				}else{
					pieData = this._convertDataSetPieData()
				}
				let series = style.series
				let color1 = []
				if(series){
					series.forEach(item => color1.push(item.color))
				}
				let color2 = this.defaultColors
				let colors = this._mergeArr(color1,color2)
				let spaceVal = (style.spaceWidth/100 + 1) * this.total * (style.spaceWidth/100) //动态计算系列间距
				let min = pieData[0].value
				let minColumn = pieData[0].name
				pieData.forEach(item => {
					if(item.value < min){
						minColumn = item.name
						min = item.value
					}
				})
				pieData.forEach((item,i) => {
					data.push({
				        value: item.value,
				        name: item.name,
				        itemStyle: item.name === minColumn ? placeHolderStyle : {
				            normal: {
								borderWidth: 5,
								color : colors[i % colors.length]
				            }
						}
				    }, {
				        value: spaceVal,
				        name: '',
						itemStyle: placeHolderStyle
				    });
				})
				return data
			},
			option(){
				let style = this.styleConf;
            	let chartData = this.chartData;
				let seriesData = this._createPieData()
				let series = [{
				    name: '',
				    type: 'pie',
				    clockWise: false,
				    radius: [style.pieInner + '%',style.pieOuter + '%'],
				    hoverAnimation: false,
				    itemStyle: {
				        normal: {
				            label: {
				                show: true,
								position: 'outside',
								color : "#fff",
								fontSize : 18
				            },
				            labelLine: {
				                show: true
				            }
						},
					},
					labelLine : {
						show : true
					},
					data: seriesData,
				}
				];
				if(style.showInnerPie){
					let innerData = this._getInnerData()
					series.push({
						name: '',
						type: 'pie',
						clockWise: false,
						hoverAnimation : false,
						selectedMode : false,
						radius: [(style.pieInner - style.innerPieOffset - style.innerPieWidth) + '%',(style.pieInner - style.innerPieOffset) + '%'],
						itemStyle: {
							normal: {
								label: {
									show: false,
									position: 'outside',
									color: '#ddd'
								},
								labelLine: {
									show: false
								}
							}
						},
						data: innerData
					})
				}
				var option = {
					backgroundColor: 'rgba(0,0,0,0)',
					colors : this.defaultColors,
				    tooltip: {
				        show: true
				    },
				    legend: {
				        show: false
				    },
				    toolbox: {
				        show: false
					},
					grid: {
						x: parseInt(style.leftPadding),
						y: parseInt(style.topPadding),
						x2: parseInt(style.rightPadding),
						y2: parseInt(style.bottomPadding)
                	},
				    series
				}
				return option;
			},
			_click(params) {
				this.loadLinkage(0)
			},
			loadLinkage(index) {
				if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
					let evtList = this.compConf.linkage.linkEvents;
					for (let i = 0; i < evtList.length; i++) {
						let evtObj = evtList[i];
						if (evtObj.evtType === 'click' && evtObj.explosive) {
							let transData = this.compData[index];
							transData = this._convertEventOutData(transData,this.compConf.data)
							let eventObj = {
								data: transData,
							};
							this.$evtBus.emit(evtObj.evtName, eventObj);
						}
					}
				}
			},
			//点击事件
			_clickByLinkAge(evtRevObj) {
				this.$evtBus.on(evtRevObj, (e) => {
					this._toggleCompShow(e.ctrlShow, e.switchVisible && e.switchVisible[this.compConf.compId], this.compConf.compId)
					let data = []
					e.refData.forEach(item => {
						let operationType = item.cond
						let bindMapperColumn = item.to.split('$')[1]
						let value = e.data[item.from.split('$')[1]]
						data.push({
							operationType, bindMapperColumn, value
						})
					})
					let evt = {
						target: e.target,
						source: e.source,
						name: e.name,
						data,
						sourceData : e.data
					}
					let payload = {}
					payload[this.compConf.compId] = {[`${e.name}`]: evt}
					this.$store.commit('setLinkage', payload)
					this.updateCompData(false)
				})
			},
			linkageConfChanged(newVal) {
				if (!this.compConf.linkage) return
				if (this.compConf.linkage.linkRevEvents) {
					let evtRevList = this.compConf.linkage.linkRevEvents;
					for (let i = 0; i < evtRevList.length; i++) {
						let evtRevObj = evtRevList[i];
						let evtType = evtRevObj.evtName.split(":")[1]
						if (evtType === 'click') {
							this._clickByLinkAge(evtRevObj)
						}
					}

				}
				let cycleConf = this.compConf.linkage.cycleEvents;
				if (cycleConf && cycleConf.hasOwnProperty('sid')) {
					let cycleObj = _.cloneDeep(cycleConf);
					cycleObj.next = this.next;
					cycleObj.reset = this.reset;
					this.$evtBus.registerCycle(cycleObj)
				}
			}
		}
	}
</script>
