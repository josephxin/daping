export const menu = [{
        name: "统计图形",
        icon: 'icon-pie',
        hasMulti: true,
        children: [{
                name: "柱图",
                icon: 'icon-62',
                children: [
                    { name: "flexibleBar", alias: '通用柱图', img: require("../assets/image/thumb/basicbar.png") },
                    { name: "singleIndiBar", alias: '单指标柱图', img: require("../assets/image/thumb/basicbar.png") },
                    { name: "pictorialBar", alias: '象形柱图', img: require("../assets/image/thumb/pictorialbar.png") },
                    { name: "timelineBar", alias: '时间轴柱图', img: require("../assets/image/thumb/basicbar.png") },
                    { name: "stackXBar", alias: '堆叠柱图（横）', img: require("../assets/image/thumb/basicbar.png") },
                    { name: "stackYBar", alias: '堆叠柱图（竖）', img: require("../assets/image/thumb/basicbar.png") },
                    { name: "multiYBar", alias: '双y轴柱图', img: require("../assets/image/thumb/basicbar.png") },



                    // { name: "basicbar", alias: '基本柱图', img: require("../assets/image/thumb/basicbar.png") },
                    // { name: "tackbar", alias: '堆叠柱图', img: require("../assets/image/thumb/tackbar.png") },
                    // { name: "pianobar", img: require("../assets/image/thumb/pianobar.png"), alias: '钢琴柱图' },
                    // { name: "bothwaybar", img: require("../assets/image/thumb/bothwaybar.png"), alias: '双向对比柱图' },
                    // { name: "onewaybar", img: require("../assets/image/thumb/onewaybar.png"), alias: '单向对比柱图', },
                    // { name: "heapupbar", img: require("../assets/image/thumb/heapupbar.png"), alias: '堆叠柱图', },
                    // { name: "pictorialbar", img: require("../assets/image/thumb/pictorialbar.png"), alias: '象形柱图', },
                    // { name: "overlaychart", img: require("../assets/image/thumb/overlaychart.png"), alias: '柱折叠加柱图', },
                    // { name: "thermometerbar", img: require("../assets/image/thumb/thermometerbar.png"), alias: '温度计柱图', },
                    // { name: "negativebar", img: require("../assets/image/thumb/negativebar.png"), alias: '正负柱图' },
                    // { name: "multibar", img: require("../assets/image/thumb/multibar.png"), alias: '多维条形图', }
                ]
            },
            {
                name: '折线图',
                icon: 'icon-zhexiantu',
                children: [
                    { name: "flexibleLine", img: require("../assets/image/thumb/basicline.png"), alias: '通用折线图' },
                    { name: "singleIndiLine", img: require("../assets/image/thumb/basicline.png"), alias: '单指标折线图' },
                    { name: "areaLine", img: require("../assets/image/thumb/basicline.png"), alias: '面积折线图' },
                    { name: "stackAreaLine", img: require("../assets/image/thumb/basicline.png"), alias: '堆叠面积折线图' },
                    { name: "timeLineLine", img: require("../assets/image/thumb/basicline.png"), alias: '时间轴折线图' },
                    { name: "multiYLine", img: require("../assets/image/thumb/basicline.png"), alias: '双y轴折线图' },
                    // { name: "flexibleLine", img: require("../assets/image/thumb/basicline.png"), alias: '通用折线图' },
                    // { name: "arealine", img: require("../assets/image/thumb/arealine.png"), alias: '面积图' },
                    // { name: "basicline", img: require("../assets/image/thumb/basicline.png"), alias: '基本折线图' },
                    // { name: "bothwayline", img: require("../assets/image/thumb/bothwayline.png"), alias: '双向对比折线图' },
                    // { name: "sectionline", img: require("../assets/image/thumb/sectionline.png"), alias: '区间折线图' },
                ]
            },
            {
                name: '折柱混合图',
                icon: 'icon-zhexiantu',
                children: [
                    { name: "normalLineBar", img: require("../assets/image/thumb/basicline.png"), alias: '通用折线图' },
                    { name: "multiYLineBar", img: require("../assets/image/thumb/basicline.png"), alias: '双y轴混合图' },
                    { name: "timeLineMixinLineBar", img: require("../assets/image/thumb/basicline.png"), alias: '时间轴混合图' },
                ]
            },
            {
                name: '饼图',
                icon: 'icon-bingtutongji',
                children: [
                    { name: "commonPie", img: require("../assets/image/thumb/basicpie.png"), alias: '通用饼图' },
                    { name: "emptyInnerPie", img: require("../assets/image/thumb/basicpie.png"), alias: '空心饼图' },
                    { name: "rosePie", img: require("../assets/image/thumb/basicpie.png"), alias: '玫瑰饼图' },
                    { name: "annularpie", img: require("../assets/image/thumb/annularpie.png"), alias: '环形饼图' },

                    // { name: "basicpie", img: require("../assets/image/thumb/basicpie.png"), alias: '基本饼图' },

                    // { name: "progresspie", img: require("../assets/image/thumb/annularpie.png"), alias: '进度环形图' },
                    // { name: "nestpie", img: require("../assets/image/thumb/annularpie.png"), alias: '嵌套环形图' },
                    // { name: "halfrosepie", img: require("../assets/image/thumb/halfrosepie.png"), alias: '南丁格尔玫瑰图' },
                    // { name: "baserosepie", img: require("../assets/image/thumb/baserosepie.png"), alias: '玫瑰图' },
                    // { name: "multidimensionpie", img: require("../assets/image/thumb/multidimensionpie.png"), alias: '多维饼图' },
                ]
            },
            {
                name: '雷达图',
                icon: 'icon-leidatu',
                children: [
                    { name: "multiRadar", img: require("../assets/image/thumb/basicradar.png"), alias: '多维雷达图' },
                    { name: "singleRadar", img: require("../assets/image/thumb/basicradar.png"), alias: '单维雷达图' },
                    // { name: "pseudoRadar", img: require("../assets/image/thumb/pseudoRadar.png"), alias: '伪雷达图' }
                ]
            },
            {
                name: '散点图',
                icon: 'icon-leidatu',
                children: [
                    { name: "normalScatter", img: require("../assets/image/thumb/basicradar.png"), alias: '通用散点图' },
                    { name: "singleScatter", img: require("../assets/image/thumb/basicradar.png"), alias: '单指标散点图' },
                    { name: "bubbleScatter", img: require("../assets/image/thumb/basicradar.png"), alias: '气泡图' },
                ]
            },
            {
                name: '其他',
                icon: 'icon-other',
                children: [
                    { name: "cyclicbar", img: require("../assets/image/thumb/cyclicbar.png"), alias: '圆环百分比' },
                    // { name: "dashboard", img: require("../assets/image/thumb/dashboard.png"), alias: '仪表盘' },
                    { name: "scaledashboard", img: require("../assets/image/thumb/scaledashboard.png"), alias: '刻度仪表盘' },
                    { name: "liquidFill", img: require("../assets/image/thumb/liquidFill.png"), alias: '水滴图' },
                    { name: "graphchart", img: require("../assets/image/thumb/graphchart.png"), alias: '关系网图' },
                    { name: "pyarmidchart", img: require("../assets/image/thumb/pyarmidchart.png"), alias: '金字塔图' },
                    // { name: "splashes", img: require("../assets/image/thumb/splashes.png"), alias: '拓扑图' },
                    { name: "wordCloud", img: require("../assets/image/thumb/wordCloud.png"), alias: '词云' },
                    // { name: "wordCloud-ch", img: require("../assets/image/thumb/wordCloud-ch.png"), alias: '象形词云' },
                    { name: "progressBar", img: require("../assets/image/thumb/progressBar.png"), alias: '进度条' },
                    // { name: "abaciStat", img: require("../assets/image/thumb/abaciStat.png"), alias: '算盘统计' },
                    { name: "treeMap", img: require("../assets/image/thumb/treeMap.png"), alias: '树状图' },
                    // { name: "sankeyEnergy", img: require("../assets/image/thumb/sankeyEnergy.png"), alias: '桑基能源图' },
                    // { name: "mixlinebar", img: require("../assets/image/thumb/mixlinebar.png"), alias: '折柱混合图' },
                    // { name: "bubble", img: require("../assets/image/thumb/bubble.png"), alias: '气泡图' },
                    // { name: "arearainfall", img: require("../assets/image/thumb/arearainfall.png"), alias: '降雨量关系图' }, //放在折线图中实现
                    { name: "heatGrid", img: require("../assets/image/thumb/arearainfall.png"), alias: '二维热力图' },
                    { name: "boxplot", img: require("../assets/image/thumb/arearainfall.png"), alias: '盒须图' },
                    { name: "simple-surface", img: require("../assets/image/thumb/basicradar.png"), alias: '3D曲面图' }
                ]
            }
        ]
    }, {
        name: 'GIS专题',
        hasMulti: false,
        icon: 'icon-GIS',
        children: [
            { name: "baseMap", img: require("../assets/image/thumb/gisBaseMap.png"), alias: '基础地图' },
            { name: "pointVector", img: require("../assets/image/thumb/pointVector.png"), alias: '点矢量图' },
            { name: "lineVector", img: require("../assets/image/thumb/lineVector.png"), alias: '线矢量图' },
            { name: "regionVector", img: require("../assets/image/thumb/regionVector.png"), alias: '面矢量图' },
            { name: "heatMap", img: require("../assets/image/thumb/gisHeatMap.png"), alias: '热力图' },
            { name: "gridHeatMap", img: require("../assets/image/thumb/gridHeatMap.png"), alias: '格网热力图' },
            { name: "combHeatMap", img: require("../assets/image/thumb/combHeatMap.png"), alias: '蜂巢热力图' },
            { name: "clusterMap", img: require("../assets/image/thumb/clusterMap.png"), alias: '点聚合图' },
            { name: "strengthMap", img: require("../assets/image/thumb/strengthMap.png"), alias: '强度线图' },
            { name: "trackLineMap", img: require("../assets/image/thumb/trackLineMap.png"), alias: '迁徙图' },
            { name: "classSymbolMap", img: require("../assets/image/thumb/classSymbolMap.png"), alias: '等级符号图' },
            { name: "classColorMap", img: require("../assets/image/thumb/classColorMap.png"), alias: '等级颜色图' },
            { name: "cusColorMap", img: require("../assets/image/thumb/cusColorMap.png"), alias: '高级等级颜色图' },
        ]
    },
    //  {
    //     name: 'Echarts地图',
    //     hasMulti: false,
    //     icon: 'icon-earth',
    //     children: [
    //         { name: "eLineMapS", img: require("../assets/image/thumb/migration.png"), alias: '飞线图1' },
    //         { name: "eLineMapF", img: require("../assets/image/thumb/basicmap.png"), alias: '飞线图2' },
    //         { name: "worldMap", img: require("../assets/image/thumb/worldMap.png"), alias: '世界地图' },
    //         { name: "cartesianMap", img: require("../assets/image/thumb/cartesianMap.png"), alias: '笛卡尔地图' },
    //         { name: "scatter", img: require("../assets/image/thumb/scatter.png"), alias: '点亮中国' },
    //     ]
    // }, 
    {
        name: '通用组件',
        hasMulti: true,
        icon: 'icon-common',
        children: [{
                name: '指标卡',
                icon: 'icon-indicator',
                children: [
                    { name: "singleIndicator", img: require("../assets/image/thumb/indicatorSingle.png"), alias: '指标卡-单行单指标' },
                    { name: "oneIndicator", img: require("../assets/image/thumb/indicatorOne.png"), alias: '指标卡-单指标' },
                    { name: "twoIndicator", img: require("../assets/image/thumb/indicatorTwo.png"), alias: '指标卡-双指标' },
                ]
            },
            {
                name: '时间组件',
                icon: 'icon-date',
                children: [
                    { name: "datePoint", img: require("../assets/image/thumb/datePoint.png"), alias: '日期选择器' },
                    { name: "datePointMulti", img: require("../assets/image/thumb/datePointMulti.png"), alias: '日期选择器-多选' },
                    { name: "dateRange", img: require("../assets/image/thumb/dateRange.png"), alias: '日期选择器-范围' },
                    { name: "dateTimePoint", img: require("../assets/image/thumb/dateTimePoint.png"), alias: '日期时间选择器' },
                    { name: "dateTimeRange", img: require("../assets/image/thumb/dateTimeRange.png"), alias: '日期时间选择器-范围' },
                    { name: "numberClock", img: require("../assets/image/thumb/numberClock.png"), alias: '数字时钟' },
                    { name: "circleClock", img: require("../assets/image/thumb/circleClock.png"), alias: '圆形时钟' },
                    { name: "timeAxis", img: require("../assets/image/thumb/timeAxis.png"), alias: '时间轴' },
                    { name: "timeLine", img: require("../assets/image/thumb/timeAxis.png"), alias: '时间轴2' }
                ]
            },
            {
                name: '表格',
                icon: 'icon-table',
                children: [
                    { name: "compCommonTable", img: require("../assets/image/thumb/table.png"), alias: '普通表格' },
                    { name: "compScrollTable", img: require("../assets/image/thumb/table.png"), alias: '滚动表格' },
                ]
            },
            {
                name: '容器',
                icon: 'icon-container',
                children: [
                    { name: "compContainer", img: require("../assets/image/thumb/container.png"), alias: '容器' },
                    { name: "containerDrill", img: require("../assets/image/thumb/container.png"), alias: '钻取容器' },
                    { name: "customIframe", img: require("../assets/image/thumb/iframe.png"), alias: 'iframe' },
                ]
            },
            {
                name: '可编辑组件',
                icon: 'icon-edit',
                children: [
                    { name: "textMain", img: require("../assets/image/thumb/textMain.png"), alias: '标题栏' },
                    { name: "formInput", img: require("../assets/image/thumb/formInput.png"), alias: '输入框' },
                    { name: "formTabs", img: require("../assets/image/thumb/tab.png"), alias: 'tab组件' },
                    { name: "formSelect", img: require("../assets/image/thumb/select.png"), alias: '下拉组件' },
                ]
            },
            {
                name: '多媒体',
                icon: 'icon-media',
                children: [
                    { name: "customImage", img: require("../assets/image/thumb/customImage.png"), alias: '自定义图片' },
                    { name: "videoMain", img: require("../assets/image/thumb/video.png"), alias: '视频' },
                ]
            },
            {
                name: '装饰',
                icon: 'icon-decorate',
                children: [
                    { name: "decoratorBorder", img: require("../assets/image/thumb/decoratorBorder.png"), alias: '边框特效' },
                    { name: "decoratorDecoration", img: require("../assets/image/thumb/decoratorDecoration.png"), alias: '页面特效' },
                ]
            },
            {
                name: '其它',
                icon: 'icon-other',
                children: [
                    { name: "countup", img: require("../assets/image/thumb/countup.png"), alias: '翻牌器' },
                    { name: "defaultEcharts", img: require("../assets/image/thumb/iframe.png"), alias: '自定义echarts' }
                ]
            }
        ]
    }
]