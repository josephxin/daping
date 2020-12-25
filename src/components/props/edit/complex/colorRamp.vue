<template>
    <div class="styleProp">
        <div class="text">
            <helpUI :styleObj="styleObj"></helpUI>
            {{ textName }}
        </div>
        <color-range-selector :value="getValue" :mode="mode" @change="changeValue"/>
    </div>
</template>

<script>
import ColorRangeSelector from 'color-range-selector'
import {getVal, updateValue} from "@/components/props/edit/EditCompReg";

export default {
    name: "colorRamp",
    components: {ColorRangeSelector},
    props: [
        'styleObj'
    ],
    computed: {
        getValue: function () {
            let color = getVal(this.styleObj.value);
            if (color == null || color === '') {
                return [];
            }
            return color
        },

        textName: function () {
            let currentObj = this.styleObj;

            if (!currentObj.name) {
                return '颜色';
            }
            return currentObj.name;
        },
        mode : function(){
            return this.styleObj.mode || 'hex'
        }
    },
    methods: {
        changeValue: function (value) {
            updateValue(value, this.styleObj.value);
        }
    }
}
</script>

<style lang="scss" scoped>
.styleProp {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .text {
        float: none;
        flex: 1;
    }

    .selector {
        width: 70%;

        ::-webkit-scrollbar {
            width: 6px !important;
            height: 6px !important;
            background-color: #29323C !important;
        }

        ::-webkit-scrollbar-corner {
            background-color: #29323C !important;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 10px !important;
            background-color: #3A4552 !important;
            border: 3px solid #29323C !important;
        }

        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 0;
            background: #3A4552 !important;
        }
    }
}


</style>
