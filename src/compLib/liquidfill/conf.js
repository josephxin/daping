import Vue from 'vue'
import {comType} from '../../components/props/edit/EditCompReg'
import {DataSourceContext} from '@/datamanager/DataManagerContext'
import util from "@/util/util";

const componentName = 'liquidFill'

const cn_name = '水滴图'

const style = {
    box: {
        width: 400,
        height: 200,
        top: 300,
        left: 300
    },
    conf: {
        actual: false,
        max: 1,
        unit: '',
        floorNum: 2,
        outlineWidth: 10,
        outlinePadding: 10,
        outlineColor: 'white',
        liquidColor: [{offset: 1, color: 'rgba(183,85,255, 1)'}, {offset: 0, color: 'rgba(183,85,255, 1)'}],
        direction: 'right',
        labelColor: 'white',
        labelFontSize: 16,
        labelFontFamily: 'Microsoft Yahei', //TODO 需要增加表单项
        labelfontBold: '', // 字体粗细

    },
    confView: [{
        name: '是否显示实际值',
        type: comType.BOOLEAN,
        value: 'actual',
        key: 'actual'
    }, {
        name: '计量单位',
        type: comType.TEXT,
        value: 'unit',
        key: 'unit',
        rules: function (p) {
            return p.actual
        }
    }, {
        name: '值域最大值',
        type: comType.NUMBER,
        value: 'max'
    },
        {
            name: '百分数显示',
            type: comType.SELECT,
            range: [{0: '整数'}, {1: '一位'}, {2: '两位'}],
            value: 'floorNum'
        }, {
            name: '动画方向',
            type: comType.SELECT,
            range: [{'left': '从右向左'}, {'right': '从左向右'}],
            value: 'direction'
        },
        {
            name: '水球颜色',
            type: comType.INLINEARRAY,
            addOrDel: true,
            value: 'liquidColor',
            children: [{
                name: '偏移',
                type: comType.NUMBER,
                value: 'offset',
                default: 0,
                step: 0.1,
                min: 0,
                max: 1
            },
                {
                    name: '颜色',
                    type: comType.COLORALPHA,
                    value: 'color',
                    default: 'rgba(183,85,255, 1)'
                }
            ]
        },
        {
            name: '外边框',
            type: comType.GROUP,
            children: [{
                name: '宽度',
                type: comType.NUMBER,
                value: 'outlineWidth'
            },
                {
                    name: '内部距离',
                    type: comType.NUMBER,
                    value: 'outlinePadding'
                },
                {
                    name: '颜色',
                    type: comType.COLOR,
                    value: 'outlineColor'
                }
            ]
        },
        {
            name: '文字',
            type: comType.GROUP,
            children: [{
                name: '字号',
                type: comType.NUMBER,
                value: 'labelFontSize'
            },
                {
                    name: '字体',
                    type: comType.FONTFAMILY,
                    value: 'labelFontFamily'
                },
                {
                    name: '颜色',
                    type: comType.COLOR,
                    value: 'labelColor'
                },
                {
                    name: '粗细',
                    type: comType.FONTWEIGHT,
                    value: 'labelfontBold'
                }
            ]
        },
    ]
}

const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: "SingleData"
    },
    conf: {
        name: "name", //[必设项]分类
        value: "value", //[必设项]值
        metaData: [{
            datasetId: 'static',
            columnName: 'value',
            columnDesc: '百分比',
            columnDefDire: 1
        }, {
            datasetId: 'static',
            columnName: 'name',
            columnDesc: '名称',
            columnDefDire: 2
        }]
    },
    confView: [{
        name: '名称',
        fieldName: 'name',
        value: 'name',
        optional: false
    }, {
        name: '值',
        fieldName: 'value',
        value: 'value',
        optional: false
    }
    ]
}

const linkage = {
    conf: {
        linkRevEvents: [],
        linkEvents: [],
    },
    confView: {
        linkEvtTypes: [{label: '点击事件', val: 'click'}],
    }
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

function install(isDesign) {
    // 注册组件
    Vue.component(componentName, () =>
        import ('./LiquidFill'));
}

export default {
    componentName,
    cn_name,
    style,
    data,
    linkage,
    getStaticTemplateData,
    install
}
