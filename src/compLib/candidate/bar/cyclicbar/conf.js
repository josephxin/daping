import Vue from 'vue'
const componentName = 'cyclicbar'
const cn_name = '环形柱图'
import { comType } from '@/components/props/edit/EditCompReg'
import { DataSourceContext } from "@/datamanager/DataManagerContext"
const style = {
    box: {
        width: 450,
        height: 450,
        top: 300,
        left: 300
    },
    conf: {
        backgroundColor: 'rgba(0,0,0,0)',
        unit: '',
        maxValue: 1000,
        valueType: 'real', //传入值的类型
        showPercent: true, //显示为百分比
        valueMaxFixed: 2, //值保留小数位数
        labelKey: 'name',
        valueKey: 'value',
        circle: {
            colors: ['#FAC987', '#F99070'], //风格配色
            bottomColor: '#172B2A', //底色
            width: 12, //圆环宽度
            shadow: {
                show: false, //是否显示阴影
                width: 5, //阴影大小
                color: '#172B2A', //阴影颜色
            }
        },
        area: {
            center: {
                fontSize: 40,
                fontColor: '#2A95F9',
                top: '46%',
                subTitle: {
                    show: false,
                    fontSize: 20,
                    fontColor: '#fff',
                    lineHeight: 30,
                    showName: true,
                    start: '',
                    end: '占比'
                }
            },
            bottom: {
                fontSize: 14,
                fontColor: '#fff',
                top: '80%',
                texts: []
            }
        }
    },
    confView: [{
            type: comType.COLORALPHA,
            name: '背景色',
            value: 'backgroundColor'
        },
        {
            name: '值类型',
            type: comType.SELECT,
            value: 'valueType',
            range: [{ real: '实际值' }, { percent: '百分比' }]
        },
        {
            name: '显示为百分比值',
            type: comType.BOOLEAN,
            value: 'showPercent'
        },
        {
            name: '小数点位数',
            type: comType.NUMBER,
            value: 'valueMaxFixed'
        },
        {
            name: '显示key',
            type: comType.TEXT,
            value: 'labelKey',
        },
        {
            name: '值key',
            type: comType.TEXT,
            value: 'valueKey',
        },
        {
            name: '环配置',
            type: comType.GROUP,
            fold: false,
            children: [{
                    name: '底色',
                    type: comType.COLOR,
                    value: 'circle bottomColor'
                },
                {
                    name: '圆环配色',
                    type: comType.COLORRAMP,
                    value: 'circle colors'
                },
                {
                    name: '圆环宽度',
                    type: comType.NUMBER,
                    value: 'circle width'
                },
                {
                    name: '阴影配置',
                    type: comType.GROUP,
                    show: true,
                    showName: '显示阴影',
                    value: "circle shadow show",
                    children: [{
                            name: '阴影大小',
                            type: comType.NUMBER,
                            value: "circle shadow width"
                        },
                        {
                            name: '阴影颜色',
                            type: comType.COLOR,
                            value: "circle shadow color"
                        }
                    ]
                }
            ]
        },
        {
            name: '数值单位',
            type: comType.TEXT,
            value: 'unit'
        },
        {
            name: '最大值',
            type: comType.NUMBER,
            value: 'maxValue'
        },
        {
            name: '文字配置',
            type: comType.GROUP,
            fold: false,
            children: [{
                    name: '中心区配置',
                    type: comType.GROUP,
                    children: [{
                            name: '文字大小',
                            type: comType.NUMBER,
                            value: "area center fontSize"
                        },
                        {
                            name: '文字颜色',
                            type: comType.COLOR,
                            value: "area center fontColor"
                        },
                        {
                            name: '距顶部距离',
                            type: comType.TEXT,
                            value: "area center top"
                        },
                        {
                            name: '副标题配置',
                            type: comType.GROUP,
                            show: true,
                            showName: '是否显示副标题',
                            value: "area center subTitle show",
                            children: [{
                                    name: '文字大小',
                                    type: comType.NUMBER,
                                    value: "area center subTitle fontSize"
                                },
                                {
                                    name: '文字颜色',
                                    type: comType.COLOR,
                                    value: "area center subTitle fontColor"
                                },
                                {
                                    name: '行高',
                                    type: comType.NUMBER,
                                    value: "area center subTitle lineHeight"
                                },
                                {
                                    name: '指标名在中间',
                                    type: comType.BOOLEAN,
                                    value: "area center subTitle showName"
                                },
                                {
                                    name: '前置内容',
                                    type: comType.TEXT,
                                    value: "area center subTitle start"
                                },
                                {
                                    name: '后置内容',
                                    type: comType.TEXT,
                                    value: "area center subTitle end"
                                },
                            ]
                        }
                    ]
                },
                {
                    name: '底部配置',
                    type: comType.GROUP,
                    fold: false,
                    children: [{
                            name: '文字大小',
                            type: comType.NUMBER,
                            value: "area bottom fontSize"
                        },
                        {
                            name: '文字颜色',
                            type: comType.COLOR,
                            value: "area bottom fontColor"
                        },
                        {
                            name: '距顶部距离',
                            type: comType.TEXT,
                            value: "area bottom top"
                        },
                        {
                            name: '文字内容',
                            type: comType.ARRAY,
                            addOrDel: true,
                            value: 'area bottom texts',
                            itemName: '文字<%i+1%>',
                            children: [{
                                name: '内容',
                                type: comType.TEXT,
                                value: 'name'
                            }]
                        }
                    ]
                }
            ]
        }
    ]
}
const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: "SingleData"
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
            name: '指标',
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
    },
    confView: {
        linkEvtTypes: [{ label: '点击事件', val: 'click' }],
    }
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./CyclicBar'))
}

export default {
    componentName,
    cn_name,
    style,
    data,
    linkage,
    install
}