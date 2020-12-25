<template>
  <div class="data-excel">
    <div class="data-item">
      <div class="text">选择配置</div>
      <div class="comp data-item-float">
        <el-select class="left" :value="selectExcelId" @change="updateExcelId" placeholder="请选择" size="mini">
          <el-option v-for="item in dataSourceList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-button class="right" type="primary" @click="showUploadDialog('uploadData')" size="mini">新 建</el-button>
      </div>
    </div>

    <div class="data-item">
      <div class="comp data-item-float">
        <span class="left" style="width:200px;">数据源状态&nbsp;&nbsp;{{excelState}}</span>
        <!-- <el-button class="right" type="primary" @click="freshExcelState" size="mini">刷新状态</el-button> -->
      </div>
    </div>

    <el-radio v-model="radio" label="1">按条件筛选</el-radio>
    <el-radio v-model="radio" label="2">按SQL筛选</el-radio>

    <div v-if="radio==1">
      <div class="data-item">
        <div class="text">选择列</div>
        <el-select class="comp" :multiple="true" :value="selectColumns" @change="changeColumns" size="mini">
          <el-option v-for="item in allColumns" :key="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <hr class="separate-line" />

      <div class="data-item">
        <div class="text">选择查询条件</div>

        <div class="comp data-item-float">
          <span class="left" style="width:30px;">列名</span>
          <el-select class="right" v-model="columnName" size="mini" style="width:280px;">
            <el-option v-for="item in allColumns" :key="item" :value="item">
            </el-option>
          </el-select>
        </div>

        <div class="comp data-item-float">
          <span class="left" style="width:43px;">值</span>
          <el-input type="text" v-model="columnValue" size="mini" class="left" style="width:240px;" />
          <img src="../../../assets/image/add.png" @click="addConditions" class="right btn-img" />
        </div>
        <!-- <div v-for="(item,index) in getQueryConditions" :key="index" class="comp data-item-float">
          <span class="left" style="width:160px;">列名：&nbsp;&nbsp;{{item.name}}</span>
          <span class="left" style="width:100px;">值：&nbsp;&nbsp;{{item.value}}</span>
          <span class="left" style="width:80px;">排序：&nbsp;&nbsp;{{item.sortVal =='asc' ? "正序" : "倒叙" }}</span>
          <img src="../../../assets/image/del.png" @click="delConditions(index)" class="right btn-img"/>
        </div> -->
        <hr class="separate-line" />
        <el-table :data="getQueryConditions" style="width: 100%" size="mini"  v-if='getQueryConditions.length>0'>
          <el-table-column label="列名" align="center" header-align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="值">
            <template slot-scope="scope">
              <span>{{ scope.row.value }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" header-align="center">
            <template slot-scope="scope">
              <img src="../../../assets/image/del.png" @click="delConditions(scope.$index, scope.row)" class="right btn-img" />
            </template>
          </el-table-column>
        </el-table>

        <hr class="separate-line" />
        <div class="text">排序方式</div>
        <div class="comp data-item-float">
          <span class="left" style="width:30px;">列名</span>
          <el-select class="right" v-model="sortColumnName" size="mini" style="width:280px;">
            <el-option v-for="item in allColumns" :key="item" :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="comp data-item-float">
          <span class="left" style="width:43px;">排序</span>
          <img src="../../../assets/image/add.png" @click="addExcelSortArr" class="right btn-img" />
          <el-select class="right" v-model="sortVal" size="mini" style="width:240px;">
            <el-option v-for="item in sortValOpn" :key="item.label" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- <div v-for="(itm,key) in addSortObj" v-if='addSortObj.length>0' class="comp data-item-float">
          <span class="left" style="width:160px;">列名：&nbsp;&nbsp;{{itm.name}}</span>
          <span class="left" style="width:80px;">排序：&nbsp;&nbsp;{{itm.sort =='asc' ? "正序" : "倒序" }}</span>
          <img src="../../../assets/image/del.png" @click="delSortObj(key)" class="right btn-img" />
        </div> -->
        <el-table :data="excelSortArr" style="width: 100%" size="mini" v-if="excelSortArr.length>0">
          <el-table-column label="列名" align="center" header-align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="排序">
            <template slot-scope="scope">
              <span>{{scope.row.sort =='asc' ? "正序" : "倒序" }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" header-align="center">
            <template slot-scope="scope">
              <img src="../../../assets/image/del.png" @click="delExcelSortArr(scope.$index, scope.row)" class="right btn-img" />
            </template>
          </el-table-column>
        </el-table>




      </div>
    </div>
    <div v-else>
      <div class="text" style="margin-top:15px;margin-bottom:15px">查询的sql，
        <font color="red">注(表名请按照"#{表名}"格式填写)</font>
      </div>
      <div class="data-item">
        <el-input type="textarea"     :rows="4" placeholder="请输入sql" v-model="excelSortSql">
        </el-input>
      </div>
    </div>
    <!--  @change="updateSql" -->
    <component :is="showDataUI"></component>

    <el-dialog
      title="新建excel数据源"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="40%"
      :before-close="handleClose"
      :show-close = "false"
      class="common-dialog"
    >
      <div slot = "title" class='el-dialog__title'>
        <img src="@/assets/image/icon_title.png" alt="" width="16" height="16">
        <p class='title'>新建excel数据源</p>
      </div>
      <el-form :model="uploadData" :rules="rules" ref="uploadData" label-width="100px" size="mini">
        <el-form-item label="名称" prop="name">
          <el-input v-model="uploadData.name"></el-input>
        </el-form-item>
        <el-form-item label="excel文件" prop="excelFile">
          <el-upload class="upload-demo" name="file" ref="upload" :action="uploadUrl" :data="uploadData" :on-change="changeFile" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" :auto-upload="false" :multiple="false" :limit="1">
            <el-button slot="trigger" size="small" type="primary">选择</el-button>
            <div slot="tip" class="el-upload__tip" style="display:inline-block;margin-left:10px;">
              只能上传excel文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('uploadData')"  class="primary-button">确 定</el-button>
        <el-button @click="handleClose()"  class="info-button">取 消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import {
  loadDataSource,
  loadColumnByDataSource,
  ADD_EXCEL_URL,
  QUERY_EXCEL_STATE
} from "@/datamanager/ExcelDataManager";
import {
  type as DataSourceUIContext,
  getVal,
  onlyUpdateAttr
} from "./dataSourceReg";
import store from "../../../store/store";

export default {
  name: "ExcelData",

  data() {
    return {
      dialogVisible: false,
      dataSourceList: loadDataSource(),
      uploadUrl: ADD_EXCEL_URL,
      sortColumnName: "",
      sqlName:'',
      sql:'',
      uploadData: {
        name: "",
        excelFile: "",
        type: "1" // 1：excel; 2:csv
      },

      rules: {
        name: [
          { required: true, message: "请输入数据源名称", trigger: "blur" },
          { min: 5, max: 20, message: "长度在5到20个字符", trigger: "blur" }
        ],
        excelFile: [
          { required: true, message: "请选择excel文件", trigger: "blur" }
        ]
      },
      radio: "1",
      columnName: "",
      columnValue: "",
      sortVal: "asc",
      excelState: "",
      sortValOpn: [
        {
          value: "asc",
          label: "正序"
        },
        {
          value: "desc",
          label: "倒序"
        }
      ],
      allState: { "1": "上传中", "2": "上传完成", "3": "上传失败" }, //1 ：上传中  2：上传完成  3：上传失败

      allColumns: ""
    };
  },

  computed: {
    ...mapGetters({
      activeComp: "getFirstActiveComp",
      getCompData: "getCompData"
    }),
    selectExcelId() {
      let excelId = getVal("datasource excelId");
      return excelId;
    },

    // getAllColumns(){
    //   return loadColumnByDataSource(this.selectExcelId);
    // },

    selectColumns() {
      return getVal("datasource excelColumns");
    },

    getQueryConditions() {
      return getVal("datasource excelConditions");
    },
    excelSortArr() {
      return getVal("datasource excelSortArr");
    },
    excelSortSql:{
          get(){
            if(getVal("datasource excelSortSql") =="") {
              onlyUpdateAttr("datasource excelSortSql", "select * from #{"+ this.sqlName +"}")
            }
            return getVal("datasource excelSortSql");
          },
          set(newValue){
             onlyUpdateAttr("datasource excelSortSql", newValue)
          }


    },

    showDataUI() {
      return DataSourceUIContext.showData;
    }
  },
  mounted () {
   if(this.selectExcelId!=''){
     this.changeBox(this.selectExcelId)
     this.getSelectName(this.selectExcelId)
     this.radio=store.state.components.sqlParmas.radio
   }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },

    loadAllColumns() {
      this.allColumns = loadColumnByDataSource(this.selectExcelId);
    },

    showUploadDialog(formName) {
      this.dialogVisible = true;

      // 清空表单
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
        this.$refs[formName].clearValidate();
        if (this.$refs.upload) {
          this.$refs.upload.clearFiles();
        }
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.upload.submit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    changeFile(currentFile, fileList) {
      if (currentFile == null) {
        return;
      }
      let fileType = currentFile.name.split(".")[1];
      const extensionLimit = fileType === "xls" || fileType === "xlsx";
      if (!extensionLimit) {
        this.rules.excelFile[0].message = "文件扩展名必须是xls或xlsx";
        return;
      }
      //         const sizeLimit = currentFile.size / 1024 / 1024 <= 2
      //         if(!sizeLimit){
      //             this.rules.excelFile[0].message = '文件大小必须小于2M';
      //             return;
      //         }
      this.uploadData.excelFile = currentFile.name;
    },

    handleRemove(file) {
      this.uploadData.excelFile = "";
      this.rules.excelFile[0].message = "请选择excel文件";
      console.log("remove:", file.name);
    },

    handleSuccess(response, file, fileList) {
      if (response.status != 200) {
        console.log("response:", response);
        // alert(response.message);
        this.$alert(response.message, "提示", { confirmButtonText: "确定" });
        return;
      }
      // alert('上传成功');
      this.$alert("上传成功", "提示", { confirmButtonText: "确定" });
      this.dialogVisible = false;

      // 设置数据源
      this.dataSourceList = loadDataSource();
      this.updateExcelId(response.id); // response.id

      this.excelState = this.allState["1"]; // 1 为上传中
      this.crontab()
      this.columnName = "";
      this.columnValue = "";
    },

    handleError(error, file, fileList) {
      // alert('上传失败');
      this.$alert("上传失败", "提示", { confirmButtonText: "确定" });
    },
    changeBox(value){
       for (let ds of this.dataSourceList) {
        if (ds.id == value) {
          this.excelState = this.allState[ds.status];

          if (ds.status == 2) {
            // 如果为上传成功，加载数据列
            this.loadAllColumns();
          }

          break;
        }
      }
    },
    updateSql(value){

      onlyUpdateAttr("datasource excelSortSql", "select * from #{"+ value +"}");
    },
    getSelectName(value){
      let obj = {};
        obj = this.dataSourceList.find((item)=>{
            return item.id === value;
        });
      this.sqlName= obj.name
      this.updateSql(this.sqlName)
    },
    updateExcelId(value) {

      onlyUpdateAttr("datasource excelId", value);

      // 切换数据源时，更新数据源的状态
      for (let ds of this.dataSourceList) {
        if (ds.id == value) {
          this.excelState = this.allState[ds.status];

          if (ds.status == 2) {
            // 如果为上传成功，加载数据列
            this.loadAllColumns();
          }

          break;
        }
      }
      if(value){
        this.getSelectName(value)
      }

      // 清空选择列和查询条件
      onlyUpdateAttr("datasource excelColumns", []);
      onlyUpdateAttr("datasource excelConditions", []);
    },

    changeColumns(value) {
      onlyUpdateAttr("datasource excelColumns", value);
    },
    addConditions() {
      let conditions = [].concat(this.getQueryConditions);
      conditions.push({ name: this.columnName, value: this.columnValue });

      onlyUpdateAttr("datasource excelConditions", conditions);

      this.columnName = "";
      this.columnValue = "";
    },
      crontab(){
        this.crontabVal=setInterval(()=>{
             if(this.excelState!=this.allState["1"]){
                clearInterval(this.crontabVal);
                return;
              }else{
                  this.freshExcelState()
              }

        },1000)
    },

    addExcelSortArr(){
        let  excelSortArr = [].concat(this.excelSortArr);
        excelSortArr.push({ name: this.sortColumnName, sort: this.sortVal });

        onlyUpdateAttr("datasource excelSortArr", excelSortArr);
        this.sortColumnName = "";
        this.sortVal = "asc";
    },
    delExcelSortArr(index) {
       let excelSortArr = [].concat(this.excelSortArr);
      excelSortArr.splice(index, 1);
      onlyUpdateAttr("datasource excelSortArr", excelSortArr);

    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    delConditions(index) {
      let conditions = [].concat(this.getQueryConditions);
      conditions.splice(index, 1);
      onlyUpdateAttr("datasource excelConditions", conditions);
    },

    freshExcelState() {
      let excelId = this.selectExcelId;
      if (!excelId) {
        this.$alert("请选择excel后再刷新状态", "提示", {
          confirmButtonText: "确定"
        });
        return;
      }
      // 刷新状态，如果成功后加载数据
      let url = QUERY_EXCEL_STATE.replace("{id}", excelId);
      let that = this;
      $.get(url, function(data, status) {
        that.excelState = that.allState[data];
        if (data == 2) {
          // 上传成功
          that.loadAllColumns();
        }
      });
    }
  },

    watch: {
      radio() {
        store.commit("uploadRadio", this.radio);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.data-excel {
  width: 100%;
}
.separate-line {
  margin-top: 10px;
}

.comp .btn-img {
  height: 20px;
  background-size: 100% 100%;
  width: 20px;
  margin: 4px 10px;
  cursor: pointer;
}
.btn-img {
  cursor: pointer;
  vertical-align: middle;
}
</style>
