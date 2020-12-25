<script>
import AbstractEchartComp from "../../commons/echart/AbstractEchartComp";
import {BJData, geoCoordMap, Province} from "./geo.js";
import '../../commons/china.js'

export default {
    name: "BasicMap",
    mixins: [AbstractEchartComp],
    data() {
        return {
            curentCity: null
        };
    },
    computed: {
        lineData() {
        }
    },
    methods: {
        option() {
            let option = {
                geo: {
                    map: "china",
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: "transparent",
                            borderColor: "#3fdaff",
                            borderWidth: 2,
                            shadowColor: "rgba(63, 218, 255, 0.5)",
                            shadowBlur: 30
                        },
                        emphasis: {
                            areaColor: "#2B91B7"
                        }
                    }
                },
                series: [
                    {
                        type: "effectScatter",
                        coordinateSystem: "geo",
                        zlevel: 2,
                        rippleEffect: {
                            brushType: "stroke"
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "right",
                                formatter: "{b}",
                                fontSize: 24
                            }
                        },
                        symbolSize: function (val) {
                            return val[2] / 4;
                        },
                        itemStyle: {
                            normal: {
                                color: "#a6c84c"
                            }
                        },
                        data: BJData.map(function (dataItem) {
                            return {
                                name: dataItem[1].name,
                                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                            };
                        })
                    },
                    {
                        type: "lines",
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 7,
                            trailLength: 0.7,
                            color: "#fff",
                            symbolSize: 5
                        },
                        lineStyle: {
                            normal: {
                                color: "#a6c84c",
                                width: 0,
                                curveness: 0.2
                            }
                        },
                        data: this.convertData(BJData)
                    }
                ]
            };

            return option;
        },
        convertData(data) {
            var res = [];
            var fromCoord = geoCoordMap[this.getCity(this.curentCity)];
            var toCoord = geoCoordMap["北京"];
            res.push([
                {
                    coord: fromCoord
                },
                {
                    coord: toCoord
                }
            ]);

            // console.log(5555,res)

            return res;
        },
        carouselExe: function (curDataIndex, preDataIndex) {
            // console.log(111,curDataIndex)
            if (preDataIndex) {
                this.myChart.dispatchAction({
                    type: "geoUnSelect",
                    name: preDataIndex
                });
            }

            this.curentCity = curDataIndex;

            this.myChart.dispatchAction({
                type: "geoSelect",
                name: curDataIndex
            });

            this.myChart.setOption(this.option());
        },
        getProvince(city) {
            let result = null;
            Province.forEach(function (item) {
                if (item[0] == city) result = item[1];
            });
            return result;
        },
        getCity(province) {
            let result = null;
            Province.forEach(function (item) {
                if (item[1] == province) result = item[0];
            });
            return result;
        }
    },
    mounted: function () {
        let me = this;
        let items = [];
        BJData.forEach(function (item) {
            if (item[1].name == "北京") {
                return;
            }
            items.push(me.getProvince(item[1].name));
        });

        // console.log(items)
        this.startCarousel(items);
    }
};
</script>
