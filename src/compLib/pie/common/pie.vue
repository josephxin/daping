<script>
	import AbstractEchartPieComp from '@/compLib/commons/echart/AbstractEchartPieComp'
	export default {
		name:'commonPieComp',
		mixins:[AbstractEchartPieComp],
		methods:{
			_convertChartData(data){
				let format = []
				for(let k in data){
					format.push({
						name : k,
						value : data[k]
					})
				}
				return format
			},
			//格式化显示样式
			createLabelFormat(lableShowList){
				if(!lableShowList) return ''
				let format = ''
				if(lableShowList.includes('name')){
					format += "{b}"
				}
				if(lableShowList.includes('value')){
					format += format ? "：{c}" : "{c}"
				}
				if(lableShowList.includes('percent')){
					format += "({d}%)"
				}
				return format
			},
			option(){
				let style = this.styleConf;
				style = this.convertExpression(style)
				let data = this.chartData;
				let opt = {
					type : 'pie',
					data : this._convertChartData(data[0]),
					roseType: style.roseType,
					radius : [style.pieInner + '%',style.pieOuter + '%'],
					itemStyle : {
						normal: {
							label: {
								show: true,
								position: 'outside',
								color: '#ddd',
								formatter: this.createLabelFormat(style.lableShowList),
								rich: {
									white: {
											color: '#ddd',
											align: 'center',
											padding: [5, 0]
									}
								}
							},
							labelLine: {
								show: true
							}
						}
					}
				}
				if(!style.roseShow) delete(opt.roseType)
				let colors = style.colors.length ? style.colors : this.defaultColors
				let option = {
						color:colors,
						title: {
							show: style.title.isShow,
							text: style.title.title,
							textStyle: {
								color: style.title.textStyleColor,
								fontStyle: style.title.textStyleFontStyle,
								fontWeight: style.title.textStyleFontWeight,
								fontFamily: style.title.textStyleFontFamily,
								fontSize: style.title.textStyleFontSize
							},
							left: style.title.left,
							top: style.title.top,
							right: style.title.right,
							bottom: style.title.bottom
						},
						tooltip : {
							formatter: '{b}: {c} ({d}%)'
						},
						legend: {
							show: style.legend.isShow,
							type : style.legend.type,
							width : style.legend.width,
							itemWidth: style.legend.iconWidth,
							icon: style.legend.icon,
							itemHeight: style.legend.iconHeight,
							itemGap: style.legend.itemGap,
							textStyle: {
								color: style.legend.fontColor,
								fontSize: style.legend.fontSize,
								fontWeight: style.legend.fontBold,
								fontFamily: style.legend.fontFamily,
								padding : _.cloneDeep(style.legend.padding).split(",").map(item => {return parseInt(item)})
							},
							formatter: function (name) {
								return name;
							},
							left: style.legend.position.split("-")[0],
							top: style.legend.position.split("-")[1],
							orient: style.legend.layout,
						},
						series : [opt]
					};
			  return option;
			},
			carouselExe(index) {
				if (index > 0) {
					this.myChart.dispatchAction({
						type: 'pieUnSelect',
						dataIndex: index - 1,
					})
				}
				this.myChart.dispatchAction({
					type: 'pieSelect',
					dataIndex: index,
				})
			},
			next() {
				if (this.nextIndex >= _.values(this.chartData[0]).length) {
					return -1;
				}
				this.carouselExe(this.nextIndex);
				this.nextIndex++
				if (this.nextIndex >= _.values(this.chartData[0]).length) {
					return -1;
				}
				return this.nextIndex;
			},
			reset() {
				this.nextIndex = 0;
				for (let i = 0; i < _.values(this.chartData[0]).length; i++) {
					this.myChart.dispatchAction({
						type: 'pieUnSelect',
						dataIndex: i,
					})
				}
				return this.nextIndex;
			},
			_click(params) {
				this.loadLinkage(params.dataIndex)
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
