import { CompState } from './CompContext.js'
import ComInterface from "@/compLib/commons/ComInterface";

export default {
    name: 'AbstractGisComp',
    mixins: [ComInterface],
    props: ['compConf', 'gisBase'],
    data: function() {
        return {}
    },
    methods: {
        convertChartData(compData) {},
        _convertDatasetToGeoJson(data) {
            let geoData = [];
            for (let i = 0; i < this.dataConf.datasetSelectedIds.length; i++) {
                let geoJsonData = {
                    name: '',
                    type: '',
                    feats: []
                };
                if (!this.dataConf[this.dataConf.datasetSelectedIds[i]]) {
                    continue;
                }
                let spatialField = this.dataConf[this.dataConf.datasetSelectedIds[i]].geometry;
                let propsField = this.dataConf[this.dataConf.datasetSelectedIds[i]].properties;
                let layerOpt = this.dataConf[this.dataConf.datasetSelectedIds[i]].layer;
                if (!layerOpt || !spatialField | !propsField) {
                    continue;
                }
                if (!layerOpt.name || !layerOpt.type) {
                    continue;
                }
                if (spatialField.length !== 1 && spatialField.length !== 2) {
                    continue;
                }
                if (spatialField.length === 2 && layerOpt.type === 'Point') {
                    geoJsonData.type = 'Point'
                    data[i].forEach(feat => {
                        geoJsonData.name = feat[layerOpt.name]
                        let feature = {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [feat[spatialField[0]], feat[spatialField[1]]]
                            },
                            properties: {}
                        }
                        propsField.forEach(prop => {
                            if (prop === 'layerName') {
                                geoJsonData.alias = feat[prop]
                            }
                            feature.properties[prop] = feat[prop]
                        })
                        geoJsonData.feats.push(feature)
                    })
                } else if (spatialField.length === 1 && layerOpt.type !== 'Point') {
                    geoJsonData.type = layerOpt.type
                    data[i].forEach(feat => {
                        geoJsonData.name = feat[layerOpt.name]
                        let feature = {
                            type: 'Feature',
                            geometry: JSON.parse(feat[spatialField[0]]),
                            properties: {}
                        }
                        propsField.forEach(prop => {
                            if (prop === 'layerName') {
                                geoJsonData.alias = feat[prop]
                            }
                            feature.properties[prop] = feat[prop]
                        })
                        geoJsonData.feats.push(feature)
                    })
                } else {
                    continue;
                }
                geoData.push(geoJsonData);
            }
            return geoData;
        },
        relDataToSet(dataset, propsField, refGisField, refSetField) {
            if (dataset && dataset.length > 0) {
                let data = [];
                for (let i = 0; i < this.gisData.length; i++) {
                    let layer = {
                        type: this.gisData[i].type,
                        index: 0,
                        datasetMeta: this.gisData[i].datasetMeta,
                        name: this.gisData[i].name,
                        feats: []
                    }
                    for (let j = 0; j < this.gisData[i].feats.length; j++) {
                        let feat = this.gisData[i].feats[j]
                        for (let k = 0; k < dataset[0].length; k++) {
                            if (feat.properties[refGisField] === dataset[0][k][refSetField]) {
                                let prop = Object.assign({}, feat.properties, dataset[0][k])
                                let linkFeat = _.cloneDeep(feat)
                                linkFeat.properties = prop;
                                layer.feats.push(linkFeat);
                            }
                        }
                    }
                    if (layer.feats.length > 0) {
                        data.push(layer)
                    }
                }
                return data;
            } else {
                return this.gisData;
            }
        },
        async loadGisServer(type) {
            let dataConf = _.cloneDeep(this.compConf.data.conf.sevLayer);
            if (dataConf.serverObj.type === 'sm') {
                return await this.loadGisServerSm(type)
            } else {
                return await this.loadGisServerEsri(type)
            }

        },
        async loadGisServerEsri(type) {
            let dataConf = _.cloneDeep(this.compConf.data.conf.sevLayer);
            if (dataConf && dataConf.layerObj.length > 0) {
                dataConf.layerObj.sort((a, b) => {
                    return a.index >= b.index ? 1 : -1;
                })
                this.defaultParams = dataConf.defaultParams;
                let requests = [];
                for (let i = 0; i < dataConf.layerObj.length; i++) {
                    let o = dataConf.layerObj[i];
                    let url = o.url;
                    let selectedFields = _.cloneDeep(o.selectedFields)
                    let params = {}
                    if (selectedFields.indexOf("*") !== -1) {
                        params.outFields = '*'
                    } else {
                        let fields = selectedFields.join(",")
                        params.outFields = fields
                    }
                    let request = this.gisBase.queryGisData(url, params)
                    requests.push(request)
                }
                return await Promise.all(requests).then(([...resp]) => {
                    let layers = [];
                    for (let i = 0; i < resp.length; i++) {
                        let layer = {
                            type: type,
                            index: dataConf.layerObj[i].index,
                            datasetMeta: [],
                            name: dataConf.layerObj[i].name,
                            feats: resp[i].features
                        }
                        for (let j = 0; j < dataConf.layerObj[i].fields.length; j++) {
                            if (dataConf.layerObj[i].selectedFields.indexOf(dataConf.layerObj[i].fields[j].name) !== -1 || dataConf.layerObj[i].selectedFields.indexOf('*') !== -1) {
                                layer.datasetMeta.push(dataConf.layerObj[i].fields[j])
                            }
                        }
                        layers.push(layer)
                    }
                    return layers;
                });
            }
            return [];
        },
        async loadGisServerSm(type) {
            let dataConf = _.cloneDeep(this.compConf.data.conf.sevLayer);
            if (dataConf && dataConf.layerObj.length > 0) {
                dataConf.layerObj.sort((a, b) => {
                    return a.index >= b.index ? 1 : -1;
                })
                this.defaultParams = dataConf.defaultParams;
                let requests = [];
                for (let i = 0; i < dataConf.layerObj.length; i++) {
                    let o = dataConf.layerObj[i];
                    let url = o.url;
                    let params = {
                        datasource: o.datasource,
                        name: o.name
                    }
                    let selectedFields = _.cloneDeep(o.selectedFields)
                    if (selectedFields.indexOf("*") === -1) {
                        params.fields = selectedFields
                    } else {
                        let originFields = await this.gisBase.fieldsService(url, params)
                        params.fields = originFields
                    }
                    let request = this.gisBase.queryGisDataSm(url, params)
                    requests.push(request)
                }
                return await Promise.all(requests).then(([...resp]) => {
                    let layers = [];
                    for (let i = 0; i < resp.length; i++) {
                        let layer = {
                            type: type,
                            index: dataConf.layerObj[i].index,
                            datasetMeta: [],
                            name: dataConf.layerObj[i].name,
                            feats: resp[i].features
                        }
                        for (let j = 0; j < dataConf.layerObj[i].fields.length; j++) {
                            if (dataConf.layerObj[i].selectedFields.indexOf(dataConf.layerObj[i].fields[j].name) !== -1 || dataConf.layerObj[i].selectedFields.indexOf('*') !== -1) {
                                layer.datasetMeta.push(dataConf.layerObj[i].fields[j])
                            }
                        }
                        layers.push(layer)
                    }
                    return layers;
                });
            }
            return [];
        }
    },
    created: function() {
        this.updateState(CompState.CREATE)
    },
    mounted: async function() {
        await this.updateChartData(this.compData)
        this.updateState(CompState.RUNNING)
            //this.$nextTick(() => {
        this.linkageConfChanged()
            //})
    },
    destroyed: function() {
        this.updateState(CompState.DESTROY)
    },

}