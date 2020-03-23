<template>
  <el-container>
    <!--  侧边栏 -->
    <el-aside>
      <layout-aside></layout-aside>
    </el-aside>
    <!--  右侧-->
    <el-container>
      <el-header>
        <!--      头部组件-->
        <layout-header></layout-header>
      </el-header>
      <!--    内容区域-->
      <el-main style="margin: 0;padding: 0;">
        <!--      主要内容-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped>

</style>
