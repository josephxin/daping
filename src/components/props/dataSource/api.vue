<template>

  <div class="data-api data-item">
    <div class="text">URL</div>
    <el-input type="textarea" @change="changeApiAddr"  :value = "getValue" :rows="6" class="comp"></el-input>
    <component :is="showDataUI"></component>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'
import {type as DataSourceUIContext,getVal,onlyUpdateAttr} from './dataSourceReg'
export default {

  name: 'CompData',

  computed:{

    getValue(){
        return getVal('datasource url');
    },

    showDataUI(){
      return DataSourceUIContext.showData;
    }

  },

  methods:{

    changeApiAddr(value){
      onlyUpdateAttr('datasource url',value);
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.data-api{
  width:100%;
}

</style>
