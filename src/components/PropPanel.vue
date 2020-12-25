<template>
  <div class="propPanel">
    <div id="prop" :style="dataStyle">
      <component :is="propCompName"></component>
    </div>
    <span
      id="rightSwitch"
      @click="switchPropDisplayState()"
      :style="switchStyle"
      :title="switchInfo"
    ></span>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import pageProp from "./props/PageProp";
import compProp from "./props/CompProp";
import multiCompProp from "./props/MultiCompProp";

export default {
  name: "PropPanel",
  components: {
    pageProp,
    compProp,
    multiCompProp,
  },
  computed: {
    ...mapState(["window"]),
    ...mapGetters(["getActiveCompCount"]),
    idName: function () {
      return this.window.prop.idName;
    },
    dataStyle: function () {
      return {
        width: this.window.prop.width + "px",
        right: this.window.prop.right + "px",
      };
    },
    switchInfo: function () {
      return this.window.prop.switchInfo;
    },
    switchStyle: function () {
      return {
        backgroundImage: this.window.prop.background,
      };
    },
    propCompName: function () {
      let activeCount = this.getActiveCompCount;
      if (activeCount == 1) {
        return "compProp";
      } else if (activeCount > 1) {
        return "multiCompProp";
      }
      return "pageProp";
    },
  },
  methods: {
    ...mapActions(["switchPropDisplayState"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.propPanel {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
}

#prop {
  box-sizing: border-box;
  position: absolute;
  width: 460px;
  right: 0;
  top: 0;
  border-left: 1px solid lightgray;
}

#rightSwitch {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-image: url(../assets/image/openLeft.png);
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 10;
}
</style>
