import Vue from "vue";
import App from "./App.vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@static/iconfont/iconfont.css'
import router from "./router/router";
import store from "./store/store";
import './util/filter'
import Jumbotron from '@/plugin/Jumbotron'
import DataManager from '@/datamanager/DataManager'
import {
    borderBox1,
    borderBox10,
    borderBox11,
    borderBox12,
    borderBox13,
    borderBox2,
    borderBox3,
    borderBox4,
    borderBox5,
    borderBox6,
    borderBox7,
    borderBox8,
    borderBox9,
    decoration1,
    decoration10,
    decoration11,
    decoration2,
    decoration3,
    decoration4,
    decoration5,
    decoration6,
    decoration7,
    decoration8,
    decoration9,
} from '@jiaminghi/data-view'

Vue.use(borderBox1)
Vue.use(borderBox2)
Vue.use(borderBox3)
Vue.use(borderBox4)
Vue.use(borderBox5)
Vue.use(borderBox6)
Vue.use(borderBox7)
Vue.use(borderBox8)
Vue.use(borderBox9)
Vue.use(borderBox10)
Vue.use(borderBox11)
Vue.use(borderBox12)
Vue.use(borderBox13)
Vue.use(decoration1)
Vue.use(decoration2)
Vue.use(decoration3)
Vue.use(decoration4)
Vue.use(decoration5)
Vue.use(decoration6)
Vue.use(decoration7)
Vue.use(decoration8)
Vue.use(decoration9)
Vue.use(decoration10)
Vue.use(decoration11)

Vue.use(ElementUI)
Vue.use(Jumbotron)
import MessageBus from "@/plugin/MessageBus"
Vue.prototype.$evtBus = MessageBus
import axios from "axios";
new Vue({
    render: (h) => h(App),
    router,
    store,
    beforeCreate: function() {
        Vue.prototype.$dm = new DataManager(this.$store);
    }
}).$mount("#app");