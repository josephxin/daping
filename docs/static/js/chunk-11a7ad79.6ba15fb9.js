(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11a7ad79"],{"17f3":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var a={CREATE:"create",RUNNING:"running",REDRAW:"redraw",RELOAD:"reload",DESTROY:"destroy"}},"1e61":function(t,e,n){},"1ee1":function(t,e,n){"use strict";n("1e61")},"206f":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"timeaxis-comp",style:t.style},[n("ul",{staticClass:"time-group"},t._l(t.axisData,(function(e,a){return n("li",{key:a,style:t.itemStyle(a),on:{click:function(e){return e.stopPropagation(),t._axisClick(a)}}},[n("span",[t._v(t._s(e.showValue))])])})),0)])},o=[],i=(n("cb3c"),n("72b3"),n("c726"),n("cca2"),n("6540"),n("68de"),n("402f"),n("a5932"),n("0bd5"),n("836b"),n("b784"),n("79a8"),n("270f"),n("7031")),r=n("e807"),s=n.n(r),c=n("be7e");s.a.extend(c);var u={name:"timeline",mixins:[i["a"]],data:function(){return{axisData:[],selectIndex:[]}},computed:{style:function(){return{width:this.compConf.box.width+"px",height:this.compConf.box.height+"px",background:this.styleConf.bgColor}},compStyle:function(){return this.compConf.style}},methods:{itemStyle:function(t){var e=this.selectIndex.includes(t)?"active":"default";return{lineHeight:this.compStyle.base.height+"px",padding:_.cloneDeep(this.compStyle.base.padding).split(",").map((function(t){return parseFloat(t)+"px"})).join(" "),margin:_.cloneDeep(this.compStyle.base.margin).split(",").map((function(t){return parseFloat(t)+"px"})).join(" "),fontWeight:this.compStyle.base.fontWeight,fontSize:this.compStyle[e].fontSize+"px",color:this.compStyle[e].fontColor,backgroundColor:this.compStyle[e].backgroundColor}},styleConfChanged:function(){this.updateChartData()},updateChartData:function(){this.axisData=_.cloneDeep(this.convertChartData(this.compData))},convertChartData:function(t){return"static"===this.compConf.data.datasource.type?this._covertAxisData(t):this._covertAxisData(t[0])},_covertAxisData:function(t){var e=this,n=[];return t&&t.length&&t.forEach((function(t){var a=t[e.compStyle.data["in"].key];a&&("number"===typeof a&&(a=a.toString()),n.push({sourceValue:a,showValue:s()(a,e.compStyle.data["in"].format).format(e.compStyle.data.show.format),oriValue:t}))})),n},_axisClick:function(t){var e=this.compStyle.data.out.type;switch(e){case"dot":if(this.selectIndex.includes(t))return;this.selectIndex=[t];break;case"dotArr":this.selectIndex.includes(t)?this.selectIndex=this.selectIndex.filter((function(e){return e!==t})):this.selectIndex.push(t);break;case"range":if(this.selectIndex.includes(t))this.selectIndex=this.selectIndex.filter((function(e){return e!==t}));else{if(this.selectIndex.length>=2)return;this.selectIndex.push(t)}break;default:break}this.loadLinkage(t)},_getIndexByVal:function(t){for(var e=0;e<this.axisData.length;e++)if(t===this.axisData[e]["sourceValue"])return e;return 0},_outPutOriginData:function(t){t=_.cloneDeep(t);var e=t.oriValue;return delete t.oriValue,Object.assign(e,t)},_formatOutData:function(){var t=this,e=this.selectIndex[0],n=this.axisData[e],a=this.compStyle.data.out.format;if(!a||!a.length)return this._outPutOriginData(n);var o={};return a.forEach((function(e){if(e.key){var a=n.sourceValue;"number"===typeof a&&(a=a.toString());var i=e.format?s()(a,t.compStyle.data["in"].format).format(e.format):a,r=e.showFormat||e.format?s()(a,t.compStyle.data["in"].format).format(e.showFormat?e.showFormat:e.format):a,c=Object.assign(n.oriValue,{sourceValue:i,showValue:r});o[e.key]=c}})),_.isEmpty(o)?this._outPutOriginData(n):o},loadLinkage:function(t){if(this.compConf.linkage&&this.compConf.linkage.linkEvents)for(var e=this.compConf.linkage.linkEvents,n=0;n<e.length;n++){var a=e[n];if("click"===a.evtType&&a.explosive){var o=this._formatOutData(t),i={data:o};this.$evtBus.emit(a.evtName,i)}}},linkageConfChanged:function(){if(this.compConf.linkage&&this.compConf.linkage.linkEvents)for(var t=this.compConf.linkage.linkEvents,e=0;e<t.length;e++){var n=t[e];"click"===n.evtType&&n.explosive&&n.def.defTrigger&&this.$store.getters.getPreviewState&&("index"===n.def.defType?this._axisClick(n.def.defVal):"val"===n.def.defType&&this._axisClick(this._getIndexByVal(n.def.defVal)))}}}},l=u,f=(n("1ee1"),n("5d22")),d=Object(f["a"])(l,a,o,!1,null,"4c6c0b17",null);e["default"]=d.exports},7031:function(t,e,n){"use strict";var a=n("17f3"),o=n("a553");e["a"]={name:"AbstractComp",mixins:[o["a"]],data:function(){return{chartData:null,nextIndex:0,compDataStatus:"loading",defaultColors:["#04d6ef","#ef58ea","#ff9e87","#0cc2ff","#fad860","#9bca63","#fe8463","#975fe5","#dc81d2","#8d98b3"]}},watch:{compDataStatus:{handler:function(t){"loading"===t&&this.chartLoading()}}},methods:{draw:function(){},chartLoading:function(){this.myChart&&this.myChart.showLoading({text:"",color:"#666",textColor:"#fff",maskColor:"rgba(115, 170, 229, 0)",zlevel:0,fontSize:30,showSpinner:!0,spinnerRadius:10,lineWidth:5})},_toggleCompShow:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2?arguments[2]:void 0;t&&(document.getElementById("".concat(n)).style.transition=e?"all .3s ease-out":"",document.getElementById("".concat(n)).style.transform=e?"scale(1)":"scale(0)")}},created:function(){this.updateState(a["a"].CREATE)},mounted:function(){var t=this;this.updateChartData(this.compData),this.draw(),this.updateState(a["a"].RUNNING),this.$nextTick((function(){t.linkageConfChanged()}))},destroyed:function(){this.updateState(a["a"].DESTROY)},render:function(t){var e=this.compConf.compId;return t("div",{attrs:{id:e},style:{left:"0px",top:"0px",width:"100%",height:"100%",position:"absolute"}})}}},"98f2":function(t,e,n){var a=n("1f17"),o=a("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[o]=!1,"/./"[t](e)}catch(a){}}return!1}},a553:function(t,e,n){"use strict";n("72b3"),n("c726"),n("a543"),n("a866"),n("cca2"),n("6540"),n("dede"),n("1d7a"),n("b5eb"),n("0bd5"),n("b784"),n("9b42"),n("270f");var a=n("d211"),o=n("17f3"),i=n("cf6b"),r=n("0e0b");e["a"]={name:"ComInterface",props:["compConf"],data:function(){return{chartData:null,compDataStatus:"loading"}},computed:Object(a["a"])({compId:function(){return this.compConf.compId},box:function(){return this.compConf.box},styleConf:function(){return this.compConf.style},dataConf:function(){if(this.compConf.data)return this.compConf.data.conf},dataSourceConf:function(){if(this.compConf.data)return this.compConf.data.datasource},compData:function(){return this.$store.state.compData.compData[this.compId]},linkageConf:function(){return this.compConf.linkage},state:function(){return this.compConf.state}},Object(i["c"])({activeCompData:"getCompData"})),watch:{styleConf:{handler:function(t,e){this.updateState(o["a"].REDRAW),this.styleConfChanged(t,e),this.updateState(o["a"].RUNNING)},deep:!0},state:{handler:function(t,e){},deep:!0},compData:{handler:function(t,e){t&&JSON.stringify(t)!=JSON.stringify(e)&&this.updateCompData(!0)},deep:!0},linkageConf:{handler:function(t,e){this.linkageConfChanged(t,e)},deep:!0},"dataSourceConf.type":{handler:function(t,e){this.$evtBus.destroy(this.compId)}}},methods:{convertExpression:function(t){if(-1!==JSON.stringify(t).indexOf("${")){var e=JSON.stringify(t);t=this._getExpressionValue(e),t=JSON.parse(t)}return t},styleConfChanged:function(){},compDataChanged:function(){},resize:function(){},convertChartData:function(t){},linkageConfChanged:function(t,e){},updateState:function(t){this.$emit("compState",t)},updateChartData:function(t){this.chartData=this.convertChartData(t)||t},_linkageDataKeys:function(t){var e=[];for(var n in t)t[n].data.forEach((function(t){e.push({bindMapperColumn:t.bindMapperColumn,value:t.value,operationType:t.operationType})}));return e},_getColumnCondition:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(1===t.useType)return{bindMapperColumn:t.columnName,dsId:e,operationType:t.operationType,value:t.value};if(2===t.useType){if(!n.length)return{};var a=this._getGlobalParamsValue(t.columnName,n);return a?{bindMapperColumn:t.columnName,dsId:e,operationType:t.operationType,value:a}:{}}t.value;var o=this._getExpressionValue(t.value);return o&&-1===o.indexOf("${")&&-1===o.indexOf("}")?{bindMapperColumn:t.columnName,dsId:e,operationType:t.operationType,value:o}:{}},_mergeElementConfig:function(t,e,n){var a=this,o=e.data.conf[t],i=_.cloneDeep(o.searchElementConfigs)||[];if(i.length){var r=n.state.window.globalParams;i.sort((function(t,e){return t.useType-e.useType}));var s={};i.forEach((function(e){var n=a._getColumnCondition(e,t,r);_.isEmpty(n)||(s[e.columnName]=n)})),_.isEmpty(s)||(i=Object.values(s))}var c=n.getters.getLinkagesByCompId(e["compId"]);if(_.isEmpty(c))return i;var u=i.map((function(t){return t.bindMapperColumn}))||[],l=this._linkageDataKeys(c);return l.forEach((function(e,n){var a=u.indexOf(e.bindMapperColumn);-1!==a?(i[n]["value"]=e.value,i[n].operationType=e.operationType):i.push({dsId:t,bindMapperColumn:e.bindMapperColumn,value:e.value,operationType:e.operationType})})),i},_checkRequireFields:function(){var t=this.compConf;if("dataset"===t.data.datasource.type){var e=t.data.conf.datasetSelectedIds;if(e&&Array.isArray(e)&&e.length){var n=t.data.conf.datasetSelectedIds[0],a=t.data.conf[n]["requireFields"];if(!a||!a.length)return!0;var o=this._mergeElementConfig(n,t,this.$store);if(!o.length)return!1;var i=o.map((function(t){return t.bindMapperColumn})),r=0;return a.forEach((function(t){-1!==i.indexOf(t)&&r++})),r===a.length}}return!0},updateCompData:function(t){if(t)this.compDataStatus="loaded",this.updateState(o["a"].RELOAD),this.compData&&(this.updateChartData(this.compData),this.compDataChanged(),this.updateState(o["a"].RUNNING));else if(["dataset"].includes(this.compConf.data.datasource.type)){var e=this._checkRequireFields();if(!e)return;var n=this.$dm._getFormatRequestParams(this.compConf),a=this.$store.getters.getConditionsByCompId(this.compConf.compId);(!this.$store.getters.getPreviewState||a.length<1||JSON.stringify(a[0].groupByConfig)!==JSON.stringify(n[0].groupByConfig)||JSON.stringify(a[0].orderByConfigDTO)!==JSON.stringify(n[0].orderByConfigDTO)||JSON.stringify(a[0].searchElementConfigs)!==JSON.stringify(n[0].searchElementConfigs))&&(this.compDataStatus="loading",this.$dm.initCompData(this.compConf))}else this.$dm.initCompData(this.compConf)},_mergeArr:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=[],a=t.length>e.length?t.length:e.length,o=0;o<a;o++){var i=t[o]?t[o]:e[o];n.push(i)}return n},_showNoDataBox:function(t){var e=document.getElementById("".concat(t)).querySelector("".concat(t,"_no_data_box"));if(!e){var n=document.createElement("div");n.id="".concat(t,"_no_data_box"),n.innerHTML="无数据",document.getElementById("".concat(t)).appendChild(n)}},_handleStaticData:function(){},_handleConditionExpression:function(){},_getCompLinkageParamsValue:function(t,e){var n=this.$store.getters.getLinkagesByCompId(e);if(!n)return null;if(n=n[t[0]],!n)return null;if(n=n["sourceData"],!n)return null;for(var a=1;a<t.length;a++){if(!n[t[a]])return null;n=n[t[a]]}return n},_getGlobalParamsValue:function(t){var e=this.$store.state.window.globalParams;if(!e||!e.length)return null;for(var n=0;n<e.length;n++)if(e[n].name===t)return e[n].value?e[n].value:null;return null},_getExpressionValue:function(t){var e=this,n=r["a"].getCustomExpressionParams(t),a=[];return n&&n.length&&n.forEach((function(t){var n=r["a"].getCustomExpressionCloumn(t),o=n.exp,i=n.format||"${"+o.join(".")+"}";if(o.length>=2)if("global"===o[0]){var s=e._getGlobalParamsValue(o[1]);s?a.push(s):a.push(i)}else{var c=e._getCompLinkageParamsValue(o,e.compConf["compId"]);c?a.push(c):a.push(i)}else a.push(i)})),a.length&&n.forEach((function(e,n){t=t.replace(e,a[n])})),t},_convertEventOutData:function(t,e){if(!e||!e.datasource||"static"===e.datasource.type)return t;var n=e.conf[e.conf.datasetSelectedIds[0]]["datasetMeta"],a=_.cloneDeep(t);if(_.isObject(t)){var o=function(e){n.forEach((function(n){[n.columnDesc,n.columnName].includes(e)&&n.columnDesc&&(a[n.columnDesc]=t[e],a[n.columnName]=t[e])}))};for(var i in t)o(i);return a}return _.isArray(t)?(t.forEach((function(e,o){var i=function(i){n.forEach((function(n){[n.columnDesc,n.columnName].includes(i)&&n.columnDesc&&(a[o][n.columnDesc]=t[e][i],a[o][n.columnName]=t[e][i])}))};for(var r in t[e])i(r)})),a):a}}}},b203:function(t,e,n){var a=n("00a5");t.exports=function(t){if(a(t))throw TypeError("The method doesn't accept regular expressions");return t}},b784:function(t,e,n){"use strict";var a=n("a09b"),o=n("b203"),i=n("4340"),r=n("98f2");a({target:"String",proto:!0,forced:!r("includes")},{includes:function(t){return!!~String(i(this)).indexOf(o(t),arguments.length>1?arguments[1]:void 0)}})}}]);