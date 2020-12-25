<template>
    <div style="position: relative">
        <el-row class="my-card-wrapper">
            <el-card class="add gallery" @click.native="createProject">
                <div class="mkaddBox">
                    <div class="borderIco">
                        <i class="iconfont icon-xinjian"></i>
                    </div>
                    <span style="margin-top: 15px">新建项目</span>
                </div>
            </el-card>
            <el-card
                :key="index"
                v-for="(o, index) in listData"
                :body-style="{ padding: '0px' }"
                class="gallery"
            >
                <div class="editbox">
                    <img :src="o.pageImage || defaultPng" />
                    <div class="pedit">
                        <i
                            @click="handleDelClick(o.id)"
                            class="iconfont icon-shanchu"
                        ></i>
                        <p class="pedit-p">
                            <span>创建时间：</span
                            ><span>{{ o.createTime || "--" }}</span>
                        </p>
                        <p class="pedit-p">
                            <span>修改时间：</span
                            ><span>{{ o.updateTime || "--" }}</span>
                        </p>
                        <p class="pedit-p">
                            <span>页面数量：</span
                            ><span>{{ o.pageCount || 0 }}</span>
                        </p>
                        <el-button
                            @click="handleEditClick(o)"
                            icon="el-icon-edit"
                            size="mini"
                        >
                            编辑
                        </el-button>
                    </div>
                </div>
                <div class="pbox" style="padding: 10px">
                    <span
                        :title="o.name"
                        class="pname"
                        style="cursor: pointer"
                        @click="goProjectDetail(o.id, o.name)"
                        >{{ o.name || "--" }}</span
                    >
                    <router-link
                        class="menu"
                        :to="{
                            path: 'project-preview',
                            query: { projectId: o.id },
                        }"
                        target="_blank"
                    >
                        <i class="icon iconfont icon-yulan"></i>
                        <span>预览</span>
                    </router-link>
                </div>
            </el-card>
        </el-row>
        <el-pagination
            :page-size="pageSize"
            :total="total"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next, jumper"
            style="text-align: center"
        >
        </el-pagination>
    </div>
</template>

<script>
import util from "@/util/util";
import router from "@/router/router";
import defaultPng from "@/assets/bg.png";
export default {
    inject: ["projectList"],
    props: {
        listData: {
            type: Array,
        },
        pageSize: {
            type: Number,
        },
        total: {
            type: Number,
        },
    },
    data() {
        return {
            defaultPng: defaultPng,
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.calcImg();
    },
    updated() {
        this.calcImg();
    },
    methods: {
        calcImg() {
            let allEditbox = document.querySelectorAll(".editbox");
            //console.log(allEditbox);
            allEditbox.forEach((element) => {
                let imgEle = element.children[0];
                element.onmouseover = function () {
                    let num = imgEle.clientHeight - 160;
                    if (num > 0) {
                        imgEle.style.marginTop = -num + "px";
                    }
                };
                element.onmouseout = function () {
                    imgEle.style.marginTop = 0;
                };
            });
        },
        //点击新建项目-显示新建项目弹窗
        createProject() {
            this.projectList.showProjectDialog("新建项目");
        },
        //点击编辑按钮-显示修改项目弹窗
        handleEditClick(project) {
            this.projectList.showProjectDialog("编辑项目", project);
        },
        //点击项目名称-进入项目详情
        goProjectDetail(id, name) {
            this.$router.push({
                //name: 'navManage',
                name: "projectDetail",
                query: {
                    projectId: id,
                    projectName: name,
                },
            });
        },
        //点击删除按钮-调删除项目接口
        handleDelClick(id) {
            this.$confirm("你确定要删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$emit("del", id);
                })
                .catch(() => {});
        },
        handleCurrentChange(val) {
            this.$emit("page", val);
        },
    },
};
</script>

