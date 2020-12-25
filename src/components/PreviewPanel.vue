<template>
    <div :style="panelStyle" @click.stop="clickPreviewPanel" id="previewPanel">
        <div :style="contentStyle" id="previewContent">
            <div id="printscreen">
                <div :id="idName" :style="previewStyle">
                    <!-- <template v-for="(comp,key) in compMap">
                        <container :compConf="comp" :key="comp.compId" :ref="key" v-if="comp.compType !== 'layerChildren'"></container>
                    </template> -->
                    <container :compConf="comp" :key="comp.compId" v-for="(comp,key) in compMap" :ref="key"
                               v-if="['layerChildren','themeLayer'].indexOf(comp.compType) === -1"></container>
                    <div class="grid" v-show="window.preview.showGrid"></div>
                    <!-- <coverage v-for="comp in compMap" :key="comp.compId+'-cvog'" :compConf="comp"></coverage> -->
                </div>
            </div>
        </div>
        <context-menu ref="_contextMenu"></context-menu>
    </div>
</template>

<script>
import container from "./Container";
import {mapActions, mapState} from "vuex";
import util from "@/util/util";
import contextMenu from "./contextMenu"
import contextMenuMixins from "@/mixins/contextMenu"

export default {
    provide() {
        return {
            contain: this
        }
    },
    name: "PreviewPanel",
    components: {
        container,
        contextMenu
    },
    data() {
        return {};
    },
    computed: {
        ...mapState(["components", "window"]),
        compMap() {
            return this.components.compMap
        },
        panelStyle: function () {
            return {
                width: this.window.preview.width + "px",
                height: this.window.preview.height + "px",
                left: this.window.comList.switchLeft + "px"
            };
        },
        contentStyle: function () {
            return {
                width: this.window.preview.preWidth + "px",
                height: this.window.preview.preHeight + "px",
                padding: this.window.preview.padding + "px"
            };
        },
        previewStyle: function () {
            let newheght =
                this.window.preview.baseWidth /
                this.window.preview.screenWidth *
                this.window.preview.screenHeight;
            return {
                transform: "scale(" + this.window.preview.scale + ")",
                width:
                    (util.isBigScreen
                        ? this.window.preview.screenWidth
                        : this.window.preview.baseWidth) + "px",
                height:
                    (util.isBigScreen ? this.window.preview.screenHeight : newheght) +
                    "px",
                backgroundColor: this.window.preview.background,
                backgroundImage: `url(${this.window.preview.backgroundImage})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0 0'
            };
        },
        idName: function () {
            return this.window.preview.idName;
        },
        compCoverages: function () {
            return this.$store.state.compCoverage.coverages;
        }
    },
    methods: {
        ...mapActions(["clickPreviewPanel"]),
        ...mapActions(['switchComListDisplayState', 'moveTop', 'moveUp', 'moveDown', 'moveBottom',
            'delComs', 'copyComp', 'selectOnlyOne', 'selectComs', 'highLightCom', 'cancelHighLightCom']),
        updateCompData(param) {
            let comp
            let compConf = this.$store.getters.getCompConf(param.compId);
            if (compConf.compType === "layerChildren") {
                let parentCompId = compConf.parentCompId
                comp = this.$refs[parentCompId];
                try {
                    comp = comp[0].$children[0].$children[0].$refs[param.compId][0]
                    comp.updateCompData(param.changedLoadedData);
                } catch (e) {
                    console.error('error:', e);
                }
                return
            } else if (compConf.compType === "themeLayer") {
                let baseId = compConf.baseId
                let baseComp = this.$refs[baseId];
                baseComp[0].$children[0].$children[0].updateChildData(compConf.compId, param)
                return
            }
            comp = this.$refs[param.compId]
            if (!comp || comp.length == 0) {
                console.error("the component [", param.compId, "] is not exist.");
                return;
            }
            comp[0].updateCompData(param.changedLoadedData);
        }
    },
    created() {
        let compsBus = this.$compsBus;
        compsBus.$on("updateCompData", this.updateCompData);
    },
    beforeDestroy() {
        let compsBus = this.$compsBus;
        compsBus.$off("updateCompData", this.updateCompData);
    },
    mixins: [contextMenuMixins]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#previewPanel {
    position: absolute;
    top: 0;
    left: 200px;
    overflow: auto;
    background: url(../assets/image/bg_edit.png) repeat;
}

#printscreen {
    width: 100%;
    height: 100%;
}

#preview {
    position: relative;
    transform-origin: 0 0;
}

.grid {
    width: 100%;
    height: 100%;
    background-size: 30px 30px, 30px 30px;
    background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 0px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 0px);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
