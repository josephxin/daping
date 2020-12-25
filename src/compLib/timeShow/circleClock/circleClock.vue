<template>
    <canvas ref="circleClockRef" class="circle-clock"></canvas>
</template>

<script>
import AbstractComp from "@/compLib/commons/AbstractComp";
import util from "@/util/util";
import { mapGetters } from "vuex";
import { onlyUpdateAttr } from "@/components/props/edit/EditCompReg";
export default {
    name: "circleClock",
    mixins: [AbstractComp],
    components: {},
    data() {
        return {
            timer: null,
        };
    },
    computed: {
        ...mapGetters({ activeComp: "getFirstActiveComp" }),
    },
    watch: {},
    created() {},
    mounted() {
        this.styleConfChanged();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        styleConfChanged() {
            //console.log(this.styleConf);
            let canvas = this.$refs.circleClockRef;
            let ct = canvas.getContext("2d");
            let clockRadius = this.styleConf.clockRadius; //时钟的半径最小值为70
            canvas.width = clockRadius * 2;
            canvas.height = clockRadius * 2;
            let actualRadius = clockRadius - 5;
            let excircleWidth = this.styleConf.excircleWidth; //最小值为1
            let excircleColor = this.styleConf.excircleColor;
            let fillColor = this.styleConf.fillColor;
            let smallTickWidth = this.styleConf.smallTickWidth;//最小值为1
            let smallTickColor = this.styleConf.smallTickColor;
            let bigTickWidth = this.styleConf.bigTickWidth;//最小值为1
            let bigTickColor = this.styleConf.bigTickColor;
            let number = this.styleConf.number;
            let numberFontFamily = number.fontFamily;
            let numberFontWeight = number.fontWeight;
            let numberFontSize = number.fontSize;
            let numberFontColor = number.fontColor;
            let centerDotRadius = this.styleConf.centerDotRadius;
            let centerDotColor = this.styleConf.centerDotColor;
            let hourWidth = this.styleConf.hourWidth;
            let hourColor = this.styleConf.hourColor;
            let minuteWidth = this.styleConf.minuteWidth;
            let minuteColor = this.styleConf.minuteColor;
            let secondWidth = this.styleConf.secondWidth;
            let secondColor = this.styleConf.secondColor;
            clearInterval(this.timer);
            intervalFn();
            this.timer = setInterval(intervalFn, 1000);
            function intervalFn() {
                //清空画布
                ct.clearRect(0, 0, canvas.width, canvas.height);

                //背景颜色和边框
                ct.beginPath();
                //context.arc(x,y,r,sAngle,eAngle,counterclockwise);//counterclockwise可选。规定应该逆时针还是顺时针绘图。false = 顺时针，true = 逆时针。
                ct.arc(
                    clockRadius,
                    clockRadius,
                    actualRadius,
                    0 * (Math.PI / 180),
                    360 * (Math.PI / 180)
                );
                ct.fillStyle = fillColor;
                ct.fill();
                ct.lineWidth = excircleWidth;
                ct.strokeStyle = excircleColor;
                ct.stroke();

                //小刻度
                ct.beginPath();
                let tangleR = 0;
                for (let i = 0; i < 360; i++) {
                    let x;
                    let y;
                    ct.beginPath();
                    ct.moveTo(clockRadius, clockRadius);
                    x =
                        clockRadius +
                        Math.cos((tangleR * Math.PI) / 180) * actualRadius;
                    y =
                        clockRadius +
                        Math.sin((tangleR * Math.PI) / 180) * actualRadius;
                    tangleR++;
                    ct.lineWidth = smallTickWidth;
                    ct.strokeStyle = smallTickColor;
                    ct.lineTo(x, y);
                    ct.stroke();
                }
                ct.beginPath();
                ct.arc(
                    clockRadius,
                    clockRadius,
                    actualRadius - 10,
                    0 * (Math.PI / 180),
                    360 * (Math.PI / 180)
                );
                ct.fill();

                //大刻度
                ct.beginPath();
                let tangle = 0;
                for (let i = 0; i < 60; i++) {
                    let x;
                    let y;
                    ct.beginPath();
                    ct.moveTo(clockRadius, clockRadius);
                    x =
                        clockRadius +
                        Math.cos((tangle * Math.PI) / 180) * actualRadius;
                    y =
                        clockRadius +
                        Math.sin((tangle * Math.PI) / 180) * actualRadius;
                    /*弧度上的x,y坐标*/
                    tangle += 6;
                    ct.lineWidth = bigTickWidth;
                    ct.strokeStyle = bigTickColor;
                    ct.lineTo(x, y);
                    ct.stroke();
                }
                ct.beginPath();
                ct.arc(
                    clockRadius,
                    clockRadius,
                    actualRadius - 20,
                    0 * (Math.PI / 180),
                    360 * (Math.PI / 180)
                );
                ct.fill();

                //数字
                let tangleRR = -60;
                for (let i = 1; i <= 12; i++) {
                    ct.beginPath();
                    let x =
                        clockRadius +
                        Math.cos((tangleRR * Math.PI) / 180) *
                            (actualRadius - 40);
                    let y =
                        clockRadius +
                        Math.sin((tangleRR * Math.PI) / 180) *
                            (actualRadius - 40);
                    tangleRR += 30;
                    // 设置字体
                    ct.font = `${numberFontWeight} ${numberFontSize}px ${numberFontFamily}`;
                    // 设置颜色
                    ct.fillStyle = numberFontColor;
                    // 设置水平对齐方式
                    ct.textAlign = "center";
                    // 设置垂直对齐方式
                    ct.textBaseline = "middle";
                    // 绘制文字（参数：要写的字，x坐标，y坐标）
                    ct.fillText("" + i, x, y);
                    ct.fill();
                }
                //圆心点
                ct.beginPath();
                ct.arc(
                    clockRadius,
                    clockRadius,
                    centerDotRadius,
                    0 * (Math.PI / 180),
                    360 * (Math.PI / 180)
                );
                ct.fillStyle = centerDotColor;
                ct.fill();

                let time = new Date();
                let h = time.getHours();
                let m = time.getMinutes();
                let s = time.getSeconds();
                let mj = m * 6 + (s / 60) * 6 - 90;
                let sj = s * 6 - 90;
                let hj = h * 30 + (m / 60) * 30 + (s / 3600) * 30 - 90;
                let x0 =
                    clockRadius +
                    Math.cos((hj * Math.PI) / 180) * (actualRadius * 0.4); //时针
                let x1 =
                    clockRadius +
                    Math.cos((mj * Math.PI) / 180) * (actualRadius * 0.5); //分针
                let x2 =
                    clockRadius +
                    Math.cos((sj * Math.PI) / 180) * (actualRadius * 0.7); //秒针
                let y0 =
                    clockRadius +
                    Math.sin((hj * Math.PI) / 180) * (actualRadius * 0.4);
                let y1 =
                    clockRadius +
                    Math.sin((mj * Math.PI) / 180) * (actualRadius * 0.5);
                let y2 =
                    clockRadius +
                    Math.sin((sj * Math.PI) / 180) * (actualRadius * 0.7);
                ct.beginPath();
                ct.lineWidth = hourWidth;
                ct.strokeStyle = hourColor;
                ct.moveTo(clockRadius, clockRadius);
                ct.lineTo(x0, y0);
                ct.stroke();

                ct.beginPath();
                ct.lineWidth = minuteWidth;
                ct.strokeStyle = minuteColor;
                ct.moveTo(clockRadius, clockRadius);
                ct.lineTo(x1, y1);
                ct.stroke();

                ct.beginPath();
                ct.lineWidth = secondWidth;
                ct.strokeStyle = secondColor;
                ct.moveTo(clockRadius, clockRadius);
                ct.lineTo(x2, y2);
                ct.stroke();
            }
        },
    },
};
</script>

<style lang="scss">
@import "@/assets/styles/_lib-mixin.scss";
.circle-clock {
}
</style>
