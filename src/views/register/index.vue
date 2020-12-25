<!--  -->
<template>
  <div class="page page-register">
    <div class="login-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label prop="username">
          <el-input v-model="ruleForm.username">
            <i slot="prefix" class="iconfont icon-denglu"></i>
          </el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off">
            <i slot="prefix" class="iconfont icon-mima"></i>
          </el-input>
        </el-form-item>

        <el-form-item label prop="email">
          <el-input v-model="ruleForm.email" autocomplete="off">
            <i slot="prefix" class="iconfont icon-youxiang"></i>
          </el-input>
        </el-form-item>
        <el-form-item class>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "@/api/user";
import util from "@/util/util";
import { mapActions } from "vuex";

export default {
  name: "register",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        email: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度在最少6位", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  components: {},

  computed: {
    getToken() {
      return this.$store.state.window.token;
    },
  },

  mounted() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login() {
      api
        .login(`${util.appServerURL()}user/register`, {
          username: this.ruleForm.username,
          password: this.ruleForm.password,
          email: this.ruleForm.email,
        })
        .then((res) => {
          this.$alert("注册成功！", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: (action) => {
              window.location.href = "/";
            },
          });
        });
    },
  },
};
</script>
<style lang='scss' scoped>
.login-box {
  background: url(../../assets/image/login-bg.jpg) no-repeat;
  min-height: calc(100vh);
  width: 100%;
  background-size: cover;
  display: flex;
  align-items: center;
  min-width: 1200px;
  justify-content: flex-end;

  form {
    display: flex;
    flex-direction: column;
    width: 350px;
    margin-right: 15%;

    span {
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #b2b2b2;
      padding-left: 10px;

      i::before {
        color: #b2b2b2;
      }
    }

    input {
      height: 40px;
      line-height: 40px;
      background: transparent;
      outline: none;
      color: #fff;
      font-size: 14px;
      width: 80%;
    }

    button {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      height: 40px;
      border-radius: 3px;
      margin-top: 10px;
      color: #fff;
      outline: none;
      cursor: pointer;
      width: 100%;
    }
  }
}
</style>
