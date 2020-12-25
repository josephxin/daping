<template>
    <div class="table-box" :style="boxStyle">
        <div class='container' :style="containerStyle">
        <template v-if = "compConf.style.ranksChange">
            <div class="rank-box">
                <div class="column-box" v-show="compConf.style.showHeader">
                    <table>
                        <tbody>
                            <tr v-show="compConf.style.showIndex">
                                <td :style="headerStyle">序号</td>
                            </tr>
                            <tr v-for="(item,index) in bodyData" :key="index">
                                <td :style="headerStyle">{{columnDescObject[item[0]] ? columnDescObject[item[0]]['columnDesc'] ? columnDescObject[item[0]]['columnDesc']  : item[0] :item[0]}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="data-box" :style="dataBoxStyle">
                    <table>
                        <tbody>
                            <tr v-show = "compConf.style.showIndex">
                                <td v-for="(d,i) in ranksDataLength" :key="i" :style="listStyle(0)">{{d}}</td>
                            </tr>
                            <tr v-for="(item,index) in bodyData" :key="index">
                                <td v-for="(d,i) in item" :key="i" v-if = "i > 0" :style="listStyle(index)"  @click="_cellClick(item,i)">{{d}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
        <template v-else>
            <table class="common-table">
                <thead v-show="compConf.style.showHeader">
                    <tr>
                        <td :style="headerStyle" v-show = "compConf.style.showIndex">序号</td>
                        <td :style="headerStyle" v-for="(item,index) in headerData" :key="index">{{columnDescObject[item] ? columnDescObject[item]['columnDesc'] ? columnDescObject[item]['columnDesc']  : item :item}}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in bodyData" :key="index" @click="_cellClick(item)">
                        <td :style="listStyle(index)" v-show = "compConf.style.showIndex">{{index + 1}}</td>
                        <td :style="listStyle(index)" v-for="(d,i) in headerData" :key="i">{{item[d]}}</td>
                    </tr>
                </tbody>
                
            </table>
        </template>
        </div>
        <div class="pagation-box" style='text-align:center;padding-top:5px'>
            <el-pagination v-if="compConfStyle.pagation && compConfStyle.pagation.show" background small layout="prev, pager, next" :current-page = "currentPage" :total="total" :page-size = "compConfStyle.pagation.pageSize" @current-change = "_oncurrentPageChange"></el-pagination>
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
import AbstractComp from '@/compLib/commons/AbstractComp.js'
import _ from "lodash"
export default {
    name : 'comp-common-table',
    created(){
        this._initData()
    },
    data(){
        return {
            headerData : [],//thead数据
            bodyData  : [],//tbody数据
            currentPage : 1,//当前的页码
            columnDescObject : {},//以columnName 为key的元数据
        }
    },
    mixins : [AbstractComp],
    computed : {
        containerStyle(){
            let h = this.compConf.box.height
            // if(this.compConfStyle.showHeader && !this.compConfStyle.ranksChange){
            //     h-= this.compConfStyle.headerHeight
            // }
            if(this.compConfStyle.pagation && this.compConfStyle.pagation.show){
                h-= 36
            }
            return {
                width : this.compConf.box.width + 'px',
                height :  h + 'px'
            }
        },
        boxStyle(){
            return {
                width : this.compConf.box.width + 'px',
                height : this.compConf.box.height + 'px',

            }
        },
        headerStyle(){
            return {
                height : this.compConf.style.ranksChange ? this.compConf.style.listHeight + 'px' : this.compConf.style.headerHeight + 'px',
                lineHeight : this.compConf.style.ranksChange ? this.compConf.style.listHeight + 'px' : this.compConf.style.headerHeight + 'px',
                fontSize : this.compConf.style.headerFontSize + 'px',
                color : this.compConf.style.headerFontColor,
                fontWeight : this.compConf.style.headerFontWeight,
                backgroundColor : this.compConf.style.headerBgColor,
                border : this.compConf.style.border.show ? `${this.compConf.style.border.width}px ${this.compConf.style.border.style} ${this.compConf.style.border.color}` : 0,
                overflow : "hidden",
                whiteSpace : 'nowrap',
                textOverflow : 'ellipsis',
                padding : `${this.compConf.style.topPadding}px ${this.compConf.style.rightPadding}px ${this.compConf.style.bottomPadding}px ${this.compConf.style.leftPadding}px`,
            }
        },
        paddingLR(){
            return {
                paddingLeft : this.compConf.style.leftPadding + 'px',
                paddingRight : this.compConf.style.rightPadding + 'px',
                backgroundColor : this.compConf.style.headerBgColor,
            }
        },
        dataBoxStyle(){
            let w = this.compConf.showHeader ? this.compConf.box.width - 80 + 'px' : this.compConf.box.width + 'px'
            return {
                width : w,
                overflowY : 'auto'
            }
        },
        compConfStyle(){
            return this.compConf.style
        },
        total(){
            return this.dataSourceConf.type === 'static' ? this.compData.length : this.compData[0].length
        },
        ranksDataLength(){
            return this.bodyData.length ? this.bodyData[0].length -1 :0
        }
    },
    methods : {
        resize(){

        },
        // 点击事件处理 针对行列转换 提供不同的处理方式
        _cellClick(data,index){
            if(this.compConf.style.ranksChange){
                let formatData = {}
                // 行列转换的数据的处理
                this.bodyData.forEach(item => {
                    formatData[item[0]] = item[index]
                })
                data = _.cloneDeep(formatData)
            }
            // 非行列转换的数据的处理
            let transData = {}
            for(let i in data){
                transData[i] = data[i]
                if(this.columnDescObject[i] && this.columnDescObject[i]['columnDesc']) transData[this.columnDescObject[i]['columnDesc']] = data[i]
            }
            this.loadLinkage(transData)
        },
        // 点击后传出数据供其它组件使用
        loadLinkage(data) {
            if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === 'click' && evtObj.explosive) {
                        let eventObj = {
                            data
                        };
                        this.$evtBus.emit(evtObj.evtName, eventObj);
                    }
                }
            }
            // this.selectData(index)
        },
        linkageConfChanged(val) {
            if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === 'click'
                        && evtObj.explosive
                        && evtObj.def.defTrigger
                        && evtObj.def.defType === 'index'
                        && this.$store.getters.getPreviewState
                    ) {
                        if(this.compConf.style.ranksChange){
                            this._cellClick({},evtObj.def.defVal)
                        }else{
                            this._cellClick(this.bodyData[evtObj.def.defVal],0)
                        }
                    }
                }
            }
        },
        listStyle(index){
            let bgColor = this.compConf.style.bgColor
            let fontSize = this.compConf.style.fontSize
            let fontColor = this.compConf.style.fontColor
            let bgColors = this.compConf.style.bgColors
            if(bgColors && bgColors.length){
                let dataIndex = index % bgColors.length
                fontSize = bgColors[dataIndex]['fontSize']
                fontColor = bgColors[dataIndex]['fontColor'],
                bgColor = bgColors[dataIndex]['bgColor']
            }
            return {
                padding : `${this.compConf.style.topPadding}px ${this.compConf.style.rightPadding}px ${this.compConf.style.bottomPadding}px ${this.compConf.style.leftPadding}px`,
                marginBottom : this.compConf.style.marginBottom + 'px',
                height : this.compConf.style.listHeight + 'px',
                lineHeight :this.compConf.style.listHeight + 'px',
                fontSize : fontSize + 'px',
                color : fontColor,
                backgroundColor : bgColor,
                overflow : 'hidden',
                whiteSpace : 'nowrap',
                textOverflow : 'ellipsis',
                border : this.compConf.style.border.show ? `${this.compConf.style.border.width}px ${this.compConf.style.border.style} ${this.compConf.style.border.color}` : 0,
            }
        },
        _formatColumnDescObj(datasetMeta){
            let columnDescObject = {}
            datasetMeta.forEach(item => {
                columnDescObject[item.columnName] = item
            })
            this.columnDescObject = columnDescObject
        },
        _initData(data,selectColumn,datasetMeta){
            if(!data || !data[0]) return
            this._formatColumnDescObj(_.cloneDeep(datasetMeta))
            if(this.compConf.style.ranksChange){
                let bodyData = this._execRanksChange(data,selectColumn,datasetMeta)
                this.bodyData = bodyData
                this.selectColumn = selectColumn
                return
            }
            this.bodyData = data
            this.headerData = selectColumn
        },
        _convertChartData(){

        },
        // 更新数据
        updateChartData(){
            let dataSourceType = this.dataSourceConf.type
            let selectColumn = []
            let datasetMeta = []
            let data
            if(this.dataSourceConf.type === 'static'){
                datasetMeta = _.cloneDeep(this.compConf.data.conf.datasetMeta)
                selectColumn = datasetMeta.map(item => {return item.columnName})
                if(this.compConfStyle.pagation && this.compConfStyle.pagation.show){
                    data = this.compData.filter((item,index) => {
                        return index >= (this.currentPage -1) * this.compConfStyle.pagation.pageSize && index < this.currentPage * this.compConfStyle.pagation.pageSize
                    })
                }else{
                    data = _.cloneDeep(this.compData)
                }
                this._initData(data,selectColumn,datasetMeta)
            }else{
                if(this.dataConf.datasetSelectedIds && this.dataConf.datasetSelectedIds[0]){
                    this.tableHeaderData = _.cloneDeep(this.dataConf[this.dataConf.datasetSelectedIds[0]]['xAxisIds'])
                    if(this.compConfStyle.pagation && this.compConfStyle.pagation.show){
                        data = this.compData[0].filter((item,index) => {
                            return index >= (this.currentPage -1) * this.compConfStyle.pagation.pageSize && index < this.currentPage * this.compConfStyle.pagation.pageSize
                        })
                    }else{
                        data = _.cloneDeep(this.compData[0])
                    }
                    this._initData(data,this.dataConf[this.dataConf.datasetSelectedIds[0]]['xAxisIds'],this.dataConf[this.dataConf.datasetSelectedIds[0]]['datasetMeta'])
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
            return format

        },
        styleConfChanged(){
            this.updateChartData()
        },
        _oncurrentPageChange(currentPage){
            this.currentPage = currentPage
            this.updateChartData()
        }
    },
    mounted(){
        
    }
}
</script>
<style lang="stylus" scoped>
ul,li
    list-style-type none
.table-box
    box-sizing border-box
    .container
        overflow hidden
        overflow-y auto
    table
        width 100%
        border-collapse collapse
        margin 0
        padding 0
        td
            cursor pointer
.rank-box
    display flex
    .column-box
        width 80px
    .data-box
        margin-left -2px
.scroll-table-box
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
