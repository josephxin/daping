<template>
    <div id="compProp" :class="['compProp',{'compPropContainer':showContainerComp||showGisComp}]">
        <template v-if="showContainerComp">
            <div class='container-comps-box'>
                <div class="title">{{ componentDisplayName }}配置</div>
                <containerTree :comp="containerComp"></containerTree>
            </div>
        </template>
        <template v-if="showGisComp">
            <div class='container-comps-box'>
                <div class="title">{{ componentDisplayName }}配置</div>
                <gisLayerTree :comp="gisThemeComp"></gisLayerTree>
            </div>
        </template>
        <template>
            <el-tabs :stretch="true" v-model="tabCompName" @tab-click="clickTab" type="border-card">
                <el-tab-pane label="样     式" name="compStyle">
                    <div class="title">{{ componentDisplayName }}</div>
                    <component :is="'compStyle'"></component>
                </el-tab-pane>
                <el-tab-pane label="数     据" name="compData" v-if="activeComp.data">
                    <div class="title">{{ componentDisplayName }}</div>
                    <component :is="'compData'" :reload="tabCompName"></component>
                </el-tab-pane>
                <el-tab-pane style="height: 100%; padding-right: 15px;" label="交     互" name="compEventConfig"
                             v-if="!['decoratorBorder','decoratorDecoration', 'timeNumber'].includes(activeComp.componentName)">
                    <div class="title">{{ componentDisplayName }}</div>
                    <component :is="'compEventConfig'" :reload="tabCompName"></component>
                </el-tab-pane>
            </el-tabs>
        </template>

    </div>
</template>
<script>
/**
 * 组件属性分为配置和数据。配置分为数据，展示和视图变更；数据分为内部数据和交互数据
 */
import {mapGetters, mapState} from 'vuex'
import compStyle from './CompStyle'
import compData from './CompData'
import compEventConfig from './reactive/CompEventConfig'
import containerTree from "./containerTree"
import gisLayerTree from "./gisLayerTree"

export default {
    name: 'CompProp',
    data() {
        return {
            tabCompName: 'compStyle'
        }
    },
    components: {
        compStyle,
        compData,
        compEventConfig,
        containerTree,
        gisLayerTree
    },
    computed: {
        ...mapGetters({activeComp: 'getFirstActiveComp'}),
        ...mapState(["components"]),
        compMap() {
            let compMap = this.components.compMap;
            return compMap
        },
        componentDisplayName: function () {
            return this.activeComp.name;
        },
        containerComp() {
            if (['compContainer','containerDrill'].includes(this.activeComp.componentName)) {
                return this.activeComp
            }
            if (this.activeComp.compType && this.activeComp.compType === 'layerChildren') {
                let compMap = this.compMap
                for (let compId in compMap) {
                    if(['compContainer','containerDrill'].includes(compMap[compId]['componentName'])){
                        for (let i = 0; i < compMap[compId].layer.length; i++) {
                            if (compMap[compId].layer[i]['id'] === this.activeComp.layerId) {
                                return compMap[compId]
                            }
                        }
                    }
                }
            }
            return {}
        },
        gisThemeComp() {
            if (this.activeComp.componentName === 'baseMap') {
                return this.activeComp
            }
            if (this.activeComp.compType && this.activeComp.compType === 'themeLayer') {
                let compMap = this.compMap
                for (let compId in compMap) {
                    if (compMap[compId]['componentName'] === 'baseMap') {
                        if (compMap[compId]['compId'] === this.activeComp.baseId) {
                            return compMap[compId]
                        }
                    }
                }
            }
            return {}
        },
        showContainerComp() {
            return ['compContainer','containerDrill'].includes(this.activeComp.componentName) || (this.activeComp.compType && this.activeComp.compType === 'layerChildren')
            // return this.activeComp.componentName === 'compContainer' || (this.activeComp.compType && this.activeComp.compType === 'layerChildren')
        },
        showGisComp() {
            //console.log(this.activeComp);
            return this.activeComp.componentName === 'baseMap' || (this.activeComp.compType && this.activeComp.compType === 'themeLayer')
        }
    },
    watch: {
        //解决组件选中后右侧样式、数据、交互面板的默认选择
        activeComp: {
            handler(val, oldVal) {
                //console.log("handler -> val, oldVal", val, oldVal)
                if (this.tabCompName == 'compData' && (!val.data || (val.data && !val.data.datasource))) {
                    this.tabCompName = 'compStyle'
                }
                if (['decoratorBorder', 'decoratorDecoration'].includes(val.componentName)) {
                    this.tabCompName = 'compStyle'
                }
            },
            deep: false
        }
    },
    methods: {
        // 点击页签时的事件
        clickTab(comp) {
            //console.log("clickTab -> comp", comp)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.compProp {
    width 100%
    height calc(100vh - 60px)
    background-color #fff
}

.title {
    font-size: 14px;
    color: #33333e;
    height: 32px;
    line-height: 32px;
}
>>> .el-tabs__content
    padding-right 0
.container-comps-box
    padding-left 10px
    .container-config-box
        height 180px
        overflow auto

.no-data
    height 40px
    margin 5px 0
    font-size 14px
    line-height 40px

.compProp
    .el-tabs__content
        padding 10px

    .prop-tab-item
        height calc(100vh - 142px)
        overflow auto
        font-size 12px
        color #33333e
        padding-right 10px
        padding-bottom 10px
        box-sizing border-box

&.compPropContainer
    .prop-tab-item
        height calc(100vh - 350px)
</style>
