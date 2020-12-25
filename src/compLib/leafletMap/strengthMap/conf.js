import util from "@/util/util";
import {comType} from "@/components/props/edit/EditCompReg";
import Vue from "vue";
import {defaultStrengthOpt} from "../defaultOptConf";

const componentName = 'strengthMap';
const type = 'gisProComp';
const cn_name = '强度线图层组件';
const data = {
    datasource: {
        type: "static",
        tempCode: "strengthJson"
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
            name: '连线配置', type: comType.GROUP, value: "strengthOpt",
            children: [
                {
                    name: '线宽', type: comType.NUMBER, min: 0, max: 10, step: 0.1,
                    value: "strengthOpt lineWidth"
                },
                {
                    name: '线颜色', type: comType.COLORALPHA,
                    value: "strengthOpt strokeStyle"
                },
                {
                    name: '阴影颜色', type: comType.COLORALPHA,
                    value: "strengthOpt shadowColor"
                },
                {
                    name: '阴影大小', type: comType.NUMBER, min: 1, max: 20, step: 1,
                    value: "strengthOpt shadowBlur"
                },
            ]
        }
    ],
    conf: {
        refLayer: 'strength',
        strengthOpt: {
            ...util.deepCopy(defaultStrengthOpt),
        },
    }
}

function install() {
    // 注册组件
    Vue.component(componentName, () =>
        import('./strengthMap.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default {componentName, type, cn_name, style, data, linkage, getStaticTemplateData, install}
