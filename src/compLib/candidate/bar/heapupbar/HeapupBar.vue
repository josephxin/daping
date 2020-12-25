<script>
	import AbstractEchartBarComp from '@/compLib/commons/echart/AbstractEchartBarComp'

	export default {
		name:'BothwayBar',
		mixins:[AbstractEchartBarComp],
		methods:{
			option(){
				var nationalImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAAxCAMAAACRUGVjAAABDlBMVEXLHSPOKCPOLCPdbSXaYCXsrifPLiTMHyPQMyT33Sn33incaSXMIiPQNCTaXiXLHiPmkyfzzSj0zynfcybSOyTfdCbonCfMISPNJSPNJyPnmSftsij11inTQSTPMSTYVyXdbCXljyfWTSXjhSbqpCfURyTRNyTLHyPzzinnmifutCjRNiTOKiPZXCXyxyjsrijRNSTcaCXjhibebybURCTSPiTwwCj00inYVCXqpSfzyyj22Sn33Cn11SnVSSTNJiPyyCjVSiTjhybWTiXpoSfOKyPxxCjtsyjvuyjjiCbbZCXXUiXPMCTYViXVRyTqpyfZWiXNKCPQMiTrqCf23CncZyX11ynTQCTrqifROSSHKO95AAAA80lEQVR4Ae3BZUJiYRiA0YeGl+7uBnuYtlux2/0vxJb4ey/Ndw7TzmBkwExmi5WBsPHN7hCniwFwe/ji9fkDwRADEI7wJRqLJxiIZMpFhxVI4/WiS8YhWfokc3k0sxfeFEVKhUI5XeFT1VwTM5rF69LRaPJpYdGytLyCdqsp+bQWpeNHC11+/pI3v//Qw4BOf+XNvyoDFP8v6xsim/SwbaGLWbZ3Kg3ZpceeGV0i+wcQLR7SYS0eHZ800c57yof2GR2tdTlnwC4u61cM0rWLjJcbBsdTuXUxYJtyl60yWPfysPvIQNnazScG7xlFURRFUZSOV1ZEFjz5VOjqAAAAAElFTkSuQmCC'
				let bgSvg = 'data:image/svg+xml;base64,PHN2ZyBpZD0i5p+x54q2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNSIgaGVpZ2h0PSIyMzYiIHZpZXdCb3g9IjAgMCAzNSAyMzYiPgogIDxtZXRhZGF0YT48P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiLz4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+PC9tZXRhZGF0YT4KPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogIzAyMDEwNTsKICAgICAgICBzdHJva2U6ICMyNjQ5Nzg7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAycHg7CiAgICAgICAgb3BhY2l0eTogMC44OwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6ICMxNjJjMzI7CiAgICAgICAgb3BhY2l0eTogMC43OwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8cmVjdCBpZD0i55+p5b2iXzE1MDlf5ou36LSdXzMiIGRhdGEtbmFtZT0i55+p5b2iIDE1MDkg5ou36LSdIDMiIGNsYXNzPSJjbHMtMSIgeD0iMSIgeT0iMSIgd2lkdGg9IjMzIiBoZWlnaHQ9IjIzNCIgcng9IjEyIiByeT0iMTIiLz4KICA8cmVjdCBpZD0i55+p5b2iXzE1MDlf5ou36LSdXzMtMiIgZGF0YS1uYW1lPSLnn6nlvaIgMTUwOSDmi7fotJ0gMyIgY2xhc3M9ImNscy0yIiB4PSI3IiB5PSI3IiB3aWR0aD0iMjEiIGhlaWdodD0iMjI0IiByeD0iOCIgcnk9IjgiLz4KPC9zdmc+Cg=='
				var category = [
				    "东北",
				    "华东",
				    "华中",
				    "西南",
				    "华北"
				];
				var barData = [{
				        "name": "低危",
				        "color": "#3ca418",
				        "value": [
				            10,
				            41,
				            22,
				            52,
				            72
				        ]
				    },
				    {
				        "name": "中危",
				        "color": "#31d0e9",
				        "value": [
				            64,
				            40,
				            24,
				            97,
				            39
				        ]
				    },
				    {
				        "name": "高危",
				        "color": "#ed902c",
				        "value": [
				            69,
				            36,
				            58,
				            49,
				            90
				        ]
				    },
				    {
				        "name": "危急",
				        "color": "#d8436b",
				        "value": [
				            94,
				            7,
				            67,
				            33,
				            20
				        ]
				    }
				]
				let seriesData = barData.map((d, i) => {
				    let arr = []
				    if (i > 0) {
				        let before = barData[i - 1]
				        arr = d.value.map((v, j) => {
				            let res = v
				            res += before.value[j]
				            d.value[j] = res
				            return res
				        })
				    } else {
				        arr = d.value
				    }
				    console.log(arr)
				    return {
				        name: d.name,
				        data: arr,
				        type: 'pictorialBar',
				        symbol: 'rect',
				        symbolSize: [40, 8],
				        barWidth: 10,
				        itemStyle: {
				            normal: {
				                barBorderRadius: 52,
				                color: d.color
				            }
				        },
				        stack: 'all',
				        symbolRepeat: true,
				        animationEasing: 'elasticOut',
				        animationDelay: function(dataIndex, params) {
				            return params.index * 30 * 1.1;
				        },
				        z: -i
				    }
				})
				let backgroundData = [280, 280, 280, 280, 280]
				let option = {
				    backgroundColor: 'rgba(0,0,0,0)',
				    legend: {
				        data: barData.map((d) => d.name),
				        textStyle: {
				            color: '#fff'
				        }
				    },
				    grid: {
				      top: 30,
				      left: 30,
				      right: 30,
				      bottom: 90
				    },
				    xAxis: {
				        data: category,
				        show: true,
				        axisLabel: {
				            color: '#fff',
				            formatter: (value, index) => {
				                return [
				                    '{national|}',
				                    '{title|'+ value + '}'
				                ].join('\n')
				            },
				            rich: {
				                title: {
				                    color: '#eee',
				                    align: 'center',
				                    lineHeight: 10
				                },
				                national: {
				                    height: 30,
				                    backgroundColor: {
				                        image: nationalImg
				                    },
				                    lineHeight: 40
				                    
				                },
				            }
				        },
				        axisLine: {
				            show: false
				        },
				        splitLine: {
				            show: false
				        },

				    },
				    yAxis: {
				        show: false,
				        splitLine: {
				            show: false
				        },
				        axisLine: {
				            show: false
				        },
				        axisLabel: {
				            color: '#fff'
				        }
				    },
				    series: [].concat(
				    //     {
				    //     name: '背景',
				    //     type: 'bar',
				    //     barWidth: '50%',
				    //     data: backgroundData,
				    //     itemStyle: {
				    //         normal: {
				    //             color: 'rgba(255,255,255,0.1)',
				    //             borderColor: '#45A0CF'
				    //         }
				    //     },
				    //     zlevel: 9
				    // },
				    {
				        data: backgroundData,
				        type: 'pictorialBar',
				        symbol: 'image://' + bgSvg,
				        symbolOffset: ['-45%', 10],
				        z: -100
				    },
				    seriesData),
				    animation: true
				};

				return option;
			}
		}
	}
</script>
