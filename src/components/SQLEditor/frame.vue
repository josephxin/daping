<template>
  <div class="code-sql-wrapper">
    <textarea ref="mycode" class="codesql" v-model="value"></textarea>
  </div>
</template>
<script>
import "codemirror/theme/ambiance.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";

let CodeMirror = require("codemirror/lib/codemirror");
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/selection/active-line");
require("codemirror/mode/sql/sql");
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/sql-hint");
export default {
  data() {
    return {
      editor: null
    };
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    sqlStyle: {
      type: String,
      default: 'default'
    },
    readOnly: {
      type: [Boolean, String]
    },
    width: {
      type: String,
      default: '450px'
    },
    height: {
      type: String,
      default: '68px'
    }
  },
  watch: {
    newVal(newV, oldV) {
      if (this.editor) {
        this.$emit('changeTextarea', this.editor.getValue());
      }
    }
  },
  computed: {
    newVal() {
      if (this.editor) {
        return this.editor.getValue();
      }
      return "";
    }
  },

  mounted() {
    this.loadData();
  },
  methods: {
    loadData(value) {
      if (!this.editor) {
        let mime = 'text/x-mariadb';
        // let theme = 'ambiance'//设置主题，不设置的会使用默认主题
        this.editor = CodeMirror.fromTextArea(this.$refs.mycode, {
          value: value || this.value,
          mode: mime, // 选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
          indentWithTabs: true,
          smartIndent: true,
          lineNumbers: false,
          matchBrackets: true,
          cursorHeight: 1,
          lineWrapping: true,
          readOnly: this.readOnly,
          viewportMargin: 0,
          // theme: theme,
          // autofocus: true,
          extraKeys: { 'Ctrl': 'autocomplete' }, // 自定义快捷键
          hintOptions: {// 自定义提示选项
            // 当匹配只有一项的时候是否自动补全
            completeSingle: false,
            // tables: {
            //     users: ['name', 'score', 'birthDate'],
            //     countries: ['name', 'population', 'size']
            // }
          }
        });
        this.editor.setSize(this.width, this.height);
        // 代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
        this.editor.on('inputRead', () => {
          this.editor.showHint();
        });
      }
    },
    setVal(value) {
      if (this.editor) {
        this.editor.setValue(value);
        this.$nextTick(() => {
          this.editor.refresh();
        });
      }
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.code-sql-wrapper {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>
<style rel="stylesheet/scss" lang="scss">
.CodeMirror {
  color: black;
  direction: ltr;
  line-height: 18px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
}

/* 这句为了解决匹配框显示有问题而加 */
.CodeMirror-hints {
  z-index: 9999 !important;
}
</style>
