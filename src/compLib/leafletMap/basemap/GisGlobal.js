import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// import '@supermap/iclient-leaflet/dist/iclient-leaflet-es6.min'
import '@supermap/iclient-leaflet/dist/iclient-leaflet.min.css'
import * as esri from 'esri-leaflet/dist/esri-leaflet-debug'
import { featureService, fieldService } from "@supermap/iclient-leaflet";
import { CusTileLayer } from "./TileLayerApi";
import { Visualization } from "./Visualization";
import './custom.css'
import util from '@/util/util'

L.esri = esri
let GlobalMap = L.Evented.extend({
    initialize(dom, conf) {
        this.map = null;
        this.baseUrl = "http://10.10.50.15:6080/arcgis/rest/services/AdminArea/MapServer/";
        this.tileLayers = {};
        this.conf = conf;
        this.vectorLayers = [];
        let crs
        if (conf.resolutions !== '') {
            crs = new L.Proj.CRS(proj4(conf.epsg), {
                resolutions: conf.resolutions ? JSON.parse(conf.resolutions) : null,
                origin: conf.originX ? [conf.originY, conf.originX] : null
            });
        } else {
            crs = L.CRS[conf.epsg]
        }
        this.epsg = conf.epsg;
        let maxBounds = null;
        let c1 = L.latLng(conf.bottomLeftY, conf.bottomLeftX);
        let c2 = L.latLng(conf.topRightY, conf.topRightX);
        maxBounds = L.latLngBounds(c1, c2);
        let option = {
            crs: crs,
            attributionControl: false,
            logoControl: false,
            zoomControl: false,
            minZoom: conf.minZoom || 0,
            maxZoom: conf.maxZoom || 18,
            maxBounds: maxBounds,
            renderer: L.svg(),
            maxBoundsViscosity: 1.0
        };
        this.map = L.map(dom, option);
        this.setView(conf);
        return this.map;
    },
    setView(conf) {
        this.map.invalidateSize(true)
        this.map.setView([conf.centerY, conf.centerX], conf.zoom);
    },
    processView(conf) {
        if (conf.centerX !== this.map.getCenter().lng ||
            conf.centerY !== this.map.getCenter().lat ||
            conf.zoom !== this.map.getZoom()) {
            this.setView(conf);
        }
        if (conf.maxZoom !== this.map.getMaxZoom()) {
            this.map.setMaxZoom(conf.maxZoom)
        }
        if (conf.minZoom !== this.map.getMinZoom()) {
            this.map.setMinZoom(conf.minZoom)
        }
    },
    addTileLayer(conf, options) {
        let url = conf.url;
        if (conf.source === 'tdt') {
            url = "T-TianDiTu.Normal.Map"
            options = { annotation: "T-TianDiTu.Normal.Annotation" }
        } else if (conf.source === 'google') {
            url = "T-Google.Satellite.Map"
        } else if (conf.source === 'geoqB') {
            url = "T-Geoq.Normal.PurplishBlue"
        } else if (conf.source === 'geoqG') {
            url = "T-Geoq.Normal.Gray"
        } else if (conf.source === 'geoDe') {
            url = "T-GaoDe.Normal.Map"
        } else if (conf.source === 'supermapD') {
            url = "https://iserver.supermap.io/iserver/services/map-china400/rest/maps/ChinaDark"
        }
        let res = CusTileLayer(this.map, url, options || {}, conf.tileType === 'tile')
        this.map.addLayer(res.layer);
        this.tileLayers[res.layer._leaflet_id] = res.layer
        res.layer.conf = JSON.parse(JSON.stringify(conf));
        res.layer.conf.id = res.layer._leaflet_id
        return { id: res.layer._leaflet_id, type: res.type }
    },
    addProLayer(ds, proType, options) {
        let layerBuilder = this.Visualization.proLayerSelector(proType);
        if (layerBuilder instanceof Function) {
            let data = []
            ds.forEach(l => {
                if (l.name === options.refLayer) {
                    data = l.feats;
                }
            })
            if (data && data instanceof Array && data.length > 0) {
                let layer = layerBuilder(data, options[proType + "Opt"], options)
                layer.id = util.guid()
                return layer
            }
        }
        return undefined;
    },

    queryGisData: function(url, param) {
        return new Promise(function(resolve, reject) {
            let query = L.esri.query({
                url: url
            });
            let where = param.where;
            //1 属性过滤
            if (where) {
                query.where(where);
            }
            //2 空间过滤
            let within = param.within,
                intersects = param.intersects,
                contains = param.contains,
                overlaps = param.overlaps,
                nearby = param.nearby;
            //包含
            if (within) {
                query.within(within);
            }
            //相交
            if (intersects) {
                query.intersects(intersects);
            }
            //包含
            if (contains) {
                query.contains(contains);
            }
            //搭界
            if (overlaps) {
                query.overlaps(overlaps);
            }
            //在...附近
            if (nearby) {
                query.nearby(nearby.latlng, nearby.radius);
            }
            //3 确定需要字段
            let outFields = param.outFields;
            if (outFields) {
                query.params.outFields = outFields;
            }
            // query.params._mt = new Date().getTime()
            //4 执行查询操作
            query.run(function(error, states) {
                if (error) {
                    console.error("查询地图数据：图层ID" + "时出错。");
                    resolve({ features: [] });
                } else {
                    resolve(states);
                }
            });
        });
    },
    fieldsService(url, params) {
        return new Promise(function(resolve, reject) {
            var param = new SuperMap.FieldParameters({
                datasource: params.datasource,
                dataset: params.name
            });
            fieldService(url).getFields(param, function(serviceResult) {
                if (serviceResult.type === 'processFailed' || serviceResult.hasOwnProperty('error')) {
                    resolve([]);
                    return
                }
                resolve(serviceResult.result.fieldNames)
            });
        })
    },
    queryGisDataSm(url, params) {
        return new Promise(function(resolve, reject) {
            let queryParameter = {
                name: `${params.name}@${params.datasource}`,
                attributeFilter: "1=1"
            }
            if (params.hasOwnProperty('fields')) queryParameter.fields = params.fields
            let sqlParam = new SuperMap.GetFeaturesBySQLParameters({
                queryParameter,
                fromIndex: 0,
                toIndex: 10000000,
                datasetNames: [`${params.datasource}:${params.name}`]
            });
            featureService(url).getFeaturesBySQL(sqlParam, function(serviceResult) {
                if (serviceResult.type === 'processFailed' || serviceResult.hasOwnProperty('error')) {
                    resolve({ features: [] });
                    return
                }
                resolve(serviceResult.result.features)
            });
        })
    },
    Visualization,
    featClick(that, e) {
        //let innerEvt = that.compConf.linkage.innerEvents;
        let evtList = this.compConf.linkage.linkEvents;
        for (let i = 0; i < evtList.length; i++) {
            let evtObj = evtList[i];
            if (evtObj.evtType === 'click' && evtObj.explosive) {
                let eventObj = {
                    data: e.target.properties,
                };
                this.$evtBus.emit(evtObj.evtName, eventObj);
            }
        }
    },
    clearVec() {
        for (let k = 0; k < this.vectorLayers.length; k++) {
            this.map.removeLayer(this.vectorLayers[k]);
        }
        this.vectorLayers = [];
    },
    destroyMap(map) {
        this.tileLayers = {};
        this.vectorLayers = {};
        map && map.remove();
    }
})
export default GlobalMap