<template>
    <div :class="{'compHighLight':isHighlight}" :id="contentId" :style="boxStyle" class="compbox">
        <component :compConf="compConf" :is="compConf.componentName"
                   :mainId="compConf.compId" :id="compConf.compId" @compState="compStateChanged" ref="contentComp"/>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

var debug = false;
export default {
    name: 'previewCompItem',
    data() {
        return {
            myChart: null,
            isCtrl: false,
            translateX: 0,
            translateY: 0,
            scaleW: 1,
            scaleH: 1,
            isReload: false,
            linkageData: {},
            compState: null
        }
    },
    components: {},
    mixins: [],
    props: ['compConf'],
    computed: {
        ...mapGetters({activeComp: 'getFirstActiveComp'}),
        id() {
            return this.compConf.compId;
        },
        contentId: function () {
            return this.id + "-preview-box"
        },
        boxStyle: function () {
            let conf = this.compConf;
            let result = {}

            if (!conf) {
                return result;
            }

            if (conf.box.top) {
                result.top = conf.box.top + 'px';
            }

            if (conf.box.left) {
                result.left = conf.box.left + 'px';
            }

            if (conf.box.height) {
                result.height = conf.box.height + 'px';
            }

            if (conf.box.width) {
                result.width = conf.box.width + 'px';
            }

            result.zIndex = conf.compIndex;

            result.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scaleW}, ${this.scaleH}) rotate(${conf.box.rotate}deg)`;

            return result;
        },
        isHighlight: function () {
            let conf = this.compConf;
            return conf.isHighlight && !this.$store.getters.getPreviewState;
        },
    },
    created() {
        // this.scaleW = this.$store.state.window.preview.scale || 1
        this.scaleW = 1
    },
    updated() {
        if (!this.isReload) {
            return;
        }

        if (this.$refs.contentComp.resize) {
            this.$refs.contentComp.resize();
        }
        this.isReload = false;
    },
    methods: {
        ...mapActions(['switchComListDisplayState', 'moveTop', 'moveUp', 'moveDown', 'moveBottom',
            'delComs', 'selectOnlyOne', 'selectComs', 'highLightCom', 'cancelHighLightCom']),
        handleOver({index}) {
            this.$store.commit("changeHighlight", {
                compId: this.id,
                value: true
            })
        },
        handleOut() {
            this.$store.commit("changeHighlight", {
                compId: this.id,
                value: false
            })
        },
        handleFocus({index}) {
            this.selectOnlyOne(this.id)
            this.$store.commit("setScreenGridShow", true)
        },
        handleBlur({left, top, width, height}) {
            let styleConf = {
                compId: this.id,
                left,
                top,
                width,
                height
            }
            this.$store.commit("updateCompStyle", styleConf)
            this.isReload = true
            this.$store.commit("setScreenGridShow", false)
            // if (this.$refs.contentComp.resize) {
            //    this.$refs.contentComp.resize();
            // }
            // this.$store.commit("changeHighlight", {
            //   compId: this.id,
            //   value: false
            // })
            // if (Array.isArray(this.contain.activeObj)) return
            // this.container.gradeFlag = false;
            // this.$set(this.contain.activeObj.component, 'width', width)
            // this.$set(this.contain.activeObj.component, 'height', height)
            // this.$set(this.contain.activeObj, 'left', left)
            // this.$set(this.contain.activeObj, 'top', top)
        },
        updateComp(compStyle) {

            if (!compStyle || compStyle.compId != this.compConf.compId) {
                return;
            }

            if (compStyle.translateX) {
                this.translateX = compStyle.translateX
            }

            if (compStyle.translateY) {
                this.translateY = compStyle.translateY
            }

            if (compStyle.scaleH) {
                this.scaleH = compStyle.scaleH
            }

            if (compStyle.scaleW) {
                this.scaleW = compStyle.scaleW
            }
        },
        changeScaleStyle() {	//窗口伸缩实际工作函数

            if (!this.activeComp.property) { //没有property字段
                return;
            }
            Object.keys(this.activeComp.property).map((v, i) => {
                this.activeComp.property[v].map((o, p) => {
                    let dataArr = ['style'], scaleNum = 0
                    if (v == 'base') { //如果是base字段则不需要传入对应父级KEY
                        dataArr.push(o)
                        scaleNum = Math.ceil(this.scaleW * this.activeComp.style[o])
                    } else {
                        dataArr.push(v, o)
                        scaleNum = Math.ceil(this.scaleW * this.activeComp.style[v][o])
                    }
                    this.$store.commit("modifyValueBySelected", {
                        attrs: dataArr,
                        value: scaleNum
                    })
                })
            })
        },
        clickComp() {
            if (this.$store.getters.getPreviewState) {
                return;
            }

            if (!this.isCtrl) {
                this.$store.commit('cleanAllActive');
            }

            this.$store.commit('changeActive', {compId: this.id, value: true});

            this.isCtrl = false;
        },
        multiselect() {
            if (this.$store.getters.getPreviewState) {
                return;
            }
            this.isCtrl = true;
        },
        enter() {
            if (this.$store.getters.getPreviewState) {
                return;
            }
            this.$store.commit('changeHighlight', {compId: this.id, value: true});
        },
        leave() {
            if (this.$store.getters.getPreviewState) {
                return;
            }
            this.$store.commit('changeHighlight', {compId: this.id, value: false});
        },
        reloadComp(compStyle) {
            if (!compStyle || compStyle.compId != this.compConf.compId) {
                return;
            }

            this.translateX = 0;
            this.translateY = 0;
            this.scaleW = 1;
            this.scaleH = 1;

            this.isReload = true;
        },

        compStateChanged(state) {
            if (debug) {
                console.log('AbstractComp', '[', this.id, ']', 'state change from:', this.compState, " to ", state)
            }
            this.compState = state;
        },

        //用于外部调用更新组件的数据。
        //changedLoadedData：当修改了从数据源加载后的数据（修改store.compData中的数据）时为true，否则为false
        updateCompData(changedLoadedData) {
            let contentComp = this.$refs.contentComp;

            if (!contentComp.updateCompData) {
                console.error('the component [', this.id, '] is not exist.');
            }

            contentComp.updateCompData(changedLoadedData);
        }
    }
}
</script>

<style scoped>
.compbox {
    position: absolute;
    padding: 0px;
}
</style>
