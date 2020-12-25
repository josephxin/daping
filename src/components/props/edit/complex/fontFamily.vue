<template>
<div class="fontFamily">
    <selectUI :styleObj="getObj"></selectUI>
</div>
</template>

<script>
export default {
  name: 'fontFamily',
  
  props:[
      'styleObj'
  ],

  computed:{
    getObj : function(){
      let currentObj = this.styleObj;

      if(!currentObj.name){
        currentObj.name = '字体';
      }
      
      if(!currentObj.range){
        currentObj.range = [
          {
              "Microsoft Yahei": "微软雅黑"
          },
          {
              "SimSun": "宋体"
          },
          {
              "SimHei": "黑体"
          },
          {
              "LiSu": "隶书"
          },
          {
              "YouYuan": "幼圆"
          },
          "tahoma",
          "arial",
          "sans-serif"
        ];
      }
      
      return currentObj;
    }
  }

}
</script>

<style scoped>
.fontFamily{
  width: 100%;
}

</style>
