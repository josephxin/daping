import util from "@/util/util";
import {comType} from "@/components/props/edit/EditCompReg";
import Vue from "vue";
import {defaultClassicOpt} from "../defaultOptConf";

const componentName = 'classColorMap';
const type = 'gisProComp';
const cn_name = '等级颜色图层组件';
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
    conf: {
        multiDataset: true,
    }
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
            name: '样式配置', type: comType.GROUP, value: 'classColorOpt',
            children: [
                {
                    name: '色带', type: comType.INLINEARRAY, value: "classColorOpt _gradient",
                    addOrDel: true, itemName: '色带节点<%i+1%>',
                    children: [
                        {name: '数值', type: comType.TEXT, value: "val"},
                        {name: '色值', type: comType.COLORALPHA, value: "color"},
                    ]
                },
                {
                    name: '最大值', type: comType.NUMBER, value: 'classColorOpt max'
                },
                {
                    name: '最小值', type: comType.NUMBER, value: 'classColorOpt min'
                },
            ]
        }
    ],
    conf: {
        refLayer: null,
        countField: 'count',
        classColorOpt: {
            ...util.deepCopy(defaultClassicOpt)
        },
    }
}

function install() {
    // 注册组件
    Vue.component(componentName, () =>
        import('./classColorMap.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default {componentName, type, cn_name, style, data, linkage, getStaticTemplateData, install}
