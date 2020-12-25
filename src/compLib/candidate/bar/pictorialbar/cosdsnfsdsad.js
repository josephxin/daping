import Vue from 'vue'
import util from '@/util/util'
import { comType } from '@/components/props/edit/EditCompReg'
import { DataSourceContext } from "@/datamanager/DataManagerContext";
const componentName = 'pictorialbar';
const cn_name = '象形柱图';
const style = {
    box: {
        width: 600,
        height: 300,
        top: 300,
        left: 300
    },
    conf: {
        stack: '0',
        seriesLayoutBy: 'column',
        type: 'pictorialBar',
        categoryX: true, //以x轴为维度
        backgroundColor: 'rgba(0,0,0,0)',
        colors: [],
        title: {
            isShow: true,
            title: '柱图', // 标题内容
            textStyleColor: '#fff', //标题颜色
            textStyleFontStyle: 'normal', // 字体风格
            textStyleFontWeight: 'normal', // 字体粗细
            textStyleFontFamily: 'Microsoft Yahei', // 字体
            textStyleFontSize: 14,
            left: 'auto',
            top: 'auto',
            right: 'auto',
            bottom: 'auto'
        },
        x: {
            position: 'bottom',
            isShow: true, // 是否显示 true or false
            // 样式
            styleColor: '#99b4d5', // 样式颜色 合法的颜色值
            styleArrow: 'none', // 箭头样式 值域待定
            styleBold: 1, // 样式粗细
            showTick: false, // TODO 需要增加表单项 是否显示坐标轴刻度。
            showLine: true, // TODO 需要增加表单项 是否显示坐标轴轴线。
            //刻度
            axisTick: false,
            axisTickLehgth: 5,
            axisTickInside: false,
            alignWithLabel: false,
            tickColor: '#99b4d5',
            tickWidth: 1,
            tickStyle: 'solid',
            tickOpacity: 1,
            // 单位
            isUnit: false, // 是否显示
            unitName: '', // 单位名称
            unitFontFamily: 'Microsoft Yahei', // 单位字体
            unitFontSize: 16, // 单位字号
            unitFontColor: 'white',

            // 轴标签
            isAxisLabel: true, // 是否显示轴标签
            wordDirection: '', // 字体方向
            labelMargin: 10,
            labelSize: 16,
            labelColor: '#ffffff',
            fontFamily: 'Microsoft Yahei', // TODO 需要增加表单项

            // 网格线
            isGrid: false, // 是否显示
            gridColor: '#ffffff', // 网格线颜色
            gridBold: 1, // 网格线粗细
            gridOpaque: 1, // 网格线透明度
            splitLineType: 'solid', // TODO 需要增加表单项
            boundaryGap: 10,
            min: 0,
            max: 0,
            showMaxMin: false
        },
        y: {
            isShow: true, // 是否显示 true or false
            position: 'left',
            offset: 0, //偏移量
            // 样式
            styleColor: '#99b4d5', // 样式颜色 合法的颜色值
            styleArrow: 'none', // 箭头样式 值域待定
            styleBold: 1, // 样式粗细
            showTick: false, // TODO 需要增加表单项 是否显示坐标轴刻度。
            showLine: true, // TODO 需要增加表单项 是否显示坐标轴轴线。
            labelFormatUnit: '', //轴数据单位
            //刻度
            axisTick: false,
            axisTickLehgth: 5,
            axisTickInside: false,
            alignWithLabel: false,
            tickColor: '#99b4d5',
            tickWidth: 1,
            tickStyle: 'solid',
            tickOpacity: 1,
            // 单位
            isUnit: false, // 是否显示
            unitName: '', // 单位名称
            nameGap: 0, // 单位与轴线的距离
            namePadding: "0,0,0,0", //名称的padding值
            unitFontFamily: 'Microsoft Yahei', // 单位字体
            unitFontSize: 16, // 单位字号
            unitFontColor: 'white',
            nameLocation: 'center', //单位位置
            nameRotate: 0, //单位的旋转角度
            // 轴标签
            isAxisLabel: true, // 是否显示轴标签
            wordDirection: '', // 字体方向
            labelMargin: 10,
            labelSize: 16,
            labelColor: '#ffffff',
            fontFamily: 'Microsoft Yahei', // TODO 需要增加表单项

            // 网格线
            isGrid: true, // 是否显示
            gridColor: '#ffffff', // 网格线颜色
            gridBold: 1, // 网格线粗细
            gridOpaque: 1, // 网格线透明度
            splitLineType: 'solid', // TODO 需要增加表单项
            boundaryGap: 0,
            min: 0,
            max: 0,
            showMaxMin: false
        },
        legend: {
            isShow: false, // 是否显示
            width: 'auto',
            type: 'plain', //图例类型
            fontColor: '#ffffff', // 字体颜色
            fontSize: 16, // 字体大小
            fontBold: '', // 字体粗细
            fontFamily: 'Microsoft Yahei', // TODO 需要增加表单项
            icon: 'rect',
            iconWidth: 25,
            iconHeight: 14,
            position: 'center-top', // 位置
            layout: 'horizontal', // 布局
            padding: "5,5,5,5", //图例内边距
            itemGap: 5, //图例间距
        },
        series: [],
        dataLabel: false,
        dataLabelSize: 24,
        dataLabelColor: 'white',
        dataPosition: 'inside',
        barGap: 0,
        barCategoryGap: '50%',
        // TODO 需要增加表单项
        barWidth: '10%',
        // TODO 需要增加表单项 柱圆角 （顺时针左上，右上，右下，左下）
        barBorderRadius: "0,0,0,0",
        topPadding: 30,
        bottomPadding: 40,
        leftPadding: 40,
        rightPadding: 0,
        // 区域缩放配置
        dataZoomShow: false,
        // markPoint 数值标记
        markPointShow: false,
        markPointData: ['max'], //标记值类型
        markPointSymbol: 'pin', //标记样式
        //markLine 标记线配置
        markLineShow: false,
        markLineData: ['average'],
        markLineSymbol: 'arrow',
        multipleY: {
            show: false,
            configs: []
        }
    },
    confView: [{
            type: comType.BOOLEAN,
            name: 'X/Y轴翻转',
            value: "categoryX",
            default: true
        },
        {
            type: comType.COLOR,
            name: '背景色',
            value: 'backgroundColor'
        },
        {
            type: comType.COLORRAMP,
            name: '柱图配色',
            value: 'colors',
            mode: 'hex'
        },
        {
            name: '圆角半径',
            type: comType.TEXT,
            value: 'barBorderRadius',
            default: '0,0,0,0'
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
                {
                    name: '图类型',
                    type: comType.SELECT,
                    value: 'type',
                    default: 'bar',
                    range: [{ 'bar': '柱图' }, { 'line': '折线' }, { 'scatter': '散点' }, { 'pictorialBar': '象形柱图' }]
                },
                {
                    name: '图例类型',
                    type: comType.SELECT,
                    value: 'lengendIcon',
                    default: 'rect',
                    range: [{ 'rect': 'rect' }, { 'circle': 'circle' }, { 'triangle': 'triangle' }, { 'diamond': 'diamond' }, { 'arrow': 'arrow' }, { 'none': 'none' }]
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
                            type: comType.TEXT,
                            value: 'barRadius',
                            default: '0,0,0,0'
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
        },
    ]
};
const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: 'dataSetSimpleOneDimensions',
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
        import ('./PictorialBar'));
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