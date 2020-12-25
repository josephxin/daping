<template>
    <div class="component-form-tabs" :style="boxStyle">
        <ul :style="wrapStyle">
            <li v-for="(item,index) in tabList" :key="index" @click.stop.prevent="_tabClick(index)"
                :style="itemStyle(index)" :class="['tab-item',{'is-active':index === activeIndex}]">
                <span>{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import AbstractComp from '@/compLib/commons/AbstractComp'

export default {
    name: "formTabs",
    mixins: [AbstractComp],
    data() {
        return {
            activeIndex: '',
            selectVal: ''
        }
    },
    computed: {
        box() {
            return this.compConf.box;
        },
        compStyle() {
            return this.compConf.style
        },
        wrapStyle() {
            return {
                flexDirection: this.compStyle.orient === 'horizontal' ? 'row' : 'column'
            }
        },
        boxStyle() {
            return {
                width: this.box.width + 'px',
                height: this.box.height + 'px',
                backgroundColor: this.compStyle.boxBackgroundColor,
                padding: this.compStyle.boxPadding + 'px',
                borderWidth: this.compStyle.boxShowBorder ? this.compStyle.boxBorderWidth + 'px' : 0,
                borderStyle: this.compStyle.boxBorderType,
                borderColor: this.compStyle.boxBorderColor,
                borderRadius: this.compStyle.boxBorderRadius + 'px'
            }
        },
        tabList() {
            return this.compStyle.linkComps
        }
    },
    methods: {
        updateChartData() {
            this._tabClick(0)
        },
        convertChartData(data) {
            return data
        },
        _tabClick(index) {
            if (!this.compStyle.allowCancle && this.activeIndex === index) return
            if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === 'click' && evtObj.explosive) {
                        let transData = this.compData[index];
                        let eventObj = {
                            data: transData
                        };
                        if (evtObj.ctrlShow) {
                            let linkageComp = {}
                            this.compStyle.linkComps.forEach(item => {
                                item.child.forEach(link => {
                                    linkageComp[link] = false
                                })
                            })
                            if (this.activeIndex !== index) {
                                this.compStyle.linkComps[index]['child'].forEach(item => {
                                    linkageComp[item] = true
                                })
                            }
                            eventObj.switchVisible = linkageComp
                        }
                        this.$evtBus.emit(evtObj.evtName, eventObj);
                    }
                }
            }
            if (this.activeIndex === index) {
                this.activeIndex = ''
            } else {
                this.activeIndex = index
            }
        },
        loadLinkage(index) {
            if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === 'click' && evtObj.explosive) {
                        let transData = this.compData[index];
                        let eventObj = {
                            data: transData,
                        };
                        this.$evtBus.emit(evtObj.evtName, eventObj);
                    }
                }
            }
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
                        this._tabClick(evtObj.def.defVal)
                    }
                }
            }
        },
        itemStyle(index) {
            let status = this.activeIndex === index ? 'active' : 'default'
            let style = {
                backgroundColor: this.compStyle[`${status}BackgroundColor`],
                color: this.compStyle[`${status}FontColor`],
                fontSize: this.compStyle[`${status}FontSize`] + 'px',
                //lineHeight : this.obj.height + 'px',
                margin: this.compStyle.baseMargin.split(",").map(item => {
                    return parseInt(item) + 'px'
                }).join(" "),
                padding: this.compStyle.basePadding.split(",").map(item => {
                    return parseInt(item) + 'px'
                }).join(" "),
                textAlign: this.compStyle.defaultTextAlign
                //   width : (this.compStyle.baseWidth.indexOf("%") != -1 || this.compStyle.baseWidth.indexOf("auto") != -1) ?  this.compStyle.baseWidth : parseInt(this.compStyle.baseWidth) + 'px'
            }
            if (this.compStyle.baseWidth && (this.compStyle.baseWidth.indexOf("%") == -1 && this.compStyle.baseWidth.indexOf("auto") == -1)) {
                style.width = parseInt(this.compStyle.baseWidth) + 'px'
                style.flex = 'auto'
            }
            if (this.compStyle[`${status}BackgroundImgUrl`]) {
                style.backgroundImage = `url(${this.compStyle[`${status}BackgroundImgUrl`]})`
                style.backgroundPosition = '0 0'
                style.backgroundSize = "100% 100%"
                style.backgroundRepeat = "no-repeat"
            }
            let dataLength = this.tabList.length
            if (this.compStyle.defaultShowBorder) {
                style.borderWidth = this.compStyle.defaultBorderWidth + 'px'
                style.borderStyle = this.compStyle.defaultBorderType
                style.borderColor = this.compStyle.defaultBorderColor
                if (index !== 0) {
                    style.borderLeftWidth = 0
                }
                if (index === 0) {
                    style.borderTopLeftRadius = this.compStyle.defaultBorderRadius + 'px'
                    style.borderBottomLeftRadius = this.compStyle.defaultBorderRadius + 'px'
                }
                if (index === dataLength - 1) {
                    style.borderTopRightRadius = this.compStyle.defaultBorderRadius + 'px'
                    style.borderBottomRightRadius = this.compStyle.defaultBorderRadius + 'px'
                }
            }
            return style
        },
    },
    created() {

    }
}
</script>
<style lang="stylus" scoped>
.component-form-tabs
    box-sizing border-box

    ul
        width 100%
        height 100%
        display flex

    li
        flex 1
        cursor pointer
        list-style-type none
        height 100%
        vertical-align middle
        // text-align center
        box-sizing border-box
        transition all .5s linear
        user-select none
        box-sizing border-box
        display flex
        align-items center
</style>
