import util from "@/util/util";
import Vue from "vue";
import { comType } from "@/components/props/edit/EditCompReg";
import { DataSourceContext } from '@/datamanager/DataManagerContext'
const type = 'timeShow';
const componentName = 'circleClock';
const cn_name = '圆形时钟';

const style = {
    box: {
        width: 200,
        height: 200,
        top: 300,
        left: 300
    },
    conf: {
        clockRadius: 100,
        fillColor: "#fff",
        excircleWidth: 1,
        excircleColor: "#aaa",
        smallTickWidth: 1,
        smallTickColor: "#ccc",
        bigTickWidth: 1,
        bigTickColor: "#aaa",
        number: {
            fontFamily: 'Microsoft Yahei',
            fontWeight: '',
            fontSize: 12,
            fontColor: '#aaa'
        },
        centerDotRadius: 5,
        centerDotColor: "#aaa",
        hourWidth: 3,
        hourColor: "#aaa",
        minuteWidth: 2,
        minuteColor: "#aaa",
        secondWidth: 1,
        secondColor: "#aaa",
    },
    confView: [
        {
            name: "时钟半径",
            type: comType.NUMBER,
            value: "clockRadius",
            min: 70
        },
        {
            name: '背景颜色',
            type: comType.COLOR,
            value: 'fillColor',
        },
        {
            name: "边框配置",
            type: comType.GROUP,
            fold: true,
            children: [
                {
                    name: "边框粗细",
                    type: comType.NUMBER,
                    value: "excircleWidth",
                    min: 1,//最小值为1，为0也会显示宽为1
                },
                {
                    name: "边框颜色",
                    type: comType.COLOR,
                    value: "excircleColor",
                },
            ]
        },
        {
            name: "小刻度配置",
            type: comType.GROUP,
            fold: true,
            children: [
                {
                    name: "刻度粗细",
                    type: comType.NUMBER,
                    value: "smallTickWidth",
                    min: 1
                },
                {
                    name: "刻度颜色",
                    type: comType.COLOR,
                    value: "smallTickColor",
                },
            ]
        },
        {
            name: "大刻度配置",
            type: comType.GROUP,
            fold: true,
            children: [
                {
                    name: "刻度粗细",
                    type: comType.NUMBER,
                    value: "bigTickWidth",
                    min: 1
                },
                {
                    name: "刻度颜色",
                    type: comType.COLOR,
                    value: "bigTickColor",
                },
            ]
        },
        {
            name: "数字配置",
            type: comType.FONT,
            value: 'number',
            fold: true,
        },
        {
            name: "中心点配置",
            type: comType.GROUP,
            fold: true,
            children: [
                {
                    name: "中心点半径",
                    type: comType.NUMBER,
                    value: 'centerDotRadius',
                    min: 0
                },
                {
                    name: "中心点颜色",
                    type: comType.COLOR,
                    value: 'centerDotColor',
                },
            ]
        },
        {
            name: "时针配置",
            type: comType.GROUP,
            fold: true,
            children: [
                {
                    name: "时针粗细",
                    type: comType.NUMBER,
                    value: "hourWidth",
                    min: 1
                },
                {
                    name: "时针颜色",
                    type: comType.COLOR,
                    value: "hourColor",
                },
            ]
        },
        {
            name: "分针配置",
            type: comType.GROUP,
            fold: true,
            children: [
                {
                    name: "分针粗细",
                    type: comType.NUMBER,
                    value: "minuteWidth",
                    min: 1
                },
                {
                    name: "分针颜色",
                    type: comType.COLOR,
                    value: "minuteColor",
                },
            ]
        },
        {
            name: "秒针配置",
            type: comType.GROUP,
            fold: true,
            children: [
                {
                    name: "秒针粗细",
                    type: comType.NUMBER,
                    value: "secondWidth",
                    min: 1
                },
                {
                    name: "秒针颜色",
                    type: comType.COLOR,
                    value: "secondColor",
                },
            ]
        },
    ]
}

function install() {
    Vue.component(componentName, () => import('./circleClock.vue'));
}

export default { componentName, type, cn_name, style, install }
