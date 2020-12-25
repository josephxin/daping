<template>
    <el-dialog
        :title="title"
        class="common-dialog"
        custom-class="nav-menu-dialog"
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
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" clearable></el-input>
            </el-form-item>

            <el-form-item label="图标" prop="iconPath">
                <uploadIcon v-model="form.iconPath" />
            </el-form-item>

            <el-form-item label="描述" prop="descr">
                <el-input v-model="form.descr" clearable></el-input>
            </el-form-item>

            <el-form-item label="索引" v-if="title == '修改'">
                <el-select
                    class="my-select"
                    v-model="currentIndex"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="(item, index) in menuLen"
                        :key="index"
                        :label="index"
                        :value="index"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="页面名称" prop="pageId">
                <!-- name为空时，下拉框中的选项显示pid -->
                <el-select
                    class="my-select"
                    v-model="form.pageId"
                    placeholder="请选择对应页面"
                    filterable
                    clearable
                    @change="pageIdChange"
                >
                    <el-option
                        v-for="(item, index) in pageList"
                        :key="index"
                        :label="item.name"
                        :value="item.pid"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="页面参数">
                <el-table :data="globalParams" size="mini" border>
                    <el-table-column
                        prop="name"
                        label="参数名"
                    ></el-table-column>

                    <el-table-column label="参数值">
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.value"
                                clearable
                                size="mini"
                            ></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="description"
                        label="描述"
                        show-overflow-tooltip
                    ></el-table-column>

                    <el-table-column
                        prop="required"
                        label="是否必填"
                        width="80"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.required ? "是" : "否" }}
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button class="primary-button" type="primary" @click="saveData">
                确 定
            </el-button>
            <el-button class="info-button" @click="close">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import api from "@/api/project";
import util from "@/util/util";
import { mapState, mapActions } from "vuex";
import uploadIcon from "./uploadIcon";

export default {
    name: "addMenuItemDialog",
    components: {
        uploadIcon,
    },
    inject: ["navManage"],
    data() {
        return {
            dialogVisible: false,
            title: "添加",
            form: {
                name: "",
                iconPath: "",
                descr: "",
                pageId: "",
                pageName: "",
                pageParam: {},
                children: [],
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入名称",
                        trigger: "blur",
                    },
                ],
            },
            globalParams: [],
            //下面变量用于修改时排序
            currentIndex: 0,
            menuLen: 0,
        };
    },
    computed: {
        ...mapState(["project"]),
        pageList() {
            return this.project.pageList;
        },
    },
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {
        open(title) {
            this.title = title;
            this.dialogVisible = true;
        },
        close() {
            // 清空表单，关闭对话框
            this.form.name = "";
            this.form.iconPath = "";
            this.form.descr = "";
            this.form.pageId = "";
            this.form.pageName = "";
            this.form.pageParam = {};
            this.form.children = [];
            this.globalParams = [];
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
            this.dialogVisible = false;
        },
        pageIdChange(val) {
            if (val) {
                // 调接口，通过pid获取pageParam
                this.getPageParams(val);
                // 通过pid获取name
                let pageList = this.pageList;
                for (let i = 0; i < pageList.length; i++) {
                    const item = pageList[i];
                    if (val == item.pid) {
                        this.form.pageName = item.name;
                        break;
                    }
                }
            } else {
                this.globalParams = [];
                this.form.pageName = "";
            }
        },
        getPageParams(pid) {
            api.getPageDetail(pid).then((res) => {
                //console.log("getPageParams -> res", res)
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return;
                }
                let data = res.data;
                if (!data) {
                    this.$message.error("属性data不存在！");
                    return;
                }
                let conf;
                try {
                    conf = JSON.parse(data.conf);
                } catch (error) {
                    console.error("getPageParams -> error", error);
                    return;
                }
                //console.log("getPageParams -> conf", conf)
                let globalParams = conf.globalParams || [];
                console.log("getPageParams -> globalParams", globalParams);
                this.globalParams = util.deepCopy(globalParams);
            });
        },
        fillPageParams(pid) {
            api.getPageDetail(pid).then((res) => {
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return;
                }
                let data = res.data;
                if (!data) {
                    this.$message.error("属性data不存在！");
                    return;
                }
                let conf;
                try {
                    conf = JSON.parse(data.conf);
                } catch (error) {
                    console.error("getPageParams -> error", error);
                    return;
                }
                let globalParams = util.deepCopy(conf.globalParams || []);
                let pageParam = this.form.pageParam; //对象
                globalParams.map((item, i) => {
                    item.value = pageParam[item.name];
                });
                console.log("fillPageParams -> globalParams", globalParams);
                this.globalParams = globalParams;
            });
        },
        checkPageParams(form) {
            let pageParam = {};
            for (let index = 0; index < this.globalParams.length; index++) {
                const item = this.globalParams[index];
                if (item.required && !item.value) {
                    this.$message.error("页面参数中的必填参数不能为空！");
                    return false;
                }
                pageParam[item.name] = item.value;
            }
            form.pageParam = pageParam;
            return true;
        },
        saveData() {
            //点击确定按钮，将form添加到数组中
            let form = util.deepCopy(this.form);
            let checkResult = this.checkPageParams(form);
            //console.log(form);
            this.$refs.form.validate((valid) => {
                if (valid && checkResult) {
                    if (this.title == "添加") {
                        this.$emit("addMenu", form);
                    } else {
                        this.$emit("modifyMenu", form);
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
    .nav-menu-dialog {
        min-width: 600px;
        .my-select {
            width: 100%;
        }
        .el-table {
            th {
                line-height: 1;
            }
        }
    }
}
</style>