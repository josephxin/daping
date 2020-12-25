<template>
  <div class="operateArea">
    <com-list-panel></com-list-panel>
    <prop-panel></prop-panel>
    <control-panel></control-panel>
    <preview-panel></preview-panel>
  </div>
</template>

<script>
import ComListPanel from "./ComListPanel";
import PropPanel from "./PropPanel";
import ControlPanel from "./ControlPanel";
import PreviewPanel from "./PreviewPanel";
export default {
  name: "OperateArea",
  components: {
    ComListPanel,
    PropPanel,
    ControlPanel,
    PreviewPanel,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operateArea {
  position: relative;
}
</style>
