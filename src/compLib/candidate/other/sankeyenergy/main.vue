<script>
import AbstractEchartBarComp from "@/compLib/commons/echart/AbstractEchartBarComp";
import io from "@/util/io"
export default {
  name: "cartesianMap",
  mixins: [AbstractEchartBarComp],

  data() {
    return {
      curData: {nodes : [],links:[]}
    };
  },
  created() {
    
  },
  mounted(){
    this.chartLoading()
    io.get('/json/sankey_energy.json').then(res => {
      this.curData = res
      this.myChart && this.updateMyChart()
    })
  },
  methods: {
    option() {
      let option = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        series: [
          {
            type: "sankey",
            layout: "none",
            data: this.curData.nodes,
            links: this.curData.links,
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: "#aaa"
              }
            },
            lineStyle: {
              normal: {
                curveness: 0.5
              }
            },
            label:{
              color:'#ffffff'
            }
          }
        ]
      };

      return option;
    }
  }
};
</script>
