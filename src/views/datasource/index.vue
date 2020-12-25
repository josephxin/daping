<template>
    <div class='page page-datasource'>
        <homeHead @dataTypeChange="dataTypeChange"></homeHead>
        <el-container>
            <el-main>
                <div class="opt-area">
                    <div class="area">
                        <a @click="_handleAdd" href="javascript:void(0)">
                            <i class="el-icon-plus"></i>
                        </a>
                    </div>
                </div>
                <div class="card-list" v-show="fileDataList.length && dataType === 'file'">
                    <cardBox
                        :cardWith="cardWith"
                        :cordLength="fileDataList.length"
                        :isPage="false"
                        :pageObj="pageObj"
                    >
                        <card :cardWith="cardWith" :key="n.id" :popoverObj="popoverObj"
                              v-for="(item, n) in fileDataList">
                            <template v-slot:head>
                                <h2 :title="item.name">{{ item.name }}</h2>
                                <span>创建成功</span>
                            </template>
                            <template v-slot:details>
                                <ul>
                                    <li>
                                        <label for="">名称</label>
                                        <span>{{ item.name }}</span>
                                    </li>
                                    <li>
                                        <label for="">类型</label>
                                        <span v-if="item.type==1">excel</span>
                                        <span v-if="item.type==2">csv</span>
                                    </li>
                                    <li>
                                        <label for="">状态</label>
                                        <span v-if="item.status==1">创建中</span>
                                        <span v-if="item.status==2">创建成功</span>
                                        <span v-if="item.status==3">创建失败</span>
                                    </li>
                                    <li>
                                        <label for="">时间</label>
                                        <span>{{ item.date }}</span>
                                    </li>
                                </ul>
                            </template>
                            <template slot="referenceD">
                                <div class="label-item">
                                    <img class="opt-img" height="12px" src="@/assets/image/card_type_icon.png"
                                         width="12px"/>
                                    <span class="item-content">excel</span
                                    >
                                </div>
                                <div class="label-item">
                                    <img
                                        class="opt-img"
                                        height="12px"
                                        src="@/assets/image/card_date_icon.png"
                                        width="12px"
                                    />
                                    <span class="item-content"
                                    >时间&nbsp;{{ item.date }}</span
                                    >
                                </div>
                            </template>
                            <template v-slot:footer>
                                <span @click="editExcelDataSource(item.id)">编辑</span>
                                <span @click="deleteExcelDataSource(item.id)">删除</span>
                            </template>
                        </card>
                    </cardBox>
                </div>
                <!-- 数据源 -->
                <div class="card-list" v-show="databaseDataList.length && dataType === 'database'">
                    <cardBox
                        :cardWith="cardWith"
                        :cordLength="databaseDataList.length"
                        :isPage="false"
                        :pageObj="pageObj"
                    >
                        <card :cardWith="cardWith" :key="n.id" :popoverObj="popoverObj"
                              v-for="(item, n) in databaseDataList">
                            <template v-slot:head>
                                <h2 :title="item.name">{{ item.name }}</h2>
                                <span>创建成功</span>
                            </template>
                            <template v-slot:details>
                                <ul>
                                    <li>
                                        <label for="">名称</label>
                                        <span>{{ item.name }}</span>
                                    </li>
                                    <li>
                                        <label for="">类型</label>
                                        <span>{{ item.dbtype }}</span>
                                    </li>
                                    <li>
                                        <label for="">连接状态</label>
                                        <span v-if="item.linkStatus==1">可连接</span>
                                        <span v-if="item.linkStatus==2">不能连接</span>
                                    </li>
                                    <li>
                                        <label for="">数据源状态</label>
                                        <span v-if="item.status==1">创建中</span>
                                        <span v-if="item.status==2">创建成功</span>
                                        <span v-if="item.status==3">创建失败</span>
                                    </li>
                                    <li>
                                        <label for="">时间</label>
                                        <span>{{ item.date }}</span>
                                    </li>
                                </ul>
                            </template>
                            <template slot="referenceD">
                                <div class="label-item">
                                    <img class="opt-img" height="12px" src="@/assets/image/card_type_icon.png"
                                         width="12px"/>
                                    <span class="item-content">{{ item.dbtype }}</span
                                    >
                                </div>
                                <div class="label-item">
                                    <img class="opt-img" height="12px" src="@/assets/image/card_ip_icon.png"
                                         width="12px"/>
                                    <span v-if="item.linkStatus==1">可连接</span>
                                    <span v-if="item.linkStatus==2">不能连接</span>
                                </div>
                                <div class="label-item">
                                    <img
                                        class="opt-img"
                                        height="12px"
                                        src="@/assets/image/card_date_icon.png"
                                        width="12px"
                                    />
                                    <span class="item-content"
                                    >时间&nbsp;{{ item.date }}</span
                                    >
                                </div>
                            </template>
                            <template v-if="!item.from || item.from !== 'new'" v-slot:footer>
                                <span @click="editDb(item.id)">编辑</span>
                                <span @click="deleteDb(item.id)">删除</span>
                            </template>
                        </card>
                    </cardBox>
                </div>
            </el-main>
        </el-container>
        <!-- excel数据源对话框 -->
        <el-dialog
            :before-close="handleExcelClose"
            :title="excelTitle"
            :visible.sync="excelVisible"
            name="excelDataSource"
            class="common-dialog"
            width="40%"
            :show-close = "false"
            >
            <div slot = "title" class='el-dialog__title'>
              <img src="@/assets/image/icon_title.png" alt="" width="16" height="16">
              <p class='title'>{{excelTitle}}</p>
            </div>
            <el-form :model="excelForm" :rules="excelRules" label-width="100px" ref="excelForm" size = "mini">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="excelForm.name"></el-input>
                </el-form-item>
                <el-form-item label="excel文件" prop="excelFile">
                    <el-upload
                        :action="uploadUrl"
                        :auto-upload="false"
                        :data="excelForm"
                        :limit="1"
                        :multiple="false"
                        :on-change="changeFile"
                        :on-error="handleError"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        class="upload-demo"
                        name="file"
                        ref="upload">
                        <el-button size="small" slot="trigger" type="primary">选择</el-button>
                        <div class="el-upload__tip" slot="tip" style="display:inline-block;margin-left:10px;">
                            只能上传excel文件
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="submitExcelForm" type="primary" class="primary-button">确 定</el-button>
              <el-button @click="handleExcelClose()"  class="info-button">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 数据库数据源对话框 -->
        <el-dialog
          :before-close="handleDatabaseClose"
          :modal-append-to-body="false"
          :title="dbTitle"
          :visible.sync="databaseVisible"
          @close="dialogclose"
          width="40%"
          :show-close = "false"
          class = "common-dialog"
          >
            <div slot = "title" class='el-dialog__title'>
              <img src="@/assets/image/icon_title.png" alt="" width="16" height="16">
              <p class='title'>{{dbTitle}}</p>
            </div>
            <el-form :model="databaseForm" :rules="databaseRules" label-width="100px" ref="databaseForm" size = "mini">
                <el-form-item label="选择数据源" v-show="!databaseForm.id">
                    <el-select @change="_selectDataBase" style='width:100%' v-model="selectDataSourceId">
                        <el-option :key="item.id"
                                   :label="item.name"
                                   :value="item.id"
                                   v-for="item in databaseSelectList">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="databaseForm.name"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="databaseForm.type" style='width:100%'>
                        <el-option :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                                   v-for="item in dbType">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="databaseForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="databaseForm.password"></el-input>
                </el-form-item>
                <el-form-item label="域名" prop="domain">
                    <el-input v-model="databaseForm.domain"></el-input>
                </el-form-item>
                <el-form-item label="端口" prop="port">
                    <el-input v-model="databaseForm.port"></el-input>
                </el-form-item>
                <el-form-item label="db名称" prop="dbName">
                    <el-input v-model="databaseForm.dbName"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="databaseForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="submitDatabaseForm" type="primary" class="primary-button" :loading = "submitDatabaseLoading">{{submitDatabaseLoading ? '处理中...': '确 定'}}</el-button>
              <el-button @click="handleDatabaseClose()" class="info-button">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import {mapActions} from 'vuex';
