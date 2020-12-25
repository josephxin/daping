<template>
<div class="legendUI">
    <groupUI :styleObj="getObj"></groupUI>
</div>
</template>

<!--

name:'坐标轴',
value:'legend',
type:'legendUI'

数据：
isShow //是否显示

fontColor // 字体颜色
fontSize  // 字体大小
fontBold  // 字体粗细
fontFamily // 字体类型


position // 位置
layout // 布局
 -->

<script>
import {comType} from '../EditCompReg'

export default {
  name: 'legendUI',
  
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
          name : '图例类型',
          type:comType.SELECT,
          value:this.getValue('type'),
          range:[{'plain':'普通'},{'scroll':'翻页'}] 
        },
        {
          name : '图例宽度',
          type:comType.TEXT,
          value:this.getValue('width'),
        },
        {
          name : '图例间距',
          type:comType.NUMBER,
          value:this.getValue('itemGap'),
          default : 10
        },
        {
          name : '内边距',
          type:comType.TEXT,
          value:this.getValue('padding'),
        },
        {
          name:'字体样式',
          type:comType.GROUP,
          children:[
            {
              name:'颜色',
              type:comType.COLOR,
              value:this.getValue('fontColor')
            },
            {
              name:'大小',
              type:comType.NUMBER,
              value:this.getValue('fontSize'),
              range:[{'no':'无'},{'before':'向前'},{'after':'向后'}]
            },
            {
              name:'字体',
              type:comType.FONTFAMILY,
              value:this.getValue('fontFamily')
            },
            {
              name:'粗细',
              type:comType.FONTWEIGHT,
              value:this.getValue('fontBold')
            }
          ]
        },
        {
          name:'图形',
          type:comType.GROUP,
          children:[
            {
              name:'类型',
              type:comType.SELECT,
              value:this.getValue('icon'),
              range:[{'rect':'rect'},{'circle':'circle'},{'triangle':'triangle'},{'diamond':'diamond'},{'arrow':'arrow'},{'none':'none'}]
            },
            {
              name:'宽',
              type:comType.NUMBER,
              value:this.getValue('iconWidth')
            },
            {
              name:'高',
              type:comType.NUMBER,
              value:this.getValue('iconHeight')
            }
          ]
        },
        {
          name:'位置',
          type:comType.SELECT,
          range:[{'auto-auto':'默认'},
            {'left-top':'左上'},{'center-top':'上居中'},{'right-top':'右上'},
            {'left-middle':'左居中'},{'center-middle':'居中'},{'right-middle':'右居中'},
            {'left-bottom':'左下'},{'center-bottom':'下居中'},{'right-bottom':'右下'}
          ],
          value:this.getValue('position')
        },

        {
          name:'布局',
          type:comType.SELECT,
          range:[{'horizontal':'水平'},{'vertical':'垂直'}],
          value:this.getValue('layout')
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

.legendUI{
  width: 100%;
}

</style>
