<template>
<div class="fontWeight">
    <selectUI :styleObj="getObj"></selectUI>
</div>
</template>

<script>
export default {
  name: 'fontWeight',
  
  props:[
      'styleObj'
  ],

  computed:{
    getObj : function(){
      let currentObj = this.styleObj;

      if(!currentObj.name){
        currentObj.name = '字体粗细';
      }
      
      if(!currentObj.range){
        currentObj.range = [
          "normal",
          "bold",
          "bolder",
          "lighter",
          100,
          200,
          300,
          400,
          500,
          600,
          700,
          800,
          900
        ];
      }
      
      return currentObj;
    }
  }

}
</script>

<style scoped>
.fontWeight{
  width: 100%;
}

</style>
