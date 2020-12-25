<template>
<div class="axisUI">
    <groupUI :styleObj="getObj"></groupUI>
</div>
</template>
<!--
name:'x轴',
value:'xaxis',
type:'axisUI'

数据 :
isShow //是否显示 true or false

// 样式
styleColor //样式颜色 合法的颜色值
styleArrow // 箭头样式 值域待定
styleBold  // 样式粗细 

// 单位
isUnit // 是否显示
unitName // 单位名称
unitFontFamily // 单位字体
unitFontSize // 单位字号

// 轴标签
isAxisLabel // 是否显示轴标签
wordDirection // 字体方向

// 网格线
isGrid // 是否显示
gridColor // 网格线颜色
gridBold // 网格线粗细
gridOpaque // 网格线透明度

 -->

<script>
import {comType} from '../EditCompReg'

export default {
  name: 'axisUI',
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
          name : '轴范围',
          type:comType.GROUP,
          show:true,
          showName:'显示',
          value:this.getValue('showMaxMin'),
          children:[
            {
              name:'最小值',
              type:comType.NUMBER,
              value:this.getValue('min')
            },
            {
              name:'最大值',
              type:comType.NUMBER,
              value:this.getValue('max')
            },
          ]
        },
        {
          name:'轴样式',
          type:comType.GROUP,
          children:[
            {
              name:'颜色',
              type:comType.COLOR,
              value:this.getValue('styleColor')
            },
            {
              name:'箭头',
              type:comType.SELECT,
              value:this.getValue('styleArrow'),
              range:[{'none':'无'},{'arrow':'箭头'}]
            },
            {
              name:'粗细',
              type:comType.NUMBER,
              value:this.getValue('styleBold')
            },
            {
              name:'轴线',
              type:comType.BOOLEAN,
              value:this.getValue('showLine')
            },
            {
              name:'位置',
              type:comType.SELECT,
              value:this.getValue('position'),
              range : [{top: '上'},{bottom: '下'},{left: '左'},{right: '右'}]
            },
            {
              name:'偏移量',
              type:comType.NUMBER,
              value:this.getValue('offset')
            },
            {
              name : '单位',
              type : comType.TEXT,
              value : this.getValue("labelFormatUnit"),
              default : ''
            },
            {
              name : '两侧留白',
              type : comType.NUMBER,
              value : this.getValue("boundaryGap")
            }
          ]
        },
        {
          name:'轴刻度',
          type:comType.GROUP,
          show:true,
          showName:'显示',
          value:this.getValue('axisTick'),
          children:[
            {
              name:'刻度长度',
              type:comType.NUMBER,
              value:this.getValue('axisTickLehgth')
            },
            {
              name:'朝向',
              type:comType.BOOLEAN,
              value:this.getValue('axisTickInside')
            },
            {
              name:'居中',
              type:comType.BOOLEAN,
              value:this.getValue('alignWithLabel')
            },
            {
              name:'颜色',
              type:comType.COLOR,
              value:this.getValue('tickColor')
            },
              {
              name:'刻度样式',
              type:comType.SELECT,
              value:this.getValue('tickStyle'),
              range:[{'solid':'solid'},{'dashed':'dashed'},{'dotted':'dotted'}]
            },
              {
              name:'粗细',
              type:comType.NUMBER,
              value:this.getValue('tickWidth')
            },{
              name:'透明度',
              type:comType.NUMBER,
              step:0.1,
              max:1,
              value:this.getValue('tickOpacity')
            }          
          ]
        },
        {
          name:'轴标签',
          type:comType.GROUP,
          show:true,
          showName:'显示',
          value:this.getValue('isAxisLabel'),
          children:[
            {
              name:'大小',
              type:comType.NUMBER,
              value:this.getValue('labelSize')
            },
            {
              name:'颜色',
              type:comType.COLOR,
              value:this.getValue('labelColor')
            },
            {
              name:'字体',
              type:comType.FONTFAMILY,
              value:this.getValue('fontFamily')
            },
            {
              name:'文字方向',
              type:comType.NUMBER,
              value:this.getValue('wordDirection'),
              default : 0
              // range:[{'0':'水平'},{'90':'垂直'},{'45':'正45度'},{'-45':'负45度'}]
            },
            {
              name:'间距',
              type:comType.NUMBER,
              value:this.getValue('labelMargin')
            }
          ]
        },
        {
          name:'单位',
          type:comType.GROUP,
          show:true,
          value:this.getValue('isUnit'),
          showName:'显示',
          children:[
            {
              name:'单位名称',
              type:comType.TEXT,
              value:this.getValue('unitName')
            },
            {
              name:'单位字体',
              type:comType.FONTFAMILY,
              value:this.getValue('unitFontFamily')
            },
            {
              name:'单位字号',
              type:comType.NUMBER,
              value:this.getValue('unitFontSize')
            },
            {
              name:'单位颜色',
              type:comType.COLOR,
              value:this.getValue('unitFontColor')
            },
            {
              name : '位置',
              type : comType.SELECT,
              value : this.getValue("nameLocation"),
              range : [{start : '底'},{middle : '中间位置(y轴在竖轴方向)'},{center : '中间位置(y轴在横轴方向)'},{end : '顶'}],
              default : 'end'
            },
            {
              name : '与轴线的距离',
              type : comType.NUMBER,
              value : this.getValue("nameGap"),
              default : 0
            },
            {
              name : '内边距',
              type : comType.TEXT,
              value : this.getValue("namePadding"),
              default : '0,0,0,0'
            },
            {
              name : '旋转角度',
              type : comType.NUMBER,
              value :this.getValue("nameRotate"),
              default : 0
            }
          ]
        },

        {
          name:'网格线',
          type:comType.GROUP,
          show:true,
          showName:'显示',
          value:this.getValue('isGrid'),
          children:[
            {
              name:'颜色',
              type:comType.COLOR,
              value:this.getValue('gridColor')
            },
            {
              name:'线条粗细',
              type:comType.NUMBER,
              value:this.getValue('gridBold')
            },
            {
              name:'样式',
              type:comType.SELECT,
              value:this.getValue('splitLineType'),
              range:[{'solid':'solid'},{'dashed':'dashed'},{'dotted':'dotted'}]
            },
            {
              name:'透明度',
              type:comType.NUMBER,
              value:this.getValue('gridOpaque'),
              step:0.1,
              min:0,
              max:1
            }
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
