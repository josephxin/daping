<template>
    <div :style="style" class="time-axis">
        <svg/>
    </div>
</template>

<script>
import {styleName} from "../CompTemplateReg";
import * as d3 from "d3";
import AbstractComp from "../commons/AbstractComp";

const ENTRY_TYPE = 2; //条目型

export default {
    name: "timeAxis",
    mixins: [AbstractComp],
    mounted: function () {
        this.loadCom();
    },
    data() {
        return {
            nextIndex: 0, //上次选中的索引
            scale: null, //时间轴的比例尺,
            evtList: [],
        };
    },

    computed: {
        style: function () {
            return {
                width: this.compConf.box.width + "px",
                height: this.compConf.box.height + "px",
                background: this.styleConf.bgColor,
            };
        },
        content: function () {
            return this.compConf[styleName].content;
        },
    },
    methods: {
        loadCom() {
            let svg = d3.select(this.$el).select("svg");
            svg.selectAll("g").remove();
            let width = this.compConf.box.width,
                height = this.compConf.box.height;
            svg.attr("width", width).attr("height", height);
            let gObj = svg
                .append("g")
                .attr("transform", "translate(0," + height / 2 + ")");
            let spacing = Number(this.styleConf.spacing);
            let type = this.styleConf.type,
                min = 0,
                max = 0;
            if (type == ENTRY_TYPE) {
                //2为条目型，平分处理
                min = 1;
                max = this.chartData.value.length;
            } else {
                // 其他的为1和3，分别是数值型和时间型
                min = d3.min(this.chartData.value);
                max = d3.max(this.chartData.value);
            }
            var defs = svg.append("defs");
            var filter = defs.append("filter").attr("id", "drop-shadow").attr("x", "0")
                .attr("y", "-20%").attr("height", "440%").attr("width", "230%");
            filter
                .append("feGaussianBlur")
                .attr("stdDeviation", 6)
                .attr("result", "blurOut");
            filter
                .append("feOffset")
                .attr("in", "SourceAlpha")
                .attr("dx", 0)
                .attr("dy", 0)
                .attr("result", "offOut");
            filter
                .append("feBlend")
                .attr("in", "SourceGraphic")
                .attr("in2", "blurOut")
                .attr("mode", "multiply");
            // 初始化比例尺
            this.scale = d3
                .scaleLinear()
                .domain([min, max])
                .range([0, width - 2 * spacing]);
            // 初始化时间线的矩形区域
            let rect = d3.path();
            let x1 = spacing;
            let x2 = width;
            let y1 = 0;
            let y2 = this.styleConf.lineHeight;
            rect.rect(spacing, 0, width - 2 * spacing, this.styleConf.lineHeight);
            let start = d3.path();
            start.moveTo(x1 - 40, y2 / 5);
            start.lineTo(x1 - 40, (y2 / 5) * 3);
            start.lineTo(x1, y2);
            start.lineTo(x1, 0);
            start.lineTo(x1 - 40, y2 / 5);
            let end = d3.path();
            end.moveTo(x2 - 50, 0);
            end.lineTo(x2 - 50, y2);
            end.lineTo(x2 - 10, (y2 / 5) * 3);
            end.lineTo(x2 - 10, y2 / 5);
            end.lineTo(x2 - 50, 0);
            // 绘制时间线的矩形区域
            gObj
                .append("path")
                .attr("d", rect)
                .attr("fill", this.styleConf.bgDefaultColor)
                .attr("opacity", 0.9)
                .style("filter", "url(#drop-shadow)");
            gObj
                .append("path")
                .attr("d", start)
                .attr("fill", this.styleConf.bgDefaultColor)
                .attr("opacity", 0.6)
                .style("filter", "url(#drop-shadow)");
            gObj
                .append("path")
                .attr("d", end)
                .attr("fill", this.styleConf.bgDefaultColor)
                .attr("opacity", 0.6)
                .style("filter", "url(#drop-shadow)");
            let that = this;
            gObj
                .append("line")
                .attr("x1", spacing)
                .attr("y1", this.styleConf.lineHeight / 2)
                .attr("x2", this.getPointSize(this.nextIndex) + spacing)
                .attr("y2", this.styleConf.lineHeight / 2)
                .style("stroke-width", this.styleConf.lineHeight / 2)
                .style("stroke", this.styleConf.bgSelectColor);

            // 遍历设置各个数据点
            let pointShape = this.getPointShape();
            this.chartData.value.forEach((item, index) => {
                let pos = this.getPointSize(index);
                let itemG = gObj.append("g");
                itemG.attr("transform", "translate(" + (pos + spacing) + "," + this.styleConf.lineHeight / 2 + ")");
                itemG
                    .append("path")
                    .attr("d", pointShape)
                    .attr("fill", this.styleConf.fillColor)
                    .attr("stroke", this.styleConf.selectColor)
                    .attr("fill", this.styleConf.selectColor)
                    .attr("fill-opacity", 0.3)
                    .on("click", function () {
                        that.loadLinkage(index);
                    });
                itemG
                    .append("path")
                    .attr("d", this.getPointShape(this.styleConf.size / 2))
                    .attr("fill", this.styleConf.fillColor)
                    .on("click", function () {
                        that.loadLinkage(index);
                    });
                itemG
                    .append("foreignObject")
                    .text(this.chartData.year[index])
                    .attr(
                        "transform",
                        "translate(" +
                        this.styleConf.rightOffset +
                        "," +
                        this.styleConf.bottomOffset +
                        ")"
                    )
                    .attr(
                        "style",
                        "height:100%;width:100%;font-family:" +
                        this.styleConf.fontFamily +
                        ";font-size:" +
                        this.styleConf.fontSize +
                        ";color:" +
                        this.styleConf.fontColor
                    );
            });
        },
        getPointSize(index) {
            let type = this.styleConf.type,
                pos = -1;
            if (type === ENTRY_TYPE) {
                pos = this.scale(index + 1);
            } else {
                pos = this.scale(this.chartData.value[index]);
            }
            return pos;
        },
        // 用户选择的形状
        getPointShape(r) {
            let path = d3.path(),
                shape = this.styleConf.shape;
            if (!r) {
                r = this.styleConf.size;
            }

            switch (shape) {
                case "1": // 圆形
                    path.arc(0, 0, r, 0, 360);
                    break;
                case "2": // 矩形
                    path.rect(-r, -r, r * 2, r * 2);
                    break;
                case "3": // 菱形
                    path.moveTo(-r, 0);
                    path.lineTo(0, -r);
                    path.lineTo(r, 0);
                    path.lineTo(0, r);
                    path.closePath();
                    break;
                case "4": // 上三角
                    path.moveTo(-r, r);
                    path.lineTo(r, r);
                    path.lineTo(0, -r);
                    path.closePath();
                    break;
                case "5": // 下三角
                    path.moveTo(-r, -r);
                    path.lineTo(r, -r);
                    path.lineTo(0, r);
                    path.closePath();
                    break;
                default:
                    // 圆形
                    path.arc(0, 0, r, 0, 360);
            }
            return path;
        },

        resize() {
            this.loadCom(false);
        },
        selectData(index) {
            // 清除上次选中的数据
            this.loadCom(false);
            // 高亮显示数据  this.getPointSize(index)
            let gObj = d3.select(this.$el).select("svg g");
            let currentObj = d3.select(gObj.selectAll("g").nodes()[index]);
            currentObj.select("path").attr("fill", this.styleConf.selectColor);
            currentObj
                .select("foreignObject")
                .attr("style", "height:100%;width:100%;font-family:" +
                    this.styleConf.fontFamily + ";font-size:" + this.styleConf.selectFontSize + ";color:" + this.styleConf.selectFontColor
                );

            // 选中时，在时间点图形外添加半透明图形
            currentObj
                .insert("path")
                .attr("d", this.getPointShape(this.styleConf.size * 1))
                .attr("fill", this.styleConf.selectColor);
            currentObj
                .insert("path")
                .attr("d", this.getPointShape(this.styleConf.size * 1.9))
                .attr("stroke", this.styleConf.selectColor)
                .attr("fill", this.styleConf.selectColor)
                .attr("fill-opacity", 0.3);
            this.nextIndex = index;
        },
        loadLinkage(index) {
            if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === 'click' && evtObj.explosive) {
                        let transData = this.compData[index];
                        let eventObj = {
                            data: transData,
                        };
                        this.$evtBus.emit(evtObj.evtName, eventObj);
                    }
                }
            }
            this.selectData(index)
        },
        convertChartData(data) {
            if (!data || !data.length) {
                return null;
            }
            let result = {
                year: [],
                value: [],
            };
            data.forEach((item) => {
                result.year.push(item.year);
                result.value.push(item.value);
            });
            return result;
        },

        styleConfChanged() {
            // 样式变化时，触发
            this.loadCom(false);
        },

        compDataChanged() {
            // 数据变化时，触发
            this.loadCom(false);
        },
        next() {
            if (this.nextIndex >= this.chartData.value.length) {
                return -1;
            }
            if (this.compConf.linkage.cycleEvents.refEvt === `${this.compConf.compId}:click`) {
                this.loadLinkage(this.nextIndex)
            } else {
                this.selectData(this.nextIndex);
            }
            this.nextIndex++
            if (this.nextIndex >= this.chartData.value.length) {
                return -1;
            }
            return this.nextIndex;
        },
        reset() {
            this.nextIndex = 0;
            if (this.compConf.linkage.cycleEvents.refEvt === `${this.compConf.compId}:click`) {
                this.loadCom(false);
            } else {
                this.loadCom(false);
            }
            return this.nextIndex;
        },
        linkageConfChanged(val) {
            if (!this.compConf.linkage) {
                return;
            }
            if (this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === 'click'
                        && evtObj.explosive
                        && evtObj.def.defTrigger
                        && evtObj.def.defType === 'index'
                        && this.$store.getters.getPreviewState
                    ) {
                        this.loadLinkage(evtObj.def.defVal)
                    }
                }
            }
            let cycleConf = this.compConf.linkage.cycleEvents;
            if (cycleConf && cycleConf.hasOwnProperty('sid')) {
                let cycleObj = _.cloneDeep(cycleConf);
                cycleObj.next = this.next;
                cycleObj.reset = this.reset;
                this.$evtBus.registerCycle(cycleObj)
            }
        },
    },
};
</script>

<style>
</style>
