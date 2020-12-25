<script>
import AbstractEchartBarComp from "@/compLib/commons/echart/AbstractEchartBarComp";
import '../../commons/china.js'
import io from "@/util/io"
export default {
    name: "scatterWeibo",
    mixins: [AbstractEchartBarComp],
    data(){
        return {
            weiboData : [[],[],[]]
        }
    },
    created() {

    },
    mounted(){
        // 加载数据
        this.chartLoading()
        io.get('/json/scatter_weibo.json').then(data => {
            let weibo = data.map(function (serieData, idx) {
                var px = serieData[0] / 1000;
                var py = serieData[1] / 1000;
                var res = [[px, py]];
                for (var i = 2; i < serieData.length; i += 2) {
                    var dx = serieData[i] / 1000;
                    var dy = serieData[i + 1] / 1000;
                    var x = px + dx;
                    var y = py + dy;
                    res.push([x, y, 1]);
                    px = x;
                    py = y;
                }
                return res;
            });
            this.weiboData = weibo;
            this.myChart && this.updateMyChart()
        })
    },
    methods: {
        option() {
            let option = {
                // backgroundColor: '#404a59',
                title: {
                    text: "点亮中国",
                    left: "center",
                    top: "top",
                    textStyle: {
                        color: "#fff"
                    }
                },
                legend: {
                    left: "right",
                    top: "center",
                    orient: "vertical",
                    data: ["强", "中", "弱"],
                    textStyle: {
                        color: "#ccc"
                    }
                },
                geo: {
                    name: "强",
                    type: "scatter",
                    map: "china",
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: "#323c48",
                            borderColor: "#111"
                        },
                        emphasis: {
                            areaColor: "#2a333d"
                        }
                    }
                },
                series: [
                    {
                        name: "弱",
                        type: "scatter",
                        coordinateSystem: "geo",
                        symbolSize: 1,
                        large: true,
                        itemStyle: {
                            normal: {
                                shadowBlur: 2,
                                shadowColor: "rgba(37, 140, 249, 0.8)",
                                color: "rgba(37, 140, 249, 0.8)"
                            }
                        },
                        data: this.weiboData[0]
                    },
                    {
                        name: "中",
                        type: "scatter",
                        coordinateSystem: "geo",
                        symbolSize: 1,
                        large: true,
                        itemStyle: {
                            normal: {
                                shadowBlur: 2,
                                shadowColor: "rgba(14, 241, 242, 0.8)",
                                color: "rgba(14, 241, 242, 0.8)"
                            }
                        },
                        data: this.weiboData[1]
                    },
                    {
                        name: "强",
                        type: "scatter",
                        coordinateSystem: "geo",
                        symbolSize: 1,
                        large: true,
                        itemStyle: {
                            normal: {
                                shadowBlur: 2,
                                shadowColor: "rgba(255, 255, 255, 0.8)",
                                color: "rgba(255, 255, 255, 0.8)"
                            }
                        },
                        data: this.weiboData[2]
                    }
                ]
            };

            return option;
        }
    }
};
</script>
