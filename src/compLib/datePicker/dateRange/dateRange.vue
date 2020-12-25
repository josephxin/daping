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
    name: "dateRange",
    mixins: [AbstractDateRangePickerComp],
    components: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {},
};
</script>

