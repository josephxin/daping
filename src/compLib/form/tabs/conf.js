import Vue from 'vue'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import util from '@/util/util'
import { comType } from '@/components/props/edit/EditCompReg'

const componentName = 'formTabs'
const cn_name = 'tab组件'
const style = {
    box: {
        width: 200,
        height: 60,
        top: 300,
        left: 300
    },
    conf: {
        linkComps: [{
            name: 'tab1',
            child: []
        }],
        // 外层盒子配置
        boxBackgroundColor: 'rgba(255,255,255,0)', //盒子背景色
        boxPadding: 0, //盒子内边距
        boxShowBorder: false,
        boxBorderWidth: 0,
        boxBorderColor: '',
        boxBorderType: 'solid',
        boxBorderRadius: 0,
        orient: 'horizontal', // 布局方式
        allowCancle: false, // 选中状态是否允许取消
        baseWidth: 'auto',
        baseMargin: '0,0,0,0',
        basePadding: '0,0,0,0',
        defaultBackgroundColor: 'rgba(255,255,255,1)', //tab默认背景色
        defaultBackgroundImgUrl: '', //tab默认背景图片
        defaultFontColor: 'rgba(0,0,0,1)', //tab默认颜色
        defaultFontSize: 14, //tab默认字体大小
        defaultShowBorder: true,
        defaultBorderWidth: 0,
        defaultBorderColor: 'rgba(87,153,254,1)',
        defaultBorderType: 'solid',
        defaultBorderRadius: 4,
        defaultTextAlign: 'center', //居中方式
        activeBackgroundColor: 'rgba(87,153,254,1)', //tab选中背景色
        activeBackgroundImgUrl: '', //tab选中背景图片
        activeFontColor: 'rgba(255,255,255,1)', //tab默认颜色
        activeFontSize: 12, //tab默认字体大小
        activeShowBorder: false,
        activeBorderWidth: 0,
        activeBorderColor: '',
        activeBorderType: 'solid',
        activeBorderRadius: 0
    },
    confView: [{
            name: '高级关联配置',
            type: comType.LINKCOMP,
            value: 'linkComps'
        },
        {
            type: comType.GROUP,
            name: '基本配置',
            fold: false,
            children: [{
                    name: '宽度',
                    type: comType.TEXT,
                    value: 'baseWidth'
                },
                {
                    name: '布局方式',
                    type: comType.SELECT,
                    value: 'orient',
                    range: [{ horizontal: '水平' }, { vertical: '垂直' }]
                },
                {
                    name: '外边距',
                    type: comType.TEXT,
                    value: 'baseMargin'
                },
                {
                    name: '内边距',
                    type: comType.TEXT,
                    value: 'basePadding'
                },
                {
                    name: '是否允许取消选中',
                    type: comType.BOLLEAN,
                    value: 'allowCancle',
                    defalut: false
                }
            ]
        },
        {
            type: comType.GROUP,
            name: '默认状态配置',
            fold: false,
            children: [{
                    name: '背景色',
                    type: comType.COLORALPHA,
                    value: 'defaultBackgroundColor'
                },
                {
                    name: '背景图',
                    type: comType.IMAGEUPLOAD,
                    value: 'defaultBackgroundImgUrl'
                },
                {
                    name: '字体颜色',
                    type: comType.COLORALPHA,
                    value: 'defaultFontColor'
                },
                {
                    name: '字体大小',
                    type: comType.NUMBER,
                    value: 'defaultFontSize',
                    min: 0
                },
                {
                    name: '对齐方式',
                    type: comType.SELECT,
                    value: 'defaultTextAlign',
                    default: 'left',
                    range: [{ left: '左对齐' }, { center: '居中对齐' }, { right: '右对齐' }]
                },
                {
                    type: comType.GROUP,
                    name: '边框配置',
                    show: true,
                    showName: '显示边框',
                    value: 'defaultShowBorder',
                    children: [{
                            name: '颜色',
                            type: comType.COLOR,
                            value: 'defaultBorderColor'
                        },
                        {
                            name: '宽度',
                            type: comType.NUMBER,
                            value: 'defaultBorderWidth',
                            min: 0
                        },
                        {
                            name: '边框类型',
                            type: comType.SELECT,
                            value: 'defaultBorderType',
                            range: [{ 'solid': '实线' }, { 'dashed': '虚线' }, { 'dotted': '点状虚线' }]
                        },
                        {
                            name: '圆角大小',
                            type: comType.NUMBER,
                            value: 'defaultBorderRadius',
                            min: 0
                        },
                    ]
                }
            ]
        },
        {
            type: comType.GROUP,
            name: '选中状态配置',
            fold: false,
            children: [{
                    name: '背景色',
                    type: comType.COLORALPHA,
                    value: 'activeBackgroundColor'
                },
                {
                    name: '背景图',
                    type: comType.IMAGEUPLOAD,
                    value: 'activeBackgroundImgUrl'
                },
                {
                    name: '字体颜色',
                    type: comType.COLORALPHA,
                    value: 'activeFontColor'
                },
                {
                    name: '字体大小',
                    type: comType.NUMBER,
                    value: 'activeFontSize',
                    min: 0
                }
            ]
        },
        {
            type: comType.GROUP,
            name: '盒子配置',
            fold: false,
            children: [{
                    name: '背景色',
                    type: comType.COLORALPHA,
                    value: 'boxBackgroundColor'
                },
                {
                    name: '内边距',
                    type: comType.NUMBER,
                    value: 'boxPadding',
                    min: 0
                },
                {
                    type: comType.GROUP,
                    name: '边框配置',
                    show: true,
                    showName: '显示边框',
                    value: 'boxShowBorder',
                    children: [{
                            name: '颜色',
                            type: comType.COLOR,
                            value: 'boxBorderColor'
                        },
                        {
                            name: '宽度',
                            type: comType.NUMBER,
                            value: 'boxBorderWidth',
                            min: 0
                        },
                        {
                            name: '边框类型',
                            type: comType.SELECT,
                            value: 'boxBorderType',
                            range: [{ 'solid': '实线' }, { 'dashed': '虚线' }, { 'dotted': '点状虚线' }]
                        },
                        {
                            name: '圆角大小',
                            type: comType.NUMBER,
                            value: 'boxBorderRadius',
                            min: 0
                        },
                    ]
                }
            ]
        },
    ]
}
const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: "tab"
    },
    conf: {},
    confView: {
        selectDataSet: {
            name: '数据集',
            value: 'datasetSelectedId',
            default: [],
            show: true
        },
        xBinding: {
            name: '选项字段',
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
    },
    confView: {
        linkEvtTypes: [{ label: '点击事件', val: 'click' }],
    }
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./tabs'))
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default {
    componentName,
    cn_name,
    style,
    data,
    install,
    getStaticTemplateData,
    linkage
}
