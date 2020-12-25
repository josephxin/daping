<script>
import AbstractEchartComp from '@/compLib/commons/echart/AbstractEchartComp'
import { convertLadarChartData } from '@/datamanager/DataConvertor'
export default {
	name: 'singleRadar',
	mixins: [AbstractEchartComp],
	methods: {
		convertChartData() {
			let compData = _.cloneDeep(this.compData)
			if (this.compConf.data.datasource.type === 'static') {
				console.log(this.compConf)
				let datasetMeta = this.compConf.data.conf.datasetMeta
				let xAxisIds = []
				datasetMeta.forEach(item => {
					if(item.columnDefDire == 1) xAxisIds.push(item.columnName) 
				})
				return convertLadarChartData(compData,datasetMeta,xAxisIds)
			}
				// 维度指标转换
			let dataConf = this.dataConf[this.dataConf.datasetSelectedIds[0]]
			return convertLadarChartData(compData[0], dataConf.datasetMeta,dataConf.xAxisIds)
		},
		option() {
			let style = this.styleConf;
			let data = this.chartData;
			var lineStyle = {
				width: 1,
				opacity: 0.8
			};
			let series = {
				name : '雷达图',
				type : 'radar',
				data : []
			}
			for(let k in data.seriesData){
				series.data.push({
					name : k,
					value : data.seriesData[k],
				})
			}
			let colors = style.colors.length ? style.colors : this.colors
			let option = {
				color: colors,
				backgroundColor: style.backgroundColor,
				legend: {
					show: style.legend.isShow,
					data : Object.keys(data.seriesData),
					textStyle: {
						color: style.legend.fontColor,
						fontSize: style.legend.fontSize,
						fontWeight: style.legend.fontBold,
						fontFamily: style.legend.fontFamily
					},

					left: style.legend.position.split('-')[0],

					top: style.legend.position.split('-')[1],

					orient: style.legend.layout
				},
				tooltip : {},
				radar: {
					center: [style.sp, style.cz],
					radius: style.outterRadius,
					indicator: data.indicator,
					shape: 'polygon',//polygon,circle
					splitNumber: 3,
					name: {
						show: style.labelShow,
						color: style.labelColor,
						fontWeight: style.labelfontBold,
						fontSize: style.labelFontSize,
						fontFamily: style.labelFontFamily
					},
					splitLine: {
						show: style.netLinerShow,
						lineStyle: {
							color: [
								'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.1)',
								'rgba(255, 255, 255, 0.1)'
							],
							width: 3
						}
					},
					splitArea: {
						show: false
					},
					axisLine: {
						show: style.innerRadiusShow,
						lineStyle: {
							color: style.innerRadiusColor,
						}
					},
				},
				series : [series]
			};
			return option;
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
            let cycleConf = this.compConf.linkage.cycleEvents;
            if (cycleConf && cycleConf.hasOwnProperty('sid')) {
                let cycleObj = _.cloneDeep(cycleConf);
                cycleObj.next = this.next;
                cycleObj.reset = this.reset;
                this.$evtBus.registerCycle(cycleObj)
            }
        }
	},
	computed:{
		colors(){
			return this.defaultColors
		}
	}
}
</script>