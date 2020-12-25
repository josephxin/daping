import Vue from 'vue'
import { comType } from '@/components/props/edit/EditCompReg'

const componentName = 'containerDrill'
const cn_name = '钻取容器'

const style = {
    box: {
        width: 800,
        height: 600,
        top: 300,
        left: 300
    },
    layer: [{
        id: 'layer0',
        name: '层1',
        type: 'layer'
    }],
    conf: {
        backgroundColor: 'rgba(6,35,65,0.8)',
        backBtnPosition: 'topLeft', //返回按钮位置
        backBtnBackgroundColor: '#00e5ff',
        backBtnColor: '#333333',
        backBtnFontSize: 12,
        backBtnText: '返回上一级'
    },
    confView: [{
            type: comType.COLORALPHA,
            name: '背景色',
            value: 'backgroundColor'
        },
        {
            name: '返回按钮配置',
            type: comType.GROUP,
            children: [{
                    name: '位置',
                    type: comType.SELECT,
                    value: 'backBtnPosition',
                    default: 'topLeft',
                    range: [{ 'topLeft': '上左' }, { 'topCenter': '上中' }, { 'topRight': '上右' }]
                },
                {
                    type: comType.COLORALPHA,
                    name: '背景色',
                    value: 'backBtnBackgroundColor',
                    default: '#fff'
                },
                {
                    type: comType.TEXT,
                    name: '文字',
                    value: 'backBtnText',
                    default: '返回上一级'
                },
                {
                    type: comType.COLORALPHA,
                    name: '字体颜色',
                    value: 'backBtnColor',
                    default: '#333'
                },
                {
                    type: comType.NUMBER,
                    name: '字体大小',
                    value: 'backBtnFontSize',
                    default: 12
                },
            ]
        }
    ]
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./index'))
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
export default {
    componentName,
    cn_name,
    style,
    install,
    linkage
}