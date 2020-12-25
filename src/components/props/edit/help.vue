<template>
<span class="helpUI" v-if="isShow">
  <a @mouseout="closeHelp" @mouseover="showHelp" href="#">
      ?
  </a>
  <div class="help" v-html="styleObj.help" v-show="isHelp"></div>
</span>
</template>

<script>
    export default {
        name: 'helpUI',

        data() {
            return {
                isHelp: false
            }
        },

        props: [
            'styleObj'
        ],

        computed: {

            isShow: function () {
                if (this.styleObj && this.styleObj.help) {
                    return true;
                }
                return false;
            }

        },

        methods: {
            showHelp: function () {
                this.isHelp = true;
            },

            closeHelp: function () {
                this.isHelp = false;
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .helpUI {
        position: relative;
    }

    .help {
        position: absolute;
        top: 20px;
        left: 20px;
        background-color: gray;
        width: 200px;
        text-transform: none;
    }

</style>
