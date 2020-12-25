import Vue from 'vue'
import { comType } from '@/components/props/edit/EditCompReg'

const componentName = 'compContainer'
const cn_name = '容器'

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
        backgroundImage: '',
        changeWay: 'normal', //容器的切换方式 noraml(普通) caroursel(走马灯)
        direction: 'horizontal', //方向
        autoPlay: false, //自动切换
        interval: 5000, //自动切换间隔
    },
    confView: [{
            type: comType.COLORALPHA,
            name: '背景色',
            value: 'backgroundColor'
        },
        {
            type: comType.IMAGEUPLOAD,
            name: '背景图',
            value: 'backgroundImage'
        },
        {
            name: '层切换方式',
            type: comType.SELECT,
            value: 'changeWay',
            range: [{ normal: '普通' }, { caroursel: '动画' }]
        },
        {
            name: '切换方向',
            type: comType.SELECT,
            value: 'direction',
            range: [{ 'horizontal': '水平' }, { 'vertical': '垂直' }]
        },
        {
            type: comType.GROUP,
            name: '容器层自动切换',
            show: true,
            showName: '开启',
            value: 'autoPlay',
            children: [{
                name: '切换间隔',
                type: comType.NUMBER,
                value: 'interval'
            }]
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