<template>
    <my-draggable
        :width="compConf.box.width"
        :height="compConf.box.height"
        :left="compConf.box.left"
        :top="compConf.box.top"
        :index="compConf.compId"
        :compConf="compConf"
        :boxStyle="boxStyle"
        @focus="handleFocus"
        @blur="handleBlur"
        @compMove="compMove"
        @compRotate="compRotate"
    >
        <component :style="{transform: `rotate(${compConf.box.rotate}deg)`}" :compConf="compConf"
                   :is="compConf.componentName"
                   :mainId="compConf.compId" :id="compConf.compId" @compState="compStateChanged" ref="contentComp"/>
    </my-draggable>
</template>

<script>
import {getFixed} from '@/util/util'
import {mapActions, mapGetters, mapState} from 'vuex'
import myDraggable from "./myDraggable"

var debug = false;
export default {
    inject: ['contain'],
    provide() {
        return {
            contain: this.contain
        }
    },
    name: 'Container',
    data() {
        return {
            myChart: null,
            isCtrl: false,
            translateX: 0,
            translateY: 0,
            scaleW: 1,
            scaleH: 1,
            isReload: false,
            compState: null,
            cx: 0,
            cy: 0,
        }
    },
    components: {myDraggable},
    mixins: [],
    props: ['compConf'],
    computed: {
        ...mapGetters({activeComp: 'getFirstActiveComp'}),
        ...mapState(["components"]),
        compMap() {
            let compMap = this.components.compMap;
            return compMap
        },
        linkageData() {
            return this.$store.getters.getLinkagesByCompId(this.id)
        },
        id() {
            return this.compConf.compId;
        },
        contentId: function () {
            return this.id + "-box"
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

            result.zIndex = this.compConf.compIndex;

            result.transform = 'translate(' + this.translateX + 'px,' + this.translateY + 'px) scale(' + this.scaleW + ',' + this.scaleH + ')';

            return result;
        },
        isHighlight: function () {
            let conf = this.compConf;
            return conf.isHighlight && !this.$store.getters.getPreviewState;
        }
    },
    updated() {
        if (!this.isReload) return
        if (this.$refs.contentComp && this.$refs.contentComp.resize) {
            this.$refs.contentComp.resize();
        }
        // if(this.$refs.contentComp.updateMyChart){
        // 		this.$refs.contentComp.updateMyChart();
        // }

        this.isReload = false;
    },
    methods: {
        ...mapActions(['switchComListDisplayState', 'moveTop', 'moveUp', 'moveDown', 'moveBottom', 'cleanAllActiveChild',
            'delComs', 'selectOnlyOne', 'selectComs', 'highLightCom', 'cancelHighLightCom', 'changeHighlightLayer', 'cancelHighLightLayerCom', 'cleanAllHighLayer', 'onMoveToContainer']),
        handleFocus({index, event}) {
            this.$store.commit('cleanAllHighLayer')
            if (event.ctrlKey) {
                this.$store.commit('cleanAllActiveChild');
                this.selectComs({compId: this.id, value: this.compConf.isActive})
            } else {
                this._onHighLightLayer()
                this.selectOnlyOne(this.id)
            }
            this.$store.commit("setScreenGridShow", true)
        },
        _onHighLightLayer() {
            if (this.compConf.componentName !== 'compContainer') {
                let comps = this.compMap
                for (let compId in comps) {
                    if (comps[compId]['componentName'] === 'compContainer') {
                        this.$store.commit('changeHighlightLayer', {
                            compId: compId,
                            value: true
                        })
                    }
                }
            }
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
            // 判断组件是否位于容器内 如果在容器内 则添加到容器的层上
            if (this.compConf.compType === 'component') {
                let comps = this.compMap
                for (let compId in comps) {
                        if(['compContainer', 'containerDrill'].includes(comps[compId]['componentName'])){
                        let cw = getFixed(comps[compId].box.width)
                        let ch = getFixed(comps[compId].box.height)
                        let ct = getFixed(comps[compId].box.top)
                        let cl = getFixed(comps[compId].box.left)
                        if (left >= cl && (left + width <= cl + cw) && top >= ct && (top + height <= ct + ch)) {
                            this.onMoveToContainer({compId: this.id, containerId: compId})
                        }
                    }
                }
            }
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
        },
        compMove(obj) {
            // let comps = this.compMap
            // for(let compId in comps){
            //     if( comps[compId]['componentName'] === 'compContainer'){
            //         if(this.id === compId) continue
            //         let width = getFixed(comps[compId].box.width)
            //         let height = getFixed(comps[compId].box.height)
            //         let top = getFixed(comps[compId].box.top)
            //         let left = getFixed(comps[compId].box.left)
            //         if(obj.left >= left && (obj.left + obj.width <= left + width) && obj.top >=top && (obj.top + obj.height <= top + height)){
            //             console.log('已经拖进容器中'+compId)
            //         }
            //     }
            // }
        },
        compRotate(e) {
            //console.log(this.$refs.contentComp);
            let el = this.$refs.contentComp.$el
            let domRect = el.getBoundingClientRect()
            //console.log(domRect);
            let {width, height, left, top} = domRect;
            this.cx = left + width / 2;
            this.cy = top + height / 2;
            //console.log(this.cx, this.cy);
            let startAngle = this.getCurrentAngle(e);
            let comp = this.compMap[this.id];
            //console.log(comp);
            let box = comp.box;
            //console.log(box);
            let deg = box.rotate || 0;
            let sumAngle = deg;
            document.onmousemove = (e) => {
                let endAngle = this.getCurrentAngle(e);
                let offsetAngle = endAngle - startAngle;
                //console.log("document.onmousemove -> offsetAngle", offsetAngle)
                sumAngle = (deg + offsetAngle) % 360;//10.448891153360051
                sumAngle = getFixed(sumAngle);//10.45
                el.style.transform = "rotate(" + sumAngle + "deg)";
            }

            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
                this.$store.commit('updateCompStyle', {compId: this.id, rotate: sumAngle});
            }
        },
        getCurrentAngle(e) {
            let mouseX = e.clientX;
            let mouseY = e.clientY;
            //console.log(mouseX, mouseY);
            let ox = mouseX - this.cx;
            let oy = mouseY - this.cy;
            //console.log(ox, oy);
            let to = Math.abs(ox / oy);
            let angle = Math.atan(to) / (2 * Math.PI) * 360;//鼠标相对于旋转中心的角度
            if (ox < 0 && oy < 0)//相对在左上角
            {
                angle = 360 - angle;
            } else if (ox < 0 && oy > 0)//左下角
            {
                angle = 180 + angle
            } else if (ox > 0 && oy < 0)//右上角
            {
                angle = angle;
            } else if (ox > 0 && oy > 0)//右下角
            {
                angle = 180 - angle;
            }
            return angle;
        },
    }
}
</script>

<style scoped>
.compbox {
    position: absolute;
    padding: 0px;
}
</style>
