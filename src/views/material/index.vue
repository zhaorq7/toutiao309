<template>
<el-card class="material">
  <bread-crumb>
    <template slot="title">素材管理</template>
  </bread-crumb>
<!--  上传组件-->
  <ul-upload :show-file-list="false" class="upload-btn" :http-request="uploadImg">
    <el-button size="small" type="primary">上传图片</el-button>
  </ul-upload>
<!--  tab-->
  <el-tabs v-model="activeName" @tab-click="changeTab">
    <el-tab-pane label="全部素材" name="all">
      <div class="card-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img src="" alt="">
          <el-row class="operate" type="flex" align="middle" justify="space-around">
            <i class="el-icon-star-on">收藏</i>
            <i class="el-icon-delete-solid">删除</i>
          </el-row>
        </el-card>
      </div>

<!--      分页-->
      <el-row type="flex" justify="center">
        <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total" background layout="prev,pager,next"></el-pagination>
      </el-row>

    </el-tab-pane>
    <el-tab-pane label="收藏素材"  name="collect">
      <div class="card-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img src="" alt="">
        </el-card>
      </div>

      <!--      分页-->
      <el-row type="flex" justify="center">
        <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total" background layout="prev,pager,next"></el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // all collect
      page: {
        page: 1,
        pageSize: 4,
        total: 0
      },
      list: []
    }
  },
  methods: {
    uploadImg () {},
    changeTab () {},
    changePage () {}
  }
}
</script>

<style  lang="less" scoped>
  .material {
    .card-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .img-card{
      width: 180px;
      height: 180px;
      margin: 30px;
      position: relative;
    }

    img {
      width: 100%;
    }

    .operate{
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      height: 30px;
      font-size: 18px;
      background-color: #f4f5f6;
    }
  }
</style>
