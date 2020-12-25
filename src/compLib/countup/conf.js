import Vue from 'vue'
import { DataSourceContext } from '@/datamanager/DataManagerContext'
import { comType } from '../../components/props/edit/EditCompReg'
import util from '../../util/util'

const componentName = 'countup'

const cn_name = '翻牌器'

const style = {
    property: {
        //property：配置窗口伸缩，echarts组件内部对应缩放，base字段是最conf外层一维字段合集，其它字段皆为conf的key
        base: [
            'numFontSize',
            'beforeFontSize',
            'affterFontSize'
        ]
    },
    box: {
        width: 300,
        height: 80,
        top: 300,
        left: 300
    },
    conf: {
        fontAlign: "left",
        numFontSize: 25,
        numFontFamily: 'Microsoft Yahei',
        numColor: '#fff',
        numfontBold: '',
        Separator: ',',
        Duration: 1,
        beforeText: '',
        beforeFontSize: 24,
        beforeFontFamily: 'Microsoft Yahei',
        beforeColor: '#fff',
        beforefontBold: 'normal',
        beforeMargin: 5,

        affterMargin: 5,
        affterText: '',
        affterFontSize: 24,
        affterFontFamily: 'Microsoft Yahei',
        affterColor: '#fff',
        affterfontBold: 'normal'

    },
    confView: [{
        name: '对其方式',
        type: comType.SELECT,
        range: [{ 'left': '左对齐' }, { 'center': '居中对齐' }, { 'right': '右对齐' }],
        value: 'fontAlign'
    },
    {
        name: '数字',
        type: comType.GROUP,
        children: [{
            name: '字号',
            type: comType.NUMBER,
            value: 'numFontSize',
            default: 25,
            max: 25
        },
        {
            name: '字体',
            type: comType.FONTFAMILY,
            value: 'numFontFamily'
        },
        {
            name: '颜色',
            type: comType.COLOR,
            value: 'numColor'
        },
        {
            name: '粗细',
            type: comType.FONTWEIGHT,
            value: 'numfontBold'
        },
        {
            name: '分隔符',
            type: comType.TEXT,
            value: 'Separator'
        },
        {
            name: '动画时长(秒)',
            type: comType.NUMBER,
            value: 'Duration'
        }
        ]
    },
    {
        name: '前缀',
        type: comType.GROUP,
        children: [{
            name: '内容',
            type: comType.TEXT,
            value: 'beforeText'
        },
        {
            name: '间距',
            type: comType.NUMBER,
            value: 'beforeMargin'
        },
        {
            name: '字号',
            type: comType.NUMBER,
            value: 'beforeFontSize'
        },
        {
            name: '字体',
            type: comType.FONTFAMILY,
            value: 'beforeFontFamily'
        },
        {
            name: '颜色',
            type: comType.COLOR,
            value: 'beforeColor'
        },
        {
            name: '粗细',
            type: comType.FONTWEIGHT,
            value: 'beforefontBold'
        }
        ]
    },
    {
        name: '后缀',
        type: comType.GROUP,
        children: [{
            name: '内容',
            type: comType.TEXT,
            value: 'affterText'
        }, {
            name: '字号',
            type: comType.NUMBER,
            max: 16,
            value: 'affterFontSize'
        },
        {
            name: '间距',
            type: comType.NUMBER,
            value: 'beforeMargin'
        },
        {
            name: '字体',
            type: comType.FONTFAMILY,
            value: 'affterFontFamily'
        },
        {
            name: '颜色',
            type: comType.COLOR,
            value: 'affterColor'
        },
        {
            name: '粗细',
            type: comType.FONTWEIGHT,
            value: 'affterfontBold'
        }
        ]
    }
    ]
}

const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: "SingleData"
    },
    conf: {
        value: "value", //[必设项]值
    },
    confView: [{
        name: '值',
        fieldName: 'value',
        value: 'value',
        optional: false
    }]
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import('./CountUp'));
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
    getStaticTemplateData
}
