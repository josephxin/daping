(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0f4a61dd"],{"127d":function(e,t,a){},"76c7":function(e,t,a){"use strict";a("127d")},"912a":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"visualMapUI"},[a("groupUI",{attrs:{styleObj:e.getObj}})],1)},u=[],n=(a("1d7a"),a("4d70")),i={name:"visualMapUI",props:["styleObj"],computed:{getObj:function(){var e={};return e.name=this.styleObj.name,"undefined"!=typeof this.styleObj.fold&&(e.fold=this.styleObj.fold),e.show=!0,e.showName="显示",e.value=this.getValue("show"),e.children=[{name:"排布方式",value:this.getValue("orient"),type:n["a"].SELECT,range:[{vertical:"纵向"},{horizontal:"横向"}]},{name:"宽度",value:this.getValue("itemWidth"),type:n["a"].NUMBER},{name:"高度",value:this.getValue("itemHeight"),type:n["a"].NUMBER},{name:"文本内容",value:this.getValue("text"),type:n["a"].TEXT},{name:"文本与主体距离",value:this.getValue("textGap"),type:n["a"].NUMBER},{name:"手柄和文字的位置",value:this.getValue("align"),type:n["a"].SELECT,range:[{auto:"auto"},{left:"left"},{right:"right"},{top:"top"},{bottom:"bottom"}]},{name:"内边距",value:this.getValue("padding"),type:n["a"].TEXT},{name:"距容器左侧距离",value:this.getValue("left"),type:n["a"].TEXT},{name:"距容器上侧距离",value:this.getValue("top"),type:n["a"].TEXT},{name:"距容器右侧距离",value:this.getValue("right"),type:n["a"].TEXT},{name:"距容器下侧距离",value:this.getValue("bottom"),type:n["a"].TEXT},{name:"文字配置",type:n["a"].GROUP,children:[{name:"文字大小",value:this.getValue("textStyle fontsize"),type:n["a"].NUMBER},{name:"文字颜色",value:this.getValue("textStyle color"),type:n["a"].COLORALPHA}]}],e}},methods:{getValue:function(e){return this.styleObj.value+" "+e}}},s=i,o=(a("76c7"),a("5d22")),h=Object(o["a"])(s,l,u,!1,null,"23a95ebc",null);t["default"]=h.exports}}]);