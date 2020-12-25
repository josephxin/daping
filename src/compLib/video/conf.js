import { comType } from '../../components/props/edit/EditCompReg'
import util from '../../util/util'
import Vue from 'vue'
const name = 'video'
const type = 'video'
const cn_name = '视频'
const version = 'v1.0'

// 组件名称
const componentName = 'videoMain'

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
            height: 300
        },
        conf: {
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            showControls: true, //显示控制标签
            autoPlay: true, //自动播放
            loop: true, //开启循环播放
        },
        confView: [{
                name: '自动播放',
                type: comType.BOOLEAN,
                value: 'autoPlay',
                default: true
            },
            {
                name: '显示控制标签',
                type: comType.BOOLEAN,
                value: 'showControls',
                default: true
            },
            {
                name: '循环播放',
                type: comType.BOOLEAN,
                value: 'loop',
                default: true
            },
            {
                name: '内边距',
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
        ],
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
const data = {
    datasource: {
        type: 'static',
        tempCode: 'url'
    }
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./video.vue'))
}

export default { name, type, cn_name, version, data, style, componentName, linkage, install, getStaticTemplateData }