import Vue from 'vue'
import util from '@/util/util'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import { comType } from '@/components/props/edit/EditCompReg'
import option from '@/config/echarts/line/option';
import { merge } from "lodash"
const componentName = 'multiYLine';
const cn_name = '双y轴折线图';
const style = {
    box: {
        width: 600,
        height: 300,
        top: 300,
        left: 300,
        lt: 50
    },
    conf: merge(option(), {
        multipleY: {
            show: true,
            configs: [{
                    position: 'left',
                    offset: 0,
                    namePadding: "0,0,0,0",
                    nameGap: 0,
                    nameLocation: 'end'
                },
                {
                    position: 'right',
                    offset: 0,
                    namePadding: "0,0,0,0",
                    nameGap: 0,
                    nameLocation: 'end'
                }
            ]
        },
        series: [{
                type: 'line',
                yAxisIndex: 0,
            },
            {
                type: 'line',
                yAxisIndex: 0
            },
            {
                type: 'line',
                yAxisIndex: 1
            },
            {
                type: 'line',
                yAxisIndex: 1
            }
        ],
        rightPadding: 60,
        leftPadding: 60
    }),
    confView: [{
            type: comType.COLORALPHA,
            name: '背景色',
            value: 'backgroundColor'
        },
        {
            type: comType.COLORRAMP,
            name: '风格配色',
            value: 'colors'
        },
        {
            type: comType.BOOLEAN,
            name: '维度在x轴',
            value: "categoryX",
            default: true
        },
        {
            name: '显示为面积图',
            type: comType.BOOLEAN,
            value: 'showArea',
            default: false
        },
        {
            name: '线平滑度（0-1）',
            type: comType.NUMBER,
            step: 0.1,
            value: 'smooth',
            detault: 0
        },
        {
            name: '线宽',
            type: comType.NUMBER,
            value: 'lineWidth',
            detault: 1
        },
        {
            name: '类型',
            type: comType.SELECT,
            value: 'stack',
            range: [{ 1: '堆叠' }, { 0: '非堆叠' }]
        },
        {
            type: comType.TITLE,
            name: '标题设置',
            value: 'title'
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
                    name: '系列值(图例名)',
                    type: comType.TEXT,
                    value: 'value',
                    default: 1
                },
                // {
                //     name: '填充颜色',
                //     type: comType.COLOR,
                //     value: 'color',
                //     default: '#03F3E4'
                // },
                {
                    name: '图类型',
                    type: comType.SELECT,
                    value: 'type',
                    default: 'line',
                    range: [{ 'bar': 'bar' }, { 'line': 'line' }, { 'scatter': 'scatter' }]
                },
                {
                    name: '堆叠轴',
                    type: comType.TEXT,
                    value: 'stack',
                    default: '',
                },
                {
                    name: 'y轴定义',
                    type: comType.SELECT,
                    value: 'yAxisIndex',
                    default: 0,
                    range: [{ 0: '第1个y轴上' }, { 1: '第2个y轴上' }, { 2: '第3个y轴上' }, { 3: '第4个y轴上' }, { 4: '第5个y轴上' }]
                },
                {
                    name: '线配置',
                    type: comType.GROUP,
                    children: [{
                            name: '显示为面积图',
                            type: comType.BOOLEAN,
                            value: 'showArea',
                            default: false
                        },
                        {
                            name: '平滑度（0-1）',
                            type: comType.NUMBER,
                            step: 0.1,
                            value: 'smooth',
                            detault: 0
                        },
                        {
                            name: '标记类型',
                            type: comType.SELECT,
                            range: [{ none: 'none' }, { emptyCircle: 'emptyCircle' }, { circle: 'circle' }, { rect: 'rect' }, { roundRect: 'roundRect' }, { triangle: 'triangle' }, { diamond: 'diamond' }, { pin: 'pin' }, { arrow: 'arrow' }],
                            value: 'symbol',
                            default: 'none'
                        },
                        {
                            name: '标记大小',
                            value: 'smoothSize',
                            type: comType.NUMBER,
                            default: 10
                        },
                        {
                            name: '线宽',
                            type: comType.NUMBER,
                            value: 'lineWidth',
                            detault: 1
                        },
                        {
                            name: '渐变色配置',
                            type: comType.ARRAY,
                            value: 'gradient',
                            addOrDel: true,
                            itemName: '渐变<%i+1%>',
                            default: [],
                            children: [{
                                    name: '偏移量',
                                    value: 'offset',
                                    type: comType.NUMBER,
                                    step: 0.1
                                },
                                {
                                    name: '色值',
                                    value: 'color',
                                    type: comType.COLORALPHA,
                                    default: 'rgba(76,60,51,1)'
                                },
                            ]
                        }
                    ]
                },
                {
                    name: '透明度',
                    type: comType.NUMBER,
                    value: 'opacity',
                    min: 0,
                    max: 1,
                    step: 0.1,
                    default: 1
                },
                {
                    name: '边框',
                    type: comType.GROUP,
                    children: [{
                            name: '圆角半径',
                            type: comType.NUMBER,
                            value: 'barRadius',
                            default: 0
                        },

                        {
                            name: '边框颜色',
                            type: comType.COLOR,
                            value: 'borderColor',
                            default: 'black'
                        },
                        {
                            name: '类型',
                            type: comType.SELECT,
                            value: 'lineType',
                            default: 'solid',
                            range: [{ 'solid': '实线' }, { 'dashed': '虚线' }, { 'dotted': '点状虚线' }]
                        },
                        {
                            name: '宽度',
                            type: comType.NUMBER,
                            value: 'lineWidth',
                            default: 1
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
                            value: 'offsetX',
                            default: 0
                        },
                        {
                            name: '垂直偏移量',
                            type: comType.NUMBER,
                            value: 'offsetY',
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
            name: '数值标记',
            type: comType.GROUP,
            show: true,
            showName: '是否显示',
            value: 'markPointShow',
            default: false,
            fold: false,
            children: [{
                    name: '显示种类',
                    type: comType.CHECKBOX,
                    value: 'markPointData',
                    default: ['max'],
                    range: [{ 'max': '最大值' }, { 'min': '最小值' }, { 'average': '平均值' }]
                },
                {
                    name: '标记类型',
                    type: comType.SELECT,
                    value: 'markPointSymbol',
                    default: 'pin',
                    range: [{ pin: '水滴' }, { arrow: '箭头' }, { roundRect: '正方形' }, { rect: '长方形' }, { circle: '圆形' }, { diamond: '棱形' }, { triangle: '三角形' }, { none: '无' }]
                }
            ]
        },
        {
            name: '标线',
            type: comType.GROUP,
            show: true,
            showName: '是否显示',
            value: 'markLineShow',
            default: false,
            fold: false,
            children: [{
                    name: '显示种类',
                    type: comType.CHECKBOX,
                    value: 'markLineData',
                    default: ['max'],
                    range: [{ 'max': '最大值' }, { 'min': '最小值' }, { 'average': '平均值' }, { median: '中位数' }]
                },
                {
                    name: '标记类型',
                    type: comType.SELECT,
                    value: 'markLineSymbol',
                    default: 'arrow',
                    range: [{ pin: '水滴' }, { arrow: '箭头' }, { roundRect: '正方形' }, { rect: '长方形' }, { circle: '圆形' }, { diamond: '棱形' }, { triangle: '三角形' }, { none: '无' }]
                }
            ]
        },
        {
            name: '高级配置',
            type: comType.GROUP,
            fold: false,
            children: [{
                name: '开启多Y轴',
                type: comType.GROUP,
                show: true,
                showName: '开启',
                value: "multipleY show",
                children: [{
                    name: '多Y轴配置',
                    type: comType.ARRAY,
                    addOrDel: true,
                    value: 'multipleY configs',
                    itemName: 'Y轴<%i+1%>配置',
                    children: [{
                            name: '轴样式',
                            type: comType.GROUP,
                            children: [{
                                    name: '位置',
                                    type: comType.SELECT,
                                    value: "position",
                                    range: [{ left: '左' }, { right: '右' }, { top: '上' }, { bottom: '下' }],
                                    default: 'left'
                                },
                                {
                                    name: '偏移量',
                                    type: comType.NUMBER,
                                    value: "offset",
                                    default: 0
                                },
                                {
                                    name: '轴数据单位',
                                    type: comType.TEXT,
                                    value: 'labelFormatUnit',
                                    default: ''
                                },
                                {
                                    name: '文字方向',
                                    type: comType.NUMBER,
                                    value: 'wordDirection',
                                    default: 0
                                        // range:[{'0':'水平'},{'90':'垂直'},{'45':'正45度'},{'-45':'负45度'}]
                                },
                            ]
                        },
                        {
                            name: '单位',
                            type: comType.GROUP,
                            children: [{
                                    name: '显示单位',
                                    type: comType.BOOLEAN,
                                    value: 'isUnit',
                                    default: false
                                },
                                {
                                    name: '单位名称',
                                    type: comType.TEXT,
                                    value: "unitName"
                                },
                                {
                                    name: '单位字体',
                                    type: comType.FONTFAMILY,
                                    value: "unitFontFamily",
                                    default: 'Microsoft Yahei'
                                },
                                {
                                    name: '单位字号',
                                    type: comType.NUMBER,
                                    value: "unitFontSize",
                                    default: 12
                                },
                                {
                                    name: '单位颜色',
                                    type: comType.COLOR,
                                    value: "unitFontColor",
                                    default: '#fff'
                                },
                                {
                                    name: '位置',
                                    type: comType.SELECT,
                                    value: "nameLocation",
                                    range: [{ start: '底' }, { middle: '中间位置(y轴在竖轴方向)' }, { center: '中间位置(y轴在横轴方向)' }, { end: '顶' }],
                                    default: 'end'
                                },
                                {
                                    name: '与轴线的距离',
                                    type: comType.NUMBER,
                                    value: "nameGap",
                                    default: 0
                                },
                                {
                                    name: '内边距',
                                    type: comType.TEXT,
                                    value: "namePadding",
                                    default: "0,0,0,0"
                                },
                                {
                                    name: '旋转角度',
                                    type: comType.NUMBER,
                                    value: "nameRotate",
                                    default: 0
                                }
                            ]
                        }
                    ]
                }]
            }]
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
        }
    ]
};
const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: 'DataSet',
        url: ''
    },
    conf: {
        dimensionIndicatorRelation: [{
                dimension: {
                    min: 0,
                    max: 'any'
                },
                indicator: {
                    min: 3,
                    max: 3
                }
            },
            {}
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
        import ('./multiYLine'));
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