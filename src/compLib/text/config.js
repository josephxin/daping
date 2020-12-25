import { comType } from '../../components/props/edit/EditCompReg'
import util from '../../util/util'
import Vue from 'vue'
import store from '@/store/store'


const name = 'text'
const type = 'text'
const cn_name = '文本框'
const version = 'v1.0'

// 组件名称
const componentName = 'textMain'

const style = {
    property: {
        //property：配置窗口伸缩，echarts组件内部对应缩放，base字段是最conf外层一维字段合集，其它字段皆为conf的key
        base: [
            'fontSize'
        ]
    },
    box: {
        top: 300,
        left: 300,
        width: 400,
        height: 50
    },
    conf: {
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        fontFamily: '',
        fontSize: 24,
        fontColor: '#fff',
        fontWeight: '',
        bgColor: '',
        bgPosition: 'center',
        bgImage: '',
        showLink: false,
        target: '_blank',
        link: ''
    },
    confView: [{
            name: '样式设置',
            type: comType.GROUP,
            children: [{
                    name: '内边距',
                    type: comType.GROUP,
                    fold: true,
                    children: [{
                            name: '上边距',
                            type: comType.NUMBER,
                            value: 'paddingTop',
                            min: 0
                        },
                        {
                            name: '右边距',
                            type: comType.NUMBER,
                            value: 'paddingRight',
                            min: 0
                        },
                        {
                            name: '下边距',
                            type: comType.NUMBER,
                            value: 'paddingBottom',
                            min: 0
                        },
                        {
                            name: '左边距',
                            type: comType.NUMBER,
                            value: 'paddingLeft',
                            min: 0
                        }
                    ]
                },
                {
                    name: '背景颜色',
                    type: comType.COLORALPHA,
                    value: 'bgColor',
                },
                {
                    name: '背景图片',
                    type: comType.BACKGROUNDIMAGEUPLOAD,
                    value: 'bgImage'
                },
                {
                    name: '背景图片位置',
                    type: comType.SELECT,
                    value: 'bgPosition',
                    range: [
                        { 'center': "中间" },
                        { 'top': "上方" },
                        { 'bottom': "下方" },
                        { 'left': "左方" },
                        { 'right': "右方" },
                        { 'left top': "左上方" },
                        { 'right top': "右上方" },
                        { 'left bottom': "左下方" },
                        { 'right bottom': "右下方" },
                    ],
                },
                {
                    type: comType.FONTFAMILY,
                    value: 'fontFamily'
                },
                {
                    name: '字号',
                    type: comType.NUMBER,
                    value: 'fontSize',
                    default: '12px'
                },
                {
                    name: '字体颜色',
                    type: comType.COLOR,
                    value: 'fontColor',
                    default: '#fff'
                },
                {
                    type: comType.FONTWEIGHT,
                    value: 'fontWeight'
                }
            ],
        },
        {
            name: '超链设置',
            type: comType.GROUP,
            show: true,
            showName: '开启',
            value: 'showLink',
            children: [{
                    name: '打开方式',
                    type: comType.SELECT,
                    value: 'target',
                    range: [{ '_blank': '新页签打开' }, { '_self': '当前页面打开' }]
                },
                {
                    name: '链接地址',
                    type: comType.TEXT,
                    value: 'link'
                }
            ]
        }
    ],
}
const data = {
        datasource: {
            type: 'static',
            tempCode: 'text'
        },
        confView: [{
            name: '标题值',
            fieldName: 'value', // 字段名称，这个是组件暴露的标准接口属性
            value: 'value',
            optional: true
        }],
        conf: {
            value: 'value'
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
    // 轮播
    // const carousel = {
    //     conf:{
    //         open:true,
    //         interval:2
    //     },
    //     confView:[]
    // }

function getStaticTemplateData() {
    return util.deepCopy(data)
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./main.vue'))
}

export default { name, type, cn_name, version, style, data, componentName, linkage, install, getStaticTemplateData }