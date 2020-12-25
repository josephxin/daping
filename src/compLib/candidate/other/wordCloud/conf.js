import Vue from 'vue'
import util from '@/util/util'
import { comType } from '@/components/props/edit/EditCompReg'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
const componentName = 'wordCloud';
const cn_name = '词云';
const style = {
    box: {
        width: 600,
        height: 500,
        top: 100,
        left: 100
    },
    conf: {
        backgroundColor: 'rgba(0,0,0,0)',
        minFontSize: 6,
        maxFontSize: 66,
        labelKey: 'name',
        valueKey: 'value'
    },
    confView: [{
            type: comType.COLORALPHA,
            name: '背景色',
            value: 'backgroundColor'
        },
        {
            type: comType.NUMBER,
            name: '最小字体',
            value: "minFontSize"
        },
        {
            type: comType.NUMBER,
            name: '最大字体',
            value: "maxFontSize"
        },
        {
            type: comType.TEXT,
            name: '显示key',
            value: 'labelKey'
        },
        {
            type: comType.TEXT,
            name: '值key',
            value: 'valueKey'
        }
    ]
}
const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: 'DataCloud',
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
    install,
    getStaticTemplateData
}