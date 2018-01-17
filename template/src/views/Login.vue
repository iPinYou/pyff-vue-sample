<template>
  <div>
    <vue-particles
      class="particles-bg"
      :particleOpacity="0.7"
      :particlesNumber="50"
      shapeType="circle"
      :particleSize="10"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="6"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="repulse"
    ></vue-particles>
    <py-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <py-form-item prop="account">
        <py-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></py-input>
      </py-form-item>
      <py-form-item prop="checkPass">
        <py-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码"></py-input>
      </py-form-item>
      <py-checkbox v-model="checked" checked class="remember">记住密码</py-checkbox>
      <py-form-item style="width:100%;">
        <py-button type="primary" style="width:100%;" @click.native.prevent="handleLoginSubmit" :loading="logining">登录</py-button>
        <!--<py-button @click.native.prevent="handleReset">重置</py-button>-->
      </py-form-item>
    </py-form>
  </div>
</template>

<script>
  import NProgress from 'nprogress';
  import { requestLogin } from 'api';


  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          account: 'admin',
          checkPass: '123456',
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    mounted () {
    },
    methods: {
      handleReset() {
        this.$refs.loginForm.resetFields();
      },
      handleLoginSubmit() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            NProgress.start();
            const loginParams = { grantType: 'password', username: this.loginForm.account, password: this.loginForm.checkPass }
            requestLogin(loginParams).then(data => {
              this.logining = false;
              NProgress.done();
//              const { accessToken } = data;
              sessionStorage.setItem('user', JSON.stringify(data.username));
              this.$router.push({ path: '/' });
            }).catch((err) => {// 异常处理
              if(err && err.data){
                const data = err.data;
                if (data.httpStatusCode && data.httpStatusCode !== 200) {
                  const { error, message } = data;
                  this.$message({
                    message: message || error,
                    type: 'error',
                  });
                }
              }else{
                this.$message({
                  message: '服务连接异常',
                  type: 'error',
                });
              }
              NProgress.done();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style scoped>
  .particles-bg {
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
