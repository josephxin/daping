import Vue from 'vue'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import { comType } from '@/components/props/edit/EditCompReg'
import util from '@/util/util'
const componentName = 'singleRadar'

const cn_name = '单维雷达图'

const style = {
    box: {
        width: 600,
        height: 300,
        top: 300,
        left: 300
    },
    conf: {
        backgroundColor: "rgba(0,0,0,0)",
        colors: [],
        legend: {
            isShow: true, //是否显示
            fontColor: '#ffffff', // 字体颜色
            fontSize: 16, // 字体大小
            fontBold: '', // 字体粗细
            fontFamily: 'Microsoft Yahei', //TODO 需要增加表单项
            position: 'right-top', // 位置
            layout: 'horizontal' // 布局
        },
        series: [],
        labelColor: 'white',
        labelShow: true,
        labelFontSize: 16,
        labelFontFamily: 'Microsoft Yahei', //TODO 需要增加表单项
        labelFormat: '{d}%',
        labelfontBold: '', // 字体粗细
        sp: '50%',
        cz: '50%',
        innerRadiusColor: "rgba(238, 197, 102, 0.5)",
        innerRadiusShow: true,
        outterRadius: "65%",
        netLinerShow: true,
        lineBorderWidth: 1

    },
    confView: [{
            type: comType.COLOR,
            name: '背景色',
            value: "backgroundColor",
            default: '文本示例数据'
        },
        {
            type: comType.COLORRAMP,
            name: '雷达图配色',
            value: 'colors',
            mode: 'hex'
        },
        {
            type: comType.LEGEND,
            name: '图例',
            value: 'legend'
        },
        {
            name: '标签样式',
            type: comType.GROUP,
            show: true,
            value: 'labelShow',
            children: [{
                    name: '字号',
                    type: comType.NUMBER,
                    value: 'labelFontSize'
                },
                {
                    name: '字体',
                    type: comType.FONTFAMILY,
                    value: 'labelFontFamily'
                },
                {
                    name: '颜色',
                    type: comType.COLOR,
                    value: 'labelColor'
                },
                {
                    name: '粗细',
                    type: comType.FONTWEIGHT,
                    value: 'labelfontBold'
                }
            ]
        }, {
            name: '极轴',
            type: comType.GROUP,
            children: [{
                    name: '轴线',
                    type: comType.GROUP,
                    show: true,
                    value: 'innerRadiusShow',
                    children: [{
                        name: '颜色',
                        type: comType.COLOR,
                        value: 'innerRadiusColor'
                    }]
                },
                {
                    name: '水平偏移量',
                    type: comType.TEXT,
                    value: 'sp'
                },
                {
                    name: '垂直偏移量',
                    type: comType.TEXT,
                    value: 'cz'
                },
                {
                    name: '外半径',
                    type: comType.TEXT,
                    value: 'outterRadius'
                }, {
                    name: '网格线',
                    type: comType.BOOLEAN,
                    value: 'netLinerShow',
                }
            ]
        },
        {
            name: '系列',
            type: comType.ARRAY,
            addOrDel: true,
            value: 'series',
            itemName: '系列<%i+1%>',
            children: [{
                    name: '系列名',
                    type: comType.TEXT,
                    value: 'name',
                    default: '系列名称'
                },
                {
                    name: '填充颜色',
                    type: comType.COLOR,
                    value: 'color',
                    default: 'black'
                },
                {
                    name: '线条粗细',
                    type: comType.NUMBER,
                    value: 'lineBorderWidth',
                    default: 1
                },
                {
                    name: '系列值(图例名)',
                    type: comType.TEXT,
                    value: 'value',
                    default: 1
                }
            ]
        },
    ]
}
const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: "DataSetOneDimensionRecordOne"
    },
    conf: {
        dimensionIndicatorRelation: [{
            dimension: {
                min: 1,
                max: 1
            },
            indicator: {
                min: 1,
                max: 'any'
            }
        }]
    },
    confView: {
        selectDataSet: {
            name: '数据集',
            value: 'datasetSelectedId',
            default: [],
            show: true
        },
        xBinding: {
            name: '选择维度和指标',
            value: 'xAxisIds',
            defalut: [],
            show: true,
        }
    }
}

const linkage = {
    conf: {
        linkRevEvents: [],
        linkEvents: [],
        cycleEvents: {}
    },
    confView: {
        linkEvtTypes: [{ label: '点击事件', val: 'click' }],
        cycleConf: {
            enable: true,
            cycleType: [{ label: '系列', value: 'series' }]
        }
    }
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./singleRadar'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default {
    componentName,
    cn_name,
    style,
    data,
    linkage,
    install,
    getStaticTemplateData
}