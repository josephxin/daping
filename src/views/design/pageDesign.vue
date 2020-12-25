<template>
    <div class="page page-design">
        <navigator-bar></navigator-bar>
        <operate-area></operate-area>
    </div>
</template>
<script>
import NavigatorBar from "@/components/NavigatorBar";
import OperateArea from "@/components/OperateArea";
import { mapActions } from "vuex";

export default {
    name: "design",
    provide() {
        return {
            contain: this,
            container: this,
        };
    },
    created() {},
    components: {
        NavigatorBar,
        OperateArea,
    },
    mounted: function () {
        //从地址栏解析projectId的逻辑在NavigatorBar.vue文件内
        this.getPageDetail(true);//调接口获取页面详情
        window.onresize = () => this.initPreviewSize();
        window.addEventListener("keydown", this._onKeydown);
    },

    methods: {
        ...mapActions(["getPageDetail", "initPreviewSize", "delComs"]),
        _onKeydown(event) {
            event.keyCode === 46 && this.delComs();
        },
    },

    beforeDestroy() {
        window.removeEventListener("keydown", this._onKeydown);
        //组件销毁前清除store中的全局参数
        this.$store.commit("changeGlobalParams", []);
        this.$store.commit("changeLog", true);
        this.$evtBus.clearCycle()
        this.$store.commit('clearCompMap')
        this.$store.commit('clearCompData')
        this.$store.commit('clearPidMsg')
        this.$store.commit('changeBackgroundImage', '')
    },
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.compHighLight::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #419bf9;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    display: block;
    background: rgba(0, 192, 222, 0.2);
    z-index: 999;
}
</style>
