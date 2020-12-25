import Vue from 'vue'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import { comType } from '@/components/props/edit/EditCompReg'
import util from "@/util/util";

const componentName = 'scaledashboard';

const cn_name = '刻度仪表盘';

const style = {
    box: {
        width: 400,
        height: 300,
        top: 100,
        left: 100
    },
    conf: {
        minVal: 0, // 最小值
        maxVal: 1000, // 最大值
        splitNumber: 8, //刻度数量
        showDetail: true, //是否显示数据
        showPointer: true, //是否显示指针
        startAngle: 240,
        endAngle: -60,
        axisTickColors: [
            { offset: 0, color: 'rgba(237, 110, 234, 1)' },
            { offset: 0.4, color: 'rgba(203, 84, 232, 1)' },
            { offset: 0.6, color: 'rgba(22,187,255,1)' },
            { offset: 1, color: 'rgba(74, 193, 244, 1)' }
        ], //刻度颜色
        axisLineColors: [
            { offset: 0, color: 'rgba(237, 110, 234, 1)' },
            { offset: 0.6, color: 'rgba(35, 139, 204, 1)' },
            { offset: 0.8, color: 'rgba(22,187,255,1)' },
            { offset: 1, color: 'rgba(74, 193, 244, 1)' }
        ], //表盘颜色配置
        axisLineWidth: 25, //表盘宽度
        axisLabelDistance: 25, //刻度文字偏移量
        overValueColor: 'rgba(20,55,112,1)', //超出数值范围的颜色
        splitColor: 'rgba(6,42,68,1)', //分割线颜色
        splitWidth: 2, //分割线宽度
    },
    confView: [{
            name: '最小刻度',
            type: comType.NUMBER,
            value: 'minVal'
        },
        {
            name: '最大刻度',
            type: comType.NUMBER,
            value: 'maxVal'
        },
        {
            name: '是否显示指针',
            type: comType.BOOLEAN,
            value: 'showPointer',
            default: true
        },
        {
            name: '刻度数量',
            type: comType.NUMBER,
            value: 'splitNumber'
        },
        {
            name: '表盘宽度',
            type: comType.NUMBER,
            value: 'axisLineWidth'
        },
        {
            name: '超出范围颜色',
            type: comType.COLORALPHA,
            value: 'overValueColor',
            default: 'rgba(20,55,112,1)'
        },
        {
            name: '分割线颜色',
            type: comType.COLORALPHA,
            value: 'splitColor',
            default: 'rgba(6,42,68,1)'
        },
        {
            name: '分割线宽度',
            type: comType.NUMBER,
            value: 'splitWidth',
            step: 1,
            default: 2
        },
        {
            name: '刻度文字偏移量',
            type: comType.NUMBER,
            value: 'axisLabelDistance'
        },
        {
            name: '刻度渐变色配置',
            type: comType.INLINEARRAY,
            addOrDel: true,
            value: 'axisTickColors',
            children: [{
                    name: '偏移',
                    type: comType.NUMBER,
                    value: 'offset',
                    default: 0,
                    step: 0.1,
                    min: 0,
                    max: 1
                },
                {
                    name: '颜色',
                    type: comType.COLORALPHA,
                    value: 'color',
                    default: 'rgba(255,255,255,1)'
                }
            ]
        },
        {
            name: '表盘渐变色配置',
            type: comType.INLINEARRAY,
            addOrDel: true,
            value: 'axisLineColors',
            children: [{
                    name: '偏移',
                    type: comType.NUMBER,
                    value: 'offset',
                    default: 0,
                    step: 0.1,
                    min: 0,
                    max: 1
                },
                {
                    name: '颜色',
                    type: comType.COLORALPHA,
                    value: 'color',
                    default: 'rgba(255,255,255,1)'
                }
            ]
        },
    ]
};

const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: "SingleData"
    },
    conf: {
        dimensionIndicatorRelation: [{
            dimension: {
                min: 0,
                max: 0
            },
            indicator: {
                min: 1,
                max: 1
            }
        }],
        datasetMeta: [], //元数据集
        datasetSelectedId: '', //数据集id
        xAxisIds: [], //x轴所选数据集列表
        yAxisIds: [], //y轴所选数据集列表
    },
    confView: {
        selectDataSet: {
            name: '数据集',
            value: 'datasetSelectedId',
            default: [],
            show: true
        },
        xBinding: {
            name: '仪表盘数据',
            value: 'xAxisIds',
            defalut: [],
            show: true,
        }
    }
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}
const linkage = {
    conf: {
        innerEvents: [],
        linkEvents: [],
    },
    confView: []
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./main'));
}

export default {
    componentName,
    cn_name,
    style,
    data,
    linkage,
    getStaticTemplateData,
    install
}