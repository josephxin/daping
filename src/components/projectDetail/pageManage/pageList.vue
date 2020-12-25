<template>
    <div class="page-list">
        <el-row class="my-card-wrapper">
            <el-card class="add gallery" @click.native="createPageClick">
                <div class="mkaddBox">
                    <div class="borderIco">
                        <i class="iconfont icon-xinjian"></i>
                    </div>
                    <span style="margin-top: 15px">新建可视化</span>
                </div>
            </el-card>
            <el-card
                :key="index"
                v-for="(o, index) in pageList"
                :body-style="{ padding: '0px' }"
                class="gallery"
            >
                <div class="editbox">
                    <img :src="o.image || defaultPng" />
                    <div class="pedit">
                        <i
                            @click="handleDelClick(o.pid)"
                            class="iconfont icon-shanchu"
                        ></i>
                        <el-button
                            @click="handleEditClick(o.pid)"
                            icon="el-icon-edit"
                            size="mini"
                        >
                            编辑
                        </el-button>
                    </div>
                </div>
                <div class="pbox" style="padding: 10px">
                    <span :title="o.name" class="pname">{{ o.name }}</span>
                    <router-link
                        class="menu"
                        :to="{ path: 'page-preview', query: { projectId: projectDetail.projectId, pageId: o.pid } }"
                        target="_blank"
                    >
                        <i class="icon iconfont icon-yulan"></i>
                        <span>预览</span>
                    </router-link>
                </div>
            </el-card>
        </el-row>
        <el-pagination
            :page-size="params.pageSize"
            :total="params.total"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next, jumper"
            style="text-align: center"
        >
        </el-pagination>
    </div>
</template>

<script>
import api from "@/api/project";
import util from "@/util/util";
import { mapState, mapActions } from "vuex";
import router from "@/router/router";
export default {
    name: "pageList",
    components: {},
    inject: ["projectDetail"],
    data() {
        return {
            params: {
                projectId: this.projectDetail.projectId,
                pageNum: 1,
                pageSize: 17,
                total: 0,
            },
            defaultPng: "",
        };
    },
    computed: {
        ...mapState(["project"]),
        pageList() {
            return this.project.pageList;
        },
    },
    watch: {},
    created() {
        this.getPageList();
    },
    mounted() {
        this.calcImg();
    },
    updated() {
        this.calcImg();
    },
    beforeDestroy() {},
    methods: {
        calcImg() {
            let allEditbox = document.querySelectorAll(".editbox");
            //console.log(allEditbox);
            allEditbox.forEach((element) => {
                let imgEle = element.children[0];
                element.onmouseover = function (e) {
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
        createPageClick() {
            let routerDesign = router.resolve({
                path: "/page-design",
                query: { projectId: this.projectDetail.projectId },
            });
            window.open(routerDesign.href, "_blank");
        },
        handleEditClick(id) {
            let routerDesign = router.resolve({
                path: "/page-design",
                query: { projectId: this.projectDetail.projectId, pageId: id },
            });
            window.open(routerDesign.href, "_blank");
        },
        handleDelClick(id) {
            this.$confirm("你确定要删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    api.deletePageById(id).then((res) => {
                        if (res.code == 200) {
                            this.$message.success("页面删除成功！");
                            this.getPageList();
                        } else {
                            this.$message.error("页面删除失败！");
                        }
                    });
                })
                .catch(() => {});
        },
        handleCurrentChange(p) {
            this.params.pageNum = p;
            this.getPageList();
        },
        getPageList() {
            api.getPageList(this.params).then((res) => {
                console.log("getPageList -> res", res);
                if (res.code == 200) {
                    let data = res.data;
                    if (data && data.constructor == Object) {
                        let pageList = data.records || [];
                        this.$store.commit("changePageList", pageList);
                        this.params.total = data.total || 0;
                        //如果页码大于1并且数组长度为0则获取上一页的数据
                        if (data.current > 1 && pageList.length == 0) {
                            this.params.pageNum--;
                            this.getPageList();
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
    },
};
</script>

<style lang="scss" scoped>
.page-list {
}
</style>
