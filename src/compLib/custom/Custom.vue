<template>
  <Div :style="style">
    <iframe ref="scan" width="100%" height="100%" scrolling="yes" frameborder="0" onresize="resize"></iframe>
  </Div>
</template>
<script>
import AbstractComp from "@/compLib/commons/AbstractComp";
export default {
  name: "CustomImage",
  mixins: [AbstractComp],
  data() {
    return {
      canUpdate: false
    };
  },
  computed: {
    obj() {
      return this.compConf.box;
    },
    style() {
      return {
        width: this.obj.width + "px",
        height: this.obj.height + "px",
        background: "#fff"
      };
    },
    tempInfo() {
      let state = this.$store.state;
      let designList = state.components.customList;
      let previewList = state.preview.customList;
      let customList = designList.length > 0 ? designList : previewList;
      customList = customList.length > 0 ? customList : [];
      let info = customList.filter(item => item.compId === this.compId);
      return info.length > 0 ? info[0] : {};
    }
  },
  mounted() {
    // console.log("custom monted");
    this.creatIfreamedom(this.tempInfo);

    this.$compsBus.$on("updateCompData", () => {
      this.canUpdate && this.creatIfreamedom(this.tempInfo);
    });

    this.$refs.scan.onload = () => {
      // console.log("frame onload");
      this.creatIfreamedom(this.tempInfo);
    };
  },
  watch: {
    compData(val, oldVal) {
      if (!val || JSON.stringify(val) === JSON.stringify(oldVal)) {
        this.canUpdate = false;
        return;
      }
      this.canUpdate = true;
      let stringVal = JSON.stringify(val);
      this.$store.commit("updateCustomCompData", {
        compId: this.compId,
        newData: stringVal
      });
    }
  },
  methods: {
    resize() {
      console.log("iframe resize");
      // const iframe = this.$refs.scan;
      // iframe.contentWindow.document.body.style = "transform: scale(1)";
    },
    creatIfreamedom(result) {
      // console.log("creatIfreamedom", result);
      let sourceCode = result.code;
      const iframe = this.$refs.scan;
      console.log(result)
      let style = sourceCode.css ? `<style> ${sourceCode.css} </style>` : "";

      let body = sourceCode.html;

      let vds = result.vendors
        .map(item => {
          return `<script src='${item}'><\/script>`;
        })
        .join("\n");
      let tempJS = this.finalJS(sourceCode);
      let js = tempJS ? `<script> ${tempJS} <\/script>` : "";
      let script = `${vds} \n ${js}`;

      let vDom = `<!DOCTYPE html><html><head>${style}</head><body>${body} \n ${script}</body></html>`;

      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(vDom);
      iframe.contentWindow.document.close();

      this.canUpdate = false;
    },
    finalJS(source) {
      let JS = source.js;
      let dataSource = source.dataSource;
      return dataSource ? JS.replace("MY_DATA", dataSource) : JS;
    }
  }
};
</script>
<style>
</style>
