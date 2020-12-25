<template>
    <div
        :class="['my-draggable', {'my-draggable--active' : (compConf.isActive || overActive),'my-draggable--move' : moveActive}]"
        @mousedown.stop="handleMove"
        @mouseover.stop="handleOver"
        @mouseout.stop="handleOut"
        @contextmenu.stop.prevent="contain.handleContextMenu($event,compConf)"
        @click.stop="()=> {}"
        :style="styleName"
    >
        <div class="my-draggable__wrapper" ref="my-draggable-wrapper">
            <template v-if="overActive|| compConf.isActive">
                <div :style="styleLineName" class="my-draggable__line my-draggable__line--left"></div>
                <div :style="styleLineName" class="my-draggable__line my-draggable__line--top"></div>
                <div class="my-draggable__line my-draggable__line--label">{{ baseLeft }},{{ baseTop }}</div>
            </template>
            <template v-for="(item,index) in rangeList">
                <div
                    v-if="compConf.isActive"
                    :class="['my-draggable__range','my-draggable__range--' + item.classname]"
                    :key="index"
                    :style="[styleRangeName,getRangeStyle(item.classname)]"
                    @mousedown.stop="rangeMove($event,item.classname)"></div>
            </template>
            <div class="my-draggable__operate" v-if="compConf.isActive">
                <el-tooltip class="my-tooltip" content="删除" placement="top">
                    <el-button
                        icon="el-icon-close"
                        type="primary"
                        @mousedown.stop.native="()=> {}"
                        @click="contain.delComs()"
                    ></el-button>
                </el-tooltip>
                <el-tooltip class="my-tooltip" content="移动图表" placement="top" :manual="true">
                    <el-button
                        icon="el-icon-rank"
                        type="primary"
                        @mousedown.stop.native="handleMove"
                    ></el-button>
                </el-tooltip>
                <el-tooltip class="my-tooltip" content="旋转图表" placement="top">
                    <el-button
                        style="cursor: move;"
                        icon="el-icon-refresh"
                        type="primary"
                        @mousedown.stop.native="rotateComp"
                    ></el-button>
                </el-tooltip>
            </div>
            <div :class="b('menu')"
                 :style="styleMenuName"
                 v-show="active || overActive">
                <slot name="menu"
                      :zIndex="zIndex"
                      :index="index"></slot>
            </div>
            <div :class="b('item')" ref="item">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import {getFixed, setPx} from '@/util/util'

