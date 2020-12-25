<template>
    <div class="indicator-wrapper" :style="boxStyle">
        <el-carousel
            trigger="click"
            :height="boxHeight"
            :direction="direction"
            :loop="loop"
            :autoplay="autoplay"
            :interval="interval"
            :arrow="arrow"
            :indicator-position="indicatorPosition"
        >
            <el-carousel-item
                v-for="(item, index) in convertData"
                :key="index"
                :label="index + 1"
            >
                <ul class="single-indicator">
                    <li
                        class="indicator"
                        v-for="(t, i) in item"
                        :key="i"
                        @click.stop="indicatorClick(index, i)"
                        :style="itemStyle(index, i)"
                    >
                        <div class="icon-wrap">
                            <img
                                class="icon"
                                :src="iconValue(t, index, i)"
                                alt=""
                                :style="iconStyle(index, i)"
                                v-if="iconValue(t, index, i)"
                            />
                            <i class="el-icon-postcard default-icon" v-else></i>
                        </div>
                        <span
                            class="name"
                            :title="t[fieldMap.name]"
                            :style="elementStyle('Name', index, i)"
                            >{{ t[fieldMap.name] || "--" }}</span
                        >
                        <span
                            class="value"
                            :title="t[fieldMap.value]"
                            :style="elementStyle('Value', index, i)"
                            >{{ t[fieldMap.value] || "--" }}</span
                        >
                        <span
                            class="unit"
                            :style="elementStyle('Unit', index, i)"
                            >{{ t[fieldMap.unit] || "个" }}</span
                        >
                    </li>
                </ul>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import AbstractIndicatorComp from "@/compLib/commons/indicator/AbstractIndicatorComp";
export default {
    name: "singleIndicator",
    mixins: [AbstractIndicatorComp],
    components: {},
    data() {
        return {};
    },
    created() {},
    beforeDestroy() {},
};
</script>

<style lang="scss">
@import "@/assets/styles/_lib-mixin.scss";
.single-indicator {
    @include flex-wrap;
    .indicator {
        box-sizing: border-box;
        padding-right: 5px;
        @include flex-row-center;
        @include background-image-conf;
        .icon-wrap {
            margin-right: 4px;
            width: 15%;
            height: 100%;
            @include flex-center;
            .icon {
                display: block;
                max-width: 70%;
                max-height: 70%;
            }
            .default-icon {
                font-size: 20px;
                color: #a8bad5;
            }
        }
        .name {
            margin-right: 4px;
            width: 25%;
            font-size: 14px;
            color: #a8bad5;
            line-height: 1;
            @include no-wrap;
        }
        .value {
            margin-right: 4px;
            flex: 1;
            width: 0;
            font-size: 18px;
            color: #fff;
            line-height: 1;
            @include no-wrap;
        }
        .unit {
            width: 34px;
            font-size: 12px;
            color: #a8bad5;
            line-height: 1;
            @include no-wrap;
        }
    }
}
</style>
