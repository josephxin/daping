<template>
<div class="lineType">
    <selectUI :styleObj="getObj"></selectUI>
</div>
</template>

<script>
export default {
  name: 'lineType',
  
  props:[
      'styleObj'
  ],

  computed:{
    getObj : function(){
      let currentObj = this.styleObj;

      if(!currentObj.name){
        currentObj.name = '类型';
      }
      
      if(!currentObj.range){
        currentObj.range = [
          {'solid':'实线'},
          {'dashed':'虚线'},
          {'dotted':'点状虚线'}
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
