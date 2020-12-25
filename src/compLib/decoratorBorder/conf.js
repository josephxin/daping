import Vue from 'vue'
import { comType } from '../../components/props/edit/EditCompReg'

const componentName = 'decoratorBorder'
const cn_name = '装饰边框'
const style = {
    box: {
        width: 600,
        height: 300,
        top: 300,
        left: 300
    },
    conf: {
        baseBorderType: 'dv-border-Box-1',
        baseBorderTitle: '',
        baseBorderContent: '',
        colors: [],
        reverse: false
    },
    confView: [{
            type: comType.GROUP,
            name: '基本配置',
            value: 'base',
            children: [{
                    name: '边框类型',
                    type: comType.SELECT,
                    value: 'baseBorderType',
                    range: [
                        { 'dv-border-Box-1': '边框1' }, { 'dv-border-Box-2': '边框2' },
                        { 'dv-border-Box-3': '边框3' }, { 'dv-border-Box-4': '边框4' },
                        { 'dv-border-Box-5': '边框5' }, { 'dv-border-Box-6': '边框6' },
                        { 'dv-border-Box-7': '边框7' }, { 'dv-border-Box-8': '边框8' },
                        { 'dv-border-Box-9': '边框9' }, { 'dv-border-Box-10': '边框10' },
                        { 'dv-border-Box-11': '边框11' }, { 'dv-border-Box-12': '边框12' },
                        { 'dv-border-Box-13': '边框13' }, { 'dv-border-Box-14': '文字边框' },
                        { 'dv-border-Box-15': 'gis边框' }
                    ]
                },
                {
                    type: comType.COLORRAMP,
                    name: '配色',
                    value: 'colors',
                    mode: 'hex'
                },
                {
                    type: comType.BOOLEAN,
                    name: '是否反转',
                    value: 'reverse',
                    default: false
                }
            ]
        },

    ]
}
const data = {}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./index'))
}

export default {
    componentName,
    cn_name,
    style,
    data,
    install
}