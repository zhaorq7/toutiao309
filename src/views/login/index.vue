<template>
  <div class="login">
    <el-card class="login-card">
      <div class="logo">
        <img src="../../assets/logo_index.png" alt="">
      </div>
      <!--      表单-->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top: 20px">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width: 280px;" placeholder="请输入验证码"></el-input>
          <el-button style="float:right;">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width: 100%;">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const validator = function (rule, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('您必须无条件同意'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [
          {
            required: true, // 必填项
            message: '手机号不能为空'
          }, {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码必须为6位数字'
          }
        ],
        check: [
          {
            validator
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 拿到数据  , 发起请求(axios)
      this.$refs.loginForm.validate(isOK => {
        if (isOK) {
          // 请求axios
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => { // 请求成功后 , 提示登陆成功 并跳转  token
            console.log(result)
            window.localStorage.setItem('user-token', result.data.token)
            // 编程式导航
            this.$router.push('/')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

  .login {
    background-image: url('../../assets/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-card {
      width: 440px;
      height: 340px;

      .logo {
        text-align: center;

        img {
          height: 45px;
        }
      }
    }
  }
</style>
