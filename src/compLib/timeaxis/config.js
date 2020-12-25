import {comType} from '../../components/props/edit/EditCompReg'
import util from '../../util/util'
import Vue from 'vue'

const name = 'timeAxis';
const type = 'timeAxis';
const cn_name = '时间轴';
const version = 'v1.0';

// 组件名称
const componentName = 'timeAxis';

const style = {
    confView: [{
        name: '背景色',
        type: comType.COLOR,
        value: 'bgColor'
    },
        {
            name: '左右边距',
            type: comType.NUMBER,
            value: 'spacing'
        },

        {
            type: comType.GROUP,
            name: '节点',
            children: [{
                name: '类型',
                type: comType.SELECT,
                value: 'type',
                range: [
                    {'1': '数值型'},
                    {'2': '条目型'},
                    {'3': '时间型'}
                ]
            },
                {
                    name: '形状',
                    type: comType.SELECT,
                    value: 'shape',
                    range: [
                        {'1': '圆形'},
                        {'2': '矩形'},
                        {'3': '菱形'},
                        {'4': '上三角'},
                        {'5': '下三角'}
                    ]
                },
                {
                    name: '大小',
                    type: comType.NUMBER,
                    value: 'size'
                },
                {
                    name: '填充色',
                    type: comType.COLOR,
                    value: 'fillColor'
                },
                {
                    name: '选中填充色',
                    type: comType.COLOR,
                    value: 'selectColor'
                }
            ]
        },

        {
            children: [{
                name: '右偏移',
                type: comType.NUMBER,
                value: 'rightOffset'
            },
                {
                    name: '下偏移',
                    type: comType.NUMBER,
                    value: 'bottomOffset'
                },
                {
                    name: '字体',
                    type: comType.FONTFAMILY,
                    value: 'fontFamily'
                },
                {
                    name: '字号',
                    type: comType.TEXT,
                    value: 'fontSize'
                },
                {
                    name: '字体颜色',
                    type: comType.COLOR,
                    value: 'fontColor'
                },
                {
                    name: '选中字号',
                    type: comType.TEXT,
                    value: 'selectFontSize'
                },
                {
                    name: '选中字体颜色',
                    type: comType.COLOR,
                    value: 'selectFontColor'
                }
            ],
            type: comType.GROUP,
            name: '标签'

        },

        {
            name: '背景',
            type: comType.GROUP,
            children: [{
                name: '宽度',
                type: comType.NUMBER,
                value: 'lineHeight'
            },
                {
                    name: '默认颜色',
                    type: comType.COLOR,
                    value: 'bgDefaultColor'
                },
                {
                    name: '选中颜色',
                    type: comType.COLOR,
                    value: 'bgSelectColor'
                }
            ]
        }

    ],

    conf: {
        bgColor: '',

        spacing: 50,

        type: '1',
        shape: '1',
        size: 5,
        fillColor: 'rgb(6,242,236)',
        selectColor: 'rgb(6,242,236)',

        fontFamily: 'Microsoft Yahei',
        rightOffset: -20,
        bottomOffset: 25,
        fontSize: '12px',
        fontColor: '#fff',
        selectFontSize: '12px',
        selectFontColor: '#fff',

        lineHeight: 4,
        bgDefaultColor: 'rgb(6,242,236)',
        bgSelectColor: 'rgb(241,241,236)'
    },

    box: {
        top: 300,
        left: 300,
        width: 400,
        height: 120
    }
};

const data = {
    datasource: {
        type: "static",
        tempCode: "timeAxis"
    },
    confView: [{
        name: '名称',
        fieldName: 'name', // 字段名称，这个是组件暴露的标准接口属性
        value: 'name',
        optional: false
    },
        {
            name: '值',
            fieldName: 'value', // 字段名称，这个是组件暴露的标准接口属性
            value: 'value',
            optional: false
        }
    ],
    conf: {
        value: 'value',
        name: 'name',
        metaData: [{
            datasetId: 'static',
            columnName: 'year',
            columnDesc: '年',
            columnDefDire: 2
        }]
    }

};

// 联动
const linkage = {
    conf: {
        linkRevEvents: [],
        linkEvents: [],
        cycleEvents: {},
    },
    confView: {
        linkEvtTypes: [{label: '点击事件', val: 'click'}],
        cycleConf: {
            enable: true,
            cycleType: [{label: '序列', value: 'axis'}]
        }
    }
}

function getStaticTemplateData() {
    return util.deepCopy(data);
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./main.vue'));
}

export default {
    name,
    type,
    cn_name,
    version,
    style,
    data,
    componentName,
    linkage,
    install,
    getStaticTemplateData,
}
