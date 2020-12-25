<template>
    <div class='container-config-box'>
        <div class="layer-box">
            <el-tree
                :data="treeData"
                node-key="id"
                accordion
                default-expand-all
                :expand-on-click-node = "false"
                :check-on-click-node = "true"
                @node-click = "_nodeClick"
                @node-drag-start="handleDragStart"
                @node-drag-enter="handleDragEnter"
                @node-drag-leave="handleDragLeave"
                @node-drag-over="handleDragOver"
                @node-drag-end="handleDragEnd"
                @node-drop="handleDrop"
                draggable
                :allow-drop="allowDrop"
                :allow-drag="allowDrag">
                <div class="custom-tree-node" slot-scope="{ node, data }">
                    <div :class="[{'is-checked' : checkedId === data.id},data.type]">
                        <template v-if = "data.type === 'comp'">
                            <span class="icon">
                                <i class='iconfont' :class="iconClass(data.componentName)"></i>
                            </span>
                            <span class='name'>{{ data.name }}({{data.id}})</span>
                        </template>
                        <template v-else-if="data.type === 'layer'">
                          <span class='name'>层{{data.index + 1}}</span>
                        </template>
                        <template v-else>
                          <span class='name'>{{ data.name }}</span>
                        </template>
                    </div>
                    <template>
                        <el-button v-if="data.type == 'container'" type="success" icon="el-icon-plus" size="mini" style='padding:3px;' circle @click.stop="_addLayer"></el-button>
                        <template v-if="data.type ==='layer'">
                          <div class="btn-group">
                            <el-button type="primary" icon="el-icon-edit" circle @click.stop="_editLayer(data)" size="mini" style="padding:3px;"></el-button>
                            <el-button  v-if = "treeData[0].children.length > 1" type="danger" icon="el-icon-delete" circle @click.stop="_delLayer(data.id)" size="mini" style="padding:3px;"></el-button>
                          </div>
                        </template>
                    </template>
                </div>
            </el-tree>
        </div>
        <layer-edit v-if = "layerEditDialogVisible" :visible = "layerEditDialogVisible" :layerData = "layerData" @onBack = "_layerDialogClosed" @onSave = "_updateLayerInfo"></layer-edit>
    </div>
</template>
<script>
import util from "@/util/util"
import {mapState} from "vuex"
import {icons} from "@/config/icon"
import layerEdit from "./layerEdit"

