<template>
    <div class="vertical-nav" :style="position">
        <el-menu
            :default-active="menuItemId"
            id="my-menu"
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
import AbstractComp from '../commons/general/AbstractComp.js'

export default {
    name: "verticalNav",
    mixins: [AbstractComp],
    data() {
        return {};
    },
    computed: {
        ...mapState([]),
        position() {
            let style = {};
            switch (this.positionId) {
                case "left":
                    style = {
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                    };
                    break;
                case "left-top":
                    style = {
                        top: "10px",
                        left: "10px",
                    };
                    break;
                case "left-bottom":
                    style = {
                        bottom: "10px",
                        left: "10px",
                    };
                    break;
                case "right":
                    style = {
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                    };
                    break;
                case "right-top":
                    style = {
                        top: "10px",
                        right: "10px",
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
.vertical-nav {
    z-index: 9999;
    position: absolute;
    min-width: 160px;
    > .el-menu {
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

        > .el-menu-item.is-active.not {
            border-bottom: none;
            color: #909399;
        }
        > .el-submenu.is-active .el-submenu__title.not {
            border-bottom: none;
            color: #909399;
        }
        .el-menu .el-menu-item.is-active.not,
        .el-menu .el-submenu.is-active > .el-submenu__title.not {
            color: #909399;
        }
    }
    .menu-active {
        color: #409eff !important;
    }
}
</style>