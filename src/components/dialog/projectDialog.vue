<template>
    <el-dialog
        :title="title"
        class="common-dialog"
        custom-class="project-dialog"
        width="40%"
        append-to-body
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :before-close="close"
    >
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="100px"
            size="medium"
        >
            <el-form-item label="项目名称" prop="name">
                <el-input v-model="form.name" clearable></el-input>
            </el-form-item>

            <el-form-item
                label="项目封面"
                prop="pageId"
                v-if="title == '编辑项目'"
            >
                <el-select
                    class="my-select"
                    v-model="form.pageId"
                    placeholder="请选择"
                    clearable
                    @change="pageChange"
                    @clear="clearPageSelect"
                >
                    <el-option
                        v-for="(item, index) in pageList"
                        :key="index"
                        :label="item.name"
                        :value="item.pid"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button class="primary-button" type="primary" @click="saveData"
                >确 定</el-button
            >
            <el-button class="info-button" @click="close">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import util from "@/util/util";
import api from "@/api/project";

export default {
    name: "projectDialog",
    components: {},
    inject: ["projectList"],
    data() {
        return {
            dialogVisible: false,
            title: "",
            form: {
                name: "",
                pageId: "",
                pageImage: "",
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入项目名称",
                        trigger: "blur",
                    },
                ],
            },
            pageList: [],
            projectId: 0,
        };
    },
    computed: {
        ...mapState([]),
    },
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {
        open(title, project) {
            this.title = title;
            this.dialogVisible = true;
            if (project) {
                this.fillForm(project);
            }
        },
        close() {
            // 清空表单，关闭对话框
            this.form.pageImage = "";
            this.$refs.form.resetFields();
            this.pageList = [];
            this.dialogVisible = false;
        },
        fillForm(project) {
            this.form.name = project.name;
            this.form.pageId = project.pageId;
            this.form.pageImage = project.pageImage;
            //通过projectId获取项目内页面列表
            this.projectId = project.id;
            this.getPageList();
        },
        getPageList() {
            api.getPageList({
                projectId: this.projectId,
                pageNum: 1,
                pageSize: 1000,
            }).then((res) => {
                console.log("getPageList -> res", res);
                if (res.code == 200) {
                    let data = res.data;
                    if (data && data.constructor == Object) {
                        let pageList = data.records || [];
                        this.pageList = pageList;
                    }
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        pageChange(val) {
            //console.log("pageChange -> val", val);
            if (val) {
                for (let index = 0; index < this.pageList.length; index++) {
                    const item = this.pageList[index];
                    if (item.pid == val) {
                        this.form.pageImage = item.image;
                        break;
                    }
                }
            }
        },
        //清空时，@change和@clear事件都执行
        clearPageSelect() {
            this.form.pageImage = "";
        },
        saveData() {
            //点击确定按钮，将form添加到数组中
            let form = util.deepCopy(this.form);
            //console.log(form);
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.title == "新建项目") {
                        this.$emit("addProject", form);
                    } else {
                        this.$emit("modifyProject", form, this.projectId);
                    }
                    this.close();
                }
            });
        },
    },
};
</script>

<style lang="scss">
.common-dialog {
    .project-dialog {
        min-width: 400px;
        .my-select {
            width: 100%;
        }
    }
}
</style>