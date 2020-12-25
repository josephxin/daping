import Vue from 'vue'
import util from '@/util/util'
import { comType } from '@/components/props/edit/EditCompReg'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
const componentName = 'graphchart';
const cn_name = '关系图';
const style = {
    box: {
        width: 1080,
        height: 1080,
        top: 0,
        left: 300
    },
    conf: {
        backgroundColor: 'rgba(0,0,0,0)',
        minFontSize: 6,
        maxFontSize: 66,
        startNodeKey: 'startNode',
        endNodeKey: 'endNode',
        valueKey: 'value',
        nodeTypeKey: 'nodeType',
        symbolSize: 10,
        colors: [],
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
            type: comType.NUMBER,
            name: '点大小',
            value: 'symbolSize'
        },
        {
            type: comType.TEXT,
            name: '起点key',
            value: 'startNodeKey'
        },
        {
            type: comType.TEXT,
            name: '结点key',
            value: 'endNodeKey'
        },
        {
            type: comType.TEXT,
            name: '节点类型key',
            value: 'nodeTypeKey'
        },
        {
            type: comType.TEXT,
            name: '值key',
            value: 'valueKey'
        }
    ]
};
const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: 'graph',
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

function getStaticTemplateData() {
    return util.deepCopy(data)
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./GraphChart'));
}

export default {
    componentName,
    cn_name,
    style,
    linkage,
    data,
    install,
    getStaticTemplateData
}