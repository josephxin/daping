(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1b839dfc"],{"88fa":function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"indicator-wrapper",style:t.boxStyle},[a("el-carousel",{attrs:{trigger:"click",height:t.boxHeight,direction:t.direction,loop:t.loop,autoplay:t.autoplay,interval:t.interval,arrow:t.arrow,"indicator-position":t.indicatorPosition}},t._l(t.convertData,(function(e,l){return a("el-carousel-item",{key:l,attrs:{label:l+1}},[a("ul",{staticClass:"two-indicator"},t._l(e,(function(e,n){return a("li",{key:n,staticClass:"indicator",style:t.itemStyle(l,n),on:{click:function(e){return e.stopPropagation(),t.indicatorClick(l,n)}}},[a("div",{staticClass:"indicator-top",style:t.titleStyle},[a("div",{staticClass:"icon-wrap"},[t.iconValue(e,l,n)?a("img",{staticClass:"icon",style:t.iconStyle(l,n),attrs:{src:t.iconValue(e,l,n),alt:""}}):a("i",{staticClass:"el-icon-postcard default-icon"})]),a("span",{staticClass:"name",style:t.elementStyle("Name",l,n),attrs:{title:e[t.fieldMap.name]}},[t._v(t._s(e[t.fieldMap.name]||"--"))])]),a("div",{staticClass:"indicator-bottom"},[a("div",{staticClass:"cont"},[a("span",{staticClass:"label",style:t.elementStyle("Label",l,n),attrs:{title:t.labelContent1}},[t._v(t._s(t.labelContent1||"--"))]),a("span",{staticClass:"text"},[a("span",{staticClass:"value",style:t.elementStyle("Value",l,n),attrs:{title:e[t.fieldMap.value]}},[t._v(t._s(e[t.fieldMap.value]||"--"))]),a("span",{staticClass:"unit",style:t.elementStyle("Unit",l,n)},[t._v(t._s(e[t.fieldMap.unit]||""))])])]),a("div",{staticClass:"cont"},[a("span",{staticClass:"label",style:t.elementStyle("Label",l,n),attrs:{title:t.labelContent2}},[t._v(t._s(t.labelContent2||"--"))]),a("span",{staticClass:"text"},[a("span",{staticClass:"rate",style:t.elementStyle("Rate",l,n),attrs:{title:e[t.fieldMap.rate]}},[t._v(t._s(e[t.fieldMap.rate]||"--"))]),a("span",{staticClass:"rateUnit",style:t.elementStyle("RateUnit",l,n)},[t._v(t._s(e[t.fieldMap.rateUnit]||""))])])])])])})),0)])})),1)],1)},n=[],i=a("0a8a"),s={name:"twoIndicator",mixins:[i["a"]],components:{},data:function(){return{}},computed:{titleStyle:function(){var t=this.compStyle.defaultTitle;return{height:t.height+"px",backgroundColor:t.backgroundColor,backgroundImage:"url(".concat(t.backgroundImage,")")}},labelContent1:function(){return this.compStyle.defaultLabel.content1},labelContent2:function(){return this.compStyle.defaultLabel.content2}},created:function(){},beforeDestroy:function(){},methods:{}},o=s,c=(a("d7a6"),a("5d22")),r=Object(c["a"])(o,l,n,!1,null,null,null);e["default"]=r.exports},bbea:function(t,e,a){},d7a6:function(t,e,a){"use strict";a("bbea")}}]);