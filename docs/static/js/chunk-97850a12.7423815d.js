(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-97850a12"],{"0927":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.datasetOptions.length>0?a("el-form",{attrs:{size:"small","label-width":"120"}},[e.dataCfg.selectDataSet?a("el-form-item",{attrs:{label:e.dataCfg.selectDataSet.name}},[a("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"","multiple-limit":e.multiDataset?0:1,filterable:""},on:{change:e._onDatasetChanged},model:{value:e.datasetSelectedIds,callback:function(t){e.datasetSelectedIds=t},expression:"datasetSelectedIds"}},e._l(e.datasetOptions,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1):e._e(),e._l(e.datasetSelectedIds,(function(t){return a("data-binding",{key:t,attrs:{"dataset-selected-id":t,title:e.getSelectDataSetName(t),metaDataList:e._getMetaDataList(t)}})})),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e._loadCompData}},[e._v("加载数据")]),a("el-button",{on:{click:function(t){e.dialogVisible=!0}}},[e._v("查看数据")])],1),e.dialogVisible?a("show-data-dialog",{attrs:{visible:e.dialogVisible},on:{back:e._onDiaologClosed}}):e._e()],2):e._e()},n=[],o=(a("1d7a"),a("d211")),s=a("0f4c"),l=a("cf6b"),r=a("5b12"),c=a("40e9"),d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-card",{staticClass:"dataset-setting-box"},[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[e._v("数据集（"+e._s(e.title)+"）配置")])]),a("el-collapse",{directives:[{name:"show",rawName:"v-show",value:e.datasetSelectedId,expression:"datasetSelectedId"}],attrs:{accordion:""}},[a("el-collapse-item",{attrs:{title:e.title}},[e.dataCfg.xBinding?a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.datasetSelectedId,expression:"datasetSelectedId"}],attrs:{label:e.dataCfg.xBinding.name}},[a("el-select",{attrs:{multiple:"",filterable:""},on:{change:e._onXAxisIdChange},model:{value:e.xAxisIds,callback:function(t){e.xAxisIds=t},expression:"xAxisIds"}},e._l(e.xAxisMetadataList,(function(t){return a("el-option",{key:t.columnName,attrs:{label:t.columnDesc,value:t.columnName,disabled:t.disabled}},[a("span",{staticStyle:{float:"left"}},[e._v(e._s(t.columnName)+"("+e._s(t.columnDesc)+")")]),a("span",{staticStyle:{float:"right","margin-right":"30px",color:"#8492a6","font-size":"13px"}},[e._v(e._s(1==t.columnDefDire?"指标":"维度"))])])})),1)],1):e._e(),e.dataCfg.yBinding?a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.datasetSelectedId,expression:"datasetSelectedId"}],attrs:{label:e.dataCfg.yBinding.name}},[a("el-select",{attrs:{multiple:"",filterable:""},on:{change:e._onYAxisIdChange},model:{value:e.yAxisIds,callback:function(t){e.yAxisIds=t},expression:"yAxisIds"}},e._l(e.yAxisMetadataList,(function(t){return a("el-option",{key:t.columnName,attrs:{label:t.columnDesc,value:t.columnName,disabled:t.disabled}},[a("span",{staticStyle:{float:"left"}},[e._v(e._s(t.columnName)+"("+e._s(t.columnDesc)+")")]),a("span",{staticStyle:{float:"right","margin-right":"30px",color:"#8492a6","font-size":"13px"}},[e._v(e._s(1==t.columnDefDire?"指标":"维度"))])])})),1)],1):e._e(),e.dataCfg.layerTypeBinding?a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.datasetSelectedId,expression:"datasetSelectedId"}],attrs:{label:e.dataCfg.layerTypeBinding.name}},[a("el-select",{staticStyle:{width:"100%"},on:{change:e._changeLayerType},model:{value:e.layer.type,callback:function(t){e.$set(e.layer,"type",t)},expression:"layer.type"}},e._l(e.dataCfg.layerTypeBinding.range,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value,disabled:e.disabled}})})),1)],1):e._e(),e.dataCfg.spatialBinding?a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.datasetSelectedId&&e.layer.type,expression:"datasetSelectedId && layer.type"}],attrs:{label:e.dataCfg.spatialBinding.name}},[a("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"",filterable:"","multiple-limit":e.spaceLimit},on:{change:e.changeGeometryValue},model:{value:e.geometry,callback:function(t){e.geometry=t},expression:"geometry"}},e._l(e.spaceMetaList,(function(t){return a("el-option",{key:t.columnName,attrs:{label:t.columnDesc,value:t.columnName,disabled:t.disabled}},[a("span",{staticStyle:{float:"left"}},[e._v(e._s(t.columnName)+"("+e._s(t.columnDesc)+")")]),a("span",{staticStyle:{float:"right","margin-right":"30px",color:"#8492a6","font-size":"13px"}},[e._v(e._s(1==t.columnDefDire?"指标":"维度"))])])})),1)],1):e._e(),e.dataCfg.propsBinding?a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.datasetSelectedId&&e.layer.type,expression:"datasetSelectedId && layer.type"}],attrs:{label:e.dataCfg.propsBinding.name}},[a("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"",filterable:""},on:{change:e.changePropertiesValue},model:{value:e.properties,callback:function(t){e.properties=t},expression:"properties"}},e._l(e.metaList,(function(t){return a("el-option",{key:t.columnName,attrs:{label:t.columnDesc,value:t.columnName,disabled:t.disabled}},[a("span",{staticStyle:{float:"left"}},[e._v(e._s(t.columnName)+"("+e._s(t.columnDesc)+")")]),a("span",{staticStyle:{float:"right","margin-right":"30px",color:"#8492a6","font-size":"13px"}},[e._v(e._s(1==t.columnDefDire?"指标":"维度"))])])})),1)],1):e._e(),e.dataCfg.layerNameBinding?a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.datasetSelectedId&&e.layer.type,expression:"datasetSelectedId && layer.type"}],attrs:{label:e.dataCfg.layerNameBinding.name}},[a("el-select",{staticStyle:{width:"100%"},on:{change:e._changeValue},model:{value:e.layer.name,callback:function(t){e.$set(e.layer,"name",t)},expression:"layer.name"}},e._l(e.metaList.filter((function(e){return 2==e.columnDefDire})),(function(t){return a("el-option",{key:t.columnName,attrs:{label:t.columnDesc,value:t.columnName,disabled:t.disabled}},[a("span",{staticStyle:{float:"left"}},[e._v(e._s(t.columnName)+"("+e._s(t.columnDesc)+")")]),a("span",{staticStyle:{float:"right","margin-right":"30px",color:"#8492a6","font-size":"13px"}},[e._v(e._s(1==t.columnDefDire?"指标":"维度"))])])})),1)],1):e._e()],1),a("el-collapse-item",{attrs:{title:"必要参数"}},[a("el-checkbox-group",{on:{change:e._requireFieldsChanged},model:{value:e.requireFields,callback:function(t){e.requireFields=t},expression:"requireFields"}},e._l(e.metaList,(function(e){return a("el-checkbox",{key:e.id,attrs:{label:e.columnName}})})),1)],1),a("el-collapse-item",{attrs:{title:"条件配置"}},[a("div",{staticClass:"global-params-box"},[a("el-button",{staticStyle:{"margin-bottom":"2px"},attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(t){return t.stopPropagation(),e._addElementConfig(t)}}},[e._v("条件配置 ")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.searchElementConfigs,border:""}},[a("el-table-column",{attrs:{prop:"columnName",label:"条件字段"}}),a("el-table-column",{attrs:{prop:"paramsFrom",label:"取值方式"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(1===t.row.paramsFrom?"自定义":"全局参数")+" ")]}}])}),a("el-table-column",{attrs:{prop:"value",label:"值/全局参数"}}),a("el-table-column",{attrs:{prop:"operationType",label:"条件",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._getOperationType(t.row.operationType))+" ")]}}])})],1)],1)]),a("el-collapse-item",{attrs:{title:"排序配置"}},[a("div",{staticClass:"global-sort-params"},[a("el-button",{staticStyle:{"margin-bottom":"2px"},attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(t){return t.stopPropagation(),function(){e.$refs.orderByConfig.show()}()}}},[e._v("排序配置 ")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.orderByConfigDTO,border:""}},[a("el-table-column",{attrs:{prop:"bindMapperColumn",label:"排序字段"}}),a("el-table-column",{attrs:{prop:"orderByType",label:"排序方式"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s("asc"===t.row.orderByType?"正序":"倒序")+" ")]}}])})],1)],1)]),a("el-collapse-item",{attrs:{title:"数据集结果配置"}},[a("el-form-item",{attrs:{label:"结果集数据条数限制"}},[a("el-input",{on:{change:e._onResultNumberChange},model:{value:e.resultNumber,callback:function(t){e.resultNumber=t},expression:"resultNumber"}})],1)],1)],1),e.elementConfigsEditDialogVisible?a("search-element-config",{attrs:{visible:e.elementConfigsEditDialogVisible,metaList:e.metaList,globalParams:e.searchElementConfigs},on:{onBack:e._elementConfigsEditClosed,onSave:e._updateElementConfigs}}):e._e(),a("order-by-config",{ref:"orderByConfig",attrs:{metaList:e.metaList,globalParams:e.orderByConfigDTO},on:{onSave:e._updateOrderByConfigs}})],1)},u=[],m=(a("ab31"),a("4f40"),a("445a"),a("cb3c"),a("72b3"),a("a543"),a("68de"),a("402f"),a("836b"),a("270f"),a("a14a")),p=a.n(m),f=a("9cda"),h=a("2885"),g=a("357f"),b={name:"dataBinding",props:["datasetSelectedId","title","metaDataList"],computed:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(l["c"])({activeComp:"getFirstActiveComp"})),Object(l["d"])(["window"])),{},{dataCfg:function(){return Object(c["a"])(this.activeComp.componentName)},globalParamOptions:function(){return this.window.globalParams}}),components:{searchElementConfig:h["a"],orderByConfig:g["a"]},watch:{datasetSelectedId:{handler:function(e,t){e&&this._getDatasetMetadata()}},"activeComp.compId":{handler:function(e,t){this._getDatasetMetadata()}}},data:function(){return{xAxisMetadataList:[],yAxisMetadataList:[],metaList:[],layer:{name:"",type:""},spaceMetaList:[],xAxisIds:[],yAxisIds:[],properties:[],geometry:[],spaceLimit:0,searchElementConfigs:[],operationTypes:f["a"],requireFields:[],globalParams:[],elementConfigsEditDialogVisible:!1,orderByConfigDTO:[],resultNumber:""}},mounted:function(){var e=this;this.$nextTick((function(){e._getDatasetMetadata()}))},methods:{_onResultNumberChange:function(){Object(r["d"])("conf ".concat(this.datasetSelectedId.toString()," resultNumber"),this.resultNumber)},_initData:function(){if(this.activeComp.data.conf[this.datasetSelectedId.toString()]){var e=this.datasetSelectedId.toString();this.xAxisIds=this.activeComp.data.conf[e].xAxisIds||[],this.yAxisIds=this.activeComp.data.conf[e].yAxisIds||[],this.properties=this.activeComp.data.conf[e].properties||[],this.geometry=this.activeComp.data.conf[e].geometry||[],this.requireFields=this.activeComp.data.conf[e].requireFields||[],this.globalParams=this.activeComp.data.conf[e].globalParams||[],this.layer=this.activeComp.data.conf[e].layer||{name:"",type:""},this.searchElementConfigs=this.activeComp.data.conf[e].searchElementConfigs||[],this.orderByConfigDTO=this.activeComp.data.conf[e].orderByConfigDTO||[],this.resultNumber=this.activeComp.data.conf[e].resultNumber||"",this.activeComp.data.conf[e].datasetMeta&&(this._onXAxisIdChange(),this._onYAxisIdChange())}},_getDatasetMetadata:function(){var e=p.a.cloneDeep(this.metaDataList);Object(r["d"])("conf ".concat(this.datasetSelectedId.toString()," datasetMeta"),e),this.yAxisMetadataList=p.a.cloneDeep(e),this.xAxisMetadataList=p.a.cloneDeep(e),this.metaList=p.a.cloneDeep(e),this.spaceMetaList=p.a.cloneDeep(e),this._initData()},_onXAxisIdChange:function(){var e=this;Object(r["d"])("conf ".concat(this.datasetSelectedId.toString()," xAxisIds"),this.xAxisIds);var t=this.yAxisMetadataList;t.forEach((function(t){t.disabled=-1!==e.xAxisIds.indexOf(t.columnName)})),this.yAxisMetadataList=p.a.cloneDeep(t)},_onYAxisIdChange:function(){var e=this;Object(r["d"])("conf ".concat(this.datasetSelectedId.toString()," yAxisIds"),this.yAxisIds);var t=this.xAxisMetadataList;t.forEach((function(t){t.disabled=-1!==e.yAxisIds.indexOf(t.columnName)})),this.xAxisMetadataList=p.a.cloneDeep(t)},_changeLayerType:function(){Object(r["d"])("conf ".concat(this.datasetSelectedId.toString()," ").concat(this.dataCfg.layerTypeBinding.value),this.layer),Object(r["d"])("conf  ".concat(this.datasetSelectedId.toString()," geometry"),[]),Object(r["d"])("conf  ".concat(this.datasetSelectedId.toString()," properties"),[]);var e=p.a.cloneDeep(this.metaList);if(this.geometry=[],this.properties=[],"Point"===this.layer.type)return this.spaceMetaList=e.filter((function(e){return 1==e.columnDefDire})),void(this.spaceLimit=2);this.spaceMetaList=e.filter((function(e){return 2==e.columnDefDire})),this.spaceLimit=1},_changeValue:function(){Object(r["d"])("conf ".concat(this.datasetSelectedId.toString()," ").concat(this.dataCfg.layerTypeBinding.value," name"),this.layer.name),Object(r["d"])("conf ".concat(this.datasetSelectedId.toString()," ").concat(this.dataCfg.layerTypeBinding.value," type"),this.layer.type)},changeGeometryValue:function(e){Object(r["d"])("conf ".concat(this.datasetSelectedId.toString()," geometry"),e)},changePropertiesValue:function(e){Object(r["d"])("conf ".concat(this.datasetSelectedId.toString()," properties"),e)},_requireFieldsChanged:function(){Object(r["d"])("conf ".concat(this.datasetSelectedId.toString()," requireFields"),this.requireFields)},_elementConfigsEditClosed:function(){this.elementConfigsEditDialogVisible=!1},_updateElementConfigs:function(e){Object(r["d"])("conf ".concat(this.datasetSelectedId.toString()," searchElementConfigs"),e),this.searchElementConfigs=e,this.elementConfigsEditDialogVisible=!1},_addElementConfig:function(){this.elementConfigsEditDialogVisible=!0},_getOperationType:function(e){for(var t=0;t<this.operationTypes.length;t++)if(this.operationTypes[t].code===e)return this.operationTypes[t].description;return null},_updateOrderByConfigs:function(e){Object(r["d"])("conf ".concat(this.datasetSelectedId.toString()," orderByConfigDTO"),e),this.orderByConfigDTO=e,this.$refs.orderByConfig.hide()}}},y=b,v=(a("2177"),a("5d22")),C=Object(v["a"])(y,d,u,!1,null,null,null),x=C.exports,S=a("acde"),D={name:"datasource-dataset",components:{DataBinding:x,showDataDialog:S["a"]},data:function(){return{datasetSelectedIds:[],datasetOptions:[],dialogVisible:!1}},computed:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(l["d"])(["project"])),Object(l["c"])({activeComp:"getFirstActiveComp"})),{},{projectId:function(){return this.project.projectId},dataCfg:function(){return Object(c["a"])(this.activeComp.componentName)},multiDataset:function(){return this.activeComp.data.conf.multiDataset||!1}}),watch:{"activeComp.compId":{handler:function(e,t){this._initData()}}},created:function(){this._initData()},methods:{_onDiaologClosed:function(){this.dialogVisible=!1},_getMetaDataList:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=0;t<this.datasetOptions.length;t++)if(this.datasetOptions[t]["id"]===e)return this.datasetOptions[t]["datasetDetailList"];return[]},_initData:function(){var e=this;this.datasetOptions.length||s["b"]({},this.projectId).then((function(t){console.log("_initData -> res",t),200===t.code?e.datasetOptions=t.data:505===t.code&&(e.datasetOptions=[],e.$message.info("数据集列表为空！"))})),this.datasetSelectedIds=this.activeComp.data.conf.datasetSelectedIds},_onDatasetChanged:function(){var e=_.cloneDeep(this.activeComp.data.conf.dimensionIndicatorRelation);Object(r["d"])("conf",{}),Object(r["d"])("conf dimensionIndicatorRelation",e),Object(r["d"])("conf datasetSelectedIds",this.datasetSelectedIds);for(var t=0;t<this.datasetSelectedIds.length;t++)Object(r["d"])("conf ".concat(this.datasetSelectedIds[t]),{});this.$evtBus.destroy(this.activeComp.compId)},_loadCompData:function(){try{this.$dm.clearErrorMsg(),this.$compsBus.$emit("updateCompData",{compId:this.activeComp.compId,changedLoadedData:this.updateState});var e=this.$dm.getErrorMsg();0!=e.length?this.$alert("加载数据失败。异常信息为"+e,"提示",{confirmButtonText:"确定"}):this.$alert("加载数据成功","提示",{confirmButtonText:"确定"})}catch(t){console.error("error:",t),this.$alert("加载数据失败。异常信息为"+t.message,"提示",{confirmButtonText:"确定"})}},getSelectDataSetName:function(e){for(var t=0;t<this.datasetOptions.length;t++)if(e==this.datasetOptions[t].id)return this.datasetOptions[t].name}}},w=D,k=Object(v["a"])(w,i,n,!1,null,null,null);t["default"]=k.exports},"0f4c":function(e,t,a){"use strict";a.d(t,"e",(function(){return u})),a.d(t,"j",(function(){return m})),a.d(t,"m",(function(){return p})),a.d(t,"h",(function(){return f})),a.d(t,"i",(function(){return h})),a.d(t,"g",(function(){return g})),a.d(t,"c",(function(){return b})),a.d(t,"b",(function(){return y})),a.d(t,"a",(function(){return v})),a.d(t,"l",(function(){return _})),a.d(t,"f",(function(){return C})),a.d(t,"d",(function(){return x})),a.d(t,"k",(function(){return S}));a("445a"),a("a543"),a("68de"),a("402f");var i=a("82ae"),n=a.n(i),o=a("b705"),s=n.a.create({baseURL:"",timeout:6e4,headers:{"Cache-Control":"no-store"}});function l(e){return e.indexOf("?")>0?"&":"?"}s.interceptors.request.use((function(e){return e.url&&"get"==e.method&&(e.url+=l(e.url)+"timestamp="+(new Date).getTime()),e}),(function(e){return Promise.reject(e)})),s.interceptors.response.use((function(e){var t=e.data;switch(t.code){case 500:o["Message"].error(t.message?t.message:"请求服务发生异常！");break;case 200:return Promise.resolve(t);case 401:o["Message"].warning(t.message?t.message:"未登录或者登录状态过期");break;case 403:o["Message"].warning(t.message?t.message:"没有权限！");break;case 505:return Promise.resolve(t);default:o["Message"].warning(t.message?t.message:t.code+" 错误");break}return Promise.reject(e)}),(function(e){if(e&&e.response)switch(e.response.status){case 404:console.error("请求错误，未找到该资源！");break;case 500:console.error("服务端出错！");break;default:console.error("连接错误".concat(e.response.status,"！"))}else console.error("连接到服务器失败或者服务器"+n.a.defaults.timeout/1e3+"秒内没有响应！");return Promise.resolve(e.response)}));var r=s,c=a("0e0b"),d=c["a"].getServelURL(),u=function(){return r.get("".concat(d,"code_table/column_type"))},m=function(){return r.get("".concat(d,"code_table/dataset_operation_types"))},p=function(){return r.get("".concat(d,"code_table/source_type"))},f=function(){return r.get("".concat(d,"dataset/data_source"))},h=function(e){return r.get("".concat(d,"dataset/").concat(e,"/tables"))},g=function(e,t){return r.post("".concat(d,"dataset/").concat(e,"/").concat(t,"/table_columns"))},b=function(e,t){return r.get("".concat(d,"dataset/").concat(e,"/analysis_sql"),{params:t})},y=function(e,t){return r.post("".concat(d,"dataset/_mget?projectId=").concat(t),e)},v=function(e){return r.put("".concat(d,"main_and_subset"),e)},_=function(e){return r.post("".concat(d,"main_and_subset/").concat(e))},C=function(e){return r.get("".concat(d,"dataset/").concat(e,"/dataset_detail"))},x=function(e){return r.get("".concat(d,"code_table/column_bus_type"))},S=function(e){return r.get("".concat(d,"code_table/column_def_dire"))}},2177:function(e,t,a){"use strict";a("6635")},2885:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"savedialog common-dialog edit-element-config",attrs:{"close-on-click-modal":!1,visible:e.visible,"append-to-body":!0,title:"组件数据筛选条件配置",width:"800px","show-close":!1,size:"mini"},on:{"update:visible":function(t){e.visible=t}}},[a("div",{staticClass:"header",staticStyle:{"margin-bottom":"5px","text-align":"right","padding-right":"16px"}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",circle:"",size:"mini"},on:{click:function(t){return t.stopPropagation(),e.addGlobalData(t)}}})],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.globalData,border:""}},[a("el-table-column",{attrs:{prop:"name",label:"条件字段"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{staticStyle:{width:"100%"},attrs:{size:"mini"},model:{value:t.row.columnName,callback:function(a){e.$set(t.row,"columnName",a)},expression:"scope.row.columnName"}},e._l(e.metaList,(function(t){return a("el-option",{key:t.id,attrs:{label:t.columnName,value:t.columnName}},[a("span",[e._v(e._s(t.columnName)+"("+e._s(t.columnDesc)+")")])])})),1)]}}])}),a("el-table-column",{attrs:{prop:"operationType",label:"操作条件",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择条件",size:"mini"},model:{value:t.row.operationType,callback:function(a){e.$set(t.row,"operationType",a)},expression:"scope.row.operationType"}},e._l(e.operationTypes,(function(e){return a("el-option",{key:e.code,attrs:{label:e.description,value:e.code}})})),1)]}}])}),a("el-table-column",{attrs:{prop:"paramsFrom",label:"取值方式",width:"120px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{staticStyle:{width:"100%"},attrs:{size:"mini"},on:{change:function(a){return e._onParamsFromChange(t.row,t.$index)}},model:{value:t.row.paramsFrom,callback:function(a){e.$set(t.row,"paramsFrom",a)},expression:"scope.row.paramsFrom"}},e._l(e.paramsFrom,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)]}}])}),a("el-table-column",{attrs:{label:"值/全局参数"},scopedSlots:e._u([{key:"default",fn:function(t){return[1===t.row.paramsFrom?a("el-input",{attrs:{size:"mini"},model:{value:t.row.value,callback:function(a){e.$set(t.row,"value",a)},expression:"scope.row.value"}}):a("el-select",{staticStyle:{width:"100%"},attrs:{size:"mini"},model:{value:t.row.value,callback:function(a){e.$set(t.row,"value",a)},expression:"scope.row.value"}},e._l(e.globalParamOptions,(function(e){return a("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1)]}}])}),a("el-table-column",{attrs:{prop:"operation",label:"操作",width:"80px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:"",size:"mini"},on:{click:function(a){return a.stopPropagation(),e.delGlobalData(t.$index)}}})]}}])})],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"primary-button",attrs:{type:"primary"},on:{click:e._confirm}},[e._v("确 定")]),a("el-button",{staticClass:"info-button",on:{click:e._onBack}},[e._v("取 消")])],1)],1)},n=[],o=(a("72b3"),a("a543"),a("989e"),a("1d7a"),a("270f"),a("d211")),s=a("9cda"),l=[{label:"自定义",value:1},{label:"全局参数",value:2}],r=l,c=a("cf6b"),d={name:"dataset-global-params-edit",props:{globalParams:{type:Array,default:[]},visible:{type:Boolean,default:!1},metaList:{type:Array,default:[]}},data:function(){return{globalData:[],operationTypes:s["a"],paramsFrom:r}},created:function(){this.globalData=_.cloneDeep(this.globalParams)},methods:{_getValueType:function(e,t){return 1===t?-1!==e.indexOf("${")?3:1:2},_confirm:function(){var e=this,t=[];this.globalData.forEach((function(a){a.value&&a.columnName&&(a.useType=e._getValueType(a.value,a.paramsFrom),t.push(a))})),this.$emit("onSave",t)},_onBack:function(){this.$emit("onBack")},addGlobalData:function(){this.globalData.push({operationType:"eq",paramsFrom:1,value:""})},delGlobalData:function(e){this.globalData.splice(e,1)},getGlobalVal:function(e){for(var t=0;t<this.globalParamOptions.length;t++)if(this.globalParamOptions[t]["name"]===e)return this.globalParamOptions[t]["value"];return""},_onParamsFromChange:function(e,t){e.value=""}},computed:Object(o["a"])(Object(o["a"])({},Object(c["d"])(["window"])),{},{globalParamOptions:function(){return this.window.globalParams}})},u=d,m=(a("9e4c"),a("5d22")),p=Object(m["a"])(u,i,n,!1,null,"23c62e54",null);t["a"]=p.exports},"357f":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"savedialog common-dialog edit-element-config",attrs:{"close-on-click-modal":!1,visible:e.visible,"append-to-body":!0,title:"数据排序配置",width:"800px","show-close":!1,size:"mini"},on:{"update:visible":function(t){e.visible=t}}},[a("div",{staticClass:"header",staticStyle:{"margin-bottom":"5px","text-align":"right","padding-right":"16px"}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",circle:"",size:"mini"},on:{click:function(t){return t.stopPropagation(),e.addOrderByData(t)}}})],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.orderByData,border:""}},[a("el-table-column",{attrs:{prop:"name",label:"排序字段"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{staticStyle:{width:"100%"},attrs:{size:"mini"},model:{value:t.row.bindMapperColumn,callback:function(a){e.$set(t.row,"bindMapperColumn",a)},expression:"scope.row.bindMapperColumn"}},e._l(e.metaList,(function(t){return a("el-option",{key:t.id,attrs:{label:t.columnName,value:t.columnName}},[a("span",[e._v(e._s(t.columnName)+"("+e._s(t.columnDesc)+")")])])})),1)]}}])}),a("el-table-column",{attrs:{prop:"orderByType",label:"排序方式"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择排序方式",size:"mini"},model:{value:t.row.orderByType,callback:function(a){e.$set(t.row,"orderByType",a)},expression:"scope.row.orderByType"}},e._l(e.orderByTypes,(function(e){return a("el-option",{key:e.code,attrs:{label:e.description,value:e.code}})})),1)]}}])}),a("el-table-column",{attrs:{prop:"operation",label:"操作",width:"120px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:"",size:"mini"},on:{click:function(a){return a.stopPropagation(),e.delOrderByData(t.$index)}}})]}}])})],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"primary-button",attrs:{type:"primary"},on:{click:e._confirm}},[e._v("确 定")]),a("el-button",{staticClass:"info-button",on:{click:e.hide}},[e._v("取 消")])],1)],1)},n=[],o=(a("cb3c"),a("989e"),{name:"dataset-orderby-params-edit",props:{globalParams:{type:Array,default:[]},metaList:{type:Array,default:[]}},data:function(){return{visible:!1,orderByData:[],orderByTypes:[{code:"asc",description:"正序"},{code:"desc",description:"倒序"}]}},created:function(){this.orderByData=_.cloneDeep(this.globalParams)},methods:{_confirm:function(){var e=this.orderByData.filter((function(e){return""!==e.bindMapperColumn}));this.$emit("onSave",e)},hide:function(){this.visible=!1},addOrderByData:function(){this.orderByData.push({orderByType:"asc",bindMapperColumn:""})},delOrderByData:function(e){this.orderByData.splice(e,1)},show:function(){this.visible=!0}}}),s=o,l=(a("fe3e9"),a("5d22")),r=Object(l["a"])(s,i,n,!1,null,"1471efde",null);t["a"]=r.exports},"44ac":function(e,t,a){},6635:function(e,t,a){},"6ba5":function(e,t,a){},"9cda":function(e,t,a){"use strict";var i=[{code:"gt",name:">",description:"大于"},{code:"lt",name:"<",description:"小于"},{code:"eq",name:"=",description:"等于"},{code:"ne",name:"<>",description:"不等于"},{code:"gte",name:">=",description:"大于等于"},{code:"lte",name:"<=",description:"小于等于"},{code:"like",name:"like",description:"模糊查询"},{code:"likeLeft",name:"likeLeft",description:"左模糊查询"},{code:"likeRight",name:"likeRight",description:"右模糊查询"}];t["a"]=i},"9e4c":function(e,t,a){"use strict";a("44ac")},acde:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"查看数据",visible:e.visible,"modal-append-to-body":!1,"before-close":e.handleClose},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",[a("el-form-item",[a("el-input",{staticStyle:{width:"100%"},attrs:{type:"textarea",value:e.compData,rows:15,disabled:!0}})],1),a("el-form-item",{staticStyle:{"text-align":"right","margin-bottom":"0"}},[a("el-button",{on:{click:function(t){return e.handleClose()}}},[e._v("关 闭")])],1)],1)],1)},n=[],o=a("d211"),s=a("cf6b"),l={name:"show-data-dialog",props:{visible:{type:Boolean,default:!1}},data:function(){return{compData:null}},created:function(){var e=this;this.$dm.parseData(this.activeComp,"").then((function(t){200===t[0].code&&(e.compData=JSON.stringify(t[0].data.dataValues,null,4))}))},methods:{handleClose:function(){this.$emit("back")}},computed:Object(o["a"])({},Object(s["c"])({activeComp:"getFirstActiveComp"})),mounted:function(){}},r=l,c=a("5d22"),d=Object(c["a"])(r,i,n,!1,null,null,null);t["a"]=d.exports},fe3e9:function(e,t,a){"use strict";a("6ba5")}}]);