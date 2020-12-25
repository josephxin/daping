import util from "@/util/util";
import {comType} from "@/components/props/edit/EditCompReg";
import Vue from "vue";

const componentName = 'clusterMap';
const type = 'gisProComp';
const cn_name = '点聚合地图组件';
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
        }, {
            name: '样式配置', type: comType.GROUP, value: 'clusterOpt', children: [
                {
                    name: "聚合点大小",
                    type: comType.NUMBER,
                    value: 'clusterOpt maxClusterRadius'
                },
                {
                    name: "分批加载",
                    type: comType.BOOLEAN,
                    value: 'clusterOpt chunkedLoading'
                },
                {
                    name: '显示聚合区域',
                    type: comType.BOOLEAN,
                    value: "clusterOpt showCoverageOnHover"
                }
            ]
        }
    ],
    conf: {
        refLayer: 'heat',
        clusterOpt: {
            maxClusterRadius: 80,
            chunkedLoading: false,
            showCoverageOnHover: true
        },
    }
}

function install() {
    // 注册组件
    Vue.component(componentName, () =>
        import('./clusterMap.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default {componentName, type, cn_name, style, data, linkage, getStaticTemplateData, install}
