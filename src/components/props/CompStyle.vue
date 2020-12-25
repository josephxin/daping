<template>
    <div class="prop-tab-item">
        <!-- 组件名称 -->
        <div class="styleProp">
            <span class="text">组件名称</span>
            <div class="comp edit">
                <el-input class="input" v-model="compName" size="mini" :maxlength="15"/>
            </div>
        </div>
        <!-- 组件自身属性 -->
        <div v-for="(val) in styleCfg" :key="val.name+activeComp.compId" v-show="showFun(val)">
            <hr class="separate-line"/>
            <component :is="val.type" :styleObj="val"></component>
        </div>
        <!--组件通用属性-->

        <div v-if="activeComp.compType!=='themeLayer'">
            <hr class="separate-line"/>
            <div class="styleProp">
                <span class="text">尺寸</span>
                <div class="comp edit position">
                    <span class="text">高</span>
                    <el-input-number class="input" controls-position="right" :min="0" :step="1"
                                     :value="compHeight" @change="setCompHeight" size="mini"/>
                </div>
                <div class="comp edit position">
                    <span class="text">宽</span>
                    <el-input-number class="input" controls-position="right" :min="0" :step="1"
                                     :value="compWidth" @change="setCompWidth" size="mini"/>
                </div>
            </div>
            <div class="styleProp">
                <span class="text">位置</span>
                <div class="comp edit position">
                    <span class="text">Y</span>
                    <el-input-number class="input" controls-position="right" name="compY" :step="1"
                                     :value="compY" @change="setCompY" size="mini"/>
                </div>
                <div class="comp edit position">
                    <span class="text">X</span>
                    <el-input-number class="input" controls-position="right" name="compX" :step="1"
                                     :value="compX" @change="setCompX" size="mini"/>
                </div>
            </div>
            <div class="styleProp">
                <span class="text">旋转（度）</span>
                <el-input-number class="comp" name="compRotate" :step="1"
                                 :value="compRotate" @change="setCompRotate" size="mini"/>
            </div>
            <hr class="separate-line"/>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import util from '../../util/util'
import {styleConfig} from '../../compLib/CompTemplateReg'

export default {

    name: 'CompStyle',
    data() {
        return {
            panelShow: true,
        }
    },
    computed: {
        ...mapGetters({activeComp: 'getFirstActiveComp'}),

        compWidth: function () {
            return this.getPosition.width;
        },
        compHeight: function () {
            return this.getPosition.height;
        },
        compX: function () {
            return this.getPosition.left;
        },
        compY: function () {
            return this.getPosition.top;
        },
        compRotate: function () {
            return this.getPosition.rotate;
        },
        getStyle() {
            return this.activeComp.style;
        },
        getPosition: function () {
            return this.activeComp.box;
        },
        styleCfg() {
            return styleConfig(this.activeComp.componentName);
        },
        compName: {
            get() {
                return this.activeComp.name
            },
            set(name) {
                this.$store.commit("updateCompName", {compId: this.activeComp.compId, name})
            },
        }
    },
    created() {
    },
    methods: {
        showFun(val) {
            return util.showFun(val, this.getStyle)
        },
        setCompSize(obj) {
            let value = obj.value;
            let params = {compId: this.activeComp.compId};
            params[obj.pos] = Number.parseFloat(value);
            this.$store.commit("updateCompStyle", params)
        },

        setCompWidth(value) {
            this.setCompSize({value: value, pos: 'width'});
        },

        setCompHeight(value) {
            this.setCompSize({value: value, pos: 'height'});
        },

        setCompX(value) {
            this.setCompSize({value: value, pos: 'left'});
        },

        setCompY(value) {
            this.setCompSize({value: value, pos: 'top'});
        },
        setCompRotate(value) {
            //console.log("setCompRotate -> value", value)
            this.setCompSize({value: value, pos: 'rotate'});
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.position {
    .text {
        display: inline-block;
        width: 30px;
        text-align: center;
    }

    .input {
        width: 120px;
    }
}
</style>

<style>
.separate-line {
    height: 1px;
    background-color: #cecece;
}

.styleProp {
    height: 28px;
    width: 100%;
    padding: 6px 0;
}

.styleProp .text {
    display: block;
    float: left;
    line-height: 28px;
}

.styleProp .comp {
    float: right;
    width: 300px;
}

.styleProp .comp.position {
    width: 150px;
}

.styleProp:after {
    content: '';
    clear: both;
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
}
</style>
