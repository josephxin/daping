import Vue from 'vue'
import { comType } from '../../components/props/edit/EditCompReg'
const componentName = 'customImage'
const cn_name = '自定义图片'
const style = {
    box: {
        width: 400,
        height: 250,
        top: 300,
        left: 300
    },
    conf: {
        imageUrl: '',
        opacity: 1,
        showLink: false,
        target: '_blank',
        link: '',
        animationShow: false, //是否显示动画
        animationName: 'rotate', //动画类型
        animationDuration: 1, //动画持续时间
        animationTimingFunction: 'linear', //运动类型
        animationIterationCount: 0, //动画次数
        animationDirection: false, //是否轮流反向播放
    },
    confView: [
        {
            type: comType.IMAGEUPLOAD,
            name: '自定义图片',
            value: 'imageUrl'
        },
        {
            type: comType.NUMBER,
            name: '透明度',
            value: 'opacity',
            min: 0,
            max: 1,
            step: 0.1,
            default: 1
        },
        {
            name: '超链设置',
            type: comType.GROUP,
            show: true,
            showName: '开启',
            value: 'showLink',
            children: [
                {
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
        },
        {
            name: '动画配置',
            type: comType.GROUP,
            show: true,
            showName: '开启动画',
            default: false,
            value: 'animationShow',
            children: [{
                name: '动画效果',
                type: comType.SELECT,
                value: 'animationName',
                default: 'rotate',
                range: [{ rotate: 'rotate' }, { scale: 'scale' }, { 'top': 'top' }, { 'right': 'right' }, { bottom: 'bottom' }, { left: 'left' }]
            },
            {
                name: '动画时长',
                type: comType.NUMBER,
                value: 'animationDuration',
                default: 1
            },
            {
                name: '运动类型',
                type: comType.SELECT,
                value: 'animationTimingFunction',
                default: 'linear',
                range: [{ linear: 'linear' }, { 'ease': 'ease' }, { 'ease-in': 'ease-in' }, { 'ease-out': 'ease-out' }, { 'ease-in-out': 'ease-in-out' }]
            },
            {
                name: '运动次数(0为无限)',
                type: comType.NUMBER,
                value: 'animationIterationCount',
                default: 0
            },
            {
                name: '是否轮流反向播放',
                type: comType.BOOLEAN,
                value: 'animationDirection',
                default: false
            },
            ]
        }
    ]
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import('./Image'))
}

export default {
    componentName,
    cn_name,
    style,
    install
}