<template>
  <div class="pageProp">
    <div class="title-pageConf">排布布局</div>
    <div class="screenProp">
      <div class="buttons-row">
        对齐
        <a href="#" @click="boxAlgin('top','min')" title="顶对齐"><img src="../../assets/image/align-v-top.png" /></a>
        <a href="#" title="底对齐" @click="boxAlgin('top','max')"><img src="../../assets/image/align-v-bottom.png" /></a>
        <a href="#" title="左对齐" @click="boxAlgin('left','min')"><img src="../../assets/image/align-h-left.png" /></a>
        <a href="#" title="右对齐" @click="boxAlgin('left','max')"><img src="../../assets/image/align-h-right.png" /></a>
        <a href="#" title="水平居中" @click="boxAlgin('middle','horizontal')"><img src="../../assets/image/align-v-center.png" /></a>
        <a href="#" title="垂直居中" @click="boxAlgin('middle','vertical')"><img src="../../assets/image/align-h-center.png" /></a>

      </div>
      <!-- <a href="#" title="按右分布"><img src="../../assets/image/distribute-h-right.png" /></a>
      <a href="#" title="按左分布"><img src="../../assets/image/distribute-h-left.png" /></a> -->

      <!-- <a href="#" title="按底分布"><img src="../../assets/image/distribute-v-bottom.png" /></a>
      <a href="#" title="按顶分布" @click="distribution('top')"><img src="../../assets/image/distribute-v-top.png" /></a> -->
      <div class="buttons-row" v-if="lengths<3">
        分布
        <a href="#" title="垂直居中分布"><img src="../../assets/image/distribute-v-center-disable.png" /></a>
        <a href="#" title="水平居中分布"><img src="../../assets/image/distribute-h-center-disable.png" /></a>

      </div>
      <div class="buttons-row ddd" v-else>
        分布
        <a href="#" title="垂直居中分布" @click="distributionNum('vertical')"><img src="../../assets/image/distribute-v-center.png" /></a>
        <a href="#" title="水平居中分布" @click="distributionNum('horizontal')"><img src="../../assets/image/distribute-h-center.png" /></a>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "MultiCompProp",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    ...mapState(["components", "window"]),
    compMap: function() {
      return this.components.compMap;
    },
    lengths() {
      let distribNum = 0;
      Object.keys(this.compMap).map((v, i) => {
        if (this.compMap[v].isActive) {
          distribNum++;
        }
      });
      return distribNum;
    },
    screenWidth: function() {
      return this.window.preview.screenWidth;
    },

    screenHeight: function() {
      return this.window.preview.screenHeight;
    }
  },
  methods: {
    ...mapActions(["setScreenWidth", "setScreenHeight"]),

    boxAlgin(direction, type) {
      let extreMum = this.extremum(direction, type);
      let styleConf = {};
      Object.keys(this.compMap).map((v, i) => {
        if (this.compMap[v].isActive) {
          styleConf.compId = this.compMap[v].compId;
          if (direction == "top") {
            if (type == "max") {
              styleConf.top = extreMum - this.compMap[v].box.height;
            } else {
              styleConf.top = extreMum;
            }
          } else if (direction == "left") {
            if (type == "max") {
              styleConf.left = extreMum - this.compMap[v].box.width;
            } else {
              styleConf.left = extreMum;
            }
          } else {
            if (type == "horizontal") {
              if (extreMum - this.compMap[v].box.height / 2 >= 0) {
                styleConf.top = extreMum - this.compMap[v].box.height / 2;
              }
            } else {
              if (extreMum - this.compMap[v].box.width / 2 >= 0) {
                styleConf.left = extreMum - this.compMap[v].box.width / 2;
              }
            }
          }
          this.$store.commit("updateCompStyle", styleConf);
        }
      });
    },
    extremum(direction, type) {
      let topArr = [],
        leftArr = [],
        heightArr = [],
        widthArr=[],
        bottomtArr = [],
        rightArr = [],
        num = 0;
      Object.keys(this.compMap).map((v, i) => {
        if (this.compMap[v].isActive) {
          topArr.push(this.compMap[v].box.top);
          leftArr.push(this.compMap[v].box.left);
          bottomtArr.push(this.compMap[v].box.top + this.compMap[v].box.height);
          rightArr.push(this.compMap[v].box.left + this.compMap[v].box.width);
          widthArr.push(this.compMap[v].box.width);
          heightArr.push(this.compMap[v].box.height);
        }
      });
      if (direction == "top") {
        if (type == "max") {
          num = Math.max(...bottomtArr);
        } else {
          num = Math.min(...topArr);
        }
      } else if (direction == "left") {
        if (type == "max") {
          num = Math.max(...rightArr);
        } else {
          num = Math.min(...leftArr);
        }
      } else {
        const average = arr =>
          arr.reduce((acc, val) => acc + val, 0) / arr.length;
        if (type == "horizontal") {
          num = average(heightArr);
        } else {
          num = average(widthArr);
        }
      }
      return num;
    },
    //分布
    distribution(params) {
      let styleConf = {};
      for (let i = 0; i < params.arr.length; i++) {
        if (params.arr.length == 1) {
          params.defaultVal += params.avg;
        } else {
          if (i == 0) {
            params.defaultVal += params.avg;
          } else {
            if (params.direction == "horizontal") {
              params.defaultVal += params.arr[i - 1].box.width + params.avg;
            } else {
              params.defaultVal += params.arr[i - 1].box.height + params.avg;
            }
          }
        }
        styleConf.compId = params.arr[i].compId;
        if (params.direction == "horizontal") {
          styleConf.left = params.defaultVal;
        } else {
          styleConf.top = params.defaultVal;
        }

        this.$store.commit("updateCompStyle", styleConf);
      }
    },
    distributionNum(type) {
      let surplusWidth = [], //水平分布数组
        surplusHeight = [], //垂直分布数组
        leftNum = 0, //默认最左边一个的宽度
        topNum = 0, //默认最上面一个的宽度
        activeWidth = 0, //水平分布区域总宽度
        centerWidth = 0, //水平中间区域
        activeHeight = 0, //垂直分布区域总宽度
        centerHeight = 0, //垂直中间区域
        rw = 0, //left最大值的坐标
        rh = 0; //top最大值的坐标
      let styleConf = {};
      Object.keys(this.compMap).map((v, i) => {
        if (this.compMap[v].isActive) {
          //计算
          if (this.extremum("left", "max") == (this.compMap[v].box.left + this.compMap[v].box.width)) {
            rw = this.extremum("left", "max") - this.compMap[v].box.width;
          }
           if (this.extremum("top", "max") == (this.compMap[v].box.top + this.compMap[v].box.height)) {
            rh = this.extremum("top", "max") - this.compMap[v].box.height;
          }
        
          if (this.extremum("left", "min") != this.compMap[v].box.left && (this.extremum("left", "max") - this.compMap[v].box.width) !=this.compMap[v].box.left) {
            surplusWidth.push(this.compMap[v]); //除去两端的数组
            activeWidth += this.compMap[v].box.width;
          } else {
            if (this.extremum("left", "min") == this.compMap[v].box.left) {
              leftNum = this.extremum("left", "min") + this.compMap[v].box.width;
            }
          }

          if (this.extremum("top", "min") != this.compMap[v].box.top && (this.extremum("top", "max") - this.compMap[v].box.height) != this.compMap[v].box.top) {
            surplusHeight.push(this.compMap[v]); //除去两端的数组
            activeHeight += this.compMap[v].box.height;
          } else {
            if (this.extremum("top", "min") == this.compMap[v].box.top) {
              topNum = this.extremum("top", "min") + this.compMap[v].box.height;
            }
          }
        }
      });

      if (type == "horizontal") {
        centerWidth = rw - leftNum; //中间区域
        let horizontalAvg = (centerWidth - activeWidth) / (surplusWidth.length + 1);
        this.distribution({
          arr: surplusWidth,
          direction: "horizontal",
          avg: horizontalAvg,
          defaultVal: leftNum
        });
      } else {
      centerHeight = rh - topNum; //中间区域
      let verticalAvg =  (centerHeight - activeHeight) / (surplusHeight.length + 1);
         this.distribution({
          arr: surplusHeight,
          direction: "vertical",
          avg: verticalAvg,
          defaultVal: topNum
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pageProp {
  width: 100%;
  height: calc(100vh - 60px);
}

.title-pageConf {
  text-align: center;
  line-height: 38px;
  height: 38px;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
  font-family: "Microsoft YaHei";
}

.screenProp {
  height: 100vh;
  background-color: #f7f7f7;
  margin-left: 1px;
}

.buttons-row {
  display: flex;
  line-height: 40px;
  height: 40px;
  font-size: 12px;
  font-family: "Microsoft YaHei";
  color: #33333e;
  margin-left: 30px;
  margin-right: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #dfdfdf;
  border-bottom-style: solid;
}

.buttons-row img {
  display: table-cell;
  float: right;
  vertical-align: middle;
  padding-left: 20px;
  padding-top: 10px;
  height: 20px;
  width: 20px;
  background-size: 100% 100%;
  cursor: pointer;
}
</style>
