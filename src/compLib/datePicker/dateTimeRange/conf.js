import Vue from "vue";
import util from "@/util/util";
import { comType } from "@/components/props/edit/EditCompReg";
import { DataSourceContext } from '@/datamanager/DataManagerContext'
const type = 'datePicker';
const componentName = 'dateTimeRange';
const cn_name = '日期时间选择器-范围';

const style = {
    box: {
        width: 400,
        height: 40,
        top: 300,
        left: 300
    },
    conf: {
        type: 'datetimerange',
        value: '',
        format: 'yyyy-MM-dd HH:mm:ss',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
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
            //顶部时间选择样式
            timeDividerLine: {
                width: 1,
                color: '#e4e4e4'
            },
            timeArrow: {
                arrowSize: 20,
                arrowColor: '#303133',
            },
            timeInput: {
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
                    borderColor: '#C0C4CC',
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
                fontSize: 13,
                fontColor: '#606266',
            },
            timePanel: {
                bgColor: '#fff',
                boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)',
                border: {
                    borderType: 'solid',
                    borderWidth: 1,
                    borderColor: '#E4E7ED',
                    borderRadius: 4,
                },
                dividerLine: {
                    width: 1,
                    color: '#E4E7ED'
                },
                text: {
                    fontFamily: 'Microsoft Yahei',
                    fontWeight: 'normal',
                    fontSize: 12,
                    fontColor: '#606266',
                },
                hoverText: {
                    bgColor: '#F5F7FA',
                    fontFamily: 'Microsoft Yahei',
                    fontWeight: 'normal',
                    fontSize: 12,
                    fontColor: '#606266',
                },
                currentText: {
                    fontFamily: 'Microsoft Yahei',
                    fontWeight: 'bold',
                    fontSize: 12,
                    fontColor: '#303133',
                },
                footDividerLine: {
                    width: 1,
                    color: '#e4e4e4'
                },
                cancelBtn: {
                    fontFamily: 'arial',
                    fontWeight: 'normal',
                    fontSize: 12,
                    fontColor: '#303133',
                },
                confirmBtn: {
                    fontFamily: 'arial',
                    fontWeight: 'bold',
                    fontSize: 12,
                    fontColor: '#409EFF',
                },
            },
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
            //底部样式
            footDividerLine: {
                width: 1,
                color: '#e4e4e4'
            },
            clearBtn: {
                paddingTB: 7,
                paddingLR: 0,
                bgColor: '',
                borderType: 'solid',
                borderWidth: 1,
                borderColor: '',
                borderRadius: 3,
                fontFamily: 'arial',
                fontWeight: 'normal',
                fontSize: 12,
                fontColor: '#409EFF',
            },
            clearBtnHover: {
                paddingTB: 7,
                paddingLR: 0,
                bgColor: '',
                borderType: 'solid',
                borderWidth: 1,
                borderColor: '',
                borderRadius: 3,
                fontFamily: 'arial',
                fontWeight: 'normal',
                fontSize: 12,
                fontColor: '#66b1ff',
            },
            confirmBtn: {
                paddingTB: 7,
                paddingLR: 15,
                bgColor: '#ffffff',
                borderType: 'solid',
                borderWidth: 1,
                borderColor: '#DCDFE6',
                borderRadius: 3,
                fontFamily: 'arial',
                fontWeight: 'normal',
                fontSize: 12,
                fontColor: '#606266',
            },
            confirmBtnHover: {
                paddingTB: 7,
                paddingLR: 15,
                bgColor: '#ffffff',
                borderType: 'solid',
                borderWidth: 1,
                borderColor: '#409EFF',
                borderRadius: 3,
                fontFamily: 'arial',
                fontWeight: 'normal',
                fontSize: 12,
                fontColor: '#409EFF',
            },
        }
    },
    confView: [
        {
            name: "显示格式",
            type: comType.SELECT,
            value: "format",
            noselectFirst: true,
            placeholder: '请选择日的格式',
            range: [
                {
                    'yyyy-MM-dd HH:mm:ss': 'yyyy-MM-dd HH:mm:ss'
                },
                {
                    'yyyy/MM/dd HH:mm:ss': 'yyyy/MM/dd HH:mm:ss'
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
                    'yyyy-MM-dd HH:mm:ss': 'yyyy-MM-dd HH:mm:ss'
                },
                {
                    'yyyy/MM/dd HH:mm:ss': 'yyyy/MM/dd HH:mm:ss'
                },
                {
                    'timestamp': '时间戳'
                },
            ]
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
            fold: true,
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
                    value: 'inputStyle focusBorder',
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
                    name: "顶部时间选择样式",
                    type: comType.GROUP,
                    fold: false,
                    children: [
                        {
                            name: "分割线样式",
                            type: comType.GROUP,
                            fold: false,
                            children: [
                                {
                                    name: "线宽",
                                    type: comType.NUMBER,
                                    value: "calendarStyle timeDividerLine width",
                                    min: 0,
                                },
                                {
                                    name: "颜色",
                                    type: comType.COLOR,
                                    value: "calendarStyle timeDividerLine color",
                                },
                            ],
                        },
                        {
                            name: "中间箭头样式",
                            type: comType.GROUP,
                            fold: false,
                            children: [
                                {
                                    name: "箭头大小",
                                    type: comType.NUMBER,
                                    value: "calendarStyle timeArrow arrowSize",
                                    min: 12
                                },
                                {
                                    name: "箭头颜色",
                                    type: comType.COLOR,
                                    value: 'calendarStyle timeArrow arrowColor',
                                },
                            ]
                        },
                        {
                            name: "输入框样式",
                            type: comType.GROUP,
                            fold: false,
                            children: [
                                {
                                    name: "背景颜色",
                                    type: comType.COLORALPHA,
                                    value: "calendarStyle timeInput bgColor",
                                },
                                {
                                    name: "普通边框样式",
                                    type: comType.BORDER,
                                    value: "calendarStyle timeInput defaultBorder",
                                    fold: false,
                                },
                                {
                                    name: "悬停边框样式",
                                    type: comType.BORDER,
                                    value: "calendarStyle timeInput hoverBorder",
                                    fold: false,
                                },
                                {
                                    name: "聚焦边框样式",
                                    type: comType.BORDER,
                                    value: "calendarStyle timeInput focusBorder",
                                    fold: false,
                                },
                                {
                                    name: "文本样式",
                                    type: comType.FONT,
                                    value: "calendarStyle timeInput",
                                    fold: false,
                                },
                            ],
                        },
                        {
                            name: "下拉时间面板样式",
                            type: comType.GROUP,
                            fold: false,
                            children: [
                                {
                                    name: "背景颜色",
                                    type: comType.COLORALPHA,
                                    value: "calendarStyle timePanel bgColor",
                                },
                                {
                                    name: "盒子阴影",
                                    type: comType.TEXT,
                                    value: "calendarStyle timePanel boxShadow",
                                },
                                {
                                    name: "边框样式",
                                    type: comType.BORDER,
                                    value: "calendarStyle timePanel border",
                                    fold: false,
                                },
                                {
                                    name: "主体样式",
                                    type: comType.GROUP,
                                    fold: false,
                                    children: [
                                        {
                                            name: "分割线样式",
                                            type: comType.GROUP,
                                            fold: true,
                                            children: [
                                                {
                                                    name: "线宽",
                                                    type: comType.NUMBER,
                                                    value:
                                                        "calendarStyle timePanel dividerLine width",
                                                    min: 0,
                                                },
                                                {
                                                    name: "颜色",
                                                    type: comType.COLOR,
                                                    value:
                                                        "calendarStyle timePanel dividerLine color",
                                                },
                                            ],
                                        },
                                        {
                                            name: "普通文本样式",
                                            type: comType.FONT,
                                            value: "calendarStyle timePanel text",
                                            fold: true,
                                        },
                                        {
                                            name: "悬停文本样式",
                                            type: comType.FONT,
                                            value:
                                                "calendarStyle timePanel hoverText",
                                            fold: true,
                                            children: [
                                                {
                                                    name: "背景颜色",
                                                    type: comType.COLORALPHA,
                                                    value: "calendarStyle timePanel hoverText bgColor",
                                                }
                                            ]
                                        },
                                        {
                                            name: "选中文本样式",
                                            type: comType.FONT,
                                            value:
                                                "calendarStyle timePanel currentText",
                                            fold: true,
                                        },
                                    ],
                                },
                                {
                                    name: "底部样式",
                                    type: comType.GROUP,
                                    fold: false,
                                    children: [
                                        {
                                            name: "分割线样式",
                                            type: comType.GROUP,
                                            fold: true,
                                            children: [
                                                {
                                                    name: "线宽",
                                                    type: comType.NUMBER,
                                                    value:
                                                        "calendarStyle timePanel footDividerLine width",
                                                    min: 0,
                                                },
                                                {
                                                    name: "颜色",
                                                    type: comType.COLOR,
                                                    value:
                                                        "calendarStyle timePanel footDividerLine color",
                                                },
                                            ],
                                        },
                                        {
                                            name: "取消按钮样式",
                                            type: comType.FONT,
                                            value: "calendarStyle timePanel cancelBtn",
                                            fold: true,
                                        },
                                        {
                                            name: "确定按钮样式",
                                            type: comType.FONT,
                                            value: "calendarStyle timePanel confirmBtn",
                                            fold: true,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
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
                        },
                    ]
                },
                {
                    name: "底部样式",
                    type: comType.GROUP,
                    fold: false,
                    children: [
                        {
                            name: "分割线样式",
                            type: comType.GROUP,
                            fold: false,
                            children: [
                                {
                                    name: "线宽",
                                    type: comType.NUMBER,
                                    value: "calendarStyle footDividerLine width",
                                    min: 0,
                                },
                                {
                                    name: "颜色",
                                    type: comType.COLOR,
                                    value: "calendarStyle footDividerLine color",
                                },
                            ],
                        },
                        {
                            name: "清空按钮样式",
                            type: comType.GROUP,
                            fold: false,
                            children: [
                                {
                                    name: "上下内边距",
                                    type: comType.NUMBER,
                                    value: "calendarStyle clearBtn paddingTB",
                                    min: 0,
                                },
                                {
                                    name: "左右内边距",
                                    type: comType.NUMBER,
                                    value: "calendarStyle clearBtn paddingLR",
                                    min: 0,
                                },
                                {
                                    name: "背景色",
                                    type: comType.COLORALPHA,
                                    value: "calendarStyle clearBtn bgColor",
                                },
                                {
                                    name: "边框样式",
                                    type: comType.BORDER,
                                    value: "calendarStyle clearBtn",
                                    fold: false,
                                },
                                {
                                    name: "文本样式",
                                    type: comType.FONT,
                                    value: "calendarStyle clearBtn",
                                    fold: false,
                                },
                            ],
                        },
                        {
                            name: "清空按钮悬停样式",
                            type: comType.GROUP,
                            fold: false,
                            children: [
                                {
                                    name: "上下内边距",
                                    type: comType.NUMBER,
                                    value: "calendarStyle clearBtnHover paddingTB",
                                    min: 0,
                                },
                                {
                                    name: "左右内边距",
                                    type: comType.NUMBER,
                                    value: "calendarStyle clearBtnHover paddingLR",
                                    min: 0,
                                },
                                {
                                    name: "背景色",
                                    type: comType.COLORALPHA,
                                    value: "calendarStyle clearBtnHover bgColor",
                                },
                                {
                                    name: "边框样式",
                                    type: comType.BORDER,
                                    value: "calendarStyle clearBtnHover",
                                    fold: false,
                                },
                                {
                                    name: "文本样式",
                                    type: comType.FONT,
                                    value: "calendarStyle clearBtnHover",
                                    fold: false,
                                },
                            ],
                        },
                        {
                            name: "确定按钮样式",
                            type: comType.GROUP,
                            fold: false,
                            children: [
                                {
                                    name: "上下内边距",
                                    type: comType.NUMBER,
                                    value: "calendarStyle confirmBtn paddingTB",
                                    min: 0,
                                },
                                {
                                    name: "左右内边距",
                                    type: comType.NUMBER,
                                    value: "calendarStyle confirmBtn paddingLR",
                                    min: 0,
                                },
                                {
                                    name: "背景色",
                                    type: comType.COLORALPHA,
                                    value: "calendarStyle confirmBtn bgColor",
                                },
                                {
                                    name: "边框样式",
                                    type: comType.BORDER,
                                    value: "calendarStyle confirmBtn",
                                    fold: false,
                                },
                                {
                                    name: "文本样式",
                                    type: comType.FONT,
                                    value: "calendarStyle confirmBtn",
                                    fold: false,
                                },
                            ],
                        },
                        {
                            name: "确定按钮悬停样式",
                            type: comType.GROUP,
                            fold: false,
                            children: [
                                {
                                    name: "上下内边距",
                                    type: comType.NUMBER,
                                    value: "calendarStyle confirmBtnHover paddingTB",
                                    min: 0,
                                },
                                {
                                    name: "左右内边距",
                                    type: comType.NUMBER,
                                    value: "calendarStyle confirmBtnHover paddingLR",
                                    min: 0,
                                },
                                {
                                    name: "背景色",
                                    type: comType.COLORALPHA,
                                    value: "calendarStyle confirmBtnHover bgColor",
                                },
                                {
                                    name: "边框样式",
                                    type: comType.BORDER,
                                    value: "calendarStyle confirmBtnHover",
                                    fold: false,
                                },
                                {
                                    name: "文本样式",
                                    type: comType.FONT,
                                    value: "calendarStyle confirmBtnHover",
                                    fold: false,
                                },
                            ],
                        },
                    ],
                },
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
    Vue.component(componentName, () => import('./dateTimeRange.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default { type, componentName, cn_name, style, data, linkage, install, getStaticTemplateData }
