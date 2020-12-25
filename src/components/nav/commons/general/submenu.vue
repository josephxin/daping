<template>
    <!-- 当采用递归方式生成导航栏的子菜单时，菜单可以正常生成，但是当鼠标hover时，会出现循环调用某个（mouseenter）事件，导致最后报错
    注：2.13.2 版本，只需对子菜单设置属性 :popper-append-to-body="false" 就不会出现这个问题了 -->
    <el-submenu
        :index="menuItem.id"
        :ref="menuItem.id"
        :data-id="menuItem.id"
        :popper-append-to-body="false"
    >
        <div class="submenu-title" slot="title" @click.stop="submenuClick(menuItem)">
            <img class="menu-icon" :src="menuItem.iconPath" />
            <span>{{ menuItem.name }}</span>
        </div>
        <template v-for="(item, i) in menuItem.children">
            <el-menu-item
                :index="item.id"
                :key="i"
                v-if="item.children.length == 0"
            >
                <img class="menu-icon" :src="item.iconPath" />
                <span>{{ item.name }}</span>
            </el-menu-item>
            <submenu :menuItem="item" :key="i" v-else />
        </template>
    </el-submenu>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "submenu",
    inject: ["projectPreview", "navComp"],
    props: {
        menuItem: {
            type: Object,
        },
    },
    data() {
        return {};
    },
    computed: {
        ...mapState([]),
    },
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {
        submenuClick(menuItem) {
            let { pageId, pageParam, id } = menuItem;
            if (pageId) {
                this.projectPreview.changeMenuItem(pageId, pageParam);
                this.changeActive(id);
            } else {
                this.$message.error("此菜单项没有配置页面，无法跳转！");
            }
        },
        changeActive(id) {
            let rootEle = document.querySelector("#my-menu");
            //移除菜单下所有元素的高亮状态-插件的
            this.iterateNode(rootEle);
            //移除菜单下所有元素的高亮状态-自己的
            this.navComp.iterateNode(rootEle, "menu-active");
            //设置当前选中的菜单项为高亮
            let activeEle = this.$refs[id].$el;
            this.navComp.setSelectedActive(activeEle);
        },
        // 遍历指定元素下所有的子元素
        iterateNode(parent) {
            for (var i = 0; i < parent.children.length; i++) {
                var child = parent.children[i];
                //console.log(child.classList);//类数组对象
                //classList.add()如果指定的类名已存在，则不会添加
                if (child.classList.contains("is-active")) {
                    if (child.classList.contains("el-submenu")) {
                        child.children[0].classList.add("not");
                    }
                    if (child.classList.contains("el-menu-item")) {
                        child.classList.add("not");
                    }
                }
                // 递归调用
                this.iterateNode(child);
            }
        },
    },
};
</script>

<style lang="scss">
.submenu-title {
    display: inline-block;
    height: 100%;
    vertical-align: top;
}
</style>