import util from "@/util/util";
import {comType} from "@/components/props/edit/EditCompReg";
import Vue from "vue";
import {defaultLineOpt, defaultPointOpt, defaultTextOpt, defaultTimeOpt} from "../defaultOptConf";

const componentName = 'trackLineMap';
const type = 'gisProComp';
const cn_name = '迁徙图组件';
const data = {
    datasource: {
        type: "static",
        tempCode: "trackPointJson"
    },
    confView: {
        selectDataSet: {
            name: '数据集',
            value: 'datasetSelectedId',
            default: [],
            show: true
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
        }
    },
    conf: {}
};
const linkage = {
    conf: {
        linkRevEvents: [],
        linkEvents: [],
    },
    confView: {
        linkEvtTypes: [],
    }
}
const style = {
    confView: [
        {
            name: '关联图层', type: comType.TEXT, value: "refLayer"
        },
        {
            name: '方向字段名', type: comType.TEXT, value: "directField"
        },
        {
            name: '数量字段名', type: comType.TEXT, value: "countField"
        },
        {
            name: '点名称字段名', type: comType.TEXT, value: "nameField"
        },
        {
            name: 'to名称字段名', type: comType.TEXT, value: "toField"
        },
        {
            name: '动画配置', type: comType.GROUP, value: "trackOpt time", children: [
                {
                    name: '填充色', type: comType.COLORALPHA, value: "trackOpt time fillStyle"
                },
                {
                    name: '移动点大小', type: comType.NUMBER, min: 1, max: 10, step: 0.1,
                    value: "trackOpt time size"
                },
                {
                    name: '动画周期', type: comType.NUMBER, min: 1, max: 20, step: 1,
                    value: "trackOpt time animation duration"
                },
                {
                    name: '动画拖尾长度', type: comType.NUMBER, min: 1, max: 20, step: 1,
                    value: "trackOpt time animation trails"
                },
                {
                    name: '动画z层级', type: comType.NUMBER, min: 1, step: 1,
                    value: "trackOpt time zIndex"
                }
            ]
        },
        {
            name: '连线配置', type: comType.GROUP, value: "trackOpt line", children: [
                {
                    name: '迁徙线层级', type: comType.NUMBER, min: 1, step: 1,
                    value: "trackOpt line zIndex"
                },
                {
                    name: '线宽', type: comType.NUMBER, min: 1, max: 10, step: 1,
                    value: "trackOpt line lineWidth"
                },
                {
                    name: '线颜色', type: comType.COLORALPHA,
                    value: "trackOpt line strokeStyle"
                },
                {
                    name: '阴影颜色', type: comType.COLORALPHA,
                    value: "trackOpt line shadowColor"
                },
                {
                    name: '阴影大小', type: comType.NUMBER, min: 1, max: 20, step: 1,
                    value: "trackOpt line shadowBlur"
                }
            ]
        },
        {
            name: '文字配置', type: comType.GROUP, value: "trackOpt text", children: [
                {
                    name: '字体', type: comType.TEXT,
                    value: "trackOpt text font"
                },
                {
                    name: '文字颜色', type: comType.COLORALPHA,
                    value: "trackOpt text fillStyle"
                },
                {
                    name: '阴影颜色', type: comType.COLORALPHA,
                    value: "trackOpt text shadowColor"
                },
                {
                    name: '阴影大小', type: comType.NUMBER, min: 1, max: 20, step: 1,
                    value: "trackOpt text shadowBlur"
                },
                {
                    name: '文字z层级', type: comType.NUMBER, min: 1, step: 1,
                    value: "trackOpt text zIndex"
                },
            ]
        },
        {
            name: '点配置', type: comType.GROUP, value: "trackOpt point", children: [
                {
                    name: '点大小', type: comType.NUMBER, min: 1, max: 10, step: 0.1,
                    value: "trackOpt point size"
                },
                {
                    name: '点颜色', type: comType.COLORALPHA,
                    value: "trackOpt point fillStyle"
                },
                {
                    name: '阴影颜色', type: comType.COLORALPHA,
                    value: "trackOpt point shadowColor"
                },
                {
                    name: '阴影大小', type: comType.NUMBER, min: 1, max: 20, step: 1,
                    value: "trackOpt point shadowBlur"
                },
                {
                    name: '点z层级', type: comType.NUMBER, min: 1, step: 1,
                    value: "trackOpt point zIndex"
                },
            ]
        }
    ],
    conf: {
        refLayer: 'trackLine',
        countField: 'count',
        directField: 'direct',
        nameField: 'name',
        toField: 'toName',
        trackOpt: {
            time: util.deepCopy(defaultTimeOpt),
            line: util.deepCopy(defaultLineOpt),
            text: util.deepCopy(defaultTextOpt),
            point: util.deepCopy(defaultPointOpt)
        },
    }
}

function install() {
    // 注册组件
    Vue.component(componentName, () =>
        import('./trackLineMap.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default {componentName, type, cn_name, style, data, linkage, getStaticTemplateData, install}
