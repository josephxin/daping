(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d5cb3dc","chunk-6d63885a"],{4099:function(t,e,a){},"4bf3":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"compbox",class:{compHighLight:t.isHighlight},style:t.boxStyle,attrs:{id:t.contentId}},[a(t.compConf.componentName,{ref:"contentComp",tag:"component",attrs:{compConf:t.compConf,mainId:t.compConf.compId,id:t.compConf.compId},on:{compState:t.compStateChanged}})],1)},o=[],s=(a("445a"),a("6540"),a("fae2"),a("d211")),n=a("cf6b"),c=!1,r={name:"previewCompItem",data:function(){return{myChart:null,isCtrl:!1,translateX:0,translateY:0,scaleW:1,scaleH:1,isReload:!1,linkageData:{},compState:null}},components:{},mixins:[],props:["compConf"],computed:Object(s["a"])(Object(s["a"])({},Object(n["c"])({activeComp:"getFirstActiveComp"})),{},{id:function(){return this.compConf.compId},contentId:function(){return this.id+"-preview-box"},boxStyle:function(){var t=this.compConf,e={};return t?(t.box.top&&(e.top=t.box.top+"px"),t.box.left&&(e.left=t.box.left+"px"),t.box.height&&(e.height=t.box.height+"px"),t.box.width&&(e.width=t.box.width+"px"),e.zIndex=t.compIndex,e.transform="translate(".concat(this.translateX,"px, ").concat(this.translateY,"px) scale(").concat(this.scaleW,", ").concat(this.scaleH,") rotate(").concat(t.box.rotate,"deg)"),e):e},isHighlight:function(){var t=this.compConf;return t.isHighlight&&!this.$store.getters.getPreviewState}}),created:function(){this.scaleW=1},updated:function(){this.isReload&&(this.$refs.contentComp.resize&&this.$refs.contentComp.resize(),this.isReload=!1)},methods:Object(s["a"])(Object(s["a"])({},Object(n["b"])(["switchComListDisplayState","moveTop","moveUp","moveDown","moveBottom","delComs","selectOnlyOne","selectComs","highLightCom","cancelHighLightCom"])),{},{handleOver:function(t){t.index;this.$store.commit("changeHighlight",{compId:this.id,value:!0})},handleOut:function(){this.$store.commit("changeHighlight",{compId:this.id,value:!1})},handleFocus:function(t){t.index;this.selectOnlyOne(this.id),this.$store.commit("setScreenGridShow",!0)},handleBlur:function(t){var e=t.left,a=t.top,i=t.width,o=t.height,s={compId:this.id,left:e,top:a,width:i,height:o};this.$store.commit("updateCompStyle",s),this.isReload=!0,this.$store.commit("setScreenGridShow",!1)},updateComp:function(t){t&&t.compId==this.compConf.compId&&(t.translateX&&(this.translateX=t.translateX),t.translateY&&(this.translateY=t.translateY),t.scaleH&&(this.scaleH=t.scaleH),t.scaleW&&(this.scaleW=t.scaleW))},changeScaleStyle:function(){var t=this;this.activeComp.property&&Object.keys(this.activeComp.property).map((function(e,a){t.activeComp.property[e].map((function(a,i){var o=["style"],s=0;"base"==e?(o.push(a),s=Math.ceil(t.scaleW*t.activeComp.style[a])):(o.push(e,a),s=Math.ceil(t.scaleW*t.activeComp.style[e][a])),t.$store.commit("modifyValueBySelected",{attrs:o,value:s})}))}))},clickComp:function(){this.$store.getters.getPreviewState||(this.isCtrl||this.$store.commit("cleanAllActive"),this.$store.commit("changeActive",{compId:this.id,value:!0}),this.isCtrl=!1)},multiselect:function(){this.$store.getters.getPreviewState||(this.isCtrl=!0)},enter:function(){this.$store.getters.getPreviewState||this.$store.commit("changeHighlight",{compId:this.id,value:!0})},leave:function(){this.$store.getters.getPreviewState||this.$store.commit("changeHighlight",{compId:this.id,value:!1})},reloadComp:function(t){t&&t.compId==this.compConf.compId&&(this.translateX=0,this.translateY=0,this.scaleW=1,this.scaleH=1,this.isReload=!0)},compStateChanged:function(t){c&&console.log("AbstractComp","[",this.id,"]","state change from:",this.compState," to ",t),this.compState=t},updateCompData:function(t){var e=this.$refs.contentComp;e.updateCompData||console.error("the component [",this.id,"] is not exist."),e.updateCompData(t)}})},l=r,d=(a("d64b"),a("5d22")),p=Object(d["a"])(l,i,o,!1,null,"0085d804",null);e["a"]=p.exports},6446:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"project-preview"},[t.pageId?a("preview",{attrs:{isProjectPreview:!0,pageId:t.pageId,pageParam:t.pageParam}}):t._e(),t.firstLoad||t.pageId?t._e():a("page404"),a(t.nav.typeId,{ref:"navComp",tag:"component",attrs:{nav:t.nav,menuItemId:t.menuItemId}})],1)},o=[],s=(a("fae2"),a("d211")),n=a("24d2"),c=a("0e0b"),r=a("cf6b"),l=a("dd08"),d=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},p=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page404"},[a("div",{staticClass:"container"},[a("div",{staticClass:"figure"},[a("div",{staticClass:"mj"},[a("div",{staticClass:"head"},[a("div",{staticClass:"nose"}),a("div",{staticClass:"hair"},[a("div",{staticClass:"ponytail"}),a("div",{staticClass:"frontpony"})])]),a("div",{staticClass:"body"},[a("div",{staticClass:"jacket"},[a("div",{staticClass:"hand"})])]),a("div",{staticClass:"leg"},[a("div",{staticClass:"foot"})]),a("div",{staticClass:"leg lft"},[a("div",{staticClass:"foot"})])]),a("div",{staticClass:"error-no"},[a("span",[t._v("4")]),a("div",{staticClass:"moon"}),a("span",[t._v("4")])])])])])}],h=(a("a14a"),{name:"page404",props:{},data:function(){return{}},computed:Object(s["a"])({},Object(r["d"])([])),created:function(){},mounted:function(){var t=this;window.onresize=function(){t.initPageSize()}},beforeDestroy:function(){},methods:Object(s["a"])({},Object(r["b"])(["initPageSize"]))}),m=h,u=(a("f163"),a("5d22")),f=Object(u["a"])(m,d,p,!1,null,"b3877fbe",null),g=f.exports,v={name:"projectPreview",components:{preview:l["default"],page404:g},provide:function(){return{projectPreview:this}},data:function(){return{nav:{},pageId:"",pageParam:{},menuItemId:"",firstLoad:!0}},computed:Object(s["a"])({},Object(r["d"])(["project"])),watch:{},created:function(){var t=this.$route.query.projectId;this.getProjectNav(t)},mounted:function(){},beforeDestroy:function(){},methods:{getProjectNav:function(t){var e=this;n["a"].getNavByProjectId(t).then((function(t){if(console.log("getProjectNav -> res",t),200==t.code){var a=t.data;if(a&&a.constructor==Object&&Object.keys(a).length){e.nav=c["a"].deepCopy(a),e.menuItemId=e.nav.navigationItemId;var i=e.nav.menuList||[];e.getPageId(i)}}}))},getPageId:function(t){for(var e=0;e<t.length;e++){var a=t[e];if(a.id==this.menuItemId)return this.pageId=a.pageId,this.pageParam=a.pageParam,this.firstLoad=!1,!0;if(a.children.length){var i=a.children,o=this.getPageId(i);if(o)return!0}}return!1},changeMenuItem:function(t,e){this.$store.commit("clearData"),this.$evtBus.clearCycle(),this.pageId=t,this.pageParam=e}}},C=v,b=(a("d4d9"),Object(u["a"])(C,i,o,!1,null,"4fa649a4",null));e["default"]=b.exports},"763e":function(t,e,a){},"7db3":function(t,e,a){},d4d9:function(t,e,a){"use strict";a("7db3")},d64b:function(t,e,a){"use strict";a("763e")},dd08:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page page-preview"},[a("div",{staticClass:"preview-comp-item-container"},t._l(t.compMap,(function(e,i){return-1===["layerChildren","themeLayer"].indexOf(e.compType)?a("preview-comp-item",{key:i,attrs:{compConf:e}}):t._e()})),1)])},o=[],s=(a("a866"),a("1d7a"),a("d211")),n=a("4bf3"),c=a("cf6b"),r=a("0e0b"),l=a("24d2"),d={name:"preview",components:{previewCompItem:n["a"]},props:{isProjectPreview:{type:Boolean,default:!1},pageId:{type:String,default:""},pageParam:{type:Object}},data:function(){return{flag:!0}},computed:Object(s["a"])(Object(s["a"])({},Object(c["d"])(["preview"])),{},{compMap:function(){return this.preview.components.value},pageIdAndParams:function(){var t=this.pageId,e=this.pageParam;return{pageId:t,pageParam:e}}}),watch:{pageIdAndParams:{handler:function(t,e){this.getPageDetail()},deep:!0}},created:function(){},mounted:function(){var t=this,e=this.$route.query;this.$store.commit("changeProjectId",e.projectId),this.getPageDetail(),window.onresize=function(){t.flag&&t.initPageSize()}},beforeDestroy:function(){document.querySelector("#app").style.background="none",this.$store.commit("clearData"),this.$evtBus.clearCycle()},methods:Object(s["a"])(Object(s["a"])({},Object(c["b"])(["initPageSize"])),{},{getPageDetail:function(){var t=this,e="";if(this.isProjectPreview){if(e=this.pageId,!e)return void this.$message.error("此菜单项没有配置页面，无法跳转！")}else e=r["a"].getQueryString("pageId");this.$store.commit("setStatus",!0),r["a"].dataSaveMode()==r["a"].serverMode||e?l["a"].getPageDetail(e).then((function(e){if(200==e.code){var a=e.data;if(a){var i;try{i=JSON.parse(a.conf)}catch(s){return void console.error("getPageDetail -> error",s)}window.debug=i.isShowLog;var o=i.globalParams;o&&Array.isArray(o)&&o.length&&(t.flag=t.analysisParams(o)),t.flag&&t.$store.dispatch("loadData",i).then((function(e){t.initPageSize()}))}else t.$message.error("属性data不存在！")}else t.$alert(e.message,"提示",{confirmButtonText:"确定",type:"error"})})):(console.log("本地模式且没有pageId"),window.debug=!!localStorage.getItem("isShowLog"),this.$store.dispatch("loadData",null).then((function(e){t.initPageSize()})))},analysisParams:function(t){var e;e=this.isProjectPreview?this.pageParam:r["a"].getAllUrlParams();for(var a={},i=0;i<t.length;i++){var o=t[i],s=o.name,n=e[s];if(o.required){if(!n)return this.$alert("参数错误，缺少必传参数：".concat(s),"提示",{confirmButtonText:"确定",type:"error",callback:function(t){}}),!1;a[s]=n}else a[s]=n||o.value}return console.log("analysisParams -> resultParams",a),this.$store.commit("changePreviewParams",a),!0}})},p=d,h=a("5d22"),m=Object(h["a"])(p,i,o,!1,null,null,null);e["default"]=m.exports},f163:function(t,e,a){"use strict";a("4099")}}]);