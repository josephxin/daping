<template>
    <div :style="{left : contentMenuX + 'px',top :  contentMenuY + 'px'}"
         @click.stop="hide"
         class="contextMenu"
         v-clickoutside="hide"
         v-show="contextMenu">
        <!-- <div class="contextMenu__item"
             @click="handleLogout()"
             v-if="contain.isFolder"> <i class="el-icon-close"></i>解散分组
        </div>
        <div class="contextMenu__item"
             @click="handleCompose()"
             v-if="!contain.isFolder"> <i class="el-icon-close"></i>组合分组
        </div> -->
        <div @click="contain.delComs()"
             class="contextMenu__item"><i class="el-icon-close"></i>删除图层
        </div>
        <div @click="contain.copyComp()"
             class="contextMenu__item"><i class="el-icon-document"></i>复制图层
        </div>
        <div @click="contain.moveTop()"
             class="contextMenu__item"><i class="el-icon-arrow-up"></i>置顶图层
        </div>
        <div @click="contain.moveBottom()"
             class="contextMenu__item"><i class="el-icon-arrow-down"></i>置底图层
        </div>
        <div @click="contain.moveUp()"
             class="contextMenu__item"><i class="el-icon-arrow-up"></i>上移一层
        </div>
        <div @click="contain.moveDown()"
             class="contextMenu__item"><i class="el-icon-arrow-down"></i>下移一层
        </div>
    </div>
</template>
<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'

export default {
    name: 'contextmenu',
    inject: ["contain"],
    data() {
        return {
            contextMenu: false,
            contentMenuX: 0,
            contentMenuY: 0,
        }
    },
    directives: {Clickoutside},
    computed: {
        styleName() {
            return {
                left: this.contentMenuX,
                top: this.contentMenuY
            }
        }
    },
    methods: {
        show(X = 0, Y = 0) {
            this.contentMenuX = X;
            this.contentMenuY = Y;
            this.contextMenu = true;
        },
        hide() {
            //console.log('hide');
            this.contentMenuX = 0;
            this.contentMenuY = 0;
            this.contextMenu = false;
        },
    },
    mounted() {
        window.addEventListener('mousewheel', this.hide)
    },
    beforeDestroy() {
        window.removeEventListener("mousewheel", this.hide)
    }
}
</script>

<style>
.contextMenu {
    width: 120px;
    position: fixed;
    z-index: 99999;
    list-style: none;
    box-shadow: 1px 2px 6px 2px rgba(0, 0, 0, 0.3);
    padding: 15px;
    background: #fff;
    color: #888;
    border-radius: 6px;
}

.contextMenu__item {
    z-index: 10000;
    list-style: none;
    padding: 6px 12px;
    cursor: pointer;
    position: relative;
    font-size: 12px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
}

.contextMenu__item:hover {
    background-color: #fff;
}

.contextMenu__item i {
    margin-right: 5px;
}

.contextMenu__item :first-child {
    padding-top: 5px;
}
</style>
