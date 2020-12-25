<template>
    <div class="linkageUI">
        <div class="title">{{ styleObj.name }}</div>
        <div class="box">
            <div
                class="header"
                style="
                    margin-bottom: 5px;
                    text-align: right;
                    padding-right: 15px;
                "
            >
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    circle
                    @click.stop="addLinkComp"
                    size="mini"
                    :disabled="linkComps.length >= createCompData.length"
                ></el-button>
            </div>
            <el-table :data="linkComps" style="width: 100%">
                <el-table-column label="指标卡名称" width="150px">
                    <template slot-scope="scope">
                        <el-select
                            v-model="scope.row.id"
                            placeholder="请选择指标卡"
                            style="width: 100%"
                            size="mini"
                            clearable
                        >
                            <el-option
                                v-for="(item, index) in createCompData"
                                :key="index"
                                :label="item[fieldMap.name]"
                                :value="item[fieldMap.id]"
                                :disabled="disabledHandle(item[fieldMap.id])"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column label="关联组件">
                    <template slot-scope="scope">
                        <el-select
                            v-model="scope.row.child"
                            placeholder="请选择关联组件"
                            style="width: 100%"
                            size="mini"
                            multiple
                        >
                            <el-option
                                v-for="item in compList"
                                :key="item.compId"
                                :label="item.name"
                                :value="item.compId"
                            >
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
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            title="删除"
                            @click.stop="delLinkComp(scope.$index)"
                            size="mini"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { onlyUpdateAttr } from "@/components/props/edit/EditCompReg";
import { mapGetters, mapState } from "vuex";

export default {
    name: "linkCompIndicatorUI",
    props: ["styleObj"],
    data() {
        return {
            linkComps: [],
            compList: [],
        };
    },
    computed: {
        ...mapState(["components"]),
        ...mapGetters({ activeComp: "getFirstActiveComp" }),
        fieldMap() {
            return this.activeComp.style.fieldMap;
        },
        createCompData() {
            let compData = this.$store.getters.getCompData(
                this.activeComp.compId
            );
            if (this.activeComp.data.datasource.type != "static") {
                return compData[0] || [];
            }
            return compData;
        },
    },
    watch: {
        linkComps: {
            handler: function (val) {
                if (
                    JSON.stringify(val) !=
                    JSON.stringify(this.activeComp.style[this.styleObj.value])
                ) {
                    onlyUpdateAttr(this.styleObj.value, _.cloneDeep(val));
                }
            },
            deep: true,
        },
    },
    created() {
        this.linkComps = _.cloneDeep(
            this.activeComp.style[this.styleObj.value]
        );
        this.createCompList();
        this.deleteCompId(); //如果linkComps中的组件id在compList中不存在，则删除
    },
    methods: {
        disabledHandle(id) {
            for (let index = 0; index < this.linkComps.length; index++) {
                const item = this.linkComps[index];
                if (item.id == id) {
                    return true;
                }
            }
            return false;
        },
        addLinkComp() {
            this.linkComps.push({
                id: "",
                child: [],
            });
        },
        delLinkComp(index) {
            this.linkComps.splice(index, 1);
        },
        createCompList() {
            let compMap = this.components.compMap;
            let compList = [];
            for (let compId in compMap) {
                if (compId !== this.activeComp.compId) {
                    let comp = compMap[compId];
                    compList.push({
                        name: `${comp["name"]}(${comp["compId"]})`,
                        compId: comp["compId"],
                    });
                }
            }
            this.compList = compList;
        },
        deleteCompId() {
            let compIds = [];
            this.compList.forEach((item) => {
                compIds.push(item.compId);
            });
            let linkComps = _.cloneDeep(this.linkComps);
            linkComps.forEach((item) => {
                let child = item.child;
                for (let index = 0; index < child.length; index++) {
                    const compId = child[index];
                    if (!compIds.includes(compId)) {
                        child.splice(index, 1);
                        index--;
                    }
                }
            });
            this.linkComps = linkComps;
        },
    },
};
</script>
<style lang="stylus" scoped>
.linkageUI {
    width: 100%;
    padding: 5px 0;
}
</style>
