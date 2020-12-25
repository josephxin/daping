<template>
    <div class="page page-preview">
        <div class="preview-comp-item-container">
            <preview-comp-item
                v-for="(comp, key) in compMap"
                :key="key"
                :compConf="comp"
                v-if="
                    ['layerChildren', 'themeLayer'].indexOf(comp.compType) ===
                    -1
                "
            ></preview-comp-item>
        </div>
    </div>
</template>
<script>
import previewCompItem from "@/components/previewCompItem";
import { mapActions, mapState } from "vuex";
import util from "@/util/util";
import api from "@/api/project";

export default {
    name: "preview",
    components: {
        previewCompItem,
    },
    props: {
        isProjectPreview: {
            type: Boolean,
            default: false,
        },
        pageId: {
            type: String,
            default: "",
        },
        pageParam: {
            type: Object,
        },
    },
    data() {
        return {
            flag: true, //开关，用于全局参数
        };
    },
    computed: {
        ...mapState(["preview"]),
        compMap: function () {
            return this.preview.components.value;
        },
        pageIdAndParams() {
            const { pageId, pageParam } = this;
            return {
                pageId,
                pageParam,
            };
        },
    },
    watch: {
        pageIdAndParams: {
            handler(newVal, oldVal) {
                this.getPageDetail();
            },
            deep: true,
        },
    },
    created() {},
    mounted: function () {
        //必须写在mounted里面，否则修改代码保存后，页面的数据丢失
        //执行顺序created->beforeDestroy->mounted
        let query = this.$route.query;
        this.$store.commit("changeProjectId", query.projectId);
        this.getPageDetail();
        window.onresize = () => {
            if (this.flag) {
                this.initPageSize();
            }
        };
    },
    beforeDestroy() {
        document.querySelector("#app").style.background = "none";
        this.$store.commit("clearData");
        this.$evtBus.clearCycle();
    },
    methods: {
        ...mapActions(["initPageSize"]),
        getPageDetail() {
            let pageId = "";
            if (this.isProjectPreview) {
                pageId = this.pageId;
                if (!pageId) {
                    this.$message.error("此菜单项没有配置页面，无法跳转！");
                    return;
                }
            } else {
                pageId = util.getQueryString("pageId");
            }
            this.$store.commit("setStatus", true);
            if (util.dataSaveMode() == util.serverMode || pageId) {
                // 加载预览数据
                api.getPageDetail(pageId).then((res) => {
                    //console.log("getPageDetail -> res", res);
                    if (res.code != 200) {
                        this.$alert(res.message, "提示", {
                            confirmButtonText: "确定",
                            type: "error",
                        });
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
                        console.error("getPageDetail -> error", error);
                        return;
                    }
                    window.debug = conf.isShowLog;
                    let globalParams = conf.globalParams;
                    if (
                        globalParams &&
                        Array.isArray(globalParams) &&
                        globalParams.length
                    ) {
                        this.flag = this.analysisParams(globalParams);
                    }
                    if (this.flag) {
                        this.$store.dispatch("loadData", conf).then((res) => {
                            this.initPageSize();
                        });
                    }
                });
            } else {
                console.log("本地模式且没有pageId");
                window.debug = localStorage.getItem("isShowLog") ? true : false;
                this.$store.dispatch("loadData", null).then((res) => {
                    this.initPageSize();
                });
            }
        },
        analysisParams(globalParams) {
            //第一种情况：项目预览，设计时定义的参数和父组件传过来的pageParam进行比对。
            //第二种情况：大屏页面预览，设计时定义的参数和地址栏参数进行比对。
            //如果定义的必填参数没传，则显示提示信息并且阻止页面加载；如果定义的非必填参数没传，则使用默认参数值。地址栏中非定义的参数会被忽略。
            //console.log("analysisParams -> globalParams", globalParams);
            let pageParam;
            if (this.isProjectPreview) {
                pageParam = this.pageParam; //菜单项中的页面参数
            } else {
                pageParam = util.getAllUrlParams(); //地址栏中的页面参数
            }
            //console.log("analysisParams -> pageParam", pageParam);
            let resultParams = {};
            for (let i = 0; i < globalParams.length; i++) {
                let item = globalParams[i];
                let name = item.name;
                let value = pageParam[name];
                if (item.required) {
                    if (!value) {
                        this.$alert(`参数错误，缺少必传参数：${name}`, "提示", {
                            confirmButtonText: "确定",
                            type: "error",
                            callback: (action) => {},
                        });
                        return false;
                    } else {
                        resultParams[name] = value;
                    }
                } else {
                    if (!value) {
                        resultParams[name] = item.value;
                    } else {
                        resultParams[name] = value;
                    }
                }
            }
            console.log("analysisParams -> resultParams", resultParams);
            //将处理好的参数保存在store.window中
            this.$store.commit("changePreviewParams", resultParams);
            return true;
        },
    },
};
</script>
