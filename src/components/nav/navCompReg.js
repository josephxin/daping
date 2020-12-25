import store from "@/store/store";
let navOptions = []

function loadNavComps() {

    const requireComponent = require.context(
        '../nav', //想要全局注册的组件父文件夹
        true, //遍历文件夹（如果你的组件是被一个个文件夹包裹的话）
        /(conf|config)+\.js$/ //匹配vue后缀的文件
    )

    requireComponent.keys().forEach((fileName) => {
        const componentConfig = requireComponent(fileName); //获取组件
        loadCom(componentConfig.default) //全局注册组件（componentConfig.default.name：组件的名称，componentConfig.default：组件本身）
    })

    store.commit('changeNavOptions', navOptions)
}

function loadCom(com) {
    if (com.install instanceof Function) {
        com.install()
        navOptions.push({
            type: com.componentName,
            name: com.cn_name
        })
    }
}

export {
    loadNavComps,
}
