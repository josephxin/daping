<template>
    <div class="card" :style="{width:cardWith+'px'}">
        <span class="icon"></span>
        <div class="card-head">
            <slot name="head"></slot>
        </div>
        <template v-if="popObj.show">
            <el-popover
                popper-class="pop-card-detail"
                :placement="popObj.placement"
                :offset="popObj.offset"
                :visible-arrow="true"
                :width="popObj.width"
                :trigger="popObj.trigger"
                :open-delay="popObj.delay"
            >
                <slot name="content">
                    <slot name="details"></slot>
                </slot>
                <div class="card-middle" slot="reference">
                    <div class="card-middle-list">
                        <slot name="referenceD"></slot>
                    </div>
                </div>
            </el-popover>
        </template>
        <template v-else>
            <div class="card-middle">
                <div class="card-middle-list">
                    <slot name="middle"></slot>
                </div>
            </div>
        </template>
        <div class="card-foot">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            width: 240,
            popDefault: {
                middleHeight: 105,
                show: false,
                offset: 0,
                trigger: "hover", //click,focus,hover
                width: 240,
                delay: 100,
                placement: "right-start" //top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
            }
        };
    },

    props: {
        cardWith: {
            type: Number,
            default: () => {
                return 270;
            }
        },
        popoverObj: {
            type: Object,
            default: () => {
                return {
                    middleHeight: 105,
                    show: false,
                    offset: 5,
                    delay: 100,
                    trigger: "hover", //click,focus,hover
                    width: 224,
                    placement: "right-start" //top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
                };
            }
        }
    },
    components: {},

    computed: {
        popObj() {
            return {...this.popDefault, ...this.popoverObj};
        }
    },
    mounted() {

    },
    beforeDestroy() {
    },

    methods: {}
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/stylus/card.styl';
.card {
    overflow: hidden;
    background-color: #ffffff;
    border: solid 1px #d3d3d3;
    border-radius: 4px;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 30px;
    position: relative;
    height: 100%;
    font-size: $baseFontSize;

    .icon {
        background-color: #d3d3d3;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        left: -44px;
    }

    .card-head {
        height: 40px;
        line-height: 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 90%;
        margin: 0px auto;
        margin-top: 5px;

        h2 {
            ellipsis();
            font-size: 16px;
            width: 70%;
            font-weight: normal;
            color: #37414c;
            text-align: left;
            margin: 0;
            line-height: 40px;
        }

        span {
            font-size: 12px;
            color: #747474;
        }
    }

    .card-middle {
        width: 90%;
        background-color: #f8f8f8;
        border: solid 1px #eee;
        margin: 0px auto;
        overflow: hidden;
        margin-top: 0px;
        padding-top: 8px;
        padding-bottom: 5px;
        cursor: pointer;

        .card-middle-list {
            width: 100%;

            /deep/ div {
                display: flex;
                align-items: baseline;
                width: 90%;
                margin: 0px auto;
                margin-bottom: 5px;
                line-height: 20px;
            }

            /deep/ .label-item {
                align-items: center;
            }

            /deep/ span {
                text-align: left;
                margin-left: 5px;
                color: #747474;
                display: inline-block;
                ellipsis();
            }
        }
    }
}

.card-foot {
    width: 90%;
    margin: 0px auto;
    overflow: hidden;
    overflow-x: visible;
    white-space: nowrap;
    height: 40px;
    line-height: 40px;
    text-align: right;

    span {
        color: $themeColor;
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
        position: relative;

        &.disabled {
            color: rgb(144, 147, 153);
            cursor: no-drop;
        }

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            margin-right: 0;

            &:after {
                content: '';
            }
        }

        &:after {
            content: '|';
            position: absolute;
            right: -12px;
            top: -1px;
        }
    }
}
</style>
<style lang="stylus">
.pop-card-detail
    background-color: #fff;
    box-shadow 0 1px 7px 0 rgba(83, 83, 83, .6)
    border-radius: 5px
    border 1px solid #d3d3d3
    padding 10px
    transform translateY(-45px)

    ul
        list-style-type none
        padding 5px 10px

        li
            display flex
            line-height 22px
            color #37414c
            font-size 14px
            padding 4px 0

            label
                width: 30%;
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
                text-align right
                margin-right 12px

.el-popper[x-placement^=right] {
    margin-left: 22px;
}

.el-popover
    .popper__arrow
        top 50% !important
        transform translateY(-50%)
</style>
