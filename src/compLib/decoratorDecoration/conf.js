import Vue from 'vue'
import { comType } from '../../components/props/edit/EditCompReg'

const componentName = 'decoratorDecoration'
const cn_name = '装饰器'
const style = {
    box: {
        width: 600,
        height: 300,
        top: 300,
        left: 300
    },
    conf: {
        baseDecorationType: 'dv-decoration-1',
        baseDecorationTitle: '',
        baseDecorationContent: '',
        colors: [],
        reverse: false
    },
    confView: [{
            type: comType.GROUP,
            name: '基本配置',
            value: 'base',
            children: [{
                    name: '装饰器类型',
                    type: comType.SELECT,
                    value: 'baseDecorationType',
                    range: [
                        { 'dv-decoration-1': '装饰器1' }, { 'dv-decoration-2': '装饰器2' },
                        { 'dv-decoration-3': '装饰器3' }, { 'dv-decoration-4': '装饰器4' },
                        { 'dv-decoration-5': '装饰器5' }, { 'dv-decoration-6': '装饰器6' },
                        { 'dv-decoration-7': '装饰器7' }, { 'dv-decoration-8': '装饰器8' },
                        { 'dv-decoration-9': '装饰器9' }, { 'dv-decoration-10': '装饰器10' },
                        { 'dv-decoration-11': '装饰器11' }
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