<template>
    <div class="project-preview">
        <preview
            v-if="pageId"
            :isProjectPreview="true"
            :pageId="pageId"
            :pageParam="pageParam"
        />
        <page404 v-if="!firstLoad && !pageId" />
        <component
            :is="nav.typeId"
            :nav="nav"
            :menuItemId="menuItemId"
            ref="navComp"
        />
    </div>
</template>

<script>
import api from "@/api/project";
import util from "@/util/util";
import { mapState, mapActions } from "vuex";
import preview from "@/views/preview/pagePreview.vue";
import page404 from "@/components/errorPage/404.vue";

export default {
    name: "projectPreview",
    components: {
        preview,
        page404,
    },
    provide() {
        return {
            projectPreview: this,
        };
    },
    data() {
        return {
            nav: {},
            pageId: "",
            pageParam: {},
            menuItemId: "",
            firstLoad: true,
        };
    },
    computed: {
        ...mapState(["project"]),
    },
    watch: {},
    created() {
        //调接口，通过projectId获取项目导航
        let projectId = this.$route.query.projectId;
        this.getProjectNav(projectId);
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        getProjectNav(projectId) {
            //通过项目id获取项目导航
            api.getNavByProjectId(projectId).then((res) => {
                console.log("getProjectNav -> res", res);
                if (res.code == 200) {
                    let data = res.data;
                    if (
                        data &&
                        data.constructor == Object &&
                        Object.keys(data).length
                    ) {
                        this.nav = util.deepCopy(data);
                        this.menuItemId = this.nav.navigationItemId;
                        let menu = this.nav.menuList || [];
                        this.getPageId(menu);
                    }
                }
            });
        },
        getPageId(menu) {
            for (let i = 0; i < menu.length; i++) {
                const menuItem = menu[i];
                if (menuItem.id == this.menuItemId) {
                    this.pageId = menuItem.pageId;
                    this.pageParam = menuItem.pageParam;
                    this.firstLoad = false;
                    //console.log("getPageId -> this.pageId", this.pageId);
                    return true;
                }
                if (menuItem.children.length) {
                    let children = menuItem.children;
                    let flag = this.getPageId(children);
                    if (flag) {
                        return true;
                    }
                }
            }
            return false;
        },
        changeMenuItem(pageId, pageParam) {
            //console.log("changeMenuItem", pageId, pageParam);
            //导航菜单项所对应的pageId可能相同，但pageParam可能不同
            // this.pageId = '';
            // setTimeout(()=>{
                this.$store.commit("clearData");
                this.$evtBus.clearCycle();
                this.pageId = pageId;
                this.pageParam = pageParam;
            // })
        },
    },
};
</script>

<style lang="scss" scoped>
.project-preview {
    position: relative;
    height: 100%;
}
</style>
