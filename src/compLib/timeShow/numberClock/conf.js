import util from "@/util/util";
import Vue from "vue";
import { comType } from "@/components/props/edit/EditCompReg";
import { DataSourceContext } from '@/datamanager/DataManagerContext'
const type = 'timeShow';
const componentName = 'numberClock';
const cn_name = '数字时钟';

const style = {
    box: {
        width: 200,
        height: 20,
        top: 300,
        left: 300
    },
    conf: {
        fontFamily: 'Microsoft Yahei',
        fontWeight: '',
        fontSize: 14,
        fontColor: '#fff',
        bgColor: ''
    },
    confView: [
        {
            name: "字体",
            type: comType.FONTFAMILY,
            value: "fontFamily",
        },
        {
            name: "字体粗细",
            type: comType.FONTWEIGHT,
            value: "fontWeight",
        },
        {
            name: "字号",
            type: comType.NUMBER,
            value: "fontSize",
            min: 0,
        },
        {
            name: "字体颜色",
            type: comType.COLOR,
            value: "fontColor",
        },
        {
            name: '背景颜色',
            type: comType.COLORALPHA,
            value: 'bgColor',
        },
    ]
}

function install() {
    Vue.component(componentName, () => import('./numberClock.vue'));
}

export default { componentName, type, cn_name, style, install }
