<script>
import AbstractEchartBarComp from "@/compLib/commons/echart/AbstractEchartBarComp";

let debug = true;
export default {
    name: "DefaultEcharts",
    mixins: [AbstractEchartBarComp],
    methods: {
        option() {
            "use strict"
            let style = this.styleConf;
            let data = this.chartData;
            let option = {};
            //TODO: 过滤非法关键字
            option = new Function(style.code)(); // 动态解析option配置参数
            return option
            // console.log(data,this.compData);
            let legend = Array.from(data.classify);

            legend.unshift('图例');

            let gridData = data.legends.map(function (a) {
                let tmp = Array.from(a.data);
                tmp.unshift(a.name);
                return tmp;
            });
            gridData.unshift(legend);

            option.dataset = {
                source: gridData
            }

            // eval(style.code);

            return option;
        },


        _getDataTypeValue(params, type) {
            if (!type) {
                return;
            }

            if (type == "legend") {
                return params.name;
            }

            if (type == "value") {
                return params.value;
            }
        },
        _getDataItemByCarouse(dataIndex) {
            let result = null;
            let data = this.chartData;
            data.legends.forEach(function (item) {
                if (item.name == dataIndex) {
                    result = item;
                }
            });

            if (result == null) {
                console.log(
                    "xxxxxxxxxxxxxxx>[",
                    this.compConf.compId,
                    "]",
                    data,
                    dataIndex
                );
            }
            return result;
        },
    },
    mounted: function () {

    }
};
</script>