const ELEMENT = '__';
const MODS = '--';
const join = (name, el, symbol) => el ? name + symbol + el : name;
const prefix = (name, mods) => {
    if (typeof mods === 'string') {
        return join(name, mods, MODS);
    }
    if (Array.isArray(mods)) {
        return mods.map(item => prefix(name, item));
    }
    const ret = {};
    Object.keys(mods || {}).forEach(key => {
        ret[name + MODS + key] = mods[key];
    });
    return ret;
};
export default {
    inject: ['contain'],
    name: "my-draggable",
    props: {
        index: {
            type: [String, Number],
        },
        compConf: {
            type: [Object, Array]
        },
        mask: {
            type: Boolean,
            default: true
        },
        readonly: {
            type: Boolean,
            default: false
        },
        resize: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: [Number, String],
            default: 1
        },
        left: {
            type: Number,
            default: 0
        },
        top: {
            type: Number,
            default: 0
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        },
        boxStyle: {
            type: Object
        }
    },
    data() {
        return {
            baseWidth: 0,
            baseHeight: 0,
            baseLeft: 0,
            baseTop: 0,
            children: {},
            moveActive: false,
            overActive: false,
            rangeActive: false,
            active: false,
            keydown: null,
            translateX: 0,
            translateY: 0,
            step: 1,
            rangeList: [
                {
                    classname: "left",
                },
                {
                    classname: "right",
                },
                {
                    classname: "top",
                },
                {
                    classname: "bottom",
                },
                {
                    classname: "top-left",
                },
                {
                    classname: "top-right",
                },
                {
                    classname: "bottom-left",
                },
                {
                    classname: "bottom-right",
                }
            ]
        };
    },
    created() {
        this.init();
    },
    computed: {
        styleMenuName() {
            return {
                transformOrigin: "0 0",
                transform: `scale(${this.scale})`
            };
        },
        styleLineName() {
            return {
                borderWidth: 1 / this.scale + 'px'
            };
        },
        styleItem() {
            return {
                width: this.baseWidth + 'px',
                height: this.baseHeight + 'px',
            }
        },
        styleRangeName() {
            const calc = 10 / this.scale;
            return {
                width: calc + 'px',
                height: calc + 'px',
            };
        },
        styleLabelName() {
            return {
                fontSize: 18 / this.scale + 'px'
            };
        },
        scale() {
            return this.$store.getters.getZoom()
        },
        styleName() {
            let style = {
                zIndex: this.compConf.isActive ? 9999 : this.compConf.compIndex,
                top: this.baseTop + 'px',
                left: this.baseLeft + 'px',
                width: this.baseWidth + 'px',
                height: this.baseHeight + 'px',
                transform: 'translate(' + this.translateX + 'px,' + this.translateY + 'px) scale(1,1)',
            }
            return style
        }
    },
    watch: {
        active(val) {
            if (val) {
                // this.handleKeydown()
            } else {
                // document.onkeydown = this.keydown
            }
        },
        width(val) {
            this.$parent.isReload = true
            this.baseWidth = getFixed(val) || this.children.offsetWidth;

        },
        height(val) {
            this.$parent.isReload = true
            this.baseHeight = getFixed(val) || this.children.offsetHeight;
        },
        left(val) {
            this.$parent.isReload = true
            this.baseLeft = getFixed(val);
        },
        top(val) {
            this.$parent.isReload = true
            this.baseTop = getFixed(val);
        },
        compData: {
            handler: function (val, oldval) {
                this.compConf = val
            },
            deep: true
        }
        // baseWidth (val) {
        //   this.$refs.wrapper.style.width = setPx(val);
        //   if (this.resize && this.children.style) {
        //     this.children.style.width = setPx(val);
        //   }
        // },
        // baseHeight (val) {
        //   this.$refs.wrapper.style.height = setPx(val);
        //   if (this.resize && this.children.style) {
        //     this.children.style.height = setPx(val);
        //   }
        // }
    },
    mounted() {

    },
    methods: {
        rotateComp(e) {
            //console.log(e);
            this.$emit('compRotate', e)
        },
        b(el, mods) {
            const name = 'my-draggable'
            if (el && typeof el !== 'string') {
                mods = el;
                el = '';
            }
            el = join(name, el, ELEMENT);
            return mods ? [el, prefix(el, mods)] : el;
        },
        init() {
            // this.children = this.$refs.item.firstChild;
            this.baseWidth = getFixed(this.width);
            this.baseHeight = getFixed(this.height);
            this.baseLeft = getFixed(this.left);
            this.baseTop = getFixed(this.top);
            // this.keydown = document.onkeydown
        },
        setLeft(left) {
            this.baseLeft = left;
        },
        setTop(top) {
            this.baseTop = top;
        },
        getRangeStyle(postion) {
            const calc = (10 / this.scale) / 2;
            let result = {};
            let list = postion.split("-");
            list.forEach(ele => {
                result[ele] = setPx(-calc);
            });
            return result;
        },
        setOverActive(val) {
            this.overActive = val;
        },
        setActive(val) {
            this.active = val;
        },
        rangeMove(e, position) {
            // if (this.disabled) return
            //移动的方向
            let x, y;
            //移动的位置
            let xp, yp;
            //移动的正负
            let xc, yc;
            this.rangeActive = true;
            this.handleMouseDown(e);
            let disX = e.clientX;
            let disY = e.clientY;
            document.onmousemove = e => {
                this.moveActive = true;
                if (position === "right") {
                    x = true;
                    y = false;
                } else if (position === "left") {
                    x = true;
                    xp = true;
                    xc = true;
                    y = false;
                } else if (position === "top") {
                    x = false;
                    y = true;
                    yp = true;
                    yc = true;
                } else if (position === "bottom") {
                    x = false;
                    y = true;
                } else if (position === "bottom-right") {
                    x = true;
                    y = true;
                } else if (position === "bottom-left") {
                    x = true;
                    y = true;
                    xp = true;
                    xc = true;
                } else if (position === "top-right") {
                    x = true;
                    y = true;
                    yp = true;
                    yc = true;
                } else if (position === "top-left") {
                    x = true;
                    y = true;
                    xp = true;
                    xc = true;
                    yp = true;
                    yc = true;
                }
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                disX = e.clientX;
                disY = e.clientY;
                if (x) {
                    let calc = left * this.step / this.scale;
                    if (xc) calc = -calc;
                    if (xp) this.baseLeft = getFixed(this.baseLeft - calc);
                    this.baseWidth = getFixed(this.baseWidth + calc);
                }
                if (y) {
                    let calc = top * this.step / this.scale;
                    if (yc) calc = -calc;
                    if (yp) this.baseTop = getFixed(this.baseTop - calc);
                    this.baseHeight = getFixed(this.baseHeight + calc);
                }
            };

            this.handleClear()

        },
        handleOut() {
            this.overActive = false
        },
        handleOver() {
            this.overActive = true
        },
        // 拖拽移动
        handleMove(e) {
            //console.log(e);
            this.active = true;//没用
            this.handleMouseDown(e);
            let disX = e.clientX;
            let disY = e.clientY;
            document.onmousemove = (e) => {
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                disX = e.clientX;
                disY = e.clientY;
                this.baseLeft = getFixed(this.baseLeft + left * this.step / this.scale);
                this.baseTop = getFixed(this.baseTop + top * this.step / this.scale);
                if (this.compConf.compType === 'component') {
                    this.$emit('compMove', {
                        width: this.baseWidth,
                        height: this.baseHeight,
                        left: this.baseLeft,
                        top: this.baseTop
                    })
                }
            };
            this.handleClear()
        },

        handleClear() {
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
                this.handleMouseUp();
            }
        },
        handleKeydown() {
            // document.onkeydown = (event) => {
            //   var e = event || window.event || arguments.callee.caller.arguments[0];
            //   let step = 1 / this.scale;
            //   if (e && e.keyCode == 38) {//上
            //     this.baseTop = getFixed(this.baseTop - step)
            //   } else if (e && e.keyCode == 37) {//左
            //     this.baseLeft = getFixed(this.baseLeft - step)
            //   } else if (e && e.keyCode == 40) {//下
            //     this.baseTop = getFixed(this.baseTop + step)
            //   } else if (e && e.keyCode == 39) {//右
            //     this.baseLeft = getFixed(this.baseLeft + step)
            //   }
            //   event.stopPropagation();
            //   this.$emit("blur", {
            //     index: this.index,
            //     width: this.baseWidth,
            //     height: this.baseHeight,
            //     left: this.baseLeft,
            //     top: this.baseTop
            //   });
            //   this.keydown && this.keydown(event);
            // };
        },
        handleMouseDown(e) {
            this.moveActive = true;
            this.$emit("focus", {
                index: this.index,
                width: this.baseWidth,
                height: this.baseHeight,
                left: this.baseLeft,
                top: this.baseTop,
                event: e
            });
        },
        handleMouseUp() {
            this.moveActive = false;
            this.rangeActive = false;
            this.$emit("blur", {
                index: this.index,
                width: this.baseWidth,
                height: this.baseHeight,
                left: this.baseLeft,
                top: this.baseTop
            });
        }
    }
};
</script>
<style lang="scss">
@import '@/assets/styles/draggable.scss';
</style>
