import {loadAllComps} from '../compLib/CompTemplateReg'
import {loadEditComs} from '../components/props/edit/EditCompReg'
import {loadDataSourceComs} from '../components/props/dataSource/dataSourceReg'
import {loadNavComps} from '../components/nav/navCompReg'


//所有可视化组件的外层容器总线
const init_compsEventBus = function (Vue) {
    Vue.prototype.$compsBus = new Vue();
}

const install = function (Vue, opts = {}) {
    init_compsEventBus(Vue);
    loadEditComs();
    loadDataSourceComs();
    loadAllComps();
    loadNavComps();
}

export default {
    install
}
