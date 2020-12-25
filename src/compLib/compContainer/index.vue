<template>
    <div :style="style">
        <template v-if="compConf.style.changeWay === 'caroursel'">
            <el-carousel
                class='layer-box'
                ref="carouselContainer"
                :interval="compConf.style.interval"
                :arrow="layerData.length > 1 ? 'hover' : 'never'"
                :autoplay = "compConf.style.autoPlay"
                trigger="click"
                :height = "obj.height + 'px'"
                :direction = "compConf.style.direction"
                @change="_onCarouselChange"
                >
                <el-carousel-item :style="layerBoxStyle" v-for="(layer,layIndex) in layerData" :key="layIndex" :name="layer.id">
                    <template v-if = "previewStatus">
                        <preview-comp-item v-for="compId in layer.children" :key="compId + '_carousel'" :compConf="getCompConf(compId)" :ref="compId"></preview-comp-item>
                    </template>
                    <template v-else>
                        <container :compConf="getCompConf(compId)" :key="compId" v-for="compId in layer.children" :ref="compId"></container>
                    </template>
                </el-carousel-item>
            </el-carousel>
        </template>
        <template v-else>
            <div class="layer-box" v-for="(layer,layIndex) in layerData" :key="layIndex"
                :style = "normalLayerBoxStyle(layIndex)"
                >
                <template v-if = "previewStatus">
                    <preview-comp-item v-for="compId in layer.children" :key="compId + '_carousel'" :compConf="getCompConf(compId)" :ref="compId"></preview-comp-item>
                </template>
                <template v-else>
                    <container :compConf="getCompConf(compId)" :key="compId" v-for="compId in layer.children" :ref="compId"></container>
                </template>
            </div>
        </template>
    </div>
</template>
<script>
import container from "@/components/Container";
import previewCompItem from '@/components/previewCompItem'
import {mapState,mapGetters} from "vuex";
import AbstractComp from "@/compLib/commons/AbstractComp";
export default {
    name: "compContainer",
    mixins: [AbstractComp],
    data() {
        return {
            previewCurrentIndex : 0
        }
    },
    components: {container,previewCompItem},
    computed: {
        ...mapGetters({previewStatus: 'getPreviewState'}),
        ...mapState(["components","preview"]),
        compMap() {
            return this.previewStatus ? this.preview.components.value : this.components.compMap
        },
        currentLayerIndex() {
            return this.compConf.currentLayerId
        },
        obj() {
            return this.compConf.box;
        },
        layerData() {
            let layerChildrenCompMap = this.getLayerChildrenComp()
            let layers = _.cloneDeep(this.compConf.layer)
            layers.forEach(item => {
                let layerChildren = _.isEmpty(layerChildrenCompMap) ? [] : layerChildrenCompMap[item.id] ? layerChildrenCompMap[item.id] : []
                if (layerChildren.length) {
                    item.children = layerChildren
                }
            })
            return layers
        },
        style() {
            let style = {
                width: this.obj.width + "px",
                height: this.obj.height + "px",
                backgroundColor: this.compConf.style.backgroundColor,
            }
            if(this.compConf.style.backgroundImage){
                style.backgroundImage = `url(${this.compConf.style.backgroundImage})`
                style.backgroundPosition = '0 0'
                style.backgroundSize = "100% 100%"
                style.backgroundRepeat = "no-repeat"
            }
            return style
        },
        layerBoxStyle(){
          return {
            height: this.obj.height + "px",
            display : 'block'
          }
        }
    },
    mounted() {
    },
    watch: {
      'compConf.currentLayerId': {
          handler: function (newVal, oldVal) {
              if(this.compConf.style.changeWay === 'caroursel'){
                  this.$refs.carouselContainer && this.$refs.carouselContainer.setActiveItem(newVal)
              }else{
                  this.previewCurrentIndex = this._getCurrentIndex(newVal)
              }
          }
      }
    },
    methods: {
        resize() {

        },
        normalLayerBoxStyle(index){
            return {
                transform : `scale(${this.previewCurrentIndex === index ? 1 : 0})`,
                left : 0,
                top : 0,
                position : 'absolute'
            }
        },
        getChildrenRefs(){
          return this.$refs
        },
        getCompConf(compId) {
            return this.compMap[compId]
        },
        getLayerChildrenComp() {
            let compMap = this.compMap
            let comps = {}
            for (let compId in compMap) {
                if (compMap[compId]['compType'] === 'layerChildren') {
                    if (!comps[compMap[compId]['layerId']]) comps[compMap[compId]['layerId']] = []
                    comps[compMap[compId]['layerId']].push(compId)
                }
            }
            return comps
        },
        _onCarouselChange(index,prevIndex){
          this.previewCurrentIndex = index
          if(!this.previewStatus){
            this.$store.commit('changeCurrentLayer',{compId: this.layerData[index].parentId, layerId: this.layerData[index].id})
          }
        },
        /**
         * 显示容器内的某一层
         */
        showLayerByLinkage(layerNumber){
            if(this.previewCurrentIndex === layerNumber) return
            if(layerNumber > this.layerData.length -1) return 
            if(this.compConf.style.changeWay === 'caroursel'){
                this.$refs.carouselContainer && this.$refs.carouselContainer.setActiveItem(layerNumber)
            }else{
                this.previewCurrentIndex = layerNumber
            }
        },
        //点击事件
        _clickByLinkAge(evtRevObj) {
            this.$evtBus.on(evtRevObj, (e) => {
                this._toggleCompShow(e.ctrlShow, e.switchVisible && e.switchVisible[this.compConf.compId], this.compConf.compId)
                // 可通过在数据中传递 showLayer 来触发显示某一层
                if(typeof e.data.showLayer !== 'undefined') this.showLayerByLinkage(parseInt(e.data.showLayer))
                let sourceComp = this.getCompConf(e.source)
                if(sourceComp.compType === 'layerChildren' && sourceComp.parentCompId === e.target){
                    // 组件内容器触发事件处理方式
                    console.log("容器内组件触发事件")

                }else{
                    console.log("非容器内组件触发事件")
                }
            })
        },
        linkageConfChanged(newVal) {
            if (this.compConf.linkage && this.compConf.linkage.linkRevEvents) {
                let evtRevList = this.compConf.linkage.linkRevEvents;
                for (let i = 0; i < evtRevList.length; i++) {
                    let evtRevObj = evtRevList[i];
                    let evtType = evtRevObj.evtName.split(":")[1]
                    if (evtType === 'click') {
                        this._clickByLinkAge(evtRevObj)
                    }
                }
            }
        },
        // 获取当前选中的索引
        _getCurrentIndex(layerId){
            for(let i = 0;i<this.layerData.length;i++){
                if(layerId === this.layerData[i].id) return i
            }
            return 0
        }
    }
};
</script>
<style lang="stylus" scoped>
.btn-back
    display block
    position absolute
    left 0
    top 0
    z-index 10
    line-height 30px
    padding 0 10px
    background-color #ffffff
    color #333
    cursor pointer
.layer-box
    width 100%
    height 100%
    overflow hidden
    position relative
</style>
