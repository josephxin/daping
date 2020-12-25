<template>
    <div class="array group-wrapper">
        <div class="styleProp array-title group-title">
            <span :class="fold?'text':'text close'" @click="openOrClose">{{ styleObj.name }}</span>
            <span class="btn" v-if="styleObj.addOrDel" title="添加系列" @click="addElement">
                <img src="../../../assets/image/add.png"/>
            </span>
        </div>

        <div :key="index" class="group-item" v-for="(e,index) in getValue" v-show="fold">
            <hr class="separate-line"/>
            <div class="styleProp group-item">
                <span :id="'chserSp'+index" class="text" @click="openCh(index)">{{ buildItemName(index) }}</span>
                <span class="btn" v-if="styleObj.addOrDel" title="删除当前系列" @click="delElement(index)">
                    <img src="../../../assets/image/del.png" />
                </span>
            </div>
            <div :id="'chser'+index">
                <div :key="key" class="group-item" v-for="(com,key) in styleObj.children">
                    <hr class="separate-line"/>
                    <component :is="com.type" :styleObj="buildStyleObj(com,index)"></component>
                </div>
            </div>

        </div>
    </div>
</template>
<!--
实例：

name:'系列',//名称
type:'array',//类型
fold:true/false,//打开还是关闭
addOrDel:'true',//是否可以添加或删除
value:'',//数据 (数组结构)
default:'',默认数据
itemName:'',//条目的名称
children:[
  {
    name:'系列颜色',
    type:'',
    value:''

  }

]
-->

<script>
import {comType, getVal, onlyUpdateAttr} from './EditCompReg'
import util from '../../../util/util'

export default {
    name: 'arrayUI',
    props: [
        'styleObj'
    ],
    data() {
        return {
            fold: true,
            folds: [],
        };
    },
    computed: {
        getValue: function () {
            let val = getVal(this.styleObj.value);
            return val;
        }
    },
    mounted: function () {
        // 默认展开
        if (Object.keys(this.styleObj).indexOf('fold') != -1) {
            this.fold = this.styleObj['fold'];
        }
    },
    methods: {

        buildStyleObj: function (oldObj, index) {
            let newObj = util.deepCopy(oldObj);

            this.buildChildStyleObj(newObj, index);

            return newObj;
        },
        buildChildStyleObj: function (styleConfObj, index) {
            if (styleConfObj.type == comType.GROUP) {
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
        },
        openCh(e) {
            //console.log(document.querySelector('#chser' + e).style.display);//初始化时display为''
            if (document.querySelector('#chser' + e).style.display == 'none') {
                document.querySelector('#chser' + e).style.display = 'block'
                document.querySelector('#chserSp' + e).classList.remove('close')
            } else {
                document.querySelector('#chser' + e).style.display = 'none'
                document.querySelector('#chserSp' + e).classList.add('close')
            }
        }

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.array {
    width: 100%;
}

.array-title .btn, 
.styleProp .btn {
    float: right;
    width: 20px;
    height: 20px;
    margin: 4px 10px;
    cursor: pointer;
    position: relative;
    img{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
