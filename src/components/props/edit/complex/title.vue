<template>
<div class="titleUI">
    <groupUI :styleObj="getObj"></groupUI>
</div>
</template>
<!--
name:'标题设置'

 -->
<script>
import {comType} from '../EditCompReg'
export default {
  name: 'titleUI',
  props:[
      'styleObj'
  ],
  computed:{
    getObj : function(){
      let obj = {};
      obj.name = this.styleObj.name;
      if(typeof(this.styleObj.fold) != 'undefined'){
        obj.fold = this.styleObj.fold;
      }
      obj.show = true;
      obj.showName = '显示';
      obj.value = this.getValue('isShow');
      obj.children = [
        {
          name:'标题文字',
          type:comType.TEXT,
          value:this.getValue('title')
        },
        {
          name:'字体大小',
          type:comType.NUMBER,
          value:this.getValue('textStyleFontSize')
        },
        {
          name:'颜色',
          type:comType.COLOR,
          value : this.getValue('textStyleColor')
        },
        {
          name:'粗细',
          type:comType.SELECT,
          value : this.getValue("textStyleFontWeight"),
          range:[{'normal':'normal'},{'bold':'粗体'},{'bolder':'bolder'},{'lighter' : 'lighter'}]
        },
        {
          name:'字体',
          type:comType.FONTFAMILY,
          value : this.getValue('textStyleFontFamily')
        },
        {
          name:'字体风格',
          type:comType.SELECT,
          value : this.getValue('textStyleFontFamily'),
          range:[{'normal':'normal'},{'italic':'italic'},{'oblique':'oblique'}]
        },
        {
          name:'LEFT',
          type:comType.TEXT,
          value:this.getValue('left'),
          placeholder : '可填auto,left,center,right 或具体值(20/20%)'
        },
        {
          name:'TOP',
          type:comType.TEXT,
          value:this.getValue('top'),
          placeholder : '可填auto,top, middle, bottom 或具体值(20/20%)'
        },
        {
          name:'RIGHT',
          type:comType.TEXT,
          value:this.getValue('right'),
          placeholder : '可填auto,或具体值(20|20%)'
        },
        {
          name:'BOTTOM',
          type:comType.TEXT,
          value:this.getValue('bottom'),
          placeholder : '可填auto,或具体值(20|20%)'
        }
      ];
      return obj;
    }
  },
  methods:{
    getValue(val){
      return this.styleObj.value + ' ' + val;
    }
  }

}
</script>

<style scoped>
.titleUI{
  width: 100%;
}

</style>