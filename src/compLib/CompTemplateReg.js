let compsList = {}

const styleName = 'style'
const dataName = 'data'

function loadAllComps() {

    const requireComponent = require.context(
        '../compLib', //想要全局注册的组件父文件夹
        true, //遍历文件夹（如果你的组件是被一个个文件夹包裹的话）
        /(conf|config)+\.js$/ //匹配vue后缀的文件
    )
    requireComponent.keys().forEach((fileName) => {
            const componentConfig = requireComponent(fileName); //获取组件
            loadCom(componentConfig.default) //全局注册组件（componentConfig.default.name：组件的名称，componentConfig.default：组件本身）
        })
        //console.log(compsList);
}

function loadCom(com) {
    if (com.install instanceof Function) {
        com.install(true)
        compsList[com.componentName] = com
    }
}

function getComObj(componentName) {
    //console.log(compsList);
    return compsList[componentName]
}

// 复制显示的数据
// 添加组件时调用
function copyData(comObj, componentName) {
    // 样式数据
    comObj[styleName] = util.deepCopy(compsList[componentName].style.conf)
        // 格式数据
    comObj[dataName] = util.deepCopy(compsList[componentName].data.conf)
}

// 生成样式面板配置
function styleConfig(componentName) {
    return compsList[componentName].style.confView
}

// 生成数据面板配置
function dataConfig(componentName) {
    return compsList[componentName].data ? compsList[componentName].data.confView : []
}

// 生成联动面板配置
function linkageConfig(componentName) {
    let com = compsList[componentName]
    if (com.linkage) {
        return com.linkage.confView
    }
    return null
}


export {
    styleName,
    dataName,
    loadAllComps,
    getComObj,
    styleConfig,
    dataConfig,
    copyData,
    linkageConfig
}