import AbstractComp from '../AbstractComp.js'
import util from "@/util/util";
import { mapGetters } from "vuex";
import { onlyUpdateAttr } from "@/components/props/edit/EditCompReg";

export default {
    name: 'AbstractIndicatorComp',
    mixins: [AbstractComp],
    data: function () {
        return {
            activeIndex: -1,
            indicatorPosition: "none", //指示器的位置，inside/outside/none
            pageSizeTS: 10,
            arrowTS: "hover",
            options: [],
        }
    },
    computed: {
        ...mapGetters({ activeComp: "getFirstActiveComp" }),
        compStyle() {
            return this.compConf.style;
        },
        boxStyle() {
            let boxBorder = this.compStyle.boxBorder;
            return {
                width: this.box.width + "px",
                height: this.box.height + "px",
                backgroundColor: this.compStyle.backgroundColor,
                padding: this.compStyle.padding + "px",
                borderWidth: boxBorder.borderWidth + "px",
                borderStyle: boxBorder.borderType,
                borderColor: boxBorder.borderColor,
                borderRadius: boxBorder.borderRadius + "px",
            };
        },
        boxHeight() {
            return this.box.height + "px";
        },
        fieldMap() {
            return this.compStyle.fieldMap;
        },
        isPaging() {
            return this.compStyle.isPaging;
        },
        pageSize() {
            return this.compStyle.pageSize;
        },
        direction() {
            return this.compStyle.direction;
        },
        arrow() {
            return this.compStyle.arrow;
        },
        loop() {
            return this.compStyle.loop;
        },
        autoplay() {
            return this.compStyle.autoplay;
        },
        interval() {
            return this.compStyle.interval;
        },
        linkComps() {
            return this.compStyle.linkComps;
        },
        convertData() {
            let options = util.deepCopy(this.options);
            //console.log(options);
            let len = options.length;
            //正无穷保存到数据库之后变为null，所以需要重新赋值为正无穷
            let pageSize = this.pageSize || Number.POSITIVE_INFINITY;
            //console.log(pageSize);
            if (len && pageSize) {
                //  0/Number.POSITIVE_INFINITY为0；1/Number.POSITIVE_INFINITY为0
                let pageCount = Math.ceil(len / pageSize);
                if (pageSize == Number.POSITIVE_INFINITY) {
                    pageCount = 1;
                    pageSize = len;
                }
                let data = [];
                for (let index = 0; index < pageCount; index++) {
                    let arr = options.splice(0, pageSize);
                    data.push(arr);
                }
                //console.log(data);
                return data;
            } else {
                return [];
            }
        },
    },
    watch: {
        isPaging(newVal, oldVal) {
            //console.log("isPaging -> newVal", newVal);
            this.isPagingHandle();
        },
        interval(newVal, oldVal) {
            //为了解决更新时间间隔后，走马灯组件不响应的问题
            if (this.autoplay) {
                onlyUpdateAttr("autoplay", false);
                setTimeout(() => {
                    onlyUpdateAttr("autoplay", true);
                });
            }
        },
        activeComp: {
            handler(newVal, oldVal) {
                //console.log("activeComp -> newVal", newVal); //激活组件或null
                //console.log(this.compId, newVal && newVal.compId);
                if (newVal && this.compId == newVal.compId) {
                    this.isPagingInt();
                }
            },
            immediate: true,
        },
        linkComps: {
            handler(newVal, oldVal) {
                //console.log("linkComps -> newVal", newVal)
                this.loadLinkage(this.activeIndex)
            },
            deep: true
        }
    },
    mounted() {
        //页面初始化时还没有选中的组件，所以无法改变高亮组件的样式，所以onlyUpdateAttr方法无效，可以用components.js->modifyValueByCompId方法
        //正无穷保存到数据库之后变为null，所以需要重新赋值为正无穷
        if (!this.pageSize) {
            this.$store.commit("modifyValueByCompId", {
                attrs: [this.compId, "style", "pageSize"],
                value: Number.POSITIVE_INFINITY,
            });
        }
        if (this.isPaging) {
            this.indicatorPosition = "inside";
        } else {
            this.indicatorPosition = "none";
        }
    },
    methods: {
        updateChartData() {
            this.options = _.cloneDeep(this.convertChartData(this.compData))
            //console.log('updateChartData', this.options);
            this.linkageConfChanged()
        },
        convertChartData(data) {
            if (this.compConf.data.datasource.type === 'static') return data
            return data[0] || []
        },
        isPagingInt() {
            if (this.isPaging) {
                //开启分页功能
                onlyUpdateAttr("pageSizeDisabled", false);
                onlyUpdateAttr("arrowDisabled", false);
                this.indicatorPosition = "inside";
            } else {
                //不开启分页功能
                if (this.pageSize != Number.POSITIVE_INFINITY) {
                    this.pageSizeTS = this.pageSize;
                    this.arrowTS = this.arrow;
                }
                onlyUpdateAttr("pageSize", Number.POSITIVE_INFINITY);
                onlyUpdateAttr("arrow", "never");
                onlyUpdateAttr("pageSizeDisabled", true);
                onlyUpdateAttr("arrowDisabled", true);
                this.indicatorPosition = "none";
            }
        },
        isPagingHandle() {
            if (this.isPaging) {
                onlyUpdateAttr("pageSize", this.pageSizeTS);
                onlyUpdateAttr("arrow", this.arrowTS);
            }
            this.isPagingInt();
        },
        getMyIndex(index, i) {
            if (this.pageSize == Number.POSITIVE_INFINITY) {
                return i;
            }
            //0*Number.POSITIVE_INFINITY为NaN
            return index * this.pageSize + i;
        },
        itemStyle(index, i) {
            let myIndex = this.getMyIndex(index, i);
            let status = this.activeIndex === myIndex ? "active" : "default";

            if (!this.compStyle.activeFlag) {
                status = "default";
            }

            let itemBorder = this.compStyle[`${status}Border`];
            let style = {
                marginBottom: this.compStyle["defaultMargin"] + "px",
                width: this.compStyle[`${status}Width`] + "px",
                height: this.compStyle[`${status}Height`] + "px",
                backgroundColor: this.compStyle[`${status}BackgroundColor`],
                backgroundImage: "url(" + this.compStyle[`${status}BackgroundImage`] + ")",
                borderWidth: itemBorder.borderWidth + "px",
                borderStyle: itemBorder.borderType,
                borderColor: itemBorder.borderColor,
                borderRadius: itemBorder.borderRadius + "px",
                cursor: this.compStyle.activeFlag ? "pointer" : "default",
            };
            return style;
        },
        elementStyle(type, index, i) {
            let myIndex = this.getMyIndex(index, i);
            let status = this.activeIndex === myIndex ? "active" : "default";

            if (!this.compStyle.activeFlag) {
                status = "default";
            }

            let obj = this.compStyle[status + type];
            let style = {
                width: obj.width ? obj.width + 'px' : '',
                fontFamily: obj.fontFamily,
                fontWeight: obj.fontWeight,
                fontSize: obj.fontSize + "px",
                color: obj.fontColor,
            };
            return style;
        },
        iconStyle(index, i) {
            let myIndex = this.getMyIndex(index, i);
            let status = this.activeIndex === myIndex ? "active" : "default";
            let obj = this.compStyle[status + "Icon"];

            let flag = obj.flag;
            if (!this.compStyle.activeFlag) {
                obj = this.compStyle["defaultIcon"];
            } else if (status == "active" && !flag) {
                obj = this.compStyle["defaultIcon"];
            }

            let { width, height } = obj;
            let style = {
                width: width ? width + "px" : "",
                height: height ? height + "px" : "",
            };
            return style;
        },
        iconValue(item, index, i) {
            let myIndex = this.getMyIndex(index, i);
            let status = this.activeIndex === myIndex ? "active" : "default";
            let obj = this.compStyle[status + "Icon"];

            //指标卡处于选中状态时，flag为false则用默认状态下的图标；flag为true则用选中状态下的图标
            let flag = obj.flag;
            if (!this.compStyle.activeFlag) {
                obj = this.compStyle["defaultIcon"];
            } else if (status == "active" && !flag) {
                obj = this.compStyle["defaultIcon"];
            }

            let iconData = obj.iconData; //{"3":"/cimage/90853421d11c462f8d81f12157545ce9.png"}
            let id = item[this.fieldMap.id];
            let url = iconData[id];
            return url;
        },
        indicatorClick(index, i) {
            //console.log("indicatorClick -> index, i", index, i);
            //只有开启选中状态，才可以改变下标
            //console.log(this.compStyle.activeFlag);
            if (this.compStyle.activeFlag) {
                let myIndex = this.getMyIndex(index, i);
                if (this.activeIndex != myIndex) {
                    this.loadLinkage(myIndex);
                    this.activeIndex = myIndex;
                }
            }
        },
        //点击后将选中的数据暴露出去
        loadLinkage(myIndex) {
            if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                //console.log("loadLinkage -> evtList", evtList)
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === "click" && evtObj.explosive) {
                        let transData = this.options[myIndex] || {};
                        //console.log(transData);
                        let id = transData[this.fieldMap.id];
                        //console.log("loadLinkage -> id", id)
                        if (!id) return;
                        let eventObj = {
                            data: transData,
                        };
                        let linkComps = this.linkComps;
                        //console.log("loadLinkage -> linkComps", linkComps)
                        if (evtObj.ctrlShow && Array.isArray(linkComps) && linkComps.length) {
                            let linkageComp = {};
                            //隐藏所有关联组件
                            linkComps.forEach(item => {
                                item.child.forEach(compId => {
                                    linkageComp[compId] = false
                                })
                            })
                            //显示选中的指标卡对应的关联组件
                            linkComps.forEach(item => {
                                if (item.id == id) {
                                    item.child.forEach(compId => {
                                        linkageComp[compId] = true
                                    })
                                }
                            })
                            eventObj.switchVisible = linkageComp
                        }
                        this.$evtBus.emit(evtObj.evtName, eventObj);
                    }
                }
            }
        },
        _clickByLinkAge(evtRevObj) {
            this.$evtBus.on(evtRevObj, (e) => {
                this._toggleCompShow(
                    e.ctrlShow,
                    e.switchVisible && e.switchVisible[this.compConf.compId],
                    this.compConf.compId
                );
                let data = []
                e.refData.forEach(item => {
                    let operationType = item.cond
                    let bindMapperColumn = item.to.split('$')[1]
                    let value = e.data[item.from.split('$')[1]]
                    data.push({
                        operationType,
                        bindMapperColumn,
                        value
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
                payload[this.compConf.compId] = {
                    [`${e.name}`]: evt
                }
                this.$store.commit('setLinkage', payload)
                this.updateCompData(false)
            });
        },
        //默认触发选中；关联其他组件控制自己的显隐
        linkageConfChanged() {
            let linkage = this.compConf.linkage;
            //console.log("linkageConfChanged -> linkage", linkage)
            if (!linkage) {
                return;
            }
            let { linkEvents, linkRevEvents } = linkage;
            if (linkEvents) {
                for (let i = 0; i < linkEvents.length; i++) {
                    let evtObj = linkEvents[i];
                    //console.log("linkageConfChanged -> evtObj", evtObj)
                    if (
                        evtObj.evtType === "click" &&
                        evtObj.explosive &&
                        evtObj.def.defTrigger &&
                        evtObj.def.defType === "index"
                    ) {
                        this.activeIndex = evtObj.def.defVal;
                        this.loadLinkage(this.activeIndex);
                    }
                }
            }
            if (linkRevEvents) {
                for (let i = 0; i < linkRevEvents.length; i++) {
                    let evtRevObj = linkRevEvents[i];
                    let evtType = evtRevObj.evtName.split(":")[1];
                    if (evtType === "click") {
                        this._clickByLinkAge(evtRevObj);
                    }
                }
            }
        },
    },
}
