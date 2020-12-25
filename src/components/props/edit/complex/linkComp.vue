<template>
    <div class="linkageUI">
        <div class="title">{{styleObj.name}}</div>
        <div class="box">
            <div class="header" style='margin-bottom:5px;text-align:right;padding-right:15px;'>
                <el-button type="primary" icon="el-icon-plus" circle @click.stop="addLinkComp" size="mini"
                           :disabled="linkComps.length >= compData.length"></el-button>
            </div>
            <el-table
                :data="linkComps"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="名称"
                    width="120px"
                >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="child"
                    label="关联组件"
                >
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.child" placeholder="请选择关联组件" style='width:100%' size="mini"
                                   multiple>
                            <el-option
                                v-for="item in compMap"
                                :key="item.compId"
                                :label="item.name"
                                :value="item.compId">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作"
                    width="60px"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle @click.stop="delLinkComp(scope.$index)"
                                   size="mini"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import {onlyUpdateAttr} from "@/components/props/edit/EditCompReg";
import {mapGetters, mapState} from 'vuex'

export default {
    name: 'linkageUI',
    props: ['styleObj'],
    data() {
        return {
            linkComps: [],
            compMap: [],
            compData: []
        }
    },
    created() {
        this.linkComps = _.cloneDeep(this.activeComp.style[this.styleObj.value])
        let compData = this.$store.getters.getCompData(this.activeComp.compId)
        this.compData = compData
        let compMap = []
        for (let compId in this.components.compMap) {
            if (compId !== this.activeComp.compId) {
                compMap.push({
                    name: this.components.compMap[compId]['name'],
                    compId: this.components.compMap[compId]['compId']
                })
            }
        }
        this.compMap = compMap
    },
    computed: {
        ...mapGetters({activeComp: 'getFirstActiveComp'}),
        ...mapState(["components"]),
    },
    methods: {
        addLinkComp() {
            this.linkComps.push({
                name: this.compData[this.linkComps.length]['name']
            })
        },
        delLinkComp(index) {
            this.linkComps.splice(index, 1)
        },
    },
    watch: {
        linkComps: {
            handler: function (val) {
                if (JSON.stringify(val) != JSON.stringify(this.activeComp.style[this.styleObj.value])) {
                    onlyUpdateAttr(this.styleObj.value, _.cloneDeep(val))
                }
            },
            deep: true
        }
    }
}
</script>
<style lang="stylus" scoped>
.linkageUI
    width 100%
    padding 5px 0
</style>
