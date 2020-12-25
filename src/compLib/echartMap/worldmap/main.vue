<template>
    <div :style="style" class="world-map">
        <svg></svg>
        <div class="map-tooltip">这里是地图的提示框</div>
    </div>
</template>

<script>
    import {styleName} from "../../CompTemplateReg";
    import * as d3 from "d3";
    import AbstractComp from '../../commons/AbstractComp'

    export default {
        name: "worldMap",
        mixins: [AbstractComp],

        data() {
            return {
                projection: null,
                lineDatas: []
            }
        },

        mounted: function () {
            this.refreshMap(true);


        },

        computed: {

            style: function () {
                return {
                    width: this.compConf.box.width + "px",
                    height: this.compConf.box.height + "px",
                    background: this.compConf[styleName].bgColor
                };
            }
        },

        methods: {

            // 启动轮播
            startPlay() {
                if (!this.isOpenCarouse) {
                    return;
                }
                this.startCarousel(this.lineDatas);
            },

            refreshMap(isAdd) {

                let svg = this.getSvg();
                svg.attr("width", this.compConf.box.width)
                    .attr("height", this.compConf.box.height);

                this.projection = this.getProjection();

                var projection = this.projection;

                var path = d3.geoPath(projection);

                var graticule = d3.geoGraticule();

                let graticulePath = null, landPath = null, boundaryPath = null;
                if (isAdd) {
                    graticulePath = svg.append('path').attr('class', 'graticule');
                    landPath = svg.insert("g", ".graticule").attr("class", "land");
                    boundaryPath = svg.insert('path', '.graticule').attr('class', 'boundary');
                } else {
                    graticulePath = svg.select('.graticule');
                    landPath = svg.select(".land");
                    boundaryPath = svg.select('.boundary');
                }

                boundaryPath.attr('style', 'fill:none;stroke: ' + this.styleConf.borderColor + ';stroke-width:' + this.styleConf.borderWidth + ';');

                landPath.attr('style', 'fill:' + this.styleConf.landColor + ';stroke: ' + this.styleConf.borderColor + ';stroke-width:' + this.styleConf.borderWidth + ';');

                // 是否存在经纬度
                if (this.styleConf.isJWD) {
                    graticulePath.datum(graticule)
                        .attr("d", path)
                        .attr('style', 'stroke: ' + this.styleConf.jwdColor + ';stroke-width:' + this.styleConf.jwdWidth + ';');
                } else {
                    svg.select('.graticule').attr('d', null);
                }

                let that = this;
                d3.json("world_605kb.json").then(function (world) {
                    landPath.selectAll('path').remove();
                    landPath.selectAll('path').data(world.features).enter().append('path')
                        .attr("d", path)

                    that.initData();

                    if (isAdd) {
                        that.startPlay();
                    }
                });

            },

            initData() {
                // 清理点
                this.getSvg().selectAll('circle').remove();
                // 清理线
                this.getSvg().select('path.line').remove();

                // 加载数据
                let compData = this.chartData;
                if (compData) {
                    for (let com of compData) {
                        if (com.type == 'Point') {// 加载点
                            this.addPoint(com);
                            continue;
                        }
                        if (com.type == 'LineString') { // 加载路径
                            this.addPath(com);
                            continue;
                        }
                    }
                }

            },

            getProjection() {
                return d3
                    .geoAzimuthalEqualArea()
                    .scale(this.styleConf.scaleMap)
                    .rotate([this.styleConf.rotateY, this.styleConf.rotateX])
                    .clipAngle(this.styleConf.clipAngle)//
                    .translate([this.compConf.box.width / 2, this.compConf.box.height / 2])
                    .precision(0.1);
            },

            getPath(projection) {
                return d3.geoPath(projection);
            },

            getSvg() {
                return d3.select(this.$el).select("svg");
            },

            addPoint(point) {// point 对应数据配置中的一个数据对象
                let coordinate = point.coordinates[0];//[经度，纬度]

                let that = this;
                var site = this.getProjection()(coordinate);
                this.getSvg()
                    .append("circle")
                    .attr("r", this.styleConf.pointRadius)
                    .attr("fill", this.styleConf.pointColor)
                    .attr("transform", "translate(" + site[0] + "," + site[1] + ")")
                    .attr('lon', coordinate[0])
                    .attr('lat', coordinate[1])
                    .attr('cn_name', point.name)
                    .attr('desc', point.desc)
                    .on('click', function () {
                        // 恢复点击前的样式
                        d3.selectAll(".clicked")
                            .classed("clicked", false)
                            .attr("fill", that.styleConf.pointColor);

                        // 加载选中样式
                        d3.select(this)
                            .classed("clicked", true)
                            .attr("fill", that.styleConf.selectPointColor);

                        d3.select(".clicked").transition()
                            .duration(3000)
                            .ease(d3.easeLinear)
                            .styleTween("rotate", function () {
                                // 隐藏弹出框
                                d3.select('.map-tooltip').style('display', 'none').style('transform', 'rotate(0deg) scale(0.001)');

                                let projection = that.projection, path = that.getPath(projection);

                                let pathObj = that.getSvg().selectAll("path");
                                let circleObj = that.getSvg().selectAll('circle');
                                let r = d3.interpolate(projection.rotate(), [-d3.select(this).attr('lon'), -d3.select(this).attr('lat')]);
                                return function (t) {
                                    projection.rotate(r(t));
                                    pathObj.attr("d", path);
                                    circleObj.attr("transform", function () {
                                        let site = projection([d3.select(this).attr('lon'), d3.select(this).attr('lat')]);
                                        return "translate(" + site[0] + "," + site[1] + ")";
                                    });
                                    return r(t);
                                }
                            }).on("end",
                            function () {
                                // 弹出提示
                                let currentElement = d3.select('.clicked');
                                let mapEle = d3.select('.map-tooltip');
                                let site = that.projection([currentElement.attr('lon'), currentElement.attr('lat')]);
                                console.log(site)
                                let cn_name = currentElement.attr('cn_name')
                                let content = '<span>' + cn_name + '</span>';
                                content += '<div>' + currentElement.attr('desc') + '</div>'
                                mapEle.html(content);
                                mapEle.transition().duration(1000).ease(d3.easeLinear).style('display', 'block')
                                    .style('top', site[0] + 'px').style('left', site[1] + 'px').styleTween('transform', function () {
                                    return d3.interpolateString(this.style.transform, 'rotate(360deg) scale(1)');
                                }).on('end', function () {
                                    // 加载联动
                                    that.loadLinkage(cn_name);
                                });
                            }
                        );

                    });
            },

            addPath(line) {

                this.getSvg().append('path').datum(line)
                    .attr('class', 'line')
                    .attr('style', 'stroke: ' + this.styleConf.pathColor + ';stroke-width: ' + this.styleConf.pathWidth + ';')
                    .attr("d", this.getPath(this.getProjection()))

            },

            resize() {
                this.refreshMap(false);
            },

            styleConfChanged() {
                this.refreshMap(false);
            },

            compDataChanged() {// 数据变化时，触发
                this.refreshMap(false);
            },

            loadLinkage(name) {
                if (!this.linkageConf) {
                    return;
                }

                // 激活事件
                if (this.linkageConf.linkages) {
                    let linkageData = {};

                    this.linkageConf.linkages.forEach(function (item) {
                        linkageData[item.name] = name;
                    });

                    this.triggerLinkage(linkageData);
                }

            },

            selectData(index) {
                d3.select(this.getSvg().selectAll('circle').nodes()[index]).dispatch('click');
            },

            carouselExe(curDataIndex, preDataIndex) {
                if (curDataIndex == null) {
                    return;
                }
                this.selectData(this.lineDatas.indexOf(curDataIndex));
            },

            getCarouselDataIndexes() {
                return this.lineDatas;
            },

            convertChartData(data) {
                if (!data || !data.length) {
                    return null;
                }
                let result = [];
                this.lineDatas = [];
                data.forEach((item) => {
                    if (item.type == 'Point') {
                        this.lineDatas.push(item);
                    }
                    result.push(item);

                });
                return result;
            },

            linkageMonitor() {
                if (this.linkageData) {
                    console.log('时间地图响应联动：', this.linkageData);
                    let values = Object.values(this.linkageData);
                    let indexV = -1;
                    this.lineDatas.forEach((item, index) => {
                        if (item.name == values[0]) {
                            indexV = index;
                        }
                    })
                    if (indexV == -1) {
                        return;
                    }
                    selectData(indexV);
                }

            }
        }
    };
</script>

<style>

    .map-tooltip {
        width: 200px;
        background: #f3f3f3;
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        color: #33333e;
        font-size: 14px;
    }

    .map-tooltip span {
        font-size: 16px;
        padding: 10px;
        display: inline-block;
    }

    .map-tooltip div {
        margin: 10px;
    }

    .line {
        fill: none;
    }

    .graticule {
        fill: none;
        stroke-opacity: 0.5;
    }
    .land {
        fill: rgb(15, 133, 202);
    }

    .boundary {
        fill: none;
        stroke-width: 0.5px;
    }
</style>
