<template>
    <div :style="navStyle" class="navigator">
        <div class="back">
            <a @click="geturl" style="cursor: pointer">
                <img src="../assets/image/largelist.png" />
            </a>
        </div>
        <div class="title">
            <a>数据可视化工具</a>
            <img src="../assets/image/titleBg.png" />
        </div>
        <div class="comsList">
            <compsmenu></compsmenu>
        </div>
        <div class="controlBar">
            <a href="javascript:void(0)" @click="savePage" class="btn">
                <span class="icon icon-save"></span>
                <span class="text">保存</span>
            </a>
            <a href="javascript:void(0)" @click="saveAsPage" class="btn">
                <span class="icon icon-save"></span>
                <span class="text">另存</span>
            </a>
            <a href="javascript:void(0)" @click="jumpPreviewPage" class="btn">
                <span class="icon icon-pre"></span>
                <span class="text">预览</span>
            </a>
        </div>
        <el-dialog
            :close-on-click-modal="false"
            :visible.sync="dialogFormVisible"
            class="savedialog common-dialog"
            :title="dialogTitle"
            width="600px"
            :show-close="false"
            size="mini"
        >
            <el-form
                ref="form"
                :model="formObj"
                :rules="rules"
                label-width="100px"
            >
                <el-form-item
                    label="选择项目："
                    prop="targetProjectId"
                    v-if="dialogTitle == '另存'"
                >
                    <el-select
                        v-model="formObj.targetProjectId"
                        placeholder="请选择项目"
                    >
                        <el-option
                            v-for="(item, index) in projectList"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="页面名称：" prop="name">
                    <el-input
                        v-model="formObj.name"
                        placeholder="请输入页面名称"
                        auto-complete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="页面描述：" prop="description">
                    <el-input
                        :rows="4"
                        type="textarea"
                        v-model="formObj.description"
                        placeholder="请输入页面描述"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button
                    @click="onSubmit('form')"
                    type="primary"
                    class="primary-button"
                    :loading="loading"
                    >{{ loading ? "保存中..." : "确 定" }}
                </el-button>
                <el-button
                    @click="dialogFormVisible = false"
                    class="primary-info"
                    >取 消</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from "@/api/project";
import { mapState, mapActions, mapGetters } from "vuex";
import compsmenu from "./CompsMenu";
import util from "@/util/util";
import html2canvas from "@/plugin/html2canvas";

