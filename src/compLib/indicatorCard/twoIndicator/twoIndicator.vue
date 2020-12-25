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
                <ul class="two-indicator">
                    <li
                        class="indicator"
                        v-for="(t, i) in item"
                        :key="i"
                        @click.stop="indicatorClick(index, i)"
                        :style="itemStyle(index, i)"
                    >
                        <div class="indicator-top" :style="titleStyle">
                            <div class="icon-wrap">
                                <img
                                    class="icon"
                                    :src="iconValue(t, index, i)"
                                    alt=""
                                    :style="iconStyle(index, i)"
                                    v-if="iconValue(t, index, i)"
                                />
                                <i
                                    class="el-icon-postcard default-icon"
                                    v-else
                                ></i>
                            </div>
                            <span
                                class="name"
                                :title="t[fieldMap.name]"
                                :style="elementStyle('Name', index, i)"
                                >{{ t[fieldMap.name] || "--" }}</span
                            >
                        </div>
                        <div class="indicator-bottom">
                            <div class="cont">
                                <span
                                    class="label"
                                    :title="labelContent1"
                                    :style="elementStyle('Label', index, i)"
                                    >{{labelContent1 || '--'}}</span
                                >
                                <span class="text">
                                    <span
                                        class="value"
                                        :title="t[fieldMap.value]"
                                        :style="elementStyle('Value', index, i)"
                                        >{{ t[fieldMap.value] || "--" }}</span
                                    >
                                    <span
                                        class="unit"
                                        :style="elementStyle('Unit', index, i)"
                                        >{{ t[fieldMap.unit] || "" }}</span
                                    >
                                </span>
                            </div>
                            <div class="cont">
                                <span
                                    class="label"
                                    :title="labelContent2"
                                    :style="elementStyle('Label', index, i)"
                                    >{{labelContent2 || '--'}}</span
                                >
                                <span class="text">
                                    <span
                                        class="rate"
                                        :title="t[fieldMap.rate]"
                                        :style="elementStyle('Rate', index, i)"
                                        >{{ t[fieldMap.rate] || "--" }}</span
                                    >
                                    <span
                                        class="rateUnit"
                                        :style="elementStyle('RateUnit', index, i)"
                                        >{{ t[fieldMap.rateUnit] || "" }}</span
                                    >
                                </span>
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
    name: "twoIndicator",
    mixins: [AbstractIndicatorComp],
    components: {},
    data() {
        return {};
    },
    computed: {
        titleStyle() {
            let defaultTitle = this.compStyle.defaultTitle;
            return {
                height: defaultTitle.height + "px",
                backgroundColor: defaultTitle.backgroundColor,
                backgroundImage: `url(${defaultTitle.backgroundImage})`,
            };
        },
        labelContent1(){
            return this.compStyle.defaultLabel.content1;
        },
        labelContent2(){
            return this.compStyle.defaultLabel.content2;
        },
    },
    created() {},
    beforeDestroy() {},
    methods: {},
};
</script>

<style lang="scss">
@import "@/assets/styles/_lib-mixin.scss";
.two-indicator {
    @include flex-wrap;
    .indicator {
        display: flex;
        flex-direction: column;
        @include background-image-conf;
        .indicator-top {
            display: flex;
            align-items: center;
            height: 30px;
            @include background-image-conf;
            .icon-wrap {
                margin-right: 5px;
                width: 30px;
                height: 100%;
                @include flex-center;
                .icon {
                    max-width: 30px;
                    max-height: 30px;
                }
                .default-icon {
                    font-size: 22px;
                    color: #02928b;
                }
            }
            .name {
                line-height: 1;
                font-size: 14px;
                color: #fff;
                padding-right: 5px;
                @include no-wrap;
            }
        }
        .indicator-bottom {
            flex: 1;
            @include flex-column-center;
            padding-left: 30px;
            .cont {
                display: flex;
                align-items: center;
                padding-right: 5px;
                & + .cont {
                    margin-top: 12px;
                }
                .label {
                    width: 50px;
                    margin-right: 5px;
                    font-size: 14px;
                    color: #a8bad5;
                    line-height: 1;
                    @include no-wrap;
                }
                .text {
                    flex: 1;
                    width: 0;
                    display: flex;
                    .value {
                        font-size: 18px;
                        color: #fffff8;
                        line-height: 1;
                        @include no-wrap;
                    }
                    .rate {
                        font-size: 18px;
                        color: #ff7c93;
                        line-height: 1;
                        @include no-wrap;
                    }
                    .unit {
                        margin-left: 5px;
                        font-size: 12px;
                        color: #cccccc;
                        display: flex;
                        align-items: flex-end;
                        white-space: nowrap;
                    }
                    .rateUnit {
                        margin-left: 5px;
                        font-size: 12px;
                        color: #cccccc;
                        display: flex;
                        align-items: flex-end;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
}
</style>
