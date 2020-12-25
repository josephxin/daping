<template>
    <div :style="style" class="comText">
        <a :href="href" :target="target" :style="spanstyle" v-if="styleConf.showLink">{{ text }}</a>
        <span :style="spanstyle" v-html="text" v-else></span>
    </div>
</template>

<script>
import AbstractComp from "../commons/AbstractComp";

export default {
    name: "comText",
    mixins: [AbstractComp],
    data() {
        return {
            text: "",
        };
    },
    created() {
        this.$nextTick(() => {
            this.text = this.chartData[0].value;
        });
    },
    computed: {
        spanstyle() {
            return {
                color: this.styleConf.fontColor,
            };
        },
        style: function () {
            return {
                paddingTop: this.styleConf.paddingTop + 'px',
                paddingRight: this.styleConf.paddingRight + 'px',
                paddingBottom: this.styleConf.paddingBottom + 'px',
                paddingLeft: this.styleConf.paddingLeft + 'px',
                backgroundColor: this.styleConf.bgColor,
                backgroundPosition: this.styleConf.bgPosition,
                backgroundImage: `url(${this.styleConf.bgImage})`,
                fontSize: this.styleConf.fontSize + "px",
                fontFamily: this.styleConf.fontFamily,
                fontWeight: this.styleConf.fontWeight,
                width: this.compConf.box.width + "px",
                height: this.compConf.box.height + "px",
            };
        },
        href() {
            return this.styleConf.showLink
                ? this.styleConf.link
                : "javascript:void(0)";
        },
        target() {
            return this.styleConf.target;
        },
    },

    methods: {
        compDataChanged() {
            this.updateMyChart()
        },
        updateMyChart() {
            let text = _.cloneDeep(this.chartData[0].value);
            if (
                text.toString().indexOf("${") !== -1 &&
                text.toString().indexOf("}") !== -1
            ) {
                text = this._getExpressionValue(text);
            }
            this.text = text;
            //console.log("updateMyChart -> text", text)
        },
        _clickByLinkAge(evtRevObj) {
            this.$evtBus.on(evtRevObj, (e) => {
                //console.log("_clickByLinkAge -> e", e)
                let evt = {
                    sourceData: e.data,
                };
                let payload = {};
                payload[this.compConf.compId] = { [`${e.name}`]: evt };
                this.$store.commit("setLinkage", payload);
                this.updateMyChart();
            });
        },
        linkageConfChanged() {
            //console.log(this.compConf.linkage.linkRevEvents);
            if (this.compConf.linkage && this.compConf.linkage.linkRevEvents) {
                let evtRevList = this.compConf.linkage.linkRevEvents;
                for (let i = 0; i < evtRevList.length; i++) {
                    let evtRevObj = evtRevList[i];
                    let evtType = evtRevObj.evtName.split(":")[1];
                    //console.log("linkageConfChanged -> evtType", evtType)
                    if (['click','change'].includes(evtType)) {
                        this._clickByLinkAge(evtRevObj);
                    }
                }
            }
        },
    },
};
</script>

<style scoped lang='scss'>
@import "@/assets/styles/_lib-mixin.scss";
.comText {
    @include flex-row-center;
    box-sizing: border-box;
    background-repeat: no-repeat;
    line-height: 1.4;
    span,
    a {
        word-break: break-all;
        text-decoration: none;
    }
}
</style>
