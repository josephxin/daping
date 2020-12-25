import util from "@/util/util";
import {comType} from "@/components/props/edit/EditCompReg";
import {defaultHeatOpt} from "../defaultOptConf";
import Vue from "vue";

const componentName = 'heatMap';
const type = 'gisProComp';
const cn_name = '热力图组件';
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
            name: '样式配置', type: comType.GROUP, value: 'heatmapOpt', children: [
                {
                    name: '色带', type: comType.INLINEARRAY, value: "heatmapOpt _gradient",
                    addOrDel: true, itemName: '色带节点<%i+1%>',
                    children: [
                        {name: '色值', type: comType.COLORALPHA, value: "color"},
                        {name: '数值', type: comType.TEXT, value: "val"}
                    ]
                },
                {
                    name: '热力点大小', type: comType.NUMBER, value: "heatmapOpt size", default: 20,
                }
            ]
        }
    ],
    conf: {
        refLayer: 'heat',
        countField: 'count',
        heatmapOpt: {
            ...util.deepCopy(defaultHeatOpt),
        },
    }
}

function install() {
    // 注册组件
    // 注册组件
    Vue.component(componentName, () =>
        import('./heatMap.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default {componentName, type, cn_name, style, data, linkage, getStaticTemplateData, install}
