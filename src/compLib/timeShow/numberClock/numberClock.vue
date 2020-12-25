<template>
    <div class="numberClock" :style="elementStyle">{{ dateTime }}</div>
</template>

<script>
import AbstractComp from "@/compLib/commons/AbstractComp";
import util from "@/util/util";
import { mapGetters } from "vuex";
import { onlyUpdateAttr } from "@/components/props/edit/EditCompReg";
export default {
    name: "numberClock",
    mixins: [AbstractComp],
    components: {},
    data() {
        return {
            dateTime: util.getNowTime("chinese"),
            timer: null,
        };
    },
    computed: {
        ...mapGetters({ activeComp: "getFirstActiveComp" }),
        elementStyle() {
            let obj = this.styleConf;
            return {
                fontFamily: obj.fontFamily,
                fontWeight: obj.fontWeight,
                fontSize: obj.fontSize + "px",
                color: obj.fontColor,
            };
        },
    },
    watch: {},
    created() {},
    mounted() {
        this.timer = setInterval(() => {
            this.dateTime = util.getNowTime("chinese");
        }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {},
};
</script>

<style lang="scss">
@import "@/assets/styles/_lib-mixin.scss";

</style>
