import { CompState } from './CompContext.js'
import ComInterface from "@/compLib/commons/ComInterface";

export default {
    name: 'AbstractComp',
    mixins: [ComInterface],
    data: function() {
        return {
            chartData: null,
            nextIndex: 0, //轮播索引
            compDataStatus: 'loading', //当前组件数据状态
            defaultColors: [
                '#04d6ef',
                '#ef58ea',
                '#ff9e87',
                '#0cc2ff',
                '#fad860',
                '#9bca63',
                '#fe8463',
                '#975fe5',
                '#dc81d2',
                '#8d98b3'
            ]
        }
    },
    watch: {
        'compDataStatus': {
            handler: function(newVal) {
                if (newVal === 'loading') {
                    this.chartLoading()
                }
            }
        }
    },
    methods: {
        draw() { // 【抽象方法】初始化绘制图表方法
        },
        chartLoading() {
            this.myChart && this.myChart.showLoading({
                // text: '数据加载中...',
                text: '',
                color: '#666',
                textColor: '#fff',
                maskColor: 'rgba(115, 170, 229, 0)',
                zlevel: 0,
                fontSize: 30,
                showSpinner: true,
                spinnerRadius: 10,
                lineWidth: 5
            })
        },
        // 设置组件显示或隐藏
        _toggleCompShow(ctrlShow = false, show = true, compId) {
            if (ctrlShow) {
                document.getElementById(`${compId}`).style.transition = show ? 'all .3s ease-out' : ''
                document.getElementById(`${compId}`).style.transform = show ? 'scale(1)' : 'scale(0)'
            }
        },
    },
    created: function() {
        this.updateState(CompState.CREATE)
    },
    mounted: function() {
        this.updateChartData(this.compData)
        this.draw()
        this.updateState(CompState.RUNNING)
        this.$nextTick(() => {
            this.linkageConfChanged()
        })
    },
    destroyed: function() {
        this.updateState(CompState.DESTROY)
    },
    render: function(createElement) {
        let compId = this.compConf.compId
        return createElement('div', {
            attrs: {
                id: compId
            },
            style: {
                left: '0px',
                top: '0px',
                width: '100%',
                height: '100%',
                position: 'absolute'
            }
        })
    }
}