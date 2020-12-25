import util from "@/util/util";
import {comType} from "@/components/props/edit/EditCompReg";
import Vue from "vue";
import {defaultSymbolOpt} from "../defaultOptConf";

const componentName = 'classSymbolMap';
const type = 'gisProComp';
const cn_name = '等级符号图层组件';
const data = {
    datasource: {
        type: "static",
        tempCode: "heatJson"
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
        linkEvtTypes: [{label: '点击事件', val: 'click'}, {label: '鼠标悬浮事件', val: 'hover'}],
    }
}
const style = {
    confView: [
        {
            name: '关联图层', type: comType.TEXT, value: "refLayer"
        },
        {
            name: '数量字段', type: comType.TEXT, value: "countField"
        },
        {
            name: '样式配置', type: comType.GROUP, value: 'classSymbolOpt',
            children: [
                {
                    name: '最大值',
                    type: comType.NUMBER,
                    min: 1,
                    step: 1,
                    value: "classSymbolOpt max"
                },
                {name: '填充颜色', type: comType.COLORALPHA, value: "classSymbolOpt fillStyle"},
                {name: '边线颜色', type: comType.COLORALPHA, value: "classSymbolOpt strokeStyle"},
                {name: '阴影颜色', type: comType.COLORALPHA, value: "classSymbolOpt shadowColor"},
                {
                    name: '阴影大小',
                    type: comType.NUMBER,
                    min: 1,
                    step: 1,
                    value: "classSymbolOpt shadowBlur"
                },
                {
                    name: '点最大直径',
                    type: comType.NUMBER,
                    min: 1,
                    step: 1,
                    value: "classSymbolOpt maxSize"
                },
                {
                    name: '边线宽度',
                    type: comType.NUMBER,
                    min: 1,
                    step: 1,
                    value: "classSymbolOpt lineWidth"
                }
            ]
        }
    ],
    conf: {
        refLayer: null,
        countField: 'count',
        classSymbolOpt: {
            ...util.deepCopy(defaultSymbolOpt)
        }
    }
}

function install() {
    // 注册组件
    Vue.component(componentName, () =>
        import('./classSymbolMap.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default {componentName, type, cn_name, style, data, linkage, getStaticTemplateData, install}
