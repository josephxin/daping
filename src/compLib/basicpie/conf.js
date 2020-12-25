import Vue from 'vue'
import util from '@/util/util'
import {comType} from '../../components/props/edit/EditCompReg'

const componentName = 'basicpie';

const cn_name = '基础饼图';

const style = {
    box: {
        width: 600,
        height: 300,
        top: 300,
        left: 300
    },
    property: {
        //property：配置窗口伸缩，echarts组件内部对应缩放，base字段是最conf外层一维字段合集，其它字段皆为conf的key
        base: [
            'labelFontSize',
            'labelLineLength',
            'labelLineLength2'
        ],
        legend: [
            'fontSize',
            'iconWidth',
            'iconHeight'
        ]
    },
    conf: {
        backgroundColor: "rgba(0,0,0,0)",

        legend: {
            isShow: false, //是否显示

            fontColor: '#ffffff', // 字体颜色
            fontSize: 16,  // 字体大小
            fontBold: '',  // 字体粗细
            fontFamily: 'Microsoft Yahei',//TODO 需要增加表单项
            icon: 'rect',
            iconWidth: 25,
            iconHeight: 14,
            position: 'right-top', // 位置
            layout: 'horizontal' // 布局
        },

        series: [],

        lineColor: 'black',
        lineWidth: 0,
        lineType: 'solid',

        labelShow: true,
        labelFontSize: 16,
        labelPosition: 'outside',
        labelFontFamily: 'Microsoft Yahei',//TODO 需要增加表单项
        labelFormat: '{d}%',
        labelLineLength2: 15,
        labelLineLength: 20,
        isClockwise: true,
        selectOffset: 10,
        innerRadius: 0,
        outterRadius: '70%',
        angle: 90
    },
    confView: [
        {
            type: comType.COLOR,
            name: '背景色',
            value: "backgroundColor",
            default: '文本示例数据'
        },
        {
            name: '顺时针方向',
            type: comType.BOOLEAN,
            value: 'isClockwise'
        },

        {
            name: '选中的位移',
            type: comType.NUMBER,
            value: 'selectOffset'
        },

        {
            type: comType.LEGEND,
            name: '图例',
            value: 'legend'
        },

        {
            name: '边线样式',
            type: comType.GROUP,
            children: [
                {
                    name: '颜色',
                    type: comType.COLOR,
                    value: 'lineColor'
                },
                {
                    name: '宽度',
                    type: comType.NUMBER,
                    value: 'lineWidth'
                },
                {
                    name: '类型',
                    type: comType.LINETYPE,
                    value: 'lineType'
                }

            ]
        },
        {
            name: '标签样式',
            type: comType.GROUP,
            show: true,
            value: 'labelShow',
            children: [
                {
                    name: '字号',
                    type: comType.NUMBER,
                    value: 'labelFontSize'
                },
                {
                    name: '位置',
                    type: comType.SELECT,
                    value: 'labelPosition',
                    range: [
                        {'outside': '外部'},
                        {'inside': '内部'},
                        {'center': '中心'}
                    ]
                },
                {
                    name: '格式',
                    type: comType.TEXT,
                    value: 'labelFormat',
                    help: '{a}：系列名;' +
                        '{b}：数据名;<br/>' +
                        '{c}：数据值;' +
                        '{d}：百分比;<br/>'
                }
            ]
        },
        {
            name: '极轴',
            type: comType.GROUP,
            children: [
                {
                    name: '内半径',
                    type: comType.TEXT,
                    value: 'innerRadius'
                },
                {
                    name: '外半径',
                    type: comType.TEXT,
                    value: 'outterRadius'
                }
            ]
        },
        {
            name: '角度轴',
            type: comType.GROUP,
            children: [
                {
                    name: '偏移角度',
                    type: comType.NUMBER,
                    value: 'angle',
                    min: -360,
                    max: 360,
                    step: 10
                }
            ]
        },

        {
            name: '数据系列',
            type: comType.ARRAY,
            addOrDel: true,
            value: 'series',
            itemName: '系列<%i+1%>',
            children: [
                {
                    name: '颜色',
                    type: comType.COLOR,
                    value: 'color'
                }
            ]
        }
    ]
};

const data = {
    datasource: {
        type: "static",
        tempCode: "DataTemp1D"
    },
    conf: {
        value: "value",//[必设项]值
        legend: "name",//[可选项]图例代码，用以区分不同系列数据
    },
    confView: [{
        name: '值',
        fieldName: 'value',
        value: 'value',
        optional: true
    },
        {
            name: '图例',
            fieldName: 'legend',
            value: 'name',
            optional: true
        }]
}

const linkage = {
    conf: {
        linkRevEvents: [],
        linkEvents: [],
        cycleEvents: {}
    },
    confView: {
        linkEvtTypes: [{label: '点击事件', val: 'click'}],
        cycleConf: {
            enable: true,
            cycleType: [{label: '系列', value: 'series'}]
        }
    }
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () => import('./BasicPie'));
}

function getStaticTemplateData() {
    return util.deepCopy(data);
}

export default {
    componentName,
    cn_name,
    style,
    data,
    linkage,
    install,
    getStaticTemplateData
}
