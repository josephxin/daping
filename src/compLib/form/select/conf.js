import Vue from 'vue'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import { comType } from '@/components/props/edit/EditCompReg'
const componentName = 'formSelect'
const cn_name = '下拉组件'
const style = {
    box: {
        width: 200,
        height: 30,
        top: 300,
        left: 300
    },
    conf: {
        labelKey: 'name',
        // valueKey: 'value',
        select: {
            backgroundColor: 'rgba(3,150,148,1)',
            fontColor: '#fff',
            fontSize: 12,
            fontWeight: 'normal',
            borderRadius: "0 0 0 0",
            padding: "2 5 2 5",
            border: {
                show: false,
                width: 1,
                color: '#999',
                style: 'solid'
            },
            placeholder: {
                text: '请选择',
                fontColor: '#999',
                fontSize: 12,
            },
            focus: {
                backgroundColor: '#0BFFFC',
                fontColor: '#fff',
                border: {
                    color: '#999'
                }
            }
        },
        option: {
            base: {
                padding: "0,5,0,5",
                height: 30,
                border: {
                    show: false,
                    width: 1,
                    color: '#999',
                    style: 'solid'
                }
            },
            default: {
                backgroundColor: '#039794',
                fontColor: '#fff',
                fontSize: 12,
                fontStyle: 'normal',
                fontWeight: 'normal'
            },
            active: {
                backgroundColor: '#0BFFFC',
                color: '#aaa',
                fontSize: 12,
                fontStyle: 'normal',
                fontWeight: 'normal'
            }
        }
    },
    confView: [{
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
            name: '值配置',
            type: comType.GROUP,
            fold: false,
            children: [{
                    name: '背景颜色',
                    type: comType.COLORALPHA,
                    value: "select backgroundColor"
                },
                {
                    name: '内边距',
                    type: comType.TEXT,
                    value: "select padding"
                },
                {
                    name: '圆角配置',
                    type: comType.TEXT,
                    value: "select borderRadius"
                },
                {
                    name: '字体颜色',
                    type: comType.COLORALPHA,
                    value: "select fontColor"
                },
                {
                    name: '字体大小',
                    type: comType.NUMBER,
                    value: "select fontSize"
                },
                {
                    name: '字体粗细',
                    type: comType.SELECT,
                    value: "select fontWeight",
                    range: [{ normal: '普通' }, { bold: '粗' }, { 100: 100 }, { 200: 200 }, { 300: 300 }, { 400: 400 }, { 500: 500 }, { 600: 600 }, { 700: 700 }, ]
                },
                {
                    name: '边框配置',
                    type: comType.GROUP,
                    fold: false,
                    showName: '显示边框',
                    show: true,
                    value: 'select border show',
                    children: [{
                            name: '大小',
                            type: comType.NUMBER,
                            value: "select border width"
                        },
                        {
                            name: '颜色',
                            type: comType.COLORALPHA,
                            value: "select border color"
                        },
                        {
                            name: '风格',
                            type: comType.SELECT,
                            value: "select border style",
                            range: [{ solid: '实线' }, { dashed: '虚线' }, { dotted: '点线' }]
                        },
                    ]
                },
                {
                    name: '获取焦点时配置',
                    type: comType.GROUP,
                    flod: false,
                    children: [{
                            name: '背景颜色',
                            type: comType.COLORALPHA,
                            value: "select focus backgroundColor"
                        },
                        {
                            name: '字体颜色',
                            type: comType.COLORALPHA,
                            value: "select focus fontColor"
                        },
                        {
                            name: '边框颜色',
                            type: comType.COLORALPHA,
                            value: "select focus border color"
                        },
                    ]
                },
                {
                    name: '无选中值时配置',
                    type: comType.GROUP,
                    flod: false,
                    children: [{
                            name: '文字内容',
                            type: comType.TEXT,
                            value: "select placeholder text"
                        },
                        {
                            name: '字体大小',
                            type: comType.NUMBER,
                            value: "select placeholder fontSize"
                        },
                        {
                            name: '颜色',
                            type: comType.COLORALPHA,
                            value: "select placeholder fontColor"
                        },
                    ]
                },
            ]
        },
        {
            name: '选项配置',
            type: comType.GROUP,
            fold: false,
            children: [{
                    name: '基本配置',
                    type: comType.GROUP,
                    fold: false,
                    children: [{
                            name: '选项高度',
                            type: comType.NUMBER,
                            value: "option base height"
                        },
                        {
                            name: '内边距',
                            type: comType.TEXT,
                            value: "option base padding"
                        },
                        {
                            name: '底边框配置',
                            type: comType.GROUP,
                            fold: false,
                            showName: '显示分割线',
                            show: true,
                            value: 'option base border show',
                            children: [{
                                    name: '大小',
                                    type: comType.NUMBER,
                                    value: "option base border width"
                                },
                                {
                                    name: '颜色',
                                    type: comType.COLORALPHA,
                                    value: "option base border color"
                                },
                                {
                                    name: '风格',
                                    type: comType.SELECT,
                                    value: "option base border style",
                                    range: [{ solid: '实线' }, { dashed: '虚线' }, { dotted: '点线' }]
                                },
                            ]
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
                            value: "option default backgroundColor"
                        },
                        {
                            name: '字体颜色',
                            type: comType.COLORALPHA,
                            value: "option default fontColor"
                        },
                        {
                            name: '字体大小',
                            type: comType.NUMBER,
                            value: "option default fontSize"
                        },
                        {
                            name: '字体粗细',
                            type: comType.SELECT,
                            value: "option default fontWeight",
                            range: [{ normal: '普通' }, { bold: '粗' }, { 100: 100 }, { 200: 200 }, { 300: 300 }, { 400: 400 }, { 500: 500 }, { 600: 600 }, { 700: 700 }, ]
                        },
                        {
                            name: '字体风格',
                            type: comType.SELECT,
                            value: "option default fontStyle",
                            range: [{ normal: '正常' }, { italic: '斜体' }, { oblique: '倾斜' }]
                        },
                    ]
                },
                {
                    name: '选中状态配置',
                    type: comType.GROUP,
                    fold: false,
                    children: [{
                            name: '背景颜色',
                            type: comType.COLORALPHA,
                            value: "option active backgroundColor"
                        },
                        {
                            name: '字体颜色',
                            type: comType.COLORALPHA,
                            value: "option active fontColor"
                        },
                        {
                            name: '字体大小',
                            type: comType.NUMBER,
                            value: "option active fontSize"
                        },
                        {
                            name: '字体粗细',
                            type: comType.SELECT,
                            value: "option active fontWeight",
                            range: [{ normal: '普通' }, { bold: '粗' }, { 100: 100 }, { 200: 200 }, { 300: 300 }, { 400: 400 }, { 500: 500 }, { 600: 600 }, { 700: 700 }, ]
                        },
                        {
                            name: '字体风格',
                            type: comType.SELECT,
                            value: "option active fontStyle",
                            range: [{ normal: '正常' }, { italic: '斜体' }, { oblique: '倾斜' }]
                        },
                    ]
                },
            ]
        }
    ]
}
const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: "DataTemp1D"
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
            name: '下拉选项字段',
            value: 'xAxisIds',
            defalut: [],
            show: true,

        },
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
    }
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./select'))
}

export default {
    componentName,
    cn_name,
    style,
    data,
    linkage,
    install
}