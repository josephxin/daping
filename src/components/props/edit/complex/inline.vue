<template>
    <div class="array">
        <div class="styleProp array-title">
            <span :class="fold?'text':'text close'" @click="openOrClose">{{ styleObj.name }}</span>
            <span class="btn" v-if="styleObj.addOrDel"><img @click="addElement" alt=""
                                                            src="../../../../assets/image/add.png" title="添加系列"/></span>
        </div>
        <div :key="index" class="array-item" v-for="(e,index) in getValue" v-show="fold">
            <hr class="separate-line"/>
            <el-row :gutter="3">
                <el-col :key="key" :span="getSpan(com.type)" class="inline-item"
                        v-for="(com,key) in styleObj.children">
                    <component :is="com.type" :styleObj="buildStyleObj(com,index)"></component>
                </el-col>
                <el-col :span="4" style="display: flex;align-items: center;justify-content: center;height: 35px;">
                    <img @click="delElement(index)" alt="" class="btn" src="../../../../assets/image/del.png"
                         title="删除当前系列" v-if="styleObj.addOrDel"/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {comType, getVal, onlyUpdateAttr} from '../EditCompReg'
import util from '../../../../util/util'

export default {

    name: 'inlineUI',

    props: [
        'styleObj'
    ],

    data() {
        return {
            fold: true,
            span: 24
        };
    },

    computed: {
        getValue: function () {
            return getVal(this.styleObj.value);
        }
    },

    mounted: function () {
        // 默认展开
        if (Object.keys(this.styleObj).indexOf('fold') !== -1) {
            this.fold = this.styleObj['fold'];
        }
    },
    methods: {
        getSpan(com) {
            if (com === 'colorAlphaUI') {
                return 8
            } else {
                return this.styleObj.children.length >=3 ? 20 : 10
            }
        },
        buildStyleObj: function (oldObj, index) {

            let newObj = util.deepCopy(oldObj);

            this.buildChildStyleObj(newObj, index);

            return newObj;
        },
        buildChildStyleObj: function (styleConfObj, index) {
            if (styleConfObj.type === comType.GROUP) {
                for (let obj of styleConfObj.children) {
                    this.buildChildStyleObj(obj, index);
                }
            } else {
                styleConfObj.value = this.styleObj.value + ' ' + index + ' ' + styleConfObj.value;
            }
        },
        buildItemName(index) {
            let itemName = this.styleObj.itemName;

            // 表达式中包含的变量
            let i = index;

            // 表达式的正则表达式 格式为 <% i+1 %> 注意表达式中不能包含空格
            let expression = /\<\%\s*(\S+)\s*\%\>/;

            // 匹配的结果
            let result = null;

            while ((result = expression.exec(itemName)) != null) {
                itemName = itemName.replace(expression, eval(result[1]));
            }

            return itemName;
        },
        getElement: function () {
            let result = {};
            this.getChildElement(this.styleObj, result);
            return result;
        },
        getChildElement: function (styleObj, result) {
            for (let child of styleObj.children) {

                if (child.type == comType.GROUP) {
                    this.getChildElement(child, result);
                    continue;
                }

                if (typeof (child.value) == 'undefined') {
                    continue;
                }
                result[child.value] = typeof (child.default) == 'undefined' ? '' : child.default;
            }
        },

        addElement() {
            console.log(this.styleObj)
            console.log(this.getValue)
            let eleList = util.deepCopy(this.getValue);
            eleList.push(this.getElement());
            onlyUpdateAttr(this.styleObj.value, eleList);
        },

        delElement(index) {
            let eleList = util.deepCopy(this.getValue);
            eleList.splice(index, 1);
            onlyUpdateAttr(this.styleObj.value, eleList);
        },

        openOrClose() {
            this.fold = !this.fold;
        }

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.array {
    width: 100%;
}

.array-title {
    height: 28px;
    position: relative;
}

.array-title .text {
    margin-left: 16px;
    cursor: pointer;
}

.array-title .text::before {
    content: ' ';
    background-image: url(../../../../assets/image/open.png);
    background-size: 100% 100%;
    position: absolute;
    top: 10px;
    left: 0;
    width: 8px;
    height: 8px;
    margin: 4px;
}

.array-title .close::before {
    background-image: url(../../../../assets/image/close.png);
}

.array-title .btn, .styleProp .btn {
    height: 20px;
    margin: 4px 10px;
    cursor: pointer;
    float: right;
}

.inline-item {
    display: flex;
    justify-content: space-between;
}

.inline-item {
    .styleProp {
        display: flex;
        justify-content: center;

        /deep/ .text {
            min-width: 48px;
        }
    }
}

</style>
