<template>
  <div class="styleProp">
    <span class="text">{{styleObj.name}}</span>
    <el-checkbox-group v-model="checkList" @change="changeValue" size="mini" class="comp">
        <el-checkbox :label="optionValue(data)" v-for="(data,index) in styleObj.range" :key="index">{{optionName(data)}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
import { getVal, updateValue } from './EditCompReg'
export default {
  name: 'selectUI',
  props: [
    'styleObj'
  ],
  data(){
      return {
          checkList : []
      }
  },
  created(){
      let checkList =  getVal(this.styleObj.value)
      if(!checkList || !checkList.length) checkList = [this.optionValue(this.styleObj.range[0])]
      this.checkList = checkList
  },
  methods: {
    changeValue(value){
        updateValue(value, this.styleObj.value, null);
    },
    optionValue(obj) {
      if (this.isOnlyValue(obj)) {
        return obj;
      }
      return Object.keys(obj)[0];
    },

    optionName(obj) {
      if (this.isOnlyValue(obj)) {
        return obj;
      }
      return Object.values(obj)[0];
    },

    isOnlyValue(obj) {
      return typeof (obj) === 'string' || typeof (obj) === 'number';
    }

  }

}
</script>

<style lang='stylus' scoped>
.styleProp
    /deep/ .el-checkbox-group
        padding 6px 0
        .el-checkbox
            margin-right 10px
            .el-checkbox__label
                margin-left 5px
                padding-left 0
</style>