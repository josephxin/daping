<template>
    <div class="styleProp">
        <div class="text">
            <helpUI :styleObj="styleObj"></helpUI>
            {{textName}}
        </div>
        <el-color-picker :value="getValue" @change="changeValue" class="comp color" show-alpha size="mini"/>
        <el-input :value="getValue" class="comp input" disabled="disabled" placeholder="" size="mini"/>
    </div>
</template>

<script>
    import {getVal, updateValue} from '../EditCompReg'

    export default {
        name: 'colorAlpha',

        props: [
            'styleObj'
        ],

        computed: {

            getValue: function () {
                let color = getVal(this.styleObj.value);
                if (color == null || color === '') {
                    return '';
                }
                return color;
            },

            textName: function () {
                let currentObj = this.styleObj;

                if (!currentObj.name) {
                    return '颜色';
                }
                return currentObj.name;
            }
        },

        methods: {
            changeValue: function (value) {
                updateValue(value, this.styleObj.value, this.styleObj.verify, this.styleObj.currentVal);
            }
        }

    }
</script>
<style scoped>

    .styleProp .input {
        width: 158px;
    }

    .styleProp .color {
        width: 28px;
        margin-left: 10px;
    }

</style>
