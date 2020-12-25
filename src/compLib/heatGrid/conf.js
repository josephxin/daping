import Vue from 'vue'
import util from '@/util/util'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import { comType } from '@/components/props/edit/EditCompReg'
const componentName = 'heatGrid';
const cn_name = '二维热力图';
const style = {
    box: {
        width: 600,
        height: 300,
        top: 300,
        left: 300
    },
    conf: {
        backgroundColor: 'rgba(0,0,0,0)',
        colors: [],
        title: {
            isShow: true,
            title: '二维热力图', // 标题内容
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
            isShow: true, // 是否显示 true or false
            position: 'bottom', //x轴位置
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
            gridOpaque: 0.1, // 网格线透明度
            splitLineType: 'solid' // TODO 需要增加表单项
        },
        y: {
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
            isGrid: true, // 是否显示
            gridColor: '#ffffff', // 网格线颜色
            gridBold: 1, // 网格线粗细
            gridOpaque: 1, // 网格线透明度
            splitLineType: 'solid' // TODO 需要增加表单项
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
        // TODO 需要增加表单项 柱圆角 （顺时针左上，右上，右下，左下）
        topPadding: 30,
        bottomPadding: 60,
        leftPadding: 70,
        rightPadding: 0,
        data: {
            xk: 'xk',
            yk: 'yk',
            valueKey: 'value'
        },
        visualMap: {
            show: true,
            itemWidth: 20,
            itemHeight: 140,
            text: 'height,low', //文字内容
            textGap: 10, //文字与主体距离
            align: 'bottom', // 指定组件中手柄和文字的摆放位置
            orient: 'horizontal', //排布方式
            padding: '0,0,0,0', //边距
            left: 'center',
            top: 'bottom',
            right: 'auto',
            bottom: '0',
            textStyle: {
                fontSize: 12,
                color: '#fff'
            }
        }
    },
    confView: [{
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
            name: '数据项配置',
            type: comType.GROUP,
            children: [{
                    name: 'x轴key',
                    value: 'data xk',
                    type: comType.TEXT
                },
                {
                    name: 'y轴key',
                    value: 'data yk',
                    type: comType.TEXT
                },
                {
                    name: '值key',
                    value: 'data valueKey',
                    type: comType.TEXT
                },
            ]
        },
        {
            type: comType.TITLE,
            name: '标题设置',
            value: 'title'
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
            type: comType.VISUALMAP,
            name: '视觉映射',
            fold: false,
            value: 'visualMap'
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
        tempCode: 'towDimensionAndIndis',
    },
    conf: {
        dimensionIndicatorRelation: [{
            dimension: {
                min: 2,
                max: 2
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
            name: '选择数据',
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
        linkEvtTypes: [{ label: '点击事件', val: 'click' }]
    }
}


function getStaticTemplateData() {
    return util.deepCopy(data)
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./heatGrid'));
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