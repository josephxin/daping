import Vue from 'vue'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import { comType } from '@/components/props/edit/EditCompReg'
import util from "@/util/util";
const componentName = 'annularpie';
const cn_name = '环状饼图';
const style = {
    box: {
        width: 600,
        height: 500,
        top: 300,
        left: 300
    },
    conf: {
        title: {
            isShow: true,
            title: '环状饼图', // 标题内容
            textStyleColor: '#fff', //标题颜色
            textStyleFontStyle: 'normal', // 字体风格
            textStyleFontWeight: 'normal', // 字体粗细
            textStyleFontFamily: 'Microsoft Yahei', // 字体
            textStyleFontSize: 14,
            left: 'auto',
            top: 'auto',
            right: 'auto',
            bottom: 'auto',
        },
        pieInner: 80, //饼图内圆距圆心距离
        pieOuter: 90, //饼图外圆距圆心距离
        spaceWidth: 0, //饼图各块之间的距离
        showInnerPie: true, // 是否显示内圆
        innerPieWidth: 5, //内圆宽度
        innerPieOffset: 10, //内圆与外圆距离
        topPadding: 30,
        bottomPadding: 40,
        leftPadding: 40,
        rightPadding: 0,
        series: [], //系列配置
    },
    confView: [{
            type: comType.GROUP,
            name: '基本配置',
            children: [{
                    name: '饼图内圆半径',
                    type: comType.NUMBER,
                    value: 'pieInner'
                },
                {
                    name: '饼图外圆半径',
                    type: comType.NUMBER,
                    value: 'pieOuter'
                },
                {
                    name: '饼图系列间距',
                    type: comType.NUMBER,
                    value: 'spaceWidth'
                }
            ]
        },
        {
            type: comType.GROUP,
            name: '装饰内环配置',
            show: true,
            showName: '显示',
            value: 'showInnerPie',
            children: [{
                    name: '内环宽度',
                    type: comType.NUMBER,
                    value: 'innerPieWidth'
                },
                {
                    name: '装饰距圆的距离',
                    type: comType.NUMBER,
                    value: 'innerPieOffset'
                }
            ]
        },
        {
            name: '系列配置',
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
                    default: '#fff'
                },
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
        },

    ]
};
const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: 'DataSetOnlyIndicator',
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
        ],
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
            name: '饼图数据',
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
            enable: false,
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
        import ('./annularPie'));
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