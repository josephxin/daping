<template>
    <div class="horizontal-nav" :style="position">
        <el-menu
            :default-active="menuItemId"
            id="my-menu"
            mode="horizontal"
            menu-trigger="hover"
            @select="handleSelect"
        >
            <template v-for="(menuItem, index) in menu">
                <el-menu-item
                    :index="menuItem.id"
                    :key="index"
                    v-if="menuItem.children.length == 0"
                >
                    <img class="menu-icon" :src="menuItem.iconPath" />
                    <span>{{ menuItem.name }}</span>
                </el-menu-item>
                <submenu :menuItem="menuItem" :key="index" v-else />
            </template>
        </el-menu>
    </div>
</template>

<script>
import { mapState } from "vuex";
import AbstractComp from "../commons/general/AbstractComp.js";

export default {
    name: "horizontalNav",
    mixins: [AbstractComp],
    data() {
        return {};
    },
    computed: {
        ...mapState([]),
        position() {
            let style = {};
            switch (this.positionId) {
                case "top":
                    style = {
                        top: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                    };
                    break;
                case "left-top":
                    style = {
                        top: "10px",
                        left: "10px",
                    };
                    break;
                case "right-top":
                    style = {
                        top: "10px",
                        right: "10px",
                    };
                    break;
                case "bottom":
                    style = {
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                    };
                    break;
                case "left-bottom":
                    style = {
                        bottom: "10px",
                        left: "10px",
                    };
                    break;
                case "right-bottom":
                    style = {
                        bottom: "10px",
                        right: "10px",
                    };
                    break;
            }
            return style;
        },
    },
    created() {},
    beforeDestroy() {},
};
</script>

<style lang="scss">
.horizontal-nav {
    z-index: 9999;
    position: absolute;
    .el-menu--horizontal {
        border-bottom: none;
        /* > .el-submenu.is-active .el-submenu__title {
        border-bottom: none;
        }

        > .el-submenu.is-active > .el-submenu__title {
            border-bottom: 2px solid #409eff;
        } */

        > .el-menu-item {
            height: 40px;
            line-height: 40px;
        }

        > .el-submenu {
            > .el-submenu__title {
                height: 40px;
                line-height: 40px;
            }
        }

        .menu-icon {
            margin-right: 5px;
            width: 14px;
            height: 14px;
        }
    }
    .el-menu--horizontal > .el-submenu:focus .el-submenu__title,
    .el-menu--horizontal > .el-submenu:hover .el-submenu__title {
        color: #909399;
    }
    .el-submenu:focus > .el-submenu__title,
    .el-submenu:hover > .el-submenu__title {
        color: #303133 !important;
    }
    .el-menu--horizontal > .el-menu-item.is-active.not {
        border-bottom: none;
        color: #909399;
    }
    .el-menu--horizontal > .el-submenu.is-active .el-submenu__title.not {
        border-bottom: none;
        color: #909399;
    }
    .el-menu--horizontal .el-menu .el-menu-item.is-active.not,
    .el-menu--horizontal
        .el-menu
        .el-submenu.is-active
        > .el-submenu__title.not {
        color: #909399;
    }

    .menu-active {
        border-bottom: 2px solid #409eff !important;
        color: #303133 !important;
    }
}
</style>