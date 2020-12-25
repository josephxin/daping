<template>
    <div>
        <div class="styleProp">
            <span class="text">{{ styleObj.name }}</span>
            <el-select @change="changeValue" class="comp" size="mini" v-model="curOption" clearable>
                <el-option :key="index" :label="optionName(data)" :value="optionValue(data)"
                           v-for="(data,index) in styleObj.range"/>
            </el-select>
        </div>
        <slot v-if="children.type">
            <component :is="children.type" :styleObj="children"></component>
        </slot>
    </div>
</template>

<script>
import {getVal, updateValue} from '../EditCompReg'
import {mapGetters} from 'vuex'

export default {
    name: "gisCascade",
    props: [
        'styleObj'
    ],
    data() {
        return {
            curOption: getVal,
            children: {}
        }
    },
    mounted() {
        this.curOption = getVal(this.styleObj.value);
    },
    computed: {
        ...mapGetters({activeComp: 'getFirstActiveComp'}),
    },
    watch: {
        curOption: {
            handler: function (val) {
                if (val && val !== '') {
                    this.children = this.styleObj.relative[val]
                } else {
                    this.children = {};
                }
            }
        }
    },
    methods: {
        changeValue: function (value) {
            updateValue(value, this.styleObj.value, null);
        },
        optionValue(obj) {
            if (this.isOnlyValue(obj)) {
                return obj;
            }
            return Object.keys(obj)[0];
        },
        optionName(obj) {
            if (this.isOnlyValue(obj)) {
                return obj;
            }
            return Object.values(obj)[0];
        },
        isOnlyValue(obj) {
            return typeof (obj) === 'string' || typeof (obj) === 'number';
        }
    }
}
</script>

<style scoped>

</style>
