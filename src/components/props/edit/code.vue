<template>
    <div
        class="styleProp"
        :ref="styleObj.key"
        :id="styleObj.key"
        style="height: auto"
    >
        <div class="code-title">
            <helpUI :styleObj="styleObj"></helpUI>{{ styleObj.name }}
        </div>
        <ace-editor
            class="codeEditor"
            :readOnly="disabled"
            width="432px"
            :height="height"
            :fontSize="12"
            :showPrintMargin="true"
            :showGutter="true"
            :highlightActiveLine="true"
            mode="javascript"
            theme="chrome"
            :onChange="_onChangeValue"
            :value="getValue"
            name="codeEditor"
            :editorProps="{ $blockScrolling: true }"
        />
    </div>
</template>
<script>
import { Ace as AceEditor } from "vue2-brace-editor";
import "brace/mode/javascript";
import "brace/theme/chrome";
import { getVal, updateValue } from "./EditCompReg";
export default {
    name: "complex-code",
    props: ["styleObj"],
    data() {
        return {};
    },
    components: { AceEditor },
    created() {},
    computed: {
        getValue() {
            let val = getVal(this.styleObj.value);
            if (val) {
                if (val.constructor == Array) {
                    let str = "";
                    val.map((item, i) => {
                        if (i != 0) {
                            str += ";";
                        }
                        str += item.toString();
                    });
                    val = str;
                } else if (val.constructor == Date) {
                    val = val.toString();
                }
            } else {
                val = "";
            }
            //console.log(val);
            return val;
        },
        disabled() {
            return this.styleObj.disabled;
        },
        height() {
            let height = this.styleObj.height;
            return height ? height + "px" : "60px";
        },
    },

    methods: {
        _onChangeValue(value) {
            updateValue(value, this.styleObj.value, this.styleObj.verify);
        },
    },
};
</script>