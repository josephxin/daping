import Vue from 'vue'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import { comType } from '@/components/props/edit/EditCompReg'
import util from "@/util/util";
const componentName = 'compScrollTable'
const cn_name = '可滚动表格'
const style = {
    box: {
        width: 800,
        height: 280,
        top: 300,
        left: 300
    },
    conf: {
        topPadding: 0,
        bottomPadding: 0,
        leftPadding: 10,
        rightPadding: 10,
        listHeight: 30,
        marginBottom: 0,
        fontSize: 12,
        fontColor: '#ffffff',
        bgColor: 'rgba(52, 134, 218, 1)',
        autoPlay: false, //自动滚动
        wait: false, //滚动是否停顿
        waitTime: 2500, //停顿间隔
        bgColors: [], //table表格每行颜色配置
        showHeader: true, //显示表头
        showIndex: false, //显示序号
        headerHeight: 40, //高度
        headerFontSize: 14, //字体大小
        headerFontWeight: 'normal', //字体粗细
        headerFontColor: '#fff', // 字体颜色
        headerBgColor: 'rgba(52, 134, 218, 1)', //背景颜色
        ranksChange: false, //行列转换
    },
    confView: [{
            name: '滚动配置',
            type: comType.GROUP,
            value: 'autoPlay',
            default: false,
            showName: '是否自动滚动',
            show: true,
            children: [{
                    name: '滚动停顿',
                    type: comType.BOOLEAN,
                    value: 'wait',
                    default: false
                },
                {
                    name: '停顿间隔（毫秒）',
                    type: comType.NUMBER,
                    value: 'waitTime',
                    default: 2500
                }
            ]
        },
        {
            name: '显示序号',
            type: comType.BOOLEAN,
            value: 'showIndex',
            default: false
        },
        {
            name: '表头设置',
            type: comType.GROUP,
            show: true,
            showName: '显示',
            value: 'showHeader',
            children: [{
                    name: '背景色',
                    type: comType.COLORALPHA,
                    value: 'headerBgColor',
                    default: 'rgba(52, 134, 218, 1)'
                },
                {
                    name: '高度',
                    type: comType.NUMBER,
                    value: 'headerHeight',
                    default: 40
                },
                {
                    name: '字体颜色',
                    type: comType.COLOR,
                    value: 'headerFontColor',
                    default: '#fff'
                },
                {
                    name: '字体大小',
                    type: comType.NUMBER,
                    value: 'headerFontSize',
                    default: 12
                },
                {
                    name: '字体粗细',
                    type: comType.SELECT,
                    value: 'headerFontWeight',
                    range: [{ 'normal': 'normal' }, { 'bold': 'bold' }, { 'bolder': 'bolder' }, { 'lighter': 'lighter' }, { 100: 100 }, { 200: 200 }, { 300: 300 }, { 400: 400 }, { 500: 500 }, { 600: 600 }, { 700: 700 }, { 800: 800 }, { 900: 900 }]
                }
            ]
        },
        {
            name: '列表行高',
            type: comType.NUMBER,
            value: 'listHeight'
        },
        {
            name: '列表间距',
            type: comType.NUMBER,
            value: 'marginBottom'
        },
        {
            name: '列表字体大小',
            type: comType.NUMBER,
            value: 'fontSize'
        },
        {
            name: '列表背景配置',
            type: comType.INLINEARRAY,
            value: 'bgColors',
            addOrDel: true,
            children: [{
                    name: '背景色',
                    type: comType.COLORALPHA,
                    value: 'bgColor',
                    default: 'rgba(52, 134, 218, 1)'
                },
                {
                    name: '字体颜色',
                    type: comType.COLOR,
                    value: 'fontColor',
                    default: '#fff'
                },
                {
                    name: '字体大小',
                    type: comType.NUMBER,
                    value: 'fontSize',
                    default: 12
                }
            ]
        },
        {
            name: '列表内边距',
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
        }
    ]
}
const data = {
        datasource: {
            type: DataSourceContext.STATIC,
            tempCode: "DataSet"
        },
        conf: {
            datasetMeta: [], //元数据集
            datasetSelectedId: '', //数据集id
            xAxisIds: [], //x轴所选数据集列表
        },
        confView: {
            selectDataSet: {
                name: '数据集',
                value: 'datasetSelectedId',
                default: [],
                show: true
            },
            xBinding: {
                name: '选择展示数据',
                value: 'xAxisIds',
                defalut: [],
                show: true,
            }
        }
    }
    // 交互
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
        import ('./table'))
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