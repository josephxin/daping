<template>
<div class="visualMapUI">
    <groupUI :styleObj="getObj"></groupUI>
</div>
</template>
<script>
import {comType} from '../EditCompReg'

export default {
  name: 'visualMapUI',
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
      obj.value = this.getValue('show');
      obj.children = [
        {
            name : '排布方式',
            value : this.getValue('orient'),
            type : comType.SELECT,
            range : [{vertical : '纵向'},{horizontal:'横向'}]
        },
        {
            name : '宽度',
            value : this.getValue('itemWidth'),
            type : comType.NUMBER
        },
        {
            name : '高度',
            value : this.getValue('itemHeight'),
            type : comType.NUMBER
        },
        {
            name : '文本内容',
            value : this.getValue('text'),
            type : comType.TEXT
        },
        {
            name : '文本与主体距离',
            value : this.getValue('textGap'),
            type : comType.NUMBER
        },
        {
            name : '手柄和文字的位置',
            value : this.getValue('align'),
            type : comType.SELECT,
            range : [{auto:'auto'},{left:'left'},{right:'right'},{top:'top'},{bottom : 'bottom'}]
        },
        {
            name : '内边距',
            value : this.getValue('padding'),
            type : comType.TEXT
        },
        {
            name : '距容器左侧距离',
            value : this.getValue('left'),
            type : comType.TEXT
        },
        {
            name : '距容器上侧距离',
            value : this.getValue('top'),
            type : comType.TEXT
        },
        {
            name : '距容器右侧距离',
            value : this.getValue('right'),
            type : comType.TEXT
        },
        {
            name : '距容器下侧距离',
            value : this.getValue('bottom'),
            type : comType.TEXT
        },
        {
            name : '文字配置',
            type : comType.GROUP,
            children : [
                {
                   name : '文字大小',
                    value : this.getValue('textStyle fontsize'),
                    type : comType.NUMBER
                },
                {
                   name : '文字颜色',
                    value : this.getValue('textStyle color'),
                    type : comType.COLORALPHA
                },
            ]
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

.numberUI{
  width: 100%;
}

</style>