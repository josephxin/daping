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
export default {
    name: "datePoint",
    mixins: [AbstractDatePickerComp],
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

