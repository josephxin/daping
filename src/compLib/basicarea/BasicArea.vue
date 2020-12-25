<script>
import AbstractEchartComp from '../commons/echart/AbstractEchartComp'

export default {
    name: 'BasicArea',
    mixins: [AbstractEchartComp],
    computed: {
        option() {
            let style = this.style;
            let data = this.chartData;

            let series = [];
            if (data.legends) {
                data.legends.forEach(function (legend) {
                    series.push({
                        type: 'line',
                        name: legend.name,
                        data: legend.data,
                        areaStyle: {}
                    })
                });
            } else if (data.data) {
                series.push({
                    type: 'line',
                    data: data.data,
                    areaStyle: {}
                })
            }

            let option = {
                backgroundColor: style.backgroundColor,
                xAxis: {
                    type: 'category',
                    data: data.classify
                },
                yAxis: {
                    type: 'value'
                },
                series: series
            }

            return option;
        }
    }
}
</script>