export default {
    name: "NavigatorBar",
    data() {
        return {
            dialogTableVisible: false,
            dialogFormVisible: false,
            dialogTitle: "",
            formObj: {
                sourceProjectId: "",
                targetProjectId: "",
                pid: "",
                name: "",
                description: "",
                imgPath: "",
            },
            rules: {
                targetProjectId: [
                    {
                        required: true,
                        message: "请选择项目",
                        trigger: "change",
                    },
                ],
                name: [
                    {
                        required: true,
                        message: "请输入页面名称",
                        trigger: "blur",
                    },
                ],
                description: [
                    {
                        required: true,
                        message: "请输入页面描述",
                        trigger: "blur",
                    },
                ],
            },
            loading: false,
        };
    },
    components: {
        compsmenu,
    },
    computed: {
        ...mapState(["project", "window"]),
        ...mapGetters(["compList"]),
        projectList() {
            return this.project.projectList;
        },
        projectId() {
            return this.project.projectId;
        },
        pageId() {
            return this.window.pageId;
        },
        pageIdMsg() {
            return this.window.pageIdMsg;
        },
        navStyle: function () {
            return {
                height: this.window.nav.height + "px",
                "line-height": this.window.nav.height + "px",
            };
        },
    },
    created() {
        this.getProjectList();
    },
    mounted() {
        let projectId = util.getQueryString("projectId") || "";
        let pageId = util.getQueryString("pageId") || "";
        this.$store.commit("changeProjectId", projectId);
        this.$store.commit("changePageId", pageId);
    },
    methods: {
        ...mapActions([
            "saveDataAndJump",
            "save",
            "publish",
            "clickPreviewPanel",
        ]),
        getProjectList() {
            api.getProjectList({
                pageNum: 1,
                pageSize: 10000,
            }).then((res) => {
                console.log("getProjectList -> res", res);
                if (res.code == 200) {
                    let data = res.data;
                    if (data && data.constructor == Object) {
                        let projectList = data.records || [];
                        this.$store.commit("changeProjectList", projectList);
                    }
                } else {
                    this.$store.commit("changeProjectList", []);
                    this.$message.error("项目列表获取失败！");
                }
            });
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.clickPreviewPanel(); //使design的组件失去焦点 不显示辅助线
                    this.loading = true;
                    setTimeout(() => {
                        this.saveImage().then((canvas) => {
                            this.formObj.imgPath = canvas.toDataURL(
                                "image/png"
                            );
                            this.save(this).then((res) => {
                                this.dialogFormVisible = false;
                                this.loading = false;
                            });
                        });
                    }, 10);
                }
            });
        },
        geturl() {
            if (this.compList.length <= 0) {
                this.$router.push({ name: "projectManage" });
            } else {
                this.$confirm("确定返回到首页吗?", "提示", {
                    confirmButtonText: "是",
                    cancelButtonText: "否",
                    type: "warning",
                })
                    .then(() => {
                        this.$router.push({ name: "projectManage" });
                    })
                    .catch(() => {});
            }
        },
        jumpPreviewPage: function () {
            let params = {};
            params["vue"] = this;
            if (util.dataSaveMode() == util.serverMode) {
                if (!this.pageId) {
                    this.$alert("请先保存再操作", "提示", {
                        confirmButtonText: "确定",
                    });
                    return;
                }
                this.saveImage().then((canvas) => {
                    let obj = {
                        sourceProjectId: this.projectId,
                        targetProjectId: this.projectId,
                        pid: this.pageId,
                        name: this.pageIdMsg.name,
                        description: this.pageIdMsg.description,
                        imgPath: canvas.toDataURL("image/png"),
                    };
                    Object.assign(this.formObj, util.deepCopy(obj));
                    this.saveDataAndJump(params);
                });
            } else {
                this.saveDataAndJump(params);
            }
        },
        // 保存
        savePage() {
            this.dialogTitle = "保存";
            let obj = {
                sourceProjectId: this.projectId,
                targetProjectId: this.projectId,
                pid: this.pageId,
                name: this.pageIdMsg.name,
                description: this.pageIdMsg.description,
                imgPath: this.pageIdMsg.image,
            };
            Object.assign(this.formObj, util.deepCopy(obj));
            this.dialogFormVisible = true;
        },
        // 另存
        saveAsPage() {
            this.dialogTitle = "另存";
            let obj = {
                sourceProjectId: this.projectId,
                targetProjectId: this.projectId,
                pid: "",
                name: "",
                description: "",
                imgPath: "",
            };
            Object.assign(this.formObj, util.deepCopy(obj));
            this.dialogFormVisible = true;
        },
        saveImage() {
            let screen = document.querySelector("#printscreen");
            let scale = 270 / (screen.style.width || screen.clientWidth);
            let imagePromise = html2canvas(screen, {
                ignoreElements: function (element) {
                    // 过滤掉选择的组件
                    return element.id && /comp_\d+\-covg/.test(element.id);
                },
                useCORS: true,
                async: false, //是否为异步
                scale: scale, // 缩放
                logging: true, // 输入日志
            });
            return imagePromise;
        },
        publishPage: function () {
            this.publish(this);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.navigator {
    min-width: 1150px;
    // background: url(../assets/image/bg_top.png) repeat-x;
    background-image: linear-gradient(
        to bottom,
        rgb(254, 254, 254),
        rgb(248, 248, 248)
    );
    box-shadow: 0 1px 5px 1px rgba(100, 100, 100, 0.7);
    margin-bottom: 1px;
}

.comsList {
    float: left;
}

.back {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    background-image: linear-gradient(
        to bottom right,
        rgb(85, 155, 255),
        rgb(105, 189, 255)
    ) !important;

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: #fff;
    }

    button {
        width: 85px;
        background: #05d5f0;
        color: #fff;
        height: 35px;
        border-radius: 0px 0px 5px 5px;
        cursor: pointer;
        text-align: center;
        vertical-align: top;
        outline: none;

        a {
            i::before {
                font-size: 28px;
                margin-right: 5px;
                color: #fff;
            }

            text-decoration: none;
            color: #fff;
            display: block;
        }
    }
}

.title {
    width: auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;

    a {
        position: absolute;
        margin: auto;
        font-weight: bold;
        color: #76aaff;
        font-family: "Microsoft YaHei", serif;
    }
}

.controlBar {
    float: right;
    display: flex;
    justify-content: center;
    height: 100%;

    .btn {
        padding: 5px 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;

        .text {
            margin-left: 3px;
            text-align: center;
            font-size: 13px;
            color: rgb(85, 155, 255);
        }

        .icon {
            width: 14px;
            height: 100%;
            background-position: 0 center;
            background-size: 12px auto;
            background-repeat: no-repeat;

            &.icon-save {
                background-image: url(../assets/image/titleSave.png);
            }

            &.icon-pre {
                background-image: url(../assets/image/titlePrv.png);
            }

            &.icon-publish {
                background-image: url(../assets/image/publish.png);
            }
        }
    }
}

.savedialog {
    .el-form-item {
        width: 85%;
        margin: 0px auto 22px auto;
    }

    .el-dialog__body {
        padding-top: 0px !important;
        padding-bottom: 0px !important;
    }
}
</style>
