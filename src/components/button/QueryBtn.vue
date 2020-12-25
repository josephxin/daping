<template>
  <div class="query-btn" @click="onClick">查询</div>
</template>

<script>
export default {
  name: "QueryBtn",
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
.query-btn {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  width: 70px;
  height: 36px;
  background-image: linear-gradient(0deg, #2273c9 0%, #2f7fd7 100%),
    linear-gradient(#58cdab, #58cdab);
  background-blend-mode: normal, normal;
  box-shadow: inset 0px 1px 4px 0px rgba(255, 255, 255, 0.64);
  border-radius: 2px;
  border: solid 1px #468cdc;
  text-align: center;
  line-height: 34px;
  letter-spacing: 0px;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  color: #ffffff;
}
</style>
<style rel="stylesheet/scss" lang="scss"></style>
