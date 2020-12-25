<template>
  <div :style="style">
    <template v-if="compentName === 'dv-border-Box-14'">
      <svg width="1025" height="129">
        <polyline stroke="#4A74A3" points="0 0,128 0,150 27,610 27,632 0,760 0" stroke-width="2" fill="transparent">
            <animate attributeName="stroke-dasharray" attributeType="XML" from="0, 380, 0, 380" to="0, 0, 800, 0" dur="2s" begin="0s" calcMode="spline" keyTimes="0;1" keySplines="0.4,1,0.49,0.98" repeatCount="indefinite"></animate>
        </polyline>
      </svg>
    </template>
    <template v-else-if="compentName === 'dv-border-Box-15'">
      <svg width="601" height="395" class="dv-svg-container">
        <defs>
            <path id="border-box-8-path-ae21fc8b7b5b40f991ef873be772b795" d="M2.5,2.5 L550,2.5 L598.5,40 L598.5, 392.5 L40 ,392.5 L2.5,352.5 L2.5, 2.5" fill="transparent"></path>
            <radialGradient id="border-box-8-gradient-ae21fc8b7b5b40f991ef873be772b795" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
                <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
            </radialGradient>
            <mask id="border-box-8-mask-ae21fc8b7b5b40f991ef873be772b795">
                <circle cx="0" cy="0" r="150" fill="url(#border-box-8-gradient-ae21fc8b7b5b40f991ef873be772b795)">
                    <animateMotion dur="3s" path="M2.5, 2.5 L598.5, 2.5 L598.5, 392.5 L2.5, 392.5 L2.5, 2.5" rotate="auto" repeatCount="indefinite"></animateMotion>
                </circle>
            </mask>
        </defs>
        <polygon fill="transparent" points="5, 5 596, 5 596 390 5, 390"></polygon>
        <use stroke-width="1" xlink:href="#border-box-8-path-ae21fc8b7b5b40f991ef873be772b795" stroke="#407F98"></use>
        <use stroke-width="3" xlink:href="#border-box-8-path-ae21fc8b7b5b40f991ef873be772b795" mask="url(#border-box-8-mask-ae21fc8b7b5b40f991ef873be772b795)" stroke="#08ABC7">
            <animate attributeName="stroke-dasharray" from="0, 1982" to="1982, 0" dur="3s" repeatCount="indefinite"></animate>
        </use>
    </svg>
    </template>
    <template v-else>
      <component :is="compentName" :style = "style" :reverse="reverse" :color = "colors" title="装饰器" ref="_refDv"></component>
    </template>
  </div>
</template>
<script>
import { convertCountUpChartData } from '@/datamanager/DataConvertor'
import AbstractComp from '@/compLib/commons/AbstractComp'
export default {
  name: "decoratorBorder",
  mixins: [AbstractComp],
  data(){
    return {

    }
  },
  created(){

  },
  computed: {
    compentName(){
      return this.compConf.style.baseBorderType
    },
    colors(){
      //console.log(this.compConf.style.colors)
      return this.compConf.style.colors
    },
    obj() {
      return this.compConf.box;
    },
    style() {
      return {
        width: this.obj.width + 'px',
        height: this.obj.height + 'px'
      }
    },
    reverse(){
      return this.compConf.style.reverse
    }
  },
  methods: {
    styleConfChanged(){
      console.log(this.compConf)
    },
    resize(){
      this.$refs._refDv.initWH && this.$refs._refDv.initWH()
    }
  },
  mounted(){
    // setTimeout(() => {
    //   this.compentName = 'dv-border-box-6'
    //   this.$refs._refDv.initWH()
    // },5000)
  }
}
</script>
<style>
</style>
