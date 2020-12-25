import { comType } from '../../components/props/edit/EditCompReg'
import util from '../../util/util'
import Vue from 'vue'
const name = 'timeLine';
const type = 'timeLine';
const cn_name = '时间轴';
// 组件名称
const componentName = 'timeLine';
const style = {
    box: {
        top: 300,
        left: 300,
        width: 600,
        height: 120
    },
    conf: {
        backgroundColor: 'rgba(2,30,45,0)',
        base: {
            fontWeight: 'normal',
            height: 26, //单个时间点高度
            margin: '0,5,5,0', //外边距
            padding: '0,5,0,5', //内边距
        },
        default: {
            backgroundColor: 'rgba(30,50,93,1)',
            fontSize: 12,
            fontColor: 'rgba(237,239,242,1)',
        },
        active: {
            backgroundColor: 'rgba(12,69,116,1)',
            fontSize: 12,
            fontColor: 'rgba(2,219,228,1)'
        },
        data: {
            // 输入配置
            in: {
                key: 'value',
                format: 'YYYY',
                type: 'dotArr', //输入的是时间点或时间范围 dotArr(时间点集合)|dot(时间点)|range(时间范围)
            },
            // 显示配置
            show: {
                format: 'YY年'
            },
            // 输出配置
            out: {
                key: 'value', //输出的key
                format: [], //可配置多种形式的输出 如配置yyyy 和 yyyymm 则输出 {valueyyyy : 2018,valueyyyymm : 201810}
                type: 'dot', //输出的是时间点集合或时间点或时间范围 //如果输出的是时间点 则
            }
        }
    },
    confView: [{
            name: '基本配置',
            type: comType.GROUP,
            children: [{
                    name: '行高',
                    type: comType.NUMBER,
                    step: 1,
                    value: 'base height'
                },
                {
                    name: '字体粗细',
                    type: comType.FONTWEIGHT,
                    value: 'base fontWeight',
                },
                {
                    name: '内边距',
                    type: comType.TEXT,
                    value: 'base padding'
                },
                {
                    name: '外边距',
                    type: comType.TEXT,
                    value: 'base margin'
                }
            ]
        },
        {
            name: '默认状态配置',
            type: comType.GROUP,
            fold: false,
            children: [{
                    name: '背景颜色',
                    type: comType.COLORALPHA,
                    value: 'default backgroundColor'
                },
                {
                    name: '字体颜色',
                    type: comType.COLORALPHA,
                    value: 'default fontColor'
                },
                {
                    name: '字体大小',
                    type: comType.NUMBER,
                    value: 'default fontSize'
                }
            ]
        },
        {
            name: '选中状态配置',
            type: comType.GROUP,
            fold: false,
            children: [{
                    name: '背景颜色',
                    type: comType.COLORALPHA,
                    value: 'active backgroundColor'
                },
                {
                    name: '字体颜色',
                    type: comType.COLORALPHA,
                    value: 'active fontColor'
                },
                {
                    name: '字体大小',
                    type: comType.NUMBER,
                    value: 'active fontSize'
                }
            ]
        },
        {
            name: '数据格式化配置',
            type: comType.GROUP,
            children: [{
                name: '输入配置',
                type: comType.GROUP,
                children: [{
                        name: '值类型',
                        type: comType.SELECT,
                        value: 'data in type',
                        range: [{ dotArr: '时间点集合' }, { dot: '时间点' }, { range: '时间范围' }]
                    },
                    {
                        name: '取值key',
                        type: comType.TEXT,
                        value: 'data in key'
                    },
                    {
                        name: '值格式',
                        type: comType.TEXT,
                        value: 'data in format'
                    }
                ]
            }, {
                name: '输出配置',
                type: comType.GROUP,
                children: [{
                        name: '值类型',
                        type: comType.SELECT,
                        value: 'data out type',
                        range: [{ dotArr: '时间点集合' }, { dot: '时间点' }, { range: '时间范围' }]
                    },
                    {
                        name: '值格式化',
                        type: comType.ARRAY,
                        addOrDel: true,
                        value: 'data out format',
                        itemName: '输出值<%i+1%>',
                        children: [{
                                name: '输出key',
                                type: comType.TEXT,
                                value: 'key',
                                default: 'value'
                            },
                            {
                                name: '应用值格式化',
                                type: comType.TEXT,
                                value: 'format'
                            },
                            {
                                name: '显示值格式化',
                                type: comType.TEXT,
                                value: 'showFormat'
                            }
                        ]
                    },

                ]
            }, {
                name: '显示配置',
                type: comType.GROUP,
                children: [{
                    name: '值格式化',
                    type: comType.TEXT,
                    value: 'data show format'
                }]
            }]
        }
    ]
}
const data = {
        datasource: {
            type: "static",
            tempCode: "timeAxis"
        },
        conf: {
            dimensionIndicatorRelation: [{
                    dimension: {
                        min: 1,
                        max: 1
                    },
                    indicator: {
                        min: 0,
                        max: 0
                    }
                },
                {
                    dimension: {
                        min: 0,
                        max: 0
                    },
                    indicator: {
                        min: 'any',
                        max: 'any'
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
                name: '数据配置',
                value: 'xAxisIds',
                defalut: [],
                show: true,

            },
        }
    }
    // 联动
const linkage = {
    conf: {
        linkRevEvents: [],
        linkEvents: [],
        cycleEvents: {},
    },
    confView: {
        linkEvtTypes: [{ label: '点击事件', val: 'click' }],
        cycleConf: {
            enable: true,
            cycleType: [{ label: '序列', value: 'axis' }]
        }
    }
}

function getStaticTemplateData() {
    return util.deepCopy(data);
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./index.vue'));
}

export default {
    name,
    type,
    cn_name,
    style,
    data,
    componentName,
    linkage,
    install,
    getStaticTemplateData,
}