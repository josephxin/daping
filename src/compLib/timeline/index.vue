<template>
    <div class="timeaxis-comp" :style="style">
        <ul class="time-group">
          <li :style = "itemStyle(index)" v-for="(item,index) in axisData" :key="index" @click.stop="_axisClick(index)">
            <span>{{item.showValue}}</span>
          </li>
        </ul>
    </div>
</template>
<script>
/**
 * 时间轴要求
 * 1.可展示时间点，时间区间数据
 * 2.如果是时间点 则需配置取时间范围的条件 如 前7天+后7天
 * 3.可配置输入 输出以及tooltip的时间格式
 */
import AbstractComp from "../commons/AbstractComp";
import dayjs from "dayjs"
// 非标准时间需传入第二个参数指定时间格式
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
export default {
    name : 'timeline',
    mixins: [AbstractComp],
    data(){
        return {
            axisData : [], // 时间轴展示的数据
            selectIndex : [], // 已选中的数据
        }
    },
    computed: {
        style(){
            return {
                width: this.compConf.box.width + "px",
                height: this.compConf.box.height + "px",
                background: this.styleConf.bgColor,
            };
        },
        compStyle(){
          return this.compConf.style
        }
    },
    methods : {
        itemStyle(index){
          let status = this.selectIndex.includes(index) ? 'active' : 'default'
          return {
            lineHeight : this.compStyle.base.height + 'px',
            padding : _.cloneDeep(this.compStyle.base.padding).split(",").map(item => {return parseFloat(item) +'px'}).join(" "),
            margin : _.cloneDeep(this.compStyle.base.margin).split(",").map(item => {return parseFloat(item) +'px'}).join(" "),
            fontWeight : this.compStyle.base.fontWeight,
            fontSize : this.compStyle[status].fontSize + 'px',
            color : this.compStyle[status].fontColor,
            backgroundColor : this.compStyle[status].backgroundColor
          }
        },
        styleConfChanged(){
            this.updateChartData()
        },
        updateChartData(){
          this.axisData = _.cloneDeep(this.convertChartData(this.compData))
        },
        convertChartData(data){
          if (this.compConf.data.datasource.type === 'static') return this._covertAxisData(data)
          return this._covertAxisData(data[0])
        },
        // 数据转换
        _covertAxisData(data){
          let axisData = []
          if(data && data.length){
             data.forEach(item => {
               let value = item[this.compStyle.data.in.key]
               if(value){
                 if(typeof value === 'number') value = value.toString()
                //  let o = Object.assign({sourceValue : value, showValue : dayjs(value,this.compStyle.data.in.format).format(this.compStyle.data.show.format)}, item);
                 axisData.push({
                   sourceValue : value,
                   showValue : dayjs(value,this.compStyle.data.in.format).format(this.compStyle.data.show.format),
                   oriValue : item
                 })
               }
             })
          }
          return axisData
        },
        _axisClick(index){
          let outputType = this.compStyle.data.out.type
          switch(outputType){
            // 输出为时间点
            case "dot" :
              if(this.selectIndex.includes(index)) return
              this.selectIndex = [index]
            break;
            // 输出为时间点集合
            case "dotArr" :
              if(this.selectIndex.includes(index)){
                this.selectIndex = this.selectIndex.filter(item => {return item !== index})
              }else{
                this.selectIndex.push(index)
              }
            break;
            case "range" :
              // 输出为时间范围
              if(this.selectIndex.includes(index)){
                this.selectIndex = this.selectIndex.filter(item => {return item !== index})
              }else{
                if(this.selectIndex.length >= 2) return
                this.selectIndex.push(index)
              }
            break;
            default : 
            break
          }
          this.loadLinkage(index)
        },
        _getIndexByVal(val){
          for(let i=0;i<this.axisData.length;i++){
            if(val === this.axisData[i]['sourceValue']) return i
          }
          return 0
        },
        // 原始数据输出
        _outPutOriginData(data){
          data = _.cloneDeep(data)
          let oriData = data.oriValue
          delete(data.oriValue)
          return Object.assign(oriData,data)
        },
        // 格式化输出值(点数据)
        _formatOutData(){
          let index = this.selectIndex[0]
          let source = this.axisData[index]
          let outputConfig = this.compStyle.data.out.format
          if(!outputConfig || !outputConfig.length) return this._outPutOriginData(source)
          let temp = {}
          outputConfig.forEach(item => {
            if(item.key){
              let value = source.sourceValue
              if(typeof value === 'number') value = value.toString()
              let sourceValue = item.format ?  dayjs(value,this.compStyle.data.in.format).format(item.format) : value
              let showValue = (item.showFormat || item.format) ? dayjs(value,this.compStyle.data.in.format).format(item.showFormat ? item.showFormat : item.format) : value
              let o = Object.assign(source.oriValue,{sourceValue,showValue})
              temp[item.key] = o
            }
          })
          return _.isEmpty(temp) ? this._outPutOriginData(source) : temp
        },
        // 事件交互传递数据
        loadLinkage(index) {
          if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
              let evtList = this.compConf.linkage.linkEvents;
              for (let i = 0; i < evtList.length; i++) {
                  let evtObj = evtList[i];
                  if (evtObj.evtType === 'click' && evtObj.explosive) {
                      let transData = this._formatOutData(index)
                      let eventObj = {
                          data: transData,
                      };
                      this.$evtBus.emit(evtObj.evtName, eventObj);
                  }
              }
          }
      },
        linkageConfChanged() {
          if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
              let evtList = this.compConf.linkage.linkEvents;
              for (let i = 0; i < evtList.length; i++) {
                  let evtObj = evtList[i];
                  if (evtObj.evtType === 'click'
                      && evtObj.explosive
                      && evtObj.def.defTrigger
                      && this.$store.getters.getPreviewState
                  ) {
                      if(evtObj.def.defType === 'index'){
                        this._axisClick(evtObj.def.defVal)
                      }else if(evtObj.def.defType === 'val'){
                        this._axisClick(this._getIndexByVal(evtObj.def.defVal))
                      }
                      
                  }
              }
          }
      },
    }
}
</script>
<style lang="stylus" scoped>
    ul,li
        list-style-type none
    .timeaxis-comp
        .time-group
            overflow-y auto
            height 100%
            &:after
                content ''
                clear both
            li
                float left
                padding  0 5px
                margin 0  5px
                cursor pointer
                background-color #1E325D
                color #E7E9EE
                line-height 26px
</style>