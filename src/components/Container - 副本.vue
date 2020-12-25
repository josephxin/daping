<template>
    <div :class="{'compHighLight':isHighlight}" :id="contentId" :style="boxStyle" @click="clickComp"
         @click.ctrl="multiselect" @mouseenter="enter" @mouseleave="leave" class="compbox">
        <component :compConf="compConf" :is="compConf.componentName" :linkageData="linkageData"
                   :mainId="compConf.compId"
                   @carouselStart="carouselStart" @compState="compStateChanged" @linkage="linkage"
                   ref="contentComp"></component>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import draggable from 'vuedraggable'
import contextMenu from './contextMenu'
import contextMenuMixins from "@/mixins/contextMenu"

var debug = false;
export default {
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
            linkageData: {},
            carousel: {
                id: null,
                dataIndexs: [],
                dataOffset: 0,
                preDataIndex: null,
                curDataIndex: null,
                parentData: null,
                parentStart: false
            },
            compState: null
        }
    },
    components: {draggable, contextMenu},
    mixins: [contextMenuMixins],
    props: ['compConf'],
    computed: {
        ...mapGetters({activeComp: 'getFirstActiveComp'}),
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
        },
        isOpenCarouse: function () {
            let conf = this.compConf;

            if (!conf.carousel) {
                return false;
            }

            if (this.isCarouselLink && !this.isCarouselLinkRoot) {
                return this.carousel.parentStart;
            }

            return conf.carousel.open;
        },
        isCarouselParent: function () {
            if (!this.isCarouselLink) {
                return false;
            }

            let conf = this.compConf;

            if (!conf.carousel) {
                return false;
            }

            return conf.carousel.parent ? false : true;
        },
        isCarouselChild: function () {
            if (!this.isCarouselLink) {
                return false;
            }

            let conf = this.compConf;

            if (!conf.carousel) {
                return false;
            }

            return conf.carousel.child ? false : true;
        },
        carouselInterval: function () {
            let conf = this.compConf;

            if (!conf.carousel) {
                return -1;
            }

            if (!this.isCarouselLink || this.isCarouselLinkLeaf) {
                return conf.carousel.interval
            }

            return this.$store.getters.getCarouselLeafInterval(this.id);
        },
        isCarouselLink: function () {
            let conf = this.compConf;

            if (!conf.carousel || !(conf.carousel.parent || conf.carousel.child)) {
                return false
            }

            return true;
        },
        isCarouselLinkLeaf: function () {
            return this.isCarouselChild && !this.isCarouselParent;
        },
        isCarouselLinkRoot: function () {
            return this.isCarouselParent && !this.isCarouselChild;
        },
        isCarouselLinkLimb: function () {
            if (!this.isCarouselLink) {
                return false;
            }

            let conf = this.compConf;

            if (!conf.carousel) {
                return false;
            }

            return (conf.carousel.child && conf.carousel.parent) ? true : false;
        },
        carouselLinkRoot() {
            if (!this.isCarouselLink) {
                return null;
            }

            if (this.isCarouselLinkRoot) {
                return this.id;
            }

            return this.$store.getters.getCarouselLinkRoot(this.id);
        }
    },
    watch: {
        'isOpenCarouse': function (newVal, oldVal) {
            if (debug) {
                console.log('Container', '[', this.id, ']', 'isOpenCarouse:', newVal, oldVal)
            }
            this.updateCarouse(newVal);
        },
        'carouselInterval': function (newVal, oldVal) {
            if (debug) {
                console.log('Container', '[', this.id, ']', 'carouselInterval:', newVal, oldVal)
            }
            if (!this.isOpenCarouse) {
                return;
            }

            if (this.carousel.id) {
                this.carouseStop();
            }

            this.carouselStart(this.carousel.dataIndexs);
        }
    },
    created() {
        let covgEvent = this.covgEvent;
        covgEvent.$on('updateComp', this.updateComp);
        covgEvent.$on('reloadComp', this.reloadComp);
        covgEvent.$on('changeScaleStyle', this.changeScaleStyle);
        let linkageEvent = this.$linkageBus;
        linkageEvent.$on("linkage", this.linkageMonitor);

        let carouselEvent = this.$carouselBus;
        carouselEvent.$on("parentCarouselStart", this.parentCarouselStart);
        carouselEvent.$on("parentCarouselEnd", this.parentCarouselEnd);
        carouselEvent.$on("childCarouselEnd", this.childCarouselEnd);

    },
    beforeDestroy() {
        let covgEvent = this.covgEvent;
        covgEvent.$off('updateComp', this.updateComp);
        covgEvent.$off('reloadComp', this.reloadComp);
        covgEvent.$off('changeScaleStyle', this.changeScaleStyle);
        let linkageEvent = this.$linkageBus;
        linkageEvent.$off("linkage", this.linkageMonitor);

        let carouselEvent = this.$carouselBus;
        carouselEvent.$off("parentCarouselStart", this.parentCarouselStart);
        carouselEvent.$off("parentCarouselEnd", this.parentCarouselEnd);
        carouselEvent.$off("childCarouselEnd", this.childCarouselEnd);

        if (this.carousel.id) {
            console.log("关闭轮播...", this.carousel.id)
            this.carouseStop()
        }
    },
    updated() {
        if (!this.isReload) {
            return;
        }

        if (this.$refs.contentComp.resize) {
            this.$refs.contentComp.resize();
        }
        // if(this.$refs.contentComp.updateMyChart){
        // 		this.$refs.contentComp.updateMyChart();
        // }

        this.isReload = false;
    },
    methods: {
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
        linkage(linkageData) {
            if (this.isCarouselLink && !this.isCarouselLinkLeaf) {
                return;
            }

            let linkages = {};

            if (linkageData) {
                $.extend(linkages, linkageData);
            }

            if (this.carousel.parentData) {
                $.extend(linkages, this.carousel.parentData);
            }

            let linkageEvent = {
                compId: this.id,
                linkages: linkages
            }

            //console.log('Container','[',this.id,']','linkage:',linkageEvent);

            this.$linkageBus.$emit("linkage", linkageEvent);
        },
        linkageMonitor(linkageEvent) {
            let compObj = this;

            if (!this.compConf.linkage) {
                return;
            }

            let monitors = this.compConf.linkage.monitors;

            if (!linkageEvent || !monitors || monitors.length == 0) {
                return;
            }

            let linkages = linkageEvent.linkages;

            if (!linkages || linkages.length == 0) {
                return;
            }

            let include = false;

            for (let attr in linkages) {
                if (monitors.indexOf(attr) != -1) {
                    compObj.linkageData[attr] = linkages[attr];
                    include = true;
                }
            }

            if (!include) {
                return;
            }

            this.$refs.contentComp.linkageMonitor();
        },

        sendParentCarouselStartEvent(curDataIndex) {
            if (debug) {
                console.log('Container', '[', this.id, ']', 'sendParentCarouselStartEvent:', curDataIndex)
            }
            let linkageData = this.$refs.contentComp.buildLinkageData(curDataIndex);

            let carouselEvent = {
                compId: this.id,
                linkages: linkageData ? linkageData : null
            }

            this.$carouselBus.$emit("parentCarouselStart", carouselEvent);
        },

        sendChildCarouselEndEvent() {
            if (debug) {
                console.log('Container', '[', this.id, ']', 'sendChildCarouselEndEvent:')
            }
            let me = this;
            this.$carouselBus.$emit("childCarouselEnd", {
                compId: me.id
            });
        },

        carouselStart(dataIndexs) {
            if (debug) {
                console.log('Container', '[', this.id, ']', 'carouselStart:', dataIndexs)
            }

            if (!dataIndexs || !Object.prototype.toString.call(dataIndexs) == '[object Array]') {
                console.error("issue dataIndex", dataIndexs)
                return;
            }

            this.carousel.dataIndexs = dataIndexs;
            this.carousel.dataOffset = 0;
            this.carousel.curDataIndex = null;
            this.carousel.preDataIndex = null;

            if (!this.carousel) {
                console.error("issue carousel conf", this.carousel);
            }

            let exe = this.carouselExe;
            exe();

            if (this.isCarouselLink && !this.isCarouselLinkLeaf) {
                return;
            }

            this.startInterval();
        },

        startInterval() {
            if (debug) {
                console.log('Container', '[', this.id, ']', 'startInterval:')
            }
            if (this.carousel.id) {
                return;
            }

            let exe = this.carouselExe;

            this.carousel.id = setInterval(function () {
                exe();
            }, this.compConf.carousel.interval * 1000);

            if (debug) {
                console.log('Container carouselStart carouselId:', this.carousel.id)
            }
        },

        carouseStop() {
            if (debug) {
                console.log('Container', '[', this.id, ']', 'carouseStop:')
            }
            if (!this.carousel.id) {
                return;
            }
            clearInterval(this.carousel.id);
            this.carousel.id = null;
            // this.carousel.dataIndexs=[],
            // this.carousel.dataOffset=0,
            // this.carousel.preDataIndex=null,
            // this.carousel.curDataIndex=null
        },

        carouselExe() {
            if (debug) {
                console.log('Container', '[', this.id, ']', 'carouselExe:', JSON.stringify(this.carousel))
            }
            let me = this;
            let exe = this.$refs.contentComp.carouselExe;
            if (!exe) {
                return;
            }

            let dataIndexs = this.carousel.dataIndexs;
            let dataOffset = this.carousel.dataOffset;

            let preDataIndex = this.carousel.preDataIndex = this.carousel.curDataIndex;
            let curDataIndex = this.carousel.curDataIndex = dataIndexs[dataOffset];
            exe(curDataIndex, preDataIndex);

            if (this.carousel.dataOffset >= dataIndexs.length) {

                this.carousel.dataOffset = 0;

                if (!this.isCarouselLink) {
                    this.carouselExe();
                    return;
                }

                this.carousel.dataOffset++;

                if (this.isCarouselLinkLeaf) {
                    me.carouseStop();
                    me.sendChildCarouselEndEvent();
                    // setTimeout(function(){

                    // },this.compConf.carousel.interval*1000);
                    return
                }

                if (this.isCarouselLinkLimb) {
                    me.sendChildCarouselEndEvent();
                    // setTimeout(function(){

                    // },this.compConf.carousel.interval*1000);
                    return;
                }

                if (this.isCarouselLinkRoot) {
                    me.carouselStart(me.$refs.contentComp.getCarouselDataIndexes());
                    return;
                    // setTimeout(function(){

                    // },this.compConf.carousel.interval*1000);
                }

            }

            if (this.isCarouselLink && !this.isCarouselLinkLeaf) {
                this.sendParentCarouselStartEvent(curDataIndex);
                this.carousel.dataOffset++;
                return;
            }

            this.carousel.dataOffset++;
        },

        parentCarouselStart(event) {

            let carousel = this.compConf.carousel;
            if (!carousel || carousel.parent != event.compId) {
                return;
            }

            if (debug) {
                console.log('Container', '[', this.id, ']', 'parentCarouselStart:', event)
            }

            this.carousel.parentData = event.linkages;

            if (!this.carousel.parentStart) {
                this.carousel.parentStart = true;
                return;
            }

            this.updateCarouse(true);
            // this.carouselExe();

            // if(this.isCarouselLinkLeaf){
            // 	this.startInterval();
            // }
        },

        parentCarouselEnd(event) {

            let carousel = this.compConf.carousel;
            if (!carousel || carousel.parent != event.compId) {
                return;
            }

            if (debug) {
                console.log('Container', '[', this.id, ']', 'parentCarouselEnd:', event)
            }

            if (this.isCarouselLinkLeaf) {
                this.carouseStop();
                this.parentStart = false;
                return;
            }

            this.$carouselBus.$emit("parentCarouselEnd", {
                compId: this.id
            });

        },

        childCarouselEnd(event) {

            let carousel = this.compConf.carousel;
            if (!carousel || carousel.child != event.compId) {
                return;
            }

            if (debug) {
                console.log('Container', '[', this.id, ']', 'childCarouselEnd:', event)
            }

            this.carouselExe();
        },

        compStateChanged(state) {
            if (debug) {
                console.log('AbstractComp', '[', this.id, ']', 'state change from:', this.compState, " to ", state)
            }
            this.compState = state;
        },

        updateCarouse(open) {
            if (debug) {
                console.log('Container', '[', this.id, ']', 'updateCarouse:', open)
            }
            if (this.carousel.id) {
                this.carouseStop();
            }

            if (!open) {
                if (this.isCarouselLink && !this.isCarouselLinkLeaf) {
                    this.$carouselBus.$emit("parentCarouselEnd", {
                        compId: this.id
                    });
                }

                return;
            }

            this.carouselStart(this.$refs.contentComp.getCarouselDataIndexes())
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
