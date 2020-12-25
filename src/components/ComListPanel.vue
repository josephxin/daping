<template>
    <div :id="idName" class='build'>
        <div :style="dataStyle" class='comp-menu' id="dataList">
            <div class="title"><i class="el-icon-finished" style="margin-right: 5px;color:#2bf;"></i>图层</div>
            <div class="list-container">
                <draggable
                    :animation="300"
                    :list="compNotLayer"
                    ghost-class="ghost">
                    <template v-for="(item,index) in compNotLayer">
                        <div
                            :class="['menu__item',{'is-highlight':item.isHighlight,'is-active' : item.isActive}]"
                            :key="index"
                            @click="selectActive($event,item)"
                            @contextmenu.prevent="handleContextMenu($event,item)"
                            @mouseenter="highLightCom(item.compId)"
                            @mouseleave="cancelHighLightCom(item.compId)"
                        >
                            <span class="menu__icon">
                                <i class='iconfont' :class="iconClass(item.componentName)"></i>
                            </span>
                            <div>
                                <div>{{ item.name }}</div>
                                <div>({{ item.compId }})</div>
                            </div>
                        </div>
                    </template>
                </draggable>
            </div>
        </div>
        <context-menu ref="_contextMenu"></context-menu>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import draggable from "vuedraggable";
import contextMenu from "./contextMenu";
import contextMenuMixins from "@/mixins/contextMenu";
import {icons} from "@/config/icon";

export default {
    name: "ComListPanel",
    provide() {
        return {
            main: this,
            contain: this,
        };
    },
    computed: {
        ...mapState(['window']),
        ...mapGetters(['compList']),
        compNotLayer() {
            return this.compList.filter(item => !item.compType || ['layerChildren', 'themeLayer'].indexOf(item.compType) === -1)
        },
        idName: function () {
            return this.window.comList.idName;
        },
        dataStyle: function () {
            return {
                width: this.window.comList.width + 'px',
                left: this.window.comList.left + 'px',
                height: this.window.comList.height
            };
        },
        switchInfo: function () {
            return this.window.comList.switchInfo;
        },
        switchStyle: function () {
            return {
                backgroundImage: this.window.comList.background
            };
        },
    },
    created() {
    },
    components: {draggable, contextMenu},
    methods: {
        ...mapActions([
            "switchComListDisplayState",
            "moveTop",
            "moveUp",
            "moveDown",
            "moveBottom",
            "delComs",
            "copyComp",
            "selectOnlyOne",
            "selectComs",
            "highLightCom",
            "cancelHighLightCom",
        ]),
        iconClass(componentName) {
            return icons[componentName]
                ? "icon-" + icons[componentName]
                : "icon-" + "other";
        },
        handleContextMenu(event, item) {
            this.selectOnlyOne(item.compId);
            this.$refs._contextMenu.show(event.pageX, event.pageY);
        },
        selectActive(event, item) {
            if (event.ctrlKey) {
                this.selectComs({compId: item.compId, value: item.isActive});
            } else {
                this.selectOnlyOne(item.compId);
            }
        },
    },
    mixins: [contextMenuMixins],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#comListPanel {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 3;
}

#dataList {
    box-sizing: border-box;
    position: absolute;
    width: 160px;
    left: 0;
    top: 0;
    border-right: 1px solid lightgray;
    z-index: 3;
}

.list-container {
    width: 100%;
    height: calc(100vh - 105px);
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
<style lang="stylus" scoped>
.build {
    .comp-menu {
        width: 180px;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        color: #bcc8d4;
        border-right: 1px solid #aaa;
        border-left: 1px solid #aaa;
        background: #FFFFFF;

        .iconfont {
            font-weight: normal;
        }

        .title {
            padding: 0 40px;
            box-sizing: border-box;
            margin-bottom: 1px;
            line-height: 42px;
            height: 42px;
            font-size: 13px;
            letter-spacing: 2px;
            text-indent: 2px;
            border-top: 1px solid rgb(81, 147, 253);
            border-bottom: 1px solid rgb(81, 147, 253);
            box-shadow: 0 -1px 5px 1px rgba(100, 100, 100, 0.7);
            color: #666;
        }

        .menu__item {
            border-bottom: 0.1px solid #ccc;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            height: 45px;
            padding: 0 6px;
            position: relative;
            background-image: linear-gradient(to bottom, rgb(255, 255, 255), rgb(251, 251, 251));
            cursor: pointer;
            -webkit-box-flex: 0;
            font-weight: bold;
            -ms-flex: none;
            flex: none;
            font-size: 12px;
            color: #666;

            &.is-active {
                color: rgb(81, 147, 253) !important;

                .iconfont {
                    color: rgb(81, 147, 253) !important;
                }
            }

            &:hover, &.is-highlight {
                color: #409EFF;
                cursor: pointer;

                .iconfont {
                    color: rgb(81, 147, 253) !important;
                }
            }

            .menu__icon {
                color: #ccc !important;
                margin-right: 4px;
                margin-left: 15px;
                width: 20px;
                height: 20px;
                line-height: 22px;
                text-align: center;
                display: block;
            }
        }
    }
}
</style>
