<!--  -->
<template>
    <div>
        <div class="login-box">
            <form id="postForm" autocomplete="off" @keyup.enter="login">
          <span>
            <i class="iconfont icon-denglu"></i>
            <input type="text" name="username" class="username" v-model.trim="username" autocomplete="off"
                   placeholder="请输入用户名">
          </span>
                <span>
           <i class="iconfont icon-mima"></i>
           <input type="password" name="password" class="password" v-model.trim="password" autocomplete="off"
                  placeholder="请输入密码">
          </span>
                <button type="button" @click="login">登录</button>
            </form>
        </div>
    </div>
</template>
<script>
import io from "@/util/io"
import util from '@/util/util'

export default {
    data() {
        return {
            username: "",
            password: ''
        };
    },

    components: {},

    computed: {
        getToken() {
            return this.$store.state.window.token
        }
    },

    mounted() {
    },

    methods: {
        check() {
            if (this.username == "" || this.password == "") {
                this.$alert('请填写用户名密码', '提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
                return false;
            }
            return true;
        },
        login() {
            this.$router.push({path: 'design'})
            return
            if (this.check()) {
                io.post(util.appServerURL() + 'user/login', {
                    username: this.username,
                    password: this.password
                }).then(response => {
                    if (response.state == 1) {
                        this.$store.state.window.token = response.token
                        this.$router.push({path: 'myhome'})
                    } else {
                        this.$alert(response.message, '提示', {
                            confirmButtonText: '确定',
                            type: 'error',
                            callback: action => {
                                window.location.href = '/'
                            }
                        })
                    }
                })
            }

        }
    }
}

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
        width: 278px;
        margin-right: 20%;

        span {
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid #b2b2b2;
            padding-left: 10px;

            i::before {
                color: #b2b2b2
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
            text-shadow: 0px 0px 0px rgba(17, 154, 172, 0.75);;
            height: 40px;
            background-image: linear-gradient(0deg,
                rgba(22, 157, 174, 0.3) 0%,
                rgba(14, 185, 207, 0.15) 50%,
                #05d5f0 100%),
            linear-gradient(
                    #05d5f0,
                    #05d5f0);
            background-blend-mode: normal,
            normal;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3),
            inset 0px 1px 2px 0px rgba(255, 255, 255, 0.75);
            border-radius: 3px;
            margin-top: 30px;
            color: #fff;
            outline: none;
            cursor: pointer;
        }
    }
}
</style>
