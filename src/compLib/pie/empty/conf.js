import Vue from 'vue'
import util from '@/util/util'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import { comType } from '@/components/props/edit/EditCompReg'
import option from "@/config/echarts/pie/option"
import { merge } from "lodash"
const componentName = 'emptyInnerPie';
const cn_name = '空心饼图';
const style = {
    box: {
        width: 600,
        height: 500,
        top: 300,
        left: 300
    },
    conf: merge(option(), {
        pieInner: 20
    }),
    confView: [{
            type: comType.COLOR,
            name: '背景色',
            value: 'backgroundColor'
        },
        {
            type: comType.COLORRAMP,
            name: '饼图配色',
            value: 'colors'
        },
        {
            type: comType.BOOLEAN,
            name: '是否南丁格尔图',
            value: "roseShow",
            default: false
        },
        {
            name: '南丁格尔图风格配置',
            type: comType.SELECT,
            value: 'roseType',
            range: [{ 'radius': '扇区圆心角展现数据的百分比，半径展现数据的大小' }, { 'area': '扇区圆心角相同，仅通过半径展现数据大小' }]
        },
        {
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
            type: comType.TITLE,
            name: '标题设置',
            value: 'title'
        },
        {
            name: '标签展示',
            value: "lableShowList",
            type: comType.CHECKBOX,
            range: [{ name: '名称' }, { value: '值' }, { percent: '百分比' }]
        },
        {
            type: comType.LEGEND,
            name: '图例',
            value: 'legend'
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
                max: 0
            },
            indicator: {
                min: 2,
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
            name: '指标数据',
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
        import ('./emptyInnerPie'));
}

export default {
    componentName,
    cn_name,
    style,
    install,
    data,
    linkage,
    getStaticTemplateData
}