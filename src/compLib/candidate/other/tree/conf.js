import Vue from 'vue'
import util from '@/util/util'
import { comType } from '@/components/props/edit/EditCompReg'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
const componentName = 'treeMap';
const cn_name = '树状图';

const style = {
    confView: [],

    box: {
        width: 1000,
        height: 500,
        top: 100,
        left: 100
    },
    conf: {
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
        nameKey: 'name',
        parentKey: 'parentName',
        backgroundColor: 'rgba(0,0,0,0)',
        layout: 'orthogonal', //布局方式
        orient: 'LR', //布局方向
        colors: [], //配色
        left: '12%',
        top: '12%',
        right: '40%',
        bottom: '12%',
        symbol: 'emptyCircle', //节点标记类型
        symbolSize: 1, //标记大小
        label: {
            show: true,
            color: "rgba(255, 255, 255, 1)",
            fontSize: 12,
            backgroundColor: "rgba(114,91,184,1)",
            lineHeight: 20,
            position: 'left',
            distance: 5,
            align: 'left',
            verticalAlign: 'middle',
            padding: '2,2,2,2'
        },
        leaves: {
            show: true,
            color: "rgba(255, 255, 255, 1)",
            fontSize: 12,
            backgroundColor: "rgba(196,78,255,1)",
            lineHeight: 20,
            position: 'right',
            distance: 5,
            align: 'left',
            verticalAlign: 'middle',
            padding: '2,2,2,2'
        },
    },
    confView: [{
            type: comType.COLORALPHA,
            name: '背景色',
            value: 'backgroundColor'
        },
        {
            type: comType.GROUP,
            name: '数据配置',
            children: [{
                    name: '节点字段',
                    type: comType.TEXT,
                    value: 'nameKey'
                },
                {
                    name: '节点父级字段',
                    type: comType.TEXT,
                    value: 'parentKey'
                }
            ]
        },
        {
            type: comType.COLORRAMP,
            name: '配色',
            value: 'colors',
            mode: 'hex'
        },
        {
            type: comType.SELECT,
            name: '布局方式',
            value: 'layout',
            range: [{ orthogonal: '正交布局' }, { radial: '径向布局' }]
        },
        {
            type: comType.SELECT,
            name: '布局方向',
            value: 'orient',
            range: [{ LR: '从左到右' }, { RL: '从右到左' }, { TB: '从上到下' }, { BT: '从下到上' }]
        },
        {
            type: comType.TEXT,
            name: '组件距左侧距离',
            value: 'left'
        },
        {
            type: comType.TEXT,
            name: '组件距右侧距离',
            value: 'right'
        },
        {
            type: comType.TEXT,
            name: '组件距上侧距离',
            value: 'top'
        },
        {
            type: comType.TEXT,
            name: '组件距下侧距离',
            value: 'bottom'
        },
        {
            type: comType.SELECT,
            name: '标记类型',
            value: 'symbol',
            range: [{ circle: 'circle' }, { rect: 'rect' }, { roundRect: 'roundRect' }, { triangle: 'triangle' }, { diamond: 'diamond' }, { pin: 'pin' }, { arrow: 'arrow' }, { none: 'none' }]
        },
        {
            type: comType.NUMBER,
            name: '标记大小',
            value: 'symbolSize'
        },
        {
            type: comType.GROUP,
            name: '文字块配置',
            showName: '是否显示文字标签',
            value: 'label show',
            fold: false,
            show: true,
            children: [{
                    name: '颜色',
                    type: comType.COLORALPHA,
                    value: 'label color'
                },
                {
                    name: '背景色',
                    type: comType.COLORALPHA,
                    value: 'label backgroundColor'
                },
                {
                    name: '大小',
                    type: comType.NUMBER,
                    value: 'label fontSize'
                },
                {
                    name: '行高',
                    type: comType.NUMBER,
                    value: 'label lineHeight'
                },
                {
                    name: '位置',
                    type: comType.SELECT,
                    value: 'label position',
                    range: [{ top: 'top' }, { left: 'left' }, { right: 'right' }, { bottom: 'bottom' }, { inside: 'inside' }, { insideLeft: 'insideLeft' }, { insideRight: 'insideRight' }, { insideTop: 'insideTop' }, { insideBottom: 'insideBottom' }, { insideTopLeft: 'insideTopLeft' }, { insideBottomLeft: 'insideBottomLeft' }, { insideTopRight: 'insideTopRight' }, { insideBottomRight: 'insideBottomRight' }],
                },
                {
                    name: '与图形元素距离',
                    type: comType.NUMBER,
                    value: 'label distance'
                },
                {
                    name: '水平对齐方式',
                    type: comType.SELECT,
                    value: 'label align',
                    range: [{ left: '左', center: '中', right: '右' }]
                },
                {
                    name: '垂直对齐方式',
                    type: comType.SELECT,
                    value: 'label verticalAlign',
                    range: [{ top: '上', middle: '中', bottom: '下' }]
                },
                {
                    name: '内边距',
                    type: comType.TEXT,
                    value: 'label padding'
                },
            ]
        },
        {
            type: comType.GROUP,
            name: '叶子节点文字块配置',
            showName: '是否显示文字标签',
            value: 'leaves show',
            show: true,
            fold: false,
            children: [{
                    name: '颜色',
                    type: comType.COLORALPHA,
                    value: 'leaves color'
                },
                {
                    name: '背景色',
                    type: comType.COLORALPHA,
                    value: 'leaves backgroundColor'
                },
                {
                    name: '大小',
                    type: comType.NUMBER,
                    value: 'leaves fontSize'
                },
                {
                    name: '行高',
                    type: comType.NUMBER,
                    value: 'leaves lineHeight'
                },
                {
                    name: '位置',
                    type: comType.SELECT,
                    value: 'leaves position',
                    range: [{ top: 'top' }, { left: 'left' }, { right: 'right' }, { bottom: 'bottom' }, { inside: 'inside' }, { insideLeft: 'insideLeft' }, { insideRight: 'insideRight' }, { insideTop: 'insideTop' }, { insideBottom: 'insideBottom' }, { insideTopLeft: 'insideTopLeft' }, { insideBottomLeft: 'insideBottomLeft' }, { insideTopRight: 'insideTopRight' }, { insideBottomRight: 'insideBottomRight' }],
                },
                {
                    name: '与图形元素距离',
                    type: comType.NUMBER,
                    value: 'leaves distance'
                },
                {
                    name: '水平对齐方式',
                    type: comType.SELECT,
                    value: 'leaves align',
                    range: [{ left: '左', center: '中', right: '右' }]
                },
                {
                    name: '垂直对齐方式',
                    type: comType.SELECT,
                    value: 'leaves verticalAlign',
                    range: [{ top: '上', middle: '中', bottom: '下' }]
                },
                {
                    name: '内边距',
                    type: comType.TEXT,
                    value: 'leaves padding'
                },
            ]
        },
        {
            type: comType.LEGEND,
            name: '图例',
            value: 'legend'
        }
    ]
};

const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: 'tree',
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
            name: '选择数据字段',
            value: 'xAxisIds',
            defalut: [],
            show: true
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

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./main'));
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
    getStaticTemplateData,
    install
}