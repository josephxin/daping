<template>
    <div :style="style" class="comVideo">
        <video
            :src="url"
            :controls = "compConfStyle.showControls"
            :autoplay = "compConfStyle.autoPlay"
            :loop = "compConfStyle.loop"
            :width ="videoWidth"
            :height = "videoHeight"
        >
        </video>
    </div>
</template>

<script>
import AbstractComp from "../commons/AbstractComp";
export default {
    name: "comVideo",
    mixins: [AbstractComp],
    data() {
        return {
            url: "",
        };
    },
    created() {
        this.$nextTick(() => {
            this.url = this.chartData[0].url;
        });
    },
    computed: {
        style() {
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
        compConfStyle(){
            return this.compConf.style
        },
        videoWidth(){
            return (this.compConf.box.width - this.compConfStyle.paddingLeft - this.compConfStyle.paddingRight) + 'px'
        },
        videoHeight(){
            return (this.compConf.box.height - this.compConfStyle.paddingTop - this.compConfStyle.paddingBottom) + 'px'
        }
    },

    methods: {
        compDataChanged() {
            this.updateMyChart()
        },
        updateMyChart() {
            let url = _.cloneDeep(this.chartData[0].url);
            if (
                url.toString().indexOf("${") !== -1 &&
                url.toString().indexOf("}") !== -1
            ) {
                url = this._getExpressionValue(url);
            }
            this.url = url;
        },
        _clickByLinkAge(evtRevObj) {
            let that = this;
            this.$evtBus.on(evtRevObj, (e) => {
                let evt = {
                    sourceData: e.data,
                };
                let payload = {};
                payload[this.compConf.compId] = { [`${e.name}`]: evt };
                that.$store.commit("setLinkage", payload);
                that.updateMyChart();
            });
        },
        linkageConfChanged() {
            if (this.compConf.linkage && this.compConf.linkage.linkRevEvents) {
                let evtRevList = this.compConf.linkage.linkRevEvents;
                for (let i = 0; i < evtRevList.length; i++) {
                    let evtRevObj = evtRevList[i];
                    let evtType = evtRevObj.evtName.split(":")[1];
                        this._clickByLinkAge(evtRevObj);
                }
            }
        },
    },
};
</script>
