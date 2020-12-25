<template>
    <div class="custom-select" :style="style" v-clickoutside="hideOptions">
        <div class="select-area" :style="selectStyle" @click.stop="_toogleShowOptions"
             @mouseenter="() => {this.hovering = true}" @mouseleave="() => {this.hovering = false}">
            <div class="select-val">
                <template v-if="selectVal">
                    <span>{{ selectVal }}</span>
                </template>
                <template v-else>
                    <span class="placeholder" :style="placeholderStyle">{{ compStyle.select.placeholder.text }}</span>
                </template>
            </div>
            <div class="icon">
                <i :class="['icon-for-select','el-icon-arrow-up',showOptions ? 'is-reverse' : '']"></i>
            </div>
        </div>
        <div class="options" :style="optionBoxStyle" v-if="showOptions">
            <ul>
                <li class="option-item" v-for="(item,index) in options" :key="index" :style="_optionStyle(index)"
                    @click.stop="_onSelectChange(index)" @mouseover="_onmouseover(index)"
                    @mouseout="_onmouseout(index)">
                    <span>{{ item[compStyle.labelKey] }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import AbstractComp from '@/compLib/commons/AbstractComp'
import Clickoutside from 'element-ui/src/utils/clickoutside'
import {convertSelectCompData} from '@/datamanager/DataConvertor'

export default {
    name: "formSelect",
    mixins: [AbstractComp],
    directives: {Clickoutside},
    data() {
        return {
            showOptions: false,
            selectVal: '',
            options: [],
            mouseoverIndex: '',
            hovering: false
        }
    },
    computed: {
        obj() {
            return this.compConf.box;
        },
        compStyle() {
            return this.compConf.style
        },
        style() {
            return {
                width: this.obj.width + 'px',
                height: this.obj.height + 'px',
            }
        },
        optionBoxStyle() {
            return {
                top: this.obj.height + 'px'
            }
        },
        selectStyle() {
            let style = {
                backgroundColor: this.compStyle.select.backgroundColor,
                color: this.compStyle.select.fontColor,
                fontSize: parseInt(this.compStyle.select.fontSize) + 'px',
                borderRadius: _.cloneDeep(this.compStyle.select.borderRadius).split(",").map(item => {
                    return parseInt(item) + 'px'
                }).join(" "),
                padding: _.cloneDeep(this.compStyle.select.padding).split(",").map(item => {
                    return parseInt(item) + 'px'
                }).join(" "),
            }
            if (this.compStyle.select.border.show) {
                style.border = `${this.compStyle.select.border.width}px ${this.compStyle.select.border.style} ${this.compStyle.select.border.color}`
            }
            if (this.showOptions || this.hovering) {
                style.backgroundColor = this.compStyle.select.focus.backgroundColor
                style.color = this.compStyle.select.focus.fontColor
                style.borderColor = this.compStyle.select.focus.border.color
            }
            return style
        },
        placeholderStyle() {
            return {
                color: this.compStyle.select.placeholder.fontColor,
                fontSize: parseInt(this.compStyle.select.placeholder.fontSize) + 'px',
            }
        },
    },
    methods: {
        getIndexByVal(val){
            for(let i=0;i<this.options.length;i++){
                if(this.options[i][this.compStyle.labelKey] === val) return i
            }
            return 0
        },
        updateChartData() {
            this.options = _.cloneDeep(this.convertChartData(this.compData))
            if (this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === 'click' && evtObj.explosive && evtObj.def.defTrigger && this.$store.getters.getPreviewState) {
                        let selectIndex = 0
                        switch(evtObj.def.defType){
                            case 'index' :
                                selectIndex = evtObj.def.defVal
                            break;
                            case 'val' :
                                selectIndex = this.getIndexByVal(evtObj.def.defVal)
                            break;
                            default :
                                selectIndex = 0
                            break;
                        }
                        this._onSelectChange(selectIndex)
                    }
                }
            }else{
                this._onSelectChange(0)
            }
        },
        convertChartData(data) {
            if (this.compConf.data.datasource.type === 'static') return data
            let dataConf = _.cloneDeep(this.dataConf[this.dataConf.datasetSelectedIds[0]])
            return convertSelectCompData(data[0], dataConf, this.compStyle.labelKey)
        },
        _onmouseout(index) {
            this.mouseoverIndex = ''
        },
        _onmouseover(index) {
            this.mouseoverIndex = index
        },
        _optionStyle(index) {
            let currentVal = this.options[index][this.compStyle.labelKey]
            let style = {
                height: this.compStyle.option.base.height + 'px',
                lineHeight: this.compStyle.option.base.height + 'px',
                padding: _.cloneDeep(this.compStyle.option.base.padding).split(",").map(item => {
                    return parseInt(item) + 'px'
                }).join(" "),
                backgroundColor: this.compStyle.option.default.backgroundColor,
                color: this.compStyle.option.default.fontColor,
                fontSize: parseInt(this.compStyle.option.default.fontSize) + 'px',
                fontWeight: this.compStyle.option.default.fontWeight,
                fontStyle: this.compStyle.option.default.fontStyle,
            }
            if (this.compStyle.option.base.border.show) {
                style.borderBottom = `${this.compStyle.option.base.border.width}px ${this.compStyle.option.base.border.style} ${this.compStyle.option.base.border.color}`
            }
            if (currentVal === this.selectVal || this.mouseoverIndex === index) {
                style.backgroundColor = this.compStyle.option.active.backgroundColor,
                    style.color = this.compStyle.option.active.fontColor,
                    style.fontSize = parseInt(this.compStyle.option.active.fontSize) + 'px'
                style.fontWeight = this.compStyle.option.active.fontWeight
                style.fontStyle = this.compStyle.option.active.fontStyle
            }
            return style
        },
        _toogleShowOptions() {
            this.showOptions = !this.showOptions
        },
        hideOptions() {
            this.showOptions = false
            this.mouseoverSelect = false
        },
        // 值改变时触发
        _onSelectChange(index) {
            if(!this.options || !this.options.length) return
            this.selectVal = this.options[index][this.compStyle.labelKey]
            this.loadLinkage(index)
            this.hideOptions()
        },
        _getSelectValue() {
            return this.selectVal
        },
        loadLinkage(index) {
            if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === 'click' && evtObj.explosive) {
                        let transData = this.options[index];
                        transData = this._convertEventOutData(transData, this.compConf.data)
                        let eventObj = {
                            data: transData,
                        };
                        this.$evtBus.emit(evtObj.evtName, eventObj);
                    }
                }
            }
        },
        //点击事件
        _clickByLinkAge(evtRevObj) {
            this.$evtBus.on(evtRevObj, (e) => {
                this._toggleCompShow(e.ctrlShow, e.switchVisible && e.switchVisible[this.compConf.compId], this.compConf.compId)
                // if (e.ctrlShow && e.switchVisible && !e.switchVisible[this.compConf.compId]) return
                let data = []
                e.refData.forEach(item => {
                    let operationType = item.cond
                    let bindMapperColumn = item.to.split('$')[1]
                    let value = e.data[item.from.split('$')[1]]
                    data.push({
                        operationType, bindMapperColumn, value
                    })
                })
                let evt = {
                    target: e.target,
                    source: e.source,
                    name: e.name,
                    data,
                    sourceData: e.data
                }
                let payload = {}
                payload[this.compConf.compId] = {[`${e.name}`]: evt}
                this.$store.commit('setLinkage', payload)
                this.updateCompData(false)
            })
        },
        linkageConfChanged(newVal) {
            if (!this.compConf.linkage) {
                return;
            }
            if (this.compConf.linkage.linkRevEvents) {
                let evtRevList = this.compConf.linkage.linkRevEvents;
                for (let i = 0; i < evtRevList.length; i++) {
                    let evtRevObj = evtRevList[i];
                    let evtType = evtRevObj.evtName.split(":")[1]
                    if (evtType === 'click') {
                        this._clickByLinkAge(evtRevObj)
                    }
                }
            }
            // let cycleConf = this.compConf.linkage.cycleEvents;
            // if (cycleConf && cycleConf.hasOwnProperty('sid')) {
            //     let cycleObj = _.cloneDeep(cycleConf);
            //     cycleObj.next = this.next;
            //     cycleObj.reset = this.reset;
            //     this.$evtBus.registerCycle(cycleObj)
            // }
        }
    }
}
</script>
<style lang="stylus" scoped>
.custom-select
    width 100%
    height 100%
    position relative

    .select-area
        width 100%
        height 100%
        box-sizing border-box
        display flex
        justify-content space-between
        align-items center
        cursor pointer

        .select-val
            text-align center
            flex auto

        .icon-for-select
            margin-right 5px
            transition transform .3s linear

            &.is-reverse
                transform rotate(180deg)

    .options
        position absolute
        left 0
        top 0
        z-index 1
        width 100%
        max-height 180px
        overflow hidden
        overflow-y auto

        ul

            overflow-y auto
            overflow-x hidden

            li
                display flex
                list-style-type none
                box-sizing border-box
                cursor pointer
                transition all .2s linear
</style>
