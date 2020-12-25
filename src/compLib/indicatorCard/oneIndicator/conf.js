import util from "@/util/util";
import Vue from "vue";
import { comType } from "@/components/props/edit/EditCompReg";
import { DataSourceContext } from '@/datamanager/DataManagerContext'
const componentName = 'oneIndicator';
const type = 'indicator';
const cn_name = '指标卡-单指标';

const style = {
    box: {
        width: 448,
        height: 525,
        top: 300,
        left: 300
    },
    conf: {
        //字段映射配置
        fieldMap: {
            id: "",
            name: '',
            value: '',
            unit: '',
            //icon: '',
            //mark: ''
        },
        //高级关联配置
        linkComps: [],
        //盒子配置
        backgroundColor: '',//指标卡组的背景色
        padding: 0,
        boxBorder: {
            borderType: 'solid',
            borderWidth: 0,
            borderColor: '#000',
            borderRadius: 0,
        },
        //分页配置
        isPaging: false, //是否开启分页
        pageSize: 6, //每页几条数据，至少一条
        pageSizeDisabled: true,//false为可用；true为不可用
        direction: "horizontal", //走马灯展示的方向，horizontal/vertical
        arrow: "hover", //切换箭头的显示时机，always/hover/never
        arrowDisabled: true,
        loop: true, //是否循环显示
        autoplay: false, //是否自动切换
        interval: 3000, //自动切换的时间间隔，单位为毫秒；设置最小值1000，步数为500
        //默认状态配置
        defaultMargin: 0,
        defaultWidth: 200,
        defaultHeight: 90,
        defaultBackgroundColor: '',//指标卡的背景色
        defaultBackgroundImage: '',
        defaultBorder: {
            borderType: 'solid',
            borderWidth: 0,
            borderColor: '#000',
            borderRadius: 0,
        },
        defaultName: {
            fontFamily: 'Microsoft Yahei',
            fontWeight: '',
            fontSize: 14,
            fontColor: '#a8bad5'
        },
        defaultValue: {
            fontFamily: 'Microsoft Yahei',
            fontWeight: '',
            fontSize: 24,
            fontColor: '#fff'
        },
        defaultUnit: {
            fontFamily: 'Microsoft Yahei',
            fontWeight: '',
            fontSize: 14,
            fontColor: '#a8bad5'
        },
        defaultIcon: {
            width: 0,
            height: 0,
            iconData: {

            },
        },
        //选中状态配置
        activeFlag: false,//指标卡选中状态开关，默认不开启选中
        activeWidth: 200,
        activeHeight: 90,
        activeBackgroundColor: '',//指标卡选中时的背景色
        activeBackgroundImage: '',
        activeBorder: {
            borderType: 'solid',
            borderWidth: 0,
            borderColor: '#000',
            borderRadius: 0,
        },
        activeName: {
            fontFamily: 'Microsoft Yahei',
            fontWeight: '',
            fontSize: 14,
            fontColor: '#a8bad5'
        },
        activeValue: {
            fontFamily: 'Microsoft Yahei',
            fontWeight: '',
            fontSize: 24,
            fontColor: '#fff'
        },
        activeUnit: {
            fontFamily: 'Microsoft Yahei',
            fontWeight: '',
            fontSize: 14,
            fontColor: '#a8bad5'
        },
        activeIcon: {
            flag: false,//是否开启选中状态的图标
            width: 0,
            height: 0,
            iconData: {

            },
        },
    },
    confView: [
        {
            name: '字段映射配置',
            type: comType.FIELDMAP,
            value: 'fieldMap',
            fold: true,
            classify: 1
        },
        {
            name: '高级关联配置',
            type: comType.LINKCOMPINDICATOR,
            value: 'linkComps'
        },
        {
            name: '盒子配置',
            type: comType.GROUP,
            fold: false,
            children: [
                {
                    name: '背景色',
                    type: comType.COLORALPHA,
                    value: 'backgroundColor'
                }, {
                    name: '内边距',
                    type: comType.NUMBER,
                    value: 'padding',
                    min: 0
                }, {
                    name: '边框配置',
                    type: comType.BORDER,
                    value: 'boxBorder',
                    fold: false
                }
            ]
        },
        {
            name: '分页配置',
            type: comType.GROUP,
            fold: false,
            value: 'isPaging',
            show: true,
            showName: '开启',
            children: [
                {
                    name: '页大小',
                    type: comType.NUMBER,
                    value: 'pageSize',
                    min: 1,
                    disabled: 'pageSizeDisabled'
                },
                {
                    name: '指示器方向',
                    type: comType.SELECT,
                    value: 'direction',
                    range: [
                        { horizontal: "水平" },
                        { vertical: "垂直" },
                    ]
                },
                {
                    name: '切换箭头',
                    type: comType.SELECT,
                    value: 'arrow',
                    range: [
                        { hover: "鼠标hover" },
                        { always: "一直显示" },
                        { never: "一直隐藏" },
                    ],
                    disabled: 'arrowDisabled'
                },
                {
                    name: '循环显示',
                    type: comType.BOOLEAN,
                    value: 'loop',
                },
                {
                    name: '自动切换',
                    type: comType.BOOLEAN,
                    value: 'autoplay',
                },
                {
                    name: '时间间隔',
                    type: comType.NUMBER,
                    value: 'interval',
                    min: 1000,
                    step: 500
                },
            ]
        },
        {
            name: '默认状态配置',
            type: comType.GROUP,
            fold: false,
            children: [
                {
                    name: '外边距',
                    type: comType.NUMBER,
                    value: 'defaultMargin',
                    min: 0
                }, {
                    name: '宽度',
                    type: comType.NUMBER,
                    value: 'defaultWidth',
                    min: 0
                }, {
                    name: '高度',
                    type: comType.NUMBER,
                    value: 'defaultHeight',
                    min: 0
                }, {
                    name: '背景色',
                    type: comType.COLORALPHA,
                    value: 'defaultBackgroundColor'
                }, {
                    name: '背景图片',
                    type: comType.BACKGROUNDIMAGEUPLOAD,
                    value: 'defaultBackgroundImage'
                }, {
                    name: '边框配置',
                    type: comType.BORDER,
                    value: 'defaultBorder',
                    fold: false
                }, {
                    name: '指标名配置',
                    type: comType.FONT,
                    value: 'defaultName',
                    fold: false
                }, {
                    name: '指标值配置',
                    type: comType.FONT,
                    value: 'defaultValue',
                    fold: false
                }, {
                    name: '单位配置',
                    type: comType.FONT,
                    value: 'defaultUnit',
                    fold: false
                }, {
                    name: '图标配置',
                    type: comType.ICON,
                    value: 'defaultIcon',
                    fold: false
                }
            ]
        },
        {
            name: '选中状态配置',
            type: comType.GROUP,
            fold: false,
            value: 'activeFlag',
            show: true,
            showName: '开启',
            children: [
                {
                    name: '宽度',
                    type: comType.NUMBER,
                    value: 'activeWidth',
                    min: 0
                }, {
                    name: '高度',
                    type: comType.NUMBER,
                    value: 'activeHeight',
                    min: 0
                }, {
                    name: '背景色',
                    type: comType.COLORALPHA,
                    value: 'activeBackgroundColor'
                }, {
                    name: '背景图片',
                    type: comType.BACKGROUNDIMAGEUPLOAD,
                    value: 'activeBackgroundImage'
                }, {
                    name: '边框配置',
                    type: comType.BORDER,
                    value: 'activeBorder',
                    fold: false
                }, {
                    name: '指标名配置',
                    type: comType.FONT,
                    value: 'activeName',
                    fold: false
                }, {
                    name: '指标值配置',
                    type: comType.FONT,
                    value: 'activeValue',
                    fold: false
                }, {
                    name: '单位配置',
                    type: comType.FONT,
                    value: 'activeUnit',
                    fold: false
                }, {
                    name: '图标配置',
                    type: comType.ICON,
                    value: 'activeIcon',
                    fold: false,
                    show: true,
                    showName: '开启',
                }
            ]
        }
    ]
}

const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: "indicatorOne"
    },
    conf: {},
    confView: {
        selectDataSet: {
            name: '数据集',
        },
        xBinding: {
            name: '数据选择',
        },
    }
};

const linkage = {
    conf: {
        linkRevEvents: [],//接收事件
        linkEvents: [],//触发事件
    },
    confView: {
        linkEvtTypes: [{ label: '点击事件', val: 'click' }],
    }
}

function install() {
    Vue.component(componentName, () => import('./oneIndicator.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default { componentName, type, cn_name, style, data, linkage, getStaticTemplateData, install }
