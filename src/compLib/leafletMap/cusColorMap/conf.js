import util from "@/util/util";
import {comType} from "@/components/props/edit/EditCompReg";
import Vue from "vue";
import {basicClassicOpt} from "../defaultOptConf";

const componentName = 'cusColorMap';
const type = 'gisProComp';
const cn_name = '高级等级颜色图层组件';
const data = {
    datasource: {
        type: "static",
        tempCode: "vectorJson"
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
            name: '样式配置', type: comType.GROUP, value: 'optimiseColorOpt', children: [
                {
                    name: '数量字段', type: comType.TEXT, value: "optimiseColorOpt valueProperty"
                },
                {
                    name: '分段间隔',
                    type: comType.NUMBER,
                    min: 1,
                    step: 1,
                    value: "optimiseColorOpt steps",
                },
                {
                    name: '分段算法', type: comType.SELECT, value: "optimiseColorOpt mode",
                    range: [{q: '分位数'}, {e: '等距'}, {k: 'K均值'}],
                },
                {
                    name: '色带', type: comType.INLINEARRAY, value: "optimiseColorOpt _scale",
                    addOrDel: true, itemName: '色带节点<%i+1%>',
                    children: [
                        {name: '色值', type: comType.COLOR, value: "color"},
                    ]
                },
                {
                    name: '边线颜色', type: comType.COLOR, value: 'optimiseColorOpt style color'
                },
                {
                    name: '边线宽度', type: comType.NUMBER, value: 'optimiseColorOpt style weight'
                },
                {
                    name: '填充透明度',
                    type: comType.NUMBER,
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: 'optimiseColorOpt style fillOpacity'
                },
            ]
        }
    ],
    conf: {
        refLayer: null,
        optimiseColorOpt: {
            ...util.deepCopy(basicClassicOpt)
        },
    }
}

function install() {
    // 注册组件
    Vue.component(componentName, () =>
        import('./cusColorMap.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default {componentName, type, cn_name, style, data, linkage, getStaticTemplateData, install}
