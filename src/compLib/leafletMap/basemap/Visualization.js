import * as mapv from 'mapv'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import {
    basicClassicOpt,
    defaultClassicOpt,
    defaultClusterOpt,
    defaultLineOpt,
    defaultPointOpt,
    defaultStrengthOpt,
    defaultSymbolOpt,
    defaultTextOpt,
    defaultTimeOpt
} from "../defaultOptConf";
import 'leaflet-choropleth'
//iconPulse
L.Icon.Pulse = L.DivIcon.extend({
    options: {
        className: '',
        iconSize: [12, 12],
        fillColor: 'red',
        color: 'red',
        animate: true,
        heartbeat: 1,
    },
    initialize: function (options) {
        L.setOptions(this, options);
        // css
        let uniqueClassName = 'lpi-' + new Date().getTime() + '-' + Math.round(Math.random() * 100000);
        let before = ['background-color: ' + this.options.fillColor];
        let after = [
            'box-shadow: 0 0 6px 2px ' + this.options.color,
            'animation: pulsate ' + this.options.heartbeat + 's ease-out',
            'animation-iteration-count: infinite',
            'animation-delay: ' + (this.options.heartbeat + .1) + 's',
        ];
        if (!this.options.animate) {
            after.push('animation: none');
            after.push('box-shadow:none');
        }
        let css = [
            '.' + uniqueClassName + '{' + before.join(';') + ';}',
            '.' + uniqueClassName + ':after{' + after.join(';') + ';}',
        ].join('');
        let el = document.createElement('style');
        if (el.styleSheet) {
            el.styleSheet.cssText = css;
        } else {
            el.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(el);
        // apply css class
        this.options.className = this.options.className + ' leaflet-pulsing-icon ' + uniqueClassName;
        // initialize icon
        L.DivIcon.prototype.initialize.call(this, options);
    }
});
L.icon.pulse = function (options) {
    return new L.Icon.Pulse(options);
};
L.Marker.Pulse = L.Marker.extend({
    initialize: function (latlng, options) {
        options.icon = L.icon.pulse(options);
        L.Marker.prototype.initialize.call(this, latlng, options);
    }
});
L.marker.pulse = function (latlng, options) {
    return new L.Marker.Pulse(latlng, options);
};
export const Visualization = {
    proLayerSelector: (proType) => {
        switch (proType) {
            case"heatmap":
                return (features, heatOptions, extraConf) => {
                    return Visualization._mapVLayerBuilder(features, Visualization._heatOptionConverter(heatOptions, proType), extraConf);
                }
            case"grid":
                return (features, gridOptions, extraConf) => {
                    return Visualization._mapVLayerBuilder(features, Visualization._heatOptionConverter(gridOptions, proType), extraConf);
                }
            case"honeycomb":
                return (features, gridOptions, extraConf) => {
                    return Visualization._mapVLayerBuilder(features, Visualization._heatOptionConverter(gridOptions, proType), extraConf);
                }
            case"cluster":
                return (features, options) => {
                    let data = [];
                    features.map((feat) => {
                        data.push(L.marker(L.latLng(feat.geometry.coordinates[1], feat.geometry.coordinates[0])))
                    })
                    let clusterLayer = L.markerClusterGroup(Visualization._clusterOptionConverter(options));
                    clusterLayer.addLayers(data);
                    return clusterLayer;
                }
            case"track":
                return (features, trackOption, extraConf) => {
                    return Visualization._mapVTrackLine(features, Visualization._trackLineOptionConverter(trackOption, proType), extraConf);
                }
            case"strength":
                return (features, trackOption, extraConf) => {
                    return Visualization._mapVStrengthLine(features, Visualization._strengthLineOptionConverter(trackOption, proType), extraConf);
                }
            case"optimiseColor":
                return (features, classOption, extraConf) => {
                    return Visualization._optimiseClassifyColorLayer(features, Visualization._optimiseColorOptionConverter(classOption, proType), extraConf);
                }
            case"classColor":
                return (features, classOption, extraConf) => {
                    return Visualization._mapVClassifyColorLayer(features, Visualization._classColorOptionConverter(classOption, proType), extraConf);
                }
            case"classSymbol":
                return (features, classOption, extraConf) => {
                    return Visualization._mapVClassicSymbolLayer(features, Visualization._classSymbolColorOptionConverter(classOption, proType), extraConf);
                }
        }
    },
    _entries: (obj) => {
        let arr = {};
        for (let i = 0; i < obj.length; i++) {
            if(obj[i].val!==""&&obj[i].color!==""){
                arr = Object.assign(arr, JSON.parse(`{"${obj[i].val}":"${obj[i].color}"}`))
            }
        }
        return arr;
    },
    _heatOptionConverter(options, proType) {
        let _options = JSON.parse(JSON.stringify(options))
        _options.gradient = this._entries(options._gradient);
        _options.draw = proType
        return _options;
    },
    _clusterOptionConverter(options) {
        let _options = JSON.parse(JSON.stringify(defaultClusterOpt))
        if (options) {
            _options = Object.assign(defaultClusterOpt, options);
        }
        _options.draw = 'cluster'
        return _options;
    },
    _trackLineOptionConverter(options) {
        let _options = {
            time: JSON.parse(JSON.stringify(defaultTimeOpt)),
            line: JSON.parse(JSON.stringify(defaultLineOpt)),
            text: JSON.parse(JSON.stringify(defaultTextOpt)),
            point: JSON.parse(JSON.stringify(defaultPointOpt)),
        }
        if (options) {
            _options = Object.assign(_options, options);
        }
        return _options;
    },
    _strengthLineOptionConverter(options) {
        let _options = JSON.parse(JSON.stringify(defaultStrengthOpt))
        if (options) {
            _options = Object.assign(_options, options);
        }
        _options.draw = 'simple'
        return _options;
    },
    _optimiseColorOptionConverter(options) {
        let _options = JSON.parse(JSON.stringify(basicClassicOpt))
        if (options) {
            _options = Object.assign(_options, options);
            _options.scale = [];
            for (let i = 0; i < _options._scale.length; i++) {
                _options.scale.push(_options._scale[i].color)
            }
        }
        return _options
    },
    _classColorOptionConverter(options) {
        let _options = JSON.parse(JSON.stringify(defaultClassicOpt))
        if (options) {
            _options = Object.assign(_options, options);
        }
        _options.gradient = this._entries(options._gradient);
        return _options
    },
    _classSymbolColorOptionConverter(options) {
        let _options = JSON.parse(JSON.stringify(defaultSymbolOpt))
        if (options) {
            _options = Object.assign(_options, options);
        }
        return _options
    },
    _mapVLayerBuilder(features, _options, extraConf) {
        let countField = undefined
        if (extraConf.hasOwnProperty("countField") && features[0].properties.hasOwnProperty(extraConf['countField'])) {
            countField = extraConf['countField'];
        }
        let len = features.length;
        let data_st = [];
        for (let i = 0; i < len; i++) {
            let feat = features[i];
            if (feat.geometry.type !== 'Point') {
                return;
            }
            data_st.push({
                geometry: {
                    type: 'Point',
                    coordinates: [feat.geometry.coordinates[0], feat.geometry.coordinates[1]]
                },
                count: countField ? feat.properties[countField] : 1
            });
        }
        let dataSet = new mapv.DataSet(JSON.parse(JSON.stringify(data_st)));
        return mapv.leafletMapLayer(dataSet, _options)
    },
    _mapVTrackLine(features, _options, extraConf) {
        let lineData = [];
        let pointData = [];
        let timeData = [];
        let textData = [];
        let len = features.length;
        let toPoints = {};
        let fromPoints = {};
        for (let i = 0; i < len; i++) {
            let feat = features[i];
            let direct = feat.properties[extraConf.directField];
            if (direct === 'from') {
                fromPoints[feat.properties[extraConf.nameField]] = feat;
            } else {
                toPoints[feat.properties[extraConf.nameField]] = feat;
            }
        }
        for (let i = 0; i < len; i++) {
            let feat = features[i];
            let direct = feat.properties[extraConf.directField]
            if (direct === 'from') {
                let toPoint = toPoints[feat.properties[extraConf.toField]];
                pointData.push({geometry: feat.geometry});
                textData.push({
                    geometry: feat.geometry,
                    text: feat.properties[extraConf.nameField]
                });
                pointData.push({geometry: toPoint.geometry});
                textData.push({
                    geometry: toPoint.geometry,
                    text: toPoint.properties[extraConf.nameField]
                });
                let fromCenter = {lat: feat.geometry.coordinates[1], lng: feat.geometry.coordinates[0]};
                let toCenter = {lat: toPoint.geometry.coordinates[1], lng: toPoint.geometry.coordinates[0]}
                let curve = mapv.utilCurve.getPoints([fromCenter, toCenter]);
                for (let j = 0; j < curve.length; j++) {
                    timeData.push({
                        geometry: {
                            type: 'Point',
                            coordinates: curve[j]
                        },
                        count: 1,
                        time: j
                    });
                }
                lineData.push({
                    geometry: {
                        type: 'LineString',
                        coordinates: curve
                    },
                    count: feat.properties[extraConf.countField]
                });
            }
        }
        let textDataSet = new mapv.DataSet(JSON.parse(JSON.stringify(textData)));
        let textMapvLayer = mapv.leafletMapLayer(textDataSet, _options.text);
        let lineDataSet = new mapv.DataSet(JSON.parse(JSON.stringify(lineData)));
        let lineLayer = mapv.leafletMapLayer(lineDataSet, _options.line);
        let pointDataSet = new mapv.DataSet(JSON.parse(JSON.stringify(pointData)));
        let pointLayer = mapv.leafletMapLayer(pointDataSet, _options.point);
        let timeDataSet = new mapv.DataSet(JSON.parse(JSON.stringify(timeData)));
        let timeMapvLayer = mapv.leafletMapLayer(timeDataSet, _options.time);
        let layerGroup = L.layerGroup();
        layerGroup.addLayer(textMapvLayer);
        layerGroup.addLayer(lineLayer);
        layerGroup.addLayer(pointLayer);
        layerGroup.addLayer(timeMapvLayer);
        return layerGroup;
    },
    _mapVStrengthLine(features, _options, extraConf) {
        let len = features.length;
        let data_st = [];
        for (let i = 0; i < len; i++) {
            data_st.push({
                geometry: features[i].geometry,
                count: 100
            });
        }
        let dataSet = new mapv.DataSet(JSON.parse(JSON.stringify(data_st)));
        return mapv.leafletMapLayer(dataSet, _options);
    },
    _optimiseClassifyColorLayer: function (features, _options) {
        let data = {'type': 'FeatureCollection', 'features': features};
        return L.choropleth(data, _options);
    },
    _mapVClassicSymbolLayer: function (features, _options, extraConf) {
        _options.draw = 'bubble';
        let len = features.length;
        let data_st = [];
        for (let i = 0; i < len; i++) {
            let feat = features[i];
            if (feat.geometry.type !== 'Point') {
                return;
            }
            data_st.push({
                geometry: {
                    type: 'Point',
                    coordinates: [feat.geometry.coordinates[0], feat.geometry.coordinates[1]]
                },
                count: extraConf.countField ? feat.properties[extraConf.countField] : 1
            });
        }
        let dataSet = new mapv.DataSet(JSON.parse(JSON.stringify(data_st)));
        return mapv.leafletMapLayer(dataSet, _options);
    },
    _mapVClassifyColorLayer: function (features, _options, extraConf) {
        _options.draw = 'intensity';
        let dataSetTmp = mapv.geojson.getDataSet({'type': 'FeatureCollection', 'features': features});
        let data = dataSetTmp.get({
            filter: function (item) {
                item.count = item.hasOwnProperty(extraConf.countField) ? item[extraConf.countField] : 1;
                return true;
            }
        });
        let dataSet = new mapv.DataSet(JSON.parse(JSON.stringify(data)));
        return mapv.leafletMapLayer(dataSet, _options);
    },
}