export default {
    name : 'container-config-box',
    props : {
        comp : {
            type : Object,
            default : {}
        }
    },
    data(){
        return {
          checkedId : '', //当前选中id
          layerEditDialogVisible : false,
          layerData : {}
        }
    },
    created(){
        this.checkedId = this.comp.currentLayerId
    },
    components : {layerEdit},
    methods : {
      _change(){
        console.log(this.value1)
      },
        handleDragStart(node, ev) {

      },
      handleDragEnter(draggingNode, dropNode, ev) {

      },
      handleDragLeave(draggingNode, dropNode, ev) {

      },
      handleDragOver(draggingNode, dropNode, ev) {

      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {

      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        let compId = this.comp.compId
        let layer = _.cloneDeep(this.treeData[0].children)
        this.$store.commit('updateLayer',{compId,layer})
      },
      allowDrop(draggingNode, dropNode, type) {
        return dropNode.data.type === 'layer' && type !== 'inner'
      },
      allowDrag(draggingNode) {
        return draggingNode.data.type === 'layer'
      },
      _nodeClick(data,node,ev){
        this.checkedId = data.id
        this.$store.commit('cleanAllActive');
        switch(data.type){
          case 'container' :
            this.$store.commit('changeActive', {compId: data.id, value: true})
            break
          case 'layer' :
            this.$store.commit('changeActive', {compId: data.parentId, value: true})
            this.$store.commit('changeCurrentLayer',{compId: data.parentId, layerId: data.id})
            break
          case 'comp' :
            this.$store.commit('changeActive', {compId: data.id, value: true})
            this.$store.commit('changeCurrentLayer',{compId: node.parent.data.parentId, layerId: node.parent.data.id})
            break
          default :
            break
        }
      },
      // 删除层
      _delLayer(id){  
          let compId = this.comp.compId
          this.$store.commit('delLayer',{layerId:id,compId})
      },
      // 添加层
      _addLayer(){
          let layer = _.cloneDeep(this.comp.layer)
          let compId = this.comp.compId
          let id = `layer_${util.guid()}`
          layer.push({
              id,
              parentId : compId,
              type :'layer',
              name : `层${id}`
          })
          this.$store.commit('updateLayer',{compId,layer})
      },
      // 编辑层
      _editLayer(data){
        this.layerEditDialogVisible = true,
        this.layerData = _.cloneDeep(data)
      },
      // 更新层信息
      _updateLayerInfo(data){
        let compId = this.comp.compId
        let layer = _.cloneDeep(this.treeData[0].children)
        layer.forEach(item => {
          if(item.id === data.id){
            item.name = data.name
          }
        })
        this.$store.commit('updateLayer',{compId,layer})
        this.layerEditDialogVisible = false
      },
      _layerDialogClosed(){
        this.layerEditDialogVisible = false
      },
      getLayerChildrenComp(){
          let compMap = _.cloneDeep(this.compMap)
          let comps = {}
          for(let compId in compMap){
              if(compMap[compId]['compType'] === 'layerChildren'){
                  if(!comps[compMap[compId]['layerId']]) comps[compMap[compId]['layerId']] = []
                  comps[compMap[compId]['layerId']].push({
                      id: compId,
                      // name: compMap[compId]['style'] ? (compMap[compId]['style'].name ? compMap[compId]['style'].name : compMap[compId]['name']) : compMap[compId]['name'],
                      name : compMap[compId]['name'],
                      type : 'comp',
                      componentName : compMap[compId]['componentName']
                  })
              }
          }
          return comps
      },
      iconClass(componentName) {
            return icons[componentName]
                ? "icon-" + icons[componentName]
                : "icon-" + "other";
        }
    },
    computed : {
        ...mapState(["components"]),
        compMap(){
            let compMap = this.components.compMap;
            return compMap
        },
        treeData(){
            let comp = this.comp
            let treeData = [
                {
                    id : comp.compId,
                    name : comp.name,
                    type : 'container',
                    children : _.cloneDeep(comp.layer)
                }
            ]
            let layerChildrenCompMap = this.getLayerChildrenComp()
            treeData[0].children.forEach((item,index) => {
                item.index = index
                let layerChildren = _.isEmpty(layerChildrenCompMap) ? [] : layerChildrenCompMap[item.id] ? layerChildrenCompMap[item.id] : []
                if(layerChildren.length){
                    item.children = layerChildren
                }
            })
            return treeData
        }
    },
    watch: {
      'comp.currentLayerId': {
          handler: function (newVal, oldVal) {
            this.checkedId = newVal
          }
      }
    },
}
</script>
<style lang="stylus" scoped>

</style>
<style lang="stylus">
  .custom-tree-node
    display flex
    width 100%
    box-sizing border-box
    padding-right 10px
    justify-content space-between
    .name
        font-size 12px
    .layer
        width 280px
        height 20px
        line-height 20px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
    .iconfont
      font-size 12px
      color #ccc
      margin-right 2px
    .is-checked
      .name
        color #049afd
  .layer-box {
    .el-tree-node.is-current > .el-tree-node__content {
      color: #049afd;
    }
    .el-tree {
      background: none;
    }

    .el-tree > .el-tree-node:after {
      border-top: none;
    }

    .el-tree-node {
      position: relative;
      padding-left: 16px;
    }

    // 隐藏节点间隙
    .el-tree-node__content {
      padding-left: 0 !important;
    }

    .el-tree-node__children {
      padding-left: 16px;
    }

    .el-tree-node :last-child:before {
      height: 38px;
    }

    .el-tree > .el-tree-node:before {
      border-left: none;
    }

    .el-tree > .el-tree-node:after {
      border-top: none;
    }

    .el-tree-node:before {
      content: '';
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:after {
      content: '';
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:before {
      border-left: 1px dashed #63c0ff;
      bottom: 0px;
      height: 100%;
      top: -26px;
      width: 1px;
    }

    .el-tree-node:after {
      border-top: 1px dashed #63c0ff;
      height: 20px;
      top: 12px;
      width: 24px;
    }
  }
</style>
