<template>

    <div class="data-database">

        <div class="data-item">
            <div class="text">选择配置</div>
            <div class="comp data-item-float">
                <el-select class="left" :value="databaseId" @change="updateDatabaseId" placeholder="请选择" size="mini">
                    <el-option
                        v-for="item in dataList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <el-button class="right" type="primary" @click="showDatabaseDialog('form')" size="mini">新 建</el-button>
            </div>
        </div>

        <div class="data-item">
            <div class="text">查询语句</div>
            <el-input class="comp" type="textarea" :rows="6" v-model="sql" @change="updateSql"></el-input>
        </div>

        <component :is="showDataUI"></component>

        <el-dialog title="新建数据库数据源"
                   :visible.sync="dialogVisible"
                   :modal-append-to-body="false"
                   :before-close="handleClose"
                   class="common-dialog"
                   width="40%"
                   :show-close="false"
        >
            <div slot="title" class='el-dialog__title'>
                <img src="@/assets/image/icon_title.png" alt="" width="16" height="16">
                <p class='title'>新建数据库数据源</p>
            </div>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" size="mini">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="form.type" style='width:100%;'>
                        <el-option v-for="item in dbType"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="域名" prop="domain">
                    <el-input v-model="form.domain"></el-input>
                </el-form-item>
                <el-form-item label="端口" prop="port">
                    <el-input v-model="form.port"></el-input>
                </el-form-item>
                <el-form-item label="db名称" prop="dbName">
                    <el-input v-model="form.dbName"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('form')" class="primary-button">确 定</el-button>
                <el-button @click="handleClose()" class="info-button">取 消</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
import {ADD_DATABASE_URL, loadDataSource} from '@/datamanager/DatabaseDataManager'
import {getVal, onlyUpdateAttr, type as DataSourceUIContext} from './dataSourceReg'

export default {
    name: "DatabaseData",

    data() {
        return {
            dialogVisible: false,

            dataList: [],
            dbType: [
                {value: 'mysql', label: 'mysql'},
                {value: 'oracle', label: 'oracle'},
                {value: 'db2', label: 'db2'},
                {value: 'sqlserver', label: 'sqlserver'}
            ],

            form: {
                name: "",
                type: "",
                domain: "",
                username: "",
                password: "",
                port: "",
                dbName: "",
                remark: ""
            },

            rules: {
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
            sql: '',
        };
    },
    mounted() {
        this.sql = this.getVal("datasource sql");
    },
    computed: {

        databaseId() {
            return getVal("datasource databaseId");
        },

        showDataUI() {
            return DataSourceUIContext.showData;
        }
    },
    created() {
        loadDataSource().then(res => this.dataList = res)
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
        },

        showDatabaseDialog(formName) {
            this.dialogVisible = true;

            // 清空表单
            if (this.$refs[formName]) {
                console.log('reset form')
                this.$refs[formName].resetFields();
                this.$refs[formName].clearValidate();
            }
        },

        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // this.$refs[formName].submit();
                    let that = this;
                    $.post(
                        ADD_DATABASE_URL,
                        {
                            //  type:  数据库类型 Integer 必填 （1 为mysql, 2 为db2， 3为oracle, 4 sqlserver）
                            //  sourceName:  数据源名称  必填 String （用来前端展示），
                            //  userName: 数据库用户名 必填 Stirng ,
                            //  passWord：数据库密码  必填 String
                            //  ip:    ip地址  String  必填
                            //  port   端口    Integer 必填
                            //  database:  数据库名称  String 必填
                            //  remark: 备注 不是必填项  String
                            dbtype: this.form.type,
                            name: this.form.name,
                            username: this.form.username,
                            password: this.form.password,
                            host: this.form.domain,
                            port: this.form.port,
                            instance: this.form.dbName,
                            remark: this.form.remark
                        },
                        function (result) {
                            // if(result.status != 200){
                            //   console.log('response:',result);
                            //   alert(result.message);
                            //   return;
                            // }
                            // alert('添加数据源成功');
                            that.$alert('添加数据源成功', '提示', {confirmButtonText: '确定',});
                            // 加载数据列表，更新选中的数据源id
                            loadDataSource().then(res => {
                                that.dataList = res;
                                that.updateDatabaseId(result.id);
                            })
                            that.dialogVisible = false;
                        }
                    )
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },

        updateDatabaseId(value) {
            onlyUpdateAttr('datasource databaseId', value);

            // 清空sql
            this.updateSql('');

        },

        updateSql(value) {
            onlyUpdateAttr('datasource sql', value);
        }

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layoutOpt {
    width: 100%;
}
</style>
