<template>
  <el-dialog
    title="全局参数设置"
    :visible.sync="dialogVisible"
    append-to-body
    class="common-dialog"
    custom-class="dialogGlobalParams"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="close"
  >
    <div class="head-column">
      <el-button
        class="add-btn"
        circle
        icon="el-icon-plus"
        size="mini"
        type="primary"
        title="添加参数"
        @click="addRow"
      ></el-button>
    </div>
    <el-table :data="gridData">
      <el-table-column label="参数名">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="默认值">
        <template slot-scope="scope">
          <el-input v-model="scope.row.value" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="是否必填" width="100" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.required"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="300">
        <template slot-scope="scope">
          <el-input v-model="scope.row.description" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button
            class="delete"
            circle
            icon="el-icon-delete"
            size="mini"
            type="primary"
            title="删除"
            @click="deleteRow(scope.row, scope)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button class="primary-button" type="primary" @click="saveData">确 定</el-button>
      <el-button class="info-button" @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

export default {
  name: "global-params",
  data() {
    return {
      dialogVisible: false,
      rowNum: 1,
      gridData: [],
      sysParams: ["pageId"],
    };
  },
  computed: {
    ...mapState(["window"]),
    globalParams() {
      //console.log(this.window);
      return this.window.globalParams;
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {
    
  },
  methods: {
    open() {
      this.dialogVisible = true;
      //console.log(this.globalParams);
      this.gridData = _.cloneDeep(this.globalParams);
      this.rowNumHandle()
    },
    close() {
      this.dialogVisible = false;
    },
    addRow() {
      if (this.isIllegal()) {
        return;
      }
      let item = {
        rowNum: this.rowNum,
        name: "",
        value: "",
        required: true,
        description: "",
      };
      //console.log(item);
      this.gridData.push(item);
      this.rowNum++;
    },
    deleteRow(row, scope) {
      //console.log("deleteRow -> scope", scope)//可以用scope.$index来删除行
      //console.log(row);
      this.gridData.map((item, i) => {
        if (item.rowNum == row.rowNum) {
          this.gridData.splice(i, 1);
        }
      });
      this.rowNumHandle()
    },
    isIllegal() {
      let customParams = [];
      for (let i = 0; i < this.gridData.length; i++) {
        let item = this.gridData[i];
        let name = item.name.trim();
        if (!name) {
          this.$message.info("参数名不能为空！");
          return true;
        }
        if (this.sysParams.includes(name)) {
          this.$message.info(`参数名${name}为系统参数，不可用！`);
          return true;
        } else if (customParams.includes(name)) {
          this.$message.info(`参数名${name}重复！`);
          return true;
        } else {
          customParams.push(name);
        }
      }
      console.log("自定义参数：", customParams);
      return false;
    },
    rowNumHandle() {
      let gridData = this.gridData;
      if (gridData.length) {
        this.rowNum = gridData[gridData.length - 1].rowNum + 1;
      } else {
        this.rowNum = 1;
      }
      //console.log(this.rowNum);
    },
    saveData() {
      console.log("saveData -> gridData", this.gridData);
      //点击确定按钮，把数据保存在store.window中
      if (this.isIllegal()) {
        return;
      }
      this.$store.commit("changeGlobalParams", this.gridData);
      this.close();
    },
  },
};
</script>

<style lang="scss">
.dialogGlobalParams {
  width: 70% !important;
  .head-column {
    margin-bottom: 5px;
    padding-right: 25px;
    text-align: right;
  }
}
</style>