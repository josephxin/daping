<template>
    <div class="data-static data-item">
        <div v-if="showDimensions">
            <div class="text">数据描述</div>
            <AceEditor
                class="codeEditor"
                :fontSize="12"
                :showPrintMargin="false"
                :showGutter="true"
                :highlightActiveLine="true"
                mode="json"
                theme="chrome"
                :onChange="dimensionsChanged"
                :value = "compDataDimensions"
                name="codeEditorDimensions"
                width = "410px"
                height = "150px"
                :editorProps="{$blockScrolling: true}"
            />
        </div>
        <div class="text">数据列表</div>
        <AceEditor
            class="codeEditor"
            :fontSize="12"
            :showPrintMargin="false"
            :showGutter="true"
            :highlightActiveLine="true"
            mode="json"
            theme="chrome"
            :onChange="compDataChanged"
            :value = "compFormatData"
            name="codeEditorData"
            width = "410px"
            height = "450px"
            :editorProps="{$blockScrolling: true}"
        />
        <div class="comp" style="text-align:center;">
            <el-button @click="loadCompData" size="mini" type="primary">加载数据</el-button>
        </div>
    </div>

</template>

<script>
import {mapGetters} from 'vuex'
import { Ace as AceEditor} from 'vue2-brace-editor';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/theme/chrome';
export default {
    name: 'staticDTUI',
    data() {
        return {
            updateState: false,
            compFormatData: '', //组件静态数据
            compDataDimensions : '',//数据描述,
            showDimensions : false
        }
    },
    components: {AceEditor},
    computed: {
        ...mapGetters({activeComp: 'getFirstActiveComp'}),
    },
    watch: {
        "activeComp.compId": {
            handler: function (val) {
                val && this._initData(val)
            }
        },
    },
    created() {
        this._initData(this.activeComp.compId)
    },
    methods: {
        //初始化编辑器数据
        _initData(compId){
            let data = this.$store.state.compData.compData[compId];
            this.compDataDimensions = ''
            this.showDimensions = false
            this.compFormatData = JSON.stringify(data,null,4)
            //console.log(this.activeComp.data)
            if(this.activeComp.data.conf && this.activeComp.data.conf.datasetMeta){
                this.showDimensions = true
                this.compDataDimensions = JSON.stringify(this.activeComp.data.conf.datasetMeta, null, 4)
            }
        },
        compDataChanged(value){
            //console.log("compDataChanged -> value", value)
            this.compFormatData = value
        },
        dimensionsChanged(value){
            this.compDataDimensions = value
        },
        setCompData() {
            this.updateState = true
            let data = eval('(' + this.compFormatData + ')')
            this.$store.commit('updateCompData', {
                compId: this.activeComp.compId,
                data
            })
        },
        setDimensions(){
            let data = eval('(' + this.compDataDimensions + ')')
            this.$store.commit('updateCompDataStaticMeta', {
                compId: this.activeComp.compId,
                data
            })
        },
        loadCompData() {
            if(this.showDimensions){
                this.setDimensions() // 设置静态数据描述
            }
            this.setCompData() //设置静态数据值
            try {
                this.$dm.clearErrorMsg();
                let data = this.$store.state.compData.compData[this.activeComp.compId];
                let compConf = this.activeComp;
                this.$dm.verifyData(data, compConf);
                let error = this.$dm.getErrorMsg();
                if (error.length != 0) {
                    this.$alert('加载数据失败。异常信息为' + error, '提示', {confirmButtonText: '确定',});
                    return;
                }
                this.$compsBus.$emit('updateCompData',
                    {
                        compId: this.activeComp.compId,
                        changedLoadedData: this.updateState
                    }
                );
                this.$alert('加载数据成功', '提示', {confirmButtonText: '确定',});
            } catch (e) {
                console.error('error:', e);
                this.$alert('加载数据失败。异常信息为' + e.message, '提示', {confirmButtonText: '确定',});
            }
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.data-static {
    width: 100%;
    margin: 5px 0;
}

</style>
