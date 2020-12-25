import { comType } from '../../../components/props/edit/EditCompReg'
import util from '../../../util/util'
import Vue from 'vue'
import store from '@/store/store'

const name = 'worldmap';
const type = 'worldmap';
const cn_name = '世界地图';
const version = 'v1.0';

// 组件名称
const componentName = 'worldMap';

const style = {
    confView: [{
            name: '背景色',
            type: comType.COLOR,
            value: 'bgColor'
        },


        {
            children: [{
                    name: '缩放大小',
                    type: comType.NUMBER,
                    value: 'scaleMap'
                },
                {
                    name: '旋转经度',
                    type: comType.NUMBER,
                    value: 'rotateY'
                },
                {
                    name: '旋转纬度',
                    type: comType.NUMBER,
                    value: 'rotateX'
                },
                {
                    name: '剪切角度',
                    type: comType.NUMBER,
                    value: 'clipAngle'
                },
                {
                    name: '陆地颜色',
                    type: comType.COLOR,
                    value: 'landColor'
                },
                {
                    name: '陆地交界颜色',
                    type: comType.COLOR,
                    value: 'borderColor'
                },
                {
                    name: '陆地边界宽度',
                    type: comType.NUMBER,
                    value: 'borderWidth'
                }
            ],
            type: comType.GROUP,
            name: '地图设置'

        },

        {
            name: '点样式',
            type: comType.GROUP,
            children: [{
                    name: '颜色',
                    type: comType.COLOR,
                    value: 'pointColor'
                },
                {
                    name: '选中颜色',
                    type: comType.COLOR,
                    value: 'selectPointColor'
                },
                {
                    name: '半径',
                    type: comType.NUMBER,
                    value: 'pointRadius'
                }
            ]
        },

        {
            name: '路径样式',
            type: comType.GROUP,
            children: [{
                    name: '颜色',
                    type: comType.COLOR,
                    value: 'pathColor'
                },
                {
                    name: '宽度',
                    type: comType.NUMBER,
                    value: 'pathWidth'
                }
            ]
        },

        {
            name: '经纬线',
            type: comType.GROUP,

            show: true,
            showName: '显示',
            value: 'isJWD',
            children: [{
                    name: '颜色',
                    type: comType.COLOR,
                    value: 'jwdColor'
                },
                {
                    name: '宽度',
                    type: comType.NUMBER,
                    value: 'jwdWidth'
                }
            ]
        }

    ],

    conf: {
        bgColor: '',
        scaleMap: 237,
        rotateX: 0,
        rotateY: -110,
        clipAngle: 179.99,

        landColor: '#0d417a',
        borderColor: '#2973b2',
        borderWidth: 0.5,

        pointColor: 'yellow',
        selectPointColor: '#ef58ae',
        pointRadius: 8,

        pathColor: '#0dd6ef',
        pathWidth: 5,

        isJWD: true,
        jwdColor: '#5e6e80',
        jwdWidth: '0.5'
    },

    box: {
        top: 300,
        left: 300,
        width: 960,
        height: 960
    }
};

const data = {
    datasource: {
        type: "static",
        tempCode: "worldMap"
    },
    confView: [{
            name: '类型',
            fieldName: 'type', // 字段名称，这个是组件暴露的标准接口属性
            value: 'type',
            optional: true
        },
        {
            name: '坐标集',
            fieldName: 'coordinates', // 字段名称，这个是组件暴露的标准接口属性
            value: 'coordinates',
            optional: true
        }
    ],
    conf: {
        type: 'type',
        coordinates: 'coordinates'
    }

};

// 联动
const linkage = {
    conf: {
        linkages: [], //事件源
        monitors: ["lineLegend"] // 事件监听
    },
    confView: [
        { "name": "点名称" }
    ]
}

// 轮播
const carousel = {
    conf: {
        open: false,
        interval: 5,
        parent: null,
        child: null
    },
    confView: []
}

function getStaticTemplateData() {
    return util.deepCopy(data);
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./main.vue'));
}

export default { name, type, cn_name, version, style, data, componentName, linkage, carousel, install, getStaticTemplateData }