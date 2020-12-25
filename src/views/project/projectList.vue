<template>
    <div class="project-list">
        <homeHead></homeHead>
        <el-container>
            <el-main style="height: 90vh">
                <contents
                    :listData="projectList"
                    :pageSize="params.pageSize"
                    :total="params.total"
                    @del="deleteProject"
                    @page="getPage"
                ></contents>
                <projectDialog
                    ref="projectDialogRef"
                    @addProject="addProject"
                    @modifyProject="modifyProject"
                />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import api from "@/api/project";
import util from "@/util/util";
import { mapState, mapActions } from "vuex";
import homeHead from "@/components/layout/header";
import contents from "@/components/projectList/content";
import projectDialog from "@/components/dialog/projectDialog";

export default {
    name: "projectList",
    components: {
        homeHead,
        contents,
        projectDialog,
    },
    provide() {
        return {
            projectList: this,
        };
    },
    data() {
        return {
            params: {
                pageNum: 1,
                pageSize: 17,
                total: 0,
            },
        };
    },
    computed: {
        ...mapState(["project"]),
        projectList() {
            return this.project.projectList;
        },
    },
    watch: {},
    created() {
        this.getProjectList();
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        getProjectList() {
            api.getProjectList(this.params).then((res) => {
                console.log("getProjectList -> res", res);
                if (res.code == 200) {
                    let data = res.data;
                    if (data && data.constructor == Object) {
                        let projectList = data.records || [];
                        this.$store.commit("changeProjectList", projectList);
                        this.params.total = data.total || 0;
                        //如果页码大于1并且数组长度为0则获取上一页的数据
                        if (data.current > 1 && projectList.length == 0) {
                            this.params.pageNum--;
                            this.getProjectList();
                        }
                    }
                } else {
                    this.$alert(res.message, "提示", {
                        confirmButtonText: "确定",
                        type: "error",
                        callback: (action) => {},
                    });
                }
            });
        },
        getPage(p) {
            this.params.pageNum = p;
            this.getProjectList();
        },
        deleteProject(id) {
            api.deleteProject(id).then((res) => {
                console.log("handleDelClick -> res", res);
                this.interfaceHandle(res);
            });
        },
        showProjectDialog(title, project) {
            this.$refs.projectDialogRef.open(title, project);
        },
        addProject(form) {
            //调新建项目的接口，接口成功后调列表接口
            api.addProject(form).then((res) => {
                console.log("addProject -> res", res);
                this.interfaceHandle(res);
            });
        },
        modifyProject(form, id) {
            //console.log("modifyProject -> form, id", form, id)
            //调修改项目的接口，接口成功后调列表接口
            api.updateProject(form, id).then((res) => {
                console.log("updateProject -> res", res);
                this.interfaceHandle(res);
            });
        },
        interfaceHandle(res) {
            if (res.code == 200) {
                this.getProjectList();
            } else {
                this.$alert(res.message, "提示", {
                    confirmButtonText: "确定",
                    type: "error",
                    callback: (action) => {},
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.project-list {
    .el-main {
        min-width: 1120px;
    }
}
</style>
