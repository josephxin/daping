<script>
	import AbstractEchartBarComp from '@/compLib/commons/echart/AbstractEchartBarComp'

	export default {
		name:'PyarmidChart',
		mixins:[AbstractEchartBarComp],
		methods:{
			option(){
				//缩放比例配置
				var scale = 1;


				//真实数据
				var ecahrtData = [{
				    value: 50, //百分比
				    name: '综合学科',
				}, {
				    value: 85,
				    name: '高等教育心理学',
				}, {
				    value: 50,
				    name: '高等教育学',
				}]

				//数据配置形成金字塔形状固定
				var data = [{
				    value: 20, //百分比
				    name: '综合学科',
				}, {
				    value: 40,
				    name: '高等教育心理学',
				}, {
				    value: 60,
				    name: '高等教育学',
				}]

				//富文本配置
				var rich = {
				    yellow: {
				        color: "#ffc72b",
				        fontSize: 19 * scale,
				        padding: [0, 0]
				    },
				    blue: {
				        color: "#3fdaff",
				        fontSize: 19 * scale,
				        padding: [0, 0]
				    },
				    white: {
				        color: "#fff",
				        align: 'left',
				        fontSize: 18 * scale,
				        padding: [0, 0]
				    },
				    tip: {
				        color: "#ffc72b",
				        fontSize: 32 * scale
				    },
				};
				//颜色配置
				var color = [{
				    type: 'linear',
				    x: 0,
				    y: 0,
				    x2: 0,
				    y2: 1,
				    colorStops: [{
				        offset: 0,
				        color: 'rgba(167,36,93,0.1)' // 0% 处的颜色
				    }, {
				        offset: 1,
				        color: 'rgba(167,36,93,0.4)' // 100% 处的颜色
				    }],
				    globalCoord: false // 缺省为 false
				}, {
				    type: 'linear',
				    x: 0,
				    y: 0,
				    x2: 0,
				    y2: 1,
				    colorStops: [{
				        offset: 0,
				        color: 'rgba(167,36,93,0.4)' // 0% 处的颜色
				    }, {
				        offset: 1,
				        color: 'rgba(167,36,93,0.7)' // 100% 处的颜色
				    }],
				    globalCoord: false // 缺省为 false
				}, {
				    type: 'linear',
				    x: 0,
				    y: 0,
				    x2: 0,
				    y2: 1,
				    colorStops: [{
				        offset: 0,
				        color: 'rgba(167,36,93,0.7)' // 0% 处的颜色
				    }, {
				        offset: 1,
				        color: 'rgba(167,36,93,0.9)' // 100% 处的颜色
				    }],
				    globalCoord: false // 缺省为 false
				}];

				let option = {
				    backgroundColor: 'rgba(0,0,0,0)',
				    legend: {
				        formatter: function(name) {
				            var sum = 0; //各科正确率总和
				            var averagePercent; //综合正确率
				            ecahrtData.forEach(function(value, index, array) {
				                sum += value.value;
				            });
				            averagePercent = (sum / ecahrtData.length).toFixed(2);
				            return '{tip|' + averagePercent + '%}{white|' + '  ' + '( 整体未通过率 )' + '}';
				        },
				        data: [ecahrtData[0].name],
				        // data: ['高等教育学'],
				        itemGap: 50,
				        left: 'center',
				        top: '5%',
				        icon: 'none',
				        textStyle: {
				            color: "#fff",
				            fontSize: 16 * scale,
				            rich: rich
				        },
				    },
				    calculable: true,
				    color: color,
				    series: [{
				        name: '金字塔',
				        type: 'funnel',
				        left: '7%',
				        top: '28%',
				        bottom:"5%",
				        width:'62%',
				        sort: 'ascending',
				        funnelAlign: 'center',
				        gap: 1,
				        label: {
				            normal: {
				                show: true,
				                position: 'right',
				                // textStyle: {
				                //     fontSize: 16 * scale
				                // },
				                formatter: function(params) {
				                    var percent = 0;
				                    ecahrtData.forEach(function(value, index, array) {
				                        if(params.name == value.name){
				                            percent = value.value;
				                        }
				                    });

				                    return '{yellow|' + percent + '}{white|%}\n{circle|}\n{blue|' + params.name + '}';
				                },
				                rich: rich
				            },
				        },
				        labelLine: {
				            normal: {
				                length: 55 * scale,
				                lineStyle: {
				                    width: 2 * scale,
				                    type: 'solid',
				                    color: "#093a50"
				                }
				            }
				        },
				        itemStyle: {
				            normal: {
				                borderColor: '#fff',
				                borderWidth: 0
				            }
				        },
				        data: data,
				    }]
				};

				return option;
			}
		}
	}
</script>
