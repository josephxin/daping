import Vue from "vue";
import util from "@/util/util";
import { comType } from "@/components/props/edit/EditCompReg";
import { DataSourceContext } from '@/datamanager/DataManagerContext'
const type = 'datePicker';
const componentName = 'dateRange';
const cn_name = '日期选择器-范围';

const style = {
    box: {
        width: 300,
        height: 40,
        top: 300,
        left: 300
    },
    conf: {
        type: 'daterange',
        value: '',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        //输入配置
        in: {
            key: 'value',
        },
        //输入框配置
        inputStyle: {
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            rangeSeparator: '-',
            rangeSeparatorSize: 14,
            rangeSeparatorColor: '#303133',
            bgColor: '#fff',

            defaultBorder: {
                borderType: 'solid',
                borderWidth: 1,
                borderColor: '#DCDFE6',
                borderRadius: 4,
            },
            hoverBorder: {
                borderType: 'solid',
                borderWidth: 1,
                borderColor: '#c0c4cc',
                borderRadius: 4,
            },
            focusBorder: {
                borderType: 'solid',
                borderWidth: 1,
                borderColor: '#409EFF',
                borderRadius: 4,
            },

            fontFamily: 'Microsoft Yahei',
            fontWeight: 'normal',
            fontSize: 14,
            fontColor: '#606266',

            prefixIcon: 'icon-date',
            prefixSize: 16,
            prefixColor: '#C0C4CC',

            clearable: true,
            clearIcon: 'icon-delete',
            clearSize: 16,
            clearColor: '#C0C4CC',
        },
        //日历配置
        calendarStyle: {
            unlinkPanels: false,
            bgColor: '#fff',
            boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)',
            border: {
                borderType: 'solid',
                borderWidth: 1,
                borderColor: '#E4E7ED',
                borderRadius: 4,
            },
            arrowColor: '#ffffff',
            //中间分割线样式
            middleLine: {
                type: 'solid',
                width: 1,
                color: '#e4e4e4'
            },
            //顶部样式
            headText: {
                fontFamily: 'Microsoft Yahei',
                fontWeight: 'normal',
                fontSize: 16,
                fontColor: '#606266',
            },
            headArrow: {
                arrowSize: 12,
                arrowColor: '#303133',
            },
            headArrowHover: {
                arrowSize: 12,
                arrowColor: '#409EFF',
            },
            //主体样式
            dividerLine: {
                width: 1,
                color: '#EBEEF5'
            },
            mainText: {
                fontFamily: 'Microsoft Yahei',
                fontWeight: 'normal',
                fontSize: 12,
                fontColor: '#606266',
            },
            mainTextHover: {
                fontFamily: 'Microsoft Yahei',
                fontWeight: 'normal',
                fontSize: 12,
                fontColor: '#409EFF',
            },
            currentText: {
                rangeBgColor: '#F2F6FC',
                bgColor: '#409EFF',
                fontFamily: 'Microsoft Yahei',
                fontWeight: 'normal',
                fontSize: 12,
                fontColor: '#fff',
            },
            todayText: {
                fontFamily: 'Microsoft Yahei',
                fontWeight: 'bold',
                fontSize: 12,
                fontColor: '#409EFF',
            },
            otherText: {
                fontFamily: 'Microsoft Yahei',
                fontWeight: 'normal',
                fontSize: 12,
                fontColor: '#C0C4CC',
            },
        }
    },
    confView: [
        {
            name: "选择器类型",
            type: comType.SELECTRELATIVE,
            value: "type",
            //range中属性名为value，属性值为name
            range: [
                {
                    'monthrange': '月范围'
                },
                {
                    'daterange': '日范围'
                },
            ],
            relative: {
                monthrange: [
                    {
                        name: "显示格式",
                        type: comType.SELECT,
                        value: "format",
                        noselectFirst: true,
                        placeholder: '请选择月的格式',
                        range: [
                            {
                                'yyyy-MM': 'yyyy-MM'
                            },
                            {
                                'yyyy/MM': 'yyyy/MM'
                            },
                            {
                                'yyyy年MM月': 'yyyy年MM月'
                            },
                        ]
                    },
                    {
                        name: "绑定值格式",
                        type: comType.SELECT,
                        value: "valueFormat",
                        noselectFirst: true,
                        placeholder: '请选择月的格式',
                        range: [
                            {
                                '': 'Date对象'
                            },
                            {
                                'yyyy-MM': 'yyyy-MM'
                            },
                            {
                                'yyyy/MM': 'yyyy/MM'
                            },
                            {
                                'timestamp': '时间戳'
                            },
                        ]
                    }
                ],
                daterange: [
                    {
                        name: "显示格式",
                        type: comType.SELECT,
                        value: "format",
                        noselectFirst: true,
                        placeholder: '请选择日的格式',
                        range: [
                            {
                                'yyyy-MM-dd': 'yyyy-MM-dd'
                            },
                            {
                                'yyyy/MM/dd': 'yyyy/MM/dd'
                            },
                            {
                                'yyyy年MM月dd日': 'yyyy年MM月dd日'
                            },
                            {
                                'yyyy 年 MM 月 dd 日': 'yyyy 年 MM 月 dd 日'
                            },
                        ]
                    },
                    {
                        name: "绑定值格式",
                        type: comType.SELECT,
                        value: "valueFormat",
                        noselectFirst: true,
                        placeholder: '请选择日的格式',
                        range: [
                            {
                                '': 'Date对象'
                            },
                            {
                                'yyyy-MM-dd': 'yyyy-MM-dd'
                            },
                            {
                                'yyyy/MM/dd': 'yyyy/MM/dd'
                            },
                            {
                                'timestamp': '时间戳'
                            },
                        ]
                    }
                ],
            }
        },
        {
            name: "绑定值",
            type: comType.TXT,
            value: "value",
        },
        {
            name: "输入配置",
            type: comType.GROUP,
            fold: true,
            children: [
                {
                    name: '取值key',
                    type: comType.TEXT,
                    value: 'in key'
                },
            ]
        },
        {
            name: "输入框配置",
            type: comType.GROUP,
            fold: false,
            children: [
                {
                    name: "startPlaceholder",
                    type: comType.TEXT,
                    value: "inputStyle startPlaceholder",
                },
                {
                    name: "endPlaceholder",
                    type: comType.TEXT,
                    value: "inputStyle endPlaceholder",
                },
                {
                    name: "分隔符",
                    type: comType.GROUP,
                    fold: false,
                    children: [
                        {
                            name: "文本",
                            type: comType.TEXT,
                            value: "inputStyle rangeSeparator",
                        },
                        {
                            name: "字号",
                            type: comType.NUMBER,
                            value: 'inputStyle rangeSeparatorSize',
                            min: 12,
                        },
                        {
                            name: "颜色",
                            type: comType.COLOR,
                            value: 'inputStyle rangeSeparatorColor',
                        },
                    ]
                },
                {
                    name: '背景颜色',
                    type: comType.COLORALPHA,
                    value: 'inputStyle bgColor',
                },
                {
                    name: "普通边框样式",
                    type: comType.BORDER,
                    value: 'inputStyle defaultBorder',
                    fold: false,
                },
                {
                    name: "悬停边框样式",
                    type: comType.BORDER,
                    value: 'inputStyle hoverBorder',
                    fold: false,
                },
                {
                    name: "聚焦边框样式",
                    type: comType.BORDER,
                    value: "inputStyle focusBorder",
                    fold: false,
                },
                {
                    name: '文本样式',
                    type: comType.FONT,
                    value: 'inputStyle',
                    fold: false
                },
                {
                    name: "头部图标",
                    type: comType.GROUP,
                    fold: false,
                    children: [
                        {
                            name: "选择图标",
                            type: comType.SELECT,
                            value: "inputStyle prefixIcon",
                            slotType: 'iconfont',
                            //range中属性名为value，属性值为name
                            range: [
                                {
                                    'icon-date': 'icon-date'
                                },
                                {
                                    'icon-date2': 'icon-date2'
                                },
                                {
                                    'icon-date3': 'icon-date3'
                                },
                                {
                                    'icon-date4': 'icon-date4'
                                },
                                {
                                    'icon-date5': 'icon-date5'
                                },
                                {
                                    'icon-date6': 'icon-date6'
                                },
                                {
                                    'icon-date7': 'icon-date7'
                                },
                                {
                                    'icon-date8': 'icon-date8'
                                },
                            ]
                        },
                        {
                            name: "图标大小",
                            type: comType.NUMBER,
                            value: "inputStyle prefixSize",
                            min: 12
                        },
                        {
                            name: "图标颜色",
                            type: comType.COLOR,
                            value: "inputStyle prefixColor",
                        },
                    ]
                },
                {
                    name: "清空图标",
                    type: comType.GROUP,
                    show: true,
                    showName: '显示',
                    value: 'inputStyle clearable',
                    fold: false,
                    children: [
                        {
                            name: "选择图标",
                            type: comType.SELECT,
                            value: "inputStyle clearIcon",
                            slotType: 'iconfont',
                            range: [
                                {
                                    'icon-delete': 'icon-delete'
                                },
                                {
                                    'icon-delete2': 'icon-delete2'
                                },
                                {
                                    'icon-delete3': 'icon-delete3'
                                },
                                {
                                    'icon-delete4': 'icon-delete4'
                                },
                            ]
                        },
                        {
                            name: "图标大小",
                            type: comType.NUMBER,
                            value: "inputStyle clearSize",
                            min: 12
                        },
                        {
                            name: "图标颜色",
                            type: comType.COLOR,
                            value: "inputStyle clearColor",
                        },
                    ]
                },
            ]
        },
        {
            name: "日历配置",
            type: comType.GROUP,
            fold: true,
            children: [
                /* {
                    name: '取消面板联动',
                    type: comType.BOOLEAN,
                    value: 'calendarStyle unlinkPanels',
                }, */
                {
                    name: '日历框背景色',
                    type: comType.COLORALPHA,
                    value: 'calendarStyle bgColor',
                },
                {
                    name: "盒子阴影",
                    type: comType.TEXT,
                    value: 'calendarStyle boxShadow',
                },
                {
                    name: "边框样式",
                    type: comType.BORDER,
                    value: 'calendarStyle border',
                    fold: false,
                },
                {
                    name: "箭头颜色",
                    type: comType.COLOR,
                    value: 'calendarStyle arrowColor',
                },
                {
                    name: "中间分割线样式",
                    type: comType.GROUP,
                    fold: false,
                    children: [
                        {
                            name: "类型",
                            type: comType.SELECT,
                            value: 'calendarStyle middleLine type',
                            range: [
                                { solid: "实线" },
                                { dashed: "虚线" },
                                { dotted: "点状虚线" },
                            ],
                        },
                        {
                            name: "线宽",
                            type: comType.NUMBER,
                            value: 'calendarStyle middleLine width',
                            min: 0,
                        },
                        {
                            name: "颜色",
                            type: comType.COLOR,
                            value: 'calendarStyle middleLine color',
                        },
                    ]
                },
                {
                    name: "顶部样式",
                    type: comType.GROUP,
                    fold: false,
                    children: [
                        {
                            name: "文本样式",
                            type: comType.FONT,
                            value: 'calendarStyle headText',
                            fold: false,
                        },
                        {
                            name: "普通箭头样式",
                            type: comType.GROUP,
                            fold: false,
                            children: [
                                {
                                    name: "箭头大小",
                                    type: comType.NUMBER,
                                    value: "calendarStyle headArrow arrowSize",
                                    min: 12
                                },
                                {
                                    name: "箭头颜色",
                                    type: comType.COLOR,
                                    value: 'calendarStyle headArrow arrowColor',
                                },
                            ]
                        },
                        {
                            name: "悬停箭头样式",
                            type: comType.GROUP,
                            fold: false,
                            children: [
                                {
                                    name: "箭头大小",
                                    type: comType.NUMBER,
                                    value: "calendarStyle headArrowHover arrowSize",
                                    min: 12
                                },
                                {
                                    name: "箭头颜色",
                                    type: comType.COLOR,
                                    value: 'calendarStyle headArrowHover arrowColor',
                                },
                            ]
                        },
                    ]
                },
                {
                    name: "主体样式",
                    type: comType.GROUP,
                    fold: false,
                    children: [
                        {
                            name: "分割线样式",
                            type: comType.GROUP,
                            fold: false,
                            rules(styleConf) {
                                if (styleConf.type == 'daterange') {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                            children: [
                                {
                                    name: "线宽",
                                    type: comType.NUMBER,
                                    value: 'calendarStyle dividerLine width',
                                    min: 0,
                                },
                                {
                                    name: "颜色",
                                    type: comType.COLOR,
                                    value: 'calendarStyle dividerLine color'
                                }
                            ]
                        },
                        {
                            name: "普通文本样式",
                            type: comType.FONT,
                            value: 'calendarStyle mainText',
                            fold: false,
                        },
                        {
                            name: "悬停文本样式",
                            type: comType.FONT,
                            value: 'calendarStyle mainTextHover',
                            fold: false,
                        },
                        {
                            name: "选中文本样式",
                            type: comType.FONT,
                            value: 'calendarStyle currentText',
                            fold: false,
                            children: [
                                {
                                    name: '选中范围背景色',
                                    type: comType.COLORALPHA,
                                    value: 'calendarStyle currentText rangeBgColor',
                                },
                                {
                                    name: '背景颜色',
                                    type: comType.COLORALPHA,
                                    value: 'calendarStyle currentText bgColor',
                                }
                            ]
                        },
                        {
                            name: "今日文本样式",
                            type: comType.FONT,
                            value: 'calendarStyle todayText',
                            fold: false,
                        },
                        {
                            name: "上下月文本样式",
                            type: comType.FONT,
                            value: 'calendarStyle otherText',
                            fold: false,
                            rules(styleConf) {
                                if (styleConf.type == 'daterange') {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        },
                    ]
                }
            ]
        }
    ]
}

const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: "date"
    },
    conf: {},
    confView: {
        selectDataSet: {
            name: '数据集',
        },
        xBinding: {
            name: '数据选择',
        },
    }
};

const linkage = {
    conf: {
        linkRevEvents: [],//接收事件
        linkEvents: [],//触发事件
    },
    confView: {
        linkEvtTypes: [{ label: 'change事件', val: 'change' }],
    }
}

function install() {
    Vue.component(componentName, () => import('./dateRange.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default { type, componentName, cn_name, style, data, linkage, install, getStaticTemplateData }
