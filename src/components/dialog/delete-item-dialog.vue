<template>
  <div>
    <CommonDialog
      :visible="dialogParams.visible"
      :width="dialogParams.width"
      :closeOnClickModal="false"
      :showClose="false"
      :title="dialogParams.title"
    >
      <div slot="dialog-content" class="tip">
        <div class="tooltip-title">
          <p>{{dialogParams.message}}</p>
        </div>
      </div>
      <div slot="dialog-footer">
        <el-button class="primary-button" @click="doDelete">确定</el-button>
        <el-button class="info-button" @click="doCancle">取消</el-button>
      </div>
    </CommonDialog>
  </div>
</template>

<script>
import CommonDialog from "@/components/dialog/common-dialog";
export default {
  name: "delete-item-dialog",
  props: {
    dialogParams: {
      type: Object,
      default() {
        return {
          visible: false,
          width: "600px",
          title: "删除",
          message: "提示信息"
        };
      }
    },
    handleDelete: {
      type: Function,
      default() {
        console.log("还没有绑定【handleDelete】事件");
      }
    }
  },
  components: { CommonDialog },
  data() {
    return {};
  },
  methods: {
    // 对话框状态
    openDialog() {
      this.dialogParams.visible = true;
    },
    // 确定操作
    doDelete() {
      this.handleDelete();
    },
    // 关闭对话框
    doCancle() {
      this.dialogParams.visible = false;
    }
  }
};
</script>

<style scoped lang="stylus">
.tip {
  width: 100%;

  .tooltip-title {
    text-align: center;
  }
}
</style>
