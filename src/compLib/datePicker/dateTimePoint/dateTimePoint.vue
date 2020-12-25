<template>
    <el-date-picker
        ref="dateRef"
        class="my-date-picker"
        :style="boxStyle"
        :popper-class="`my-picker-panel ${popperClass}`"
        :type="type"
        v-model="value"
        :format="format"
        :value-format="valueFormat"
        :placeholder="inputStyle.placeholder"
        :prefix-icon="inputStyle.prefixIcon"
        :clearable="inputStyle.clearable"
        :clear-icon="inputStyle.clearIcon"
        @focus="focusHandle"
        @blur="blurHandle"
    >
    </el-date-picker>
</template>

<script>
import AbstractDatePickerComp from "@/compLib/commons/datePicker/AbstractDatePickerComp";
import util from "@/util/util";

import dayjs from "dayjs";
// 非标准时间需传入第二个参数指定时间格式
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
//console.log(dayjs(undefined).isValid());

export default {
    name: "dateTimePoint",
    mixins: [AbstractDatePickerComp],
    components: {},
    data() {
        return {};
    },
    computed: {},
    watch: {
        value: {
            handler(newVal, oldVal) {
                //console.log(newVal, oldVal);
                if (this.flag) {
                    this.$nextTick(() => {
                        this.calendarStyleChanged();
                    });
                }
            },
        },
    },
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {
        dateTimePoint(el) {
            //console.log("dateTimePoint");
            let timePanel = this.calendarStyle.timePanel;
            let firstBtn = this.calendarStyle.nowBtn;
            let firstBtnHover = this.calendarStyle.nowBtnHover;
            let confirmBtn = this.calendarStyle.confirmBtn;
            let confirmBtnHover = this.calendarStyle.confirmBtnHover;

            let timeHead = el.getElementsByClassName(
                "el-date-picker__time-header"
            )[0];
            //日历面板-时间部分样式处理
            this.timeSectionHandle(timeHead);

            //下拉时间面板样式
            let timePanelEl = timeHead.getElementsByClassName(
                "el-time-panel"
            )[0];
            this.timePanelHandle(timePanelEl, timePanel);

            //下拉时间面板-主体分割线
            this.timePanelMainDividerLineHandle(timePanel);

            //下拉时间面板-底部样式
            let timePanelFootEl = timeHead.getElementsByClassName(
                "el-time-panel__footer"
            )[0];
            this.timePanelFootHandle(timePanelFootEl, timePanel);

            //日历面板-底部分割线和按钮加样式
            this.calendarFooterHandle(
                el,
                firstBtn,
                firstBtnHover,
                confirmBtn,
                confirmBtnHover
            );
        },
    },
};
</script>

