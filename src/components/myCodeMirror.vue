<template>
    <codemirror
        ref="codemirror"
        v-model="codeStr"
        :options="cmOptions"
        @input="updateCode"
    ></codemirror>
</template>
<script>
import {codemirror} from 'vue-codemirror'
// import 'codemirror/addon/lint/lint.css'
// import 'codemirror/addon/lint/lint'
// import 'codemirror/addon/lint/javascript-lint'
// import 'codemirror/addon/lint/json-lint'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/selection/active-line' //光标行背景高亮
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/indent-fold'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/foldgutter.css'

const beautify_js = require('js-beautify')
export default {
    name: 'myCodeMirror',
    props: {
        beautify: {
            type: Boolean,
            default: false
        },
        codeData: {
            type: String,
            default: ''
        },
        options: {
            type: Object,
            default: () => {
            }
        }
    },
    model: {
        prop: 'codeData',//指向props的参数名
        event: 'change'//事件名称
    },
    data() {
        return {
            codeStr: '',
            timer: null,
            cmOptions: {
                mode: {
                    name: 'javascript',
                    json: true
                },
                autoRefresh: true,
                styleActiveLine: true,
                tabSize: 2,
                lineNumbers: true,     // 是否在编辑器左侧显示行号
                line: true,
                theme: 'default',// 主题
                highlightDifferences: true,
                foldGutter: true, //代码折叠
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                extraKeys: {"Tab": "autocomplete"}
            }
        }
    },
    created() {
        this.$nextTick(() => {
            if (this.codeData) this.codeStr = this.codeData
            if (this.beautify) this.codeStr = beautify_js(this.codeStr)
            setTimeout(() => {
                this.$refs.codemirror.codemirror.refresh();
                this.$refs.codemirror.codemirror.focus();
            }, 10)
        })

    },
    methods: {
        updateCode() {
            this.$emit('change', this.codeStr);
        }
    },
    components: {codemirror},
    watch: {
        'codeData': function (v) {
            if (v) {
                this.codeStr = v;
                setTimeout(() => {
                    this.$refs.codemirror.codemirror.refresh();
                    this.$refs.codemirror.codemirror.focus();
                }, 100)
            }
        }
    }
}
</script>
<style lang="stylus">
.CodeMirror
    font-family: "consolas" !important

// .CodeMirror-foldmarker
//   color #50fa7b
//   font-size 12px
//   background-color #a6e22e
.CodeMirror-guttermarker-subtle
    color #000
</style>
