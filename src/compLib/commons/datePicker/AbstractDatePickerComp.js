import AbstractComp from '../AbstractComp.js'
import util from "@/util/util";
import { mapGetters } from "vuex";
import { onlyUpdateAttr } from "@/components/props/edit/EditCompReg";

export default {
    name: 'AbstractDatePickerComp',
    mixins: [AbstractComp],
    data() {
        return {
            flag: false, //初始化时不让value监听内的代码执行；因为初始化时日历面板dom还没生成
            value: '',
            popperClass: '',
            hasClick: false, //点击日历面板，选择了起始时间后变为true
            focusFlag: true, //输入框聚焦时变为false，失去焦点时变为true
            inputEl: null,
        }
    },
    computed: {
        ...mapGetters({ activeComp: "getFirstActiveComp" }),
        boxStyle() {
            return {
                width: this.box.width + "px",
                height: this.box.height + "px",
            };
        },
        type() {
            return this.styleConf.type;
        },
        valueStore() {
            return this.styleConf.value;
        },
        format() {
            return this.styleConf.format;
        },
        valueFormat() {
            return this.styleConf.valueFormat;
        },
        inputStyle() {
            return this.styleConf.inputStyle;
        },
        calendarStyle() {
            return this.styleConf.calendarStyle;
        },
        inKey() {
            return this.styleConf.in.key;
        },
    },
    watch: {
        valueStore: {
            handler(newVal, oldVal) {
                //console.log('valueStore->', newVal, oldVal);
                this.value = newVal;
            },
        },
        value: {
            handler(newVal, oldVal) {
                //console.log('value->', newVal, oldVal);
                if (this.flag) {
                    //此处需要注意，使用modifyValueByCompId，不能使用onlyUpdateAttr；modifyValueByCompId方法只有在设计时才有效，预览时components.js中的compMap为{}，预览时不需要改变状态中的值
                    this.$store.commit("modifyValueByCompId", {
                        attrs: [this.compId, "style", "value"],
                        value: newVal,
                    });
                    this.loadLinkage(newVal);
                }
            },
        },
        valueFormat: {
            handler(newVal, oldVal) {
                //console.log(newVal, oldVal);
                onlyUpdateAttr("value", "");
            },
        },
        inputStyle: {
            handler(newVal, oldVal) {
                //console.log(newVal, oldVal);
                this.inputStyleChanged();
            },
            deep: true,
        },
        calendarStyle: {
            handler(newVal, oldVal) {
                //console.log(newVal, oldVal);
                this.calendarStyleChanged();
            },
            deep: true,
        },
        inKey: {
            handler(newVal, oldVal) {
                //console.log(newVal, oldVal);
                this.updateChartData();
            },
        },
    },
    mounted() {
        this.value = this.valueStore;
        this.$nextTick(() => {
            this.flag = true;
        })
        this.popperClass = util.guid();
        this.inputStyleChanged();
    },
    methods: {
        focusHandle(vueComponent) {
            //console.log('focusHandle', 111);
            //console.log(vueComponent);
            this.hasClick = false;
            this.focusFlag = false;
            //下拉日历面板是后添加到body中的，所有需要$nextTick方法等渲染完之后获取dom元素
            this.$nextTick(() => {
                this.calendarStyleChanged();
                this.borderHandle(this.inputEl, this.inputStyle.focusBorder);
            })
        },
        blurHandle() {
            this.focusFlag = true;
            this.borderHandle(this.inputEl, this.inputStyle.defaultBorder);
        },
        inputStyleChanged() {
            //console.log('inputStyleChanged', 111);
            //console.log(this.$refs.dateRef);
            let el = this.$refs.dateRef.$el;
            this.inputEl = el.getElementsByClassName("el-input__inner")[0];
            this.inputEl.style.backgroundColor = this.inputStyle.bgColor || 'transparent';
            this.fontHandle(this.inputEl, this.inputStyle)
            this.borderHandle(this.inputEl, this.inputStyle.defaultBorder)
            el.onmouseover = (e) => {
                if (this.focusFlag) {
                    this.borderHandle(this.inputEl, this.inputStyle.hoverBorder)
                }
            };
            el.onmouseout = (e) => {
                if (this.focusFlag) {
                    this.borderHandle(this.inputEl, this.inputStyle.defaultBorder)
                }
            };

            let prefix = el.getElementsByClassName("el-input__prefix")[0];
            let prefixIcon = prefix.getElementsByClassName("el-input__icon")[0];
            prefixIcon.style.fontSize = this.inputStyle.prefixSize + "px";
            prefixIcon.style.color = this.inputStyle.prefixColor || 'transparent';

            let suffix = el.getElementsByClassName("el-input__suffix")[0];
            let suffixIcon = suffix.getElementsByClassName("el-input__icon")[0];
            suffixIcon.style.fontSize = this.inputStyle.clearSize + "px";
            suffixIcon.style.color = this.inputStyle.clearColor || 'transparent';
        },
        calendarStyleChanged() {
            let el = document.getElementsByClassName(this.popperClass)[0];
            //console.log(el);
            //日历面板如果没被展开过，则找不到面板元素，所以需要拦截
            if (!el) {
                return;
            }
            el.style.backgroundColor = this.calendarStyle.bgColor || 'transparent';
            el.style.boxShadow = this.calendarStyle.boxShadow;
            this.borderHandle(el, this.calendarStyle.border)

            let arrowEl = el.getElementsByClassName('popper__arrow')[0];
            //这里必须使用style.cssText不能使用style.borderBottomColor，elementUi可能会重写样式，后面的写法不生效
            //切换日期选择器类型时，popper__arrow元素丢失，应该是elementUi的问题，所以此处需要判断
            if (arrowEl) {
                arrowEl.style.cssText = `left: 35px; border-bottom-color: ${this.calendarStyle.arrowColor || 'transparent'} !important`;
            }

            //如果type为datetime，则在dateTimePoint.vue文件内处理相关逻辑
            if (this.type == 'datetime') {
                this.dateTimePoint(el)
            }

            //日历顶部文本样式处理
            let headLabels = el.getElementsByClassName('el-date-picker__header-label');
            let headText = this.calendarStyle.headText;
            let headTextHover = this.calendarStyle.headTextHover;
            headLabels.forEach((item, i) => {
                this.fontHandle(item, headText)
                item.onmouseover = (e) => {
                    this.fontHandle(item, headTextHover)
                };
                item.onmouseout = (e) => {
                    this.fontHandle(item, headText)
                };
            });
            //日历顶部箭头样式处理
            let headIcons = el.getElementsByClassName('el-picker-panel__icon-btn');
            let headArrow = this.calendarStyle.headArrow;
            let headArrowHover = this.calendarStyle.headArrowHover;
            headIcons.forEach((item, i) => {
                this.headIconMouseHandle(item, headArrow)
                item.onmouseover = (e) => {
                    this.headIconMouseHandle(item, headArrowHover)
                };
                item.onmouseout = (e) => {
                    this.headIconMouseHandle(item, headArrow)
                };
                item.onclick = (e) => {
                    this.calendarStyleChanged();
                };
            });

            //日历主体样式处理
            let dividerLine = this.calendarStyle.dividerLine;
            let mainText = this.calendarStyle.mainText;
            let mainTextHover = this.calendarStyle.mainTextHover;
            let dateCurrentText = this.calendarStyle.dateCurrentText; //日
            let currentText = this.calendarStyle.currentText; //月、年
            let todayText = this.calendarStyle.todayText;
            let otherText = this.calendarStyle.otherText;
            //日历底部样式处理
            let footDividerLine = this.calendarStyle.footDividerLine;
            let defaultBtn = this.calendarStyle.defaultBtn;
            let hoverBtn = this.calendarStyle.hoverBtn;

            if (this.type == 'date' || this.type == 'dates' || this.type == 'datetime') {
                let elDateTable = el.getElementsByClassName('el-date-table')[0];

                //将上一次选中的样式清空
                let spans = elDateTable.getElementsByTagName('span');
                spans.forEach((item, i) => {
                    item.style = '';
                });
                //普通文本样式、分割线样式
                let ths = elDateTable.getElementsByTagName('th');
                ths.forEach((item, i) => {
                    item.style.borderBottomWidth = dividerLine.width + 'px';
                    item.style.borderBottomColor = dividerLine.color || 'transparent';
                    this.fontHandle(item, mainText)
                });
                //普通文本样式、悬停文本样式
                let availables = elDateTable.getElementsByClassName('available');
                availables.forEach((item, i) => {
                    this.fontHandle(item, mainText)
                    item.onmouseover = (e) => {
                        let target = e.target;
                        while (target.tagName != "TR") {
                            if (target.classList.contains("available")) {
                                this.fontHandle(item, mainTextHover)
                                break;
                            }
                            target = target.parentNode;
                        }
                    };
                    item.onmouseout = (e) => {
                        let target = e.target;
                        while (target.tagName != "TR") {
                            if (target.classList.contains("available")) {
                                this.fontHandle(item, mainText)
                                break;
                            }
                            target = target.parentNode;
                        }
                    };
                });
                //今日文本样式
                let today = elDateTable.getElementsByClassName('today')[0];
                if (today) {
                    let todaySpan = today.getElementsByTagName('span')[0];
                    this.fontHandle(todaySpan, todayText)
                }

                //还没有选择日期时没有current或selected元素；有选中的日期才能找到
                //当今日日期和选中的日期（时间相同）时，使用选中的日期样式
                if (this.type == 'date' || this.type == 'datetime') {
                    let current = elDateTable.getElementsByClassName('current')[0];
                    if (current) {
                        let currentSpan = current.getElementsByTagName('span')[0];
                        this.fontHandle(currentSpan, dateCurrentText)
                        currentSpan.style.backgroundColor = dateCurrentText.bgColor || 'transparent';
                    }
                } else if (this.type == 'dates') {
                    let selecteds = elDateTable.getElementsByClassName('selected');
                    selecteds.forEach((item, i) => {
                        let span = item.getElementsByTagName('span')[0];
                        this.fontHandle(span, dateCurrentText)
                        span.style.backgroundColor = dateCurrentText.bgColor || 'transparent';
                    });
                    //给底部分割线和确定按钮加样式，多日选择器有确定按钮
                    let footer = el.getElementsByClassName('el-picker-panel__footer')[0];
                    footer.style.borderTopWidth = footDividerLine.width + 'px';
                    footer.style.borderTopColor = footDividerLine.color || 'transparent';
                    let confirmEl = footer.getElementsByClassName('is-plain')[0];
                    this.confirmBtnHandle(confirmEl, defaultBtn)
                    confirmEl.onmouseover = (e) => {
                        this.confirmBtnHandle(confirmEl, hoverBtn)
                    };
                    confirmEl.onmouseout = (e) => {
                        this.confirmBtnHandle(confirmEl, defaultBtn)
                    };
                }
                //上下月文本样式
                let prevMonths = elDateTable.getElementsByClassName('prev-month');
                let nextMonths = elDateTable.getElementsByClassName('next-month');
                prevMonths.forEach((item, i) => {
                    this.fontHandle(item, otherText)
                });
                nextMonths.forEach((item, i) => {
                    this.fontHandle(item, otherText)
                });
            } else {
                let table = el.getElementsByClassName(`el-${this.type}-table`)[0];
                //分割线样式
                let headerEl = el.getElementsByClassName('el-date-picker__header--bordered')[0];
                headerEl.style.borderBottomWidth = dividerLine.width + 'px';
                headerEl.style.borderBottomColor = dividerLine.color || 'transparent';
                //普通文本样式、悬停文本样式
                let cells = table.getElementsByClassName('cell');
                cells.forEach((item, i) => {
                    this.fontHandle(item, mainText)
                    item.onmouseover = (e) => {
                        this.fontHandle(item, mainTextHover)
                    };
                    item.onmouseout = (e) => {
                        this.fontHandle(item, mainText)
                    };
                });
                //今日文本样式
                let today = table.getElementsByClassName('today')[0];
                if (today) {
                    let todayCell = today.getElementsByClassName('cell')[0];
                    this.fontHandle(todayCell, todayText)
                    todayCell.onmouseover = (e) => {
                        this.fontHandle(todayCell, todayText)
                    };
                    todayCell.onmouseout = (e) => {
                        this.fontHandle(todayCell, todayText)
                    };
                }
                //选中文本样式
                let current = table.getElementsByClassName('current')[0];
                if (current) {
                    let currentCell = current.getElementsByClassName('cell')[0];
                    this.fontHandle(currentCell, currentText)
                    currentCell.onmouseover = (e) => {
                        this.fontHandle(currentCell, currentText)
                    };
                    currentCell.onmouseout = (e) => {
                        this.fontHandle(currentCell, currentText)
                    };
                }
            }
        },
        borderHandle(el, border) {
            let {
                borderType,
                borderWidth,
                borderColor,
                borderRadius,
            } = border;
            el.style.border = `${borderWidth}px ${borderType} ${borderColor || 'transparent'}`;
            el.style.borderRadius = borderRadius + "px";
        },
        fontHandle(el, style) {
            el.style.fontFamily = style.fontFamily;
            el.style.fontWeight = style.fontWeight;
            el.style.fontSize = style.fontSize + "px";
            el.style.color = style.fontColor || 'transparent';
        },
        headIconMouseHandle(el, style) {
            el.style.fontSize = style.arrowSize + "px";
            el.style.color = style.arrowColor || 'transparent';
        },
        confirmBtnHandle(el, style) {
            el.style.backgroundColor = style.bgColor || 'transparent';
            el.style.padding = `${style.paddingTB}px ${style.paddingLR}px`;
            el.style.border = `${style.borderWidth}px ${style.borderType} ${style.borderColor || 'transparent'}`;
            el.style.borderRadius = style.borderRadius + "px";
            this.fontHandle(el, style)
        },
        //日历面板-时间部分样式处理
        timeSectionHandle(timeHead) {
            let timeDividerLine = this.calendarStyle.timeDividerLine;
            let timeInput = this.calendarStyle.timeInput;

            //头部分割线样式
            timeHead.style.borderBottomWidth = timeDividerLine.width + "px";
            timeHead.style.borderBottomColor =
                timeDividerLine.color || "transparent";

            //输入框样式
            let inputEls = timeHead.getElementsByClassName("el-input__inner");
            inputEls.forEach((item, i) => {
                let flag = true;
                item.style.backgroundColor = timeInput.bgColor || "transparent";
                this.fontHandle(item, timeInput);
                this.borderHandle(item, timeInput.defaultBorder);
                item.onmouseover = (e) => {
                    if (flag) {
                        this.borderHandle(item, timeInput.hoverBorder);
                    }
                };
                item.onmouseout = (e) => {
                    if (flag) {
                        this.borderHandle(item, timeInput.defaultBorder);
                    }
                };
                item.onfocus = (e) => {
                    flag = false;
                    this.borderHandle(item, timeInput.focusBorder);
                };
                item.onblur = (e) => {
                    flag = true;
                    this.borderHandle(item, timeInput.defaultBorder);
                };
            });
        },
        //下拉时间面板样式
        //dateTimeRange组件时间发生改变时，value没有发生改变
        timePanelHandle(timePanelEl, style) {
            timePanelEl.style.backgroundColor =
                style.bgColor || "transparent";
            timePanelEl.style.boxShadow = style.boxShadow;
            this.borderHandle(timePanelEl, style.border);

            //下拉时间面板-选中文本样式；普通文本样式；悬停文本样式
            document.styleSheets[0].addRule(
                `.${this.popperClass} .el-time-spinner__item`,
                `font-family: ${style.text.fontFamily}; font-weight: ${style.text.fontWeight}; font-size: ${style.text.fontSize}px !important; color: ${style.text.fontColor || 'transparent'} !important;`
            );
            document.styleSheets[0].addRule(
                `.${this.popperClass} .el-time-spinner__item:hover:not(.disabled):not(.active)`,
                `background-color: ${style.hoverText.bgColor || 'transparent'}; font-family: ${style.hoverText.fontFamily}; font-weight: ${style.hoverText.fontWeight}; font-size: ${style.hoverText.fontSize}px !important; color: ${style.hoverText.fontColor || 'transparent'} !important;`
            );
            document.styleSheets[0].addRule(
                `.${this.popperClass} .el-time-spinner__item.active:not(.disabled)`,
                `font-family: ${style.currentText.fontFamily}; font-weight: ${style.currentText.fontWeight}; font-size: ${style.currentText.fontSize}px !important; color: ${style.currentText.fontColor || 'transparent'} !important;`
            );
        },
        //下拉时间面板-主体分割线
        timePanelMainDividerLineHandle(style) {
            document.styleSheets[0].addRule(
                `.${this.popperClass} .el-time-panel__content::before`,
                `border-top: ${style.dividerLine.width}px solid ${style.dividerLine.color || "transparent"
                } !important`
            );
            document.styleSheets[0].addRule(
                `.${this.popperClass} .el-time-panel__content::before`,
                `border-bottom: ${style.dividerLine.width}px solid ${style.dividerLine.color || "transparent"
                } !important`
            );

            document.styleSheets[0].addRule(
                `.${this.popperClass} .el-time-panel__content::after`,
                `border-top: ${style.dividerLine.width}px solid ${style.dividerLine.color || "transparent"
                } !important`
            );
            document.styleSheets[0].addRule(
                `.${this.popperClass} .el-time-panel__content::after`,
                `border-bottom: ${style.dividerLine.width}px solid ${style.dividerLine.color || "transparent"
                } !important`
            );
        },
        //下拉时间面板-底部样式
        timePanelFootHandle(el, style) {
            //下拉时间面板-底部分割线样式
            el.style.borderTopWidth =
                style.footDividerLine.width + "px";
            el.style.borderTopColor =
                style.footDividerLine.color || "transparent";

            //下拉时间面板-底部按钮样式
            let cancelEl = el.getElementsByClassName("cancel")[0];
            let confirmEl = el.getElementsByClassName(
                "confirm"
            )[0];
            this.fontHandle(cancelEl, style.cancelBtn);
            this.fontHandle(confirmEl, style.confirmBtn);
        },
        //日历面板-底部分割线和按钮加样式
        calendarFooterHandle(el, firstBtn, firstBtnHover, confirmBtn, confirmBtnHover) {
            let footDividerLine = this.calendarStyle.footDividerLine;
            let footer = el.getElementsByClassName(
                "el-picker-panel__footer"
            )[0];
            footer.style.borderTopWidth = footDividerLine.width + "px";
            footer.style.borderTopColor =
                footDividerLine.color || "transparent";

            let buttons = footer.getElementsByTagName("button");
            this.confirmBtnHandle(buttons[0], firstBtn);
            buttons[0].onmouseover = (e) => {
                this.confirmBtnHandle(buttons[0], firstBtnHover);
            };
            buttons[0].onmouseout = (e) => {
                this.confirmBtnHandle(buttons[0], firstBtn);
            };

            this.confirmBtnHandle(buttons[1], confirmBtn);
            buttons[1].onmouseover = (e) => {
                this.confirmBtnHandle(buttons[1], confirmBtnHover);
            };
            buttons[1].onmouseout = (e) => {
                this.confirmBtnHandle(buttons[1], confirmBtn);
            };
        },
        loadLinkage(val) {
            if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                //console.log("loadLinkage -> evtList", evtList)
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === "change" && evtObj.explosive) {
                        let eventObj = {
                            data: {
                                value: val,
                            },
                        };
                        //console.log(val);
                        this.$evtBus.emit(evtObj.evtName, eventObj);
                    }
                }
            }
        },
        linkageConfChanged() {
            let linkage = this.compConf.linkage;
            //console.log("linkageConfChanged -> linkage", linkage)
            if (!linkage) {
                return;
            }
            let { linkEvents, linkRevEvents } = linkage;
            if (_.isArray(linkEvents)) {
                for (let i = 0; i < linkEvents.length; i++) {
                    let evtObj = linkEvents[i];
                    //this.$store.getters.getPreviewState为true代表预览时，只有在预览时才会执行默认触发
                    if (evtObj.evtType === 'change' &&
                        evtObj.explosive &&
                        evtObj.def.defTrigger &&
                        this.$store.getters.getPreviewState
                    ) {
                        if (evtObj.def.defType === 'index') {


                        } else if (evtObj.def.defType === 'val') {
                            let val = evtObj.def.defVal;
                            if (['datePoint', 'dateTimePoint'].includes(this.compConf.componentName)) {
                                this.value = val;
                            } else {
                                val = val.split(',')
                                this.value = val;
                            }
                        }
                    }
                }
            }
            if (_.isArray(linkRevEvents)) {
                for (let i = 0; i < linkRevEvents.length; i++) {
                    let evtRevObj = linkRevEvents[i];
                    let evtType = evtRevObj.evtName.split(":")[1];
                    this._clickByLinkAge(evtRevObj);
                }
            }
        },
        _clickByLinkAge(evtRevObj) {
            this.$evtBus.on(evtRevObj, (e) => {
                //设计时，初始化不执行；预览时，初始化执行
                //console.log(this.compId, e);
                //console.log(this.compData);
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
                if (this.compConf.data.datasource.type == 'static') {
                    this.updateMyChart(this.compData)
                } else {
                    this.updateCompData(false)
                }
            });
        },
        updateMyChart(compData) {
            if (_.isArray(compData) && compData.length) {
                let text = _.cloneDeep(compData[0][this.inKey]);
                console.log(`${this.compConf.compId}表达式解析前`, text);
                if (!text) {
                    return;
                }
                if (
                    text.toString().indexOf("${") !== -1 &&
                    text.toString().indexOf("}") !== -1
                ) {
                    text = this._getExpressionValue(text);
                    if (_.includes(text, ',')) {
                        text = text.split(',');
                    }
                }
                console.log(`${this.compConf.compId}表达式解析后`, text);
                if (_.isArray(text)) {
                    let arr = [];
                    text.map((item, i) => {
                        arr.push(util.dateFormat(item, this.valueFormat, this));
                    });
                    console.log(`${this.compConf.compId}格式转化后`, arr);
                    this.value = arr;
                } else if (_.isString(text)) {
                    text = util.dateFormat(text, this.valueFormat, this);
                    console.log(`${this.compConf.compId}格式转化后`, text);
                    this.value = text;
                }
            }
        },
        //数据类型发生改变时compData会发生改变，compData监听中会执行updateCompData(true)，然后执行updateChartData
        updateChartData() {
            //console.log(this.compData);
            if (this.flag) {
                if (this.compConf.data.datasource.type == 'static') {
                    this.updateMyChart(this.compData)
                } else {
                    this.updateMyChart(this.compData[0])
                }
            }
        },
    },
}