<template>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="visible"
      :append-to-body = "true"
      class="savedialog common-dialog"
      title="容器层配置"
      width="600px"
      :show-close="false"
      size="mini"
    >
      <el-form :model="form">
        <el-form-item label="层名称">
            <el-input v-model="form.name" autocomplete="off" size="mini"></el-input>
        </el-form-item>
    </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button type="primary" class="primary-button" @click="_confrim">确 定</el-button>
        <el-button @click="_onBack" class="info-button">取 消</el-button>
      </div>
    </el-dialog>
</template>
<script>
export default {
    name : 'container-layer-edit',
    props : {
        layerData : {
            type : Object,
            default : {}
        },
        visible : {
            type : Boolean,
            default : false
        }
    },
    data(){
        return {
            form : {}
        }
    },
    created(){
        this.form = _.cloneDeep(this.layerData)
    },
    methods : {
        _confrim(){
            this.$emit("onSave",this.form)
        },
        _onBack(){
            this.$emit('onBack')
        }
    }
}
</script>
<style lang="stylus" scoped>
    
</style>