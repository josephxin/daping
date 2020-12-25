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
                <ul class="one-indicator">
                    <li
                        class="indicator"
                        v-for="(t, i) in item"
                        :key="i"
                        @click.stop="indicatorClick(index, i)"
                        :style="itemStyle(index, i)"
                    >
                        <div class="indicator-left">
                            <img
                                class="icon"
                                :src="iconValue(t, index, i)"
                                alt=""
                                :style="iconStyle(index, i)"
                                v-if="iconValue(t, index, i)"
                            />
                            <i class="el-icon-postcard default-icon" v-else></i>
                        </div>
                        <div class="indicator-right">
                            <div class="indicator-right_top">
                                <span
                                    class="name"
                                    :title="t[fieldMap.name]"
                                    :style="elementStyle('Name', index, i)"
                                    >{{ t[fieldMap.name] || "--" }}</span
                                >
                                <img
                                    class="mark"
                                    :src="t[fieldMap.mark]"
                                    alt=""
                                    v-if="t[fieldMap.mark]"
                                />
                            </div>
                            <div class="indicator-right_bottom">
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
                            </div>
                        </div>
                    </li>
                </ul>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import AbstractIndicatorComp from "@/compLib/commons/indicator/AbstractIndicatorComp";
export default {
    name: "oneIndicator",
    mixins: [AbstractIndicatorComp],
    components: {},
    data() {
        return {
            
        };
    },
    created() {},
    beforeDestroy() {},
};
</script>

<style lang="scss">
@import '@/assets/styles/_lib-mixin.scss';
.one-indicator {
    @include flex-wrap;
    .indicator {
        display: flex;
        @include background-image-conf;
        .indicator-left {
            width: 68px;
            @include flex-center;
            .icon {
                display: block;
                max-width: 50px;
                max-height: 50px;
            }
            .default-icon {
                font-size: 50px;
                color: #a8bad5;
            }
        }
        .indicator-right {
            flex: 1;
            width: 0;
            margin-left: 10px;
            @include flex-column-center;
            .indicator-right_top {
                padding-right: 5px;
                display: flex;
                align-items: center;
                .name {
                    font-size: 14px;
                    color: #a8bad5;
                    @include no-wrap;
                }
                .mark {
                    margin-left: 20px;
                    max-width: 20px;
                    max-height: 20px;
                }
            }
            .indicator-right_bottom {
                padding-top: 15px;
                padding-right: 5px;
                display: flex;
                .value {
                    font-size: 24px;
                    color: #fff;
                    line-height: 1;
                    @include no-wrap;
                }
                .unit {
                    margin-left: 10px;
                    font-size: 14px;
                    color: #a8bad5;
                    display: flex;
                    align-items: flex-end;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>
