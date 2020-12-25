<template>
    <div class="styleProp" style="height: auto">
        <div class="text">
            <helpUI :styleObj="styleObj"></helpUI>
            {{ styleObj.name }}
        </div>
        <code class="comp" v-html="getValue"></code>
    </div>
</template>
<script>
import { getVal, updateValue } from "./EditCompReg";

export default {
    name: "txt",
    props: ["styleObj"],
    data() {
        return {};
    },
    computed: {
        getValue() {
            let val = getVal(this.styleObj.value);
            if (val) {
                if (val.constructor == Array) {
                    let str = "";
                    val.map((item, i) => {
                        if (i != 0) {
                            str += "<br/ >";
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
    },
    mounted() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.styleProp {
    .comp {
        line-height: 28px;
    }
}
</style>
