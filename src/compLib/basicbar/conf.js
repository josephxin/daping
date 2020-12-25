import Vue from 'vue'
import { comType } from '../../components/props/edit/EditCompReg'
import util from '../../util/util'
import { DataSourceContext } from '@/datamanager/DataManagerContext'

const componentName = 'basicbar'

const cn_name = '基础柱图'

const style = {
    property: {
        //property：配置窗口伸缩，echarts组件内部对应缩放，base字段是最conf外层一维字段合集，其它字段皆为conf的key
        base: [
            'dataLabelSize'
        ],
        x: [
            'styleBold',
            'axisTickLehgth',
            'unitFontSize',
            'labelSize'
        ],
        y: [
            'styleBold',
            'axisTickLehgth',
            'unitFontSize',
            'labelSize'
        ],
        legend: [
            'fontSize',
            'iconWidth',
            'iconHeight'
        ]
    },
    box: {
        width: 600,
        height: 300,
        top: 300,
        left: 300
    },
    conf: {
        backgroundColor: 'rgba(0,0,0,0)',
        x: {
            isShow: true, // 是否显示 true or false
            // 样式
            styleColor: '#99b4d5', // 样式颜色 合法的颜色值
            styleArrow: 'none', // 箭头样式 值域待定
            styleBold: 3, // 样式粗细
            showTick: false, // TODO 需要增加表单项 是否显示坐标轴刻度。
            showLine: true, // TODO 需要增加表单项 是否显示坐标轴轴线。
            position: 'bottom',
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
            gridOpaque: 0.1, // 网格线透明度
            splitLineType: 'solid' // TODO 需要增加表单项
        },
        y: {
            isShow: true, // 是否显示 true or false
            // 样式
            styleColor: '#99b4d5', // 样式颜色 合法的颜色值
            styleArrow: 'none', // 箭头样式 值域待定
            styleBold: 3, // 样式粗细
            showTick: false, // TODO 需要增加表单项 是否显示坐标轴刻度。
            showLine: true, // TODO 需要增加表单项 是否显示坐标轴轴线。
            position: 'left',
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
            isGrid: true, // 是否显示
            gridColor: '#ffffff', // 网格线颜色
            gridBold: 1, // 网格线粗细
            gridOpaque: 0.1, // 网格线透明度
            splitLineType: 'dashed' // TODO 需要增加表单项
        },
        legend: {
            isShow: true, // 是否显示
            fontColor: '#ffffff', // 字体颜色
            fontSize: 16, // 字体大小
            fontBold: '', // 字体粗细
            fontFamily: 'Microsoft Yahei', // TODO 需要增加表单项
            icon: 'rect',
            iconWidth: 25,
            iconHeight: 14,
            position: 'right-top', // 位置
            layout: 'horizontal' // 布局
        },
        series: [],

        dataLabel: false,

        dataLabelSize: 24,

        dataLabelColor: 'white',

        dataPosition: 'inside',

        barGap: 0,

        barCategoryGap: '50%',//设置barWidth后，此属性无效

        // TODO 需要增加表单项
        barWidth: '10%',

        // TODO 需要增加表单项 柱圆角 （顺时针左上，右上，右下，左下）
        barBorderRadius: [20, 20, 0, 0],

        topPadding: 10,
        bottomPadding: 10,
        leftPadding: 8,
        rightPadding: 8
    },

    confView: [{
            type: comType.COLOR,
            name: '背景色',
            value: 'backgroundColor'
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
                    name: '填充颜色',
                    type: comType.COLOR,
                    value: 'color',
                    default: 'black'
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
}

const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: 'DataTemp2D'
    },
    conf: {
        classify: 'time', // [必设项]分类
        value: 'value', // [必设项]值
        legend: 'name' // [可选项]图例代码，用以区分不同系列数据
    },

    confView: [{
            name: '分类',
            fieldName: 'classify',
            value: 'time',
            optional: false
        },
        {
            name: '值',
            fieldName: 'value',
            value: 'value',
            optional: false
        },
        {
            name: '图例',
            fieldName: 'legend',
            value: 'name',
            optional: true
        }
    ]
}

const linkage = {
    conf: {
        linkages: [],
        monitors: ['lineLegend']
    },
    confView: [
        { 'classify': '分类' },
        { 'value': '值' },
        { 'legend': '图例' }
    ]
}

const carousel = {
    conf: {
        open: false,
        interval: 1,
        parent: null,
        child: null
    },
    confView: []
}
const tooltip = {
    conf: {
        fieldNames: []
    },
    confView: []
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./BasicBar'))
}

export default {
    componentName,
    cn_name,
    style,
    data,
    linkage,
    carousel,
    tooltip,
    install,
    getStaticTemplateData
}
