<script>
	import AbstractEchartBarComp from '@/compLib/commons/echart/AbstractEchartBarComp'
	import { convertCyclicbarBarData } from '@/datamanager/DataConvertor'
	import echarts from "echarts"
	export default {
		name:'cyclicbarBar',
		mixins:[AbstractEchartBarComp],
		methods:{
			// 显示值配置
			_createSubTitle(title,name){
				if(!title.show) return ''
				let subTitle = title.start
				if(title.showName) subTitle += name
				subTitle += title.end
				return subTitle

			},
			// 显示值格式化
			_createValueText(value,style){
				if(!value) return ''
				let d = value.toString().split(".")
				if(style.showPercent){
					if(style.valueType === 'percent'){
						if(d[1] && d[1].length >= parseInt(style.valueMaxFixed)){
							return parseFloat(value).toFixed(style.valueMaxFixed) + '%'
						}
						return value + '%'
					}else{
						let v = (parseFloat(value) / parseFloat(style.maxValue)) * 100
						v = v.toString()
						if(v.indexOf(".") !== -1 &&(v.split(".")[1].length > parseInt(style.valueMaxFixed))){
							return parseFloat(v).toFixed(parseInt(style.valueMaxFixed)) + '%'
						}
						return v + '%'
					}
				}
				if(d[1] && d[1].length >= parseInt(style.valueMaxFixed)){
					return parseFloat(value).toFixed(style.valueMaxFixed)
				}
				return value
			},
			convertChartData(data){
				if (this.compConf.data.datasource.type === 'static'){
					return {
						[`${this.styleConf['labelKey']}`] : data[0][this.styleConf['labelKey']],
						[`${this.styleConf['valueKey']}`] : data[0][this.styleConf['valueKey']] 
					}
				}
				if(data && data[0] && data[0].length && data[0][0]){
					return {
						[`${this.styleConf['labelKey']}`] : data[0][0][this.styleConf['labelKey']],
						[`${this.styleConf['valueKey']}`] : data[0][0][this.styleConf['valueKey']] 
					}
				}
				return {}
				// let dataConf = _.cloneDeep(this.dataConf[this.dataConf.datasetSelectedIds[0]])
				// return convertCyclicbarBarData(data[0],dataConf,this.styleConf.labelKey,this.styleConf.valueKey)
			},
			option(){
				let style = this.styleConf;
				style = this.convertExpression(style)
				let data = this.chartData
				let dataValue = data[this.styleConf['valueKey']] || 0
				let dataName = data[this.styleConf['labelKey']] || ''
				console.log(data)
				let option = {
					backgroundColor: style.backgroundColor,
					title: {
						text : this._createValueText(dataValue,style),
						textStyle: {
							color: style.area.center.fontColor,
							fontSize: parseInt(style.area.center.fontSize)
						},
						subtext: this._createSubTitle(style.area.center.subTitle,dataName),
						subtextStyle : {
							color: style.area.center.subTitle.fontColor,
							fontSize: parseInt(style.area.center.subTitle.fontSize),
							lineHeight : parseInt(style.area.center.subTitle.lineHeight)
						},
						left: 'center',
						top: style.area.center.top
					},
					graphic: [{
						type: 'text',
						z: 100,
						left: 'center',
						top: style.area.bottom.top,
						style: {
							fill: style.area.bottom.fontColor,
							text : _.cloneDeep(style.area.bottom.texts).map(item => {return item.name}).join('\n'),
							font : `${style.area.bottom.fontSize}px Microsoft YaHei`
						}
					}],
					tooltip: {
						// formatter: function(params) {
						//     return '<span style="color: #fff;">占比：' + params.value + '%</span>';
						// }
					},
					angleAxis: {
						max: style.maxValue,
						clockwise: false, // 逆时针
						// 隐藏刻度线
						show: false
					},
					radiusAxis: {
						type: 'category',
						show: true,
						axisLabel: {
							show: false,
						},
						axisLine: {
							show: false,

						},
						axisTick: {
							show: false
						},
					},
					polar: [{
						center: ['50%', '50%'], //中心点位置
						radius: '160%' //图形大小
					}],
					series: [{
						type: 'bar',
						data: [style.valueType === 'percent' ? dataValue/100 * style.maxValue : dataValue],
						showBackground: true,
						polarIndex: 0,
						backgroundStyle: {
							color: style.circle.bottomColor,
						},
						coordinateSystem: 'polar',
						roundCap: true,
						barWidth: style.circle.width,
						itemStyle: {
							normal: {
								opacity: 1,
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: style.circle.colors[0]
								}, {
									offset: 1,
									color: style.circle.colors[style.circle.colors.length-1]
								}]),
								shadowBlur: style.circle.shadow.show ?style.circle.shadow.width : 0 ,
								shadowColor: style.circle.shadow.color,
							}
						},
					}]
				};
				return option;
			},
			//点击事件
			_clickByLinkAge(evtRevObj) {
				this.$evtBus.on(evtRevObj, (e) => {
					this._toggleCompShow(e.ctrlShow, e.switchVisible && e.switchVisible[this.compConf.compId], this.compConf.compId)
					// if (e.ctrlShow && e.switchVisible && !e.switchVisible[this.compConf.compId]) return
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
				if (!this.compConf.linkage) {
					return;
				}
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
			}
		}
	}
</script>
