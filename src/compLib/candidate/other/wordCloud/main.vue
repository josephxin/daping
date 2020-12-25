<script>
import AbstractEchartBarComp from "@/compLib/commons/echart/AbstractEchartBarComp";

require('echarts-wordcloud');
export default {
    name: "wordCloud",
    mixins: [AbstractEchartBarComp],

    methods: {
        convertChartData(data){
            let style = this.styleConf;
            style = this.convertExpression(style)
            data = this.compConf.data.datasource.type === 'static' ? data : data[0]
            let temp = []
            if(data && data.length){
                temp = data.map(item => {
                    return {
                        name : item[style.labelKey],
                        value : item[style.valueKey]
                    }
                })
            }
            return temp
        },
        option() {
            let data = this.chartData
            let option = {
                backgroundColor: this.styleConf.backgroundColor,
                tooltip: {
                    show: true
                },
                series: [
                    {
                        name: "",
                        type: "wordCloud",
                        sizeRange: [this.styleConf.minFontSize, this.styleConf.maxFontSize],//最小文字——最大文字
                        textStyle: {
                            normal: {
                                color: function () {
                                    return (
                                        "rgb(" +
                                        [
                                            Math.round(Math.random() * 105) + 150,
                                            Math.round(Math.random() * 105) + 150,
                                            Math.round(Math.random() * 105) + 150
                                        ].join(",") +
                                        ")"
                                    );
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: "#333"
                            }
                        },
                        data:data
                    }
                ]
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
                        let transData = this.chartData[index];
                        let style = this.styleConf;
                        style = this.convertExpression(style)
                        transData[style.labelKey] = transData.name
                        transData[style.valueKey] = transData.value
                        let eventObj = {
                            data: transData
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
};
</script>
