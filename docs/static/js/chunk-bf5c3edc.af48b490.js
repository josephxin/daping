(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bf5c3edc"],{8158:function(t,e,i){"use strict";i.r(e);i("72b3"),i("6540"),i("1d7a"),i("0cd9"),i("0bd5"),i("79a8"),i("270f");var n,o,a=i("28f8"),s=i("b1e5"),r={name:"tackBar",mixins:[s["a"]],data:function(){return{nextIndex:0}},methods:{createMarkConfig:function(t){var e=[],i={max:"最大值",min:"最小值",average:"平均值",median:"中位数"};return t.forEach((function(t){e.push({type:t,name:i[t]?i[t]:""})})),e},createMultipleY:function(t,e){var i=_.cloneDeep(t.yAxis[0]),n=[];return e.multipleY.configs.length?(e.multipleY.configs.forEach((function(e,o){var a=_.cloneDeep(i);a.name=e.isUnit?e.unitName:"",a.nameLocation=e.nameLocation,a.nameGap=e.nameGap,a.nameTextStyle={fontFamily:e.unitFontFamily,fontSize:e.unitFontSize,color:e.unitFontColor,padding:_.cloneDeep(e.namePadding).split(",").map((function(t){return parseInt(t)}))},a.axisLabel.formatter=function(t,i){return t+e.labelFormatUnit},a.axisLabel.rotate=parseInt(e.wordDirection),a.position=e.position,a.offset=e.offset,t.dataset.dimensions.length>2&&(a.yAxisIndex=o),n.push(a)})),n):[i]},option:function(){var t=this.styleConf;t=this.convertExpression(t);var e=this.chartData;if(!e||!e.dimensions)return{};for(var i=e.dimensions,n=e.dataSource,o=[],a=[],s=0;s<i.length-1;s++){var r=t.type,l={type:t.series[s]?t.series[s].type:r,stack:1,seriesLayoutBy:t.seriesLayoutBy,barWidth:t.barWidth,name:i[s+1],itemStyle:{}};a.push({name:l.name,icon:t.legend.icon}),t.series[s]&&(t.series[s].barRadius&&(l.itemStyle.barBorderRadius=_.cloneDeep(t.series[s].barRadius).split(",").map((function(t){return parseInt(t)})),l.yAxisIndex=t.series[s].yAxisIndex),t.series[s].lengendIcon&&(a[s].icon=t.series[s].lengendIcon)),o.push(l)}var c=t.colors.length?t.colors:this.defaultColors,d={color:c,title:{show:t.title.isShow,text:t.title.title,textStyle:{color:t.title.textStyleColor,fontStyle:t.title.textStyleFontStyle,fontWeight:t.title.textStyleFontWeight,fontFamily:t.title.textStyleFontFamily,fontSize:t.title.textStyleFontSize},left:t.title.left,top:t.title.top,right:t.title.right,bottom:t.title.bottom},backgroundColor:t.backgroundColor,itemStyle:{barBorderRadius:t.barBorderRadius?_.cloneDeep(t.barBorderRadius).split(",").map((function(t){return parseInt(t)})):[0]},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:t.categoryX?"category":"value",show:t.x.isShow,position:t.x.position,axisLine:{symbol:["none",t.x.styleArrow],show:t.x.showLine,lineStyle:{color:t.x.styleColor,width:t.x.styleBold}},name:t.x.isUnit?t.x.unitName:"",nameTextStyle:{fontFamily:t.x.unitFontFamily,fontSize:t.x.unitFontSize,color:t.x.unitFontColor},axisLabel:{show:t.x.isAxisLabel,color:t.x.labelColor,fontSize:t.x.labelSize,rotate:t.x.wordDirection,margin:t.x.labelMargin,fontFamily:t.x.fontFamily},axisTick:{show:t.x.axisTick,length:t.x.axisTickLehgth,inside:t.x.axisTickInside,alignWithLabel:t.x.alignWithLabel,lineStyle:{color:t.x.tickColor,width:t.x.tickWidth,type:t.x.tickStyle,opacity:t.x.tickOpacity}},splitLine:{show:t.x.isGrid,lineStyle:{color:t.x.gridColor,width:t.x.gridBold,opacity:t.x.gridOpaque,type:t.x.splitLineType}}},yAxis:[{type:t.categoryX?"value":"category",show:t.y.isShow,position:t.y.position,offset:t.y.offset,axisLine:{symbol:t.y.styleArrow,show:t.y.showLine,lineStyle:{color:t.y.styleColor,width:t.y.styleBold}},axisLabel:{show:t.y.isAxisLabel,color:t.y.labelColor,fontSize:t.y.labelSize,rotate:t.y.wordDirection,margin:t.y.labelMargin,fontFamily:t.y.fontFamily,formatter:function(e,i){return 0==e?e:e+t.y.labelFormatUnit}},axisTick:{show:t.y.axisTick,length:t.y.axisTickLehgth,inside:t.y.axisTickInside,lineStyle:{color:t.y.tickColor,width:t.y.tickWidth,type:t.y.tickStyle,opacity:t.y.tickOpacity}},splitLine:{show:t.y.isGrid,lineStyle:{color:t.y.gridColor,width:t.y.gridBold,opacity:t.y.gridOpaque,type:t.y.splitLineType}}}],legend:{show:t.legend.isShow,type:t.legend.type,width:t.legend.width,itemWidth:t.legend.iconWidth,icon:t.legend.icon,itemHeight:t.legend.iconHeight,itemGap:t.legend.itemGap,textStyle:{color:t.legend.fontColor,fontSize:t.legend.fontSize,fontWeight:t.legend.fontBold,fontFamily:t.legend.fontFamily,padding:_.cloneDeep(t.legend.padding).split(",").map((function(t){return parseInt(t)}))},formatter:function(t){return t},left:t.legend.position.split("-")[0],top:t.legend.position.split("-")[1],orient:t.legend.layout,data:a},dataset:{dimensions:i,source:n},grid:{x:parseInt(t.leftPadding),y:parseInt(t.topPadding),x2:parseInt(t.rightPadding),y2:parseInt(t.bottomPadding)},series:o};return t.dataZoomShow&&(d.dataZoom=[{type:"slider",show:!0,start:30,end:50,orient:t.categoryX?"horizontal":"vertical"},{type:"inside",start:30,end:50,orient:t.categoryX?"horizontal":"vertical"}]),t.y.isUnit&&d.yAxis.forEach((function(e){e.name=t.y.unitName,e.nameLocation=t.y.nameLocation,e.nameGap=t.y.nameGap,e.nameTextStyle={fontFamily:t.y.unitFontFamily,fontSize:t.y.unitFontSize,color:t.y.unitFontColor,padding:_.cloneDeep(t.y.namePadding).split(",").map((function(t){return parseInt(t)}))}})),t.multipleY.show&&(d.yAxis=this.createMultipleY(d,t)),d},carouselExe:function(t){var e=this.option();e.series.map((function(i,n){e.series[n].animation=n==t})),this.myChart.hideLoading(),this.myChart.clear(),this.myChart.setOption(e,!0)},next:function(){return this.nextIndex>=this.chartData.dimensions.length-1?-1:(this.compConf.linkage.cycleEvents.refEvt==="".concat(this.compConf.compId,":click")&&this.loadLinkage(this.nextIndex),this.carouselExe(this.nextIndex),this.nextIndex++,this.nextIndex>=this.chartData.dimensions.length-1?-1:this.nextIndex)},reset:function(){return this.nextIndex=0,this.carouselExe(-1),this.nextIndex},_click:function(t){this.loadLinkage(t.dataIndex)},loadLinkage:function(t){if(this.compConf.linkage&&this.compConf.linkage.linkEvents)for(var e=this.compConf.linkage.linkEvents,i=0;i<e.length;i++){var n=e[i];if("click"===n.evtType&&n.explosive){var o=this.chartData.dataSource[t];o=this._convertEventOutData(o,this.compConf.data);var a={data:o};this.$evtBus.emit(n.evtName,a)}}},_clickByLinkAge:function(t){var e=this;this.$evtBus.on(t,(function(t){e._toggleCompShow(t.ctrlShow,t.switchVisible&&t.switchVisible[e.compConf.compId],e.compConf.compId);var i=[];t.refData.forEach((function(e){var n=e.cond,o=e.to.split("$")[1],a=t.data[e.from.split("$")[1]];i.push({operationType:n,bindMapperColumn:o,value:a})}));var n={target:t.target,source:t.source,name:t.name,data:i,sourceData:t.data},o={};o[e.compConf.compId]=Object(a["a"])({},"".concat(t.name),n),e.$store.commit("setLinkage",o),e.updateCompData(!1)}))},linkageConfChanged:function(t){if(this.compConf.linkage){if(this.compConf.linkage.linkRevEvents)for(var e=this.compConf.linkage.linkRevEvents,i=0;i<e.length;i++){var n=e[i],o=n.evtName.split(":")[1];"click"===o&&this._clickByLinkAge(n)}var a=this.compConf.linkage.cycleEvents;if(a&&a.hasOwnProperty("sid")){var s=_.cloneDeep(a);s.next=this.next,s.reset=this.reset,this.$evtBus.registerCycle(s)}}}}},l=r,c=i("5d22"),d=Object(c["a"])(l,n,o,!1,null,null,null);e["default"]=d.exports},b1e5:function(t,e,i){"use strict";i("72b3"),i("c726"),i("270f");var n=i("c2d4"),o=i("ee5d");e["a"]={name:"AbstractEchartBarComp",mixins:[n["a"]],methods:{convertChartData:function(t){if(["flexibleBar","singleIndiBar","pictorialBar","timelineBar","stackXBar","stackYBar","multiYBar","flexibleLine","singleIndiLine","areaLine","timeLineLine","multiYLine","stackAreaLine","normalLineBar","multiYLineBar","timeLineMixinLineBar","normalScatter","singleScatter"].includes(this.compConf.componentName)){if("static"===this.compConf.data.datasource.type){var e=this.compConf.data.conf.datasetMeta,i=[],n=[];return e.forEach((function(t){1==t.columnDefDire?i.push(t.columnName):n.push(t.columnName)})),Object(o["f"])(t,{datasetMeta:e,xAxisIds:i,yAxisIds:n})}if(!t||!t[0])return;return Object(o["f"])(t[0],this.dataConf[this.dataConf.datasetSelectedIds[0]])}return["annularpie","liquidFill","scaledashboard"].includes(this.compConf.componentName)?t:Object(o["a"])(t,this.dataConf)}}}},c2d4:function(t,e,i){"use strict";i("1d7a"),i("ee5d");var n=i("7031"),o=i("4d28"),a=i.n(o);e["a"]={name:"AbstractEchartComp",mixins:[n["a"]],data:function(){return{myChart:null}},methods:{draw:function(){this.myChart=a.a.init(document.getElementById(this.compConf.compId)),this.myChart.hideLoading(),this.myChart.setOption(this.option()),this.myChart.on("click",this._click),this.myChart.on("globalout",this._globalout)},resize:function(){this.myChart.resize()},_click:function(t){},_globalout:function(t){},_getDataTypeValue:function(t,e){if(e)return"classify"==e?t.name:"legend"==e?t.seriesName:"value"==e?t.value:void 0},styleConfChanged:function(){this.updateMyChart()},compDataChanged:function(){this.updateMyChart()},updateMyChart:function(){this.myChart&&this.myChart.hideLoading(),this.myChart&&this.myChart.clear(),this.myChart&&this.myChart.setOption(this.option())},option:function(){return{}}}}}}]);