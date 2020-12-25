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
        :start-placeholder="inputStyle.startPlaceholder"
        :end-placeholder="inputStyle.endPlaceholder"
        :range-separator="inputStyle.rangeSeparator"
        :unlink-panels="calendarStyle.unlinkPanels"
        :prefix-icon="inputStyle.prefixIcon"
        :clearable="inputStyle.clearable"
        :clear-icon="inputStyle.clearIcon"
        @focus="focusHandle"
        @blur="blurHandle"
    >
    </el-date-picker>
</template>
<script>
import AbstractDateRangePickerComp from "@/compLib/commons/datePicker/AbstractDateRangePickerComp";
import util from "@/util/util";

export default {
    name: "dateTimeRange",
    mixins: [AbstractDateRangePickerComp],
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
        dateTimeRange(el) {
            //console.log('dateTimeRange');
            let timeArrow = this.calendarStyle.timeArrow;
            let timePanel = this.calendarStyle.timePanel;
            let firstBtn = this.calendarStyle.clearBtn;
            let firstBtnHover = this.calendarStyle.clearBtnHover;
            let confirmBtn = this.calendarStyle.confirmBtn;
            let confirmBtnHover = this.calendarStyle.confirmBtnHover;

            let timeHead = el.getElementsByClassName(
                "el-date-range-picker__time-header"
            )[0];
            //日历面板-时间部分样式处理
            this.timeSectionHandle(timeHead);

            //日历面板-顶部时间-箭头；只能用styleSheets来添加样式，给style加样式不成功，可能是elementUi自身的问题
            document.styleSheets[0].addRule(
                `.${this.popperClass} .el-date-range-picker__time-header>.el-icon-arrow-right`,
                `font-size: ${timeArrow.arrowSize}px !important; color: ${timeArrow.arrowColor || 'transparent'} !important;`
            );

            //下拉时间面板样式
            let timePanelEls = timeHead.getElementsByClassName("el-time-panel");
            timePanelEls.forEach((item, i) => {
                this.timePanelHandle(item, timePanel);
            });

            //下拉时间面板-主体分割线
            this.timePanelMainDividerLineHandle(timePanel);

            //下拉时间面板-底部样式
            let timePanelFootEls = timeHead.getElementsByClassName(
                "el-time-panel__footer"
            );
            timePanelFootEls.forEach((item, i) => {
                this.timePanelFootHandle(item, timePanel);
            });

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

