import axios from "axios";


const service = axios.create({
    baseURL: '',
    timeout: 50000,
});
service.interceptors.request.use(
    (config) => {

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


function request(url, params, data, method) {
    if (method.toUpperCase() === 'GET') {
        return service.get(url, {
            params: params
        });
    } else if (method.toUpperCase() === 'POST') {
        return service.post(url, data, {
            params: params
        })
    }
}

export function getEsriServerLayer(sevObj) {
    //查询服务图层
    request(sevObj.baseUrl, {"f": 'json'}, null, 'GET').then((res) => {
        if (res.status === 200) {
            let layers = res.data.layers
            let requests = []
            for (let i = 0; i < layers.length; i++) {
                let url = sevObj.baseUrl.endsWith("/") ? sevObj.baseUrl : sevObj.baseUrl + "/";
                requests.push(request(url + layers[i].id, {"f": 'json'}, null, 'GET'));
            }
            //查询图层详情
            Promise.all(requests).then(([...resp]) => {
                for (let i = 0; i < resp.length; i++) {
                    layers[i].svType = sevObj.type;
                    let geoType = resp[i].data.geometryType.replace("esriGeometry", "")
                    if (geoType === "Polygon") {
                        layers[i].type = "面"
                    } else if (geoType === "Polyline") {
                        layers[i].type = "线"
                    } else {
                        layers[i].type = "点"
                    }
                    //服务字段详情
                    layers[i].fields = [];
                    for (let j = 0; j < resp[i].data.fields.length; j++) {
                        let field = resp[i].data.fields[j]
                        if (field.name.toUpperCase().indexOf("OBJECTID") !== -1 || field.name.toUpperCase() === "SHAPE") {
                            continue;
                        }
                        field._type = field.type.replace("esriFieldType", "")
                        field.columnName = field.name;
                        field.columnDesc = field.alias;
                        field.columnDefDire = 2;
                        if (field._type !== "String" && field._type !== 'Date') {
                            field.columnDefDire = 1
                        }
                        layers[i].fields.push(field)
                    }
                }
                sevObj.layers = layers
            })
        }
    })
}

export function getSMServerLayer(sevObj) {
    let urlBase = sevObj.baseUrl.endsWith("/") ? sevObj.baseUrl : sevObj.baseUrl + "/";
    let base = urlBase + "datasources/" + sevObj.datasource + "/datasets"
    //查询服务详情
    request(base + ".json", null, null, 'GET', {withCredentials: false}).then(resp => {
        if (resp.status === 200) {
            let layers = resp.data.datasetNames
            let requests = []
            //查询图层信息
            for (let i = 0; i < layers.length; i++) {
                requests.push(request(base + "/" + layers[i] + ".json", null, null, 'GET', {withCredentials: false}));
            }
            Promise.all(requests).then(([...ds]) => {
                for (let i = 0; i < ds.length; i++) {
                    let layer = {
                        svType: sevObj.type,
                        baseUrl: urlBase,
                        fields: [],
                        datasource: sevObj.datasource,
                        index: 0,
                        name: ds[i].data.datasetInfo.name,
                        selectedFields: [],
                        serverName: sevObj.name,
                        type: null,
                        url: urlBase
                    }
                    let geoType = ds[i].data.datasetInfo.type
                    if (geoType === "REGION") {
                        layer.type = "面"
                    } else if (geoType === "LINE") {
                        layer.type = "线"
                    } else if (geoType === "POINT") {
                        layer.type = "点"
                    }
                    let fieldBase = base + "/" + layer.name + '/fields.json';
                    //查询图层字段信息
                    request(fieldBase, null, null, 'GET', {withCredentials: false}).then((fs) => {
                        let fieldRequests = []
                        for (let k = 0; k < fs.data.childUriList.length; k++) {
                            fieldRequests.push(request(fs.data.childUriList[k] + ".json", null, null, 'GET', {withCredentials: false}));
                        }
                        //查询图层字段详情
                        Promise.all(fieldRequests).then(([...fsInfo]) => {
                            for (let j = 0; j < fsInfo.length; j++) {
                                let fsd = fsInfo[j].data.fieldInfo
                                let field = {}
                                if (fsd.name.indexOf("Sm") !== -1) {
                                    continue;
                                }
                                field.alias = fsd.caption;
                                field.name = fsd.name;
                                field._type = fsd.type
                                field.columnName = fsd.name;
                                field.columnDesc = fsd.caption;
                                field.columnDefDire = 2;
                                if (field._type !== "TEXT" && field._type !== 'DATE') {
                                    field.columnDefDire = 1
                                }
                                layer.fields.push(field)
                            }
                            sevObj.layers.push(layer)
                        })
                    })
                }
            })
        }
    })
}
