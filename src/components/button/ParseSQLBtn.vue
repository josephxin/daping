<template>
  <div class="batch-opt-btn parse-sql-btn" @click="onClick">
    <img src="../../assets/images/batch_active.png" width="16px" height="16px" />
    <span style="margin-left:5px">解析sql</span>
  </div>
</template>

<script>
export default {
  name: "ParseSQLBtn",
  props: {},
  data() {
    return {};
  },
  computed: {},
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
@import "../../assets/stylus/batchOptBtn.styl";
.parse-sql-btn {
  width: 90px;
}
</style>
