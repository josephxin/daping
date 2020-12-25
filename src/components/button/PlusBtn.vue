<template>
  <div class="plus-btn" :style="getBtnStyle" @click="onClick">
    <div class="plus" :style="getPlusStyle">
      <div class="horizontal" :style="getHorizontalStyle"></div>
      <div class="vertical" :style="getVerticalStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    border: {
      type: String,
      default: "1px solid #9a9a9a"
    },
    borderOffset: {
      type: Number,
      default: 8
    },
    fontSize: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {};
  },
  computed: {
    getBtnStyle() {
      return {
        border: this.border,
        width: this.fontSize + this.borderOffset * 2 + "px",
        height: this.fontSize + this.borderOffset * 2 + "px"
      };
    },
    getPlusStyle() {
      return {
        width: this.fontSize + "px",
        height: this.fontSize + "px"
      };
    },
    getHorizontalStyle() {
      return {
        width: this.fontSize + "px"
      };
    },
    getVerticalStyle() {
      return {
        height: this.fontSize + "px"
      };
    }
  },
  methods: {
    onClick() {
      this.$emit("handleClick");
    }
  },
  created() {},
  mounted() {},
  components: {}
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.plus-btn {
  border-radius: 50%;
  cursor: pointer;
  .plus {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: relative;
    .horizontal {
      position: absolute;
      border-bottom: 1px solid #9a9a9a;
      height: 1px;
      top: calc(50% - 1px);
      left: 0;
    }
    .vertical {
      position: absolute;
      border-right: 1px solid #9a9a9a;
      width: 1px;
      top: 0;
      left: calc(50% - 1px);
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
</style>
