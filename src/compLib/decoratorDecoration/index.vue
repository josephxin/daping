<template>
  <div :style="style">
    <component :is="compentName" :style="style" :reverse = "reverse" :color="colors" title="装饰器" ref="_refDvDecoration"></component>
  </div>
</template>
<script>
import { convertCountUpChartData } from '@/datamanager/DataConvertor'
import AbstractComp from '@/compLib/commons/AbstractComp'
export default {
  name: "decoratorDecoration",
  mixins: [AbstractComp],
  data(){
    return {

    }
  },
  created(){

  },
  computed: {
    compentName(){
      return this.compConf.style.baseDecorationType
    },
    colors(){
      return this.compConf.style.colors
    },
    obj() {
      return this.compConf.box;
    },
    style() {
      return {
        width: this.obj.width + 'px',
        height: this.obj.height + 'px'
      }
    },
    reverse(){
      return this.compConf.style.reverse
    }
  },
  methods: {
    styleConfChanged(){
      
    },
    resize(){
      this.$refs._refDvDecoration.initWH()
    }
  },
  mounted(){
  }
}
</script>
<style>
</style>
