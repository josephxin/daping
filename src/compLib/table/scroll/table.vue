<template>
    <div class="scroll-table-box">
        <div class="header" v-show= "compConf.style.showHeader && !compConf.style.ranksChange">
            <ul class='header-item' :style = "paddingLR">
                <li v-show = "compConf.style.showIndex" :style="headerStyle"><span>序号</span></li>
                <li v-for="(item,index) in tableHeaderData" :key="index" :style="headerStyle">
                    <span>{{item}}</span>
                </li>
            </ul>
        </div>
        <div class="rank-box">
            <div class="rank-column" v-if = "compConf.style.ranksChange && compConf.style.showHeader">
                <ul>
                    <li v-for="(item,index) in tableListData" :key="index" :style="listStyle(index)">
                        <span>{{item[0]}}</span>
                    </li>
                </ul>
            </div>
            <scroll-table :data="tableListData" :class-option="options" class="table-wrap" :style = "tableStyle">
                <ul class="item">
                    <li v-for="(item,index) in tableListData" :key="index" :style="listStyle(index)">
                        <span v-show = "compConf.style.showIndex">{{index + 1}}</span>
                        <template v-if="compConf.style.ranksChange">
                            <span v-for="(d,i) in item" :key="i" v-if = "i > 0">{{d}}</span>
                        </template>
                        <template v-else>
                            <span v-for="(d,i) in tableHeaderData" :key="i">{{item[d]}}</span>
                        </template>
                    </li>
                </ul>
            </scroll-table>
        </div>
    </div>
</template>
<script>
/**
 * 需求：
 * 1.行列转换
 * 2.支持根据条件设置某一格的属性
 * 3.支持设置列样式
 * 4.支持设置列内容（图标，序号和图片等）
 */
import scrollTable from '@/components/custom/ScrollTable'
import AbstractComp from '@/compLib/commons/AbstractComp.js'
import _ from "lodash"
export default {
    name : 'comp-table',
    created(){
        this._initData()
    },
    data(){
        return {
            tableHeaderData : [], // 表头数据
            tableListData : [] //表格数据
        }
    },
    components : {scrollTable},
    mixins : [AbstractComp],
    computed : {
        options () {
            let op = {
                hoverStop: false,
                step : 1,
                autoPlay : this.compConf.style.autoPlay,
                direction : this.compConf.style.ranksChange ? 2 : 1,
                limitMoveNum: this.compConf.style.ranksChange ? 2 : 0,
            }
            if(this.compConf.style.wait){
                op.singleHeight = this.compConf.style.listHeight
                op.waitTime = this.compConf.style.waitTime
            }
            return op
        },
        tableStyle(){
            return {
                width : this.compConf.box.width + 'px',
                height : (this.compConf.box.height - this.compConf.style.headerHeight) + 'px'
            }
        },
        headerStyle(){
            return {
                height : this.compConf.style.headerHeight + 'px',
                lineHeight :this.compConf.style.headerHeight + 'px',
                fontSize : this.compConf.style.headerFontSize + 'px',
                color : this.compConf.style.headerFontColor,
                fontWeight : this.compConf.style.headerFontWeight
            }
        },
        paddingLR(){
            return {
                paddingLeft : this.compConf.style.leftPadding + 'px',
                paddingRight : this.compConf.style.rightPadding + 'px',
                backgroundColor : this.compConf.style.headerBgColor,
            }
        }
    },
    methods : {
        resize(){

        },
        listStyle(index){
            let bgColor = this.compConf.style.bgColor
            let fontSize = this.compConf.style.fontSize
            let fontColor = this.compConf.style.fontColor
            let bgColors = this.compConf.style.bgColors
            if(bgColors.length){
                let dataIndex = index % bgColors.length
                fontSize = bgColors[dataIndex]['fontSize']
                fontColor = bgColors[dataIndex]['fontColor'],
                bgColor = bgColors[dataIndex]['bgColor']
            }
            return {
                paddingLeft : this.compConf.style.leftPadding + 'px',
                paddingTop : this.compConf.style.topPadding + 'px',
                paddingRight : this.compConf.style.rightPadding + 'px',
                paddingBottom : this.compConf.style.bottomPadding + 'px',
                marginBottom : this.compConf.style.marginBottom + 'px',
                height : this.compConf.style.listHeight + 'px',
                lineHeight :this.compConf.style.listHeight + 'px',
                fontSize : fontSize + 'px',
                color : fontColor,
                backgroundColor : bgColor
            }
        },
        _initData(data,selectColumn,datasetMeta){
            if(!data || !data[0]) return
            if(this.compConf.style.ranksChange){
                this._execRanksChange(data,selectColumn,datasetMeta)
                return
            }
            this.tableListData = data
            this.tableHeaderData = selectColumn
        },
        _convertChartData(){

        },
        // 更新数据
        updateChartData(){
            console.log(this.compConf)
            let dataSourceType = this.dataSourceConf.type
            let selectColumn = []
            let datasetMeta = []
            if(this.dataSourceConf.type === 'static'){
                datasetMeta = _.cloneDeep(this.compConf.data.conf.datasetMeta)
                selectColumn = datasetMeta.map(item => {return item.columnName})
                this._initData(_.cloneDeep(this.compData),selectColumn,datasetMeta)
            }else{
                if(this.dataConf.datasetSelectedIds && this.dataConf.datasetSelectedIds[0]){
                    this.tableHeaderData = _.cloneDeep(this.dataConf[this.dataConf.datasetSelectedIds[0]]['xAxisIds'])
                    this.tableListData = _.cloneDeep(this.compData[0])
                    this._initData(_.cloneDeep(this.compData[0]),this.dataConf[this.dataConf.datasetSelectedIds[0]]['xAxisIds'],this.dataConf[this.dataConf.datasetSelectedIds[0]]['datasetMeta'])
                }
            }
        },
        // 执行行列转换
        _execRanksChange(data,selectColumn,datasetMeta){
            let tempData = {}
            selectColumn.forEach(item => tempData[item] = [])
            data.forEach(item => {
                for(let k in item){
                    tempData[k].push(item[k])
                }
            })
            let format = []
            selectColumn.forEach((item,i) => {
                format[i] = [item].concat(tempData[item])
            })
            this.tableListData = format

        },
        styleConfChanged(){
            this.updateChartData()
        }
    },
    mounted(){
        this.updateChartData()
    }
}
</script>
<style lang="stylus" scoped>
ul,li
    list-style-type none
.table-wrap
    box-sizing border-box
    overflow hidden
    ul
        li
            display flex
            justify-content space-between
            overflow hidden
            background-color #fff
            span
                flex 1
                text-align center
.scroll-table-box
    .rank-box
        display flex
        .rank-column
            width 80px
    .header
        ul
            display flex
            li
                text-align center
                flex 1
                overflow hidden
                text-overflow ellipsis
                -o-text-overflow ellipsis
                white-space nowrap
</style>
