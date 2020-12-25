<template>
    <div class='container-config-box'>
        <div class="layer-box">
            <el-tree
                ref="gisTree"
                :data="treeData"
                node-key="id"
                accordion
                default-expand-all
                :expand-on-click-node="false"
                @node-click="_nodeClick"
                @node-drop="handleDrop"
                :allow-drop="allowDrop"
                draggable>
                <div class="custom-tree-node" slot-scope="{ node, data }">
                    <div :class="[{'is-checked' : checkedId === data.id},data.type]">
                        <template v-if="data.type === 'comp'">
                            <span class="icon">
                                <i class='iconfont' :class="iconClass(data.componentName)"></i>
                            </span>
                            <span class='name'>{{ data.name }}{{data.id}}</span>
                        </template>
                        <template v-else>
                            <span class='name'>{{ data.name }}</span>
                        </template>
                    </div>
                    <template>
                        <template v-if="data.type ==='comp'">
                            <div class="btn-group">
                                <el-button :type="data.show?'primary':'info'" icon="el-icon-view" circle
                                           @click.stop="changeVisible(data)" size="mini" style="padding:3px;"/>
                                <el-button type="danger" icon="el-icon-delete" circle @click.stop="_delLayer(data.id)"
                                           size="mini" style="padding:3px;"/>
                            </div>
                        </template>
                    </template>
                </div>
            </el-tree>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapState} from "vuex"
import {icons} from "@/config/icon"

export default {
    name: 'gisLayerTree',
    props: {
        comp: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            checkedId: '', //当前选中id
            layerData: {}
        }
    },
    watch: {
        'activeComp.componentName': {
            handler: function (val) {
                if (val === 'baseMap') {
                    this.checkedId = this.comp.compId
                }
            }
        },
        'activeComp.compId': {
            handler: function (val) {
                if (this.comp.componentName === 'baseMap') {
                    this.checkedId = this.comp.compId
                }
            }
        }
    },
    methods: {
        handleDrop(draggingNode, dropNode, dropType, ev) {
            let compId = this.comp.compId
            if(draggingNode.data.pType==="pro"){
                let pro = _.cloneDeep(this.treeData[0].children[0].children);
                this.$store.commit('updateGisProLayer', {compId, pro})
            }else{
                let vec = _.cloneDeep(this.treeData[0].children[1].children);
                this.$store.commit('updateGisVecLayer', {compId, vec})
            }
        },
        allowDrop(draggingNode, dropNode, type) {
            return dropNode.data.pType === draggingNode.data.pType && type !== 'inner' && ['pro', 'vec'].indexOf(draggingNode.data.type) === -1;
        },
        _nodeClick(data, node, ev) {
            if (data.type === 'pro' || data.type === 'vec') {
                return;
            }
            this.checkedId = data.id
            this.$store.commit('cleanAllActive');
            switch (data.type) {
                case 'baseMap' :
                    this.$store.commit('changeActive', {compId: data.id, value: true});
                    break
                case 'comp' :
                    this.$store.commit('changeActive', {compId: data.id, value: true})
                    break
                default :
                    break
            }
        },
        // 删除层
        _delLayer(id) {
            this.$confirm('将删除此图层, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let compId = this.comp.compId
                this.$store.commit('delGisLayer', {chid: id, compId})
                this.$refs.gisTree.setCurrentKey(compId)
                this.checkedId = compId;
                this._nodeClick({id: this.comp.compId, type: this.comp.componentName})
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },
        changeVisible(data) {
            data.show = !data.show;
            let compId = this.comp.compId
            if (data.pType === "pro") {
                let pro = _.cloneDeep(this.treeData[0].children[0].children);
                this.$store.commit('updateGisProLayer', {compId, pro})
            } else if (data.pType === 'vec') {
                let vec = _.cloneDeep(this.treeData[0].children[1].children);
                this.$store.commit('updateGisVecLayer', {compId, vec})
            }
        },
        getLayerComp() {
            let compMap = _.cloneDeep(this.compMap)
            let proLayer = _.cloneDeep(this.comp.style.proLayer)
            let vecLayer = _.cloneDeep(this.comp.style.vecLayer)
            let compsPro = []
            let compsVec = []
            for (let i = 0; i < proLayer.length; i++) {
                let gisComp = proLayer[i]
                let compId = gisComp.id;
                gisComp.name = compMap[compId]['style'] ? (compMap[compId]['style'].name ? compMap[compId]['style'].name : compMap[compId]['name']) : compMap[compId]['name']
                compsPro.push(gisComp)
                if (compId === this.activeComp.compId) {
                    this.checkedId = compId;
                }
            }
            for (let i = 0; i < vecLayer.length; i++) {
                let gisComp = vecLayer[i]
                let compId = gisComp.id;
                gisComp.name = compMap[compId]['style'] ? (compMap[compId]['style'].name ? compMap[compId]['style'].name : compMap[compId]['name']) : compMap[compId]['name']
                compsVec.push(gisComp)
                if (compId === this.activeComp.compId) {
                    this.checkedId = compId;
                }
            }
            return {compsPro, compsVec}
        },
        iconClass(componentName) {
            return icons[componentName]
                ? "icon-" + icons[componentName]
                : "icon-" + "other";
        }
    },
    computed: {
        ...mapState(["components"]),
        ...mapGetters({activeComp: 'getFirstActiveComp'}),
        compMap() {
            return this.components.compMap
        },
        treeData() {
            let comp = this.comp
            let Layers = this.getLayerComp()
            let treeData = [
                {
                    id: comp.compId,
                    show: true,
                    name: comp.name,
                    type: 'baseMap',
                    children: [{
                        id: 'pro',
                        show: true,
                        name: '专题图层',
                        type: 'pro',
                        children: Layers.compsPro
                    }, {
                        id: 'vector',
                        show: true,
                        name: '矢量图层',
                        type: 'vec',
                        children: Layers.compsVec
                    }]
                }
            ]
            if (Layers.compsPro.length === 0 && Layers.compsVec.length === 0) {
                this.checkedId = treeData[0].id
            }
            return treeData
        }
    },
}
</script>
<style lang="stylus" scoped>

</style>
<style lang="scss">
.custom-tree-node {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding-right: 10px;
    justify-content: space-between;

    .name {
        font-size: 12px;
    }

    .layer {
        width: 280px;
        height: 20px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .iconfont {
        font-size: 12px;
        color: #ccc;
        margin-right: 2px;
    }

    .is-checked {
        .name {
            color: #049afd;
        }
    }
}

.layer-box {
    .el-tree-node.is-current > .el-tree-node__content {
        color: #606266;
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

