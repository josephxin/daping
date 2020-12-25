<template>
    <div :style="style">
        <span class="btn-back" v-show= "currentLayerIndex !== 0" @click="_onBackPrevLayer" :style="btnStyle">{{compConf.style.backBtnText}}</span>
        <div class="layer-box" v-for="(layer,layIndex) in layerData" :key="layIndex"
            :style = "layerBoxStyle(layIndex)"
            >
            <template v-if = "previewStatus">
                <preview-comp-item v-for="compId in layer.children" :key="compId + '_carousel'" :compConf="getCompConf(compId)" :ref="compId"></preview-comp-item>
            </template>
            <template v-else>
                <container :compConf="getCompConf(compId)" :key="compId" v-for="compId in layer.children" :ref="compId"></container>
            </template>
        </div>
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
            currentLayerIndex : 0
        }
    },
    created(){
        
    },
    components: {container,previewCompItem},
    computed: {
        ...mapGetters({previewStatus: 'getPreviewState'}),
        ...mapState(["components","preview"]),
        compMap() {
            return this.previewStatus ? this.preview.components.value : this.components.compMap
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
            return {
                width: this.obj.width + "px",
                height: this.obj.height + "px",
                backgroundColor: this.compConf.style.backgroundColor,
            };
        },
        btnStyle(){
            let btnStyle = {
                backgroundColor : this.compConf.style.backBtnBackgroundColor,
                color : this.compConf.style.backBtnColor,
                fontSize : this.compConf.style.backBtnFontSize + 'px',

            }
            switch(this.compConf.style.backBtnPosition){
                case 'topLeft':
                    btnStyle.left = 0
                    btnStyle.top = 0
                    break
                case 'topCenter':
                    btnStyle.top = 0
                    btnStyle.left = '50%'
                    btnStyle.transform = "translateX(-50%)"
                    break
                case 'topRight':
                    btnStyle.right = 0
                    btnStyle.top = 0
                    break
                default :
                    btnStyle.left = 0
                    btnStyle.top = 0
                    break
            }
            return btnStyle
        }
    },
    mounted() {
    },
    watch: {
      'compConf.currentLayerId': {
          handler: function (newVal, oldVal) {
            this.currentLayerIndex = this._getCurrentLayerIndex(newVal)
          }
      }
    },
    methods: {
        layerBoxStyle(index){
            let scale = this.currentLayerIndex === index ? 1 : 0
            return {
                'transform' : `scale(${scale})`
            }
        },
        resize() {

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
        //点击事件
        _clickByLinkAge(evtRevObj) {
            this.$evtBus.on(evtRevObj, (e) => {
                this._toggleCompShow(e.ctrlShow, e.switchVisible && e.switchVisible[this.compConf.compId], this.compConf.compId)
                let sourceComp = this.getCompConf(e.source)
                if(sourceComp.compType === 'layerChildren' && sourceComp.parentCompId === e.target){
                    console.log(sourceComp)
                    // 组件内容器处理方式
                    // 1.自由下钻模式
                    console.log("容器内组件触发事件")
                    let layerIndex = this._getCurrentLayerIndex(sourceComp.layerId)
                    if(layerIndex === this.layerData.length - 1) return
                    layerIndex++
                    // 非预览模式下高亮右侧树中选中层
                    if(!this.previewStatus){
                        this.$store.commit('changeCurrentLayer',{compId: this.layerData[layerIndex].parentId, layerId: this.layerData[layerIndex].id})
                    }
                    this.currentLayerIndex = layerIndex

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
        // 通过layerId 获取层id
        _getCurrentLayerIndex(layerId){
            for(let i = 0; i < this.layerData.length;i++){
                if(layerId === this.layerData[i].id) return i
            }
            return 0
        },
        // 返回上一层
        _onBackPrevLayer(){
            if(this.currentLayerIndex === 0) return
            this.currentLayerIndex--
        }
    }
};
</script>
<style lang="stylus" scoped>
.btn-back
    display block
    position absolute
    z-index 10
    line-height 30px
    padding 0 10px
    cursor pointer
    user-select none
.layer-box
    width 100%
    height 100%
    overflow hidden
    position absolute
    left 0
    top 0
</style>
