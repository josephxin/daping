import Vue from "vue";
import { comType } from "@/components/props/edit/EditCompReg";

// 组件名称
const componentName = 'baseMap';
const type = 'baseMap';
const cn_name = '地图组件';

const style = {
    confView: [{
            name: '背景色',
            type: comType.COLORALPHA,
            value: 'bgColor'
        },
        {
            type: comType.GROUP,
            name: '地图设置',
            children: [{
                name: "地图中心坐标",
                type: comType.GROUP,
                children: [{
                    name: "x",
                    type: comType.TEXT,
                    value: 'centerX',
                }, {
                    name: "y",
                    type: comType.TEXT,
                    value: 'centerY',
                }]
            }, {
                name: '缩放级别',
                type: comType.GROUP,
                children: [{
                    name: "最大缩放级别",
                    type: comType.NUMBER,
                    value: 'maxZoom',
                    max: 18,
                    min: 1
                }, {
                    name: "最小缩放级别",
                    type: comType.NUMBER,
                    value: 'minZoom',
                    max: 18,
                    min: 1
                }, {
                    name: "初始缩放级别",
                    type: comType.NUMBER,
                    value: 'zoom',
                    max: 18,
                    min: 1
                }]
            }, {
                name: '范围',
                type: comType.GROUP,
                children: [{
                    name: "西",
                    type: comType.TEXT,
                    value: 'bottomLeftX',
                }, {
                    name: "南",
                    type: comType.TEXT,
                    value: 'bottomLeftY',
                }, {
                    name: "东",
                    type: comType.TEXT,
                    value: 'topRightX',
                }, {
                    name: "北",
                    type: comType.TEXT,
                    value: 'topRightY',
                }],
            }, {
                name: '坐标系',
                type: comType.SELECT,
                range: [{ 'EPSG4326': 'WGS84' }, { 'EPSG3857': 'Web墨卡托' }],
                value: "epsg"
            }, {
                name: '高级',
                type: comType.GROUP,
                fold: false,
                children: [{
                    name: '坐标原点X',
                    type: comType.TEXT,
                    value: "originX"
                }, {
                    name: '坐标原点Y',
                    type: comType.TEXT,
                    value: "originY"
                }, {
                    name: '分辨率',
                    type: comType.TEXTAREA,
                    value: "resolutions"
                }]
            }]
        },
        {
            name: '瓦片底图配置',
            type: comType.ARRAY,
            addOrDel: true,
            value: "tileLayers",
            itemName: '底图<%i+1%>',
            children: [{
                name: "图层源",
                type: comType.SELECT,
                default: 'geoqB',
                value: 'source',
                range: [{ 'supermapD': '超图雅黑' }, { 'geoqB': 'GeoQ深蓝' }, { 'geoqG': 'GeoQ浅灰' }, { 'tdt': "天地图" },
                    { 'geoDe': '高德' }, { 'google': '谷歌影像' }, { 'supermap': '超图iServer' }, { 'arcgis': 'ArcGIS Server' },
                    { 'osm': 'OpenStreetMap' }
                ],
            }, {
                name: "瓦片底图地址",
                type: comType.TEXT,
                default: '',
                value: 'url',
            }, {
                name: '图层类型',
                type: comType.SELECT,
                range: [{ tile: '静态瓦片' }, { dynamic: '动态瓦片' }],
                default: 'tile',
                value: "tileType"
            }, {
                name: "透明度",
                type: comType.NUMBER,
                min: 0,
                max: 1,
                step: 0.1,
                default: 1,
                value: 'opacity',
            }]
        }, {
            name: '图例配置',
            type: comType.GROUP,
            fold: false,
            value: 'legend',
            children: [{
                    name: '是否启用',
                    type: comType.BOOLEAN,
                    value: 'legend show',
                    default: false
                },
                {
                    name: '标题',
                    type: comType.BOOLEAN,
                    value: 'legend title',
                    default: false
                },
                {
                    name: "标题内容",
                    type: comType.TEXT,
                    default: '图例',
                    value: 'legend titleText',
                },
                {
                    name: '图例排布',
                    type: comType.SELECT,
                    range: [{ hor: '横排' }, { ver: '竖排' }],
                    default: 'hor',
                    value: "legend style"
                },
                {
                    name: '图例位置',
                    type: comType.SELECT,
                    range: [{ bl: '左下角' }, { tl: '左上角' }, { br: '右下角' }, { tr: '右上角' }],
                    default: 'bl',
                    value: "legend position"
                },
                {
                    name: '图例宽',
                    type: comType.NUMBER,
                    value: 'legend width',
                    min: 100
                },
                {
                    name: '图例高',
                    type: comType.NUMBER,
                    value: 'legend height',
                    min: 100
                },
                {
                    name: '图例背景色',
                    type: comType.COLORALPHA,
                    value: 'legend backgroundColor',
                },
            ]
        }
    ],
    box: {
        top: 0,
        left: 300,
        width: 600,
        height: 600
    },

    conf: {
        tileLayers: [{
            source: 'geoqB',
            url: '',
            tileType: 'tile',
            opacity: 1,
        }],
        proLayer: [],
        vecLayer: [],
        legend: {
            title: true,
            titleText: '图例',
            show: true,
            style: 'hor',
            position: 'bl',
            height: 200,
            width: 250,
            backgroundColor: "rgba(0, 0, 0, 1)"
        },
        bgColor: '',
        centerX: 117,
        centerY: 37,
        maxZoom: 18,
        minZoom: 1,
        zoom: 3,
        epsg: 'EPSG3857',
        bottomLeftX: 2,
        bottomLeftY: 0,
        topRightX: 160,
        topRightY: 61,
        originX: 400,
        originY: -400,
        resolutions: ''
    },
};

const linkage = {
    conf: {
        linkRevEvents: [],
        linkEvents: [],
    },
    confView: {
        linkEvtTypes: [{ label: '点击事件', val: 'click' }, { label: '鼠标悬浮事件', val: 'hover' }],
    }
}
const data = {
    datasource: {
        type: "gisServer",
        tempCode: ""
    },
    conf: {
        services: null,
    }
}

function install() {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./BaseMap.vue'));
}

export default { componentName, type, cn_name, style, data, linkage, install }