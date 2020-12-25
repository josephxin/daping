<template>
<el-form>
  <el-form-item label="频度">
    <el-radio-group v-model="selectVal" size="mini" @change="_radioChanged">
      <el-radio-button :label="item.id" v-for="item in radioList" :key = "item.id">{{item.name}}</el-radio-button>
    </el-radio-group>
  </el-form-item>
</el-form>
</template>
<script>
import AbstractComp from '@/compLib/commons/AbstractComp'
export default {
  name: "formRadio",
  mixins: [AbstractComp],
  data(){
    return {
      selectVal : '',
      radioList : [
          {
            id: 'day',
            name: '日'
        },
        {
            id: 'tenday',
            name: '旬'
        },
        {
            id: 'month',
            name: '月'
        }
      ]
    }
  },
  computed: {
    obj() {
      return this.compConf.box;
    },
    style() {
      return {
        width: this.obj.width + 'px',
        height: this.obj.height + 'px',
        background: "#fff"
      }
    }
  },
  methods: {
    _radioChanged(){
      console.log(this.selectVal)
    }
  }
}
</script>
