<template>
    <div :id="styleObj.key" :ref="styleObj.key" class="styleProp" style="height:auto;">
        <div class="text" style="display:block;">
            <helpUI :styleObj="styleObj"></helpUI>
            {{styleObj.name}}
        </div>
        <el-input :disabled="disabled" :rows="20" v-model="val" @change="changeValue" class="comp"
                  placeholder="" size="small" style="width:100%;cleart:both;" type="textarea">
            <!-- <template slot="prepend"><helpUI :styleObj="styleObj"></helpUI>{{styleObj.name}}</template> -->
        </el-input>
    </div>
</template>
<!--
name:'',//标签
value:'',//值
help:''//帮助
 -->
<script>
    import {getVal, updateValue} from './EditCompReg'

    export default {
        name: 'inputText',
        props: [
            'styleObj'
        ],
        data() {
            return {
                val: '',
            }
        },
        mounted() {
            this.val = getVal(this.styleObj.value);
        },
        computed: {
            getValue: function () {
                return getVal(this.styleObj.value);
            },

            disabled() {
                return this.styleObj && this.styleObj.disabled
            }
        },

        methods: {
            changeValue: function (value) {
                updateValue(value, this.styleObj.value, this.styleObj.verify);
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
