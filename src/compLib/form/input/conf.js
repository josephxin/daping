import Vue from "vue";
import util from "@/util/util";
import { comType } from "@/components/props/edit/EditCompReg";
import { DataSourceContext } from '@/datamanager/DataManagerContext'
const type = 'form';
const componentName = 'formInput';
const cn_name = '输入框';

const style = {
    box: {
        width: 200,
        height: 40,
        top: 300,
        left: 300
    },
    conf: {
        //属性配置
        value: '',
        placeholder: '请输入内容',
        maxlength: 200,
        showWordLimit: false,
        clearable: false,
        disabled: false,
        //前缀
        prefix: false,
        prefixIcon: '',
        prefixWidth: 0,
        prefixHeight: 0,
        //后缀
        suffix: false,
        suffixIcon: '',
        suffixWidth: 0,
        suffixHeight: 0,

        //样式配置
        bgColor: '#fff',

        defaultBorder: {
            borderType: 'solid',
            borderWidth: 1,
            borderColor: '#DCDFE6',
            borderRadius: 4,
        },
        hoverBorder: {
            borderType: 'solid',
            borderWidth: 1,
            borderColor: '#DCDFE6',
            borderRadius: 4,
        },

        fontFamily: 'Microsoft Yahei',
        fontWeight: '',
        fontSize: 14,
        fontColor: '#606266',
    },
    confView: [
        {
            name: "属性配置",
            type: comType.GROUP,
            fold: true,
            children: [
                {
                    name: "绑定值",
                    type: comType.TEXT,
                    value: "value",
                },
                {
                    name: "placeholder",
                    type: comType.TEXT,
                    value: "placeholder",
                },
                {
                    name: "最大输入长度",
                    type: comType.NUMBER,
                    value: "maxlength",
                    min: 0
                },
                {
                    name: "字数统计",
                    type: comType.BOOLEAN,
                    value: "showWordLimit",
                },
                {
                    name: "是否可清空",
                    type: comType.BOOLEAN,
                    value: "clearable",
                },
                {
                    name: "是否禁用",
                    type: comType.BOOLEAN,
                    value: "disabled",
                },
                {
                    name: "前缀",
                    type: comType.GROUP,
                    show: true,
                    showName: '开启',
                    value: 'prefix',
                    fold: false,
                    children: [
                        {
                            name: "上传图片",
                            type: comType.IMAGEUPLOAD,
                            value: "prefixIcon",
                        },
                        {
                            name: "宽度",
                            type: comType.NUMBER,
                            value: "prefixWidth",
                            min: 0
                        },
                        {
                            name: "高度",
                            type: comType.NUMBER,
                            value: "prefixHeight",
                            min: 0
                        },
                    ]
                },
                {
                    name: "后缀",
                    type: comType.GROUP,
                    show: true,
                    showName: '开启',
                    value: 'suffix',
                    fold: false,
                    children: [
                        {
                            name: "上传图片",
                            type: comType.IMAGEUPLOAD,
                            value: "suffixIcon",
                        },
                        {
                            name: "宽度",
                            type: comType.NUMBER,
                            value: "suffixWidth",
                            min: 0
                        },
                        {
                            name: "高度",
                            type: comType.NUMBER,
                            value: "suffixHeight",
                            min: 0
                        },
                    ]
                },
            ]
        },
        {
            name: "样式配置",
            type: comType.GROUP,
            fold: true,
            children: [
                {
                    name: '背景颜色',
                    type: comType.COLORALPHA,
                    value: 'bgColor',
                },
                {
                    name: "普通边框样式",
                    type: comType.BORDER,
                    value: 'defaultBorder',
                    fold: true,
                },
                {
                    name: "悬浮边框样式",
                    type: comType.BORDER,
                    value: 'hoverBorder',
                    fold: true,
                },
                {
                    name: '文本样式',
                    type: comType.FONT,
                    fold: true
                }
            ]
        }
    ]
}

const data = {
    datasource: {
        type: DataSourceContext.STATIC,
        tempCode: "text"
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
        linkEvtTypes: [{ label: 'change事件', val: 'change' }],
    }
}

function install() {
    Vue.component(componentName, () => import('./input.vue'));
}

function getStaticTemplateData() {
    return util.deepCopy(data)
}

export default { type, componentName, cn_name, style, data, linkage, install, getStaticTemplateData }
