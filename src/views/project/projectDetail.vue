<template>
    <div class="project-detail">
        <homeHead></homeHead>
        <el-container>
            <el-main style="height: 90vh">
                <el-tabs
                    v-model="activeName"
                    tab-position="top"
                    @tab-click="tabClick"
                >
                    <el-tab-pane label="页面管理" name="1">
                        <pageList />
                    </el-tab-pane>

                    <el-tab-pane label="数据集管理" name="2">
                        <dataSetList />
                    </el-tab-pane>

                    <el-tab-pane label="导航管理" name="3">
                        <navManage />
                    </el-tab-pane>
                </el-tabs>

                <el-breadcrumb
                    separator-class="el-icon-arrow-right"
                    class="my-breadcrumb"
                >
                    <el-breadcrumb-item :to="{ path: '/project-manage' }">
                        项目管理
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>{{ projectName }}</el-breadcrumb-item>
                </el-breadcrumb>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import api from "@/api/view";
import util from "@/util/util";
import { mapState, mapActions } from "vuex";
import homeHead from "@/components/layout/header";
import pageList from "@/components/projectDetail/pageManage/pageList";
import dataSetList from "@/components/projectDetail/dataSetManage/dataSetList";
import navManage from "@/components/projectDetail/navManage/navManage";

export default {
    name: "projectDetail",
    components: {
        homeHead,
        pageList,
        dataSetList,
        navManage,
    },
    provide() {
        return {
            projectDetail: this,
        };
    },
    data() {
        return {
            projectId: "",
            projectName: "",
            activeName: "1",
        };
    },
    computed: {
        ...mapState([]),
    },
    watch: {},
    created() {
        this.init();
    },
    mounted() {},
    beforeDestroy() {
        this.$store.commit("changePageList", []);
    },
    methods: {
        init() {
            //console.log(this.$route);
            let query = this.$route.query;
            this.projectId = query.projectId;
            this.projectName = query.projectName;
            this.$store.commit("changeProjectId", this.projectId);
        },
        tabClick(tab, event) {
            //console.log(tab, event);
        },
    },
};
</script>

<style lang="scss">
.project-detail {
    .el-main {
        min-width: 1120px;
    }
    .el-tabs__header {
        margin-bottom: 20px;
    }
    .my-breadcrumb {
        margin-top: 20px;
    }
}
</style>
