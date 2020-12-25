<template>
    <div style="position: relative">
        <el-row class="my-card-wrapper">
            <el-card class="add gallery" @click.native="mkadd">
                <div class="mkaddBox">
                    <div class="borderIco">
                        <i class="iconfont icon-xinjian"></i>
                    </div>
                    <span style="margin-top: 15px">新建可视化</span>
                </div>
            </el-card>
            <el-card
                :key="index"
                v-for="(o, index) in this.list.datas"
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
                        :to="{ path: 'preview', query: { pageId: o.pid } }"
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
            style="text-align: center;"
        >
        </el-pagination>
    </div>
</template>

<script>
import api from "@/api/view";
import util from "@/util/util";
import router from "@/router/router";
export default {
    data() {
        return {
            defaultPng: "",
        };
    },
    props: ["listData"],
    components: {},
    computed: {
        list() {
            return this.listData;
        },
        pageSize() {
            return Object.keys(this.list).length > 0
                ? this.list.page.pageSize
                : 1000;
        },
        total() {
            return Object.keys(this.list).length > 0
                ? this.list.page.rowCount
                : 1000;
        },
    },
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
        mkadd() {
            // this.$router.push({path: 'design'})
            //设计页从新页面打开
            let routerDesign = router.resolve({ path: "/design" });
            window.open(routerDesign.href, "_blank");
        },
        handleEditClick(id) {
            // this.$router.push({path: 'design', query: {pageId: id}})
            let routerDesign =  router.resolve({ path: '/design', query: {pageId: id}})
            window.open(routerDesign.href, '_blank');
        },
        handleDelClick(id) {
            this.$confirm("你确定要删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    api.delete(`${util.appServerURL()}view/${id}`).then(
                        (res) => {
                            if (res.state == 1) {
                                this.$emit("del");
                            } else {
                                this.$alert(res.message, "提示", {
                                    confirmButtonText: "确定",
                                    type: "error",
                                    callback: (action) => {},
                                });
                            }
                        }
                    );
                })
                .catch(() => {});
        },
        handleCurrentChange(val) {
            this.$emit("page", val);
        },
    },
};
</script>

