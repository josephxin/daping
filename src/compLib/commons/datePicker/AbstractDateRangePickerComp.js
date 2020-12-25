import AbstractDatePickerComp from './AbstractDatePickerComp.js'

export default {
    name: 'AbstractDateRangePickerComp',
    mixins: [AbstractDatePickerComp],
    data() {
        return {
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
    },
    methods: {
        focusHandle(vueComponent) {
            //console.log('focusHandle', 222);
            //console.log(vueComponent);
            this.hasClick = false;
            this.focusFlag = false;
            //下拉日历面板是后添加到body中的，所有需要$nextTick方法等渲染完之后获取dom元素
            this.$nextTick(() => {
                this.calendarStyleChanged();
                let el = this.$refs.dateRef.$el;
                this.borderHandle(el, this.inputStyle.focusBorder);
            })
        },
        blurHandle() {
            this.focusFlag = true;
            let el = this.$refs.dateRef.$el;
            this.borderHandle(el, this.inputStyle.defaultBorder);
        },
        inputStyleChanged() {
            //console.log(this.$refs.dateRef);
            let el = this.$refs.dateRef.$el;
            el.style.backgroundColor = this.inputStyle.bgColor || "transparent";
            this.borderHandle(el, this.inputStyle.defaultBorder);
            el.onmouseover = (e) => {
                if (this.focusFlag) {
                    this.borderHandle(el, this.inputStyle.hoverBorder);
                }
            };
            el.onmouseout = (e) => {
                if (this.focusFlag) {
                    this.borderHandle(el, this.inputStyle.defaultBorder);
                }
            };

            let inputEls = el.getElementsByClassName("el-range-input");
            inputEls.forEach((item, i) => {
                this.fontHandle(item, this.inputStyle);
                item.style.backgroundColor =
                    this.inputStyle.bgColor || "transparent";
            });

            let prefixIcon = el.getElementsByClassName("el-range__icon")[0];
            prefixIcon.style.fontSize = this.inputStyle.prefixSize + "px";
            prefixIcon.style.color =
                this.inputStyle.prefixColor || "transparent";

            let suffixIcon = el.getElementsByClassName(
                "el-range__close-icon"
            )[0];
            suffixIcon.style.fontSize = this.inputStyle.clearSize + "px";
            suffixIcon.style.color =
                this.inputStyle.clearColor || "transparent";

            let separatorEl = el.getElementsByClassName(
                "el-range-separator"
            )[0];
            separatorEl.style.fontSize =
                this.inputStyle.rangeSeparatorSize + "px";
            separatorEl.style.color =
                this.inputStyle.rangeSeparatorColor || "transparent";
        },
        calendarStyleChanged() {
            let el = document.getElementsByClassName(this.popperClass)[0];
            //console.log(el);
            //日历面板如果没被展开过，则找不到面板元素，所以需要拦截
            if (!el) {
                return;
            }
            el.style.backgroundColor =
                this.calendarStyle.bgColor || "transparent";
            el.style.boxShadow = this.calendarStyle.boxShadow;
            this.borderHandle(el, this.calendarStyle.border);

            let arrowEl = el.getElementsByClassName("popper__arrow")[0];
            //这里必须使用style.cssText不能使用style.borderBottomColor，elementUi可能会重写样式，后面的写法不生效
            //切换日期选择器类型时，popper__arrow元素丢失，应该是elementUi的问题，所以此处需要判断
            if (arrowEl) {
                arrowEl.style.cssText = `left: 35px; border-bottom-color: ${this.calendarStyle.arrowColor || "transparent"
                    } !important`;
            }

            //如果type为datetimerange，则在dateTimeRange.vue文件内处理相关逻辑
            if (this.type == 'datetimerange') {
                this.dateTimeRange(el)
            }

            //中间分割线样式
            let isLeft = el.getElementsByClassName("is-left")[0];
            let middleLine = this.calendarStyle.middleLine;
            isLeft.style.borderRightStyle = middleLine.type;
            isLeft.style.borderRightWidth = middleLine.width + "px";
            isLeft.style.borderRightColor = middleLine.color || "transparent";

            //日历顶部文本样式处理
            let headers = el.getElementsByClassName(
                "el-date-range-picker__header"
            );
            let headText = this.calendarStyle.headText;
            headers.forEach((item, i) => {
                let div = item.getElementsByTagName("div")[0];
                this.fontHandle(div, headText);
            });

            //日历顶部箭头样式处理
            let headIcons = el.getElementsByClassName(
                "el-picker-panel__icon-btn"
            );
            let headArrow = this.calendarStyle.headArrow;
            let headArrowHover = this.calendarStyle.headArrowHover;
            headIcons.forEach((item, i) => {
                this.headIconMouseHandle(item, headArrow);
                item.onmouseover = (e) => {
                    this.headIconMouseHandle(item, headArrowHover);
                };
                item.onmouseout = (e) => {
                    this.headIconMouseHandle(item, headArrow);
                };
                item.onclick = (e) => {
                    this.calendarStyleChanged();
                };
            });

            //日历主体样式处理
            let dividerLine = this.calendarStyle.dividerLine;
            let mainText = this.calendarStyle.mainText;
            let mainTextHover = this.calendarStyle.mainTextHover;
            let currentText = this.calendarStyle.currentText;
            let todayText = this.calendarStyle.todayText;
            let otherText = this.calendarStyle.otherText;
            let bodyEl = el.getElementsByClassName("el-picker-panel__body")[0];
            let tds = bodyEl.getElementsByTagName("td");

            if (this.type == "daterange" || this.type == "datetimerange") {
                //将上一次选中的样式清空
                let spans = bodyEl.getElementsByTagName("span");
                spans.forEach((item, i) => {
                    item.style = "";
                });
                //普通文本样式、分割线样式
                let ths = bodyEl.getElementsByTagName("th");
                ths.forEach((item, i) => {
                    item.style.borderBottomWidth = dividerLine.width + "px";
                    item.style.borderBottomColor =
                        dividerLine.color || "transparent";
                    this.fontHandle(item, mainText);
                });

                //将上一次范围内的背景颜色清空；鼠标（点击或者hover）td时选中和范围样式清空；普通文本样式；悬停文本样式
                tds.forEach((item, i) => {
                    let div = item.getElementsByTagName("div")[0];
                    div.style.backgroundColor = "";

                    if (item.classList.contains("available")) {
                        this.fontHandle(item, mainText);
                    }
                    item.onclick = (e) => {
                        this.hasClick = !this.hasClick;
                        setTimeout(() => {
                            this.calendarStyleChanged();
                        });
                    };
                    item.onmouseover = (e) => {
                        if (this.hasClick) {
                            setTimeout(() => {
                                this.calendarStyleChanged();
                            });
                        } else {
                            let target = e.target;
                            while (target.tagName != "TR") {
                                if (target.classList.contains("available")) {
                                    this.fontHandle(item, mainTextHover);
                                    break;
                                }
                                target = target.parentNode;
                            }
                        }
                    };
                    item.onmouseout = (e) => {
                        if (!this.hasClick) {
                            let target = e.target;
                            while (target.tagName != "TR") {
                                if (target.classList.contains("available")) {
                                    this.fontHandle(item, mainText);
                                    break;
                                }
                                target = target.parentNode;
                            }
                        }
                    };
                });
                //今日文本样式
                let today = bodyEl.getElementsByClassName("today")[0];
                if (today) {
                    let todaySpan = today.getElementsByTagName("span")[0];
                    this.fontHandle(todaySpan, todayText);
                }

                //还没有选择日期时没有in-range、start-date、end-date元素；有选中的日期才能找到
                //当今日日期和选中的日期（时间相同）时，使用选中的日期样式
                let startDate = bodyEl.getElementsByClassName("start-date")[0];
                if (startDate) {
                    let startDateSpan = startDate.getElementsByTagName(
                        "span"
                    )[0];
                    this.fontHandle(startDateSpan, currentText);
                    startDateSpan.style.backgroundColor =
                        currentText.bgColor || "transparent";
                }
                let endDate = bodyEl.getElementsByClassName("end-date")[0];
                if (endDate) {
                    let endDateSpan = endDate.getElementsByTagName("span")[0];
                    this.fontHandle(endDateSpan, currentText);
                    endDateSpan.style.backgroundColor =
                        currentText.bgColor || "transparent";
                }
                //上下月文本样式
                let prevMonths = bodyEl.getElementsByClassName("prev-month");
                let nextMonths = bodyEl.getElementsByClassName("next-month");
                prevMonths.forEach((item, i) => {
                    this.fontHandle(item, otherText);
                });
                nextMonths.forEach((item, i) => {
                    this.fontHandle(item, otherText);
                });
            } else if (this.type == "monthrange") {
                //将上一次选中的样式清空
                let cells = bodyEl.getElementsByClassName("cell");
                cells.forEach((item, i) => {
                    item.style = "";
                });

                tds.forEach((item, i) => {
                    let div = item.getElementsByTagName("div")[0];
                    div.style.backgroundColor = "";

                    let cell = item.getElementsByClassName("cell")[0];
                    this.fontHandle(cell, mainText);
                    item.onclick = (e) => {
                        this.hasClick = !this.hasClick;
                        setTimeout(() => {
                            this.calendarStyleChanged();
                        });
                    };
                    item.onmouseover = (e) => {
                        if (this.hasClick) {
                            setTimeout(() => {
                                this.calendarStyleChanged();
                            });
                        } else {
                            let target = e.target;
                            if (target.classList.contains("cell")) {
                                let td = target.parentNode.parentNode;
                                if (
                                    td.classList.contains("today") ||
                                    td.classList.contains("start-date") ||
                                    td.classList.contains("end-date")
                                ) {
                                    return;
                                }
                                this.fontHandle(cell, mainTextHover);
                            }
                        }
                    };
                    item.onmouseout = (e) => {
                        if (!this.hasClick) {
                            let target = e.target;
                            if (target.classList.contains("cell")) {
                                let td = target.parentNode.parentNode;
                                if (
                                    td.classList.contains("today") ||
                                    td.classList.contains("start-date") ||
                                    td.classList.contains("end-date")
                                ) {
                                    return;
                                }
                                this.fontHandle(cell, mainText);
                            }
                        }
                    };
                });
                //今日文本样式
                let today = bodyEl.getElementsByClassName("today")[0];
                if (today) {
                    let todayCell = today.getElementsByClassName("cell")[0];
                    this.fontHandle(todayCell, todayText);
                }
                //选中文本样式
                let startDate = bodyEl.getElementsByClassName("start-date")[0];
                this.monthSelectedEleHandle(startDate, currentText);
                let endDate = bodyEl.getElementsByClassName("end-date")[0];
                this.monthSelectedEleHandle(endDate, currentText);
            }
            //选中范围背景色
            let inRanges = bodyEl.getElementsByClassName("in-range");
            inRanges.forEach((item, i) => {
                let div = item.getElementsByTagName("div")[0];
                div.style.backgroundColor =
                    currentText.rangeBgColor || "transparent";
            });
        },
        monthSelectedEleHandle(el, style) {
            if (el) {
                let cell = el.getElementsByClassName("cell")[0];
                this.fontHandle(cell, style);
                cell.style.backgroundColor = style.bgColor || "transparent";
            }
        },
    },
}
