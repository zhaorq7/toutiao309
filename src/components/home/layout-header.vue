<template>
<el-row type="flex" class="layout-header" justify="space-between">
  <el-col class="left" :span="6">
    <i class="el-icon-s-unfold icon"></i>
    <span>哈尔滨市布卡科技有限公司</span>
  </el-col>
  <el-col :span="3" class="right">
<!--    用户头像-->
    <img class="head-img" :src="userInfo.photo?userInfo.photo : defaultImg"  alt="">
<!--    功能键  个人中心  退出登录-->
    <el-dropdown trigger="click" @command="handleMenuItem">
<!--    用户名  匿名插槽-->
    <span class="el-dropdown-link">
      {{userInfo.name}}<i class="el-icon-arrow-down el-icon-s--right"></i>
    </span>
<!--   下拉项   具名插槽-->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="account">个人信息</el-dropdown-item>
        <el-dropdown-item command="git">git地址</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
      },
      defaultImg: require('../../assets/avatar.jpg')// assets图片路径 转成base64字符串
    }
  },
  methods: {
    // 头部功能
    handleMenuItem (command) {
      if (command === 'account') {
        // 个人中心   账户信息

      } else if (command === 'git') {
        // 跳转
        window.location.href = 'https://github.com/zhaorq7/toutiao309.git'
      } else {
        // 退出
        // 清除token
        window.localStorage.clear()
        this.$router.push('/login')
      }
    },
    // 获取用户信息
    getUserInfo () {
      // axios.config.js 整合了
      // const token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.userInfo = result.data.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.layout-header{
  padding: 8px 0 ;
  .left{
    .icon{
      font-size: 22px;
      margin-right: 5px;
    }
  }
  .right{
    display: flex;
    align-items: center;
    .head-img{
      border-radius: 50%;
      margin-right: 5px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
