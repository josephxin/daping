(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0dd44b"],{8151:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div")},i=[],o=(a("a543"),a("1d7a"),a("0bd5"),a("79a8"),a("6a61"),a("2e91")),s=a("b897"),r={name:"trackLineMap",mixins:[s["a"]],data:function(){return{data:[],layerObj:null,gisData:[],defaultParams:null}},methods:{styleConfChanged:function(){this.notifyBase()},convertChartData:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n,i,o,s,r,c,d,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if("dataset"!==t.compConf.data.datasource.type){a.next=5;break}for(n=t._convertDatasetToGeoJson(e),i=0;i<n.length;i++){for(o=!1,s=0;s<t.data.length;s++)t.data[s].name===n[i].name&&(t.data[s]=n[i],o=!0);o||t.data.push(n[i])}a.next=21;break;case 5:if("gisServer"!==t.compConf.data.datasource.type){a.next=11;break}return a.next=8,t.loadGisServer("Point");case 8:t.data=a.sent,a.next=21;break;case 11:if("gisSet"!==t.compConf.data.datasource.type){a.next=20;break}if(r=_.cloneDeep(t.compConf.data.conf.sevLayer),!(r&&r.layerObj&&r.layerObj.length>0)){a.next=17;break}return a.next=16,t.loadGisServer("Point");case 16:t.gisData=a.sent;case 17:t.dataConf.datasetSelectedIds.length>0&&t.dataConf[t.dataConf.datasetSelectedIds[0]]&&(c=t.dataConf[t.dataConf.datasetSelectedIds[0]].properties,d=t.dataConf[t.dataConf.datasetSelectedIds[0]].refGisField,l=t.dataConf[t.dataConf.datasetSelectedIds[0]].refSetField,c&&c.length>0&&d&&l&&(-1===c.indexOf(l)&&t.$message({type:"error",message:"数据集中不包含关联字段，请重新选择"}),t.data=t.relDataToSet(e,c,d,l))),a.next=21;break;case 20:t.data=e;case 21:t.notifyBase();case 22:case"end":return a.stop()}}),a)})))()},notifyBase:function(){this.gisBase&&(this.layerObj=this.gisBase.addProLayer(this.data,"track",this.compConf.style),this.layerObj?this.$emit("updateProLayer",{id:this.compConf.compId,layerObj:this.layerObj}):this.$emit("clearProLayer",{id:this.compConf.compId}))},linkageConfChanged:function(){if(this.compConf.linkage&&this.compConf.linkage.linkRevEvents)for(var e=this.compConf.linkage.linkRevEvents,t=0;t<e.length;t++){var a=e[t],n=a.evtName.split(":")[1];"click"===n&&this._clickByLinkAge(a)}},toggleShow:function(e,t){this.layerObj&&(e&&t?this.$emit("updateProLayer",{id:this.compConf.compId,layerObj:this.layerObj}):e&&!t&&this.$emit("clearProLayer",{id:this.compConf.compId}))},_clickByLinkAge:function(e){var t=this;this.$evtBus.on(e,(function(e){t.toggleShow(e.ctrlShow,e.switchVisible&&e.switchVisible[t.compConf.compId]&&e.switchVisible.hasOwnProperty(t.compConf.compId))}))}}},c=r,d=a("5d22"),l=Object(d["a"])(c,n,i,!1,null,null,null);t["default"]=l.exports}}]);