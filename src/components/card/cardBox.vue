<!--  -->
<template>
  <div class="container-card">
    <span :class="{'disabled':pageObj.page <=1}" class="el-icon-arrow-left pageCtrl" @click="prev"></span>
    <span
      :class="{'disabled':pageNum<=0 || pageObj.page == pageNum}"
      class="el-icon-arrow-right pageCtrl"
      @click="next"
    ></span>
    <template>
      <div class="box" ref="box">
        <slot></slot>
        <template v-if="repairNum>0">
          <div class="repair" v-for="(item,i) in repairNum" :key="i" :style="{width:cardWith+'px'}"></div>
        </template>
      </div>
    </template>
    <span v-if="pageNum<=0">暂无数据</span>
    <span v-else>
      <template v-if="isPage">{{pageObj.page}}/{{pageNum}}页，共 {{pageObj.total}} 条记录</template>
    </span>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      repairNum: 0
    };
  },
  props: {
    cordLength: {
      type: Number,
      default: () => {
        return 10;
      }
    },
    cardWith: {
      type: Number,
      default: () => {
        return 270;
      }
    },
    pageObj: {
      type: Object,
      default: () => {
        return {
          page: 1, // 当前页
          pagesize: 18, // 每页显示多少
          total: 30 // 总条数
        };
      }
    },
    isPage: {
      type: Boolean,
      default: true
    }
  },
  components: {},

  computed: {
    pageNum() {
      return Math.ceil(this.pageObj.total / this.pageObj.pagesize);
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      if (!this.isPage) {
        this.pageObj.page = 1;
        this.pageObj.pagesize = 100000;
        this.pageObj.total = 1;
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getbunum);
  },

  methods: {
    prev() {
      if (--this.pageObj.page < 1) {
        this.pageObj.page = 1;
        return;
      }
      this.$emit("pageNumber", this.pageObj.page);
    },
    next() {
      if (++this.pageObj.page > this.pageNum) {
        this.pageObj.page = this.pageNum;
      }
      this.$emit("pageNumber", this.pageObj.page);
    },
    init() {
      this.getbunum();
      window.addEventListener("resize", this.getbunum);
    },

    //补齐
    getbunum() {
      let num = 0,
        temnum = this.cordLength;
      let cardOffsetWidth = this.cardWith + 30 + 2; //间距双15，边框2
      this.$nextTick(() => {
        let lineNum = parseInt(this.$refs.box.offsetWidth / cardOffsetWidth);
        if (temnum % lineNum != 0) {
          num = lineNum - (temnum % lineNum);
        } else {
          num = 0;
        }
        this.repairNum = num;
      });
    }
  },
  watch: {
    cordLength: {
      handler(newVal, oldVal) {
        this.init();
      },
      deep: true,
      immediate: false
    }
  }
};
</script>
<style lang='stylus' scoped>
.container-card {
  // min-height calc(100vh - 40px)
  width: 100%;
  height: 100%;
  position: relative;

  span.pageCtrl {
    font-size: 60px;
    color: #bebebe;
    top: 50%;
    margin-top: -30px;
    cursor: pointer;
    z-index: 100;
    position: absolute;

    &.el-icon-arrow-left {
      left: 0px;
    }

    &.el-icon-arrow-right {
      right: 0px;
    }

    &.disabled {
      display: none;
      color: #eae7e7;
      cursor: no-drop;
    }
  }
}

.box {
  display: flex;
  flex-wrap: wrap;
  // justify-content: center;
  margin: 0px auto;
  width: 95%;
  height: auto;
}

.repair {
  width: 240px;
  height: 216px;
  background: transparent;
  overflow: hidden;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>
