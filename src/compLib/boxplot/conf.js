import Vue from 'vue'
import util from '@/util/util'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import { comType } from '@/components/props/edit/EditCompReg'
const componentName = 'boxplot';
const cn_name = '盒须图';
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
            title: '盒须图', // 标题内容
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
            splitLineType: 'solid', // TODO 需要增加表单项
            splitArea: {
                show: false,
                color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
            }
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
            isGrid: false, // 是否显示
            gridColor: '#ffffff', // 网格线颜色
            gridBold: 1, // 网格线粗细
            gridOpaque: 1, // 网格线透明度
            splitLineType: 'dashed' // TODO 需要增加表单项
        },
        legend: {
            isShow: true, // 是否显示
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
        // TODO 需要增加表单项 柱圆角 （顺时针左上，右上，右下，左下）
        topPadding: 30,
        bottomPadding: 30,
        leftPadding: 70,
        rightPadding: 0,
        dataZoomShow: false,
    },
    confView: [{
            type: comType.COLOR,
            name: '背景色',
            value: 'backgroundColor'
        },
        {
            type: comType.COLORRAMP,
            name: '配色',
            value: 'colors'
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
            type: comType.LEGEND,
            name: '图例',
            value: 'legend'
        },
        {
            name: '分割区域配置',
            type: comType.GROUP,
            show: true,
            value: 'x splitArea show',
            showName: '是否显示分割区域',
            children: [{
                name: '分割区域颜色',
                type: comType.COLORRAMP,
                value: 'x splitArea color'
            }]
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
        }
    ]
};
const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: 'boxplot',
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
        import ('./boxplot'));
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