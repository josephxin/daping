import util from "@/util/util";
import Vue from "vue";
import { comType } from "@/components/props/edit/EditCompReg";

const componentName = 'pointVector';
const type = 'gisVecComp';
const cn_name = '点矢量图组件';
const data = {
    datasource: {
        type: "static",
        tempCode: "pointJson"
    },
    confView: {
        selectDataSet: {
            name: '数据集',
            value: 'datasetSelectedId',
            default: [],
            show: true
        },
        layerTypeBinding: {
            name: '图层类型',
            value: 'layer',
            default: '',
            show: true,
            range: [{ name: '点', value: 'Point' }]
        },
        spatialBinding: {
            name: '空间字段',
            value: 'geometry',
            default: [],
            show: true,
            multiple: true
        },
        propsBinding: {
            name: '属性字段',
            value: 'properties',
            default: [],
            show: true,
            multiple: true
        },
        layerNameBinding: {
            name: '图层名称',
            value: 'layer',
            default: '',
            show: true,
        }
    },
    conf: {
        datasetMeta: [],
        datasetSelectedIds: [],
        sevLayer: {},
        multiDataset: false,
    }
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

function icons() {
    const req = require.context('./icons', false, /\.png$/)
    let icons = [];
    let iconPaths = req.keys()
    for (let i = 0; i < iconPaths.length; i++) {
        let path = iconPaths[i];
        let icon = {};
        let name = path.replace('.png', '').replace('\.\/', '')
        let data = require(`./icons/${name}.png`)
        icon[data] = name
        icons.push(icon)
    }
    return icons;
}

const iconImg = icons()
let pointStyle = [{
    name: '图标类型',
    type: comType.SELECT,
    value: 'iconType',
    range: [{ divIcon: '矢量' }, { imgIcon: '图片' }, { pulseIcon: '闪烁点' }],
    default: 'imgIcon'
}, {
    name: '图标',
    slotType: 'img',
    type: comType.SELECT,
    value: 'iconUrl',
    range: iconImg,
    default: Object.keys(iconImg[0])[0]
}, {
    name: 'DIV图标颜色',
    slotType: 'img',
    type: comType.COLORALPHA,
    value: 'iconColor',
}, {
    name: '点宽度',
    type: comType.NUMBER,
    value: 'pWidth',
    default: 18,
    min: 0,
}, {
    name: '点高度',
    type: comType.NUMBER,
    value: 'pHeight',
    default: 18,
    min: 0,
}, {
    name: '透明度',
    type: comType.NUMBER,
    value: 'opacity',
    step: 0.1,
    min: 0,
    max: 1,
    default: 1
}]
const style = {
    confView: [{
        name: '名称',
        type: comType.TEXT,
        value: 'name',
        default: 'default'
    }, {
        name: '启用动态关联',
        type: comType.BOOLEAN,
        value: 'dynamicRef',
        default: false
    }, {
        name: '关联属性',
        type: comType.TEXT,
        value: 'ref',
    }, {
        name: '关联方式',
        type: comType.GISCASCADE,
        value: 'refType',
        range: [{ unique: '唯一值' }, { clazz: '分类值' }, { range: '区间值' }],
        relative: {
            unique: {
                name: '唯一值配置',
                type: comType.GROUP,
                value: 'refInfo',
                children: [{
                    name: '过滤值（逗号分割）',
                    type: comType.TEXT,
                    value: 'refInfo filters',
                }, {
                    name: '样式配置',
                    type: comType.ARRAY,
                    addOrDel: true,
                    value: 'refInfo pointStyles',
                    itemName: '点样式<%i+1%>',
                    children: _.cloneDeep(pointStyle)
                }]
            },
            clazz: {
                name: '分类值配置',
                type: comType.GROUP,
                value: 'refInfo',
                children: [{
                    name: '分类项',
                    type: comType.ARRAY,
                    value: 'refInfo class',
                    addOrDel: true,
                    itemName: '分类项<%i+1%>',
                    children: [{
                        name: '类值',
                        type: comType.TEXT,
                        value: "clz"
                    }, ..._.cloneDeep(pointStyle)]
                }]
            },
            range: {
                name: '区间值配置',
                type: comType.GROUP,
                value: 'refInfo',
                children: [{
                    name: '区间项',
                    type: comType.ARRAY,
                    value: 'refInfo seg',
                    addOrDel: true,
                    itemName: '区间项<%i+1%>',
                    children: [{
                        name: '最小值',
                        type: comType.NUMBER,
                        value: "f",
                        default: 0
                    }, {
                        name: '最大值',
                        type: comType.NUMBER,
                        value: "t",
                        default: 0
                    }, ..._.cloneDeep(pointStyle)]
                }]
            },
        }
    }, {
        name: '鼠标悬浮样式',
        type: comType.GROUP,
        value: "hoverStyle",
        fold: false,
        children: [{
            name: '是否启用',
            type: comType.BOOLEAN,
            value: 'enable',
            default: false
        }, ..._.cloneDeep(pointStyle)]
    }, {
        name: '鼠标选中样式',
        type: comType.GROUP,
        value: "clickStyle",
        fold: false,
        children: [{
            name: '是否启用',
            type: comType.BOOLEAN,
            value: 'enable',
            default: false
        }, ..._.cloneDeep(pointStyle)]
    }, {
        name: 'Tooltip配置',
        type: comType.GROUP,
        value: "tooltip",
        fold: false,
        children: [{
                name: '是否启用',
                type: comType.BOOLEAN,
                value: 'tooltip enable',
                default: false
            },
            {
                name: 'Tooltip项',
                type: comType.INLINEARRAY,
                value: 'tooltip items',
                addOrDel: true,
                itemName: 'Tooltip项<%i+1%>',
                children: [{
                    name: '字段名',
                    type: comType.TEXT,
                    value: 'ref',
                }, {
                    name: '字段别名',
                    type: comType.TEXT,
                    value: 'refAlias',
                }]
            }
        ]
    }, {
        name: '启用图例',
        type: comType.BOOLEAN,
        value: 'legend',
        default: false
    }, {
        name: '是否显示图层',
        type: comType.BOOLEAN,
        value: 'defaultShowLayer',
        default: true
    }, ],
    conf: {
        legend: true,
        name: '',
        ref: '',
        dynamicRef: false,
        defaultShowLayer: true,
        refType: 'unique',
        refInfo: {
            filters: '',
            pointStyles: [],
            class: [],
            seg: [],
        },
        hoverStyle: {
            enable: false,
            iconType: 'imgIcon',
            iconUrl: '',
            iconColor: '',
            pWidth: 18,
            pHeight: 18,
            opacity: 1
        },
        clickStyle: {
            enable: false,
            iconType: 'imgIcon',
            iconUrl: '',
            iconColor: '',
            pWidth: 18,
            pHeight: 18,
            opacity: 1
        },
        tooltip: {
            enable: false,
            items: []
        }
    }
}
for (let i = 0; i < style.confView[4].children.length; i++) {
    style.confView[4].children[i].value = "hoverStyle " + style.confView[4].children[i].value
}
for (let i = 0; i < style.confView[5].children.length; i++) {
    style.confView[5].children[i].value = "clickStyle " + style.confView[5].children[i].value
}

function install() {
    Vue.component(componentName, () =>
        import ('./pointVector.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default { componentName, type, cn_name, style, data, linkage, getStaticTemplateData, install }