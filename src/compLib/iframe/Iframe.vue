<template>
  <Div :style="style">
    <iframe :src="srcUrl" :width="obj.width" :height="obj.height" scrolling="yes"></iframe>
  </Div>
</template>
<script>
import { convertCountUpChartData } from '@/datamanager/DataConvertor'
import AbstractComp from '@/compLib/commons/AbstractComp'
export default {
  name: "CustomImage",
  mixins: [AbstractComp],
  computed: {
    srcUrl() {
      let srcurl='';
      if(this.chartData == null){
        srcurl='http://www.baidu.com'
      }else{
        srcurl = this.checkUrl(this.chartData.value) ? this.chartData.value : 'http://www.baidu.com'
      }
      return srcurl;
    },
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
    convertChartData() {
      return convertCountUpChartData(this.compData, this.dataConf)
    },
    //验证网址
    checkUrl(value){
      return /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/i.test(value);
    }
  }
}
</script>
<style>
</style>
