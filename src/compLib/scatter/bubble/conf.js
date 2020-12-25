import Vue from 'vue'
import util from '@/util/util'
import { comType } from '@/components/props/edit/EditCompReg'
import { DataSourceContext } from "@/datamanager/DataManagerContext";
import option from "@/config/echarts/bar/option"
import { merge } from "lodash"
const componentName = 'bubbleScatter';
const cn_name = '气泡图';
const style = {
    box: {
        width: 600,
        height: 300,
        top: 300,
        left: 300
    },
    conf: merge(option(), {
        title: {
            title: '气泡图'
        },
        y: {
            isGrid: false
        },
        tooltip: {
            axisPointer: {
                type: 'none'
            }
        },
        type: 'scatter',
        symbolSizeMax: 50,
        series: [{
                startColor: 'rgb(251, 118, 123)',
                stopColor: 'rgb(204, 46, 72)',
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                shadowOffsetX: 0
            },
            {
                startColor: 'rgb(129, 227, 238)',
                stopColor: 'rgb(25, 183, 207)',
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                shadowOffsetX: 0
            }
        ]
    }),
    confView: [
        // {
        //     type: comType.BOOLEAN,
        //     name: 'x轴为维度轴',
        //     value: "categoryX",
        //     default: true
        // },
        {
            type: comType.COLOR,
            name: '背景色',
            value: 'backgroundColor'
        },
        {
            type: comType.COLORRAMP,
            name: '配色',
            value: 'colors',
            mode: 'hex'
        },
        {
            type: comType.TITLE,
            name: '标题设置',
            value: 'title'
        },
        {
            name: '柱间距',
            type: comType.NUMBER,
            value: 'barGap'
        },
        {
            name: '柱宽度',
            type: comType.TEXT,
            value: 'barWidth'
        },
        {
            name: '分类间距',
            type: comType.TEXT,
            value: 'barCategoryGap'
        },
        {
            type: comType.GROUP,
            name: '数据标签',
            show: true,
            showName: '显示',
            value: 'dataLabel',
            children: [{
                    name: '字体大小',
                    type: comType.NUMBER,
                    value: 'dataLabelSize'
                },

                {
                    name: '颜色',
                    type: comType.COLOR,
                    value: 'dataLabelColor'
                },

                {
                    name: '位置',
                    type: comType.SELECT,
                    value: 'dataPosition',
                    range: [{ 'top': '顶部' }, { 'bottom': '底部' }, { 'left': '左边' }, { 'right': '右边' },
                        { 'inside': '中间' },
                        { 'insideTop': '内顶部' }, { 'insideBottom': '内底部' }, { 'insideLeft': '内左边' }, { 'insideRight': '内右边' },
                        { 'insideTopLeft': '内左顶部' }, { 'insideTopRight': '内右顶部' }, { 'insideBottomLeft': '内左底部' }, { 'insideBottomRight': '内右底部' }
                    ]
                }
            ]

        },
        {
            type: comType.AXIS,
            name: 'x轴',
            value: 'x'
        },
        {
            type: comType.AXIS,
            name: 'y轴',
            fold: false,
            value: 'y'
        },
        {
            type: comType.LEGEND,
            name: '图例',
            value: 'legend'
        },
        {
            name: '散点配置',
            type: comType.GROUP,
            children: [{
                name: '散点最大尺寸',
                type: comType.TEXT,
                value: 'symbolSizeMax',
                default: 50
            }]
        },
        {
            name: '散点系列配置',
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
                    name: '系列值(图例名)',
                    type: comType.TEXT,
                    value: 'value',
                    default: 1
                },
                {
                    name: '散点颜色配置',
                    type: comType.GROUP,
                    children: [{
                            name: '起始颜色',
                            type: comType.COLORALPHA,
                            value: 'startColor'
                        },
                        {
                            name: '结束颜色',
                            type: comType.COLORALPHA,
                            value: 'stopColor'
                        }
                    ]
                },
                {
                    name: '阴影',
                    type: comType.GROUP,
                    children: [{
                            name: '阴影大小',
                            type: comType.NUMBER,
                            value: 'shadowBlur',
                            default: 10
                        },
                        {
                            name: '阴影颜色',
                            type: comType.COLOR,
                            value: 'shadowColor',
                            default: 'black'
                        },
                        {
                            name: '水平偏移量',
                            type: comType.NUMBER,
                            value: 'shadowOffsetX',
                            default: 0
                        },
                        {
                            name: '垂直偏移量',
                            type: comType.NUMBER,
                            value: 'shadowOffsetY',
                            default: 0
                        }
                    ]
                }

            ]
        },
        {
            name: '区域缩放',
            type: comType.GROUP,
            show: true,
            showName: '显示区域缩放组件',
            value: 'dataZoomShow',
            children: []
        },
        {
            name: '内边距',
            type: comType.GROUP,
            children: [{
                    name: '上边距',
                    type: comType.NUMBER,
                    value: 'topPadding'
                },
                {
                    name: '下边距',
                    type: comType.NUMBER,
                    value: 'bottomPadding'
                },
                {
                    name: '左边距',
                    type: comType.NUMBER,
                    value: 'leftPadding'
                },
                {
                    name: '右边距',
                    type: comType.NUMBER,
                    value: 'rightPadding'
                }
            ]
        },
    ]
};
const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: 'bubble',
    },
    conf: {
        dimensionIndicatorRelation: [{
                dimension: {
                    min: 0,
                    max: 0
                },
                indicator: {
                    min: 1,
                    max: 'any'
                }
            },
            {
                dimension: {
                    min: 1,
                    max: 1
                },
                indicator: {
                    min: 1,
                    max: 'any'
                }
            },
            {
                dimension: {
                    min: 2,
                    max: 2
                },
                indicator: {
                    min: 1,
                    max: 1
                }
            },
        ]
    },
    confView: {
        selectDataSet: {
            name: '数据集',
            value: 'datasetSelectedId',
            default: [],
            show: true
        },

        xBinding: {
            name: 'x轴数据',
            value: 'xAxisIds',
            defalut: [],
            show: true,
        },
        yBinding: {
            name: 'y轴数据',
            value: 'yAxisIds',
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

function getStaticTemplateData() {
    return util.deepCopy(data)
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./bubbleScatter'));
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