import {ADD_EXCEL_URL, ALL_EXCEL_URL} from '@/datamanager/ExcelDataManager'
import {ADD_DATABASE_URL, ALL_DATABASE_URL} from '@/datamanager/DatabaseDataManager'
import util from '@/util/util'
import api from "@/api/datasource"
import homeHead from '@/components/layout/header'
import cardBox from "@/components/card/cardBox"; // 壳子
import card from "@/components/card/card"; // 卡片
// 文件列表url
const FILE_ADD = ADD_EXCEL_URL;
const FILE_UPDADE = util.appServerURL() + 'datasource/file/';
const FILE_DEL = util.appServerURL() + 'datasource/file/';
const FILE_DETAIL = util.appServerURL() + 'datasource/file/';
const FILE_LIST = ALL_EXCEL_URL;

// 数据库列表url
const DB_ADD = ADD_DATABASE_URL;
const DB_UPDADE = util.appServerURL() + 'datasource/sql/';
const DB_DEL = util.appServerURL() + 'datasource/sql/';
const DB_DETAIL = util.appServerURL() + 'datasource/sql/';
const DB_LIST = ALL_DATABASE_URL;
const DB_REFRESH = util.appServerURL() + 'datasource/refresh/';


export default {
    name: 'datasourceManagerApp',

    mounted: function () {
        // 加载数据源数据
        this.loadFileDataSource();//获取文件-数据列表
        this.loadDbDataSource();//获取数据库-数据列表
    },

    data() {
        return {
            selectDataSourceId: '',
            dataType: 'database',
            cardWith: 240, // 卡片宽度
            pageObj: {
                page: 1, // 当前页
                pagesize: 100000, // 每页显示多少
                total: 0, // 总条数
            },
            popoverObj: {
                show: true
            },
            excelFormName: 'excelForm',
            dbFormName: 'databaseForm',

            excelTitle: '新建excel数据源',
            dbTitle: '',

            fileDataList: [
                // {id:'123',name:'23',type:'1',status:'1'},
                // {id:'123',name:'23',type:'1',status:'1'},
                // {id:'123',name:'23',type:'1',status:'1'},
                // {id:'123',name:'23',type:'1',status:'1'},
                // {id:'123',name:'23',type:'1',status:'1'},
            ],
            databaseSelectList: [],
            databaseDataList: [],
            // excel数据源属性
            excelVisible: false,
            refreshIds: [],
            uploadUrl: FILE_ADD,
            excelForm: {
                id: "",
                name: "",
                excelFile: "",
                type: "1" // 1：excel; 2:csv
            },

            excelRules: {
                name: [
                    {required: true, message: "请输入数据源名称", trigger: "blur"},
                    {min: 5, max: 20, message: "长度在5到20个字符", trigger: "blur"}
                ],
                excelFile: [
                    {required: true, message: "请选择excel文件", trigger: "blur"}
                ]
            },

            // 数据库数据源属性
            databaseVisible: false,

            dbType: [
                {value: 'mysql', label: 'mysql'},
                {value: 'oracle', label: 'oracle'},
                {value: 'db2', label: 'db2'},
                {value: 'sqlserver', label: 'sqlserver'},
                {value: 'dm', lable: 'dm'}
            ],

            databaseForm: {
                id: "",
                name: "",
                type: "",
                domain: "",
                username: "",
                password: "",
                port: "",
                dbName: "",
                remark: ""
            },

            databaseRules: {
                name: [
                    {required: true, message: "请输入数据源名称", trigger: "blur"},
                    {min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur"}
                ],
                type: [
                    {required: true, message: "请选择类型", trigger: "blur"}
                ],
                username: [
                    {required: true, message: "请输入用户名称", trigger: "blur"}
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: "blur"}
                ],
                domain: [
                    {required: true, message: "请输入域名", trigger: "blur"}
                ],
                port: [
                    {required: true, message: "请输入端口", trigger: "blur"}
                ],
                dbName: [
                    {required: true, message: "请输入数据库实例名称", trigger: "blur"}
                ]
            },
            submitDatabaseLoading : false
        }
    },
    components: {
        homeHead,
        cardBox,
        card
    },
    methods: {
        ...mapActions(["getSourceList", 'getOtherSourceList']),
        async loadOtherDataSource() {
            let otherDataSource = await this.getOtherSourceList()
            this.databaseSelectList = otherDataSource
        },
        dataTypeChange(type) {
            this.dataType = type
        },
        _getDataBase(databaseId) {
            let databaseList = this.databaseSelectList
            for (let i = 0; i < databaseList.length; i++) {
                if (databaseId === databaseList[i].id) {
                    return databaseList[i]
                }
            }
            return null
        },
        _selectDataBase(databaseId) {
            let database = this._getDataBase(databaseId)
            let databaseForm = {
                name: database.name,
                type: database.type,
                domain: database.domain,
                username: database.username,
                password: database.password,
                port: database.port,
                dbName: database.dbName,
                remark: database.remark
            }
            this.databaseForm = databaseForm
        },
        _handleAdd() {
            if (this.dataType === 'file') {
                this.showExcelDialog()
                return
            }
            this.dbAdd()
        },
        // 处理excel数据源的方法
        handleExcelClose() {
            this.excelVisible = false;
        },
        dialogclose() {
            this.databaseForm.id = ''

        },
        rowClass(row, index) {
            return {'background-color': 'red'};
        },

        showExcelDialog() {

            let formName = this.excelFormName;

            this.excelVisible = true;

            this.excelTitle = '新建excel数据源';

            // 清空表单
            if (this.$refs[formName]) {
                this.$refs[formName].resetFields();
                this.$refs[formName].clearValidate();
                if (this.$refs.upload) {
                    this.$refs.upload.clearFiles();
                }
            }

            this.uploadUrl = FILE_ADD;

        },

        submitExcelForm() {
            let formName = this.excelFormName;
            let excelId = this.excelForm.id;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$refs.upload.submit();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        dbAdd() {
            if (!this.databaseSelectList || !this.databaseSelectList.length) {
                this.loadOtherDataSource()
            }
            this.databaseForm = {}
            this.showDatabaseDialog()
        },
        changeFile(currentFile, fileList) {
            if (currentFile == null) {
                return;
            }
            let fileType = currentFile.name.split('.')[1];
            const extensionLimit = fileType === 'xls' || fileType === 'xlsx'
            if (!extensionLimit) {
                this.rules.excelFile[0].message = '文件扩展名必须是xls或xlsx';
                return;
            }
//         const sizeLimit = currentFile.size / 1024 / 1024 <= 2
//         if(!sizeLimit){
//             this.rules.excelFile[0].message = '文件大小必须小于2M';
//             return;
//         }
            this.excelForm.excelFile = currentFile.name;
        },

        handleRemove(file) {
            this.excelForm.excelFile = '';
            this.excelRules.excelFile[0].message = '请选择excel文件';
            console.log('remove:', file.name);
        },

        handleSuccess(response, file, fileList) {
            // if(response.status != 200){
            //   console.log('response:',response);
            //   alert(response.message);
            //   return;
            // }
            alert('上传成功');
            this.excelVisible = false;
            // 刷新excel数据源列表
            this.loadFileDataSource();
        },

        handleError(error, file, fileList) {
            alert('上传失败');
        },

        async editExcelDataSource(excelId) {
            let result = null;
            // 从后台加载数据
            result = await api.detail(`${FILE_DETAIL + excelId}/detail`)
            if (!result) {
                alert('没有查询到数据');
                return;
            }
            // 显示对话框
            this.showExcelDialog();
            this.excelForm.id = result.id;
            this.excelForm.name = result.name;
            this.uploadUrl = FILE_UPDADE + excelId;
            this.excelTitle = '编辑excel数据源';
        },

        deleteExcelDataSource(excelId) {
            this.$confirm('此操作将永久删除该数据源, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                api.delete(`${FILE_DEL + excelId}`).then(res => {
                    this.loadFileDataSource()
                })
            }).catch(() => {
                // 取消删除操作
            });

        },

        async loadFileDataSource() {
            api.lists(FILE_LIST).then(res => {
                this.fileDataList = res
            })
        },

        // 处理数据库数据源的方法
        handleDatabaseClose() {
            this.databaseVisible = false;
        },

        showDatabaseDialog() {
            let formName = this.dbFormName;
            this.databaseVisible = true;
            this.dbTitle = this.databaseForm.id ? '编辑数据库数据源' : '新建数据库数据源';
        },
        async submitDatabaseForm() {
            
            let formName = this.dbFormName;
            let dbId = this.databaseForm.id;
            let that = this;
            let valid = await this.$refs[formName].validate()
            if (valid) {
                this.submitDatabaseLoading = true
                let data = {
                    //  type:  数据库类型 Integer 必填 （1 为mysql, 2 为db2， 3为oracle, 4 sqlserver）
                    //  sourceName:  数据源名称  必填 String （用来前端展示），
                    //  userName: 数据库用户名 必填 Stirng ,
                    //  passWord：数据库密码  必填 String
                    //  ip:    ip地址  String  必填
                    //  port   端口    Integer 必填
                    //  database:  数据库名称  String 必填
                    //  remark: 备注 不是必填项  String
                    //id:this.databaseForm.id,
                    dbtype: this.databaseForm.type,
                    name: this.databaseForm.name,
                    username: this.databaseForm.username,
                    password: this.databaseForm.password,
                    host: this.databaseForm.domain,
                    port: this.databaseForm.port,
                    instance: this.databaseForm.dbName,
                    remark: this.databaseForm.remark
                }
                let databaseUrl = null
                let res
                if (dbId) {
                    res = await api.update(`${DB_UPDADE + dbId}`, data)
                } else {
                    res = await api.create(DB_ADD, data)
                }
                this.submitDatabaseLoading = false
                this.$message({
                    message: res.message || '操作数据源成功',
                    type: 'success'
                })
                this.databaseVisible = false;
                // 更新数据库数据源列表
                this.loadDbDataSource();
            }
        },
        async loadDbDataSource() {
            this.databaseDataList = await this.getSourceList()
        },
        async editDb(dbId) {
            let loading = this.$loading({lock: true});
            // 从后台加载数据
            let res = await api.detail(`${DB_DETAIL + dbId}/detail`)
            let databaseForm = {
                id: res.id,
                name: res.name,
                type: res.dbtype,
                username: res.username,
                password: res.password,
                domain: res.host,
                port: res.port,
                dbName: res.instance,
                remark: res.remark
            }
            this.databaseForm = databaseForm
            this.showDatabaseDialog();
            loading.close()
        },

        deleteDb(dbId) {
            let that = this;
            this.$confirm('此操作将永久删除该数据源, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    api.delete(`${DB_DEL + dbId}`).then(res => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.loadDbDataSource()
                    })
                }
            ).catch(() => {
            })
        },

        // 多选时，获得选择的行号
        handleSelectionChange(val) {
            this.refreshIds = [],
                val.map((v, key) => {
                    this.refreshIds.push(v.id)
                })
        },

        // 隔行变色
        rowClass: function (row, index) {
            return {"background-color": ""}// LightGrey
        },

    }
}

</script>

<style lang="scss" scoped="">
.el-main {
    color: #333;
    min-width: 1200px;
}

.el-table th > .cell {
    text-align: center
}

.iconfont {
    &:before {
        font-weight: bold;
    }
}
</style>
<style lang="stylus" scoped>
.opt-area
    padding 10px 20px
    .area
        width 100%
        height 60px
        background-color #F8F8F8
        position relative

        a
            display block
            width 38px
            height 38px
            border 1px solid #B1B1B1
            border-radius 50%
            position absolute
            right 0
            top 50%
            transform translateY(-50%)

            .el-icon-plus
                position absolute
                left 50%
                top 50%
                transform translate(-50%, -50%)
                font-size 20px
                font-weight bold
                color #B1B1B1
</style>
