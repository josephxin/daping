<template>

</template>

<script>
import AbstractGisComp from "@/compLib/commons/AbstractGisComp";

export default {
    name: "strengthMap",
    mixins: [AbstractGisComp],
    data() {
        return {
            data: [],
            layerObj: null, gisData: [],
            defaultParams: null,
        }
    },
    methods: {
        styleConfChanged() {
            this.notifyBase();
        },
        async convertChartData(data) {
            if (this.compConf.data.datasource.type === 'dataset') {
                let geoData = this._convertDatasetToGeoJson(data)
                for (let j = 0; j < geoData.length; j++) {
                    let has = false;
                    for (let i = 0; i < this.data.length; i++) {
                        if (this.data[i].name === geoData[j].name) {
                            this.data[i] = geoData[j];
                            has = true;
                        }
                    }
                    if (!has) {
                        this.data.push(geoData[j]);
                    }
                }
            } else if (this.compConf.data.datasource.type === 'gisServer') {
                this.data = await this.loadGisServer('Line');
            } else if (this.compConf.data.datasource.type === 'gisSet') {
                let dataConf = _.cloneDeep(this.compConf.data.conf.sevLayer);
                if (dataConf && dataConf.layerObj && dataConf.layerObj.length > 0) {
                    this.gisData = await this.loadGisServer('Line');
                }
                if (this.dataConf.datasetSelectedIds.length > 0) {
                    if (this.dataConf[this.dataConf.datasetSelectedIds[0]]) {
                        let propsField = this.dataConf[this.dataConf.datasetSelectedIds[0]].properties;
                        let refGisField = this.dataConf[this.dataConf.datasetSelectedIds[0]].refGisField;
                        let refSetField = this.dataConf[this.dataConf.datasetSelectedIds[0]].refSetField;
                        if (propsField && propsField.length > 0 && refGisField && refSetField) {
                            if (propsField.indexOf(refSetField) === -1) {
                                this.$message({
                                    type: 'error',
                                    message: '数据集中不包含关联字段，请重新选择'
                                })
                            }
                            this.data = this.relDataToSet(data, propsField, refGisField, refSetField)
                        }
                    }
                }
            } else {
                this.data = data;
            }
            this.notifyBase();
        },
        notifyBase() {
            if (this.gisBase) {
                this.layerObj = this.gisBase.addProLayer(this.data, 'strength', this.compConf.style);
                if (this.layerObj) {
                    this.$emit("updateProLayer", {id: this.compConf.compId, layerObj: this.layerObj})
                } else {
                    this.$emit('clearProLayer', {id: this.compConf.compId})
                }
            }
        }, linkageConfChanged() {
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
        },
        toggleShow(ctrl, show) {
            if (this.layerObj) {
                if (ctrl && show) {
                    this.$emit("updateProLayer", {id: this.compConf.compId, layerObj: this.layerObj})
                } else if (ctrl && !show) {
                    this.$emit('clearProLayer', {id: this.compConf.compId})
                }
            }
        },
        //点击事件
        _clickByLinkAge(evtRevObj) {
            this.$evtBus.on(evtRevObj, (e) => {
                this.toggleShow(e.ctrlShow, e.switchVisible && e.switchVisible[this.compConf.compId] && e.switchVisible.hasOwnProperty(this.compConf.compId))
            })
        }
    }
}
</script>
