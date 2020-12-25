import util from "@/util/util";
import {comType} from "@/components/props/edit/EditCompReg";
import {defaultGridOpt} from "../defaultOptConf";
import Vue from "vue";

const componentName = 'combHeatMap';
const type = 'gisProComp';
const cn_name = '蜂巢热力图组件';
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
            name: '样式配置', type: comType.GROUP, value: 'honeycombOpt', children: [
                {
                    name: '填充颜色', type: comType.COLORALPHA, value: 'honeycombOpt fillStyle'
                }, {
                    name: '阴影颜色', type: comType.COLORALPHA, value: 'honeycombOpt shadowColor'
                }, {
                    name: '透明度',
                    type: comType.NUMBER,
                    value: 'honeycombOpt globalAlpha',
                    min: 0,
                    max: 1,
                    step: 0.1,
                }, {
                    name: '阴影大小', type: comType.NUMBER, value: 'honeycombOpt shadowBlur', min: 0
                },
                {
                    name: '色带', type: comType.INLINEARRAY, value: "honeycombOpt _gradient",
                    addOrDel: true, itemName: '色带节点<%i+1%>',
                    children: [
                        {name: '色值', type: comType.COLORALPHA, value: "color"},
                        {name: '数值', type: comType.TEXT, value: "val"}
                    ]
                },
                {
                    name: '蜂巢大小', type: comType.NUMBER, value: "honeycombOpt size", default: 40,
                },
                {
                    name: '标签配置', type: comType.GROUP, value: 'honeycombOpt label',
                    children: [{
                        name: '是否显示', type: comType.BOOLEAN, value: 'honeycombOpt label show',
                    }, {
                        name: '填充颜色', type: comType.COLOR, value: 'honeycombOpt label fillStyle'
                    }, {
                        name: '阴影颜色', type: comType.COLOR, value: 'honeycombOpt label shadowColor'
                    }, {
                        name: '字体', type: comType.TEXT, value: 'honeycombOpt label font'
                    }, {
                        name: '阴影大小',
                        type: comType.NUMBER,
                        value: 'honeycombOpt label shadowBlur',
                        min: 0
                    }]
                }
            ]
        },
    ],
    conf: {
        refLayer: 'heat',
        countField: 'count',
        honeycombOpt: {
            ...util.deepCopy(defaultGridOpt),
        },
    }
}

function install() {
    // 注册组件
    // 注册组件
    Vue.component(componentName, () =>
        import('./combHeatMap.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default {componentName, type, cn_name, style, data, linkage, getStaticTemplateData, install}
