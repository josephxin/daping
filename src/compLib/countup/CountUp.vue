<template>
  <div class="iCountUp">
    <ICountUp
      :startVal="startVal"
      :endVal="endVal"
      :decimals="decimals"
      :duration="duration"
      :options="options"
      @ready="onReady"
      :style="style"
      ref="c1"
      v-if="endVal > 0"
    />
  </div>
</template>

<script type="text/babel">
import ICountUp from 'vue-countup-v2';
import { convertCountUpChartData } from '@/datamanager/DataConvertor'
import AbstractComp from '@/compLib/commons/AbstractComp'

export default {
  name: 'CountUp',
  mixins: [AbstractComp],
  components: {
    ICountUp
  },
  mounted() {
  },
  computed: {
    prefix(){
      return `<i style='
                 font-style:normal;
                 display:inline-block;
                 margin-right:${this.styleConf.beforeMargin}px;
                 font-size:${this.styleConf.beforeFontSize}px;
                 font-family:${this.styleConf.beforeFontFamily};
                 color:${this.styleConf.beforeColor};
                 font-weight:${this.styleConf.beforefontBold}'>
                 ${this.styleConf.beforeText}
              </i>`
    },
    suffix(){
      return `<i style='
                 font-style:normal;
                  display:inline-block;
                 margin-left:${this.styleConf.affterMargin}px;
                 font-size:${this.styleConf.affterFontSize}px;
                 font-family:${this.styleConf.affterFontFamily};
                 color:${this.styleConf.affterColor};
                 font-weight:${this.styleConf.affterfontBold}'>
                 ${this.styleConf.affterText}
              </i>`
    },
    pamram(){
      return this.styleConf;
    },
    endVal(){
      return this.chartData == null ? 0 :  Number(this.chartData.value);
    },
    style() {
      return {
        textAlign: this.styleConf.fontAlign,
        fontSize: this.styleConf.numFontSize + 'px',
        fontFamily: this.styleConf.numFontFamily,
        color: this.styleConf.numColor,
        fontWeight: this.styleConf.numfontBold
      }
    },
    duration() {
      return this.styleConf.Duration
    },
    options() {
      return {
        useEasing: true,
        useGrouping: true,
        separator: this.styleConf.Separator || ',',
        decimal: '.',
        prefix: this.prefix || '',
        suffix: this.suffix || '',
      }
    }
  },
  data() {
    return {
      startVal: 0,
      decimals: 0,
      instance: null
    };
  },
  watch: {
    instance(instance, oldVal) {
      //this.updateCountUp();
    },
    pamram: {
      handler(n, s) {
        this.updateCountUp();
      },
      deep:true
    }
  },
  methods: {
    convertChartData() {
      return convertCountUpChartData(this.compData, this.dataConf)
    },
    onReady: function (instance, CountUp) {
      if (this.instance != null) {
        return;
      }
      this.instance = instance;
    },
    compDataChanged() {
      this.updateCountUp();
    },
    updateCountUp() {
      this.instance.reset();
      this.instance.options.separator = this.options.separator
      this.instance.options.prefix =  this.prefix
      this.instance.options.suffix = this.suffix
      this.instance.duration = this.duration*1000
      this.instance.update(this.chartData.value);
    }
  }
};
</script>

<style scoped lang='scss'>
.iCountUp {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  color: #04d6ef;
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    width: 100%;
  }
}
</style>
