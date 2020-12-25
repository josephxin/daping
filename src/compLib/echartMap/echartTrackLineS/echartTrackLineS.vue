<template>
    <div :id="id" class="demopie"></div>
</template>
<script>
import echarts from 'echarts'
import '../../commons/china.js'
import option from './option';

export default {
    name: "Migration",
    data() {
        return {
            id: this.compConf.compId ? this.compConf.compId : 'defalutMapComponent',
            myChart: null
        }
    },
    props: ['compConf'],
    mounted() {
        let start = new Date().getTime();
        this.draw();
        console.log("加载飞线图用时：", new Date().getTime() - start);
    },
    methods: {
        draw() {
            this.myChart = echarts.init(document.getElementById(this.id));
            this.myChart.setOption(option);
        },
        resize() {
            this.myChart.resize();
        }
    }
}
</script>
<style scoped>
.demopie {
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 5px #ff0000;
    text-align: center;
}
</style>
