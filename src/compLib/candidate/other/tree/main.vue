<script>
import AbstractEchartBarComp from "@/compLib/commons/echart/AbstractEchartBarComp";
function transformTree (data, options = {}) {
    data = _.cloneDeep(data)
    const {keyField,childField,parentField} = options
    const tree = []
    const record = {}
    for (let i = 0, len = data.length; i < len; i++) {
        const item = data[i]
        const id = item[keyField]
        if (!id) continue
        if (record[id]) {
            item[childField] = record[id]
        } else {
            item[childField] = record[id] = []
        }
        if (item[parentField]) {
            const parentId = item[parentField]
            if (!record[parentId]) record[parentId] = []
            record[parentId].push({...item,name : item[keyField]})
        } else {
            tree.push({...item,name : item[keyField]})
        }
    }
    return tree
}
export default {
  name: "treeMap",
  mixins: [AbstractEchartBarComp],
  methods: {
    convertChartData(data){
        let style = this.styleConf;
        style = this.convertExpression(style)
        data = this.compConf.data.datasource.type === 'static' ? data : data[0]
        let keyField = style.nameKey
        let parentField = style.parentKey
        try{
            data = transformTree(data,{keyField,childField:'children',parentField})
            return data
        }catch{
            return []
        }
    },
    option() {
        let style = this.styleConf;
        style = this.convertExpression(style)
        let option = {
            color : style.colors,
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            legend: {
                show: style.legend.isShow,
                type : style.legend.type,
                width : style.legend.width,
                itemWidth: style.legend.iconWidth,
                icon: style.legend.icon,
                itemHeight: style.legend.iconHeight,
                itemGap: style.legend.itemGap,
                textStyle: {
                    color: style.legend.fontColor,
                    fontSize: style.legend.fontSize,
                    fontWeight: style.legend.fontBold,
                    fontFamily: style.legend.fontFamily,
                    padding : _.cloneDeep(style.legend.padding).split(",").map(item => {return parseInt(item)})
                },
                formatter: function (name) {
                    return name;
                },
                left: style.legend.position.split("-")[0],
                top: style.legend.position.split("-")[1],
                orient: style.legend.layout
            },
            series: [{
                    type: 'tree',
                    name: '',
                    data: this.chartData,
                    layout : style.layout,
                    orient : style.orient,
                    left : style.left,
                    top: style.top,
                    right : style.right,
                    bottom : style.bottom,
                    symbol : style.symbol,
                    symbolSize: style.symbolSize,
                    initialTreeDepth: 10,
                    label: {
                        show : style.label.show,
                        position: style.label.position,
                        verticalAlign: style.label.verticalAlign,
                        align: style.label.align,
                        fontSize: style.label.fontSize,
                        color : style.label.color,
                        backgroundColor : style.label.backgroundColor,
                        lineHeight :style.label.lineHeight,
                        distance :style.label.distance,
                        padding : style.label.padding ? _.cloneDeep(style.label.padding).split(",").map(item => {return parseInt(item)}) : 0
                    },
                    leaves: {
                        label: {
                            show : style.leaves.show,
                            position: style.leaves.position,
                            verticalAlign: style.leaves.verticalAlign,
                            align: style.leaves.align,
                            fontSize: style.leaves.fontSize,
                            color : style.leaves.color,
                            backgroundColor : style.leaves.backgroundColor,
                            lineHeight :style.leaves.lineHeight,
                            distance :style.leaves.distance,
                            padding : style.leaves.padding ? _.cloneDeep(style.leaves.padding).split(",").map(item => {return parseInt(item)}) : 0
                        }
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        };
      return option;
    },
    _click(params){
        console.log(params)
    }
  }
};
</script>
