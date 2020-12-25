import Vue from 'vue'

import store from '../../../store/store'

const comType = {

    HELP: 'helpUI', // 帮助组件

    // 基本组件
    TEXT: 'textUI',
    COLOR: 'colorUI',
    NUMBER: 'numberUI',
    SELECT: 'selectUI',
    CHECKBOX: 'CHECKBOXUI',
    BOOLEAN: 'booleanUI',
    GROUP: 'groupUI',
    ARRAY: 'arrayUI',
    IMAGEUPLOAD: 'imageUploadUI',
    BACKGROUNDIMAGEUPLOAD: 'backgroundImageUpload',
    TEXTAREA: 'textareaUI',
    CODE: 'codeUI',
    TXT: 'txtUI',
    // 复合组件
    AXIS: 'axisUI',
    LEGEND: 'legendUI',
    FONT: 'fontUI',
    FONTFAMILY: 'fontFamilyUI',
    FONTWEIGHT: 'fontWeightUI',
    LINETYPE: 'lineTypeUI',
    COLORRAMP: 'colorRampUI',
    COLORALPHA: 'colorAlphaUI',
    GISCASCADE: 'gisCascadeUI',
    SELECTRELATIVE: 'selectRelative',
    INLINEARRAY: 'inlineArrayUI',
    TITLE: 'titleUI',
    ICON: 'iconUI',
    BORDER: 'borderUI',
    FIELDMAP: 'fieldMapUI',
    VISUALMAP: 'visualMapUI',
    // tab组件关联组件配置
    LINKCOMP: 'linkCompUI',
    LINKCOMPINDICATOR: 'linkCompIndicatorUI',
}

// import {styleName} from '@/compLib/CompTemplateReg'
// 解决循环依赖(原本从组件模版注册中导入)
const styleName = 'style'

function loadEditComs() {
    Vue.component(comType.HELP, () =>
        import ('./help.vue'))

    Vue.component(comType.TEXT, () =>
        import ('./inputText.vue'))
    Vue.component(comType.SELECT, () =>
        import ('./select.vue'))
    Vue.component(comType.CHECKBOX, () =>
        import ('./checkBox.vue'))
    Vue.component(comType.BOOLEAN, () =>
        import ('./boolean.vue'))
    Vue.component(comType.GROUP, () =>
        import ('./group.vue'))
    Vue.component(comType.ARRAY, () =>
        import ('./array.vue'))
    Vue.component(comType.IMAGEUPLOAD, () =>
        import ('./ImageUpload.vue'))
    Vue.component(comType.BACKGROUNDIMAGEUPLOAD, () =>
        import ('./backgroundImageUpload.vue'))
    Vue.component(comType.TEXTAREA, () =>
        import ('./textarea.vue'))
    Vue.component(comType.CODE, () =>
        import ('./code.vue'))
    Vue.component(comType.TXT, () =>
        import ('./text.vue'))

    Vue.component(comType.TITLE, () =>
        import ('./complex/title.vue'))
    Vue.component(comType.NUMBER, () =>
        import ('./complex/number.vue'))
    Vue.component(comType.COLOR, () =>
        import ('./complex/color.vue'))
    Vue.component(comType.AXIS, () =>
        import ('./complex/axis.vue'))
    Vue.component(comType.LEGEND, () =>
        import ('./complex/legend.vue'))
    Vue.component(comType.FONTFAMILY, () =>
        import ('./complex/fontFamily.vue'))
    Vue.component(comType.FONTWEIGHT, () =>
        import ('./complex/fontWeight.vue'))
    Vue.component(comType.LINETYPE, () =>
        import ('./complex/lineType.vue'))
    Vue.component(comType.GISCASCADE, () =>
        import ('./complex/gisCascade.vue'))
    Vue.component(comType.SELECTRELATIVE, () =>
        import ('./complex/selectRelative.vue'))
    Vue.component(comType.COLORALPHA, () =>
        import ('./complex/colorAlpha.vue'))
    Vue.component(comType.INLINEARRAY, () =>
        import ('./complex/inline.vue'))
    Vue.component(comType.LINKCOMP, () =>
        import ('./complex/linkComp.vue'))
    Vue.component(comType.LINKCOMPINDICATOR, () =>
        import ('./complex/linkCompIndicator.vue'))
    Vue.component(comType.COLORRAMP, () =>
        import ('./complex/colorRamp.vue'))
    Vue.component(comType.FONT, () =>
        import ('./complex/font.vue'))
    Vue.component(comType.ICON, () =>
        import ('./complex/icon.vue'))
    Vue.component(comType.BORDER, () =>
        import ('./complex/border.vue'))
    Vue.component(comType.FIELDMAP, () =>
        import ('./complex/fieldMap.vue'))
    Vue.component(comType.VISUALMAP, () =>
        import ('./complex/visualMap.vue'))
}

function getVal(param) {
    let selectObj = store.getters['getFirstActiveComp']
    let params = param.split(' '),
        len = params.length,
        index = 0
    selectObj = selectObj[styleName]
    while (index < len) {
        selectObj = selectObj[params[index++]]
    }
    return selectObj
}

// 校验合法后，再更新值
function updateValue(value, data, verify) {
    let isResult = true
    if (verify) {
        if (typeof verify === 'string') {
            isResult = new RegExp(verify).test(value)
        } else if (typeof verify === 'function') {
            isResult = verify(value)
        }
    }
    if (!isResult) {
        // event.target.value = getVal(data);
        return
    }

    onlyUpdateAttr(data, value)
}

// 仅更新属性
function onlyUpdateAttr(key, value) {
    let datas = key.split(' ')
    datas.unshift(styleName)
    store.commit('modifyValueBySelected', { attrs: datas, value })
}

// 仅更新属性
function previewUpdateAttr(key, value) {
    let datas = key.split(' ')
    datas.unshift(styleName)
    store.commit('modifyValueByGIS', { attrs: datas, value })
}

export { comType, loadEditComs, getVal, updateValue, onlyUpdateAttr, previewUpdateAttr }