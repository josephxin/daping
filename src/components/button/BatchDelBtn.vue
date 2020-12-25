<template>
  <div class="batch-opt-btn batch-del-btn" @click="onClick">
    <img src="../../assets/image/batch_delete.png" width="20px" height="20px" />
    <span style="margin-left:5px">{{btnName}}</span>
  </div>
</template>

<script>
export default {
  name: "BatchDelBtn",
  props: {
    btnName: {
      type: String,
      default: "批量删除"
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClick() {
      this.$emit("handleClick");
    }
  },
  created() { },
  mounted() { },
  components: {}
};
</script>

<style scoped lang="stylus">
.batch-opt-btn {
  user-select: none
  -moz-user-select: none
  -webkit-user-select: none
  cursor: pointer
  height: 30px
  background-image: linear-gradient(0deg, #63adfc 0%, #7ab9fc 100%), linear-gradient(#58cdab, #58cdab)
  background-blend-mode: normal, normal
  box-shadow: inset 0px 1px 4px 0px rgba(255, 255, 255, 0.64)
  border-radius: 3px
  border: solid 1px #7db3f1
  color: #ffffff
  text-align: center
  line-height: 30px
  padding: 0 8px
  font-size: 14px
  display: flex
  align-items: center
}
</style>
<style lang="stylus"></style>
